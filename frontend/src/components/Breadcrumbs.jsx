import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

const Breadcrumbs = () => {
  const { userId, firstName } = useParams()
  const location = useLocation()

  // Split the location pathname to get the individual path segments
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <div className='breadcrumbs text-sm mb-3'>
      <ul>
        {/* Home breadcrumb */}
        <li>
          <Link to='/'>Home</Link>
        </li>
        {/* Map over path segments to create breadcrumb items */}
        {pathnames.map((value, index) => {
          // Skip the userId if the next segment is the user's first name
          if (value === userId && pathnames[index + 1] === firstName) {
            return null
          }

          // Build the URL to this point for each breadcrumb item
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          // Use the first name directly if the current segment matches the firstName
          const label =
            value === firstName
              ? firstName
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
