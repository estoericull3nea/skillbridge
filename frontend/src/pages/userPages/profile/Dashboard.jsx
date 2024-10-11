import React from 'react'

const Dashboard = () => {
  return (
    <div className='bg-white shadow-xl rounded-xl p-6 flex-1'>
      <div>Welcome Back, {localStorage.getItem('firstName')}</div>
    </div>
  )
}

export default Dashboard
