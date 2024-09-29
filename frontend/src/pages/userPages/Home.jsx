import React, { useEffect } from 'react'
import Hero from '../../components/Hero'
import WhyChooseSkillBridge from '../../components/LandingPage/WhyChooseSkillBridge'
import BridgingTalent from '../../components/LandingPage/BridgingTalent'
import Services from '../../components/LandingPage/Services'
import Partnership from '../../components/LandingPage/Partnership'
const Home = () => {
  useEffect(() => {
    document.title = 'Skill Bridge'
  }, [])

  return (
    <div className='container'>
      <Hero />
      <WhyChooseSkillBridge />
      <BridgingTalent />
      <Services />
      <Partnership />
    </div>
  )
}

export default Home
