import Booking from '../models/booking.model.js'

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

  try {
    const newBooking = new Booking({
      service,
      date,
      time,
      email,
      firstName,
      lastName,
      phoneNumber,
      notes,
    })

    await newBooking.save()
    return res.status(201).json(newBooking)
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
    return res.status(200).json(bookings)
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
