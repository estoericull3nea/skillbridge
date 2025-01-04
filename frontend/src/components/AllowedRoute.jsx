import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const AllowedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token')
  let userRole = null

  if (token) {
    const decodedToken = jwtDecode(token)
    userRole = decodedToken?.role
  }

  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to='/unauthorized' replace />
  )
}

export default AllowedRoute
