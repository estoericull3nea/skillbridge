import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { resetToken } = useParams()
  const navigate = useNavigate()

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ password }) => {
      const response = await axios.post(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }auth/reset-password/${resetToken}`,
        { password }
      )
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      navigate('/login')
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || t('AnErrorOccurredPleaseTryAgain')
      )
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password.length < 8) {
      toast.error(t('PasswordMustBe8Chars'))
      return
    }

    if (password !== confirmPassword) {
      toast.error(t('PasswordsDoNotMatch'))
      return
    }

    resetPasswordMutation.mutate({ password })
  }

  return (
    <div>
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                {t('ResetPassword')}
              </h1>

              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    {t('Password')}
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder={t('EnterNewPassword')}
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
                    {t('ConfirmPassword')}
                  </label>
                  <input
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    placeholder={t('ReEnterNewPassword')}
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
                    ? t('Resetting')
                    : t('ResetPasswordButton')}
                </button>

                <p className='text-sm font-light text-gray-500 text-end'>
                  <Link
                    to='/login'
                    className='font-medium text-black hover:underline flex items-center justify-end gap-x-2'
                  >
                    {t('BackToLogin')}
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
