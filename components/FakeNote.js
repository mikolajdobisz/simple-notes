import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/modules/Note.module.scss'
import settings from '../scripts/settings.json'
import Icon from './Icon'

const FakeNote = ({title, text, colorIndex, customStyle}) => {

  const getColorStyle = () => {
    const colors = settings['notes-colors'];
    return {
      backgroundColor: colors[colorIndex]
    }
  }

  return (
    <div style={customStyle} className={styles.Note}>
      <div style={getColorStyle()} className={styles.NoteContent}>
        <div className={styles.nav}>
          <span className={styles.left}>
            <Icon name="palette"/>
          </span>
          <span className={styles.center}>
          </span>
          <span className={styles.right}>
            <Icon name="close"/>
          </span>
        </div>
        <div className={styles.title}>
          <TextareaAutosize
          maxLength="64"
          placeholder="Title" 
          spellCheck="false"
          defaultValue={title}
          readOnly={true}
          />
        </div>
        <div className={styles.text}>
          <TextareaAutosize 
          placeholder="Text" 
          spellCheck="false"
          defaultValue={text}
          readOnly={true}
          />
        </div>
      </div>
    </div>
  )
}

export default FakeNote
