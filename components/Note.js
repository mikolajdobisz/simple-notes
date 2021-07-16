import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/modules/Note.module.scss'
import settings from '../scripts/settings.json'

const Note = ({title, text, color, customStyle, readonly}) => {

  const [unsaved, setUnsaved] = useState(false);
  //states connected with text values
  const [textVal, setTextVal] = useState();
  const [titleVal, setTitleVal] = useState();
  //states connected with color
  const [colorMenu, setColorMenu] = useState(false);

  useEffect(() => {
    if(textVal == text && titleVal == title){
      if(unsaved) setUnsaved(false)
    }
    else{
      if(!unsaved) setUnsaved(true)
    }
  }, [textVal, titleVal])

  useEffect(() => {
    setTextVal(text);
    setTitleVal(title);
  }, [title, text])

  const saveChangesButton = () => {
    // ### Make note save to storage or db
    setUnsaved(false);
  }

  const colorStyle = {backgroundColor: settings['notes-colors'][color]}

  return (
    <div style={customStyle}>
      {colorMenu &&
      <div 
        className={styles.colorsMenu}
        style={colorStyle}
      >
          halo
      </div>
      }
      <div style={colorStyle} className={styles.Note}>
        <div className={styles.nav}>
          <i 
            className={"material-icons-round icon " + styles.icon}
            onClick={() => {setColorMenu(!colorMenu)}}
          >
            palette
          </i>
          <span>
            {
              unsaved && 
              <i 
                className={"material-icons-round icon " + styles.icon}
                onClick={saveChangesButton}
              >
                done
              </i>
            }
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
          defaultValue={titleVal}
          readOnly={readonly}
          onInput={e => {setTitleVal(e.target.value)}}
          />
        </div>
        <div className={styles.text}>
          <TextareaAutosize 
          placeholder="Text" 
          spellCheck="false"
          defaultValue={textVal}
          readOnly={readonly}
          onInput={e => {setTextVal(e.target.value)}}
          />
        </div>
      </div>
    </div>
  )
}

export default Note
