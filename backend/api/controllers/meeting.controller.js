import dotenv from 'dotenv'
import axios from 'axios'
import User from '../models/user.model.js'
import { parse, formatISO } from 'date-fns'
import Meeting from '../models/meeting.model.js'
import ZoomToken from '../models/zoomToken.model.js'
import nodemailer from 'nodemailer'

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

export const authorize = async (req, res) => {
  const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`
  res.redirect(zoomAuthUrl)
}

export const getToken = async (req, res) => {
  try {
    const token = await ZoomToken.find()
    if (!token.length) {
      return res.status(404).json({ message: 'No token Found' })
    }
    return res.status(200).json(token)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const clearToken = async (req, res) => {
  try {
    const token = await ZoomToken.deleteMany()
    return res.status(200).json({ message: 'Token Cleared' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAccessToken = async () => {
  const tokenRecord = await ZoomToken.findOne()
  if (!tokenRecord) {
    return json
      .status(404)
      .json({ message: 'No Zoom token found. Please authorize first.' })
  }

  if (new Date() >= tokenRecord.expiresAt) {
    try {
      const response = await axios.post(
        'https://zoom.us/oauth/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: tokenRecord.refreshToken,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
            ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      const { access_token, refresh_token, expires_in } = response.data
      const newExpiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)

      // Update the database with the new tokens
      tokenRecord.accessToken = access_token
      tokenRecord.refreshToken = refresh_token
      tokenRecord.expiresAt = newExpiresAt
      await tokenRecord.save()

      return access_token
    } catch (error) {
      console.error(
        'Error refreshing access token:',
        error.response?.data || error.message
      )
      throw new Error('Failed to refresh access token.')
    }
  }

  return tokenRecord.accessToken
}

export const oAuthCallback = async (req, res) => {
  const { code } = req.query

  try {
    const response = await axios.post(
      'https://zoom.us/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.ZOOM_REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const { access_token, refresh_token, expires_in } = response.data
    const expiresAt = new Date(Date.now() + expires_in * 1000) // Calculate expiration date

    // Store or update the tokens in the database
    await ZoomToken.findOneAndUpdate(
      {},
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
      },
      { upsert: true, new: true } // Create a new document if it doesn't exist
    )

    // res.send('Zoom OAuth successful! Access token stored.')
    res.redirect('https://skillbridge-kappa.vercel.app/book-appointment')
  } catch (error) {
    console.error(
      'Error during OAuth callback:',
      error.response?.data || error.message
    )
    res.status(500).send('Failed to obtain access token.')
  }
}

export const createMeeting = async (req, res) => {
  try {
    const { topic, start_time, duration, email } = req.body

    // 10/2/2024 9:00

    const parsedDate = parse(start_time, 'MM/dd/yyyy H:mm', new Date())
    const isoStartTime = formatISO(parsedDate)

    const accessToken = await getAccessToken()

    const response = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings `,
      {
        topic,
        type: 2,
        start_time: isoStartTime,
        duration,
        timezone: 'Asia/Shanghai',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    // testing
    const userExists = await User.findOne({ email })

    if (userExists) {
      const {
        host_id,
        host_email,
        topic,
        status,
        start_time,
        duration,
        timezone,
        start_url,
        join_url,
      } = response.data

      const newMeeting = new Meeting({
        user: userExists._id,
        host_id,
        host_email,
        topic,
        status,
        start_time,
        duration,
        timezone,
        start_url,
        join_url,
      })

      await newMeeting.save()

      const formattedDate = new Date(start_time).toLocaleString('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
      })

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userExists.email,
        subject: `Your Zoom Meeting Booking: ${topic}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Zoom_Communications_Logo.svg" alt="Zoom Logo" style="width: 150px; height: auto;">
            </div>
            <h2 style="color: #2D8CFF; text-align: center;">Your Zoom Meeting is Scheduled!</h2>
            <p>Dear ${userExists.firstName},</p>
            <p>Your Zoom meeting has been successfully scheduled. Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Topic:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${topic}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date & Time:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Duration:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${duration} minutes</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time Zone:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${timezone}</td>
              </tr>
            </table>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${join_url}" style="background-color: #2D8CFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join Zoom Meeting</a>
            </div>
            <p>If you have any questions or need further assistance, please do not hesitate to <a href="${process.env.FRONTEND_URL_DEVELOPMENT}contact-us" style="color: #2D8CFF;">contact us</a>.</p>
            <p style="text-align: center; font-size: 12px; color: #888;">We look forward to your participation.<br>Best regards,<br>Skill Bridge Virtual Careers</p>
          </div>
        `,
      })

      res.status(200).json({
        message: 'Meeting created successfully',
        meetingDetails: newMeeting,
      })
    } else {
      res.status(200).json({
        message: 'Meeting created successfully',
        meetingDetails: response.data,
      })
    }

    // testing
  } catch (error) {
    console.error(
      'Error creating Zoom meeting:',
      error.response?.data || error.message
    )
    res.status(500).json({
      message: 'Failed to create meeting',
      error: error.response?.data || error.message,
    })
  }
}

export const getAllMeetings = async (req, res) => {
  try {
    const accessToken = await getAccessToken()

    const response = await axios.get(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          page_size: 30,
          type: 'waiting', // Try 'upcoming', 'scheduled', 'live', 'waiting'
        },
      }
    )

    res.status(200).json({
      message: 'Meetings retrieved successfully',
      meetings: response.data.meetings,
    })
  } catch (error) {
    console.error(
      'Error fetching meetings:',
      error.response?.data || error.message
    )
    res.status(500).json({
      message: 'Failed to retrieve meetings',
      error: error.response?.data || error.message,
    })
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const response = await axios.get('https://api.zoom.us/v2/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    res.status(200).json({
      message: 'User info retrieved successfully',
      user: response.data,
    })
  } catch (error) {
    console.error(
      'Error fetching user info:',
      error.response?.data || error.message
    )
    res.status(500).json({
      message: 'Failed to retrieve user info',
      error: error.response?.data || error.message,
    })
  }
}

export const getAllMeetingsNotZoom = async (req, res) => {
  try {
    const meeting = await Meeting.find()
    if (!meeting.length) {
      return res.status(404).json({ message: 'No meetings Found' })
    }
    return res.status(200).json(meeting)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getThreeUpcomingMeetingsByUser = async (req, res) => {
  const { userId } = req.query

  if (!userId) {
    return res
      .status(400)
      .json({ message: 'userId query parameter is required' })
  }

  try {
    const currentTime = new Date().toISOString() // Get the current time in ISO format

    // Find the next 3 upcoming meetings for the user
    const upcomingMeetings = await Meeting.find({
      user: userId, // Filter by userId
      start_time: { $gte: currentTime }, // Only future meetings
    })
      .sort({ start_time: 1 }) // Sort by start_time in ascending order
      .limit(3) // Limit to 3 results

    res.status(200).json(upcomingMeetings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching upcoming meetings for user', error })
  }
}

export const clearMeeting = async (req, res) => {
  try {
    await Meeting.deleteMany()
    return res.status(200).json({ message: 'All meetings have been cleared.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
