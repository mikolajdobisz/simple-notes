import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

const Layout = ({children}) => {
  return (
    <>
      <Nav/>
      <div className="content">
        {children}
        <Footer/>
      </div>
    </>
  )
}

export default Layout
