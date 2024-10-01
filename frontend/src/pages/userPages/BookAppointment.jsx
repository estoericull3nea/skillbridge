import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group' // For transitions
import Calendar from 'react-calendar' // You can use a calendar library like 'react-calendar'
import 'react-calendar/dist/Calendar.css' // Make sure to import the styles

const BookAppointment = () => {
  const [step, setStep] = useState(1) // Track the current step
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState(null) // To track the selected date
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    notes: '',
  })

  // Time slots for demonstration purposes
  const availableTimeSlots = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value)
    handleNextStep() // Automatically move to the next step after selecting a service
  }

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Booking Details:
    Service: ${selectedService}
    Date: ${selectedDate.toLocaleDateString()}
    Time: ${selectedTime}
    First Name: ${formData.firstName}
    Last Name: ${formData.lastName}
    Email: ${formData.email}
    Phone Number: ${formData.phoneNumber}
    Notes: ${formData.notes}`)
  }

  return (
    <div className='my-40 max-w-[900px] mx-auto'>
      {/* Step Indicator */}
      <ul className='steps mb-10'>
        <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>
          Select Service
        </li>
        <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>
          Select Date & Time
        </li>
        <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>
          Enter Details
        </li>
        <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>
          Review & Submit
        </li>
      </ul>

      {/* Step 1: Select a Service */}
      {step === 1 && (
        <div>
          <h2 className='text-2xl mb-5'>Select a Service</h2>
          <form className='grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center'>
            <div
              className={`border rounded-lg shadow-md bg-white cursor-pointer w-[450px] ${
                selectedService === 'virtual_assistance'
                  ? 'border-black border-2'
                  : ''
              }`}
              onClick={() => setSelectedService('virtual_assistance')}
            >
              <label className='cursor-pointer'>
                <input
                  type='radio'
                  name='service'
                  value='virtual_assistance'
                  className='hidden'
                  checked={selectedService === 'virtual_assistance'}
                  onChange={handleServiceChange}
                />
                <div className='text-center'>
                  <h2 className='text-xl tracking-wide font-medium py-3 border-b'>
                    Virtual Assistance
                  </h2>
                </div>
              </label>
            </div>

            <div
              className={`border rounded-lg shadow-md bg-white cursor-pointer w-[450px] ${
                selectedService === 'recruitment_services'
                  ? 'border-black border-2'
                  : ''
              }`}
              onClick={() => setSelectedService('recruitment_services')}
            >
              <label className='cursor-pointer'>
                <input
                  type='radio'
                  name='service'
                  value='recruitment_services'
                  className='hidden'
                  checked={selectedService === 'recruitment_services'}
                  onChange={handleServiceChange}
                />
                <div className='text-center'>
                  <h2 className='text-xl tracking-wide font-medium py-3 border-b'>
                    Recruitment Services
                  </h2>
                </div>
              </label>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Select a Date and Time */}
      {step === 2 && (
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <h2 className='text-2xl mb-5'>Select a Date</h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileDisabled={({ date }) => date < new Date()} // Disable past dates
              className='custom-calendar' // Custom class for styling
            />
          </div>
          <div>
            <h2 className='text-2xl mb-5'>Select a Time Slot</h2>
            <div className='grid grid-cols-4 gap-4'>
              {availableTimeSlots.map((time) => (
                <button
                  key={time}
                  className={`p-2 border ${
                    selectedTime === time ? 'border-black' : ''
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Show Review (Service, Date, and Time) on the left and Form on the right */}
      {step === 3 && (
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <h2 className='text-2xl mb-5'>Review Your Selection</h2>
            <ul>
              <li>Service: {selectedService}</li>
              <li>
                Date: {selectedDate ? selectedDate.toLocaleDateString() : ''}
              </li>
              <li>Time: {selectedTime}</li>
            </ul>
          </div>
          <div>
            <h2 className='text-2xl mb-5'>Enter Your Details</h2>
            <form className='grid grid-cols-1 gap-5'>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type='tel'
                name='phoneNumber'
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <textarea
                name='notes'
                placeholder='Notes'
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </form>
          </div>
        </div>
      )}

      {/* Step 4: Final Review */}
      {step === 4 && (
        <div>
          <h2 className='text-2xl mb-5'>Final Review</h2>
          <ul>
            <li>Service: {selectedService}</li>
            <li>
              Date: {selectedDate ? selectedDate.toLocaleDateString() : ''}
            </li>
            <li>Time: {selectedTime}</li>
            <li>
              Name: {formData.firstName} {formData.lastName}
            </li>
            <li>Email: {formData.email}</li>
            <li>Phone: {formData.phoneNumber}</li>
            <li>Notes: {formData.notes}</li>
          </ul>
          <button className='mt-10 btn' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* Navigation buttons */}
      <div className='mt-10 flex justify-between'>
        {step > 1 && (
          <button className='btn' onClick={handlePreviousStep}>
            Prev
          </button>
        )}
        {step < 4 && (
          <button
            className='btn'
            onClick={handleNextStep}
            disabled={step === 2 && (!selectedDate || !selectedTime)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default BookAppointment
