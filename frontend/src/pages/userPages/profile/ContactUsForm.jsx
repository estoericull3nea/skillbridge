import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const ContactUsForm = () => {
  const [name, setName] = useState('')
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
          `${import.meta.env.VITE_DEV_BACKEND_URL}users/${userId}`
        )
        const { firstName, lastName, email } = response.data
        setName(`${firstName} ${lastName}`)
        setEmail(email)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchUserData()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = { name, email, subject, message, userId }

    setSending(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}contacts/create`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        toast.success('Message Sent')
        setSubject('')
        setMessage('')
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
      <h1 className='text-2xl font-semibold mb-4'>Contact Support</h1>

      {loading ? (
        <div className='space-y-4'>
          <div className='skeleton h-10 w-full rounded'></div>
          <div className='skeleton h-10 w-full rounded'></div>
          <div className='skeleton h-10 w-full rounded'></div>
          <div className='skeleton h-32 w-full rounded'></div>
          <button className='btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3'>
            Loading...
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Full Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='input input-bordered w-full'
              readOnly
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Email</label>
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
            <label className='block text-sm font-medium mb-2'>Subject</label>
            <input
              type='text'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className='input input-bordered w-full'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Message</label>
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
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactUsForm
