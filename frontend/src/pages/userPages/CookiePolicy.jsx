import React, { useEffect } from 'react'
const CookiePolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy'
  }, [])
  return (
    <>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='font-semibold text-3xl tracking-normal mt-16 mb-10'>
          Cookie Policy
        </h1>

        <div className='intro space-y-4'>
          <h2 className='font-medium text-2xl'>Introduction</h2>
          <p className='text-sm leading-relaxed'>
            Welcome to Skill Bridge Marketing Agency!
          </p>
          <p className='text-sm leading-relaxed'>
            This policy describes how Skill Bridge uses cookies and other
            related technologies (collectively referred to as “cookies”) when
            you interact with us on https://skillbridgevirtualcareers.com (the
            “Site”) as set forth in the Skill Bridge Privacy Policy .
          </p>
          <p className='text-sm leading-relaxed'>
            By using our website, you agree to the use of cookies as described
            in our Cookie Policy. You can change your cookie preferences by
            adjusting your browser settings or by visiting the "Cookie Settings"
            section at the bottom of the homepage. We may update this agreement
            without notice, so please check back regularly for any changes.
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>WHAT ARE COOKIES?</h2>
          <p className='text-sm leading-relaxed'>
            Cookies are small text files that contain information and are
            downloaded to your device (like a computer or smartphone) when you
            visit a website. These cookies can be recognized by the website that
            downloaded them or by other websites that use the same cookies.
          </p>
        </div>

        <div className='types space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>WHAT ARE COOKIES USED FOR?</h2>
          <p className='text-sm leading-relaxed'>
            Cookies serve various functions, such as helping us understand how
            the website is used, enabling efficient navigation between pages,
            remembering your preferences, and enhancing your overall browsing
            experience. Additionally, cookies can help ensure that the marketing
            you encounter online is more relevant to your interests.
          </p>
        </div>

        <div className='purpose space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>
            WHAT TYPES OF COOKIES DOES Skill Bridge USE?
          </h2>

          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              STRICTLY NECESSARY COOKIES
            </span>
            <br />
            <span className='block mt-3'>
              These cookies are crucial as they allow you to navigate the
              website and utilize its features, including accessing secure
              areas. Without these cookies, certain services such as payment
              submissions cannot be provided. These cookies are integral to the
              functionality of the website and cannot be disabled in our
              systems. Although you can configure your browser to block or alert
              you about these cookies, doing so may result in some or all parts
              of the website not functioning properly.
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              PERFORMANCE COOKIES
            </span>
            <br />
            <span className='block mt-3'>
              These cookies gather information about your usage of the website,
              such as the pages you visit frequently and whether you encounter
              error messages on certain pages. The information collected by
              these cookies is aggregated or anonymous, meaning it does not
              personally identify you.
            </span>
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-semibold tracking-wide text-lg'>
              FUNCTIONALITY COOKIES
            </span>
            <br />
            <span className='block mt-3'>
              These cookies enable the website to remember your preferences,
              such as your username or preferred region. For example, functional
              cookies are used to remember your language preference.
              Additionally, these cookies can remember customizations you've
              made to text size, font, and other page elements. They may also
              facilitate services you've requested, such as watching a video or
              commenting on a blog. These cookies may be set by us or by
              third-party providers whose services we have incorporated into our
              website. Disabling these cookies may result in some or all of
              these services not functioning properly.
            </span>
          </p>
        </div>

        <div className='data_protection space-y-4 my-6'>
          <h2 className='font-medium text-2xl'>
            HOW LONG WILL COOKIES STAY ON MY BROWSING DEVICE?
          </h2>
          <p className='text-sm leading-relaxed'>
            The duration for which a cookie remains on your browsing device
            depends on whether it is a "persistent" or "session" cookie. Session
            cookies are temporary and will only remain on your device until you
            finish your browsing session. Persistent cookies, on the other hand,
            remain on your device until they expire or are manually deleted.
          </p>
          <p className='text-sm leading-relaxed'>
            Also, you may update your cookie preferences by clicking the “Cookie
            Settings” button at the bottom of the Site's homepage.
          </p>
        </div>

        <p className='text-sm leading-relaxed text-gray-400 font-light mb-3'>
          Latest update: 9th of February, 2024
        </p>
      </div>
    </>
  )
}

export default CookiePolicy
