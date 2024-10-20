import Booking from '../models/booking.model.js'
import User from '../models/user.model.js'

export const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({ isDeleted: false })

    const pendingBookings = await Booking.countDocuments({
      status: 'pending',
      //   isDeleted: false,
    })

    const canceledBookings = await Booking.countDocuments({
      status: 'canceled',
      //   isDeleted: false,
    })

    const ongoingBookings = await Booking.countDocuments({
      status: 'ongoing',
      //   isDeleted: false,
    })

    const doneBookings = await Booking.countDocuments({
      status: 'done',
      //   isDeleted: false,
    })

    const rejectedBookings = await Booking.countDocuments({
      status: 'rejected',
      //   isDeleted: false,
    })

    const missedBookings = await Booking.countDocuments({
      status: 'missed',
      //   isDeleted: false,
    })

    const upcomingBookings = await Booking.countDocuments({
      //   date: { $gte: new Date() },
      status: 'pending',
      //   isDeleted: false,
    })

    const totalUsers = await User.countDocuments()

    const activeUsers = await User.countDocuments({ active: true })

    const inActiveUsers = await User.countDocuments({ active: false })

    res.status(200).json({
      totalBookings,
      pendingBookings,
      canceledBookings,
      ongoingBookings,
      doneBookings,
      rejectedBookings,
      missedBookings,
      upcomingBookings,
      totalUsers,
      activeUsers,
      inActiveUsers,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
