import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { GiCheckMark } from 'react-icons/gi'
import { toast } from 'react-hot-toast'
import { formatDate } from '../../utils/formatDate'

import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [specificService, setSpecificService] = useState('')
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

  const services = {
    virtual_assistance: [
      'Customer Service',
      'Writing and Editing',
      'Social Media Management',
      'Technical Skills',
    ],
    recruitment_services: [
      'Talent Sourcing',
      'Talent Screening',
      'Interviewing and Assessment',
      'Endorsement',
      'Onboarding (Optional)',
    ],
  }

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      toast.success(t('YourBookingSubmitted'), {
        duration: 6000,
      })

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
      if (
        error.response?.data?.message ===
        'You have reached the booking limit of 3 active bookings. Please complete them first.'
      ) {
        return toast.error(t('BookingLimitReached'))
      }
      return toast.error(
        `${error.response?.data?.message || t('AnErrorOccurred')}`
      )
    },
  })

  const handleSpecificServiceChange = (event) => {
    setSpecificService(event.target.value)
  }

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
    if (step === 1) {
      if (!selectedService) {
        toast.error(t('Please select a service')) // Show error if no service selected
        return
      }
      if (!specificService) {
        toast.error(t('Please select a specific service')) // Show error if no specific service selected
        return
      }
    }

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
      specificService: specificService,
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
      formErrors.firstName = t('FirstNameIsRequired')
    if (!formData.lastName.trim()) formErrors.lastName = t('LastNameIsRequired')
    if (!formData.email.trim()) formErrors.email = t('EmailIsRequired')
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
          <span className='block md:hidden text-xs'>{t('Service')}</span>
          <span className='hidden md:block md:text-lg'>
            {t('SelectService')}
          </span>
        </li>
        <li
          className={`step text-xs md:text-lg ${
            step >= 2 ? 'step-neutral' : ''
          }`}
        >
          <span className='block md:hidden text-xs'>
            {t('Date')} & {t('Time')}
          </span>
          <span className='hidden md:block md:text-lg'>
            {t('SelectDateAndTime')}
          </span>
        </li>
        <li
          className={`step text-xs md:text-lg ${
            step >= 3 ? 'step-neutral' : ''
          }`}
        >
          <span className='block md:hidden text-xs'>{t('Details')}</span>
          <span className='hidden md:block md:text-lg'>
            {' '}
            {t('EnterDetails')}
          </span>
        </li>
        <li
          className={`step text-xs md:text-lg ${
            step >= 4 ? 'step-neutral' : ''
          }`}
        >
          {t('ReviewAndSubmit')}
        </li>
      </ul>

      {step === 1 && (
        <div className='max-w-[900px] mx-auto'>
          <h2 className='text-xl mb-3'>{t('SelectAService')}</h2>
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
                    {t('VirtualAssistance')}
                  </h2>
                  <ul className='menu  rounded-box '>
                    <li>
                      <ul>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('VirtualAssistance')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('CustomerService')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('WritingAndEditing')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('SocialMediaManagement')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('TechnicalSkills')}
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
                    {t('RecruitmentServices')}
                  </h2>
                  <ul className='menu  rounded-box '>
                    <li>
                      <ul>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('TalentSourcing')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('TalentScreen')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('InterviewingAndAssessment')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('Endorsement')}
                          </a>
                        </li>
                        <li>
                          <a className='hover:bg-white'>
                            {' '}
                            <GiCheckMark />
                            {t('OnboardingOptional')}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </label>
            </div>
          </div>

          {selectedService && (
            <div className='mt-5'>
              <h3 className='text-lg mb-2'>{t('SelectSpecificService')}</h3>
              <select
                className='select select-bordered w-full'
                value={specificService}
                onChange={handleSpecificServiceChange}
              >
                <option value=''>{t('SelectOption')}</option>
                {services[selectedService].map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div>
            <h2 className='text-xl mb-3'>{t('SelectADate')}</h2>

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
            <h2 className='text-xl mb-3'>{t('SelectATimeSlot')}</h2>
            {loadingTimes ? (
              <p>{t('LoadingAvailableTimes')}</p>
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
            <h2 className='text-xl mb-3'>{t('ReviewYourSelection')}</h2>
            <ul>
              <li>
                {t('Service')}:{' '}
                {selectedService === `recruitment_services`
                  ? `Recruitment Services`
                  : `Virtual Assistant`}
              </li>
              <li>
                {t('SpecificService')}: {specificService}
              </li>
              <li>
                {t('Date')}:{' '}
                {selectedDate ? selectedDate.toLocaleDateString() : ''}
              </li>
              <li>
                {t('Time')}: {selectedTime}
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-xl mb-3'>{t('EnterYourDetails')}</h2>
            <form className='grid grid-cols-1 gap-5'>
              <div className='flex gap-x-3'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    {t('FirstName')}
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
                    {t('LastName')}
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
                  {t('Email')}
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
                  {t('PhoneNumber')}
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
                  {t('Notes')}
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
          <h2 className='text-xl mb-3'>{t('FinalReview')}</h2>
          <ul>
            <h6 className='text-sm text-slate-400 italic'>
              {t('ServiceDetails')}
            </h6>
            <li>
              Service:{' '}
              {selectedService === `recruitment_services`
                ? `Recruitment Services`
                : `Virtual Assistant`}
            </li>
            <li>
              {t('SpecificService')}: {specificService}
            </li>
            <li>
              {t('Date')}:{' '}
              {selectedDate
                ? formatDate(selectedDate.toLocaleDateString())
                : ''}
            </li>
            <li>
              {t('Time')}: {selectedTime}
            </li>
            <li>
              <h6 className='text-sm text-slate-400 italic mt-3'>
                {t('UserDetails')}
              </h6>
              {t('Name')}: {formData.firstName} {formData.lastName}
            </li>
            <li>
              {t('Email')}: {formData.email}
            </li>
            <li>
              {t('Phone')}:{' '}
              {formData.phoneNumber ? formData.phoneNumber : `N/A`}
            </li>
            <li>
              {t('Notes')}: {formData.notes ? formData.notes : `N/A`}
            </li>
          </ul>
          <button
            className='mt-10 btn'
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isPending ? t('Submitting') : t('Submit')}
          </button>
        </div>
      )}

      <div className='mt-10 flex justify-end gap-x-3'>
        {step > 1 && (
          <button className='btn' onClick={handlePreviousStep}>
            {t('Prev')}
          </button>
        )}
        {step < 4 && (
          <button
            className='btn'
            onClick={handleNextStep}
            disabled={step === 2 && (!selectedDate || !selectedTime)}
          >
            {t('Next')}
          </button>
        )}
      </div>
    </div>
  )
}

export default BookAppointment
