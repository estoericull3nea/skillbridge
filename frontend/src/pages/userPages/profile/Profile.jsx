// src/pages/userPages/profile/Profile.jsx
import React from 'react'
import { useParams, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './sidebar'
import Content from './Content'
import BookingHistory from './BookingHistory'
import Dashboard from './Dashboard'

const Profile = () => {
  const { userId, firstName } = useParams()

  return (
    <div className='bg-gray-50'>
      <div className='container flex py-6 gap-3'>
        <Sidebar userId={userId} firstName={firstName} />
        <div className='main-content '>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />

            <Route path='/booking-history' element={<BookingHistory />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Profile
