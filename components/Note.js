import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from '../styles/modules/Note.module.scss'
import settings from '../scripts/settings.json'
import Draggable from 'react-draggable'
import Icon from './Icon'


const Note = ({title, text, color, readonly}) => {

  //state - is note saved or not
  const [unsaved, setUnsaved] = useState(false);
  

  //states connected with text values
  const [textVal, setTextVal] = useState();
  const [titleVal, setTitleVal] = useState();
  
  //states connected with color
  const [colorMenu, setColorMenu] = useState(false);
  const [colors, setColors] = useState(settings['notes-colors']);
  const [colorIndex, setColorIndex] = useState(color);

  //useEffect - is note saved or not
  useEffect(() => {
    if(textVal == text && titleVal == title){
      if(unsaved) setUnsaved(false)
    }
    else{
      if(!unsaved) setUnsaved(true)
    }
  }, [textVal, titleVal])

  //useEffect - save title and text values from parent component to local states
  useEffect(() => {
    setTextVal(text);
    setTitleVal(title);
  }, [title, text])


  //return style with color
  const getColorStyle = () => {
    return {
      backgroundColor: colors[colorIndex]
    }
  }

  const changeColor = (index) => {
    if(index != colorIndex) setColorIndex(index)
  }

  const saveChangesHandler = () => {
    // ### Make note save to storage or db
    setUnsaved(false);
  }

  return (
    <div className={styles.Note}>
      {colorMenu &&
      <div 
        className={styles.colorMenu}
        //style={getColorStyle()}
      >
          {
            colors.map((el, i) => {
              return <div 
              className={styles.color} 
                style={{background: colors[i]}} 
                key={i}
                onClick={() => {changeColor(i)}}
                >
              </div>
            })
          }
      </div>
      }
      <div style={getColorStyle()} className={styles.NoteContent}>
        <div className={styles.nav}>
          <span className={styles.left}>
            <Icon onClick={() => {setColorMenu(!colorMenu)}} name="palette" isBtn={true}/>
          </span>
          <span className={styles.center}>
          </span>
          <span className={styles.right}>
            {
              unsaved && <Icon onClick={saveChangesHandler} isBtn={true} name="done"/>
            }
            <Icon isBtn={true} name="close"/>
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
