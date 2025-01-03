import React from 'react'
import { useTranslation } from 'react-i18next'
import WhereMeets from '../../assets/images/where_meets.jpg'

const BridgingTalent = () => {
  const { t } = useTranslation()

  return (
    <section className='py-16 md:py-24 lg:py-32 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
          <div className='w-full lg:w-1/2'>
            <img
              src={WhereMeets}
              alt='Where Talent Meets Opportunity'
              className='rounded-lg shadow-xl w-full h-auto object-cover'
            />
          </div>
          <div className='w-full lg:w-1/2 space-y-6'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900'>
              {t('BridgingTalent')}
              <span className='text-red-600'>
                {' '}
                {t('EmpoweringGlobalSuccess')}{' '}
              </span>
            </h2>
            <p className='text-lg text-gray-700 leading-relaxed'>
              {t('BridgingTalentParagraph')}
            </p>
            <a
              href='#learn-more'
              className='inline-block bg-red-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition duration-300 ease-in-out'
            >
              {t('LearnMore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BridgingTalent
