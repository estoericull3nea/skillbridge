import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next' // Import the useTranslation hook

const Feedback = () => {
  const { t } = useTranslation() // Initialize the translation function
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

      toast.success(t('thank_you_feedback')) // Use translation here

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
      <h2 className='text-2xl font-semibold mb-4'>{t('submit_feedback')}</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='label' htmlFor='name'>
            <span className='label-text'>{t('full_name')}</span>
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
            <span className='label-text'>{t('email')}:</span>
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
            <span className='label-text'>{t('booking_experience')}:</span>
          </label>
          <textarea
            id='bookingExperience'
            className='textarea textarea-bordered w-full'
            placeholder={t('booking_experience')}
            value={bookingExperience}
            onChange={(e) => setBookingExperience(e.target.value)}
          />
        </div>

        <div>
          <label className='label' htmlFor='serviceQuality'>
            <span className='label-text'>{t('service_quality')}:</span>
          </label>
          <textarea
            id='serviceQuality'
            className='textarea textarea-bordered w-full'
            placeholder={t('service_quality')}
            value={serviceQuality}
            onChange={(e) => setServiceQuality(e.target.value)}
          />
        </div>

        <div>
          <label className='label' htmlFor='overallSatisfaction'>
            <span className='label-text'>{t('overall_satisfaction')}:</span>
          </label>
          <select
            id='overallSatisfaction'
            className='select select-bordered w-full'
            value={overallSatisfaction}
            onChange={(e) => setOverallSatisfaction(e.target.value)}
            required
          >
            <option value=''>{t('select_satisfaction_level')}</option>
            <option value='Very Satisfied'>{t('very_satisfied')}</option>
            <option value='Satisfied'>{t('satisfied')}</option>
            <option value='Neutral'>{t('neutral')}</option>
            <option value='Dissatisfied'>{t('dissatisfied')}</option>
            <option value='Very Dissatisfied'>{t('very_dissatisfied')}</option>
          </select>
        </div>

        <div>
          <label className='label' htmlFor='feedbackType'>
            <span className='label-text'>{t('type_of_feedback')}:</span>
          </label>
          <select
            id='feedbackType'
            className='select select-bordered w-full'
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option value='General Feedback'>{t('general_feedback')}</option>
            <option value='Bug Report'>{t('bug_report')}</option>
            <option value='Suggestion'>{t('suggestion')}</option>
            <option value='Praise'>{t('praise')}</option>
            <option value='Complaint'>{t('complaint')}</option>
          </select>
        </div>

        <div>
          <label className='label' htmlFor='suggestions'>
            <span className='label-text'>
              {t('suggestions_for_improvement')}:
            </span>
          </label>
          <textarea
            id='suggestions'
            className='textarea textarea-bordered w-full'
            placeholder={t('suggestions_for_improvement')}
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3'
          disabled={loading}
        >
          {loading ? 'Submitting...' : t('submit_feedback')}
        </button>
      </form>
    </div>
  )
}

export default Feedback
