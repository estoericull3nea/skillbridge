import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

const UserInfo = () => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picture: '',
    role: 'customer',
    isVerified: false,
    active: true,
  })

  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    picture: false,
    role: false,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}users/${userId}`
        )
        const data = response.data

        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          password: '',
          picture: data.picture || '',
          role: data.role || 'customer',
          isVerified: data.isVerified || false,
          active: data.active || true,
        })
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error(t('update_failed'))
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId, localStorage.getItem('picture')])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    })
  }

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)

    const formDataToSend = new FormData()
    formDataToSend.append('firstName', formData.firstName)
    formDataToSend.append('lastName', formData.lastName)
    formDataToSend.append('email', formData.email)
    if (formData.password) formDataToSend.append('password', formData.password)
    formDataToSend.append('role', formData.role)
    if (formData.picture) formDataToSend.append('picture', formData.picture)

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_PROD_BACKEND_URL}users/${userId}`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      localStorage.setItem(
        'picture',
        `https://skillbridge-p5g5.onrender.com/${response.data.updatedUser.picture}`
      )
      setFormData({
        ...formData,
        picture: localStorage.getItem('picture'),
      })
      setEditableFields({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        picture: false,
        role: false,
      })
      toast.success(t('update_success'))
    } catch (error) {
      console.error('Error updating user information:', error)
      toast.error(t('update_failed'))
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      {loading ? (
        <div className='space-y-4 max-w-[500px] p-3'>
          <div className='skeleton h-16 rounded-xl w-full max-w-[500px]'></div>
          <div className='skeleton h-16 rounded-xl w-full max-w-[500px]'></div>
          <div className='skeleton h-16 rounded-xl w-full max-w-[500px]'></div>
          <div className='skeleton h-16 rounded-xl w-full max-w-[500px]'></div>
        </div>
      ) : (
        <form className='space-y-4 max-w-[500px] p-3' onSubmit={handleSubmit}>
          <p className='mt-4 mb-1 ps-1 font-medium italic text-gray-500 font-xs'>
            {t('basic_credentials')}
          </p>

          <div className='flex items-center gap-3'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>{t('profile_picture')}</span>{' '}
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-36 h-2w-36 rounded-full bg-gray-200 overflow-hidden'>
                  {formData.picture ? (
                    <img
                      src={`${localStorage.getItem('picture')}`}
                      alt='Profile'
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <img
                      src='https://via.placeholder.com/150'
                      alt='Default'
                      className='object-cover w-full h-full'
                    />
                  )}
                </div>

                <input
                  type='file'
                  name='picture'
                  onChange={handleFileChange}
                  className='input input-bordered w-full'
                  disabled={!editableFields.picture}
                />
                <FiEdit2
                  className='text-gray-500 cursor-pointer'
                  onClick={() => handleEditClick('picture')}
                />
              </div>
            </label>
          </div>

          <div className='flex items-center gap-3'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>{t('first_name')}</span>{' '}
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='Enter your first name'
                  className='input input-bordered w-full'
                  disabled={!editableFields.firstName}
                  required
                />
                <FiEdit2
                  className='text-gray-500 cursor-pointer'
                  onClick={() => handleEditClick('firstName')}
                />
              </div>
            </label>
          </div>

          <div className='flex items-center gap-3'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>{t('last_name')}</span>{' '}
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Enter your last name'
                  className='input input-bordered w-full'
                  disabled={!editableFields.lastName}
                />
                <FiEdit2
                  className='text-gray-500 cursor-pointer'
                  onClick={() => handleEditClick('lastName')}
                />
              </div>
            </label>
          </div>

          <div className='flex items-center gap-3'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>{t('password')}</span>{' '}
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className='input input-bordered w-full'
                  disabled={!editableFields.password}
                />
                <FiEdit2
                  className='text-gray-500 cursor-pointer'
                  onClick={() => handleEditClick('password')}
                />
              </div>
              {!editableFields.password && (
                <div className='flex items-center gap-2 mt-1 text-sm text-gray-500'>
                  <RiErrorWarningLine className='text-yellow-500' />
                  <span>{t('leave_blank_for_no_change')}</span>
                </div>
              )}
            </label>
          </div>

          <div className='flex items-center gap-3'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>{t('email')}</span>{' '}
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className='input input-bordered w-full'
                  disabled={!editableFields.email}
                  required
                />
              </div>
            </label>
          </div>

          <div className='flex items-center gap-3'>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>{t('role')}</span>{' '}
              </div>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='select select-bordered w-full'
                disabled={!editableFields.role}
              >
                <option value='customer'>{t('customer')}</option>{' '}
                <option value='admin'>{t('admin')}</option>{' '}
              </select>
            </label>
          </div>

          <button
            type='submit'
            className='btn bg-black text-white hover:bg-transparent hover:border-black hover:text-black mt-4'
            disabled={!Object.values(editableFields).some(Boolean) || updating}
          >
            {updating ? t('updating') : t('submit')}
          </button>
        </form>
      )}
    </div>
  )
}

export default UserInfo
