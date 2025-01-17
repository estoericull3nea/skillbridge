import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineSchedule } from 'react-icons/ai'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { GrSchedules } from 'react-icons/gr'
import { MdOutlineScheduleSend } from 'react-icons/md'
import { GrScheduleNew } from 'react-icons/gr'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { IoSendOutline } from 'react-icons/io5'
import { MdOutlineCancelScheduleSend } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import './datatables.css'

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

const Dashboard = () => {
  const { t } = useTranslation()

  const [loadingTotalBookingsCount, setLoadingTotalBookingsCount] =
    useState(false)
  const [totalBookingsCount, setTotalBookingsCount] = useState(0)

  const [loadingPendingBookingsCount, setLoadingPendingBookingsCount] =
    useState(false)
  const [totalPendingCount, setTotalPendingCount] = useState(0)

  const [loadingDoneBookingsCount, setLoadingDoneBookingsCount] =
    useState(false)
  const [totalDoneCount, setTotalDoneCount] = useState(0)

  const [loadingRejectedBookingsCount, setLoadingRejectedBookingsCount] =
    useState(false)
  const [totalRejectedCount, setTotalRejectedCount] = useState(0)

  const [loadingCanceledBookingsCount, setLoadingCanceledBookingsCount] =
    useState(false)
  const [totalCanceledCount, setTotalCanceledCount] = useState(0)

  const [loadingOngoingBookingsCount, setLoadingOngoingBookingsCount] =
    useState(false)
  const [totalOngoingCount, setTotalOngoingCount] = useState(0)

  const [loadingUpcommingBookings, setLoadingUpcommingBookings] =
    useState(false)
  const [upcommingBookings, setUpcommingBookings] = useState([])

  const [loadingCancel, setLoadingCancel] = useState({})

  const daysUntilBooking = (dateString) => {
    const bookingDate = new Date(dateString)
    const today = new Date()

    const timeDiff = bookingDate.getTime() - today.getTime()

    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

    return dayDiff
  }

  const fetchUpcomingBookings = async () => {
    setLoadingUpcommingBookings(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/get/upcomming-three-bookings?email=${localStorage.getItem(
          'email'
        )}`
      )
      const filteredData = response.data.filter(
        (item) => item.status === 'pending' || item.status === 'missed'
      )
      setUpcommingBookings(filteredData || 0)
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message

        if (errorMessage === 'No Bookings Found') {
          setUpcommingBookings([])
        }

        console.error('Error fetching pending bookings:', errorMessage)
      } else {
        console.error(
          'An error occurred while fetching pending bookings:',
          error.message || error
        )
      }
    } finally {
      setLoadingUpcommingBookings(false)
    }
  }

  const cancelMeeting = async (bookingId) => {
    setLoadingCancel((prevState) => ({ ...prevState, [bookingId]: true }))
    try {
      const { status } = await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/update-status/${bookingId}`,
        { status: 'canceled' }
      )
      if (status === 200) {
        await fetchUpcomingBookings()
        await fetchAllCanceledBookings()
        await fetchAllPendingBookings()
        toast.success('Canceled')

        socket.emit('meetingCanceled', bookingId)
      }
    } catch (error) {
      console.error('Error canceling meeting:', error.message)
    } finally {
      setLoadingCancel((prevState) => ({ ...prevState, [bookingId]: false }))
    }
  }

  const fetchAllOngoingBookings = async () => {
    setLoadingOngoingBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'ongoing'
      })
      setTotalOngoingCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setLoadingOngoingBookingsCount(false)
    }
  }

  const fetchAllCanceledBookings = async () => {
    setLoadingCanceledBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'canceled'
      })
      setTotalCanceledCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setLoadingCanceledBookingsCount(false)
    }
  }

  const fetchAllDoneBookings = async () => {
    setLoadingDoneBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'done'
      })
      setTotalDoneCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setLoadingDoneBookingsCount(false)
    }
  }

  const fetchAllPendingBookings = async () => {
    setLoadingPendingBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'pending'
      })
      setTotalPendingCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setLoadingPendingBookingsCount(false)
    }
  }

  const fetchAllRejectedBookings = async () => {
    setLoadingRejectedBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'rejected'
      })
      setTotalRejectedCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setLoadingRejectedBookingsCount(false)
    }
  }

  const fetchAllBookings = async () => {
    setLoadingTotalBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      setTotalBookingsCount(response.data.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setLoadingTotalBookingsCount(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    fetchAllBookings()
    fetchAllPendingBookings()
    fetchAllDoneBookings()
    fetchAllCanceledBookings()
    fetchAllOngoingBookings()
    fetchUpcomingBookings()
    fetchAllRejectedBookings()
  }, [
    totalBookingsCount,
    totalDoneCount,
    totalOngoingCount,
    totalPendingCount,
    totalRejectedCount,
  ])

  useEffect(() => {
    socket.on('newApproveBooking', (data) => {
      fetchAllBookings()
      fetchAllPendingBookings()
      fetchAllDoneBookings()
      fetchAllCanceledBookings()
      fetchAllOngoingBookings()
      fetchUpcomingBookings()
      fetchAllRejectedBookings()
    })

    socket.on('newMarkAsDoneBooking', (data) => {
      fetchAllBookings()
      fetchAllPendingBookings()
      fetchAllDoneBookings()
      fetchAllCanceledBookings()
      fetchAllOngoingBookings()
      fetchUpcomingBookings()
      fetchAllRejectedBookings()
    })

    socket.on('newMarkAsRejectBooking', (data) => {
      fetchAllBookings()
      fetchAllPendingBookings()
      fetchAllDoneBookings()
      fetchAllCanceledBookings()
      fetchAllOngoingBookings()
      fetchUpcomingBookings()
      fetchAllRejectedBookings()
    })

    return () => {
      socket.off('newApproveBooking')
      socket.off('newMarkAsDoneBooking')
      socket.off('newMarkAsRejectBooking')
    }
  }, [])

  return (
    <div className=''>
      <div className='bg-white shadow-xl rounded-xl p-6'>
        <h1 className='mb-3'>
          {t('welcomeBack', { firstName: localStorage.getItem('firstName') })}!
        </h1>
        <p className='text-2xl font-semibold leading-normal'>{t('reminder')}</p>
      </div>
      <div>
        <p className='mt-4 mb-1 ps-1 font-medium italic text-gray-500 font-xs'>
          {t('bookingsAnalytics')}
        </p>
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 mt-1'>
          <div className='stat bg-white shadow-xl rounded-xl p-6'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            {loadingTotalBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <GrSchedules /> {t('countBookings')}
                </div>
                <div className='stat-value'>{totalBookingsCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>

          <div className='stat bg-white shadow-xl rounded-xl p-6'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            {loadingPendingBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <RiCalendarScheduleLine /> {t('pendingBookings')}
                </div>
                <div className='stat-value'>{totalPendingCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>

          <div className='stat bg-white shadow-xl rounded-xl p-6'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            {loadingDoneBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <AiOutlineSchedule /> {t('successBookings')}
                </div>
                <div className='stat-value'>{totalDoneCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>

          <div className='stat bg-white shadow-xl rounded-xl p-6'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            {loadingCanceledBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <GrScheduleNew /> {t('canceledRejectedBookings')}
                </div>
                <div className='stat-value'>{totalCanceledCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>

          <div className='stat bg-white shadow-xl rounded-xl p-6'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            {loadingOngoingBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <MdOutlineScheduleSend /> {t('ongoingBookings')}
                </div>
                <div className='stat-value'>{totalOngoingCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>

          <div className='stat bg-white shadow-xl rounded-xl p-6'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-8 w-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            {loadingRejectedBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <MdOutlineScheduleSend /> Rejected Bookings
                </div>
                <div className='stat-value'>{totalRejectedCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className='mt-4 mb-1 ps-1 font-medium italic text-gray-500 font-xs'>
          {t('upcomingBookings')}
        </p>

        {loadingUpcommingBookings ? (
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
            value={upcommingBookings}
            showGridlines
            paginator
            rows={5}
            className='bg-white shadow-xl rounded-xl p-6'
            size='medium'
          >
            <Column header={t('service')} field='specificService'></Column>

            <Column
              field='date'
              header={t('dateTime')}
              body={(rowData) => ` ${formatDate(rowData.date)} ${rowData.time}`}
            ></Column>

            <Column
              header={t('daysRemaining')}
              body={(rowData) => {
                const daysLeft = daysUntilBooking(rowData.date)
                return daysLeft > 0
                  ? `${daysLeft} ${t('daysRemainingText')}`
                  : t('today')
              }}
            ></Column>

            <Column
              header={t('fullName')}
              body={(rowData) => `${rowData.firstName} ${rowData.lastName}`}
            ></Column>

            <Column
              field='notes'
              header={t('notes')}
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
            ></Column>

            <Column
              field='phone'
              header={t('phone')}
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
            ></Column>
            <Column
              header={t('status')}
              body={(rowData) =>
                rowData.status === 'missed' ? (
                  <span className='text-red-600'>{t('missed')}</span>
                ) : (
                  rowData.status
                )
              }
            ></Column>

            <Column
              header={t('actions')}
              body={(rowData) => (
                <div className='flex space-x-2'>
                  <button
                    onClick={() => cancelMeeting(rowData._id)}
                    className='btn bg-transparent text-black hover:text-main rounded-full shadow-lg'
                    disabled={loadingCancel[rowData._id]}
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
              )}
            ></Column>
          </DataTable>
        )}
      </div>
    </div>
  )
}

export default Dashboard
