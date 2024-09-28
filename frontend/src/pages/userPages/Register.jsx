import React from 'react'

import { FcGoogle } from 'react-icons/fc'

import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create an account
              </h1>

              <button className='w-full border py-3 flex justify-center items-center gap-x-2 font-medium'>
                <FcGoogle className='text-xl' /> Sign up with Google
              </button>

              <div className='divider'>or</div>
              <form className='space-y-4 md:space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      id='firstName'
                      className='input input-bordered w-full'
                      placeholder='John'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='lastName'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      className='input input-bordered w-full'
                      placeholder='Doe'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
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

                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter password'
                    className='input input-bordered w-full'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='confirm-password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Confirm password
                  </label>
                  <input
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    placeholder='Re-enter password'
                    className='input input-bordered w-full'
                    required
                  />
                </div>

                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      className='checkbox'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='terms'
                      className='font-light text-gray-500 dark:text-gray-300'
                    >
                      I accept the{' '}
                      <a
                        className='font-medium text-black hover:underline'
                        href='#'
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full'
                >
                  Create an account
                </button>

                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='font-medium text-black hover:underline'
                  >
                    Login here
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

export default Register
