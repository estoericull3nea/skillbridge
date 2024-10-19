import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bookingExperience: {
      type: String,
    },
    serviceQuality: {
      type: String,
    },
    overallSatisfaction: {
      type: String,
      required: true,
    },
    feedbackType: {
      type: String,
      default: 'General Feedback',
    },
    suggestions: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Feedback', feedbackSchema)
