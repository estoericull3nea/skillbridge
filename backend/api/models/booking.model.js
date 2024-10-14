import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    notes: { type: String, required: false },

    service: { type: String, required: true },
    date: { type: Date, required: true },
    month: { type: String, required: true },

    time: {
      type: String,
      required: true,
      enum: [
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
      ],
    },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'canceled', 'rejected', 'done', 'missed'],
      default: 'pending',
    },
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meeting',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
