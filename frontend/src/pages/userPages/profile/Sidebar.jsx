// src/pages/userPages/profile/Sidebar.jsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { userId, firstName } = useParams()
  const { t } = useTranslation()

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
            <span>{t('mainMenu')}</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/dashboard`}>
              {t('dashboard')}
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userId}/${firstName}/booking-history`}>
              {t('bookingHistory')}
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userId}/${firstName}/all-contacts`}>
              {t('contacts')}
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userId}/${firstName}/all-feedbacks`}>
              {t('feedbacks')}
            </Link>
          </li>
        </ul>
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>{t('accountSettings')}</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/user-info`}>
              {t('userInfo')}
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/notifications`}>
              {t('notifications')}
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/deletion`}>
              {t('deleteAccount')}
            </Link>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>{t('securityAndPrivacy')}</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/login-activity`}>
              {t('loginActivity')}
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/data-export`}>
              {t('dataExport')}
            </Link>
          </li>
        </ul>
        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>{t('supportAndFeedback')}</span>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/contact-support`}>
              {t('contactSupport')}
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}/${firstName}/feedback`}>
              {t('submitFeedback')}
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
