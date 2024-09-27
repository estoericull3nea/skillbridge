import React from 'react'

import { BsDashLg } from 'react-icons/bs'

const Services = () => {
  return (
    <div>
      <h1 className='font-medium'>Our Services</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3  my-10'>
        <div className='left  flex items-center max-w-[650px]'>
          <h1 className='text-6xl leading-tight '>
            Delve into a variety of services designed to elevate your brand
            presence to the ultimate level.
          </h1>
        </div>
        <div className='right grid grid-cols-2 gap-x-3'>
          <div>
            <h2 className='bg-base-200 p-8 font-medium text-xl tracking-wide'>
              Virtual Assistance
            </h2>
            <ul className='space-y-7 mt-8'>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Administrative Support</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Customer Service</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Writing and Editing</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Social Media Management</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Technical Skills</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='bg-base-200 p-8 font-medium text-xl tracking-normal'>
              Recruitment Services
            </h2>
            <ul className='space-y-7 mt-8'>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Talent Sourcing </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Talent Screening </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Interviewing and Assessment </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Endorsement </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>Onboarding (optional) </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
