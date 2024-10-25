import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // Adjust based on your import style

const AllowedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token')
  let userRole = null

  if (token) {
    const decodedToken = jwtDecode(token)
    userRole = decodedToken?.role // Get the role from the token
  }

  // Check if user role is allowed
  return allowedRoles.includes(userRole) ? (
    element // Render the component if allowed
  ) : (
    <Navigate to='/unauthorized' replace /> // Redirect if not allowed
  )
}

export default AllowedRoute
