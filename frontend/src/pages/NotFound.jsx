import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className='container py-10 h-[450px] sm:h-[calc(100vh-120px)] grid place-content-center space text-center space-y-2'>
        <div className='flex justify-center'></div>

        <div className='flex items-center justify-center'>
          <h1 className='text-2xl md:text-4xl font-semibold'>Page Not Found</h1>
        </div>

        <p className='text-sm md:text-base md:max-w-[500px]'>
          Sorry, we couldn't find this page. But don't worry, you can find
          plenty of other things on our{' '}
          <Link to='/' className='underline text-primary font-medium'>
            Homepage.
          </Link>
        </p>
      </div>
    </>
  )
}

export default NotFound
