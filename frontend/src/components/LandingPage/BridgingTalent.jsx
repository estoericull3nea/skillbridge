import React from 'react'

import WhereMeets from '../../assets/images/where_meets.jpg'

const BridgingTalent = () => {
  return (
    <div className='my-36 grid grid-cols-1 lg:grid-cols-2 items-center'>
      <div className='right '>
        <img src={WhereMeets} alt='' />
      </div>
      <div className='left space-y-5 ms-0 lg:ms-20'>
        <h1 className='font-bold text-2xl mt-3 lg:mt-0 lg:text-3xl max-w-[500px]'>
          Bridging Talent,{' '}
          <span className='text-main'>Empowering Global Success </span>
        </h1>
        <div className='space-y-4 max-w-[450px] '>
          <p>
            Skill Bridge Virtual Careers connects exceptional Filipino talent
            with global opportunities, enhancing your business with skilled
            professionals. Our tagline, "Bridging Talent, Empowering Global
            Success," embodies our commitment to linking your needs with the
            right expertise, promoting growth and success through comprehensive
            recruitment and versatile virtual assistance services.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BridgingTalent
