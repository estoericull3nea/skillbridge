// ================================== Imports ==================================
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Routes
import bookRouter from './api/routes/booking.route.js'
import authRouter from './api/routes/auth.route.js'
import userRouter from './api/routes/user.route.js'
import meetingRouter from './api/routes/meeting.route.js'
import loginHistoryRouter from './api/routes/loginHistory.route.js'
import exportUserDataRouter from './api/routes/dataExport.route.js'
import contactRouter from './api/routes/contact.route.js'
import feedbackRouter from './api/routes/feedback.route.js'
import adminRouter from './api/routes/admin.route.js'

import connectDB from './api/utils/connectDB.js'

const allowedOrigins = [
  'http://localhost:5173',
  //   'https://student-support-satisfaction.vercel.app',
]

// Cleaning of expired token every hour
import './api/utils/cronJobs.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

// Serve static files (for serving the uploaded profile pictures)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// http://localhost:5000/api/uploads/profile-pics/1726394178484-Screenshot-(254).png

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Using Routes
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/meetings', meetingRouter)
app.use('/api/v1/login-histories', loginHistoryRouter)
app.use('/api/v1/data-export', exportUserDataRouter)
app.use('/api/v1/contacts', contactRouter)
app.use('/api/v1/feedbacks', feedbackRouter)
app.use('/api/v1/admin', adminRouter)

// app.use('/api/feedbacks', feedbackRouter)
// app.use('/api/contacts', contactRouter)
// app.use('/api/logins/history', loginHistoryRouter)
// app.use('/api/count', counterRouter)
// app.use('/api/admin', adminRouter)
// app.use('/api/analytics', analyticsRouter)
// app.use('/api/visit', visitRouter)

// ================================== Connection to MongoDB ==================================
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is Running on http://localhost:${PORT}/ & Connected to Database`
      )
    )
  })
  .catch((err) => console.log(err))
