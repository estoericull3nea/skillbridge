import mongoose from 'mongoose'

const zoomTokenSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
})

export default mongoose.model('ZoomToken', zoomTokenSchema)
