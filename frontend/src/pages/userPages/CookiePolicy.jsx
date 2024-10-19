import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const CookiePolicy = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('cookiePolicy')
  }, [t])

  return (
    <>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='font-semibold text-3xl tracking-normal mt-16 mb-10'>
          {t('cookiePolicy')}
        </h1>

        <div className='intro space-y-4'>
          <h2 className='font-medium text-2xl'>{t('introduction')}</h2>
          <p className='text-sm leading-relaxed'>{t('welcomeToSkillBridge')}</p>
          <p className='text-sm leading-relaxed'>
            {t('cookiePolicyDescription')}
          </p>
          <p className='text-sm leading-relaxed'>
            {t('cookiePolicyAgreement')}
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('whatAreCookies')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('whatAreCookiesDescription')}
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('whatAreCookiesUsedFor')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('whatAreCookiesUsedForDescription')}
          </p>
        </div>

        <div className='purpose space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('typesOfCookiesUsed')}</h2>

          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('strictlyNecessaryCookies')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('strictlyNecessaryCookiesDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('performanceCookies')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('performanceCookiesDescription')}
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              {t('functionalityCookies')}
            </span>
            <br />
            <span className='block mt-3'>
              {t('functionalityCookiesDescription')}
            </span>
          </p>
        </div>

        <div className='data_protection space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>{t('cookieDuration')}</h2>
          <p className='text-sm leading-relaxed'>
            {t('cookieDurationDescription')}
          </p>
          <p className='text-sm leading-relaxed'>{t('cookieSettingsUpdate')}</p>
        </div>

        <p className='text-sm leading-relaxed text-gray-400 font-light mb-3'>
          {t('latestUpdate')}: 9th of February, 2024
        </p>
      </div>
    </>
  )
}

export default CookiePolicy
