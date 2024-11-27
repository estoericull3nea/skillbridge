import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next' // Import the useTranslation hook

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

const ContactUsForm = () => {
  const { t } = useTranslation() // Initialize the translation function
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}users/${userId}`
        )
        const { firstName, lastName, email } = response.data
        setFullName(`${firstName} ${lastName}`)
        setEmail(email)
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error(t('error_fetching_user')) // Show error message using toast
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchUserData()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = { fullName, email, subject, message, userId }

    setSending(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PROD_BACKEND_URL}contacts/create`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        toast.success(t('message_sent')) // Show success message
        setSubject('')
        setMessage('')

        socket.emit('ContactAdmin', 'contact admin')
      } else {
        console.error('Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className='p-5 shadow-xl bg-base-100 rounded-lg'>
      <h1 className='text-2xl font-semibold mb-4'>{t('contact_support')}</h1>

      {loading ? (
        <div className='space-y-4'>
          <div className='skeleton h-10 w-full rounded'></div>
          <div className='skeleton h-10 w-full rounded'></div>
          <div className='skeleton h-10 w-full rounded'></div>
          <div className='skeleton h-32 w-full rounded'></div>
          <button className='btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3'>
            {t('loading')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>
              {t('full_name')}
            </label>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className='input input-bordered w-full'
              readOnly
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>
              {t('email')}
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input input-bordered w-full'
              readOnly
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>
              {t('subject')}
            </label>
            <input
              type='text'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className='input input-bordered w-full'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>
              {t('message')}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className='textarea textarea-bordered w-full'
            />
          </div>
          <button
            type='submit'
            className={`btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3`}
            disabled={sending}
          >
            {sending ? t('sending') : t('send_message')}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactUsForm
