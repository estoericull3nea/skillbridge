import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RecentBookings = ({ trigger }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}admin/recent-bookings`
        )
        setRecentBookings(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching recent bookings:', error)
      }
    }

    fetchRecentBookings()
  }, [trigger])

  const skeletonRows = Array(5).fill(0)

  return (
    <div className='recent-bookings-section'>
      <h2 className='text-2xl font-semibold mb-4'>Recent Bookings</h2>
      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Service</th>
              <th>Meeting Start Time</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <tr key={index} className='animate-pulse'>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-24'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-24'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-20'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-16'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-28'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-32'></div>
                    </td>
                  </tr>
                ))
              : recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      {booking.user
                        ? `${booking.user.firstName} ${booking.user.lastName}`
                        : 'Unknown User'}
                    </td>
                    <td>{booking?.email}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.status}</td>
                    <td>{booking.specificService}</td>
                    <td>
                      {new Date(booking.meeting.start_time).toLocaleDateString(
                        'en-US',
                        {
                          timeZone: booking.meeting.timezone,
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }
                      )}{' '}
                      {new Date(booking.meeting.start_time).toLocaleTimeString(
                        'en-US',
                        {
                          timeZone: booking.meeting.timezone,
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        }
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentBookings
