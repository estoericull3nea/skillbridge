import dotenv from 'dotenv'
import axios from 'axios'
import User from '../models/user.model.js'
import { parse, formatISO } from 'date-fns'
dotenv.config()

let accessToken = ''

export const authorize = async (req, res) => {
  const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`
  res.redirect(zoomAuthUrl)
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

    accessToken = response.data.access_token
    res.send('Zoom OAuth successful! Access token obtained.')
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

    if (!accessToken) {
      return res.status(401).json({
        message: 'No access token available. Please authorize first.',
      })
    }

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

    res.status(200).json({
      message: 'Meeting created successfully',
      meetingDetails: response.data,
    })
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
    if (!accessToken) {
      return res.status(401).json({
        message: 'No access token available. Please authorize first.',
      })
    }

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

    console.log(response.data)

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
