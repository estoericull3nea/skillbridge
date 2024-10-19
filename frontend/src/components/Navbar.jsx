import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoIosArrowDown } from 'react-icons/io'
import SBLogo from '../assets/icons/sb_logo.png'
import { toast } from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import LanguageSelector from './LanguageSelector'

import { CiUser } from 'react-icons/ci'
import { CiLogout } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const decoded = token ? jwtDecode(token) : ''

  console.log(decoded)

  // if (!decoded?.picture) {
  //   localStorage.setItem('picture', decoded.picture)
  // } else {
  //   if (token && decoded?.picture) {
  //     // localStorage.setItem('testPicture', decoded.picture)
  //     if (decoded.picture.startsWith('https://lh3.googleusercontent.com')) {
  //       localStorage.setItem('picture', decoded.picture)
  //     } else {
  //       localStorage.setItem(
  //         'picture',
  //         `http://localhost:5000/${decoded.picture}`
  //       )
  //     }
  //   }
  // }

  const navigate = useNavigate()

  const userId = decoded?.id

  const [user, setUser] = useState({})
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    toast.success('Logged out')
    setUser({})
    navigate('/login')
  }

  const fetchLoginUser = async () => {
    setIsLoadingUser(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}users/${userId}`
      )
      setUser(response.data)
      localStorage.setItem('firstName', response.data.firstName)
      localStorage.setItem('lastName', response.data.lastName)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem(
        'picture',
        `http://localhost:5000/${response.data.picture}`
      )
    } catch (error) {
      console.log(error.response.data.message)
    } finally {
      setIsLoadingUser(false)
    }
  }

  const getUserInitials = () => {
    if (!isLoadingUser && user?.firstName && user?.lastName) {
      return user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
    }
    return ''
  }

  useEffect(() => {
    if (userId) {
      fetchLoginUser()
    }
  }, [token, localStorage.getItem('picture')])

  return (
    <div className='shadow'>
      <div className='container'>
        <div className='navbar bg-base-100 '>
          <div className='navbar-start'>
            <div className='flex items-center gap-x-3'>
              <div className='drawer z-10 lg:hidden'>
                <input
                  id='my-drawer'
                  type='checkbox'
                  className='drawer-toggle'
                />
                <div className='drawer-content'>
                  {/* Page content here */}
                  <label htmlFor='my-drawer' className='cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 6h16M4 12h8m-8 6h16'
                      />
                    </svg>
                  </label>
                </div>
                <div className='drawer-side'>
                  <label
                    htmlFor='my-drawer'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                  ></label>
                  <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4 '>
                    {/* Sidebar content here */}
                    <Link
                      to='/'
                      className='btn btn-ghost text-xl justify-start hover:bg-transparent'
                    >
                      <img src={SBLogo} alt='' className='w-9' />
                      SkillBridge
                    </Link>
                    <li className='mt-3'>
                      <Link to='/'>Home</Link>
                    </li>
                    <li>
                      <details>
                        <summary className='cursor-pointer'>Services</summary>
                        <ul>
                          <li>
                            <details>
                              <summary className='cursor-pointer'>
                                Virtual Assistance
                              </summary>
                              <ul>
                                <li>
                                  <Link to='/service/administrative-support'>
                                    Administrative Support
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/customer-service'>
                                    Customer Service
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/writing-and-editing'>
                                    Writing and Editing
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/social-media-management'>
                                    {' '}
                                    Social Media Management
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/technical-skill'>
                                    Technical Skills
                                  </Link>
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary className='cursor-pointer'>
                                Recruitment Services
                              </summary>
                              <ul>
                                <li>
                                  <Link to='/service/talent-sourcing'>
                                    Talent Sourcing{' '}
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/talent-screening'>
                                    Talent Screening{' '}
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/interviewing-and-assessment'>
                                    Interviewing and Assessment{' '}
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/endorsement'>
                                    Endorsement
                                  </Link>
                                </li>
                                <li>
                                  <Link to='/service/onboarding'>
                                    Onboarding (optional){' '}
                                  </Link>
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary className='cursor-pointer'>
                                Web Development Services
                              </summary>
                              <ul>
                                <li>
                                  <a>Website Design</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='/service/custom-layout-design'>
                                        Custom Layout Design
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='/service/landing-page-design'>
                                        Landing Page Design
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='/service/responsive-web-design<'>
                                        Responsive Web Design
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>Custom Development</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='/service/full-stack-development'>
                                        Full-Stack Development
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='/service/back-end-development'>
                                        Back-End Development
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='/service/front-end-development'>
                                        Front-End Development
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>CMS</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='/service/wordPress-development'>
                                        WordPress Development
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>SEO Optimization</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <a className='/service/keyword-research'>
                                        Keyword Research
                                      </a>
                                    </li>
                                    <li>
                                      <a className='/service/on-page-seo'>
                                        On-Page SEO
                                      </a>
                                    </li>
                                    <li>
                                      <a className='/service/off-page-seo'>
                                        Off-Page SEO
                                      </a>
                                    </li>
                                    <li>
                                      <a className='/service/wordpress-seo-optimization'>
                                        WordPress SEO Optimization
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>API Integration</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='/service/third-party-api-integration'>
                                        Third-Party API Integration
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='/service/custom-api-development'>
                                        Custom API Development
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </details>
                          </li>
                        </ul>
                      </details>
                    </li>

                    <ul>
                      <li>
                        <Link to='/about'>About</Link>
                      </li>
                      <li>
                        <Link to='/contact'>Contact</Link>
                      </li>
                      {!token && (
                        <div>
                          <li>
                            <Link to='/register'>Register</Link>
                          </li>
                          <li>
                            <Link to='/login'>Login</Link>
                          </li>
                        </div>
                      )}
                      qwe
                      <li>
                        <Link
                          to='/book-appointment'
                          className='py-0 btn bg-transparent border-black hover:bg-slate-800 hover:text-white rounded-full font-normal mt-2'
                        >
                          Get Started{' '}
                          <span className='font-normal  md:block '>
                            -- it's free
                          </span>{' '}
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>

              <Link
                to='/'
                className='btn btn-ghost text-xl hover:bg-transparent'
              >
                <img src={SBLogo} alt='' className='w-9' />
                SkillBridge
              </Link>
            </div>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <div className='dropdown dropdown-hover'>
                  <div
                    tabIndex={0}
                    role='button'
                    className='flex items-center gap-x-1'
                  >
                    <span>Services</span>{' '}
                    <IoIosArrowDown className='font-bold' />
                  </div>
                  <ul
                    tabIndex={0}
                    className='dropdown-content menu rounded-box z-10 mt-[44rem] shadow-2xl bg-base-100 translate-x-[-26rem]'
                  >
                    <ul className='menu menu-horizontal rounded-box lg:min-w-max w-full'>
                      <li>
                        <a>Virtual Assistance</a>
                        <ul>
                          <li>
                            <Link to='/service/administrative-support'>
                              Administrative Support
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/customer-service'>
                              Customer Service
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/writing-and-editing'>
                              Writing and Editing
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/social-media-management'>
                              {' '}
                              Social Media Management
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/technical-skill'>
                              Technical Skills
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>Recruitment Services</a>
                        <ul>
                          <li>
                            <Link to='/service/talent-sourcing'>
                              Talent Sourcing{' '}
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/talent-screening'>
                              Talent Screening{' '}
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/interviewing-and-assessment'>
                              Interviewing and Assessment{' '}
                            </Link>
                          </li>
                          <li>
                            <Link to='/service/endorsement'>Endorsement</Link>
                          </li>
                          <li>
                            <Link to='/service/onboarding'>
                              Onboarding (optional){' '}
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>Web Development Services</a>
                        <ul>
                          <li>
                            <a>Website Design</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='/service/custom-layout-design'>
                                  Custom Layout Design
                                </Link>
                              </li>
                              <li>
                                <Link to='/service/landing-page-design'>
                                  Landing Page Design
                                </Link>
                              </li>
                              <li>
                                <Link to='/service/responsive-web-design<'>
                                  Responsive Web Design
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>Custom Development</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='/service/full-stack-development'>
                                  Full-Stack Development
                                </Link>
                              </li>
                              <li>
                                <Link to='/service/back-end-development'>
                                  Back-End Development
                                </Link>
                              </li>
                              <li>
                                <Link to='/service/front-end-development'>
                                  Front-End Development
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>CMS</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='/service/wordPress-development'>
                                  WordPress Development
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>SEO Optimization</a>
                            <ul className='text-xs'>
                              <li>
                                <a className='/service/keyword-research'>
                                  Keyword Research
                                </a>
                              </li>
                              <li>
                                <a className='/service/on-page-seo'>
                                  On-Page SEO
                                </a>
                              </li>
                              <li>
                                <a className='/service/off-page-seo'>
                                  Off-Page SEO
                                </a>
                              </li>
                              <li>
                                <a className='/service/wordpress-seo-optimization'>
                                  WordPress SEO Optimization
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>API Integration</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='/service/third-party-api-integration'>
                                  Third-Party API Integration
                                </Link>
                              </li>
                              <li>
                                <Link to='/service/custom-api-development'>
                                  Custom API Development
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <ul>
                          <li>
                            <Link to='/about'>About</Link>
                          </li>
                          <li>
                            <Link to='/contact'>Contact</Link>
                          </li>
                          <li>
                            <Link to='/privacy-policy'>Privacy policy</Link>
                          </li>
                          <li>
                            <Link to='/cookie-policy'>Cookie policy</Link>
                          </li>
                          <li>
                            <Link to='/terms'>Terms</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </ul>
                </div>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              {/* here */}
              <LanguageSelector />
            </ul>
          </div>
          <div className='navbar-end'>
            {!token && (
              <ul className='menu menu-horizontal px-1 min-w-max'>
                <li>
                  <Link to='/login' className='hover:bg-transparent'>
                    Login
                  </Link>
                </li>
                <li className='hidden md:block  '>
                  <Link to='/register' className='hover:bg-transparent'>
                    Register
                  </Link>
                </li>
              </ul>
            )}

            <Link
              to='/book-appointment'
              className='hidden sm:flex btn bg-transparent border-black hover:bg-slate-800 hover:text-white rounded-full font-normal'
            >
              Get Started{' '}
              <span className='font-normal hidden md:block '>-- it's free</span>{' '}
            </Link>

            {token ? (
              <div className='flex items-center ms-3'>
                <div className='avatar placeholder dropdown dropdown-hover'>
                  <div
                    className='w-12 rounded-full bg-base-300  '
                    tabIndex={0}
                    role='button'
                  >
                    <span className='text-xl block font-bold'>
                      {user?.picture ? (
                        <img
                          // src={localStorage.getItem('picture')}
                          // src={`http://localhost:5000/${user?.picture}`}
                          src={localStorage.getItem('picture')}
                          alt=''
                          className='w-full'
                        />
                      ) : (
                        getUserInitials()
                      )}
                    </span>
                    <ul
                      tabIndex={0}
                      className='dropdown-content menu bg-base-100 rounded-box z-[10] min-w-max p-2 shadow mt-[174px] translate-x-[-20px] lg:translate-x-0'
                    >
                      <li>
                        <Link
                          to={`/profile/${user?._id}/${user?.firstName}/dashboard`}
                        >
                          {' '}
                          <CiUser />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a>
                          <IoIosNotificationsOutline /> Notifications
                        </a>
                      </li>
                      <li>
                        <a onClick={handleLogout}>
                          <CiLogout />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
