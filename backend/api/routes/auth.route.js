import express from 'express'
import {
  forgotPassword,
  googleSignup,
  login,
  register,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify', verifyEmail)
router.post('/login', login)
router.post('/resend-verification', resendVerificationEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:resetToken', resetPassword)

router.post('/google-signup', googleSignup)

export default router
