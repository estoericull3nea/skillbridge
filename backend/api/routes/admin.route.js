import express from 'express'
import {
  getActiveUsers,
  getBookingStats,
  getNewUsers,
  getRecentBookings,
} from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/stats', getBookingStats)
router.get('/recent-bookings', getRecentBookings)

router.get('/new-users', getNewUsers)
router.get('/active-users', getActiveUsers)

export default router
