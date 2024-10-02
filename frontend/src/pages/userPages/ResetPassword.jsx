import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { resetToken } = useParams()
  const navigate = useNavigate()

  // Password reset mutation using TanStack Query
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ password }) => {
      const response = await axios.post(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }auth/reset-password/${resetToken}`,
        { password }
      )
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      navigate('/login') // Redirect to login after successful password reset
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'An error occurred. Please try again.'
      )
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // Password validation
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // Trigger the mutation to reset the password
    resetPasswordMutation.mutate({ password })
  }

  return (
    <div>
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                Reset password
              </h1>

              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter new password'
                    className='input input-bordered w-full'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='confirm-password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Confirm password
                  </label>
                  <input
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    placeholder='Re-enter new password'
                    className='input input-bordered w-full'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type='submit'
                  className={`btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full`}
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending
                    ? 'Resetting...'
                    : 'Reset password'}
                </button>

                <p className='text-sm font-light text-gray-500 text-end'>
                  <Link
                    to='/login'
                    className='font-medium text-black hover:underline flex items-center justify-end gap-x-2'
                  >
                    Back to Login
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

export default ResetPassword
