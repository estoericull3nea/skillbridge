import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

const Breadcrumbs = () => {
  const { userId, firstName } = useParams()
  const location = useLocation()

  const firstWordOfFirstName = firstName ? firstName.split(' ')[0] : ''

  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <div className='breadcrumbs text-sm mb-3'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {pathnames.map((value, index) => {
          if (value === userId && pathnames[index + 1] === firstName) {
            return null
          }

          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          const label =
            value === firstName || value === firstWordOfFirstName
              ? firstWordOfFirstName
              : value.charAt(0).toUpperCase() + value.slice(1)

          return (
            <li key={to}>
              {index + 1 === pathnames.length ? (
                <span>{label}</span> // Last item is not clickable
              ) : (
                <Link to={to}>{label}</Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
