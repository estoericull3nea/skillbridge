import React from 'react'
import SBLogo from '../assets/icons/sb_logo.png'

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-base-200'>
      <div className='max-w-[1500px] mx-auto'>
        <div className=''>
          {/* <h1 className='ps-10 pt-10 text-xl font-bold'>SkillBridge</h1> */}

          <Link
            to='/'
            className='text-xl ps-6 pt-10 flex items-center gap-x-3 font-medium'
          >
            <img src={SBLogo} alt='' className='w-9' />
            SkillBridge
          </Link>

          <footer className='footer bg-base-200 text-base-content p-6'>
            <nav>
              <h6 className='footer-title'>Quick Links</h6>
              <a className='link link-hover'>Home</a>
              <a className='link link-hover'>Services</a>
              <Link to='/about' className='link link-hover'>
                About
              </Link>
              <a className='link link-hover'>Contact</a>
            </nav>
            <nav>
              <h6 className='footer-title'>Social Links</h6>
              <a className='link link-hover'>Facebook</a>
              <a className='link link-hover'>LinkedIn</a>
              <a className='link link-hover'>Tiktok</a>
              <a className='link link-hover'>Instagram</a>
            </nav>
            <nav>
              <h6 className='footer-title'>Contact</h6>
              <a className='link link-hover'>
                support@skillbridgevirtualcareers.com
              </a>
            </nav>
            <nav>
              <h6 className='footer-title max-w-[300px] font-normal leading-loose text-lg capitalize'>
                Your one-stop shop for marketing success
              </h6>
            </nav>
            <nav>
              <h6 className='footer-title max-w-[300px] font-normal leading-loose text-lg capitalize'>
                At Skill Bridge, we are a proud Filipino professional, reliable,
                and friendly. They're the backbone of our success, delivering
                top-notch service with a smile! Join us and experience their
                expertise firsthand.
              </h6>
            </nav>
          </footer>
          <footer className='footer bg-base-200 text-base-content border-base-300 border-t px-6 py-4'>
            <aside className='grid-flow-col items-center text-center '>
              <p>
                v1.0.2.1 © 2024 Skill Bridge | All Rights Reserved
                <br />
              </p>
            </aside>
            <nav className='md:place-self-center md:justify-self-end '>
              <div className='grid grid-flow-col gap-4'>
                <Link to='/privacy-policy'>Privacy Policy</Link>
                <Link to='/cookie-policy'>Cookie Policy</Link>
                <Link to='/terms'>Terms</Link>
              </div>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer
