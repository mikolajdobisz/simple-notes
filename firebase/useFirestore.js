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
      creationTime: firebase.firestore.Timestamp.now()
    }).then(docRef => {
      resolve(docRef);
    })
    .catch(err => {
      reject(err);
    })
  })

  const deleteNoteboard = noteboardID => {
    const batch = db.batch();
    const notesRef = db.collection('noteboards').doc(noteboardID).collection('notes');
    notesRef.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(doc.ref);
        batch.delete(doc.ref);
      })
      batch.commit()
      .then(() => {
        const noteboardRef = db.collection('noteboards').doc(noteboardID);
        noteboardRef.delete()
        .then(() => {
          console.log(`Success! Noteboard ${noteboardID} deleted.`);
        })
        .catch(err => {
          console.error(err);
        })
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  const updateNoteboard = (noteboardID, name) => {
    if(!userInfo){ 
      console.error("No user signed in!");
      return;
    }
    if(noteboardID && name){
      db.collection("noteboards")
      .doc(noteboardID)
      .update({
        name: name
      })
      .then(() => {
        console.log(`Success! Noteboard ${noteboardID} updated.`);
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  const addNote = (noteboardID) => new Promise((resolve, reject) => {
    if(!userInfo) reject("No user signed in!");
    if(!noteboardID) reject("No noteboardID given!");
    const noteboardRef = db.collection("noteboards")
    .doc(noteboardID).collection("notes").add({
      title: "",
      text: "",
      color: "#ad422d",
      creationTime: firebase.firestore.Timestamp.now()
    })
    .then(docRef => {
      resolve(docRef);
    })
    .catch(err => {
      reject(err);
    })
  })

  const updateNote = (noteboardID, noteID, data) => {
    if(!userInfo){ 
      console.error("No user signed in!");
      return;
    }
    if(noteboardID && noteID && data){
      db.collection("noteboards")
      .doc(noteboardID).collection("notes")
      .doc(noteID).update({
        title: data.title,
        text: data.text,
        color: data.color
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
    updateNoteboard,
    addNote,
    updateNote,
    deleteNote
  })
}

export default useFirestore
