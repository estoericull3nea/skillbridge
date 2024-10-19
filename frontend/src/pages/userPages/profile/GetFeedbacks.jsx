import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const GetFeedbacks = () => {
  const [contacts, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const email = localStorage.getItem('email') // Get email once to avoid multiple calls

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}feedbacks/${email}`
        )
        setFeedbacks(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [email]) // Dependency on email

  const formatDate = (dateString) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      fractionalSecondDigits: 3,
    }

    const datePart = new Date(dateString).toLocaleDateString(
      undefined,
      dateOptions
    )
    const timePart = new Date(dateString).toLocaleTimeString(
      undefined,
      timeOptions
    )

    return `${datePart} ${timePart}`
  }

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='skeleton h-10 w-full rounded'></div>
        <div className='skeleton h-10 w-full rounded'></div>
        <div className='skeleton h-10 w-full rounded'></div>
        <div className='skeleton h-32 w-full rounded'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4 w-max bg-base-100 rounded-lg'>
        <h2 className='text-2xl font-semibold'>No Feedbacks</h2>
      </div>
    )
  }

  return (
    <div className='p-4 bg-base-100 rounded-lg shadow-2xl'>
      <h2 className='text-2xl font-semibold mb-4'>Feedbacks</h2>
      <DataTable value={contacts} paginator rows={10}>
        <Column field='_id' header='Feedback' />
        <Column field='bookingExperience' header='Booking Experience' />
        <Column field='serviceQuality' header='Service Quality' />
        <Column field='overallSatisfaction' header='Overall Satisfaction' />
        <Column field='feedbackType' header='Feedback Type' />
        <Column field='suggestions' header='Suggestions' />
        <Column
          field='createdAt'
          header='Created At'
          body={(rowData) => formatDate(rowData.createdAt)}
        />
      </DataTable>
    </div>
  )
}

export default GetFeedbacks
