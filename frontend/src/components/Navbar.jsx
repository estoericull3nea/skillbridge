import React from 'react'

import { IoIosArrowDown } from 'react-icons/io'

const Navbar = () => {
  return (
    <>
      <div>
        <div className='navbar bg-base-100'>
          <div className='navbar-start'>
            <div className='flex items-center gap-x-3'>
              <div className='drawer z-10 md:hidden'>
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
                  <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
                    {/* Sidebar content here */}

                    <h1 className='text-3xl font-bold my-3'>Skill Bridge</h1>

                    <li>
                      <a>Home</a>
                    </li>
                    <li>
                      <details>
                        <summary>Services</summary>
                        <ul>
                          <li>
                            <details>
                              <summary>Virtual Assistance</summary>
                              <ul>
                                <li>
                                  <a>Administrative Support</a>
                                </li>
                                <li>
                                  <a>Customer Service</a>
                                </li>
                                <li>
                                  <a>Writing and Editing</a>
                                </li>
                                <li>
                                  <a>Social Media Management</a>
                                </li>
                                <li>
                                  <a>Technical Skills</a>
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary>Recruitment Services</summary>
                              <ul>
                                <li>
                                  <a>Talent Sourcing</a>
                                </li>
                                <li>
                                  <a>Talent Screening</a>
                                </li>
                                <li>
                                  <a>Interviewing and Assessment</a>
                                </li>
                                <li>
                                  <a>Endorsement</a>
                                </li>
                                <li>
                                  <a>Onboarding (optional)</a>
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary>Web Development Services</summary>
                              <ul>
                                <li>
                                  <details>
                                    <summary>Website Design</summary>
                                    <ul>
                                      <li>
                                        <a>Landing Page Design</a>
                                      </li>
                                      <li>
                                        <a>Responsive Web Design</a>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                                <li>
                                  <details>
                                    <summary>Custom Development</summary>
                                    <ul>
                                      <li>
                                        <a>Full-Stack Development</a>
                                      </li>
                                      <li>
                                        <a>Back-End Development</a>
                                      </li>
                                      <li>
                                        <a>Front-End Development</a>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                                <li>
                                  <details>
                                    <summary>CMS</summary>
                                    <ul>
                                      <li>
                                        <a>WordPress Development</a>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                                <li>
                                  <details>
                                    <summary>SEO Optimization</summary>
                                    <ul>
                                      <li>
                                        <a>Keyword Research</a>
                                      </li>
                                      <li>
                                        <a>On-Page SEO</a>
                                      </li>
                                      <li>
                                        <a>Off-Page SEO</a>
                                      </li>
                                      <li>
                                        <a>WordPress SEO Optimization</a>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                                <li>
                                  <details>
                                    <summary>API Integration</summary>
                                    <ul>
                                      <li>
                                        <a>Third-Party API Integration</a>
                                      </li>
                                      <li>
                                        <a>Custom API Development</a>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                              </ul>
                            </details>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <a>Careers</a>
                    </li>

                    <ul>
                      <li>
                        <a>About</a>
                      </li>
                      <li>
                        <a>Contact</a>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>

              <a className='btn btn-ghost text-xl'>SkillBridge</a>
            </div>
          </div>

          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <a>Home</a>
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
                    className='dropdown-content menu rounded-box z-[1] mt-[43.9rem] shadow-xl translate-x-[-26rem]'
                  >
                    <ul className='menu menu-horizontal rounded-box lg:min-w-max w-full'>
                      <li>
                        <a>Virtual Assistance</a>
                        <ul>
                          <li>
                            <a>Administrative Support</a>
                          </li>
                          <li>
                            <a>Customer Service</a>
                          </li>
                          <li>
                            <a>Writing and Editing</a>
                          </li>
                          <li>
                            <a>Social Media Management</a>
                          </li>
                          <li>
                            <a>Technical Skills</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>Recruitment Services</a>
                        <ul>
                          <li>
                            <a>Talent Sourcing </a>
                          </li>
                          <li>
                            <a>Talent Screening </a>
                          </li>
                          <li>
                            <a>Interviewing and Assessment </a>
                          </li>
                          <li>
                            <a>Endorsement</a>
                          </li>
                          <li>
                            <a>Onboarding (optional) </a>
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
                                <a>Custom Layout Design</a>
                              </li>
                              <li>
                                <a>Landing Page Design</a>
                              </li>
                              <li>
                                <a>Responsive Web Design</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>Custom Development</a>
                            <ul className='text-xs'>
                              <li>
                                <a>Full-Stack Development</a>
                              </li>
                              <li>
                                <a>Back-End Development</a>
                              </li>
                              <li>
                                <a>Front-End Development</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>CMS</a>
                            <ul className='text-xs'>
                              <li>
                                <a>WordPress Development</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>SEO Optimization</a>
                            <ul className='text-xs'>
                              <li>
                                <a>Keyword Research</a>
                              </li>
                              <li>
                                <a>On-Page SEO</a>
                              </li>
                              <li>
                                <a>Off-Page SEO</a>
                              </li>
                              <li>
                                <a>WordPress SEO Optimization</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>API Integration</a>
                            <ul className='text-xs'>
                              <li>
                                <a>Third-Party API Integration</a>
                              </li>
                              <li>
                                <a>Custom API Development</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <ul>
                          <li>
                            <a>About</a>
                          </li>
                          <li>
                            <a>Contact</a>
                          </li>
                          <li>
                            <a>Privacy policy</a>
                          </li>
                          <li>
                            <a>Cookie policy</a>
                          </li>
                          <li>
                            <a>Terms</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </ul>
                </div>
              </li>
              <li>
                <a>Careers</a>
              </li>
            </ul>
          </div>

          <div className='navbar-end'>
            <ul className='menu menu-horizontal px-1 min-w-max'>
              <li>
                <a>Login</a>
              </li>
              <li className='hidden md:block  '>
                <a>Register</a>
              </li>
            </ul>
            <a className='btn hidden sm:flex'>
              Get Started{' '}
              <span className='font-normal hidden md:block '>-- it's free</span>{' '}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
