import express from 'express'
import {
  getActiveUsers,
  getBookingStats,
  getBookingTrend,
  getNewUsers,
  getNewUsersTrend,
  getRecentBookings,
  getRecentFeedback,
} from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/stats', getBookingStats)
router.get('/recent-bookings', getRecentBookings)

router.get('/new-users', getNewUsers)
router.get('/active-users', getActiveUsers)

router.get('/recent-feedback', getRecentFeedback)

router.get('/new-users-trend', getNewUsersTrend)
router.get('/booking-trend', getBookingTrend)

export default router
