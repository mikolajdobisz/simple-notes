import React, { useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/modules/Note.module.scss'

const Note = ({title, text, color, customStyle, readonly}) => {

  return (
    <div style={customStyle} className={styles.Note + " " + color}>
      <div className={styles.nav}>
        <i className="material-icons-round icon">
          palette
        </i>
        <i className="material-icons-round icon">
          close
        </i>
      </div>
      <div className={styles.title}>
        <TextareaAutosize
        maxLength="64"
        placeholder="Title" 
        spellCheck="false"
        defaultValue={title}
        readOnly={readonly}
        />
      </div>
      <div className={styles.text}>
        <TextareaAutosize 
        placeholder="Text" 
        spellCheck="false"
        defaultValue={text}
        readOnly={readonly}
        />
      </div>
    </div>
  )
}

export default Note
