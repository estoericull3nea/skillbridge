import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import axios from 'axios'

const UserActivityLogs = () => {
  const [userActivityLogs, setUserActivityLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [userMap, setUserMap] = useState({})

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data: logs } = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}logs`
        )

        setUserActivityLogs(logs)

        const userIds = Array.from(new Set(logs.map((log) => log.user))).filter(
          Boolean
        )

        const userResponses = await Promise.all(
          userIds.map((userId) =>
            axios.get(`${import.meta.env.VITE_PROD_BACKEND_URL}users/${userId}`)
          )
        )

        const users = userResponses.reduce((acc, response) => {
          acc[response.data._id] = response.data
          return acc
        }, {})

        setUserMap(users)
      } catch (error) {
        console.error('Error fetching logs or users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  return (
    <div>
      <h1>User Activity Logs</h1>
      {loading ? (
        <div className='flex flex-col space-y-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex space-x-4'>
              <div className='skeleton w-1/4 h-8' />
              <div className='skeleton w-1/4 h-8' />
              <div className='skeleton w-1/4 h-8' />
              <div className='skeleton w-1/4 h-8' />
            </div>
          ))}
        </div>
      ) : (
        <DataTable value={userActivityLogs} paginator rows={30}>
          <Column
            header='Full Name'
            body={(rowData) => {
              const user = userMap[rowData.user]
              return user ? `${user.firstName} ${user.lastName}` : 'N/A'
            }}
          />
          <Column field='action' header='Action' sortable />
          <Column
            field='timestamp'
            header='Timestamp'
            body={(rowData) => new Date(rowData.timestamp).toLocaleString()}
          />
          <Column
            field='details'
            header='Details'
            body={(rowData) => (
              <div>
                {rowData.details && (
                  <>
                    {rowData.details.email && (
                      <p>
                        <strong>Email:</strong> {rowData.details.email}
                      </p>
                    )}
                    {rowData.details.reason && (
                      <p>
                        <strong>Reason:</strong> {rowData.details.reason}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
            sortable
          />
        </DataTable>
      )}
    </div>
  )
}

export default UserActivityLogs
