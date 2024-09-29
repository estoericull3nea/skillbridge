import express from 'express'
import {
  book,
  deleteAllBookings,
  getAllBookings,
} from '../controllers/booking.controller.js'
const router = express.Router()

router.post('/', book)
router.get('/', getAllBookings)
router.delete('/delete-all-bookings', deleteAllBookings)

export default router
