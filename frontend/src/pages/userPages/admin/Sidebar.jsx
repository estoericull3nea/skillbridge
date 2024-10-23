import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineMailOutline } from 'react-icons/md'

const AdminSidebar = () => {
  return (
    <div>
      <aside className='min-w-[300px] shadow-xl rounded-xl bg-white sticky top-0'>
        <div className='pl-5 pt-5'>
          <h1 className='text-2xl font-semibold'>Admin Panel</h1>
          <h3 className='flex items-center text-sm gap-1 text-gray-500'></h3>
        </div>

        {/* Dashboard */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Dashboard</span>
          </li>
          <li>
            <NavLink
              to='/admin/dashboard'
              activeClassName='font-bold text-blue-500'
            >
              Overview
            </NavLink>
          </li>
        </ul>

        {/* User Management */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>User Management</span>
          </li>
          <li>
            <NavLink
              to='/admin/user-management'
              activeClassName='font-bold text-blue-500'
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin/user-activity-logs'
              activeClassName='font-bold text-blue-500'
            >
              User Activity Logs
            </NavLink>
          </li>
        </ul>

        {/* Booking Management */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Booking Management</span>
          </li>
          <li>
            <NavLink
              to='/admin/booking-management'
              activeClassName='font-bold text-blue-500'
            >
              View Bookings
            </NavLink>
          </li>
        </ul>

        {/* Feedback & Support */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Feedback & Support</span>
          </li>
          <li>
            <NavLink
              to='/admin/feedback'
              activeClassName='font-bold text-blue-500'
            >
              Manage Feedback
            </NavLink>
          </li>
        </ul>

        {/* Security & Permissions */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Security & Permissions</span>
          </li>
          <li>
            <NavLink
              to='/admin/login-activity'
              activeClassName='font-bold text-blue-500'
            >
              Login Activity
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default AdminSidebar
