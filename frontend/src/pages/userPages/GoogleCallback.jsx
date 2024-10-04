import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const GoogleCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [errorShown, setErrorShown] = useState(false) // State to prevent duplicate error toasts

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

          // If response is successful and token exists
          if (token) {
            // Show the success toast only once per session
            if (!localStorage.getItem('toast_shown')) {
              toast.success('Google sign-in successful')
              localStorage.setItem('toast_shown', 'true') // Prevents duplicate success toast
            }

            localStorage.setItem('token', token) // Save the JWT in localStorage

            navigate('/') // Redirect user to homepage
          } else {
            // If there's no token in the response, treat it as a failure
            throw new Error('No token received from server')
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            'Google sign-in failed. Please try again.'

          // Prevent duplicate error toasts
          if (!errorShown) {
            // Handle specific error and navigate accordingly
            if (errorMessage === 'Email already registered') {
              toast.error(errorMessage)
              navigate('/register')
            }
            setErrorShown(true) // Mark the error as shown
          }
        }
      }

      exchangeCodeForToken()
    } else {
      if (!errorShown) {
        toast.error('No authorization code found.')
        setErrorShown(true) // Mark the error as shown
      }
    }
  }, [searchParams, navigate]) // Added errorShown as a dependency

  return (
    <div>
      <h2 className='p-10'>Processing Google sign-in...</h2>
    </div>
  )
}

export default GoogleCallback
