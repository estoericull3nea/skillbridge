import Booking from '../models/booking.model.js'
import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

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
  } = req.body
  // ===========

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // ===========
    const validTimeSlots = Booking.schema.path('time').enumValues

    if (!validTimeSlots.includes(time)) {
      return res.status(400).json({
        message: `Invalid time slot. Choose an hour between ${
          validTimeSlots[0]
        } and ${validTimeSlots[validTimeSlots.length - 1]}.`,
      })
    }

    const existingBooking = await Booking.findOne({ date, time }).session(
      session
    )

    if (existingBooking) {
      await session.abortTransaction()
      session.endSession()
      return res
        .status(400)
        .json({ message: 'This time slot is already booked.' })
    }
    // ===========

    // ===========
    const activeBookingStatuses = ['pending', 'ongoing']
    const userBookingsCount = await Booking.countDocuments({
      email,
      status: { $in: activeBookingStatuses },
    })

    if (userBookingsCount >= 3) {
      return res.status(400).json({
        message:
          'You have reached the booking limit of 3 active bookings, Make it done first',
      })
    }
    // ===========

    const month = new Date(date).toLocaleString('en-US', { month: 'long' })

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
    })

    await newBooking.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
      message: 'Successfully Booked',
      newBooking,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
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

  console.log(date)

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
    const availableTimeSlots = Booking.schema.path('time').enumValues
    const bookedTimes = await Booking.find({
      date: parsedDate,
    }).select('time')
    const bookedTimeSlots = bookedTimes.map((booking) => booking.time)
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

  try {
    const validStatuses = Booking.schema.path('status').enumValues
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Valid statuses are: ${validStatuses.join(
          ', '
        )}.`,
      })
    }

    const bookings = await Booking.find({ status })

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
    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' })
    }

    return res.status(200).json(booking)
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

export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params
  const { status } = req.body

  try {
    const validStatuses = Booking.schema.path('status').enumValues
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Valid statuses are: ${validStatuses.join(
          ', '
        )}.`,
      })
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
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

export const getBookingsByUser = async (req, res) => {
  const { email } = req.params

  try {
    const bookings = await Booking.find({ email })

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
