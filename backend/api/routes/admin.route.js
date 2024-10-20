import express from 'express'
import { getBookingStats } from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/stats', getBookingStats)

export default router
