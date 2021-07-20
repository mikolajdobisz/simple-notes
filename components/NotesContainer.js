import React, { useEffect } from 'react'
import Note from './Note'
import styles from '../styles/modules/NotesContainer.module.scss'

const NotesContainer = ({noteboard}) => {

  useEffect(() => {
    
  }, [noteboard])

  return (
    <div className={styles.NotesWrapper}>
      <div className={styles.NotesContainer}>
        <Note 
          title="English" 
          text="Essay due friday"
          color={0}
        />
        <Note 
          title="Maths" 
          text="Learn polynomial equations for friday's exam"
          color={1}
        />
        <Note 
          title="Social studies" 
          text="Prepare a presentation for monday"
          color={2}
        />
        <Note 
          title="Maths" 
          text="Homework p.74 ex.1-7"
          color={3}
        />
        <Note 
          title="English" 
          text="Essay due friday"
          color={0}
        />
        <Note 
          title="Maths" 
          text="Learn polynomial equations for friday's exam"
          color={1}
        />
      </div>
    </div>
  )
}

export default NotesContainer
