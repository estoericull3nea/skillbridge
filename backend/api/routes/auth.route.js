import express from 'express'
import {
  forgotPassword,
  login,
  register,
  resendVerificationEmail,
  verifyEmail,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify', verifyEmail)
router.post('/login', login)
router.post('/resend-verification', resendVerificationEmail)
router.post('/forgot-password', forgotPassword)

export default router
