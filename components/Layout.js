import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import BackgroundCanvas from './BackgroundCanvas'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div id="root" className="theme-light">
      <BackgroundCanvas/>
      <Navbar/>
      <div id="page">
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
