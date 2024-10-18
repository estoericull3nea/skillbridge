import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { GiCheckMark } from 'react-icons/gi'
import { toast } from 'react-hot-toast'
import { formatDate } from '../../utils/formatDate'

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

// const fetchHolidays = async () => {
//   const response = await axios.get(
//     `${import.meta.env.VITE_DEV_BACKEND_URL}book/get/holidays`
//   )
//   return response.data
// }

const submitBooking = async (bookingData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_DEV_BACKEND_URL}book`,
    bookingData
  )

  return response.data
}

// zoom
const createMeeting = async ({ topic, startTime, duration, email }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_DEV_BACKEND_URL}meetings/create-meeting`,
    {
      topic,
      start_time: startTime,
      duration,
      email,
    }
  )
  return response.data
}
// zoom

const BookAppointment = () => {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem('firstName')
      ? localStorage.getItem('firstName')
      : '',
    lastName: localStorage.getItem('lastName')
      ? localStorage.getItem('lastName')
      : '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
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
    onSuccess: () => {
      toast.success(
        'Your booking has been successfully submitted. Please check your email for further details.',
        {
          duration: 6000,
        }
      )

      setFormData({
        firstName: localStorage.getItem('firstName')
          ? localStorage.getItem('firstName')
          : '',
        lastName: localStorage.getItem('lastName')
          ? localStorage.getItem('lastName')
          : '',
        email: localStorage.getItem('email')
          ? localStorage.getItem('email')
          : '',
        phoneNumber: '',
        notes: '',
      })
      setSelectedDate(null)
      setSelectedTime('')
      setSelectedService('')
      setStep(1)
    },
    onError: (error) => {
      toast.error(`${error.response?.data?.message || 'An error occurred'}`)
    },
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
    if (step === 3) {
      const formErrors = validateForm()
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors) // If errors exist, show them
        return
      }
    }
    setStep((prevStep) => prevStep + 1) // Move to the next step
    setErrors({}) // Clear errors on successful validation
  }

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formattedDate = selectedDate.toLocaleDateString('en-US') // e.g., 10/2/2024
    const startTime = `${formattedDate} ${selectedTime}` // Concatenate the selected date and time

    const bookingData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      startTimeZoom: startTime,
      ...formData,
    }

    const bookingResponse = await mutation.mutateAsync(bookingData)

    // try {
    //   // First, submit the booking
    //   const bookingResponse = await mutation.mutateAsync(bookingData)

    //   // If booking is successful, create the meeting
    //   const meetingData = {
    //     topic:
    //       selectedService === 'recruitment_services'
    //         ? 'Recruitment Meeting'
    //         : 'Virtual Assistance Meeting',
    //     startTime, // Uses the concatenated date and time
    //     duration: 60, // Adjust duration as needed
    //     email: bookingData.email,
    //   }

    //   const meetingResponse = await createMeeting(meetingData)

    //   toast.success('Zoom Meeting Created, Check your email!')
    // } catch (error) {}
  }

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let formErrors = {}
    if (!formData.firstName.trim())
      formErrors.firstName = 'First Name is required'
    if (!formData.lastName.trim()) formErrors.lastName = 'Last Name is required'
    if (!formData.email.trim()) formErrors.email = 'Email is required'
    // if (!formData.phoneNumber.trim())
    //   formErrors.phoneNumber = 'Phone Number is required'
    // if (!formData.notes.trim()) formErrors.notes = 'Notes is required'
    return formErrors
  }

  // const {
  //   data: holidays,
  //   error,
  //   isLoading: loadingHolidays,
  // } = useQuery({
  //   queryKey: ['holidays'],
  //   queryFn: fetchHolidays,
  // })

  // if (loadingHolidays) return <div>Loading Holidays</div>
  // if (error) return <div>Error fetching holidays</div>

  return (
    <div className='lg:my-20 max-w-[1300px] mx-auto  px-3 my-10  '>
      <ul className='steps mb-14 lg:mb-32 w-full'>
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
        <div className='max-w-[900px] mx-auto'>
          <h2 className='text-xl mb-3'>Select a Service</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 place-items-center  overflow-hidden'>
            <div
              className={`border rounded-lg shadow-md bg-white cursor-pointer max-w-[400px] w-full ${
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
                  <h2 className='text-xl tracking-wide font-medium py-3 '>
                    Virtual Assistance
                  </h2>
                  <ul className='menu  rounded-box '>
                    <li>
                      <ul>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Administrative Support
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Customer Service
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Writing and Editing
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Social Media Management
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Technical Skills
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </label>
            </div>
            <div
              className={`border rounded-lg shadow-md bg-white cursor-pointer max-w-[400px] w-full ${
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
                  <h2 className='text-xl tracking-wide font-medium py-3 '>
                    Recruitment Services
                  </h2>
                  <ul className='menu  rounded-box '>
                    <li>
                      <ul>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Talent Sourcing
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Talent Screen
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Interviewing and Assessment
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Endorsement
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            Onboarding (optional)
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
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
              // tileContent={({ date }) => {
              //   const holiday = holidays.find(
              //     (h) =>
              //       new Date(h.date.iso).toDateString() === date.toDateString()
              //   )

              //   if (holiday) {
              //     return (
              //       <div className='relative'>
              //         <div className='md:hidden text-red-500 text-xs'>•</div>

              //         <div className='hidden md:block text-red-500 font-medium text-xs'>
              //           {holiday.name}
              //         </div>

              //         <div
              //           className='absolute inset-0 flex justify-center items-center'
              //           onClick={() =>
              //             toast(`${holiday.name}`, {
              //               duration: 3000,
              //             })
              //           }
              //         >
              //           <div className='md:hidden text-red-500 text-xs cursor-pointer'></div>
              //         </div>
              //       </div>
              //     )
              //   }
              //   return null
              // }}
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
          <div className=' flex flex-col justify-center'>
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
        <div className='grid grid-cols-1 lg:grid-cols-2 px-3 gap-10 max-w-[900px] mx-auto'>
          <div>
            <h2 className='text-xl mb-3'>Review Your Selection</h2>
            <ul>
              <li>
                Service:{' '}
                {selectedService === `recruitment_services`
                  ? `Recruitment Services`
                  : `Virtual Assistant`}
              </li>
              <li>
                Date: {selectedDate ? selectedDate.toLocaleDateString() : ''}
              </li>
              <li>Time: {selectedTime}</li>
            </ul>
          </div>
          <div>
            <h2 className='text-xl mb-3'>Enter Your Details</h2>
            <form className='grid grid-cols-1 gap-5'>
              <div className='flex gap-x-3'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='John'
                    value={localStorage.getItem('firstName')}
                    onChange={handleInputChange}
                    className='input input-bordered w-full '
                  />
                  {errors.firstName && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='lastName'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Doe'
                    value={localStorage.getItem('lastName')}
                    onChange={handleInputChange}
                    className='input input-bordered w-full '
                  />
                  {errors.lastName && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='john@example.com'
                  // value={formData.email}
                  value={localStorage.getItem('email')}
                  onChange={handleInputChange}
                  className='input input-bordered w-full '
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='phoneNumber'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Phone Number
                </label>
                <input
                  type='tel'
                  name='phoneNumber'
                  id='phoneNumber'
                  placeholder='Type here...'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className='input input-bordered w-full '
                />
                {/* {errors.phoneNumber && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.phoneNumber}
                  </p>
                )} */}
              </div>

              <div>
                <label
                  htmlFor='notes'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Notes
                </label>
                <textarea
                  name='notes'
                  id='notes'
                  placeholder='Notes here...'
                  value={formData.notes}
                  onChange={handleInputChange}
                  className='input input-bordered w-full h-24'
                ></textarea>
                {/* {errors.notes && (
                  <p className='text-red-500 text-sm mt-1'>{errors.notes}</p>
                )} */}
              </div>
            </form>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className='max-w-[900px] mx-auto'>
          <h2 className='text-xl mb-3'>Final Review</h2>
          <ul>
            <h6 className='text-sm text-slate-400 italic'>Service Details</h6>
            <li>
              Service:{' '}
              {selectedService === `recruitment_services`
                ? `Recruitment Services`
                : `Virtual Assistant`}
            </li>
            <li>
              Date:{' '}
              {selectedDate
                ? formatDate(selectedDate.toLocaleDateString())
                : ''}
            </li>
            <li>Time: {selectedTime}</li>
            <li>
              <h6 className='text-sm text-slate-400 italic mt-3'>
                User Details
              </h6>
              Name: {formData.firstName} {formData.lastName}
            </li>
            <li>Email: {formData.email}</li>
            <li>
              Phone: {formData.phoneNumber ? formData.phoneNumber : `N/A`}
            </li>
            <li>Notes: {formData.notes ? formData.notes : `N/A`}</li>
          </ul>
          <button
            className='mt-10 btn'
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )}

      <div className='mt-10 flex justify-end gap-x-3'>
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
