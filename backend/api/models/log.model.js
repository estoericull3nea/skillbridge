import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object, default: {} },
})

const Log = mongoose.model('Log', logSchema)

export default Log
