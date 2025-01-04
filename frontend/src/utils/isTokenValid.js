export const isTokenValid = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return false
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const currentTime = Date.now() / 1000
  if (decodedToken.exp < currentTime) {
    return false
  }

  return true
}
