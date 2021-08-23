import Link from 'next/link';
import { useAuthContext } from '../contexts/authUserContext'
import styles from '../styles/Nav.module.scss'
import NavLink from './NavLink';

const Nav = () => {

  const authCtx = useAuthContext();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink link="/" text="Home" regex={/^\/$/}/>
        </li>
        <li>
          <NavLink link="/noteboards" text="Noteboards" regex={/^\/noteboards(\/.*)?$/}/>
        </li>
      </ul>
      {
        !authCtx.userInfo ? (
          <div className={styles.signedOutPanel}>
            <Link href="/register">
              <button className="primary">Register</button>
            </Link>
            <Link href="/signin">
              <button className="alternate">Sign In</button>
            </Link>
          </div>
        ) : (
          <div className={styles.userPanel}>
            <span>
              Hello there, <b>{authCtx.userInfo.displayName}</b>
            </span>
            <button className="alternate" onClick={authCtx.signOut}>Sign Out</button>
          </div>
        )
      }
    </nav>
  )
}

export default Nav
