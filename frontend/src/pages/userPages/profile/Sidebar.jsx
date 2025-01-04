import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { userId, firstName } = useParams()
  const { t } = useTranslation()

  return (
    <div>
      <aside className='min-w-[300px] shadow-xl rounded-xl bg-white sticky top-0'>
        <div className='pl-5 pt-5'>
          <h1 className='text-2xl font-semibold'>
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
            <NavLink
              to={`/profile/${userId}/${firstName}/dashboard`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('dashboard')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/booking-history`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('bookingHistory')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/all-contacts`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('contacts')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/all-feedbacks`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('feedbacks')}
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>{t('accountSettings')}</span>
          </li>
          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/user-info`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('userInfo')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/deletion`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('deleteAccount')}
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>{t('securityAndPrivacy')}</span>
          </li>
          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/login-activity`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('loginActivity')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/data-export`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('dataExport')}
            </NavLink>
          </li>
        </ul>

        <ul className='menu rounded-box'>
          <li className='menu-title'>
            <span>{t('supportAndFeedback')}</span>
          </li>
          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/contact-support`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('contactSupport')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profile/${userId}/${firstName}/feedback`}
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-500' : ''
              }
            >
              {t('submitFeedback')}
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
