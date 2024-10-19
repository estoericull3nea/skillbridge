import Booking from '../models/booking.model.js'
import LoginHistory from '../models/loginHistory.model.js'
import User from '../models/user.model.js'
import { Parser } from 'json2csv'
import JSZip from 'jszip'

export const exportUsersData = async (req, res) => {
  const { userId } = req.params
  const { format } = req.query
  try {
    const user = await User.findById({ _id: userId })
    const bookingHistory = await Booking.find({ user: user._id }).populate(
      'meeting'
    )

    const loginHistory = await LoginHistory.find({ user: user._id })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const data = {
      user,
      bookingHistory,
      loginHistory,
    }

    if (format === 'csv') {
      const userFields = Object.keys(user._doc)

      const bookingFields =
        bookingHistory.length > 0 ? Object.keys(bookingHistory[0]._doc) : []

      const meetingFields =
        bookingHistory.length > 0 && bookingHistory[0].meeting
          ? Object.keys(bookingHistory[0].meeting._doc)
          : []

      const loginHistoryFields =
        loginHistory.length > 0 ? Object.keys(loginHistory[0]._doc) : []

      const records = bookingHistory.map((booking) => {
        const loginRecord = loginHistory.length > 0 ? loginHistory[0] : {}
        return {
          ...user._doc,
          ...booking._doc,
          ...(booking.meeting ? booking.meeting._doc : {}),
          ...loginRecord._doc,
        }
      })

      const csvFields = [
        ...userFields,
        ...bookingFields,
        ...meetingFields,
        ...loginHistoryFields,
      ]

      const json2csvParser = new Parser({ fields: csvFields })
      const csvData = json2csvParser.parse(records)

      res.setHeader(
        'Content-Disposition',
        `attachment; filename=user_data_${userId}.csv`
      )
      res.setHeader('Content-Type', 'text/csv')
      return res.send(csvData)
    } else if (format === 'zip') {
      const zip = new JSZip()
      zip.file(`user_data_${userId}.json`, JSON.stringify(data, null, 2))

      const content = await zip.generateAsync({ type: 'nodebuffer' })

      res.setHeader(
        'Content-Disposition',
        `attachment; filename=user_data_${userId}.zip`
      )
      res.setHeader('Content-Type', 'application/zip')
      return res.send(content)
    } else {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=user_data_${userId}.json`
      )
      res.setHeader('Content-Type', 'application/json')
      return res.json(data)
    }
  } catch (error) {
    console.error('Error exporting data:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
