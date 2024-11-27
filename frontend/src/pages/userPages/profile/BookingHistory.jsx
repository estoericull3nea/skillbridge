import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const BookingHistory = () => {
  const { t } = useTranslation()
  const [isLoadingAllBookings, setIsLoadingAllBookings] = useState(false)
  const [allBookings, setAllBookings] = useState([])

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' },
    specificService: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
    date: { value: null, matchMode: 'contains' },
    notes: { value: null, matchMode: 'contains' },
    phone: { value: null, matchMode: 'contains' },
    createdAt: { value: null, matchMode: 'contains' },
  })

  const serviceOptions = [
    { label: t('virtual_assistance'), value: 'virtual_assistance' },
    { label: t('recruitment_services'), value: 'recruitment_services' },
    { label: t('other_service'), value: 'other' },
  ]

  const statusOptions = [
    { label: t('pending'), value: 'pending' },
    { label: t('ongoing'), value: 'ongoing' },
    { label: t('canceled'), value: 'canceled' },
    { label: t('rejected'), value: 'rejected' },
    { label: t('done'), value: 'done' },
    { label: t('missed'), value: 'missed' },
  ]

  const onServiceFilterChange = (e) => {
    let _filters = { ...filters }
    _filters['specificService'].value = e.value
    setFilters(_filters)
  }

  const fetchAllBookings = async () => {
    setIsLoadingAllBookings(true)
    try {
      const { status, data } = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/users-book/bookings?email=${localStorage.getItem('email')}`
      )
      if (status === 200) {
        setAllBookings(data)
      }
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message)
    } finally {
      setIsLoadingAllBookings(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    fetchAllBookings()
  }, [])

  return (
    <>
      {isLoadingAllBookings ? (
        <div className='space-y-3'>
          <div className='flex space-x-4'>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
            <div className='skeleton h-9 rounded-lg w-full'></div>
          </div>
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
          value={allBookings}
          paginator
          rows={5}
          showGridlines
          stripedRows
          className='bg-white shadow-xl rounded-xl p-6'
          size='medium'
          removableSort
          filters={filters}
          globalFilterFields={['specificService', 'status', 'notes', 'phone']}
          header={
            <div className='table-header'>
              <span className='p-input-icon-left'>
                <i className='pi pi-search' />
                <InputText
                  type='search'
                  className='py-3 shadow-lg px-3'
                  onInput={(e) =>
                    setFilters({
                      ...filters,
                      global: { value: e.target.value, matchMode: 'contains' },
                    })
                  }
                  placeholder={t('search_placeholder')}
                />
              </span>
            </div>
          }
        >
          <Column
            header={t('service')}
            field='specificService'
            sortable
            filter
            filterElement={
              <Dropdown
                value={filters.specificService.value}
                options={serviceOptions}
                onChange={onServiceFilterChange}
                placeholder={t('filter_by_service')}
                className='p-column-filter'
                showClear
              />
            }
          />

          <Column
            field='date'
            header={t('date_time')}
            body={(rowData) => `${formatDate(rowData.date)} ${rowData.time}`}
            sortable
            filter
            filterPlaceholder={t('filter_by_date')}
            filterMatchMode='contains'
          />

          <Column
            field='notes'
            header={t('notes')}
            body={(rowData) =>
              rowData.notes ? (
                rowData.notes
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#df0001'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )
            }
            sortable
            filter
            filterPlaceholder={t('filter_by_notes')}
            filterMatchMode='contains'
          />

          <Column
            field='phone'
            header={t('phone')}
            body={(rowData) =>
              rowData.phone ? (
                rowData.phone
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#df0001'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )
            }
            sortable
            filter
            filterPlaceholder={t('filter_by_phone')}
            filterMatchMode='contains'
          />

          <Column
            field='status'
            header={t('status')}
            body={(rowData) =>
              rowData.status === 'missed' ? (
                <span className='text-red-600'>{t('missed')}</span>
              ) : (
                rowData.status
              )
            }
            sortable
            filter
            filterElement={
              <Dropdown
                value={filters.status?.value || null}
                options={statusOptions}
                onChange={(e) => {
                  let _filters = { ...filters }
                  _filters['status'].value = e.value
                  setFilters(_filters)
                }}
                placeholder={t('filter_by_status')}
                className='p-column-filter'
                showClear
              />
            }
          />

          <Column
            field='createdAt'
            header={t('booked_at')}
            body={(rowData) =>
              `${formatDate(rowData.createdAt)} ${rowData.time}`
            }
            sortable
            filter
            filterPlaceholder={t('filter_by_date')}
            filterMatchMode='contains'
          />
        </DataTable>
      )}
    </>
  )
}

export default BookingHistory
