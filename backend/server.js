// ================================== Imports ==================================
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import { Server } from 'socket.io'
import http from 'http'

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
import logRouter from './api/routes/log.route.js'

import connectDB from './api/utils/connectDB.js'

const allowedOrigins = [
  'http://localhost:5173',
  'https://skillbridge-kappa.vercel.app',
]

// Cleaning of expired token every hour
import './api/utils/cronJobs.js'

// Serve static files (for serving the uploaded profile pictures)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const PORT = process.env.PORT || 5000
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
})

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id)

  // socket.on('feedbackSubmitted', (data) => {
  //   console.log('Feedback received:', data)

  //   const feedbackWithTimestamp = {
  //     ...data,
  //     createdAt: new Date().toISOString(),
  //   }

  //   io.emit('newFeedback', feedbackWithTimestamp)
  // })

  // socket.on('officeVisited', (data) => {
  //   io.emit('newOfficeVisited', data)
  // })

  // socket.on('submitContact', (data) => {
  //   const submitContactwithTimestamp = {
  //     ...data,
  //     createdAt: new Date().toISOString(),
  //   }

  //   io.emit('newContact', submitContactwithTimestamp)
  // })

  socket.on('meetingCanceled', (data) => {
    console.log('meetingCanceled received:', data)

    io.emit('newMeetingCanceled', data)
  })

  socket.on('bookService', (data) => {
    console.log('bookService received: ', data)
    io.emit('newBooking', data)
  })

  socket.on('approveBooking', (data) => {
    console.log('approveBooking received: ', data)
    io.emit('newApproveBooking', data)
  })

  socket.on('markAsDoneBooking', (data) => {
    console.log('markAsDoneBooking received: ', data)
    io.emit('newMarkAsDoneBooking', data)
  })

  socket.on('markAsRejectBooking', (data) => {
    console.log('markAsRejectBooking received: ', data)
    io.emit('newMarkAsRejectBooking', data)
  })

  socket.on('requestDeletion', (data) => {
    console.log('requestDeletion received: ', data)
    io.emit('newRequestDeletion', data)
  })

  socket.on('submitFeedback', (data) => {
    console.log('submitFeedback received: ', data)
    io.emit('newSubmitFeedback', data)
  })

  socket.on('ContactAdmin', (data) => {
    console.log('ContactAdmin received: ', data)
    io.emit('newContactAdmin', data)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

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
app.use('/api/v1/logs', logRouter)

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
    server.listen(PORT, () =>
      console.log(
        `Server is Running on http://localhost:${PORT}/ & Connected to Database`
      )
    )
  })
  .catch((err) => console.log(err))
