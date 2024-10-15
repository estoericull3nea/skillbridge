// src/components/profile/BookingHistory.jsx
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import axios from 'axios'

const BookingHistory = () => {
  const [isLoadingAllBookings, setIsLoadingAllBookings] = useState(false)
  const [allBookings, setAllBookings] = useState([])

  const fetchAllBookings = async () => {
    setIsLoadingAllBookings(true)
    try {
      const { status, data } = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      if (status === 200) {
        setAllBookings(data)
      }
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setIsLoadingAllBookings(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    fetchAllBookings()
  }, [])

  return (
    <>
      {isLoadingAllBookings ? (
        <div className='space-y-3'>
          {/* Skeleton Table Header */}
          <div className='flex space-x-4'>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
          </div>
          {/* Skeleton Rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex space-x-4'>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          value={allBookings}
          showGridlines
          stripedRows
          paginator
          rows={5}
          className='bg-white shadow-xl rounded-xl p-6'
          size='medium'
          removableSort
        >
          <Column
            header='Service'
            field='service'
            body={(rowData) =>
              rowData.service === 'virtual_assistance'
                ? 'Virtual Assistance'
                : rowData.service === 'recruitment_services'
                ? 'Recruitment Services'
                : 'Other Service'
            }
            sortable
          ></Column>

          <Column
            field='date'
            header='Date & Time'
            body={(rowData) => ` ${formatDate(rowData.date)} ${rowData.time}`}
            sortable
          ></Column>

          <Column
            field='notes'
            header='Notes'
            body={(rowData) =>
              rowData.notes ? (
                rowData.notes
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#df0001'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )
            }
            sortable
          ></Column>

          {/* Handle null or undefined 'status' */}
          <Column
            field='phone'
            header='Phone'
            body={(rowData) =>
              rowData.phone ? (
                rowData.phone
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#df0001'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )
            }
            sortable
          ></Column>
          <Column
            field='status'
            header='Status'
            body={(rowData) =>
              rowData.status === 'missed' ? (
                <span className='text-red-600'>Missed</span>
              ) : (
                rowData.status
              )
            }
            sortable
          ></Column>

          <Column
            field='createdAt'
            header='Booked At'
            body={(rowData) =>
              ` ${formatDate(rowData.createdAt)} ${rowData.time}`
            }
            sortable
          ></Column>

          <Column
            header='Actions'
            body={(rowData) => (
              <div className='flex space-x-2'>
                {rowData.meeting?.join_url ? (
                  <>
                    {/* Join Zoom Button */}
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Join Zoom meeting'
                    >
                      <a
                        href={rowData.meeting.join_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn bg-transparent text-black hover:text-main rounded-full shadow-lg'
                      >
                        <IoSendOutline />
                      </a>
                    </div>

                    {/* Cancel Meeting Button */}
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Cancel meeting'
                    >
                      <button
                        onClick={() => cancelMeeting(rowData._id)}
                        className='btn bg-transparent text-black hover:text-main rounded-full shadow-lg'
                        disabled={loadingCancel[rowData._id]} // Disable while loading
                      >
                        {loadingCancel[rowData._id] ? (
                          <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                          ></span>
                        ) : (
                          <MdOutlineCancelScheduleSend />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <span>No URL</span>
                )}
              </div>
            )}
            sortable
          ></Column>
        </DataTable>
      )}
    </>
  )
}

export default BookingHistory
