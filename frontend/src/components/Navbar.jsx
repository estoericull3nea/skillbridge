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
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t } = useTranslation()

  const token = localStorage.getItem('token')
  const decoded = token ? jwtDecode(token) : ''

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
        `${import.meta.env.VITE_PROD_BACKEND_URL}users/${userId}`
      )
      setUser(response.data)
      localStorage.setItem('firstName', response.data.firstName)
      localStorage.setItem('lastName', response.data.lastName)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem(
        'picture',
        `https://skillbridge-p5g5.onrender.com/${response.data.picture}`
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
      <div className=''>
        <div className='navbar bg-red-200'>
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
                      <Link to='/'>{t('Home')}</Link>
                    </li>
                    <li>
                      <details>
                        <summary className='cursor-pointer'>
                          {t('Services')}
                        </summary>
                        <ul>
                          <li>
                            <details>
                              <summary className='cursor-pointer'>
                                {t('VirtualAssistance')}
                              </summary>
                              <ul>
                                <li>
                                  <Link to='#'>
                                    {t('AdministrativeSupport')}
                                  </Link>
                                </li>
                                <li>
                                  <Link to='#'>{t('CustomerService')}</Link>
                                </li>
                                <li>
                                  <Link to='#'>{t('WritingandEditing')}</Link>
                                </li>
                                <li>
                                  <Link to='#'>
                                    {' '}
                                    {t('SocialMediaManagement')}
                                  </Link>
                                </li>
                                <li>
                                  <Link to='#'>{t('TechnicalSkills')}</Link>
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary className='cursor-pointer'>
                                {t('RecruitmentServices')}
                              </summary>
                              <ul>
                                <li>
                                  <Link to='#'>{t('TalentSourcing')}</Link>
                                </li>
                                <li>
                                  <Link to='#'>{t('TalentScreening')}</Link>
                                </li>
                                <li>
                                  <Link to='#'>
                                    {t('InterviewingandAssessment')}
                                  </Link>
                                </li>
                                <li>
                                  <Link to='#'>{t('Endorsement')}</Link>
                                </li>
                                <li>
                                  <Link to='#'>{t('OnboardingOptional')}</Link>
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary className='cursor-pointer'>
                                {t('WebDevelopmentServices')}
                              </summary>
                              <ul>
                                <li>
                                  <a>{t('WebsiteDesign')}</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='#'>
                                        {t('CustomLayoutDesign')}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='#'>
                                        {t('LandingPageDesign')}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='#'>
                                        {t('ResponsiveWebDesign')}
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>{t('CustomDevelopment')}</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='#'>
                                        {t('FullStackDevelopment')}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='#'>
                                        {t('BackEndDevelopment')}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='#'>
                                        {t('FrontEndDevelopment')}
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>CMS</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='#'>
                                        {t('WordPressDevelopment')}
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>{t('SEOOptimization')}</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <a className='#'>
                                        {t('KeywordResearch')}
                                      </a>
                                    </li>
                                    <li>
                                      <a className='#'>{t('OnPageSEO')}</a>
                                    </li>
                                    <li>
                                      <a className='#'>{t('OffPageSEO')}</a>
                                    </li>
                                    <li>
                                      <a className='#'>
                                        {t('WordPressSEOOptimization')}
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a>{t('APIIntegration')}</a>
                                  <ul className='text-xs'>
                                    <li>
                                      <Link to='#'>
                                        {t('ThirdPartyAPIIntegration')}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to='#'>
                                        {t('CustomAPIDevelopment')}
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
                      {/* <li>
                        <Link to='/about'> {t('About')}</Link>
                      </li> */}
                      {/* <li>
                        <Link to='/contact'> {t('Contact')}</Link>
                      </li> */}
                      {!token && (
                        <div>
                          <li>
                            <Link to='/register'> {t('Register')}</Link>
                          </li>
                          <li>
                            <Link to='/login'> {t('Login')}</Link>
                          </li>
                        </div>
                      )}
                      <li>
                        <Link
                          to='/book-appointment'
                          className='py-0 btn bg-transparent border-black hover:bg-slate-800 hover:text-white rounded-full font-normal mt-2'
                        >
                          {t('GetStarted')}{' '}
                          <span className='font-normal  md:block '></span>{' '}
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
                <Link to='/'>{t('Home')}</Link>
              </li>
              <li>
                <div className='dropdown dropdown-hover'>
                  <div
                    tabIndex={0}
                    role='button'
                    className='flex items-center gap-x-1'
                  >
                    <span>{t('Services')}</span>{' '}
                    <IoIosArrowDown className='font-bold' />
                  </div>
                  <ul
                    tabIndex={0}
                    className='dropdown-content menu rounded-box z-10 mt-[44rem] shadow-2xl bg-base-100 translate-x-[-26rem]'
                  >
                    <ul className='menu menu-horizontal rounded-box lg:min-w-max w-full'>
                      <li>
                        <a>{t('VirtualAssistance')}</a>
                        <ul>
                          <li>
                            <Link to='#'>{t('AdministrativeSupport')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('CustomerService')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('WritingandEditing')}</Link>
                          </li>
                          <li>
                            <Link to='#'> {t('SocialMediaManagement')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('TechnicalSkills')}</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>{t('RecruitmentServices')}</a>
                        <ul>
                          <li>
                            <Link to='#'>{t('TalentSourcing')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('TalentScreening')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('InterviewingandAssessment')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Endorsement')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('OnboardingOptional')}</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>{t('WebDevelopmentServices')}</a>
                        <ul>
                          <li>
                            <a>{t('WebsiteDesign')}</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='#'>Custom Layout Design</Link>
                              </li>
                              <li>
                                <Link to='#'>Landing Page Design</Link>
                              </li>
                              <li>
                                <Link to='#'>{t('ResponsiveWebDesign')}</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>{t('CustomDevelopment')}</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='#'>{t('FullStackDevelopment')}</Link>
                              </li>
                              <li>
                                <Link to='#'>{t('BackEndDevelopment')}</Link>
                              </li>
                              <li>
                                <Link to='#'>{t('FrontEndDevelopment')}</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>CMS</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='#'>{t('WordPressDevelopment')}</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>{t('SEOOptimization')}</a>
                            <ul className='text-xs'>
                              <li>
                                <a className='#'>{t('KeywordResearch')}</a>
                              </li>
                              <li>
                                <a className='#'>{t('OnPageSEO')}</a>
                              </li>
                              <li>
                                <a className='#'>{t('OffPageSEO')}</a>
                              </li>
                              <li>
                                <a className='#'>
                                  {t('WordPressSEOOptimization')}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>{t('APIIntegration')}</a>
                            <ul className='text-xs'>
                              <li>
                                <Link to='#'>
                                  {t('ThirdPartyAPIIntegration')}
                                </Link>
                              </li>
                              <li>
                                <Link to='#'>{t('CustomAPIDevelopment')}</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <ul>
                          {/* <li>
                            <Link to='/about'>{t('About')}</Link>
                          </li> */}
                          {/* <li>
                            <Link to='/contact'>{t('Contact')}</Link>
                          </li> */}
                          <li>
                            <Link to='/privacy-policy'>
                              {t('PrivacyPolicy')}
                            </Link>
                          </li>
                          <li>
                            <Link to='/cookie-policy'>{t('CookiePolicy')}</Link>
                          </li>
                          <li>
                            <Link to='/terms'>{t('Terms')}</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </ul>
                </div>
              </li>
              {/* <li>
                <Link to='/about'>{t('About')}</Link>
              </li> */}
              {/* here */}
            </ul>
          </div>
          <div className='navbar-end'>
            {!token && (
              <ul className='menu menu-horizontal px-1 min-w-max'>
                <li>
                  <Link to='/login' className='hover:bg-transparent'>
                    {t('Login')}
                  </Link>
                </li>
                <li className='hidden md:block  '>
                  <Link to='/register' className='hover:bg-transparent'>
                    {t('Register')}
                  </Link>
                </li>
              </ul>
            )}

            <Link
              to='/book-appointment'
              className='hidden sm:flex btn bg-transparent border-black hover:bg-slate-800 hover:text-white rounded-full font-normal mr-3'
            >
              {t('GetStarted')}{' '}
              <span className='font-normal hidden md:block '></span>{' '}
            </Link>

            <LanguageSelector />

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
                      className='dropdown-content menu bg-base-100 rounded-box z-[10] min-w-max p-2 shadow mt-[134px] translate-x-[-50px] lg:translate-x-0'
                    >
                      <li>
                        <Link
                          to={`/profile/${user?._id}/${user?.firstName}/dashboard`}
                        >
                          {' '}
                          <CiUser />
                          {t('Profile')}
                        </Link>
                      </li>

                      <li>
                        <a onClick={handleLogout}>
                          <CiLogout />
                          {t('Logout')}
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
