import React, { useState } from 'react'

const Feedback = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bookingExperience, setBookingExperience] = useState('')
  const [paymentExperience, setPaymentExperience] = useState('')
  const [serviceQuality, setServiceQuality] = useState('')
  const [localization, setLocalization] = useState('')
  const [overallSatisfaction, setOverallSatisfaction] = useState('')
  const [feedbackType, setFeedbackType] = useState('General Feedback')
  const [suggestions, setSuggestions] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic (e.g., send data to an API)
    alert('Thank you for your feedback!')
    // Reset the form after submission
    setName('')
    setEmail('')
    setBookingExperience('')
    setPaymentExperience('')
    setServiceQuality('')
    setLocalization('')
    setOverallSatisfaction('')
    setFeedbackType('General Feedback')
    setSuggestions('')
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder='Please describe your booking experience.'
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
            placeholder='Please rate the quality of service.'
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
          className='btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3 '
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}

export default Feedback
