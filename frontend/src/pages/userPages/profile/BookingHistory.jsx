import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { IoSendOutline } from 'react-icons/io5'
import { MdOutlineCancelScheduleSend } from 'react-icons/md'
import { toast } from 'react-hot-toast'

const BookingHistory = () => {
  const [isLoadingAllBookings, setIsLoadingAllBookings] = useState(false)
  const [allBookings, setAllBookings] = useState([])

  const [loadingCancel, setLoadingCancel] = useState({})

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' },
    service: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
    date: { value: null, matchMode: 'contains' },
    notes: { value: null, matchMode: 'contains' },
    phone: { value: null, matchMode: 'contains' },
    createdAt: { value: null, matchMode: 'contains' },
  })

  const serviceOptions = [
    { label: 'Virtual Assistance', value: 'virtual_assistance' },
    { label: 'Recruitment Services', value: 'recruitment_services' },
    { label: 'Other Service', value: 'other' },
  ]

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Canceled', value: 'canceled' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Done', value: 'done' },
    { label: 'Missed', value: 'missed' },
  ]

  const onServiceFilterChange = (e) => {
    let _filters = { ...filters }
    _filters['service'].value = e.value // Update the service filter value
    setFilters(_filters) // Update the filters state
  }

  const fetchAllBookings = async () => {
    setIsLoadingAllBookings(true)
    try {
      const { status, data } = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
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

  const cancelMeeting = async (bookingId) => {
    setLoadingCancel((prevState) => ({ ...prevState, [bookingId]: true }))
    try {
      const { status } = await axios.patch(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/update-status/${bookingId}`, // Updated URL
        { status: 'canceled' } // Pass the 'canceled' status in the request body
      )
      if (status === 200) {
        await fetchAllBookings()
        toast.success('Canceled')
      }
    } catch (error) {
      console.error('Error canceling meeting:', error.message)
    } finally {
      setLoadingCancel((prevState) => ({ ...prevState, [bookingId]: false }))
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
          value={allBookings}
          paginator
          rows={5}
          showGridlines
          stripedRows
          className='bg-white shadow-xl rounded-xl p-6'
          size='medium'
          removableSort
          filters={filters} // Pass the filters state to the DataTable
          globalFilterFields={['service', 'status', 'notes', 'phone']} // Fields to be globally filtered
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
                  placeholder='Search...'
                />
              </span>
            </div>
          }
        >
          {/* Service Column with Dropdown Filter */}
          <Column
            header='Service'
            field='service' // This will filter by the 'service' field
            body={(rowData) =>
              rowData.service === 'virtual_assistance'
                ? 'Virtual Assistance'
                : rowData.service === 'recruitment_services'
                ? 'Recruitment Services'
                : 'Other Service'
            }
            sortable
            filter // Enable filtering
            filterElement={
              <Dropdown
                value={filters.service.value} // Bind dropdown value to the filter state
                options={serviceOptions}
                onChange={onServiceFilterChange} // Update the filter state when dropdown changes
                placeholder='Filter by Service'
                className='p-column-filter'
                showClear
              />
            }
          />

          {/* Date & Time Column */}
          <Column
            field='date'
            header='Date & Time'
            body={(rowData) => `${formatDate(rowData.date)} ${rowData.time}`}
            sortable
            filter
            filterPlaceholder='Filter by Date'
            filterMatchMode='contains'
          />

          {/* Notes Column */}
          <Column
            field='notes'
            header='Notes'
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
            filterPlaceholder='Filter by Notes'
            filterMatchMode='contains'
          />

          {/* Phone Column */}
          <Column
            field='phone'
            header='Phone'
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
            filterPlaceholder='Filter by Phone'
            filterMatchMode='contains'
          />

          {/* Status Column with Dropdown Filter */}
          <Column
            field='status'
            header='Status'
            body={(rowData) =>
              rowData.status === 'missed' ? (
                <span className='text-red-600'>Missed</span>
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
                placeholder='Filter by Status'
                className='p-column-filter'
                showClear
              />
            }
          />

          {/* Booked At Column with Text Filter */}
          <Column
            field='createdAt'
            header='Booked At'
            body={(rowData) =>
              `${formatDate(rowData.createdAt)} ${rowData.time}`
            }
            sortable
            filter
            filterPlaceholder='Filter by Date'
            filterMatchMode='contains'
          ></Column>

          {/* Actions Column */}
          {/* <Column
            header='Actions'
            body={(rowData) => (
              <div className='flex space-x-2'>
                {rowData.meeting?.join_url ? (
                  <>
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Join Zoom meeting'
                    >
                      <a
                        href={rowData.meeting.join_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn bg-transparent text-black hover:text-main rounded-full shadow-lg'
                      >
                        <IoSendOutline />
                      </a>
                    </div>

                    <div
                      className='tooltip tooltip-left'
                      data-tip='Cancel meeting'
                    >
                      <button
                        onClick={() => cancelMeeting(rowData._id)}
                        className='btn bg-transparent text-black hover:text-main rounded-full shadow-lg'
                        disabled={loadingCancel[rowData._id]}
                      >
                        {loadingCancel[rowData._id] ? (
                          <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                          ></span>
                        ) : (
                          <MdOutlineCancelScheduleSend />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <span>No URL</span>
                )}
              </div>
            )}
            sortable
          ></Column> */}
        </DataTable>
      )}
    </>
  )
}

export default BookingHistory
