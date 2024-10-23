import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FiTrash } from 'react-icons/fi' // Importing trash icon from react-icons

import { io } from 'socket.io-client'
const socket = io('http://localhost:5000')

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingExperience: '',
    serviceQuality: '',
    overallSatisfaction: '',
    feedbackType: 'General Feedback',
    suggestions: '',
  })

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}feedbacks`
      ) // Adjust the endpoint as necessary
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/feedbacks`,
        formData
      ) // Adjust the endpoint as necessary
      fetchFeedbacks() // Refresh the feedback list
      setFormData({
        name: '',
        email: '',
        bookingExperience: '',
        serviceQuality: '',
        overallSatisfaction: '',
        feedbackType: 'General Feedback',
        suggestions: '',
      }) // Reset form data
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DEV_BACKEND_URL}feedbacks/${id}`
      ) // Adjust the endpoint as necessary
      fetchFeedbacks() // Refresh the feedback list
    } catch (error) {
      console.error('Error deleting feedback:', error)
    }
  }

  useEffect(() => {
    socket.on('newSubmitFeedback', (data) => {
      fetchFeedbacks()
    })

    return () => {
      socket.off('newSubmitFeedback')
    }
  }, [])

  return (
    <div className='p-5'>
      {/* Feedback Table */}
      {loading ? (
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-300 rounded w-1/4 mb-2'></div>
          <div className='h-4 bg-gray-300 rounded w-1/2 mb-2'></div>
          <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
          {/* Add more skeletons as needed */}
        </div>
      ) : (
        <DataTable
          value={feedbacks}
          className='p-datatable-striped'
          paginator
          rows={10}
          loading={loading}
        >
          <Column field='name' header='Name' />
          <Column field='email' header='Email' />
          <Column field='bookingExperience' header='Booking Experience' />
          <Column field='serviceQuality' header='Service Quality' />
          <Column field='overallSatisfaction' header='Overall Satisfaction' />
          <Column field='feedbackType' header='Feedback Type' />
          <Column field='suggestions' header='Suggestions' />
          <Column
            body={(rowData) => (
              <Button
                icon={<FiTrash />} // Using React Icons for the delete button
                className='p-button-danger'
                onClick={() => handleDelete(rowData._id)}
                tooltip='Delete'
                tooltipOptions={{ position: 'bottom' }} // Optional tooltip
              />
            )}
            header='Actions'
          />
        </DataTable>
      )}
    </div>
  )
}

export default ManageFeedback
