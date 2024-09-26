// src/api/userApi.js
import axios from 'axios'

const BASE_URL = import.meta.env.BACKEND_URL

export const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${BASE_URL}/profile`, config)
  return response.data
}

export const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${BASE_URL}/profile`, userData, config)
  return response.data
}
