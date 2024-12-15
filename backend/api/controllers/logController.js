import Log from '../models/log.model.js'

// Create a log entry
export const createLog = async (req, res) => {
  const { user, action, details } = req.body

  try {
    const log = new Log({ user, action, details })
    await log.save()
    res.status(201).json(log)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Retrieve all logs
export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 })
    res.status(200).json(logs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
