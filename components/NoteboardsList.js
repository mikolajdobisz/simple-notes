import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFirestoreContext } from '../contexts/firestoreContext';
import styles from '../styles/NoteboardsList.module.scss';
import RoundButton from './RoundButton';
import IconButton from './IconButton';
import NoteboardLink from './NoteboardLink';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import NoteboardControls from './NoteboardControls';

const NoteboardsList = ({noteboards, noteboard}) => {
  const [newNoteboardName, setNewNoteboardName] = useState("");
  const firestoreCtx = useFirestoreContext();

  const [confirmModal, setConfirmModal] = useState(false);
  const [editedNoteboardName, setEditedNoteboardName] = useState("");
  const [editionModal, setEditionModal] = useState(false);

  const [currentNoteboard, setCurrentNoteboard] = useState("");
  
  useEffect(() => {
    setEditedNoteboardName(currentNoteboard);
  }, [currentNoteboard])

  const addHandler = e => {
    e.preventDefault();
    if(newNoteboardName == ""){
      console.error("Noteboard name is empty!");
      return;
    }
    firestoreCtx.addNoteboard(newNoteboardName)
    .then(docRef => {
      console.log("Success! New noteboard added in database!");
      setNewNoteboardName("");
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

  return (
    <div className={styles.NoteboardsListContainer}>
      <div className={styles.NoteboardsList}>
        <div className={"headline " + styles.noteboardsHeadline}>
          Noteboards
        </div>
        <form onSubmit={addHandler}>
          <div className={styles.addPanel}>
            <input 
              value={newNoteboardName} 
              type="text" 
              onInput={e => {setNewNoteboardName(e.target.value)}}
              placeholder="Noteboard Name"
            />
            <RoundButton title="Add new noteboard" iconName="majesticons:plus-line"/>
            {/* <RoundButton iconName="majesticons:trash-line"/> */}
          </div>
        </form>
        <div className={styles.noteboardsList}>
          <NoteboardControls noteboard={noteboard}/>
          {
            noteboards.map(el => {
              let isActive = noteboard && noteboard.id == el.id;
              return <NoteboardLink key={el.id} noteboard={el} isActive={isActive}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default NoteboardsList
