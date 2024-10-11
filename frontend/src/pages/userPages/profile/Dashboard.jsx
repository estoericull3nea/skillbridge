import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineSchedule } from 'react-icons/ai'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { GrSchedules } from 'react-icons/gr'
import { MdOutlineScheduleSend } from 'react-icons/md'
import { GrScheduleNew } from 'react-icons/gr'
const Dashboard = () => {
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

  const [loadingOngoingBookingsCount, setLoadingOngoingBookingsCount] =
    useState(false)
  const [totalOngoingCount, setTotalOngoingCount] = useState(0)

  const fetchAllOngoingBookings = async () => {
    setLoadingOngoingBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'ongoing'
      })
      setTotalOngoingCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error)
    } finally {
      setLoadingOngoingBookingsCount(false)
    }
  }

  const fetchAllRejectedBookings = async () => {
    setLoadingRejectedBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'rejected'
      })
      setTotalRejectedCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error)
    } finally {
      setLoadingRejectedBookingsCount(false)
    }
  }

  const fetchAllDoneBookings = async () => {
    setLoadingDoneBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'done'
      })
      setTotalDoneCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error)
    } finally {
      setLoadingDoneBookingsCount(false)
    }
  }

  const fetchAllPendingBookings = async () => {
    setLoadingPendingBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      const filteredData = response.data.filter((item, index) => {
        return item.status === 'pending'
      })
      setTotalPendingCount(filteredData.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error)
    } finally {
      setLoadingPendingBookingsCount(false)
    }
  }

  const fetchAllBookings = async () => {
    setLoadingTotalBookingsCount(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      setTotalBookingsCount(response.data.length || 0)
    } catch (error) {
      console.error('Error fetching pending bookings:', error)
    } finally {
      setLoadingTotalBookingsCount(false)
    }
  }

  useEffect(() => {
    fetchAllBookings()
    fetchAllPendingBookings()
    fetchAllDoneBookings()
    fetchAllRejectedBookings()
    fetchAllOngoingBookings()
  }, [])
  return (
    <div className=''>
      <div className='bg-white shadow-xl rounded-xl p-6 '>
        <h1 className='mb-3'>
          Welcome back, {localStorage.getItem('firstName')}!
        </h1>
        <p className='text-4xl font-semibold leading-tight'>
          Remember, every small step takes you closer to your goals. Let’s make
          today count!
        </p>
      </div>
      <div>
        <p className='mt-4 mb-1 ps-1 font-medium italic text-gray-500 font-xs'>
          Bookings Analytics
        </p>
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 mt-1'>
          <div className='stat bg-white shadow-xl rounded-xl p-6 '>
            <div className='stat-figure text-secondary '>
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
                  <GrSchedules /> Count Bookings
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
                  <RiCalendarScheduleLine /> Pending Bookings{' '}
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
                  <AiOutlineSchedule /> Success Bookings{' '}
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
            {loadingRejectedBookingsCount ? (
              <div className='space-y-3'>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
                <div className='skeleton h-7 w-full'></div>
              </div>
            ) : (
              <div>
                <div className='stat-title flex items-center gap-3'>
                  <GrScheduleNew /> Canceled/Rejected Bookings{' '}
                </div>
                <div className='stat-value'>{totalRejectedCount}</div>
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
                  <MdOutlineScheduleSend /> Ongoing Bookings{' '}
                </div>
                <div className='stat-value'>{totalOngoingCount}</div>
                <div className='stat-desc'>Jan 1st - Feb 1st</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
