import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next' // Import the useTranslation hook

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

const RequestDeleteAccount = () => {
  const { t } = useTranslation() // Initialize the translation function
  const [isRequesting, setIsRequesting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { userId } = useParams()

  const handleDeleteRequest = async () => {
    setIsRequesting(true)
    try {
      const { status } = await axios.delete(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }users/${userId}/request-deletion`
      )

      if (status === 200) {
        toast.success(t('request_submitted')) // Use translation for success message
        setShowModal(false)

        socket.emit('requestDeletion', 'request')
      }
    } catch (error) {
      if (
        error.response.data.message ===
        'A pending deletion request already exists.'
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error(t('request_failed')) // Use translation for failure message
      }
    } finally {
      setIsRequesting(false)
    }
  }

  return (
    <div className='mt-6'>
      <button className='btn btn-error' onClick={() => setShowModal(true)}>
        {t('request_account_deletion')} {/* Use translation */}
      </button>

      {showModal && (
        <div className={`modal ${showModal ? 'modal-open' : ''}`}>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>{t('are_you_sure')}</h3>{' '}
            {/* Use translation */}
            <p className='py-4'>
              {t('irreversible_action')} {/* Use translation */}
            </p>
            <div className='modal-action'>
              <button
                className={`btn btn-error ${isRequesting ? 'loading' : ''}`}
                onClick={handleDeleteRequest}
                disabled={isRequesting}
              >
                {isRequesting ? t('requesting') : t('yes_submit_request')}{' '}
                {/* Use translation */}
              </button>
              <button className='btn' onClick={() => setShowModal(false)}>
                {t('cancel')} {/* Use translation */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestDeleteAccount
