import { useEffect, useState } from 'react';
import { useFirestoreContext } from '../contexts/firestoreContext'
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import styles from '../styles/Notes.module.scss'
import Note from './Note';
import RoundButton from './RoundButton';

const Notes = ({noteboardID}) => {

  const firestoreCtx = useFirestoreContext();
  const {userInfo} = useFirebaseAuth();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const {db} = firestoreCtx;
    let unsubscribe;
    if(db && userInfo && noteboardID){
      console.log("Setting up notes listener for noteboard ", noteboardID);
      unsubscribe = db.collection("noteboards").doc(noteboardID).collection("notes")
      .onSnapshot(querySnapshot => {
        let notesList = [];
        querySnapshot.forEach(doc => {
          notesList.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setNotes(notesList);
      })
    }
    return () => {
      if(unsubscribe){
        console.log("Removing notes listener for noteboard ", noteboardID);
        unsubscribe();
      }
    }
  }, [firestoreCtx.db, userInfo, noteboardID])

  const addHandler = () => {
    console.log("XD");
    firestoreCtx.addNote(noteboardID)
    .then(docRef => {
      console.log(`Success! Note added to noteboard: ${noteboardID}`);
      docRef.get()
      .then(doc => {
        console.log({id: doc.id, data: doc.data()});
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  const notesElements = notes.map(note => 
  <Note key={note.id} note={note} noteboardID={noteboardID}/>
  )
  
  return (
    <>
      <div className={styles.Notes}>
        {notesElements}
      </div>
      <div className={styles.NotesControls}>
        <RoundButton onClick={addHandler} iconName="majesticons:plus-line"/>
      </div>
    </>
  )
}

export default Notes
