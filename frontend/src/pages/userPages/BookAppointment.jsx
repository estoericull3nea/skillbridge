import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { toast } from 'react-hot-toast'

const fetchAvailableTimes = async ({ queryKey }) => {
  const date = queryKey[1]
  if (!date) return { availableTimes: [] }
  const formattedDate = date.toLocaleDateString('en-US')
  const response = await axios.get(
    `${
      import.meta.env.VITE_DEV_BACKEND_URL
    }book/get-available-time-by-date/time?date=${formattedDate}`
  )
  return response.data
}

const API_KEY = 'f6r5NJwnrInzrVOpP0dUBGx63zNMl4AJ'

const fetchHolidays = async () => {
  const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
    params: {
      api_key: API_KEY,
      country: 'US',
      year: 2024,
    },
  })
  return response.data.response.holidays
}

const submitBooking = async (bookingData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_DEV_BACKEND_URL}book`,
    bookingData
  )
  return response.data
}

const BookAppointment = () => {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    notes: '',
  })

  const { data, isLoading: loadingTimes } = useQuery({
    queryKey: ['availableTimes', selectedDate],
    queryFn: fetchAvailableTimes,
    enabled: !!selectedDate,
  })

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => setStep(4),
  })

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value)
    handleNextStep()
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const bookingData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      ...formData,
    }
    mutation.mutate(bookingData)
  }

  const {
    data: holidays,
    error,
    isLoading: loadingHolidays,
  } = useQuery({
    queryKey: ['holidays'],
    queryFn: fetchHolidays,
  })

  if (loadingHolidays) return <div>Loading Holidays</div>
  if (error) return <div>Error fetching holidays</div>

  console.log(holidays)

  return (
    <div className='lg:my-40 max-w-[1300px] mx-auto py-10 px-3 lg:p-10'>
      <ul className='steps mb-10 w-full'>
        <li
          className={`step text-xs md:text-lg ${
            step >= 1 ? 'step-neutral' : ''
          }`}
        >
          <span className='block md:hidden text-xs'>Service</span>
          <span className='hidden md:block md:text-lg'>Select Service</span>
        </li>
        <li
          className={`step text-xs md:text-lg ${
            step >= 2 ? 'step-neutral' : ''
          }`}
        >
          <span className='block md:hidden text-xs'>Date & Time</span>
          <span className='hidden md:block md:text-lg'>Select Date & Time</span>
        </li>
        <li
          className={`step text-xs md:text-lg ${
            step >= 3 ? 'step-neutral' : ''
          }`}
        >
          <span className='block md:hidden text-xs'>Details</span>
          <span className='hidden md:block md:text-lg'> Enter Details</span>
        </li>
        <li
          className={`step text-xs md:text-lg ${
            step >= 4 ? 'step-neutral' : ''
          }`}
        >
          Review & Submit
        </li>
      </ul>

      {step === 1 && (
        <div>
          <h2 className='text-2xl mb-5'>Select a Service</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center'>
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
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div>
            <h2 className='text-xl mb-3'>Select a Date</h2>

            <Calendar
              tileContent={({ date }) => {
                const holiday = holidays.find(
                  (h) =>
                    new Date(h.date.iso).toDateString() === date.toDateString()
                )

                if (holiday) {
                  return (
                    <div className='relative'>
                      <div className='md:hidden text-red-500 text-xs'>•</div>

                      <div className='hidden md:block text-red-500 font-medium text-xs'>
                        {holiday.name}
                      </div>

                      <div
                        className='absolute inset-0 flex justify-center items-center'
                        onClick={() =>
                          toast(`${holiday.name}`, {
                            duration: 3000,
                          })
                        }
                      >
                        <div className='md:hidden text-red-500 text-xs cursor-pointer'></div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
              onChange={setSelectedDate}
              value={selectedDate}
              tileDisabled={({ date }) => {
                const isPastDate = date < new Date()
                const isSunday = date.getDay() === 0
                return isPastDate || isSunday
              }}
              className='custom-calendar border-0 p-3'
            />
          </div>
          <div>
            <h2 className='text-xl mb-3'>Select a Time Slot</h2>
            {loadingTimes ? (
              <p>Loading available times...</p>
            ) : (
              <div className='grid grid-cols-4 gap-4'>
                {data?.availableTimes?.map((time) => (
                  <button
                    key={time}
                    className={`p-2 border ${
                      selectedTime === time ? 'border-black' : ''
                    }`}
                    onClick={() => handleTimeSelect(time)}
                    disabled={!data.availableTimes.includes(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
