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

    specificService: { type: String, required: true },

    //'Customer Service',
    //'Writing and Editing',
    //'Social Media Management',
    //'Technical Skills',
    // 'Talent Sourcing',
    //'Talent Screening',
    //'Interviewing and Assessment',
    //'Endorsement',
    //'Onboarding (Optional)',

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

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    startTime: { type: String },
    endTime: { type: String },
    duration: { type: Number },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
