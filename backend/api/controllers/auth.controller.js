import User from '../models/user.model.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import LogLogin from '../models/loginHistory.model.js'
import Logger from '../models/log.model.js'
dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const MAX_FAILED_ATTEMPTS = 5
const LOCK_TIME = 15 * 60 * 1000 // 15 minutes

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // or 465 for SSL
  secure: false, // true for SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ message: 'User Already Exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    })

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: Date.now() + 15 * 60 * 1000, // expires in 15 minutes
      lastVerificationRequest: Date.now(),
      verificationRequestCount: 1,
    })

    await newUser.save()

    // logging
    await Logger.create({
      user: newUser._id,
      action: 'User Registered',
      details: { email: newUser.email },
    })
    // logging

    const verificationUrl = `${process.env.FRONTEND_URL_PRODUCTION}verify?token=${verificationToken}`
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: 'Verify your email',
      html: `
      <p>Dear ${newUser.firstName},</p>
      <p>Thank you for registering with us. To complete the registration process, please click on the link below to confirm your email address:</p>
      <p><a href="${verificationUrl}">Confirm Email</a></p>
      <p>This link will expire in 15 minutes. If you do not verify your email within this time, you will need to request a new confirmation link.</p>
      <p>Best regards,<br>Skill Bridge Virtual Careers</p>
        `,
    })

    return res.status(201).json({
      message: 'User Registered Successfully. Verification email sent.',
      tokenREST: verificationToken,
    })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { email } = decoded

    const user = await User.findOne({ email })

    if (!user) {
      await Logger.create({
        action: 'Email Verification Attempt Failed',
        details: { email, reason: 'User not found or expired token' },
      })

      return res
        .status(404)
        .json({ message: 'User Not Found or Expired Token' })
    }

    if (user.isVerified) {
      await Logger.create({
        action: 'Email Verification Attempt Failed',
        details: { email, reason: 'User already verified' },
      })

      return res.status(400).json({ message: 'User Already Verified' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined

    await user.save()

    await Logger.create({
      user: user._id,
      action: 'Email Verified',
      details: { email: user.email },
    })

    return res.status(200).json({ message: 'Email Verified Successfully' })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const thisUser = await User.findOne({ email })

  if (!thisUser) {
    await Logger.create({
      action: 'Failed Login Attempt',
      details: { email, reason: 'User not found' },
    })

    return res.status(404).json({ message: 'User not found with this email' })
  }

  if (!thisUser.isVerified) {
    await Logger.create({
      action: 'Failed Login Attempt',
      details: { email, reason: 'User not verified' },
    })

    return res
      .status(403)
      .json({ message: 'Please verify your account before logging in.' })
  }

  const isLocked = thisUser.lockUntil && thisUser.lockUntil > Date.now()

  if (isLocked) {
    const lockDuration = Math.ceil(
      (thisUser.lockUntil - Date.now()) / 1000 / 60
    )

    await Logger.create({
      action: 'Failed Login Attempt',
      details: { email, reason: 'Account is locked', lockDuration },
    })

    return res.status(403).json({
      message: `Too many failed login attempts. Try again in ${lockDuration} minutes.`,
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, thisUser.password)

  if (!isPasswordCorrect) {
    thisUser.failedLoginAttempts += 1

    if (thisUser.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      thisUser.lockUntil = Date.now() + LOCK_TIME
    }

    await Logger.create({
      action: 'Failed Login Attempt',
      details: { email, reason: 'Incorrect password' },
    })
    await thisUser.save()

    return res.status(401).json({
      message:
        thisUser.failedLoginAttempts >= MAX_FAILED_ATTEMPTS
          ? `Too many login attempts. Try again after 15 minutes.`
          : 'Incorrect email or password.',
    })
  }

  thisUser.failedLoginAttempts = 0
  thisUser.lockUntil = undefined
  await thisUser.save()

  const ipAddress = req.ip || req.connection.remoteAddress
  const userAgent = req.get('User-Agent')

  await LogLogin.create({
    user: thisUser._id,
    ipAddress,
    userAgent,
  })

  const token = jwt.sign(
    {
      id: thisUser._id,
      email: thisUser.email,
      firstName: thisUser.firstName,
      lastName: thisUser.lastName,
      role: thisUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  await Logger.create({
    user: thisUser._id,
    action: 'User Logged In',
    details: { email: thisUser.email },
  })

  return res.status(200).json({
    message: 'Login Successful',
    token,
  })
}

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' })
    }

    const maxRequestsPerDay = 5
    const cooldownPeriod = 5 * 60 * 1000 // 5 minutes
    const dayInMilliseconds = 24 * 60 * 60 * 1000 // 24 hours

    if (Date.now() - user.lastVerificationRequest >= dayInMilliseconds) {
      user.verificationRequestCount = 0
    }

    if (Date.now() - user.lastVerificationRequest < cooldownPeriod) {
      return res.status(429).json({
        message:
          'Please wait 5 minutes before requesting a new verification email',
      })
    }

    if (user.verificationRequestCount >= maxRequestsPerDay) {
      return res.status(429).json({
        message:
          'You have exceeded the number of verification requests for today',
      })
    }

    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // 15 minutes expiration
    )

    user.verificationToken = verificationToken
    user.verificationTokenExpires = Date.now() + 15 * 60 * 1000 // 15 minutes from now
    user.lastVerificationRequest = Date.now()
    user.verificationRequestCount += 1

    await user.save()

    // Send the verification email
    const verificationUrl = `${process.env.FRONTEND_URL_PRODUCTION}/verify?token=${verificationToken}`
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Verify your email',
      html: `
      <p>Dear ${user.firstName},</p>
      <p>Please verify your email by clicking the link below:</p>
      <p><a href="${verificationUrl}">Verify Email</a></p>
      <p>This link will expire in 15 minutes. If you do not verify your email within this time, you will need to request a new confirmation link.</p>
      <p>If you have any questions or need further assistance, please do not hesitate to contact us <a href="${process.env.FRONTEND_URL_PRODUCTION}contact-us">here</a>.</p>
      <p>Best regards,<br>Skill Bridge Virtual Careers</p>
      `,
    })

    res.status(200).json({
      message: 'Verification email sent successfully.',
      verificationToken,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' })
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          'Your account is not verified. Please verify your account first',
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')

    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    const resetTokenExpires = Date.now() + 15 * 60 * 1000 // 15 minutes from now

    user.resetPasswordToken = hashedResetToken
    user.resetPasswordExpires = resetTokenExpires
    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL_PRODUCTION}reset/${resetToken}`

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">Reset Password</a><br />
             <p>This link is valid for 15 minutes.</p>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error)
        return res.status(500).json({ message: 'Error sending email' })
      }

      res.status(200).json({
        message: 'Password reset link sent to your email',
        resetToken: hashedResetToken,
      })
    })
  } catch (error) {
    console.error('Server error:', error.message)
    return res.status(500).json({ message: 'Server error: ' + error.message })
  }
}

export const resetPassword = async (req, res) => {
  const { resetToken } = req.params
  const { password } = req.body

  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters long' })
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Confirmation',
      html: `
        <p>Dear ${user.firstName},</p>
        <p>We are pleased to inform you that your password has been successfully reset.</p>
        <p>For security reasons, we recommend following these tips when creating a password in the future:</p>
        <ul>
          <li>Use at least 8 characters, including uppercase, lowercase letters, numbers, and special symbols.</li>
          <li>Avoid common words or easily guessable information like your name or birthdate.</li>
          <li>Consider using a passphrase or a combination of random words.</li>
          <li>Update your password regularly to ensure the safety of your account.</li>
        </ul>
        <p>If you have any questions or need further assistance, feel free to reach out to us <a href="${process.env.FRONTEND_URL_PRODUCTION}contact">here</a>.</p>
        <p>Best regards,<br>Skill Bridge Virtual Careers</p>
      `,
    })

    await Logger.create({
      user: user._id,
      action: 'Password Reset',
      details: { email: user.email },
    })

    return res
      .status(200)
      .json({ message: 'Password has been reset successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message })
  }
}

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  return ticket.getPayload()
}

export const googleSignup = async (req, res) => {
  const { code } = req.body

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.FRONTEND_URL_PRODUCTION}google-callback`,
        grant_type: 'authorization_code',
      }
    )

    const { id_token } = tokenResponse.data
    const { sub } = jwtDecode(id_token)
    const userGoogleRegistered = await User.find({ googleId: sub }).limit(1)

    // if the user it not registered
    if (!userGoogleRegistered.length) {
      const {
        given_name: firstName,
        family_name: lastName,
        email,
        picture,
        sub: googleId,
        email_verified: isVerified,
      } = jwtDecode(id_token)

      const existingUser = await User.findOne({ email })

      if (existingUser) {
        const token = jwt.sign(
          {
            id: existingUser._id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            picture: existingUser.picture,
            role: existingUser.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        const ipAddress = req.ip || req.connection.remoteAddress
        const userAgent = req.get('User-Agent')

        await Logger.create({
          user: user._id,
          action: 'User Google Sign-In',
          details: { email: user.email, ipAddress, userAgent },
        })

        await LogLogin.create({
          user: existingUser._id,
          ipAddress,
          userAgent,
        })

        return res.status(200).json({
          token,
        })
      }

      const user = new User({
        firstName,
        lastName,
        email,
        isVerified,
        picture,
        googleId,
      })

      await user.save()

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      const ipAddress = req.ip || req.connection.remoteAddress
      const userAgent = req.get('User-Agent')

      await LogLogin.create({
        user: user._id,
        ipAddress,
        userAgent,
      })

      await Logger.create({
        user: user._id,
        action: 'User Logged In',
        details: { email: user.email },
      })

      return res.status(200).json({
        token,
      })
    } else {
      const token = jwt.sign(
        {
          id: userGoogleRegistered[0]._id,
          email: userGoogleRegistered[0].email,
          firstName: userGoogleRegistered[0].firstName,
          lastName: userGoogleRegistered[0].lastName,
          role: userGoogleRegistered[0].role,
          picture: userGoogleRegistered[0].picture,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      const ipAddress = req.ip || req.connection.remoteAddress
      const userAgent = req.get('User-Agent')

      await LogLogin.create({
        user: userGoogleRegistered[0]._id,
        ipAddress,
        userAgent,
      })

      await Logger.create({
        user: userGoogleRegistered[0]._id,
        action: 'User Logged In',
        details: { email: userGoogleRegistered[0].email },
      })

      return res.status(200).json({
        token,
      })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message })
  }
}

export const googleSign = async (req, res) => {
  const { code } = req.body
  console.log(`google sign in`)

  try {
    const googleData = await exchangeCodeForToken(code)
    const user = await findOrCreateUser(googleData)

    const jwtToken = createJWT(user)
    res.json({ token: jwtToken })
  } catch (error) {
    res.status(400).json({ message: 'Google login failed' })
  }
}

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const oAuthSignUp = async (req, res) => {
  const { tokenId } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { sub, email, name, picture } = payload

    const user = { id: sub, email, name, picture }

    const token = generateToken(user)

    res.status(200).json({ token, user })
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token' })
  }
}
