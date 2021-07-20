import React from 'react'
import styles from '../styles/modules/CircleIconButton.module.scss'
import Icon from './Icon'

const CircleIconButton = ({icon, onClick}) => {
  return (
    <div onClick={onClick} className={styles.CircleIconButton}>
      <Icon name={icon}/>
    </div>
  )
}

export default CircleIconButton
