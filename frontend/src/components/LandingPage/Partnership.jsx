import React from 'react'

import Techaronic from '../../assets/images/techaronic.png'
import Zimrii from '../../assets/images/zimrii.png'
import { useTranslation } from 'react-i18next'
const Partnership = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className='my-32'>
        <h1 className=' text-center text-3xl mb-10 font-semibold tracking-wide  '>
          {t('Partnership')}
        </h1>
        <div className='flex items-center justify-center gap-x-10'>
          <img src={Techaronic} alt='' className='w-24' />
          <img src={Zimrii} alt='' className='w-16' />
        </div>
      </div>
    </>
  )
}

export default Partnership
