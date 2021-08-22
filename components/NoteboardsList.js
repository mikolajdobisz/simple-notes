import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFirestoreContext } from '../contexts/firestoreContext';
import styles from '../styles/NoteboardsList.module.scss';
import RoundButton from './RoundButton';

const NoteboardsList = ({noteboards, noteboardID}) => {
  const [newNoteboardName, setNewNoteboardName] = useState("");
  const firestoreCtx = useFirestoreContext();

  const addHandler = () => {
    if(newNoteboardName == ""){
      console.error("Noteboard name is empty!");
      return;
    }
    firestoreCtx.addNoteboard(newNoteboardName)
    .then(docRef => {
      console.log("Success! New noteboard added in database!");
      docRef.get().then(doc => {
        console.log({id: doc.id, data: doc.data()});
      }).catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  const noteboardsElements = noteboards.map(el => {
    const classList = [styles.noteboard];
    if(noteboardID && noteboardID == el.id){
      classList.push(styles.active);
    }
    return (
      <Link 
      key={el.id} 
      href={`/noteboards/${encodeURIComponent(el.id)}`}
      >
        <div 
        className={classList.join(' ')}
        >
          {el.data.name}
        </div>
      </Link>
    )
  })

  return (
    <div className={styles.NoteboardsList}>
      <div className={"headline " + styles.noteboardsHeadline}>
        Noteboards
      </div>
      <div className={styles.controlPanel}>
        <input 
          value={newNoteboardName} 
          type="text" 
          onInput={e => {setNewNoteboardName(e.target.value)}}
          placeholder="Noteboard Name"
        />
        <RoundButton onClick={addHandler} iconName="majesticons:plus-line"/>
        {/* <RoundButton iconName="majesticons:trash-line"/> */}
      </div>
      <div className={styles.noteboardsList}>
        {noteboardsElements}
      </div>
    </div>
  )
}

export default NoteboardsList
