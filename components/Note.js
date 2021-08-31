import { useEffect, useState } from 'react';
import { useFirestoreContext } from '../contexts/firestoreContext';
import styles from '../styles/Note.module.scss';
import IconButton from './IconButton';
import TextareaAutosize from 'react-textarea-autosize';
import { ColorPicker, toColor, useColor } from 'react-color-palette';
import "react-color-palette/lib/css/styles.css";

const Note = ({note, noteboard}) => {

  const firestoreCtx = useFirestoreContext();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useColor("hex","");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    console.log(note.data);
    setTitle(note.data.title);
    setText(note.data.text);
    setColor(toColor("hex", note.data.color));
  }, [note])

  const saveHandle = () => {
    firestoreCtx.updateNote(noteboard.id, note.id, {
      title: title,
      text: text,
      color: color.hex
    });
    setIsPickerOpen(false);
  }

  const deleteHandler = () => {
    firestoreCtx.deleteNote(noteboard.id, note.id);
  }

  const checkIfUnsaved = () => {
    return note.data.title !== title || note.data.text !== text || note.data.color !== color.hex;
  }

  return (
    <div className={styles.NoteContainer}>
      {
        isPickerOpen &&
        <ColorPicker 
          color={color}
          onChange={setColor}
          height={160}
          width={260}
          dark
          hideHSV
          hideRGB
        />
      }
      <div style={{background: color.hex}} className={styles.NoteContent}>
        <div className={styles.nav}>
          <span className={styles.left}>
            <IconButton onClick={() => {setIsPickerOpen(!isPickerOpen)}} title="Change color" iconName="bx:bxs-palette"/>
          </span>
          <span className={styles.center}></span>
          <span className={styles.right}>
            {
              checkIfUnsaved() && <IconButton title="Save" onClick={saveHandle} iconName="majesticons:check-line"/>
            }
            <IconButton title="Delete" onClick={deleteHandler} iconName="majesticons:close-line"/>
          </span>
        </div>
        <div className={styles.title}>
          <TextareaAutosize
            value={title}
            maxLength="64"
            spellCheck="false"
            placeholder="Title"
            onInput={e => {setTitle(e.target.value)}}
          />
        </div>
        <div className={styles.text}>
          <TextareaAutosize
            value={text}
            spellCheck="false"
            placeholder="Write something here..."
            onInput={e => {setText(e.target.value)}}
          />
        </div>
        {/* <button onClick={saveHandle}>Save</button> */}
      </div>
    </div>
  )
}

export default Note