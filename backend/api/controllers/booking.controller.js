import Booking from '../models/booking.model.js'
import mongoose from 'mongoose'
import axios from 'axios'
import { parse, formatISO } from 'date-fns'
import ZoomToken from '../models/zoomToken.model.js'
import User from '../models/user.model.js'
import Meeting from '../models/meeting.model.js'
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

    const parsedDate = parse(startTimeZoom, 'MM/dd/yyyy H:mm', new Date())
    const isoStartTime = formatISO(parsedDate)

    const accessToken = await getAccessToken()

    console.log('test b4')

    // const response = await axios.post(
    //   `https://api.zoom.us/v2/users/me/meetings`,
    //   {
    //     topic: service,
    //     type: 2,
    //     start_time: isoStartTime,
    //     duration: 60,
    //     timezone: 'Asia/Shanghai',
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )

    console.log('test afte')

    // const {
    //   host_id,
    //   host_email,
    //   topic,
    //   status,
    //   start_time,
    //   duration,
    //   timezone,
    //   start_url,
    //   join_url,
    // } = response.data

    let userExists = await User.findOne({ email })

    // const newMeeting = new Meeting({
    //   user: userExists ? userExists._id : null,
    //   host_id,
    //   host_email,
    //   topic,
    //   status,
    //   start_time,
    //   duration,
    //   timezone,
    //   start_url,
    //   join_url,
    // })

    // await newMeeting.save()

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
          <p>Your Zoom meeting has been successfully scheduled. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Topic</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${specificService}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date and Time</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${formattedDate} ${time}</td>
            </tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${phoneNumber}</td>
            </tr>
             </tr>
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
    // Find bookings where isDeleted is false and populate the 'user' field
    const bookings = await Booking.find({ isDeleted: { $ne: true } }).populate(
      'user'
    )

    if (!bookings.length) {
      return res.status(404).json({ message: 'No Bookings Found' })
    }

    // Format the bookings as needed
    const formattedBookings = bookings.map((booking) => {
      return {
        ...booking._doc,
        date: new Date(booking.date).toLocaleDateString('en-US'),
        createdAt: new Date(booking.createdAt).toLocaleDateString('en-US'),
        updatedAt: new Date(booking.updatedAt).toLocaleDateString('en-US'),
      }
    })

    // Return the formatted bookings
    return res.status(200).json(formattedBookings)
  } catch (error) {
    // Return an error response if something goes wrong
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
    }).populate('user')

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

    // Send the holidays data back to the frontend
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

// export const updateBookingStatus = async (req, res) => {
//   const { bookingId } = req.params // Extract bookingId from params
//   const { status } = req.body // Extract status from request body

//   try {
//     // Check if the status is valid
//     const validStatuses = Booking.schema.path('status').enumValues
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         message: `Invalid status. Valid statuses are: ${validStatuses.join(
//           ', '
//         )}.`,
//       })
//     }

//     // Update the booking status by matching the bookingId
//     const updatedBooking = await Booking.findOneAndUpdate(
//       { _id: bookingId, isDeleted: false }, // Correct usage of bookingId here
//       { status },
//       { new: true }
//     )

//     // If booking not found
//     if (!updatedBooking) {
//       return res.status(404).json({ message: 'Booking not found.' })
//     }

//     return res
//       .status(200)
//       .json({ message: 'Update Successfully', updatedBooking })
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }

export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params // Extract bookingId from params
  const { status, startTime, endTime } = req.body // Extract status and time fields from request body

  try {
    // Check if the status is valid
    const validStatuses = Booking.schema.path('status').enumValues
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Valid statuses are: ${validStatuses.join(
          ', '
        )}.`,
      })
    }

    // Prepare fields to update
    const updateFields = { status }

    // Calculate duration and update startTime/endTime as needed
    if (status === 'ongoing' && startTime && endTime) {
      const start = new Date(startTime)
      const end = new Date(endTime)

      // Check if startTime is before endTime
      if (start >= end) {
        return res
          .status(400)
          .json({ message: 'End time must be after start time.' })
      }

      // Calculate duration in minutes
      const duration = Math.ceil((end - start) / 1000 / 60) // Convert milliseconds to minutes
      updateFields.startTime = startTime
      updateFields.endTime = endTime
      updateFields.duration = duration
    }

    // If marking as done, set endTime to current time and calculate duration
    if (status === 'done') {
      const now = new Date()
      updateFields.endTime = now // Set endTime to the current time

      // Assuming startTime is already set, calculate duration based on it
      if (updateFields.startTime) {
        const start = new Date(updateFields.startTime)
        const duration = Math.ceil((now - start) / 1000 / 60) // Calculate duration in minutes
        updateFields.duration = duration
      }
    }

    // Update the booking status by matching the bookingId
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId, isDeleted: false }, // Correct usage of bookingId here
      updateFields, // Include the fields to update
      { new: true }
    )

    // If booking not found
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

  const startDate = new Date()
  let endDate = new Date()

  switch (timeframe) {
    case 'daily':
      startDate.setDate(startDate.getDate() - 1)
      break
    case 'weekly':
      startDate.setDate(startDate.getDate() - 7)
      break
    case 'monthly':
      startDate.setMonth(startDate.getMonth() - 1)
      break
    case 'yearly':
      startDate.setFullYear(startDate.getFullYear() - 1)
      break
    default:
      return res.status(400).json({ message: 'Invalid timeframe' })
  }

  try {
    const bookings = await Booking.find({
      status: 'done', // Filter by status
    })

    const totalCount = bookings.reduce((acc, booking) => {
      return booking.specificService === service ? acc + 1 : acc
    }, 0)

    const result = {
      [service]: totalCount, // Total count of bookings
    }

    console.log(result)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counts', error })
  }
}
