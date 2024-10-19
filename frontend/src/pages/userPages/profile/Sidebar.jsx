// src/pages/userPages/profile/Sidebar.jsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineMailOutline } from 'react-icons/md'

const Sidebar = () => {
  const { userId, firstName } = useParams()

  return (
    <div>
      <aside className='min-w-[300px] shadow-xl rounded-xl bg-white sticky top-0'>
        <div className='pl-5 pt-5'>
          <h1 className=' text-2xl font-semibold'>
            {firstName} {localStorage.getItem('lastName')}
          </h1>
          <h3 className='flex items-center text-sm gap-1 text-gray-500'>
            <MdOutlineMailOutline /> {localStorage.getItem('email')}
          </h3>
        </div>
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>Main Menu</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/dashboard`}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userId}/${firstName}/booking-history`}>
              Booking History
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userId}/${firstName}/all-contacts`}>
              Contacts
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userId}/${firstName}/all-feedbacks`}>
              Feedbacks
            </Link>
          </li>
        </ul>
        <ul className='menu rounded-box '>
          <li className='menu-title'>
            <span>Account Settings</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/user-info`}>
              User Information
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/notifications`}>
              Notifications
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/deletion`}>
              Delete Account
            </Link>
          </li>
        </ul>

        <ul className='menu rounded-box '>
          <li className='menu-title'>
            <span>Security and Privacy</span>
          </li>
          <li>
            <Link
              to={`/profile/${userId}/${firstName}/login-activity`}
              href='#login-activity'
            >
              Login Activity
            </Link>
          </li>
          {/* <li>
            <Link
              to={`/profile/${userId}/${firstName}/privacy`}
              href='#privacy-settings'
            >
              Privacy Settings
            </Link>
          </li> */}
          <li>
            <Link
              to={`/profile/${userId}/${firstName}/data-export`}
              href='#data-export'
            >
              Download Your Data
            </Link>
          </li>
        </ul>
        <ul className='menu rounded-box '>
          <li className='menu-title'>
            <span>Support and Feedback</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/contact-support`}>
              Contact Support
            </Link>
          </li>
          {/* <li>
            <Link to={`/profile/${userId}/${firstName}/faq`}>FAQs</Link>
          </li> */}
          <li>
            <Link to={`/profile/${userId}/${firstName}/feedback`}>
              Submit Feedback
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
