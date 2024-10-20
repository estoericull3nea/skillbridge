import express from 'express'
import { getBookingStats } from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/booking-stats', getBookingStats)

export default router
