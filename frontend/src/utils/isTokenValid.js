import { jwtDecode } from 'jwt-decode'

export const isTokenValid = (token) => {
  if (!token) {
    return false // Token does not exist
  }

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000

    console.log(`is token valid: ${decoded.exp && decoded.exp > currentTime}`)

    return decoded.exp && decoded.exp < currentTime
  } catch (error) {
    return false
  }
}
