import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FiTrash } from 'react-icons/fi'

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

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
        `${import.meta.env.VITE_PROD_BACKEND_URL}feedbacks`
      )
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
        `${import.meta.env.VITE_PROD_BACKEND_URL}/feedbacks`,
        formData
      )
      fetchFeedbacks()
      setFormData({
        name: '',
        email: '',
        bookingExperience: '',
        serviceQuality: '',
        overallSatisfaction: '',
        feedbackType: 'General Feedback',
        suggestions: '',
      })
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_PROD_BACKEND_URL}feedbacks/${id}`
      )
      fetchFeedbacks()
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
      {loading ? (
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-300 rounded w-1/4 mb-2'></div>
          <div className='h-4 bg-gray-300 rounded w-1/2 mb-2'></div>
          <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
        </div>
      ) : (
        <DataTable
          value={feedbacks}
          className='p-datatable-striped'
          paginator
          rows={20}
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
                icon={<FiTrash />}
                className='p-button-danger'
                onClick={() => handleDelete(rowData._id)}
                tooltip='Delete'
                tooltipOptions={{ position: 'bottom' }}
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
