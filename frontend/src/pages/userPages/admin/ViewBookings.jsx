import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Skeleton } from 'primereact/skeleton'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import ServicesAverageChart from './components/ServicesAverageChart'

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

const ViewBookings = () => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [displayDialog, setDisplayDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_BACKEND_URL}book`
      )
      setBookings(response.data)
      setFilteredBookings(response.data) // Initialize filteredBookings
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const result = bookings.filter((booking) => {
      return (
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.specificService
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) || // Add this line
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
          import.meta.env.VITE_PROD_BACKEND_URL
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

      socket.emit('approveBooking', bookingId)
    } catch (err) {
      setError(err.response?.data?.message || 'Error approving booking')
    }
  }

  const handleReject = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
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

      socket.emit('markAsRejectBooking', bookingId)
    } catch (err) {
      setError(err.response?.data?.message || 'Error rejecting booking')
    }
  }

  const handleMarkAsDone = async (bookingId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
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

      socket.emit('markAsDoneBooking', bookingId)
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

  const handlePrint = () => {
    const doneBookings = filteredBookings.filter(
      (booking) => booking.status === 'done'
    )
    const printWindow = window.open('', '', 'height=400,width=600')
    printWindow.document.write('<html><head><title>Done Bookings</title>')
    printWindow.document.write('</head><body>')
    printWindow.document.write('<h1>Done Bookings List</h1>')
    printWindow.document.write('<table border="1"><thead><tr>')
    printWindow.document.write(
      '<th>Email</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>'
    )

    doneBookings.forEach((booking) => {
      printWindow.document.write('<tr>')
      printWindow.document.write(`<td>${booking.email}</td>`)
      printWindow.document.write(`<td>${booking.specificService}</td>`)
      printWindow.document.write(`<td>${booking.date}</td>`)
      printWindow.document.write(`<td>${booking.time}</td>`)
      printWindow.document.write(`<td>${booking.status}</td>`)
      printWindow.document.write('</tr>')
    })

    printWindow.document.write('</tbody></table>')
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()
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

  const statusBodyTemplate = (rowData) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'pending':
          return 'bg-yellow-200 text-yellow-800'
        case 'ongoing':
          return 'bg-blue-200 text-blue-800'
        case 'done':
          return 'bg-green-200 text-green-800'
        case 'canceled':
          return 'bg-gray-200 text-gray-800'
        case 'rejected':
          return 'bg-red-200 text-red-800'
        case 'missed':
          return 'bg-purple-200 text-purple-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    return (
      <span className={`p-2 rounded-md ${getStatusColor(rowData.status)}`}>
        {rowData.status}
      </span>
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

  socket.on('newBooking', (data) => {
    fetchBookings()
    setTrigger((prev) => prev + 1)
  })

  return (
    <div className='p-5'>
      <ServicesAverageChart trigger={trigger} />

      <h1 className='text-2xl font-semibold mb-4'>View Bookings</h1>

      <div className='relative mb-4'>
        <span className='p-input-icon-left w-full'>
          <i className='pi pi-search' />
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search by email, service, date, time, or status...'
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
          />
        </span>
      </div>

      <Button
        label='Print Done Bookings'
        icon='pi pi-print'
        onClick={handlePrint}
        className='p-button-help mb-4'
      />

      {filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <DataTable
          value={filteredBookings}
          className='p-datatable-striped'
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
          sortable
        >
          <Column field='email' header='Email' sortable />
          <Column field='specificService' header='Service' sortable />
          <Column field='date' header='Date' sortable />
          <Column field='time' header='Time' sortable />
          <Column
            field='status'
            header='Status'
            body={statusBodyTemplate}
            sortable
          />

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
