// ================================== Imports ==================================
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Routes
import bookRouter from './api/routes/booking.route.js'
// import authRouter from './api/routes/auth.route.js'
// import loginHistoryRouter from './api/routes/loginHistory.route.js'
// import feedbackRouter from './api/routes/feedback.route.js'
// import contactRouter from './api/routes/contact.route.js'
// import counterRouter from './api/routes/counter.route.js'
// import adminRouter from './api/routes/admin.route.js'
// import analyticsRouter from './api/routes/analytics.route.js'
// import visitRouter from './api/routes/visit.route.js'

import connectDB from './api/utils/connectDB.js'

const allowedOrigins = [
  'http://localhost:5173',
  //   'https://student-support-satisfaction.vercel.app',
]

// Cleaning of expired token every hour
// import './api/utils/cronJobs.js'

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

// Using Routes
app.use('/api/book', bookRouter)
// app.use('/api/auth', authRouter)
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