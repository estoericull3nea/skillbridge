import React from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const ForgotPassword = () => {
  return (
    <div>
      <section className='bg-gray-50 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                Forgot password
              </h1>

              <form className='space-y-4 md:space-y-6'>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='input input-bordered w-full'
                    placeholder='example@gmail.com'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full'
                >
                  Forgot password
                </button>

                <p className='text-sm font-light text-gray-500  text-end'>
                  <Link
                    to='/login'
                    className='font-medium text-black hover:underline flex items-center justify-end gap-x-2'
                  >
                    <FaLongArrowAltLeft /> <span>Back to Login</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword
