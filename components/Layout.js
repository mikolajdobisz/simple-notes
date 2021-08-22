import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

const Layout = ({children}) => {
  return (
    <div className="app">
      <Nav/>
      <div className="content">
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
