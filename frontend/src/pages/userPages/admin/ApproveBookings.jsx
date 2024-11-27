// src/components/ApproveBookings.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

const ApproveBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const toast = React.createRef()

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}book/status/pending` // Adjust your API endpoint as needed
        )
        setBookings(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchPendingBookings()
  }, [])

  const approveBooking = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/update-status/${bookingId}`,
        { status: 'ongoing' } // Update with the appropriate status
      )
      setBookings(bookings.filter((booking) => booking._id !== bookingId))
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Booking ongoing!',
        life: 3000,
      })
    } catch (err) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not approve booking',
        life: 3000,
      })
    }
  }

  const rejectBooking = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/update-status/${bookingId}`,
        { status: 'rejected' } // Update with the appropriate status
      )
      setBookings(bookings.filter((booking) => booking._id !== bookingId))
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Booking rejected!',
        life: 3000,
      })
    } catch (err) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not reject booking',
        life: 3000,
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>
  }

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-semibold mb-4'>Approve Bookings</h1>
      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <DataTable value={bookings} className='p-datatable-striped'>
          <Column field='firstName' header='First Name' />
          <Column field='lastName' header='Last Name' />
          <Column field='email' header='Email' />
          <Column field='service' header='Service' />
          <Column field='date' header='Date' />
          <Column field='time' header='Time' />
          <Column field='status' header='Status' />
          <Column
            header='Actions'
            body={(rowData) => (
              <div>
                <Button
                  label='Approve'
                  icon='pi pi-check'
                  className='mr-2'
                  onClick={() => approveBooking(rowData._id)}
                />
                <Button
                  label='Reject'
                  icon='pi pi-times'
                  className='p-button-danger'
                  onClick={() => rejectBooking(rowData._id)}
                />
              </div>
            )}
          />
        </DataTable>
      )}
      <Toast ref={toast} />
    </div>
  )
}

export default ApproveBookings
