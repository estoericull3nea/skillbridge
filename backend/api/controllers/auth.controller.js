import User from '../models/user.model.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

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

    const verificationUrl = `http://localhost:5000/api/auth/verify?token=${verificationToken}`
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: 'Verify your email',
      html: `
      <p>Dear ${newUser.firstName},</p>
      <p>Thank you for registering with us. To complete the registration process, please click on the link below to confirm your email address:</p>
      <p><a href="${verificationUrl}">Confirm Email</a></p>
      <p>This link will expire in 15 minutes. If you do not verify your email within this time, you will need to request a new confirmation link.</p>
      <p>If you have any questions or need further assistance, please do not hesitate to contact us <a href="${process.env.FRONTEND_URL_DEVELOPMENT}contact-us">here</a>.</p>
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
      return res.status(404).json({ message: 'User Not Found' })
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User Already Verified' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined

    await user.save()

    return res.status(200).json({ message: 'Email Verified Successfully' })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
