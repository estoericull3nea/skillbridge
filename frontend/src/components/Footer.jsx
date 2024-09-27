import React from 'react'

const Footer = () => {
  return (
    <div className='bg-base-200'>
      <div className='max-w-[1500px] mx-auto'>
        <div className=''>
          <h1 className='ps-10 pt-10 text-xl font-bold'>SkillBridge</h1>

          <footer className='footer bg-base-200 text-base-content p-10'>
            <nav>
              <h6 className='footer-title'>Quick Links</h6>
              <a className='link link-hover'>Home</a>
              <a className='link link-hover'>Services</a>
              <a className='link link-hover'>Careers</a>
              <a className='link link-hover'>About</a>
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
              <h6 className='footer-title max-w-[300px] font-medium leading-relaxed text-lg'>
                Your one-stop shop for marketing success
              </h6>
            </nav>
            <nav>
              <h6 className='footer-title max-w-[300px] font-medium leading-relaxed text-lg'>
                At Skill Bridge, we are a proud Filipino professional, reliable,
                and friendly. They're the backbone of our success, delivering
                top-notch service with a smile! Join us and experience their
                expertise firsthand.
              </h6>
            </nav>
          </footer>
          <footer className='footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4'>
            <aside className='grid-flow-col items-center'>
              <p>
                v1.0.2.1 © 2024 Skill Bridge | All Rights Reserved
                <br />
              </p>
            </aside>
            <nav className='md:place-self-center md:justify-self-end'>
              <div className='grid grid-flow-col gap-4'>
                <a>Privacy Policy</a>
                <a>Cookie Policy</a>
                <a>Terms of Service</a>
              </div>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer
