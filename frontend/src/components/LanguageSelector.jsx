// src/components/LanguageSelector.js

import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng) // Store selected language in localStorage
  }

  return (
    <div>
      <select
        id='language'
        className='select select-bordered w-full bg-red-200'
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={localStorage.getItem('language') || 'en'} // Default language from localStorage
      >
        <option value='en'>English</option>
        <option value='es'>Español</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  )
}

export default LanguageSelector
