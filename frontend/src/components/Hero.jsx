import React from 'react'
import HeroImage from '../assets/images/hero_section_img.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 items-center h-[calc(100vh-68px)] bg-gradient-to-r from-red-300 to-red-400 px-8 lg:px-16'>
      <div className='left py-12 lg:py-0 space-y-6 mb-10 lg:mb-0'>
        <h1 className='font-extrabold text-4xl mt-3 lg:mt-0 lg:text-6xl max-w-[600px] leading-tight tracking-tight text-white'>
          {t('welcome')} <span className='text-main'>Skill Bridge </span>
          Virtual Careers
        </h1>
        <h3 className='font-medium text-xl max-w-[520px] text-black-200'>
          {t('unmatchedExpertise')}
        </h3>
        <div className='space-y-6 max-w-[550px]'>
          <p className='text-md text-black-100 leading-relaxed'>
            {t('serviceDescription')}
          </p>
        </div>

        <Link
          to='/book-appointment'
          className='inline-block mt-6 px-8 py-4 bg-main text-white text-lg font-medium rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300'
        >
          {t('consultation')}
        </Link>
      </div>
      <div className='right flex justify-center items-center'>
        <img
          src={HeroImage}
          alt='Hero'
          className='w-full max-w-[500px] lg:max-w-[600px] rounded-xl shadow-lg transition-transform duration-500 hover:scale-105'
        />
      </div>
    </div>
  )
}

export default Hero
