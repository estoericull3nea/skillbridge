import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}auth/forgot-password`,
        { email }
      )
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setEmail('')
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.'
      if (
        errorMessage ===
        'Your account is not verified. Please verify your account first'
      ) {
        setShowVerificationModal(true) // Show the modal if account is not verified
      } else {
        toast.error(errorMessage)
      }
    },
  })

  // Resend verification mutation
  const resendVerificationMutation = useMutation({
    mutationFn: async () => {
      setLoadingResend(true)
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}auth/resend-verification`,
        { email }
      )
      setLoadingResend(false)
      return response.data
    },
    onSuccess: (data) => {
      toast.success('Verification email resent successfully')
      setShowVerificationModal(false)
    },
    onError: (error) => {
      setLoadingResend(false)
      toast.error(
        error.response?.data?.message ||
          'An error occurred while resending the email'
      )
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    forgotPasswordMutation.mutate(email) // Trigger forgot password mutation
  }

  const handleResendVerification = () => {
    resendVerificationMutation.mutate() // Trigger resend verification mutation
  }

  return (
    <div>
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                Forgot password
              </h1>

              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='input input-bordered w-full'
                    placeholder='example@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type='submit'
                  className={`btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full`}
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending
                    ? 'Sending...'
                    : 'Forgot password'}
                </button>

                <p className='text-sm font-light text-gray-500 text-end'>
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

      {/* Daisy UI Modal for Resending Verification */}
      {showVerificationModal && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Account not verified</h3>
            <p className='py-4'>
              Please verify your email address to continue.
            </p>
            <div className='modal-action'>
              <button
                className={`btn ${loadingResend ? 'loading' : ''}`}
                onClick={handleResendVerification}
                disabled={loadingResend}
              >
                {loadingResend ? 'Resending...' : 'Resend Verification Email'}
              </button>
              <button
                className='btn'
                onClick={() => setShowVerificationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
