import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'

const LoginActivity = () => {
  const [isLoadingAllLoginHistory, setIsLoadingAllLoginHistory] =
    useState(false)
  const [allLoginHistory, setAllLoginHistory] = useState([])
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ipAddress: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userAgent: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const { userId } = useParams()

  const fetchAllLoginHistory = async () => {
    setIsLoadingAllLoginHistory(true)
    try {
      const { status, data } = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}login-histories/${userId}`
      )
      if (status === 200) {
        setAllLoginHistory(data)
      }
    } catch (error) {
      console.error('Error fetching login history:', error.message)
    } finally {
      setIsLoadingAllLoginHistory(false)
    }
  }

  const formatDate = (dateString) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      fractionalSecondDigits: 3,
    }

    const datePart = new Date(dateString).toLocaleDateString(
      undefined,
      dateOptions
    )
    const timePart = new Date(dateString).toLocaleTimeString(
      undefined,
      timeOptions
    )

    return `${datePart} ${timePart}`
  }

  useEffect(() => {
    fetchAllLoginHistory()
  }, [])

  // Global filter change handler
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  // Table header with global filter input
  const renderHeader = () => {
    return (
      <div className='table-header'>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder='Global Search'
            className='py-3 shadow-lg px-3'
          />
        </span>
      </div>
    )
  }

  const header = renderHeader()

  return (
    <>
      {isLoadingAllLoginHistory ? (
        <div className='space-y-3'>
          {/* Skeleton Table Header */}
          <div className='flex space-x-4'>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
          </div>
          {/* Skeleton Rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex space-x-4'>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
              <div className='skeleton h-9 rounded-lg w-full'></div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          value={allLoginHistory}
          paginator
          rows={10}
          header={header}
          filters={filters}
          globalFilterFields={['_id', 'ipAddress', 'userAgent', 'createdAt']}
          emptyMessage='No login history found.'
        >
          <Column
            field='_id'
            header='Login History ID'
            filter
            filterPlaceholder='Search by ID'
            style={{ width: '25%' }}
          ></Column>
          <Column
            field='ipAddress'
            header='IP Address'
            filter
            filterPlaceholder='Search by IP'
            style={{ width: '25%' }}
          ></Column>
          <Column
            field='userAgent'
            header='User Agent'
            filter
            filterPlaceholder='Search by User Agent'
            style={{ width: '25%' }}
          ></Column>
          <Column
            field='createdAt'
            header='Login At'
            body={(rowData) => formatDate(rowData.createdAt)}
            filter
            filterPlaceholder='Search by Date'
            style={{ width: '25%' }}
          ></Column>
        </DataTable>
      )}
    </>
  )
}

export default LoginActivity
