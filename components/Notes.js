import { useEffect, useState } from 'react';
import { useFirestoreContext } from '../contexts/firestoreContext'
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import styles from '../styles/Notes.module.scss'
import Note from './Note';
import RoundButton from './RoundButton';

const Notes = ({noteboardID}) => {

  const firestoreCtx = useFirestoreContext();
  const {userInfo} = useFirebaseAuth();
  const [updatesList, setUpdatesList] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if(updatesList.length > 0){
      notesUpdated(updatesList);
    }
  }, [updatesList]);

  useEffect(() => {
    const {db} = firestoreCtx;
    let unsubscribe;
    if(db && userInfo && noteboardID){
      console.log("Setting up notes listener for noteboard ", noteboardID);
      unsubscribe = db.collection("noteboards").doc(noteboardID).collection("notes")
      .onSnapshot(querySnapshot => {
        setUpdatesList(querySnapshot.docChanges());
      })
    }
    return () => {
      if(unsubscribe){
        console.log("Removing notes listener for noteboard ", noteboardID);
        setNotes([]);
        unsubscribe();
      }
    }
  }, [firestoreCtx.db, userInfo, noteboardID])

  //handle doc changes received from firestore 'onSnapshot' subscription
  const notesUpdated = (changes) => {
    let notesCopy = [...notes];
    changes.forEach(change => {
      switch(change.type) {
        case "added":
          const existingNote = notesCopy.find(oldNote => oldNote.id === change.doc.id);
          if(!existingNote){
            notesCopy.push({
              id: change.doc.id,
              data: change.doc.data()
            })
          }
          break;
        case "removed":
          notesCopy = notesCopy.filter(oldNote => oldNote.id !== change.doc.id)
          break;
        case "modified":
          const modifiedNote = notesCopy.find(oldNote => oldNote.id === change.doc.id);
          modifiedNote.id = change.doc.id;
          modifiedNote.data = change.doc.data();
          break;
      }
    })
    setNotes(notesCopy);
    setUpdatesList([]);
  }

  const addHandler = () => {
    firestoreCtx.addNote(noteboardID)
    .then(docRef => {
      //console.log(`Success! Note added to noteboard: ${noteboardID}`);
      docRef.get()
      .then(doc => {
        //console.log({id: doc.id, data: doc.data()});
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  return (
    <>
      <div className={styles.NotesContainer}>
        <div className={styles.Notes}>
          {
            notes.map(note => 
              <Note key={note.id} note={note} noteboardID={noteboardID}/>
            )
          }
        </div>
      </div>
      <div className={styles.NotesControls}>
        <RoundButton onClick={addHandler} iconName="majesticons:plus-line"/>
      </div>
    </>
  )
}

export default Notes
