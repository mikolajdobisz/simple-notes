import { useEffect, useState } from 'react';
import { useFirestoreContext } from '../contexts/firestoreContext';
import styles from '../styles/Note.module.scss';
import IconButton from './IconButton';
import TextareaAutosize from 'react-textarea-autosize';

const Note = ({note, noteboardID}) => {

  const firestoreCtx = useFirestoreContext();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("'note' update useEffect");
    setTitle(note.data.title);
    setText(note.data.text);
  }, [note])

  const saveHandle = () => {
    firestoreCtx.updateNote(noteboardID, note.id, {
      title: title,
      text: text
    });
  }

  const deleteHandler = () => {
    firestoreCtx.deleteNote(noteboardID, note.id);
  }

  const checkIfUnsaved = () => {
    return note.data.title !== title || note.data.text !== text;
  }

  return (
    <div className={styles.NoteContent}>
      <div className={styles.nav}>
        <span className={styles.left}>
          <IconButton iconName="bx:bxs-palette"/>
        </span>
        <span className={styles.center}></span>
        <span className={styles.right}>
          {
            checkIfUnsaved() && <IconButton onClick={saveHandle} iconName="majesticons:check-line"/>
          }
          <IconButton onClick={deleteHandler} iconName="majesticons:close-line"/>
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
  )
}

export default Note