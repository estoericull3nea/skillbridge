import Booking from '../models/booking.model.js'
import mongoose from 'mongoose'
import axios from 'axios'
import { parse, formatISO } from 'date-fns'
import ZoomToken from '../models/zoomToken.model.js'
import User from '../models/user.model.js'
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

export const book = async (req, res) => {
  const {
    service,
    date,
    time,
    email,
    firstName,
    lastName,
    phoneNumber,
    notes,
    startTimeZoom,
    specificService,
  } = req.body

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const validTimeSlots = Booking.schema.path('time').enumValues

    if (!validTimeSlots.includes(time)) {
      await session.abortTransaction()
      return res.status(400).json({
        message: `Invalid time slot. Choose an hour between ${
          validTimeSlots[0]
        } and ${validTimeSlots[validTimeSlots.length - 1]}.`,
      })
    }

    const activeBookingStatuses = ['pending', 'ongoing']
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $in: activeBookingStatuses },
    }).session(session)

    if (existingBooking) {
      await session.abortTransaction()
      return res
        .status(400)
        .json({ message: 'This time slot is already booked.' })
    }

    const userBookingsCount = await Booking.countDocuments({
      email,
      status: { $in: activeBookingStatuses },
    })

    if (userBookingsCount >= 3) {
      await session.abortTransaction()
      return res.status(400).json({
        message:
          'You have reached the booking limit of 3 active bookings. Please complete them first.',
      })
    }

    const month = new Date(date).toLocaleString('en-US', { month: 'long' })

    let userExists = await User.findOne({ email })

    const newBooking = new Booking({
      service,
      date,
      time,
      email,
      firstName,
      lastName,
      phoneNumber,
      notes,
      month,
      meeting: 1,
      user: userExists ? userExists._id : null,
      specificService,
    })

    await newBooking.save({ session })

    const formattedDate = new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userExists ? userExists.email : email,
      subject: `Meeting Details`,
      html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #2D8CFF; text-align: center;">Wait for google meet code</h2>
  <p>Dear ${firstName},</p>
  <p>Your meeting has been successfully scheduled. Please expect a subsequent Google Meet invitation, which will be sent to your email shortly</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Topic</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${specificService}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date and Time</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${formattedDate} ${time}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${phoneNumber}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Notes</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${notes}</td>
    </tr>
  </table>
</div>

      `,
    }

    await transporter.sendMail(mailOptions)

    await session.commitTransaction()
    return res.status(201).json({ message: 'Successfully Booked', newBooking })
  } catch (error) {
    await session.abortTransaction()
    return res.status(500).json({ message: error.message })
  } finally {
    session.endSession()
  }
}

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDeleted: { $ne: true } })
      .populate('user')
      .sort({ createdAt: -1 })

    if (!bookings.length) {
      return res.status(404).json({ message: 'No Bookings Found' })
    }

    const formattedBookings = bookings.map((booking) => {
      return {
        ...booking._doc,
        date: new Date(booking.date).toLocaleDateString('en-US'),
        createdAt: new Date(booking.createdAt).toLocaleDateString('en-US'),
        updatedAt: new Date(booking.updatedAt).toLocaleDateString('en-US'),
      }
    })

    return res.status(200).json(formattedBookings)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllBookingsByDate = async (req, res) => {
  const { date } = req.query

  try {
    if (!date) {
      return res.status(400).json({ message: 'Date is required.' })
    }

    const [month, day, year] = date.split('/')
    const parsedDate = new Date(`${year}-${month}-${day}`)

    if (isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ message: 'Invalid date format. Use MM/DD/YYYY.' })
    }

    const startOfDay = new Date(parsedDate)
    startOfDay.setUTCHours(0, 0, 0, 0)

    const endOfDay = new Date(parsedDate)
    endOfDay.setUTCHours(23, 59, 59, 999)

    const bookings = await Booking.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isDeleted: false,
    })

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: 'No bookings found for the specified day.' })
    }

    return res.status(200).json(bookings)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllAvailableTimesByDate = async (req, res) => {
  const { date } = req.query

  try {
    if (!date) {
      return res.status(400).json({ message: 'Date is required.' })
    }

    const [month, day, year] = date.split('/')
    const parsedDate = new Date(`${year}-${month}-${day}`)
    if (isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ message: 'Invalid date format. Use MM/DD/YYYY.' })
    }

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999))

    const activeBookingStatuses = ['pending', 'ongoing']

    const bookedTimes = await Booking.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: activeBookingStatuses },
      isDeleted: false,
    }).select('time')

    const bookedTimeSlots = bookedTimes.map((booking) => booking.time)

    const availableTimeSlots = Booking.schema.path('time').enumValues
    const availableTimes = availableTimeSlots.filter(
      (time) => !bookedTimeSlots.includes(time)
    )

    return res.status(200).json({ availableTimes })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllBookingsByStatus = async (req, res) => {
  const { status } = req.params

  console.log(status)

  try {
    const validStatuses = Booking.schema.path('status').enumValues
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Valid statuses are: ${validStatuses.join(
          ', '
        )}.`,
      })
    }

    const bookings = await Booking.find({ status, isDeleted: false })

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: `No bookings found with status: ${status}.` })
    }

    return res.status(200).json(bookings)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getSingleBooking = async (req, res) => {
  const { bookingId } = req.params

  try {
    const booking = await Booking.findById({ bookingId, isDeleted: false })

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' })
    }

    return res.status(200).json(booking)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getBookingsByUser = async (req, res) => {
  const { email } = req.query

  try {
    const bookings = await Booking.find({
      email,
      isDeleted: { $ne: true },
    })
      .populate('user')
      .sort({ createdAt: -1 })

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: 'No bookings found for this user.' })
    }

    return res.status(200).json(bookings)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getHolidaysBasedOnUserIp = async (req, res) => {
  const API_KEY = 'f6r5NJwnrInzrVOpP0dUBGx63zNMl4AJ'
  const IPINFO_TOKEN = 'e1755304cd9acc'

  try {
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress

    const geoResponse = await axios.get(
      `https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`
    )
    const countryCode = geoResponse.data.country || 'PH'

    const holidayResponse = await axios.get(
      `https://calendarific.com/api/v2/holidays`,
      {
        params: {
          api_key: API_KEY,
          country: countryCode,
          year: 2024,
        },
      }
    )

    res.json(holidayResponse.data.response.holidays)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getThreeUpcomingPendingBookingsByUser = async (req, res) => {
  const { email } = req.query

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    const currentDate = new Date()

    const upcomingBookings = await Booking.find({
      email: email,
      status: 'pending',
      isDeleted: false,
    })

      .sort({ date: 1 })
      .limit(3)

    if (!upcomingBookings.length) {
      return res.status(404).json({ message: 'No Bookings Found' })
    }

    const bookingsWithStatus = upcomingBookings.map((booking) => {
      const bookingDate = new Date(booking.date)

      const [hours, minutes] = booking.time.split(':').map(Number)
      bookingDate.setHours(hours, minutes, 0, 0)

      if (bookingDate <= currentDate) {
        booking.status = 'missed'
      }

      return booking
    })

    res.status(200).json(bookingsWithStatus)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ message: 'Error fetching bookings', error })
  }
}

export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params
  const { status, startTime, endTime } = req.body

  try {
    const validStatuses = Booking.schema.path('status').enumValues
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Valid statuses are: ${validStatuses.join(
          ', '
        )}.`,
      })
    }

    const updateFields = { status }

    if (status === 'ongoing' && startTime && endTime) {
      const start = new Date(startTime)
      const end = new Date(endTime)

      if (start >= end) {
        return res
          .status(400)
          .json({ message: 'End time must be after start time.' })
      }

      const duration = Math.ceil((end - start) / 1000 / 60)
      updateFields.startTime = startTime
      updateFields.endTime = endTime
      updateFields.duration = duration
    }

    if (status === 'done') {
      const now = new Date()
      updateFields.endTime = now

      if (updateFields.startTime) {
        const start = new Date(updateFields.startTime)
        const duration = Math.ceil((now - start) / 1000 / 60)
        updateFields.duration = duration
      }
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId, isDeleted: false },
      updateFields,
      { new: true }
    )

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' })
    }

    return res
      .status(200)
      .json({ message: 'Update Successfully', updatedBooking })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteAllBookings = async (req, res) => {
  try {
    await Booking.deleteMany()
    return res.status(200).json({ message: 'All bookings have been cleared.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteBookingById = async (req, res) => {
  const { bookingId } = req.params

  try {
    const deletedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    )

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: 'Booking not found or already deleted.' })
    }

    return res
      .status(200)
      .json({ message: 'Booking has been marked as deleted.', deletedBooking })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const cancelMeeting = async (req, res) => {
  const { bookingId } = req.params

  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, isDeleted: false, status: { $ne: 'canceled' } },
      { status: 'canceled' },
      { new: true }
    )

    if (!booking) {
      return res
        .status(404)
        .json({ message: 'Booking not found or already canceled.' })
    }

    return res
      .status(200)
      .json({ message: 'Meeting canceled successfully.', booking })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getTotalSpecificServices = async (req, res) => {
  const { timeframe, service } = req.params
  const { startDate, endDate } = req.query

  try {
    let result = await Booking.aggregate([
      {
        $addFields: {
          parsedDate: {
            $dateFromString: {
              dateString: '$date',
              format: '%m/%d/%Y',
              onError: '$date',
              onNull: '$date',
            },
          },
        },
      },
      {
        $match: {
          status: 'done',
          specificService: service,
          ...(startDate && { parsedDate: { $gte: new Date(startDate) } }),
          ...(endDate && { parsedDate: { $lte: new Date(endDate) } }),
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {
                  case: { $eq: [timeframe, 'daily'] },
                  then: {
                    $dateToString: { format: '%Y-%m-%d', date: '$parsedDate' },
                  },
                },
                {
                  case: { $eq: [timeframe, 'weekly'] },
                  then: {
                    $dateToString: { format: '%Y-%U', date: '$parsedDate' },
                  },
                },
                {
                  case: { $eq: [timeframe, 'monthly'] },
                  then: {
                    $dateToString: { format: '%Y-%m', date: '$parsedDate' },
                  },
                },
              ],
              default: { $dateToString: { format: '%Y', date: '$parsedDate' } },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching counts:', error)
    res.status(500).json({ message: 'Error fetching counts', error })
  }
}
