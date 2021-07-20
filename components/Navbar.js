import React from 'react'
import Link from 'next/link'
import styles from '../styles/modules/Navbar.module.scss'
import NavLink from './NavLink'


const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/noteboards">Noteboards</NavLink>
        </li>
        <li>
          <NavLink href="/bg">Background</NavLink>
        </li>
      </ul>
      <Link href="/signin">
        <button className="std">Sign In</button>
      </Link>
    </nav>
  )
}

export default Navbar
