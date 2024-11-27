import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useTranslation } from 'react-i18next' // Import the useTranslation hook

const GetFeedbacks = () => {
  const { t } = useTranslation() // Initialize the translation function
  const [contacts, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const email = localStorage.getItem('email') // Get email once to avoid multiple calls

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}feedbacks/${email}`
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
        <h2 className='text-2xl font-semibold'>{t('no_feedbacks')}</h2>
      </div>
    )
  }

  return (
    <div className='p-4 bg-base-100 rounded-lg shadow-2xl'>
      <h2 className='text-2xl font-semibold mb-4'>{t('feedbacks')}</h2>
      <DataTable value={contacts} paginator rows={10}>
        <Column field='_id' header={t('feedback')} />
        <Column field='bookingExperience' header={t('booking_experience')} />
        <Column field='serviceQuality' header={t('service_quality')} />
        <Column
          field='overallSatisfaction'
          header={t('overall_satisfaction')}
        />
        <Column field='feedbackType' header={t('feedback_type')} />
        <Column field='suggestions' header={t('suggestions')} />
        <Column
          field='createdAt'
          header={t('created_at')}
          body={(rowData) => formatDate(rowData.createdAt)}
        />
      </DataTable>
    </div>
  )
}

export default GetFeedbacks
