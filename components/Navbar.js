import React from 'react'
import Link from 'next/link'
import styles from '../styles/modules/Navbar.module.scss'


const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <Link href="/"><a>Home</a></Link>
        </li>
        <li>
          <Link href="/noteboards"><a>Noteboards</a></Link>
        </li>
        <li>
          <Link href="/bg"><a>Background</a></Link>
        </li>
      </ul>
      <Link href="/signin">
        <button className="std">Sign In</button>
      </Link>
    </nav>
  )
}

export default Navbar
