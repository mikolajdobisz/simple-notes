import React from 'react'
import BackgroundCanvas from './BackgroundCanvas'
import Footer from './Footer'
import Nav from './Nav'

const Layout = ({children}) => {
  return (
    <div className="app">
      <BackgroundCanvas/>
      <Nav/>
      <div className="content">
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
