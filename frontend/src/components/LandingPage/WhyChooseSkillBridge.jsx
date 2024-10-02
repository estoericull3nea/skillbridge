import React from 'react'

import WhyChoose from '../../assets/images/why_choose.jpg'
import { Link } from 'react-router-dom'

const WhyChooseSkillBridge = () => {
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-2 items-center mt-28 lg:mt-10'>
      <div className='left space-y-5 order-2 lg:order-1'>
        <p className='font-medium mt-5 lg:mt-0'>Why Choose Us</p>
        {/* <h1 className='font-bold text-2xl mt-3 lg:mt-0 lg:text-3xl max-w-[500px]'>
          Why Choose <span className='text-main'>Skill Bridge</span>
        </h1> */}

        <h1 className='max-w-[450px] font-semibold text-4xl text-main leading-snug'>
          Choose Skill Bridge for expert recruitment services that connect you
          with exceptional Filipino talent.
        </h1>

        <div className='space-y-4 max-w-[450px]'>
          <p>
            Our decade of experience and innovative practices ensure a perfect
            match for your technical and cultural needs. From talent sourcing to
            optional onboarding, we provide comprehensive solutions to enhance
            your business with skilled professionals.
          </p>
        </div>

        <Link
          to='/about'
          className='btn bg-transparent border-black hover:bg-slate-800 hover:text-white rounded-full font-normal'
        >
          Know more about us
        </Link>
      </div>
      <div className='right  order-1 lg:order-2'>
        <img src={WhyChoose} alt='' />
      </div>
    </div>
  )
}

export default WhyChooseSkillBridge
