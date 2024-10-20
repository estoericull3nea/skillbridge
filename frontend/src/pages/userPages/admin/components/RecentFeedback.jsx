import React, { useState, useEffect } from 'react'
import axios from 'axios' // Assuming Axios for HTTP requests

const RecentFeedback = () => {
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    // Fetch recent feedback from the backend
    const fetchRecentFeedback = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}admin/recent-feedback`
        )
        setFeedback(data)
        setIsLoading(false) // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching recent feedback:', error)
      }
    }

    fetchRecentFeedback()
  }, [])

  const skeletonRows = Array(5).fill(0) // For creating 5 skeleton rows

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Recent User Feedbacks</h2>
      <div className='overflow-x-auto mb-8'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Date Submitted</th>
              <th>Feedback Category</th>
              <th>Booking Experience</th>
              <th>Service Quality</th>
              <th>Suggestions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <tr key={index} className='animate-pulse'>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-32'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-28'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-28'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-28'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-24'></div>
                    </td>{' '}
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-24'></div>
                    </td>
                    <td>
                      <div className='h-4 bg-gray-200 rounded w-20'></div>
                    </td>
                  </tr>
                ))
              : feedback.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{item.feedbackType}</td>
                    <td>{item.bookingExperience}</td>
                    <td>{item.serviceQuality}</td>
                    <td>{item.suggestions}</td>
                    <td>{item.overallSatisfaction}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentFeedback
