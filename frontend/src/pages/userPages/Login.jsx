import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import SBLogo from '../../assets/icons/sb_logo.png'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(process.env.VITE_PROD_BACKEND_URL)

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await axios.post(
        `${process.env.VITE_PROD_BACKEND_URL}auth/login`,
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
        `${import.meta.env.VITE_PROD_BACKEND_URL}auth/resend-verification`,
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
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'></div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <h2 className='my-10 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center '>
            <img src={SBLogo} alt='' width={80} height={80} />
            {t('Logintoyouraccount')}
          </h2>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                {t('Youremail')}
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  placeholder={t('example@gmail.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                {t('Password')}
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  placeholder={t('Enterpassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <Link
                  to='/forgot'
                  className='font-medium text-blue-600 hover:text-blue-500'
                >
                  {t('ForgotPassword')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                {loginMutation.isPending
                  ? t('Loggingin')
                  : t('Logintoyouraccount')}
              </button>
            </div>
          </form>

          <p className='mt-6 text-center text-sm text-gray-600'>
            {t('Donthaveanaccount')}{' '}
            <Link
              to='/register'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              {t('Registerhere')}
            </Link>
          </p>
        </div>
      </div>

      {showVerificationModal && (
        <div
          className='fixed z-10 inset-0 overflow-y-auto'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
              aria-hidden='true'
            ></div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900'
                      id='modal-title'
                    >
                      {t('Accountnotverified')}
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        {t('Pleaseverifyyouremailaddresstologin')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={handleResendVerification}
                >
                  {loadingResend
                    ? t('Resending')
                    : t('ResendVerificationEmail')}
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => setShowVerificationModal(false)}
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
