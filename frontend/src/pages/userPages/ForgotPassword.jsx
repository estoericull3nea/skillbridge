import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'react-i18next' // Import the translation hook

const ForgotPassword = () => {
  const { t } = useTranslation() // Use the translation hook

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
        error.response?.data?.message || t('AnErrorOccurredPleaseTryAgain')
      if (errorMessage === t('AccountNotVerifiedPleaseVerify')) {
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
      toast.success(t('VerificationEmailResentSuccessfully'))
      setShowVerificationModal(false)
    },
    onError: (error) => {
      setLoadingResend(false)
      toast.error(error.response?.data?.message || t('ErrorResendingEmail'))
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error(t('PleaseEnterYourEmail'))
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
                {t('ForgotPassword')}
              </h1>

              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    {t('YourEmail')}
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='input input-bordered w-full'
                    placeholder={t('example@gmail.com')}
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
                    ? t('Sending')
                    : t('ForgotPassword')}
                </button>

                <p className='text-sm font-light text-gray-500 text-end'>
                  <Link
                    to='/login'
                    className='font-medium text-black hover:underline flex items-center justify-end gap-x-2'
                  >
                    <FaLongArrowAltLeft /> <span>{t('BackToLogin')}</span>
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
            <h3 className='font-bold text-lg'>{t('AccountNotVerified')}</h3>
            <p className='py-4'>{t('PleaseVerifyYourEmailToContinue')}</p>
            <div className='modal-action'>
              <button
                className={`btn ${loadingResend ? 'loading' : ''}`}
                onClick={handleResendVerification}
                disabled={loadingResend}
              >
                {loadingResend ? t('Resending') : t('ResendVerificationEmail')}
              </button>
              <button
                className='btn'
                onClick={() => setShowVerificationModal(false)}
              >
                {t('Cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
