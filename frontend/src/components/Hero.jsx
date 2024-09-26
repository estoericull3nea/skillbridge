import React from 'react'

import HeroImage from '../assets/images/hero_section_img.png'

const Hero = () => {
  return (
    <div className='min-h-[calc(100vh-68px)] grid grid-cols-1 lg:grid-cols-2 items-center'>
      <div className='left  space-y-5 '>
        <h1 className='font-semibold text-4xl mt-3 lg:mt-0 lg:text-5xl max-w-[500px]'>
          <span className='text-main'>Skill Bridge</span> Virtual Careers
        </h1>
        <div className='space-y-4 max-w-[600px]'>
          <p>
            Welcome to Skill Bridge Virtual Careers, where your global staffing
            needs meet the finest Filipino talent. Specializing in remote
            positions as independent contractors, we bridge the distance to
            bring you dedicated professionals in a variety of roles.
          </p>
        </div>
        <button className='btn bg-black text-white rounded-full hover:bg-transparent hover:border-black hover:text-black font-normal'>
          Request a Consultation
        </button>
      </div>
      <div className='right '>
        <img src={HeroImage} alt='' />
      </div>
    </div>
  )
}

export default Hero
