// src/api/adminApi.js
import axios from 'axios'

const BASE_URL = import.meta.env.BACKEND_URL

export const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${BASE_URL}/users`, config)
  return response.data
}

export const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${BASE_URL}/users/${userId}`, config)
  return response.data
}
