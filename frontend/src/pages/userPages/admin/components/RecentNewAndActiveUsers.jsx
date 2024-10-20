import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RecentNewAndActiveUsers = () => {
  const [isLoadingNewUsers, setIsLoadingNewUsers] = useState(true)
  const [isLoadingActiveUsers, setIsLoadingActiveUsers] = useState(true)
  const [newUsers, setNewUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState([])

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}admin/new-users`
        )
        setNewUsers(data)
        setIsLoadingNewUsers(false)
      } catch (error) {
        console.error('Error fetching new users:', error)
      }
    }

    const fetchActiveUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}admin/active-users`
        )
        setActiveUsers(data)
        setIsLoadingActiveUsers(false)
      } catch (error) {
        console.error('Error fetching active users:', error)
      }
    }

    fetchNewUsers()
    fetchActiveUsers()
  }, [])

  const skeletonRows = Array(5).fill(0)

  return (
    <div>
      {/* New Users Section */}
      <h2 className='text-2xl font-semibold mb-4'>New Users</h2>
      <div className='overflow-x-auto mb-8'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingNewUsers
              ? skeletonRows.map((_, index) => (
                  <tr key={index} className='animate-pulse'>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-32'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-48'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-32'></div>
                    </td>
                  </tr>
                ))
              : newUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Active Users Section */}
      <h2 className='text-2xl font-semibold mb-4'>Active Users</h2>
      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingActiveUsers
              ? skeletonRows.map((_, index) => (
                  <tr key={index} className='animate-pulse'>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-32'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-48'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-32'></div>
                    </td>
                  </tr>
                ))
              : activeUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentNewAndActiveUsers
