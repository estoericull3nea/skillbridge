import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const DeleteAccount = ({ userId }) => {
  const [isRequesting, setIsRequesting] = useState(false)

  const { userId } = useParams()
  console.log(userId)

  const handleDeleteRequest = async () => {
    if (window.confirm('Are you sure you want to request account deletion?')) {
      setIsRequesting(true)
      try {
        await axios.post(
          `${
            import.meta.env.VITE_DEV_BACKEND_URL
          }/users/${userId}/request-deletion`
        )
        toast.success(
          'Account deletion request submitted. Pending admin approval.'
        )
      } catch (error) {
        console.error('Error requesting deletion:', error)
        toast.error('Failed to submit deletion request.')
      } finally {
        setIsRequesting(false)
      }
    }
  }

  return (
    <div className='mt-6'>
      <button
        className='btn btn-error'
        onClick={handleDeleteRequest}
        disabled={isRequesting}
      >
        {isRequesting ? 'Requesting...' : 'Request Account Deletion'}
      </button>
    </div>
  )
}

export default DeleteAccount
