import React, { useEffect } from 'react'
import Note from './Note'
import styles from '../styles/modules/NotesContainer.module.scss'

const NotesContainer = ({noteboard}) => {

  useEffect(() => {
    
  }, [noteboard])

  return (
    <div>
      <div className={styles.NotesContainer}>
        <Note 
          title="English" 
          text="Essay due friday"
          color="blue"
        />
        <Note 
          title="Maths" 
          text="Learn polynomial equations for friday's exam"
          color="orange"
        />
        <Note 
          title="Social studies" 
          text="Prepare a presentation for monday"
          color="pink"
        />
        <Note 
          title="Maths" 
          text="Homework p.74 ex.1-7"
          color="green"
        />
      </div>
    </div>
  )
}

export default NotesContainer
