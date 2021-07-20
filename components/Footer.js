import React from 'react'

const Footer = () => {
  const getDate = () => {
    const d = new Date()
    return d.getFullYear()
  }

  return (
    <footer className="text-center">
        <small>&copy; Copyright {getDate()}, Mikołaj Dobisz</small>
    </footer>
  )
}

export default Footer
