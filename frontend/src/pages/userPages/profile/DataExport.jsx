import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DataExport = () => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const [format, setFormat] = useState('json')
  const [loading, setLoading] = useState(false)

  const handleDataExport = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }data-export/${userId}?format=${format}`,
        { responseType: 'blob' }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const fileExtension =
        format === 'json' ? 'json' : format === 'csv' ? 'csv' : 'zip'
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `user_data_${userId}.${fileExtension}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error exporting data:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label>{t('select_format')}</label>

      <div className='form-control'>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className='select select-bordered'
        >
          <option value='json'>{t('json')}</option>
          <option value='csv'>{t('csv')}</option>
          <option value='zip'>{t('zip')}</option>
        </select>
      </div>

      <button
        onClick={handleDataExport}
        className='btn bg-main text-white hover:bg-transparent hover:border-main hover:text-main mt-3'
        disabled={loading}
      >
        {loading ? t('exporting') : t('export_data')}
      </button>
    </div>
  )
}

export default DataExport
