import { createContext, useContext } from "react";
import useFirestore from "../firebase/useFirestore";
import { useAuthContext } from "./authUserContext";

const firestoreContext = createContext({
  db: null,
  addNoteboard: null,
  deleteNoteboard: null,
  addNote: null,
  updateNote: null,
  deleteNote: null,
})

export function FirestoreProvider({children}){
  const {userInfo} = useAuthContext();
  const firestore = useFirestore(userInfo);
  return (<firestoreContext.Provider value={firestore}>
    {children}
  </firestoreContext.Provider>);
}

export const useFirestoreContext = () => useContext(firestoreContext);