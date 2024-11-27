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
  const [filteredLoginHistory, setFilteredLoginHistory] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  // State to manage sorting
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)

  const handleSearch = async (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)

    // Clear login history when a new search is initiated
    if (newSearchTerm.length < 2) {
      setUser(null)
      setLoginHistory([])
      setFilteredLoginHistory([])
      setFirst(0)
      return
    }

    setUserLoading(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }users/user/search?q=${newSearchTerm}`
      )
      if (response.data.length > 0) {
        setUser(response.data[0])
      } else {
        setUser(null)
        setLoginHistory([])
        setFilteredLoginHistory([])
        setFirst(0)
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
          `${import.meta.env.VITE_PROD_BACKEND_URL}login-histories/${user._id}`
        )
        setLoginHistory(response.data)
        setFilteredLoginHistory(response.data)
        setFirst(0)
      } catch (error) {
        console.error('Error fetching login history:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const onSort = (event) => {
    setSortField(event.sortField)
    setSortOrder(event.sortOrder)
  }

  // Calculate the total number of records for pagination
  const totalRecords = filteredLoginHistory.length

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
          <button onClick={handleUserSelect} className='underline mt-3'>
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

      {filteredLoginHistory.length > 0 && !loading && (
        <div>
          <h3 className='text-xl font-semibold mt-5'>Login History</h3>
          <DataTable
            value={filteredLoginHistory.slice(first, first + rows)}
            paginator={true}
            rows={rows}
            first={first}
            onPage={onPageChange}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          >
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
    </div>
  )
}

export default UserLoginActivity
