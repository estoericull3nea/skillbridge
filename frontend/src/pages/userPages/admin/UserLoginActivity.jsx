import React, { useState } from 'react'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const UserLoginActivity = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState(null)
  const [loginHistory, setLoginHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(false)

  const handleSearch = async (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)

    // Clear login history when a new search is initiated
    if (newSearchTerm.length < 2) {
      setUser(null)
      setLoginHistory([]) // Clear login history
      return
    }

    setUserLoading(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }users/user/search?q=${newSearchTerm}`
      )
      if (response.data.length > 0) {
        setUser(response.data[0]) // Get only the first matched user
      } else {
        setUser(null)
        setLoginHistory([]) // Clear login history if no user found
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const handleUserSelect = async () => {
    if (user) {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}login-histories/${user._id}`
        )
        setLoginHistory(response.data)
      } catch (error) {
        console.error('Error fetching login history:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='p-5'>
      <h2 className='text-2xl font-semibold'>Search for a User</h2>
      <InputText
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search by first name or email...'
        className='w-full mb-4'
      />

      {userLoading && (
        <div className='flex flex-col gap-4 mb-4'>
          <div className='skeleton h-12 w-full'></div>
          <div className='skeleton h-4 w-28'></div>
          <div className='skeleton h-4 w-full'></div>
        </div>
      )}

      {user && (
        <div>
          <h3 className='text-xl font-semibold mt-5'>Selected User:</h3>
          <DataTable value={[user]}>
            <Column field='firstName' header='First Name' />
            <Column field='lastName' header='Last Name' />
            <Column field='email' header='Email' />
          </DataTable>
          <button onClick={handleUserSelect} className='btn btn-primary mt-3'>
            Load Login History
          </button>
        </div>
      )}

      {loading && (
        <div className='flex flex-col gap-4 mt-4'>
          <div className='skeleton h-32 w-full'></div>
          <div className='skeleton h-4 w-28'></div>
          <div className='skeleton h-4 w-full'></div>
        </div>
      )}

      {loginHistory.length > 0 && !loading && (
        <div>
          <h3 className='text-xl font-semibold mt-5'>Login History</h3>
          <DataTable value={loginHistory}>
            <Column field='userAgent' header='User Agent' sortable />
            <Column field='ipAddress' header='IP Address' sortable />
            <Column
              field='createdAt'
              header='Login Time'
              body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
              sortable
            />
          </DataTable>
        </div>
      )}

      {loginHistory.length === 0 && !loading && user && (
        <p className='mt-4 text-gray-500'>
          No login history found for this user.
        </p>
      )}
    </div>
  )
}

export default UserLoginActivity
