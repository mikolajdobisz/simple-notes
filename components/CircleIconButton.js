import React from 'react'
import styles from '../styles/modules/CircleIconButton.module.scss'

const CircleIconButton = ({icon, onClick}) => {
  return (
    <div onClick={onClick} className={styles.CircleIconButton}>
      <i className={styles.icon + " icon material-icons-round"}>
        {icon}
      </i>
    </div>
  )
}

export default CircleIconButton
