import mongoose from 'mongoose'

const meetingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    host_id: {
      type: String,
      required: true,
    },
    host_email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    start_url: {
      type: String,
      required: true,
    },
    join_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Meeting', meetingSchema)
