import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const ContactTable = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}contacts`
        )
        setContacts(response.data)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContacts()
  }, [])

  const filteredContacts = contacts.filter((contact) =>
    contact.email.toLowerCase().includes(search.toLowerCase())
  )

  const loadingSkeleton = (
    <div className='flex w-full flex-col gap-4'>
      <div className='skeleton h-32 w-full'></div>
      <div className='skeleton h-4 w-28'></div>
      <div className='skeleton h-4 w-full'></div>
      <div className='skeleton h-4 w-full'></div>
    </div>
  )

  return (
    <div>
      <input
        type='text'
        placeholder='Search by email'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='input mb-2'
      />
      {loading ? (
        loadingSkeleton
      ) : (
        <DataTable
          value={filteredContacts}
          paginator
          rows={10}
          sortMode='multiple'
        >
          <Column field='fullName' header='Full Name' sortable />
          <Column field='email' header='Email' sortable />
          <Column field='subject' header='Subject' sortable />
          <Column field='message' header='Message' sortable />
          <Column
            field='createdAt'
            header='Created At'
            sortable
            body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
          />
        </DataTable>
      )}
    </div>
  )
}

export default ContactTable
