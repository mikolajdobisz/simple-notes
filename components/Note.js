import { useEffect, useState } from 'react';
import { useFirestoreContext } from '../contexts/firestoreContext';
import styles from '../styles/Note.module.scss';

const Note = ({note, noteboardID}) => {

  const firestoreCtx = useFirestoreContext();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(note);
    setTitle(note.data.title);
    setText(note.data.text);
  }, [note])

  const saveHandle = () => {
    console.log(note);
    firestoreCtx.updateNote(noteboardID, note.id, {
      title: title,
      text: text
    });
  }

  return (
    <div className={styles.Note}>
      <textarea value={title} onInput={e => {setTitle(e.target.value)}}></textarea>
      <textarea value={text} onInput={e => {setText(e.target.value)}}></textarea>
      <button onClick={saveHandle}>Save</button>
    </div>
  )
}

export default Note
