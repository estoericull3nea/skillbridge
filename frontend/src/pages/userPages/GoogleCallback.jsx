import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const GoogleCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [errorShown, setErrorShown] = useState(false)

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      const exchangeCodeForToken = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_DEV_BACKEND_URL}auth/google-signup`,
            {
              code,
            }
          )

          const { token } = response.data

          if (token) {
            if (!localStorage.getItem('toast_shown')) {
              localStorage.setItem('toast_shown', 'true')
            }

            localStorage.setItem('token', token)
            navigate('/')
          } else {
            throw new Error('No token received from server')
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            'Google sign-in failed. Please try again.'

          if (!errorShown) {
            if (errorMessage === 'User Already Exists') {
              toast.error(errorMessage)
              navigate('/register')
            }
            setErrorShown(true)
          }
        }
      }

      exchangeCodeForToken()
    } else {
      if (!errorShown) {
        toast.error('No authorization code found.')
        setErrorShown(true)
      }
    }
  }, [searchParams, navigate])

  return (
    <div>
      <h2 className='p-10'>Processing Google sign-in...</h2>
    </div>
  )
}

export default GoogleCallback
