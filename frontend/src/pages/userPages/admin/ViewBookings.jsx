// src/components/ViewBookings.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Skeleton } from 'primereact/skeleton'

const ViewBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}book`
        )
        setBookings(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div className='p-5'>
        <h1 className='text-2xl font-semibold mb-4'>View Bookings</h1>
        <Skeleton className='mb-2' width='100%' height='2rem' />
        <Skeleton className='mb-2' width='100%' height='2rem' />
        <Skeleton className='mb-2' width='100%' height='2rem' />
        <Skeleton className='mb-2' width='100%' height='2rem' />
        <Skeleton className='mb-2' width='100%' height='2rem' />
      </div>
    )
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>
  }

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-semibold mb-4'>View Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <DataTable value={bookings} className='p-datatable-striped'>
          <Column field='firstName' header='First Name' />
          <Column field='lastName' header='Last Name' />
          <Column field='email' header='Email' />
          <Column field='service' header='Service' />
          <Column field='date' header='Date' />
          <Column field='time' header='Time' />
          <Column field='status' header='Status' />
        </DataTable>
      )}
    </div>
  )
}

export default ViewBookings
