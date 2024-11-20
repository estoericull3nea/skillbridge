import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation() // Use the translation hook
  const navigate = useNavigate()

  useEffect(() => {
    document.title = t('Register') // Set the page title
  }, [t])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })

  const handleGoogleSignup = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const redirectUri = `${window.location.origin}/google-callback`
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile%20email&access_type=offline`

    const googleWindow = window.open(oauthUrl, '_self', 'width=900,height=600')
    setPopup(googleWindow)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const mutation = useMutation({
    mutationFn: (newUser) =>
      axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}auth/register`,
        newUser
      ),
    onSuccess: (response) => {
      // toast.success(response.data.message)
      toast.success('Registered Successfully')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      })
      // here
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t('RegistrationFailed'))
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error(t('AllFieldsRequired'))
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('PasswordsDoNotMatch'))
      return
    }
    if (formData.password.length <= 7) {
      toast.error(t('PasswordsAtLeast8Chars'))
      return
    }
    if (!formData.terms) {
      toast.error(t('YouMustAcceptTerms'))
      return
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }

    mutation.mutate(userData)
  }

  return (
    <div className='my-16'>
      <section className='lg:py-10'>
        <div className='flex flex-col items-center justify-center px-6 lg:py-8 mx-auto lg:h-screen'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                {t('CreateAnAccount')}
              </h1>

              <button
                className='w-full border py-3 flex justify-center items-center gap-x-2 font-medium'
                onClick={handleGoogleSignup}
              >
                <FcGoogle className='text-xl' /> {t('ContinueWithGoogle')}
              </button>

              <div className='divider'>{t('or')}</div>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      {t('FirstName')}
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      placeholder={t('John')}
                      value={formData.firstName}
                      onChange={handleChange}
                      className='input input-bordered w-full'
                    />
                  </div>
                  <div className='mt-3 md:mt-0'>
                    <label
                      htmlFor='lastName'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      {t('LastName')}
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      placeholder={t('Doe')}
                      value={formData.lastName}
                      onChange={handleChange}
                      className='input input-bordered w-full'
                    />
                  </div>
                </div>

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
                    placeholder={t('john@example.com')}
                    value={formData.email}
                    onChange={handleChange}
                    className='input input-bordered w-full'
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
                    placeholder={t('EnterPassword')}
                    value={formData.password}
                    onChange={handleChange}
                    className='input input-bordered w-full'
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
                    name='confirmPassword'
                    placeholder={t('ReEnterPassword')}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='input input-bordered w-full'
                  />
                </div>

                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
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
                      {t('IAcceptTheTerms')}
                      <Link
                        className='font-medium text-black hover:underline'
                        to='/terms'
                      >
                        {t('TermsAndConditions')}
                      </Link>
                    </label>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn bg-black text-white rounded-full hover:bg-transparent hover:text-black hover:border-black w-full'
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? t('CreatingAccount')
                    : t('CreateAnAccount')}
                </button>

                <p className='text-sm font-light text-gray-500'>
                  {t('AlreadyHaveAnAccount')}{' '}
                  <Link
                    to='/login'
                    className='font-medium text-black hover:underline'
                  >
                    {t('LoginHere')}
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
