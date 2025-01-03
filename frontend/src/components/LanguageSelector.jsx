import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  return (
    <div>
      <select
        id='language'
        className='select select-bordered w-full bg-red-200'
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={localStorage.getItem('language') || 'en'}
      >
        <option value='en'>English</option>
        <option value='es'>Español</option>
      </select>
    </div>
  )
}

export default LanguageSelector
