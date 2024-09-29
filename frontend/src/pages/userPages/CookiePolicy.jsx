import React, { useEffect } from 'react'

const CookiePolicy = () => {
  useEffect(() => {
    document.title = 'Cookie Policy'
  }, [])
  return <div>CookiePolicy</div>
}

export default CookiePolicy
