// src/pages/userPages/profile/Profile.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import BookingHistory from './BookingHistory'
import DeleteAccount from './DeleteAccount'
import LoginActivity from './LoginActivity'
import GetContacts from './GetContacts'
import ContactUsForm from './ContactUsForm'
import GetFeedbacks from './GetFeedbacks'
import Feedback from './Feedback'
import DataExport from './DataExport'
import Dashboard from './Dashboard'
import { convertDateToWords } from '../../../utils/convertDaysToWords.js'
import { CiCalendar } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'
import Breadcrumbs from '../../../components/Breadcrumbs.jsx'
import UserInfo from './UserInfo.jsx'
import { isTokenValid } from '../../../utils/isTokenValid.js'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!isTokenValid()) {
      localStorage.clear()
      toast.error('Please login again')
      navigate('/login')
    }
  }, [token, navigate])

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
            <Route path='/deletion' element={<DeleteAccount />} />
            <Route path='/deletion' element={<DeleteAccount />} />
            <Route path='/login-activity' element={<LoginActivity />} />
            <Route path='/data-export' element={<DataExport />} />
            <Route path='/contact-support' element={<ContactUsForm />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/all-contacts' element={<GetContacts />} />
            <Route path='/all-feedbacks' element={<GetFeedbacks />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Profile
