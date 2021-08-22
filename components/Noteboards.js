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

  return (
    <div className={styles.Noteboards}>
      <NoteboardsList noteboardID={noteboardID} noteboards={noteboards}/>
      <Notes noteboardID={noteboardID}/>
    </div>
  )
}

export default Noteboards