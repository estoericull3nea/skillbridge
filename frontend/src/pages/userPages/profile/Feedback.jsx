import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Feedback = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bookingExperience, setBookingExperience] = useState('')
  const [serviceQuality, setServiceQuality] = useState('')
  const [overallSatisfaction, setOverallSatisfaction] = useState('')
  const [feedbackType, setFeedbackType] = useState('General Feedback')
  const [suggestions, setSuggestions] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || ''
    const lastName = localStorage.getItem('lastName') || ''
    const email = localStorage.getItem('email') || ''

    setFullName(`${firstName} ${lastName}`.trim())
    setEmail(email)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const feedbackData = {
        name: fullName,
        email: email,
        bookingExperience,
        serviceQuality,
        overallSatisfaction,
        feedbackType,
        suggestions,
      }

      // Sending feedback data to the backend
      await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}feedbacks`,
        feedbackData
      )

      toast.success('Thank you for your feedback!')

      // Reset the form after submission
      setBookingExperience('')
      setServiceQuality('')
      setOverallSatisfaction('')
      setFeedbackType('General Feedback')
      setSuggestions('')
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5'>
      <h2 className='text-2xl font-semibold mb-4'>Submit Feedback</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='label' htmlFor='name'>
            <span className='label-text'>Full Name</span>
          </label>
          <input
            type='text'
            id='name'
            className='input input-bordered w-full'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className='label' htmlFor='email'>
            <span className='label-text'>Email:</span>
          </label>
          <input
            type='email'
            id='email'
            className='input input-bordered w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className='label' htmlFor='bookingExperience'>
            <span className='label-text'>Booking Experience:</span>
          </label>
          <textarea
            id='bookingExperience'
            className='textarea textarea-bordered w-full'
            placeholder='Describe your booking experience.'
            value={bookingExperience}
            onChange={(e) => setBookingExperience(e.target.value)}
          />
        </div>

        <div>
          <label className='label' htmlFor='serviceQuality'>
            <span className='label-text'>Service Quality:</span>
          </label>
          <textarea
            id='serviceQuality'
            className='textarea textarea-bordered w-full'
            placeholder='Rate the quality of the service.'
            value={serviceQuality}
            onChange={(e) => setServiceQuality(e.target.value)}
          />
        </div>

        <div>
          <label className='label' htmlFor='overallSatisfaction'>
            <span className='label-text'>Overall Satisfaction:</span>
          </label>
          <select
            id='overallSatisfaction'
            className='select select-bordered w-full'
            value={overallSatisfaction}
            onChange={(e) => setOverallSatisfaction(e.target.value)}
            required
          >
            <option value=''>Select Satisfaction Level</option>
            <option value='Very Satisfied'>Very Satisfied</option>
            <option value='Satisfied'>Satisfied</option>
            <option value='Neutral'>Neutral</option>
            <option value='Dissatisfied'>Dissatisfied</option>
            <option value='Very Dissatisfied'>Very Dissatisfied</option>
          </select>
        </div>

        <div>
          <label className='label' htmlFor='feedbackType'>
            <span className='label-text'>Type of Feedback:</span>
          </label>
          <select
            id='feedbackType'
            className='select select-bordered w-full'
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option value='General Feedback'>General Feedback</option>
            <option value='Bug Report'>Bug Report</option>
            <option value='Suggestion'>Suggestion</option>
            <option value='Praise'>Praise</option>
            <option value='Complaint'>Complaint</option>
          </select>
        </div>

        <div>
          <label className='label' htmlFor='suggestions'>
            <span className='label-text'>Suggestions for Improvement:</span>
          </label>
          <textarea
            id='suggestions'
            className='textarea textarea-bordered w-full'
            placeholder='Any suggestions for improving our service?'
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3'
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}

export default Feedback
