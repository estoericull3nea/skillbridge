import React, { useState, useEffect } from 'react'
import { GrSchedules } from 'react-icons/gr'
import axios from 'axios'
import RecentBookings from './components/RecentBookings'
import RecentNewAndActiveUsers from './components/RecentNewAndActiveUsers'
import RecentFeedback from './components/RecentFeedback'
import DashboardCharts from './components/ChartComponent'

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [trigger, setTrigger] = useState(0)

  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    canceledBookings: 0,
    upcomingBookings: 0,
    ongoingBookings: 0,
    doneBookings: 0,
    rejectedBookings: 0,
    missedBookings: 0,
    totalUsers: 0,
    activeUsers: 0,
    inActiveUsers: 0,
  })

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_PROD_BACKEND_URL}admin/stats`
      )
      setStats(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching booking stats:', error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const statItems = [
    { title: 'Total Bookings', value: stats.totalBookings },
    { title: 'Pending Bookings', value: stats.pendingBookings },
    { title: 'Canceled Bookings', value: stats.canceledBookings },
    { title: 'Upcoming Bookings', value: stats.upcomingBookings },
    { title: 'Ongoing Bookings', value: stats.ongoingBookings },
    { title: 'Done Bookings', value: stats.doneBookings },
    { title: 'Rejected Bookings', value: stats.rejectedBookings },
    { title: 'Missed Bookings', value: stats.missedBookings },
    { title: 'Total Users', value: stats.totalUsers },
    { title: 'Active Users', value: stats.activeUsers },
    { title: 'Inactive Users', value: stats.inActiveUsers },
  ]

  useEffect(() => {
    socket.on('newMeetingCanceled', (data) => {
      fetchStats()
    })

    socket.on('newBooking', (data) => {
      fetchStats()
      setTrigger((prev) => prev + 1)
    })

    return () => {
      socket.off('newMeetingCanceled')
      socket.off('newBooking')
    }
  }, [])

  return (
    <div className=' min-h-screen'>
      <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6'>
        {statItems.map((stat, index) => (
          <div
            key={index}
            className='stat bg-gradient-to-r from-red-50 to-red-100 shadow-lg rounded-2xl p-8 transition transform hover:-translate-y-2 hover:shadow-2xl border border-red-200'
          >
            <div className='stat-figure text-red-500 text-4xl'>
              <GrSchedules />
            </div>

            <div className='text-center'>
              <div className='stat-title font-medium text-lg mb-2'>
                {isLoading ? (
                  <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
                ) : (
                  stat.title
                )}
              </div>

              <div className='stat-value text-3xl font-semibold'>
                {isLoading ? (
                  <div className='h-6 w-16 bg-gray-200 rounded animate-pulse'></div>
                ) : (
                  stat.value
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-10'>
        <RecentNewAndActiveUsers />
        <RecentFeedback />
        <DashboardCharts trigger={trigger} />
      </div>
    </div>
  )
}

export default AdminDashboard
