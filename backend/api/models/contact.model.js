import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)
