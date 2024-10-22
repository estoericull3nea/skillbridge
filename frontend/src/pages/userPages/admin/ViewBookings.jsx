// src/components/ViewBookings.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Skeleton } from 'primereact/skeleton'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

const ViewBookings = () => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [displayDialog, setDisplayDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}book`
        )
        setBookings(response.data)
        setFilteredBookings(response.data) // Initialize filteredBookings
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  useEffect(() => {
    const result = bookings.filter((booking) => {
      return (
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredBookings(result)
  }, [searchTerm, bookings])

  const handleApprove = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/update-status/${bookingId}`,
        { status: 'ongoing' }
      )
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: 'ongoing', startTime: new Date() }
            : booking
        )
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Error approving booking')
    }
  }

  const handleReject = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/update-status/${bookingId}`,
        { status: 'rejected' }
      )
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: 'rejected' }
            : booking
        )
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Error rejecting booking')
    }
  }

  const handleMarkAsDone = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/update-status/${bookingId}`,
        { status: 'done' }
      )
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: 'done', endTime: new Date() }
            : booking
        )
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Error marking booking as done')
    }
  }

  const handleView = (booking) => {
    setSelectedBooking(booking)
    setDisplayDialog(true)
  }

  const closeDialog = () => {
    setDisplayDialog(false)
    setSelectedBooking(null)
  }

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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className='flex gap-2'>
        <Button
          label='View'
          icon='pi pi-eye'
          onClick={() => handleView(rowData)}
          className='p-button-info'
        />
        {rowData.status === 'pending' && (
          <>
            <Button
              label='Approve'
              icon='pi pi-check'
              onClick={() => handleApprove(rowData._id)}
              className='p-button-success'
            />
            <Button
              label='Reject'
              icon='pi pi-times'
              onClick={() => handleReject(rowData._id)}
              className='p-button-danger'
            />
          </>
        )}
        {rowData.status === 'ongoing' && (
          <Button
            label='Mark as Done'
            icon='pi pi-check'
            onClick={() => handleMarkAsDone(rowData._id)}
            className='p-button-warning'
          />
        )}
      </div>
    )
  }

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const durationInMinutes = Math.ceil((end - start) / 1000 / 60) // Convert milliseconds to minutes
    const hours = Math.floor(durationInMinutes / 60)
    const minutes = durationInMinutes % 60

    return { hours, minutes }
  }

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-semibold mb-4'>View Bookings</h1>

      <div className='mb-4'>
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search by email, service, date, time, or status...'
          className='w-full'
        />
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <DataTable
          value={filteredBookings}
          className='p-datatable-striped'
          sortable
        >
          <Column field='email' header='Email' sortable />
          <Column field='specificService' header='Service' sortable />
          <Column field='date' header='Date' sortable />
          <Column field='time' header='Time' sortable />
          <Column field='status' header='Status' sortable />
          <Column header='Actions' body={actionBodyTemplate} />
        </DataTable>
      )}

      <Dialog
        header='Booking Details'
        visible={displayDialog}
        onHide={closeDialog}
        style={{ width: '50vw' }}
      >
        {selectedBooking && (
          <div>
            <p>
              <strong>First Name:</strong> {selectedBooking.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedBooking.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p>
              <strong>Service:</strong> {selectedBooking.service}
            </p>
            <p>
              <strong>Date:</strong> {selectedBooking.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedBooking.time}
            </p>
            <p>
              <strong>Status:</strong> {selectedBooking.status}
            </p>
            <p>
              <strong>Start Time:</strong>{' '}
              {selectedBooking.startTime
                ? new Date(selectedBooking.startTime).toLocaleString()
                : 'N/A'}
            </p>
            <p>
              <strong>End Time:</strong>{' '}
              {selectedBooking.endTime
                ? new Date(selectedBooking.endTime).toLocaleString()
                : 'N/A'}
            </p>
            <p>
              <strong>Duration:</strong>{' '}
              {selectedBooking.startTime && selectedBooking.endTime
                ? (() => {
                    const { hours, minutes } = calculateDuration(
                      selectedBooking.startTime,
                      selectedBooking.endTime
                    )
                    return `${hours} hour(s) and ${minutes} minute(s)`
                  })()
                : 'N/A'}
            </p>
            <p>
              <strong>Join URL:</strong>{' '}
              {['canceled', 'rejected', 'done'].includes(
                selectedBooking.status
              ) ? (
                'N/A'
              ) : (
                <a
                  href={selectedBooking.meeting.join_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  Join Zoom
                </a>
              )}
            </p>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default ViewBookings
