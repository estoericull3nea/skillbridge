import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/userPages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Toaster
        position='top-center'
        reverseOrder={false}
        containerClassName='text-xs'
      />
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
