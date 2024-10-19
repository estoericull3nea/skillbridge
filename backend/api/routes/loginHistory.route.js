import express from 'express'
import { getLoginHistoryByUserId } from '../controllers/loginHistory.controller.js'

const router = express.Router()

router.get('/:userId', getLoginHistoryByUserId)

export default router
