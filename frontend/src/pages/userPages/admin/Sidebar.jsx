import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SBLogo from '../../../assets/icons/sb_logo.png'

const AdminSidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
      <aside className='min-w-[300px] shadow-xl rounded-xl bg-white sticky top-0'>
        <div className='pl-5 pt-5 flex items-center gap-2'>
          <img src={SBLogo} alt='' width={70} height={70} />
          <h1 className='text-2xl font-semibold'>Admin Panel</h1>
        </div>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Dashboard</span>
          </li>
          <li>
            <NavLink
              to='/admin/dashboard'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              Overview
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>User Management</span>
          </li>
          <li>
            <NavLink
              to='/admin/user-management'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/user-activity-logs'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              User Activity Logs
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Booking Management</span>
          </li>
          <li>
            <NavLink
              to='/admin/booking-management'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              View Bookings
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Feedback & Support</span>
          </li>
          <li>
            <NavLink
              to='/admin/feedback'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              Manage Feedback
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/admin/contact'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              Manage Contact
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Security & Permissions</span>
          </li>
          <li>
            <NavLink
              to='/admin/login-activity'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              Login Activity
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Account Deletion Management</span>
          </li>
          <li>
            <NavLink
              to='/admin/deletion-requests'
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              View Deletion Requests
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Settings</span>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default AdminSidebar
