import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import WhyChooseSkillBridge from '../../components/LandingPage/WhyChooseSkillBridge'
import BridgingTalent from '../../components/LandingPage/BridgingTalent'
const Home = () => {
  return (
    <div className='container'>
      <Navbar />
      <Hero />
      <WhyChooseSkillBridge />
      <BridgingTalent />
    </div>
  )
}

export default Home
