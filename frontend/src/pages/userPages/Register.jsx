import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

const Register = () => {
  useEffect(() => {
    document.title = 'Register'
  }, [])

  // Form state to track input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // API call using React Query mutation
  const mutation = useMutation({
    mutationFn: (newUser) =>
      axios.post('http://localhost:5000/api/auth/register', newUser),
    onSuccess: (response) => {
      toast.success(response.data.message)

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed')
    },
  })

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error('All fields required')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length <= 7) {
      toast.error('Passwords must at least 8 chars')
      return
    }

    if (!formData.terms) {
      toast.error('You must accept the terms and conditions')
      return
    }

    // Prepare the data to send to the backend
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }

    // Trigger mutation to register the user
    mutation.mutate(userData)
  }

  return (
    <div className='my-16'>
      <section className='lg:py-10'>
        <div className='flex flex-col items-center justify-center px-6 lg:py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  '>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                Create an account
              </h1>

              <button className='w-full border py-3 flex justify-center items-center gap-x-2 font-medium'>
                <FcGoogle className='text-xl' /> Register with Google
              </button>

              <div className='divider'>or</div>
              <form
                className='space-y-4 md:space-y-6'
                onSubmit={handleSubmit}
                autoComplete='false'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
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
                      placeholder='First Name'
                      value={formData.firstName}
                      onChange={handleChange}
                      className='input input-bordered w-full '
                    />
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
                      placeholder='Last Name'
                      value={formData.lastName}
                      onChange={handleChange}
                      className='input input-bordered w-full '
                    />
                  </div>
                </div>

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
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='input input-bordered w-full '
                  />
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    className='input input-bordered w-full '
                  />
                </div>

                <div>
                  <label
                    htmlFor='confirm-password'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Confirm password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='input input-bordered w-full '
                  />
                </div>

                <div className='flex items-start '>
                  <div className='flex items-center h-5 '>
                    <input
                      type='checkbox'
                      name='terms'
                      id='terms'
                      checked={formData.terms}
                      onChange={handleChange}
                      className='cursor-pointer'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='terms'
                      className='font-light text-gray-500 cursor-pointer'
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
                  disabled={mutation.isPending} // Disable button when loading
                >
                  {mutation.isPending
                    ? 'Creating account...'
                    : 'Create an account'}
                </button>

                <p className='text-sm font-light text-gray-500 '>
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
