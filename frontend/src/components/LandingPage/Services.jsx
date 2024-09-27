import React from 'react'

// "Delve into a variety of services designed to elevate your brand presence to the ultimate level."

// "Discover a comprehensive suite of web development solutions designed to elevate your online presence."

const Services = () => {
  return (
    <div>
      <h1 className='font-medium'>Our Services</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='left'>
          <h1 className='text-5xl leading-tight'>
            Delve into a variety of services designed to elevate your brand
            presence to the ultimate level.
          </h1>
        </div>
        <div className='right grid grid-cols-2 gap-x-3'>
          <div>
            <h2 className='bg-base-200 p-5 '>Virtual Assistance</h2>
            <ul>
              <li>
                <a href=''>qe</a>
              </li>
              <li>
                <a href=''>qe</a>
              </li>
              <li>
                <a href=''>qe</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='bg-base-200 p-5'>Recruitment Services</h2>
            <ul>
              <li>
                <a href=''>qe</a>
              </li>
              <li>
                <a href=''>qe</a>
              </li>
              <li>
                <a href=''>qe</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
