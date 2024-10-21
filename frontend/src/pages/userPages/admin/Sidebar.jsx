import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to='/admin/dashboard'>Overview</Link>
          </li>
          {/* <li>
            <Link to='/admin/analytics'>Analytics</Link>
          </li> */}
        </ul>

        {/* User Management */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>User Management</span>
          </li>
          <li>
            <Link to='/admin/user-management'>Manage Users</Link>
          </li>
          {/* <li>
            <Link to='/admin/roles-permissions'>Roles & Permissions</Link>
          </li> */}
          <li>
            <Link to='/admin/user-activity-logs'>User Activity Logs</Link>
          </li>
        </ul>

        {/* Booking Management */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Booking Management</span>
          </li>
          <li>
            <Link to='/admin/booking-management'>View Bookings</Link>
          </li>
          <li>
            <Link to='/admin/approve-bookings'>Approve Bookings</Link>
          </li>
          <li>
            <Link to='/admin/booking-history'>Booking History</Link>
          </li>
        </ul>

        {/* Feedback & Support */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Feedback & Support</span>
          </li>
          <li>
            <Link to='/admin/feedback'>Manage Feedback</Link>
          </li>
          <li>
            <Link to='/admin/support-tickets'>Support Tickets</Link>
          </li>
        </ul>

        {/* System Settings */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>System Settings</span>
          </li>
          <li>
            <Link to='/admin/system-settings'>General Settings</Link>
          </li>
          <li>
            <Link to='/admin/language-settings'>Language & Currency</Link>
          </li>
          <li>
            <Link to='/admin/notifications-settings'>Notifications</Link>
          </li>
        </ul>

        {/* Revenue & Reports */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Revenue & Reports</span>
          </li>
          <li>
            <Link to='/admin/revenue-reports'>Revenue Reports</Link>
          </li>
          <li>
            <Link to='/admin/export-reports'>Export Reports</Link>
          </li>
        </ul>

        {/* Security & Permissions */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Security & Permissions</span>
          </li>
          <li>
            <Link to='/admin/admin-management'>Manage Admins</Link>
          </li>
          <li>
            <Link to='/admin/login-activity'>Login Activity</Link>
          </li>
          <li>
            <Link to='/admin/security-settings'>Security Settings</Link>
          </li>
        </ul>

        {/* Content Management */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Content Management</span>
          </li>
          <li>
            <Link to='/admin/content/pages'>Manage Pages</Link>
          </li>
          <li>
            <Link to='/admin/content/faqs'>FAQs</Link>
          </li>
          <li>
            <Link to='/admin/content/banners'>Promotional Banners</Link>
          </li>
        </ul>

        {/* Notifications & Announcements */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Notifications & Announcements</span>
          </li>
          <li>
            <Link to='/admin/notifications/create'>Create Notification</Link>
          </li>
          <li>
            <Link to='/admin/notifications/manage'>Manage Notifications</Link>
          </li>
          <li>
            <Link to='/admin/announcements'>System Announcements</Link>
          </li>
        </ul>

        {/* Audit Logs */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Audit Logs</span>
          </li>
          <li>
            <Link to='/admin/audit-logs'>View Logs</Link>
          </li>
        </ul>

        {/* System Health */}
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>System Health</span>
          </li>
          <li>
            <Link to='/admin/system-monitoring'>Health Dashboard</Link>
          </li>
          <li>
            <Link to='/admin/system-status'>Server Status</Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default AdminSidebar
