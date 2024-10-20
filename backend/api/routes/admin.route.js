import express from 'express'
import {
  getBookingStats,
  getRecentBookings,
} from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/stats', getBookingStats)
router.get('/recent-bookings', getRecentBookings)

export default router
