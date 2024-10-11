// src/pages/userPages/profile/Content.jsx
import React from 'react'

const Content = ({ section }) => {
  switch (section) {
    case 'dashboard':
      return <div>Welcome to your Dashboard! Here is a quick overview...</div>
    case 'user-info':
      return <div>Your user information will appear here.</div>
    default:
      return <div>Select a section from the menu.</div>
  }
}

export default Content
