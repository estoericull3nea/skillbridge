import React, { useState } from 'react'

const BookAppointment = () => {
  const [selectedService, setSelectedService] = useState('')

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`You selected: ${selectedService}`)
  }
  return (
    <div className='my-40 max-w-[900px] mx-auto'>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center'
      >
        <div
          className={`border rounded-lg  shadow-md bg-white cursor-pointer w-[450px] ${
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
            <div className='text-center '>
              <h2 className='text-xl tracking-wide font-medium py-3 border-b'>
                Virtual Assistance
              </h2>
            </div>
            <div className='mt-4'>
              <h3 className='font-medium text-center text-xl my-5'>Offers</h3>

              <ul className='menu mx-5 space-y-1 my-3'>
                <li className=''>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Administrative
                    Support
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Customer Service
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Writing and
                    Editing
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Social Media
                    Management
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Technical Skills
                  </a>
                </li>
              </ul>
            </div>
          </label>
        </div>

        <div
          className={`border rounded-lg  shadow-md bg-white cursor-pointer w-[450px] ${
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
            <div className='text-center '>
              <h2 className='text-xl tracking-wide font-medium py-3 border-b'>
                Recruitment Services
              </h2>
            </div>
            <div className='mt-4'>
              <h3 className='font-medium text-center text-xl my-5'>Offers</h3>

              <ul className='menu mx-5 space-y-1 my-3'>
                <li className=''>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span> Talent Sourcing
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Talent Screening
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Interviewing and
                    Assessment
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Endorsement
                  </a>
                </li>
                <li>
                  <a className='border py-2'>
                    <span className='text-red-500 mr-2'>✔</span>Onboarding
                    (optional)
                  </a>
                </li>
              </ul>
            </div>
          </label>
        </div>
      </form>
    </div>
  )
}

export default BookAppointment
