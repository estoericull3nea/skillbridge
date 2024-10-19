import React from 'react'
import HeroImage from '../assets/images/hero_section_img.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 items-center lg:py-16 lg:my-0'>
      <div className='left py-8 lg:py-0 space-y-5 mb-8 lg:mb-0'>
        <h1 className='font-bold text-4xl mt-3 lg:mt-0 lg:text-5xl max-w-[500px] lg:leading-[3.2rem]'>
          {t('welcome')} <span className='text-main'>Skill Bridge </span>Virtual
          Careers
        </h1>
        <h3 className='font-medium text-lg max-w-[490px]'>
          {t('unmatchedExpertise')}
        </h3>
        <div className='space-y-4 max-w-[500px]'>
          <p className='text-sm'>{t('serviceDescription')}</p>
        </div>

        <Link
          to='/book-appointment'
          className='btn bg-black text-white rounded-full hover:bg-transparent hover:border-black hover:text-black font-normal'
        >
          {t('consultation')}
        </Link>
      </div>
      <div className='right'>
        <img src={HeroImage} alt='' />
      </div>
    </div>
  )
}

export default Hero
