import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RecentFeedback = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    const fetchRecentFeedback = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}admin/recent-feedback`
        )
        setFeedback(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching recent feedback:', error)
      }
    }

    fetchRecentFeedback()
  }, [])

  const skeletonRows = Array(5).fill(0)

  return (
    <div className='mt-6 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-3xl font-bold mb-6 text-gray-700'>
        Recent User Feedbacks
      </h2>
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='p-4 border-b'>User Name</th>
              <th className='p-4 border-b'>Date Submitted</th>
              <th className='p-4 border-b'>Feedback Category</th>
              <th className='p-4 border-b'>Booking Experience</th>
              <th className='p-4 border-b'>Service Quality</th>
              <th className='p-4 border-b'>Suggestions</th>
              <th className='p-4 border-b'>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? skeletonRows.map((_, index) => (
                  <tr key={index} className='animate-pulse'>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-32'></div>
                    </td>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-28'></div>
                    </td>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-28'></div>
                    </td>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-28'></div>
                    </td>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-24'></div>
                    </td>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-24'></div>
                    </td>
                    <td className='p-4'>
                      <div className='h-4 bg-gray-300 rounded w-20'></div>
                    </td>
                  </tr>
                ))
              : feedback.map((item) => (
                  <tr key={item._id} className='hover:bg-gray-50'>
                    <td className='p-4 border-b'>{item.name}</td>
                    <td className='p-4 border-b'>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className='p-4 border-b'>{item.feedbackType}</td>
                    <td className='p-4 border-b'>{item.bookingExperience}</td>
                    <td className='p-4 border-b'>{item.serviceQuality}</td>
                    <td className='p-4 border-b'>{item.suggestions}</td>
                    <td className='p-4 border-b'>{item.overallSatisfaction}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentFeedback
