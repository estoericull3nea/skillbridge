// models/Booking.js
import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    notes: { type: String, required: false },

    service: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TimeSlot',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled', 'ongoing', 'reject'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
