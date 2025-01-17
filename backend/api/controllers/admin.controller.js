import Booking from '../models/booking.model.js'
import User from '../models/user.model.js'
import Feedback from '../models/feedback.model.js'

export const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({ isDeleted: false })

    const pendingBookings = await Booking.countDocuments({
      status: 'pending',
    })

    const canceledBookings = await Booking.countDocuments({
      status: 'canceled',
    })

    const ongoingBookings = await Booking.countDocuments({
      status: 'ongoing',
    })

    const doneBookings = await Booking.countDocuments({
      status: 'done',
    })

    const rejectedBookings = await Booking.countDocuments({
      status: 'rejected',
    })

    const missedBookings = await Booking.countDocuments({
      status: 'missed',
    })

    const upcomingBookings = await Booking.countDocuments({
      status: 'pending',
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

export const getRecentBookings = async (req, res) => {
  try {
    const recentBookings = await Booking.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'firstName lastName email')
      .select('specificService date status meeting email')
      .populate(
        'meeting',
        'topic start_time duration timezone start_url join_url'
      )

    res.status(200).json(recentBookings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getNewUsers = async (req, res) => {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const newUsers = await User.find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: -1 })
      .limit(10)

    res.status(200).json(newUsers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await User.find({
      active: true,
    })
      .sort({ lastLogin: -1 })
      .limit(10)

    res.status(200).json(activeUsers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getRecentFeedback = async (req, res) => {
  try {
    const recentFeedback = await Feedback.find({})
      .sort({ createdAt: -1 })
      .limit(10)

    res.status(200).json(recentFeedback)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getNewUsersTrend = async (req, res) => {
  try {
    const today = new Date()
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 7)

    const newUsersTrend = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastWeek },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    res.status(200).json(newUsersTrend)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const getBookingTrend = async (req, res) => {
  try {
    const today = new Date()
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 7)

    const bookingTrend = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: lastWeek },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    res.status(200).json(bookingTrend)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
