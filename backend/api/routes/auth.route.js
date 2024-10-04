import express from 'express'
import {
  forgotPassword,
  googleSign,
  googleSignup,
  login,
  oAuthSignUp,
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
router.post('/google-lgoin', googleSign)

// testing
router.post('/google', oAuthSignUp)

export default router
