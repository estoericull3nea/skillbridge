import React from 'react'

const Profile = () => {
  return (
    <div className='bg-gray-50'>
      <div className='container '>
        <div className='flex py-6 '>
          <aside className='min-w-[300px] shadow-xl rounded-xl bg-white'>
            <h1 className='pl-5 pt-5 text-2xl font-semibold'>Skill Bridge</h1>

            <ul className='menu rounded-box'>
              <li className='menu-title'>
                <span>Main Menu</span>
              </li>
              <li>
                <a href='#dashboard'>Dashboard</a>
              </li>
              <li>
                <a href='#user-info'>User Information</a>
              </li>
              <li>
                <a href='#booking-history'>Booking History</a>
              </li>
            </ul>

            <ul className='menu rounded-box '>
              <li className='menu-title'>
                <span>Account Settings</span>
              </li>
              <li>
                <a href='#change-password'>Change Password</a>
              </li>
              <li>
                <a href='#linked-accounts'>Linked Accounts</a>
              </li>
              <li>
                <a href='#notifications'>Notifications</a>
              </li>
              <li>
                <button>Delete Account</button>
              </li>
            </ul>

            <ul className='menu rounded-box '>
              <li className='menu-title'>
                <span>Support and Feedback</span>
              </li>
              <li>
                <a href='#contact-support'>Contact Support</a>
              </li>
              <li>
                <a href='#faqs'>FAQs</a>
              </li>
              <li>
                <a href='#submit-feedback'>Submit Feedback</a>
              </li>
            </ul>

            <ul className='menu rounded-box '>
              <li className='menu-title'>
                <span>Security and Privacy</span>
              </li>
              <li>
                <a href='#login-activity'>Login Activity</a>
              </li>
              <li>
                <a href='#privacy-settings'>Privacy Settings</a>
              </li>
              <li>
                <a href='#data-export'>Data Export</a>
              </li>
            </ul>
          </aside>
          <div>main</div>
        </div>
      </div>
    </div>
  )
}

export default Profile
