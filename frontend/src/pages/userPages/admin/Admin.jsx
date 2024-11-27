import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { convertDateToWords } from '../../../utils/convertDaysToWords'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { CiCalendar } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useParams, Routes, Route, useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import UserManagement from './UserManagement'
import UserActivityLogs from './UserActivityLogs'
import ViewBookings from './ViewBookings'
import ManageFeedback from './ManageFeedback'
import UserLoginActivity from './UserLoginActivity'
import DeletionRequests from './DeletionRequests'
import ContactTable from './ContactTable'

const Admin = () => {
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
        <Sidebar />
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

              {/* <div className=' text-end flex justify-end'>
                <div className='mb-3 px-3 py-2 text-end bg-white shadow max-w-max rounded-full '>
                  <IoMdNotificationsOutline />
                </div>
              </div> */}
            </div>
          </div>

          <Routes>
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/user-activity-logs' element={<UserActivityLogs />} />
            <Route path='/booking-management' element={<ViewBookings />} />
            <Route path='/feedback' element={<ManageFeedback />} />
            <Route path='/login-activity' element={<UserLoginActivity />} />
            <Route path='/deletion-requests' element={<DeletionRequests />} />
            <Route path='/contact' element={<ContactTable />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
