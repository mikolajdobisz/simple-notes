import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import BackgroundCanvas from './BackgroundCanvas'

const Layout = ({children}) => {
  const getDate = () => {
    const d = new Date()
    return d.getFullYear()
  }

  return (
    <div id="root" className="theme-light">
      <BackgroundCanvas/>
      <Navbar/>
      <main>
        {children}
      </main>
      <footer className="text-center">
        <small>&copy; Copyright {getDate()}, Mikołaj Dobisz</small>
      </footer>
    </div>
  )
}

export default Layout
