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
          `${import.meta.env.VITE_PROD_BACKEND_URL}admin/new-users`
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
          `${import.meta.env.VITE_PROD_BACKEND_URL}admin/active-users`
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
    <div className='mt-6 p-6 bg-white rounded-lg shadow-md'>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* New Users Section */}
        <div className='overflow-x-auto'>
          <h2 className='text-2xl font-bold mb-6 text-gray-700'>New Users</h2>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-4 border-b'>Full Name</th>
                <th className='p-4 border-b'>Email</th>
                <th className='p-4 border-b'>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingNewUsers
                ? skeletonRows.map((_, index) => (
                    <tr key={index} className='animate-pulse'>
                      <td className='p-4'>
                        <div className='h-4 bg-gray-300 rounded w-32'></div>
                      </td>
                      <td className='p-4'>
                        <div className='h-4 bg-gray-300 rounded w-48'></div>
                      </td>
                      <td className='p-4'>
                        <div className='h-4 bg-gray-300 rounded w-32'></div>
                      </td>
                    </tr>
                  ))
                : newUsers.map((user) => (
                    <tr key={user._id} className='hover:bg-gray-50'>
                      <td className='p-4 border-b'>
                        {user.firstName} {user.lastName}
                      </td>
                      <td className='p-4 border-b'>{user.email}</td>
                      <td className='p-4 border-b'>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className='overflow-x-auto'>
          <h2 className='text-2xl font-bold mb-6 text-gray-700'>
            Active Users
          </h2>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-4 border-b'>Full Name</th>
                <th className='p-4 border-b'>Email</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingActiveUsers
                ? skeletonRows.map((_, index) => (
                    <tr key={index} className='animate-pulse'>
                      <td className='p-4'>
                        <div className='h-4 bg-gray-300 rounded w-32'></div>
                      </td>
                      <td className='p-4'>
                        <div className='h-4 bg-gray-300 rounded w-48'></div>
                      </td>
                    </tr>
                  ))
                : activeUsers.map((user) => (
                    <tr key={user._id} className='hover:bg-gray-50'>
                      <td className='p-4 border-b'>
                        {user.firstName} {user.lastName}
                      </td>
                      <td className='p-4 border-b'>{user.email}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecentNewAndActiveUsers
