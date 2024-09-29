import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  useEffect(() => {
    document.title = 'Login'
  }, [])
  return (
    <div>
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Login an account
              </h1>

              <button className='w-full border py-3 flex justify-center items-center gap-x-2 font-medium'>
                <FcGoogle className='text-xl' /> Login with Google
              </button>

              <div className='divider'>or</div>
              <form className='space-y-4 md:space-y-6'>
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

                <div className='text-sm text-end'>
                  <label
                    htmlFor='terms'
                    className='font-light text-gray-500 dark:text-gray-300'
                  >
                    <Link
                      to='/forgot'
                      className='font-medium text-black hover:underline'
                      href='#'
                    >
                      Forgot Password?
                    </Link>
                  </label>
                </div>

                <button
                  type='submit'
                  className='btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full'
                >
                  Login an account
                </button>

                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don't have an account?{' '}
                  <Link
                    to='/register'
                    className='font-medium text-black hover:underline'
                  >
                    Register here
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

export default Login
