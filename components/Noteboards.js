import NoteboardsList from "./NoteboardsList";
import styles from '../styles/Noteboards.module.scss';
import { useFirestoreContext } from "../contexts/firestoreContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authUserContext";
import Notes from "./Notes";
import { useRouter } from "next/dist/client/router";

const Noteboards = () => {

  const router = useRouter();
  const noteboardID = router.query.id;

  const firestoreCtx = useFirestoreContext();
  const {userInfo} = useAuthContext();

  const [noteboards, setNoteboards] = useState([]);
  const [noteboard, setNoteboard] = useState(null);

  const sortNoteboards = noteboardsList => {
    noteboardsList.sort((a, b) => {
      const aVal = a.data.creationTime.valueOf();
      const bVal = b.data.creationTime.valueOf();
      if(aVal > bVal) return 1;
      if(aVal < bVal) return -1;
      return 0;
    })
  }

  useEffect(() => {
    const {db} = firestoreCtx;
    let unsubscribe;
    if(db && userInfo){
      console.log(`Setting up noteboards listener for user: ${userInfo.displayName}`);
      unsubscribe = db.collection("noteboards").where("uid", "==", userInfo.uid)
      .onSnapshot(querySnapshot => {
        let noteboardsList = [];
        querySnapshot.forEach(doc => {
          noteboardsList.push({
            id: doc.id,
            data: doc.data()
          })
        })
        sortNoteboards(noteboardsList);
        setNoteboards(noteboardsList);
      })
    }

    return () => {
      if(unsubscribe){
        console.log(`Cancelling noteboards listener for user: ${userInfo.displayName}`);
        setNoteboards([]);
        unsubscribe();
      } 
    }
  }, [firestoreCtx.db, userInfo])

  useEffect(() => {
    if(noteboardID && noteboards && noteboards.length > 0){
      const current = noteboards.find(el => el.id === noteboardID);
      setNoteboard(current);
    }
    else{
      setNoteboard(null);
    }
  }, [noteboardID, noteboards])

  useEffect(() => {
    console.log("noteboard updated");
  }, [noteboard])

  return (
    <div className={styles.Noteboards}>
      <NoteboardsList noteboard={noteboard} noteboards={noteboards}/>
      <Notes noteboard={noteboard}/>
    </div>
  )
}

export default Noteboards