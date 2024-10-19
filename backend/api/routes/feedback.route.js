import express from 'express'
import {
  deleteAllFeedbacks,
  getAllFeedbacks,
  getFeedbacksByEmail,
  submitFeedback,
} from '../controllers/feedback.controller.js'

const router = express.Router()

router.post('/', submitFeedback)
router.delete('/', deleteAllFeedbacks)
router.get('/', getAllFeedbacks)
router.get('/:email', getFeedbacksByEmail)

export default router
