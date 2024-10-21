import cron from 'node-cron'
import Booking from '../models/booking.model.js'
import Blacklist from '../models/blacklist.model.js'

const cleanExpiredTokens = async () => {
  try {
    const result = await Blacklist.deleteMany({
      expiresAt: { $lt: new Date() },
    })
    console.log(
      `Expired tokens cleaned up: ${result.deletedCount} tokens removed.`
    )
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error.message)
  }
}

cron.schedule('0 * * * *', cleanExpiredTokens)

const updateMissedBookings = async () => {
  const now = new Date()
  try {
    const missedBookings = await Booking.find({
      date: { $lt: now },
      status: { $ne: 'missed' },
    })

    if (missedBookings.length > 0) {
      await Promise.all(
        missedBookings.map(async (booking) => {
          const bookingTime = new Date(
            `${booking.date.toISOString().split('T')[0]}T${booking.time}:00`
          )
          if (now > bookingTime) {
            booking.status = 'missed'
            await booking.save()
            console.log(`Updated booking ID ${booking._id} to missed.`)
          }
        })
      )
    }
  } catch (error) {
    console.error('Error updating missed bookings:', error)
  }
}

cron.schedule('*/5 * * * *', updateMissedBookings) // Runs every 5 minutes
