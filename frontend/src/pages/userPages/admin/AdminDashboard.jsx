import React, { useState, useEffect } from 'react'
import { GrSchedules } from 'react-icons/gr'
import axios from 'axios'
import RecentBookings from './components/RecentBookings'
import RecentNewAndActiveUsers from './components/RecentNewAndActiveUsers'

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}admin/stats`
        )
        setStats(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching booking stats:', error)
      }
    }

    setTimeout(fetchStats, 2000)
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

  return (
    <div>
      <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-1'>
        {statItems.map((stat, index) => (
          <div
            key={index}
            className='stat bg-white shadow-xl rounded-xl p-6 mb-4'
          >
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>

            <div>
              <div className='stat-title flex items-center gap-3'>
                <GrSchedules />
                {isLoading ? (
                  <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
                ) : (
                  stat.title
                )}
              </div>

              <div className='stat-value'>
                {isLoading ? (
                  <div className='h-6 w-16 bg-gray-200 rounded animate-pulse'></div>
                ) : (
                  stat.value
                )}
              </div>
              <div className='stat-desc'>
                {isLoading ? (
                  <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
                ) : (
                  'Jan 1st - Feb 1st'
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RecentBookings />
      <RecentNewAndActiveUsers />
    </div>
  )
}

export default AdminDashboard
