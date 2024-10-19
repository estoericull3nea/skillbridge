import React from 'react'

import WhereMeets from '../../assets/images/where_meets.jpg'
import { useTranslation } from 'react-i18next'

const BridgingTalent = () => {
  const { t } = useTranslation()

  return (
    <div className='my-20 lg:my-36 grid grid-cols-1 lg:grid-cols-2 items-center'>
      <div className='right '>
        <img src={WhereMeets} alt='' />
      </div>
      <div className='left space-y-5 ms-0 lg:ms-20'>
        <h1 className='font-bold text-2xl mt-3 lg:mt-0 lg:text-3xl max-w-[500px]'>
          {t('BridgingTalent')}
          <span className='text-main'> {t('EmpoweringGlobalSuccess')} </span>
        </h1>
        <div className='space-y-4 max-w-[450px] '>
          <p>{t('BridgingTalentParagraph')}</p>
        </div>
      </div>
    </div>
  )
}

export default BridgingTalent
