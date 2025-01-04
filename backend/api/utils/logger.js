import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
export const logUserAction = async (user, action, details) => {
  try {
    await axios.post(`${process.env.BACKEND_URL_DEVELOPMENT}logs`, {
      user,
      action,
      details,
    })
  } catch (error) {
    console.error('Error logging user action:', error)
  }
}
