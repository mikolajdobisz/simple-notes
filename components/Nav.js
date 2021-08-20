import Link from 'next/link';
import { useEffect } from 'react';
import { useAuthContext } from '../contexts/authUserContext'
import styles from '../styles/Nav.module.scss'

const Nav = () => {

  const authCtx = useAuthContext();

  useEffect(() => {
    // console.log("User auth status changed:");
    // console.log(authCtx.userInfo)
  }, [authCtx.userInfo])

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/noteboards">
            <a>Noteboards</a>
          </Link>
        </li>
      </ul>
      {
        !authCtx.userInfo ? (
          <ul>
            <li>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </li>
          </ul>
        ) : (
          <div className={styles.userPanel}>
            <span>
              Hello there, <b>{authCtx.userInfo.displayName}</b>
            </span>
            <button onClick={authCtx.signOut}>Sign Out</button>
          </div>
        )
      }
    </nav>
  )
}

export default Nav
