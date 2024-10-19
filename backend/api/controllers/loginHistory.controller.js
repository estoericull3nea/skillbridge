import LogLogin from '../models/loginHistory.model.js'

export const getLoginHistoryByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const loginHistory = await LogLogin.find({ user: userId })

    if (!loginHistory || loginHistory.length === 0) {
      return res
        .status(404)
        .json({ message: 'No login history found for this user.' })
    }

    res.status(200).json(loginHistory)
  } catch (error) {
    console.error('Error fetching login history:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}
