import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Terms = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('termsAndConditions')
  }, [t])

  return (
    <>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='font-semibold text-3xl tracking-normal mt-16 mb-10'>
          {t('termsOfService')}
        </h1>

        <div className='intro space-y-4'>
          <h2 className='font-medium text-2xl'>
            {t('usersAcknowledgmentAndAcceptanceOfTerms')}
          </h2>
          <p className='text-sm leading-relaxed'>{t('welcomeToSkillBridge')}</p>
          <p className='text-sm leading-relaxed'>{t('termsDescription')}</p>
          <p className='text-sm leading-relaxed'>{t('byUsingSite')}</p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('serviceOverview')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('serviceOverviewDescription')}
          </p>
          <p className='text-sm leading-relaxed'>{t('tasksDescription')}</p>
        </div>

        <div className='purpose space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('guaranteeWarranty')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('guaranteeWarrantyDescription')}
          </p>
        </div>

        <div className='data_protection space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('thirdPartyContent')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('thirdPartyContentDescription')}
          </p>
        </div>

        <div className='user_rights space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('limitationOfLiability')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('limitationOfLiabilityDescription')}
          </p>
        </div>

        <div className='cookies space-y-4 mb-3'>
          <h2 className='font-medium text-2xl'>{t('miscellaneous')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('miscellaneousDescription')}
          </p>
        </div>

        <p className='text-sm leading-relaxed text-gray-400 font-light mb-3'>
          {t('latestUpdate')}: 9th of February, 2024
        </p>
      </div>
    </>
  )
}

export default Terms
