import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import axios from 'axios'
import { Button } from 'primereact/button'
import { toast } from 'react-hot-toast'
import { Dialog } from 'primereact/dialog'
import { FaPlus, FaPencilAlt, FaTrash, FaEye } from 'react-icons/fa'

const dateFormatter = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const date = new Date(dateString)
  return date.toLocaleString(undefined, options) // returns a string in a human-readable format
}

const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: true,
    isVerified: false,
  })
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [viewDialog, setViewDialog] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const { status, data } = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}users`
      )
      if (status === 200) {
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserForm((prev) => ({ ...prev, [name]: value }))
  }

  // Create user
  const createUser = async () => {
    try {
      const { status, data } = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}users`,
        userForm
      )
      if (status === 201) {
        setUsers((prev) => [...prev, data])
        toast.success('User created successfully!')
        resetForm()
        setShowDialog(false)
        fetchUsers()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Update user
  const updateUser = async (userId) => {
    try {
      const { status, data } = await axios.patch(
        `${import.meta.env.VITE_DEV_BACKEND_URL}users/${userId}`,
        userForm
      )
      if (status === 200) {
        setUsers((prev) =>
          prev.map((user) => (user._id === userId ? data : user))
        )
        toast.success('User updated successfully!')
        setShowDialog(false)
        fetchUsers()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const { status } = await axios.delete(
        `${import.meta.env.VITE_DEV_BACKEND_URL}users/${userId}`
      )
      if (status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userId))
        toast.success('User deleted successfully!')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Open dialog for creating or updating user
  const openDialog = (user = null) => {
    if (user) {
      setSelectedUser(user)
      setUserForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '', // You may want to handle password differently
        active: user.active,
        isVerified: user.isVerified,
      })
    } else {
      resetForm()
    }
    setShowDialog(true)
  }

  // Open view dialog
  const openViewDialog = async (userId) => {
    setLoadingUser(true)
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}users/${userId}`
      )
      setSelectedUser(data)
      setViewDialog(true)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingUser(false)
    }
  }

  // Reset form fields
  const resetForm = () => {
    setUserForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: true,
      isVerified: false,
    })
    setSelectedUser(null)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedUser) {
      updateUser(selectedUser._id)
    } else {
      createUser()
    }
  }

  // Effect to fetch users on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <Button
        label='Add User'
        icon={<FaPlus />}
        onClick={() => openDialog()}
        className='mb-4'
      />
      {isLoading ? (
        <div className='flex flex-col space-y-4'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='flex space-x-4'>
              <div className='skeleton h-12 w-1/4 rounded-md' />
              <div className='skeleton h-12 w-1/4 rounded-md' />
              <div className='skeleton h-12 w-1/4 rounded-md' />
              <div className='skeleton h-12 w-1/4 rounded-md' />
            </div>
          ))}
        </div>
      ) : (
        <DataTable value={users} paginator rows={5} className='mt-2'>
          <Column field='firstName' header='First Name' sortable />
          <Column field='lastName' header='Last Name' sortable />
          <Column field='email' header='Email' sortable />
          <Column
            field='active'
            header='Active'
            body={(rowData) => (rowData.active ? 'Yes' : 'No')}
            sortable
          />
          <Column
            field='isVerified'
            header='Verified'
            body={(rowData) => (rowData.isVerified ? 'Yes' : 'No')}
            sortable
          />
          <Column
            header='Actions'
            body={(rowData) => (
              <>
                <Button
                  icon={<FaEye />}
                  className='mr-2'
                  onClick={() => openViewDialog(rowData._id)}
                />
                <Button
                  icon={<FaPencilAlt />}
                  className='mr-2'
                  onClick={() => openDialog(rowData)}
                />
                <Button
                  icon={<FaTrash />}
                  severity='danger'
                  onClick={() => deleteUser(rowData._id)}
                />
              </>
            )}
          />
        </DataTable>
      )}

      <Dialog
        header={selectedUser ? 'Edit User' : 'Create User'}
        visible={showDialog}
        onHide={() => setShowDialog(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='firstName' className='label'>
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={userForm.firstName}
              onChange={handleInputChange}
              className='input input-bordered w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='lastName' className='label'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={userForm.lastName}
              onChange={handleInputChange}
              className='input input-bordered w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={userForm.email}
              onChange={handleInputChange}
              className='input input-bordered w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={userForm.password}
              onChange={handleInputChange}
              className='input input-bordered w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='label'>
              <input
                type='checkbox'
                checked={userForm.active}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, active: e.target.checked }))
                }
              />
              Active
            </label>
          </div>
          <div className='mb-4'>
            <label className='label'>
              <input
                type='checkbox'
                checked={userForm.isVerified}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    isVerified: e.target.checked,
                  }))
                }
              />
              Verified
            </label>
          </div>
          <Button
            type='submit'
            label={selectedUser ? 'Update User' : 'Create User'}
          />
        </form>
      </Dialog>

      <Dialog
        header='User Details'
        visible={viewDialog}
        onHide={() => setViewDialog(false)}
        footer={<Button label='Close' onClick={() => setViewDialog(false)} />}
      >
        {console.log(selectedUser)}
        {loadingUser ? (
          <div className='flex flex-col space-y-4'>
            <div className='skeleton h-6 w-1/2 rounded-md' />
            <div className='skeleton h-6 w-1/2 rounded-md' />
            <div className='skeleton h-6 w-1/2 rounded-md' />
            <div className='skeleton h-6 w-1/2 rounded-md' />
            <div className='skeleton h-6 w-1/2 rounded-md' />
          </div>
        ) : (
          <div>
            <p>
              <strong>User ID:</strong> {selectedUser?._id}
            </p>
            <p>
              <strong>First Name:</strong> {selectedUser?.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedUser?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser?.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser?.role}
            </p>
            <p>
              <strong>Pfp:</strong> {selectedUser?.picture}
            </p>
            <p>
              <strong>Active:</strong> {selectedUser?.active ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Verified:</strong>{' '}
              {selectedUser?.isVerified ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Registere At:</strong>{' '}
              {dateFormatter(selectedUser?.createdAt)}
            </p>
            <p>
              <strong>Updated At:</strong>{' '}
              {dateFormatter(selectedUser?.updatedAt)}
            </p>
          </div>
        )}
      </Dialog>
    </>
  )
}

export default UserManagement
