import express from 'express'
import {
  book,
  deleteAllBookings,
  getAllBookings,
  getAllBookingsByDate,
  getAllBookingsByStatus,
  getAllAvailableTimesByDate,
  updateBookingStatus,
  getSingleBooking,
  getBookingsByUser,
  getHolidaysBasedOnUserIp,
  getThreeUpcomingPendingBookingsByUser,
} from '../controllers/booking.controller.js'
const router = express.Router()

router.post('/', book)
router.get('/', getAllBookings)
router.get('/:bookingId', getSingleBooking)
router.delete('/delete-all-bookings', deleteAllBookings)
router.get('/get-by-date', getAllBookingsByDate)
router.get('/get-available-time-by-date/time', getAllAvailableTimesByDate)
router.patch('/update-status/:bookingId', updateBookingStatus)
router.get('/status/:status', getAllBookingsByStatus)
router.get('/users-book/bookings', getBookingsByUser)
router.get('/get/holidays', getHolidaysBasedOnUserIp)
router.get(
  '/get/upcomming-three-bookings',
  getThreeUpcomingPendingBookingsByUser
)

export default router
