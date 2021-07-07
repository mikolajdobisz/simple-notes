import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import Noteboards from '../../components/Noteboards'

const Noteboard = () => {

  const router = useRouter()
  const {id} = router.query

  return (
    <Noteboards noteboard_id={id}/>
  )
}

export default Noteboard
