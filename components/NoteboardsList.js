import React from 'react'
import Link from 'next/link'
import CircleIconButton from './CircleIconButton'
import styles from '../styles/modules/NoteboardsList.module.scss'

const NoteboardsList = ({noteboards, add}) => {
  return (
    <div className={styles.NoteboardsList}>
      <div className={styles.buttons}>
        <CircleIconButton 
          icon="add"
          onClick={() => {add("New Noteboard")}}
        />
        <CircleIconButton icon="delete"/>
      </div>
      <div className={styles.list}>
        {
          noteboards.map(el => 
            <Link key={el.id} href={"/noteboards/" + el.id}>
              <div className={styles.el}>
                {el.title}
              </div>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default NoteboardsList
