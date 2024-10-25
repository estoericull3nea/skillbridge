import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { jwtDecode } from 'jwt-decode'

import axios from 'axios'
import 'daisyui'

const Login = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}auth/login`,
        loginData
      )
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      localStorage.setItem('token', data.token)

      const { role } = jwtDecode(data.token)

      if (role === 'admin') {
        return navigate(`/admin/dashboard`)
      }

      const queryParams = new URLSearchParams(window.location.search)
      const redirectUrl = queryParams.get('redirect') || '/'

      navigate(decodeURIComponent(redirectUrl))
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || t('Anerroroccurredduringlogin')
      if (errorMessage === t('Pleaseverifyyouremailaddresstologin')) {
        setShowVerificationModal(true)
      } else {
        toast.error(errorMessage)
      }
    },
  })

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
      toast.success(t('Verificationemailresentsuccessfully'))
      setEmail('')
      setPassword('')
      setShowVerificationModal(false)
    },
    onError: (error) => {
      setLoadingResend(false)
      toast.error(
        error.response?.data?.message ||
          t('Anerroroccurredwhileresendingtheemail')
      )
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      loginMutation.mutate({ email, password })
    } else {
      toast.error(t('Pleasefillinallfields'))
    }
  }

  // Google login handler
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const redirectUri = `${window.location.origin}/google-callback`
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile%20email&access_type=offline`

    const googleWindow = window.open(oauthUrl, '_self', 'width=500,height=600')

    window.addEventListener('message', (event) => {
      if (event.data === 'googleSignInSuccess') {
        googleWindow.close()
        navigate('/')
      }
    })
  }

  const handleResendVerification = () => {
    resendVerificationMutation.mutate()
  }

  return (
    <div>
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                {t('Logintoyouraccount')}
              </h1>

              {/* Google login button */}
              <button
                className='w-full border py-3 flex justify-center items-center gap-x-2 font-medium'
                onClick={handleGoogleLogin}
              >
                <FcGoogle className='text-xl' /> {t('ContinuewithGoogle')}
              </button>

              <div className='divider'>{t('or')}</div>

              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    {t('Youremail')}
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
                    placeholder={t('Enterpassword')}
                    className='input input-bordered w-full'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='text-sm text-end'>
                  <label htmlFor='terms' className='font-light text-gray-500'>
                    <Link
                      to='/forgot'
                      className='font-medium text-black hover:underline'
                    >
                      {t('ForgotPassword')}
                    </Link>
                  </label>
                </div>

                <button
                  type='submit'
                  className='btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full'
                >
                  {loginMutation.isPending
                    ? t('Loggingin')
                    : t('Logintoyouraccount')}
                </button>

                <p className='text-sm font-light text-gray-500'>
                  {t('Donthaveanaccount')}{' '}
                  <Link
                    to='/register'
                    className='font-medium text-black hover:underline'
                  >
                    {t('Registerhere')}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Daisy UI Modal */}
      {showVerificationModal && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>{t('Accountnotverified')}</h3>
            <p className='py-4'>{t('Pleaseverifyyouremailaddresstologin')}</p>
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

export default Login
