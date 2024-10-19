import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const DataExport = () => {
  const { userId } = useParams()
  const [format, setFormat] = useState('json')
  const [loading, setLoading] = useState(false)

  const handleDataExport = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }data-export/${userId}?format=${format}`,
        { responseType: 'blob' }
      )

      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const fileExtension =
        format === 'json' ? 'json' : format === 'csv' ? 'csv' : 'zip'
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `user_data_${userId}.${fileExtension}`) // Name of the downloaded file
      document.body.appendChild(link)
      link.click()
      link.remove() // Cleanup after download
    } catch (error) {
      console.error('Error exporting data:', error.message)
    } finally {
      setLoading(false) // Set loading to false once the export is done
    }
  }

  return (
    <div>
      <label>Select Format: </label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value='json'>JSON</option>
        <option value='csv'>CSV</option>
        <option value='zip'>ZIP</option>
      </select>

      <button
        onClick={handleDataExport}
        className='btn btn-primary'
        disabled={loading}
      >
        {loading ? 'Exporting...' : 'Export Data'}
      </button>
    </div>
  )
}

export default DataExport
