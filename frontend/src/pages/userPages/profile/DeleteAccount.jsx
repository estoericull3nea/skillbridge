import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const RequestDeleteAccount = () => {
  const [isRequesting, setIsRequesting] = useState(false)
  const [showModal, setShowModal] = useState(false) // Control modal visibility
  const { userId } = useParams()

  const handleDeleteRequest = async () => {
    setIsRequesting(true)
    try {
      const { status } = await axios.post(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }users/${userId}/request-deletion`
      )

      if (status === 200) {
        toast.success(
          'Account deletion request submitted. Pending admin approval.'
        )
        setShowModal(false) // Close the modal on success
      }
    } catch (error) {
      if (
        error.response.data.message ===
        'A pending deletion request already exists.'
      ) {
        toast.error(error.response.data.message)
      }
    } finally {
      setIsRequesting(false)
    }
  }

  return (
    <div className='mt-6'>
      {/* Button to trigger modal */}
      <button className='btn btn-error' onClick={() => setShowModal(true)}>
        Request Account Deletion
      </button>

      <p>Deletion Status: Pending</p>

      {/* DaisyUI modal for confirmation */}
      {showModal && (
        <div className={`modal ${showModal ? 'modal-open' : ''}`}>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Are you sure?</h3>
            <p className='py-4'>
              This action is irreversible. Your account deletion request will be
              submitted for admin approval.
            </p>
            <div className='modal-action'>
              <button
                className={`btn btn-error ${isRequesting ? 'loading' : ''}`}
                onClick={handleDeleteRequest}
                disabled={isRequesting}
              >
                {isRequesting ? 'Requesting...' : 'Yes, Submit Request'}
              </button>
              <button className='btn' onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestDeleteAccount
