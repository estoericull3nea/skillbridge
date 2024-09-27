import React from 'react'
import Hero from '../../components/Hero'
import WhyChooseSkillBridge from '../../components/LandingPage/WhyChooseSkillBridge'
import BridgingTalent from '../../components/LandingPage/BridgingTalent'
import Services from '../../components/LandingPage/Services'

const Home = () => {
  return (
    <div className='container'>
      <Hero />
      <WhyChooseSkillBridge />
      <BridgingTalent />
      <Services />
    </div>
  )
}

export default Home
