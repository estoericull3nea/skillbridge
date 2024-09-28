import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/userPages/Home'
import Register from './pages/userPages/Register'
import Login from './pages/userPages/Login'
import ForgotPassword from './pages/userPages/ForgotPassword'
import ResetPassword from './pages/userPages/ResetPassword'

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
      <Router>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/forgot' element={<ForgotPassword />} />
          <Route exact path='/reset' element={<ResetPassword />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
