import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/userPages/Home'
import Register from './pages/userPages/Register'
import Login from './pages/userPages/Login'
import ForgotPassword from './pages/userPages/ForgotPassword'
import ResetPassword from './pages/userPages/ResetPassword'
import Policy from './pages/userPages/Policy'
import Terms from './pages/userPages/Terms'
import CookiePolicy from './pages/userPages/CookiePolicy'
import BookAppointment from './pages/userPages/BookAppointment'
import VerifyEmail from './pages/userPages/VerifyEmail'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'
import NotFound from './pages/NotFound'
import GoogleCallback from './pages/userPages/GoogleCallback'
import About from './pages/userPages/About'
import Profile from './pages/userPages/profile/Profile'
import ProtectRoute from './components/ProtectRoute'

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

          <Route
            path='/register'
            element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path='/login'
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />

          <Route exact path='/forgot' element={<ForgotPassword />} />
          <Route exact path='/google-callback' element={<GoogleCallback />} />
          <Route exact path='/reset/:resetToken' element={<ResetPassword />} />
          <Route exact path='/privacy-policy' element={<Policy />} />
          <Route exact path='/terms' element={<Terms />} />
          <Route exact path='/cookie-policy' element={<CookiePolicy />} />
          <Route exact path='/book-appointment' element={<BookAppointment />} />
          <Route exact path='/verify' element={<VerifyEmail />} />

          <Route
            exact
            path='/profile/:userId/:firstName/*'
            element={<Profile />}
          />

          <Route
            path='/about'
            element={
              <ProtectRoute>
                <About />
              </ProtectRoute>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
