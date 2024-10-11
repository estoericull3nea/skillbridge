// src/pages/userPages/profile/Profile.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Routes, Route } from 'react-router-dom'
import Sidebar from './sidebar'
import BookingHistory from './BookingHistory'
import Dashboard from './Dashboard'
import { convertDateToWords } from '../../../utils/convertDaysToWords.js'
import { CiCalendar } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'
import Breadcrumbs from '../../../components/Breadcrumbs.jsx'
import UserInfo from './UserInfo.jsx'

const Profile = () => {
  const { userId, firstName } = useParams()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='bg-gray-50 '>
      <div className='container flex py-6 gap-3 '>
        <Sidebar userId={userId} firstName={firstName} />
        <div className='main-content overflow-hidden w-full'>
          <div className='flex justify-between'>
            <Breadcrumbs />
            <div className='flex gap-3 justify-end'>
              <div className=' text-end flex justify-end'>
                <div className='mb-3 px-4 py-2 text-end bg-white shadow max-w-max rounded-full '>
                  <p className='text-gray-700 text-xs flex items-center gap-2'>
                    <CiCalendar />{' '}
                    {convertDateToWords(currentTime.toLocaleDateString())}{' '}
                    {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                  </p>
                </div>
              </div>

              <div className=' text-end flex justify-end'>
                <div className='mb-3 px-3 py-2 text-end bg-white shadow max-w-max rounded-full '>
                  <IoMdNotificationsOutline />
                </div>
              </div>
            </div>
          </div>

          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user-info' element={<UserInfo />} />
            <Route path='/booking-history' element={<BookingHistory />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Profile
