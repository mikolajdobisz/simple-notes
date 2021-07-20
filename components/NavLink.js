import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

const NavLink = ({href, children}) => {

  const router = useRouter()

  return (
    <Link href={href}>
      <a className={router.pathname == href ? "active" : ""}>{children}</a>
    </Link>
  )
}

export default NavLink
