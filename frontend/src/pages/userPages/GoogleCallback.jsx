import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const GoogleCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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
              toast.success('Google sign-in successful')
              localStorage.setItem('toast_shown', 'true')
            }
            localStorage.setItem('token', token)

            navigate('/')
          } else {
            throw new Error('No token received from server')
          }
        } catch (error) {
          toast.error('Google sign-in failed. Please try again.')
          console.error('Error exchanging code for token:', error)
        }
      }

      exchangeCodeForToken()
    } else {
      toast.error('No authorization code found.')
    }
  }, [searchParams, navigate])

  return (
    <div>
      <h2 className='p-10'>Processing Google sign-in...</h2>
    </div>
  )
}

export default GoogleCallback
