import { useEffect, useState } from 'react';
import firebase from './firebase';

const useFirestore = (userInfo) => {
  const [db, setDb] = useState(null);
  
  useEffect(() => {
    setDb(firebase.firestore());
  }, [])

  //user's noteboards listener
  // const [noteboardsListnerIsActive, setNoteboardsListenerIsActive] = useState(false);

  const addNoteboard = name => new Promise((resolve, reject) => {
    if(!userInfo) reject("No user signed in!");
    const noteboardsRef = db.collection("noteboards");
    noteboardsRef.add({
      uid: userInfo.uid,
      name: name,
    }).then(docRef => {
      resolve(docRef);
    })
    .catch(err => {
      reject(err);
    })
  })

  const deleteNoteboard = id => {
    console.log("Noteboard deletion function: " + id)
  }

  const addNote = (noteboardID) => new Promise((resolve, reject) => {
    if(!userInfo) reject("No user signed in!");
    if(!noteboardID) reject("No noteboardID given!");
    const noteboardRef = db.collection("noteboards")
    .doc(noteboardID).collection("notes").add({
      title: "",
      text: ""
    })
    .then(docRef => {
      resolve(docRef);
    })
    .catch(err => {
      reject(err);
    })
  })

  const updateNote = (noteboardID, noteID, data) => {
    if(!userInfo) reject("No user signed in!");
    // console.log({
    //   noteboardID,
    //   noteID,
    //   data
    // });
    if(noteboardID && noteID && data){
      const noteRef = db.collection("noteboards")
      .doc(noteboardID).collection("notes")
      .doc(noteID).update({
        title: data.title,
        text: data.text
      })
      .then(() => {
        console.log(`Success! Note ${noteID} updated.`);
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  const deleteNote = (noteboardID, noteID) => {
    console.log("Attempting to delete note: " + noteID);
    const noteRef = db.collection("noteboards")
    .doc(noteboardID).collection("notes").doc(noteID);
    noteRef.delete()
    .then(() => {
      console.log(`Success! Note ${noteID} deleted.`);
    })
    .catch(err => {
      console.error(err);
    })
  }

  return ({
    db,
    addNoteboard,
    deleteNoteboard,
    addNote,
    updateNote,
    deleteNote
  })
}

export default useFirestore