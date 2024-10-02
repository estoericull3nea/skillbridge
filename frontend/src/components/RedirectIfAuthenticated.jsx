import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem('token')

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000

      if (decodedToken.exp > currentTime) {
        return <Navigate to='/' />
      }
    } catch (error) {
      localStorage.removeItem('token')
    }
  }

  return children
}

export default RedirectIfAuthenticated
