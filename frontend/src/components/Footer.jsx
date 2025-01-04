import React from 'react'
import SBLogo from '../assets/icons/sb_logo.png'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-base-200'>
      <div className='max-w-[1500px] mx-auto'>
        <div className=''>
          <Link
            to='/'
            className='text-xl ps-6 pt-10 flex items-center gap-x-3 font-medium'
          >
            <img src={SBLogo} alt='' className='w-9' />
            SkillBridge
          </Link>

          <footer className='footer bg-base-200 text-base-content p-6'>
            <nav>
              <h6 className='footer-title'>{t('QuickLinks')}</h6>
              <a className='link link-hover'>{t('Home')}</a>
              <a className='link link-hover'>{t('Services')}</a>
            </nav>
            <nav>
              <h6 className='footer-title'>{t('SocialLinks')}</h6>
              <a className='link link-hover'>{t('Facebook')}</a>
              <a className='link link-hover'>{t('LinkedIn')}</a>
              <a className='link link-hover'>{t('Instagram')}</a>
              <a className='link link-hover'>{t('Tiktok')}</a>
            </nav>
            <nav>
              <h6 className='footer-title'>{t('Contact')}</h6>
              <a className='link link-hover'>
                support@skillbridgevirtualcareers.com
              </a>
            </nav>
            <nav>
              <h6 className='footer-title max-w-[300px] font-normal leading-loose text-lg capitalize'>
                {t('Youronestopshopformarketingsuccess')}
              </h6>
            </nav>
            <nav>
              <h6 className='footer-title max-w-[300px] font-normal leading-loose text-lg capitalize'>
                {t('AtSkillBridgeweareaproud')}
              </h6>
            </nav>
          </footer>
          <footer className='footer bg-base-200 text-base-content border-base-300 border-t px-6 py-4'>
            <aside className='grid-flow-col items-center text-center '>
              <p>
                {t('AllRightsReserved')}
                <br />
              </p>
            </aside>
            <nav className='md:place-self-center md:justify-self-end '>
              <div className='grid grid-flow-col gap-4'>
                <Link to='/privacy-policy'> {t('PrivacyPolicy')}</Link>
                <Link to='/cookie-policy'> {t('CookiePolicy')}</Link>
                <Link to='/terms'> {t('Terms')}</Link>
              </div>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer
