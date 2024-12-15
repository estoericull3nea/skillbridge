import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { toast } from 'react-hot-toast'

import { io } from 'socket.io-client'
const socket = io('https://skillbridge-p5g5.onrender.com')

const DeletionRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_BACKEND_URL}users/deletion/requests`
      )
      setRequests(response.data)
    } catch (error) {
      console.error('Error fetching deletion requests:', error)
      toast.error('Failed to fetch deletion requests.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
    socket.on('newRequestDeletion', (data) => {
      fetchRequests()
    })

    return () => {
      socket.off('newRequestDeletion')
    }
  }, [])

  const handleApprove = async (requestId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }users/deletion-requests/${requestId}/approve`
      )
      toast.success('Deletion request approved successfully!')
      fetchRequests()
    } catch (error) {
      console.error('Error approving request:', error)
      toast.error('Failed to approve deletion request.')
    }
  }

  const handleReject = async (requestId) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }users/deletion-requests/${requestId}/reject`
      )
      toast.success('Deletion request rejected successfully!')
      fetchRequests()
    } catch (error) {
      console.error('Error rejecting request:', error)
      toast.error('Failed to reject deletion request.')
    }
  }

  const actionTemplate = (rowData) => {
    return (
      <div>
        <button
          onClick={() => handleApprove(rowData._id)}
          className='btn btn-success btn-xs mr-2'
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(rowData._id)}
          className='btn btn-error btn-xs'
        >
          Reject
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Deletion Requests</h2>
      {loading ? (
        <div className='flex flex-col gap-4'>
          <div className='skeleton h-32 w-full'></div>
          <div className='skeleton h-4 w-28'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
        </div>
      ) : (
        <DataTable value={requests} paginator rows={20}>
          <Column field='user.email' header='User Email' sortable />
          <Column field='status' header='Status' sortable />
          <Column body={actionTemplate} header='Actions' />
        </DataTable>
      )}
    </div>
  )
}

export default DeletionRequests
