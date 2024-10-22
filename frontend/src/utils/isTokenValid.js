import { jwtDecode } from 'jwt-decode'

// export const isTokenValid = (token) => {
//   if (!token) {
//     return false // Token does not exist
//   }

//   try {
//     const decoded = jwtDecode(token)
//     const currentTime = Date.now() / 1000

//     console.log(`is token valid: ${decoded.exp && decoded.exp > currentTime}`)

//     return decoded.exp && decoded.exp > currentTime
//   } catch (error) {
//     return false
//   }
// }

export const isTokenValid = () => {
  const token = localStorage.getItem('token') // Assuming the token is stored under 'token'
  if (!token) {
    return false // No token found, user is not logged in
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1])) // Decode JWT
  const currentTime = Date.now() / 1000 // Get current time in seconds
  if (decodedToken.exp < currentTime) {
    return false // Token has expired
  }

  return true // Token is valid
}
