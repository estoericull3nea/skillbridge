import React from 'react'
import { useTranslation } from 'react-i18next'

import { BsDashLg } from 'react-icons/bs'
useTranslation

const Services = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='font-medium'>{t('OurServices')}</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3  my-10'>
        <div className='left  flex items-center max-w-[650px]'>
          <h1 className='text-3xl mb-8 lg:mb-0 lg:text-6xl leading-tight '>
            {t('ServicesParagraph')}
          </h1>
        </div>
        <div className='right grid grid-cols-1 md:grid-cols-2 gap-x-3'>
          <div className='mb-10 md:mb-0'>
            <h2 className='bg-base-200 p-8 font-medium text-xl tracking-wide'>
              {t('VirtualAssistance')}
            </h2>
            <ul className='space-y-7 mt-8'>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('AdministrativeSupport')}</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('CustomerService')}</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('WritingandEditing')}</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('SocialMediaManagement')}</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('TechnicalSkills')}</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='bg-base-200 p-8 font-medium text-xl tracking-normal'>
              {t('RecruitmentServices')}
            </h2>
            <ul className='space-y-7 mt-8'>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('TalentSourcing')} </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('TalentScreening')} </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('InterviewingandAssessment')} </span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('Endorsement')}</span>
                </a>
              </li>
              <li>
                <a href='' className='flex items-center'>
                  <BsDashLg /> <span>{t('OnboardingOptional')} </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
