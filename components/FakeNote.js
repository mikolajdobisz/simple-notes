import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/modules/Note.module.scss'
import settings from '../scripts/settings.json'

const FakeNote = ({title, text, color, customStyle}) => {
  const colorStyle = {backgroundColor: settings['notes-colors'][color]}

  return (
    <div style={customStyle}>
      <div style={colorStyle} className={styles.Note}>
        <div className={styles.nav}>
          <i 
            className={"material-icons-round icon " + styles.icon}
            onClick={() => {setColorMenu(!colorMenu)}}
          >
            palette
          </i>
          <span>
            <i className={"material-icons-round icon " + styles.icon}>
              close
            </i>
          </span>
        </div>
        <div className={styles.title}>
          <TextareaAutosize
          maxLength="64"
          placeholder="Title" 
          spellCheck="false"
          defaultValue={title}
          disabled={true}
          />
        </div>
        <div className={styles.text}>
          <TextareaAutosize 
          placeholder="Text" 
          spellCheck="false"
          defaultValue={text}
          disabled={true}
          />
        </div>
      </div>
    </div>
  )
}

export default FakeNote
