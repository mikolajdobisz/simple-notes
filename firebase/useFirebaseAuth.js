import { useState, useEffect } from 'react'
import firebase from './firebase';

const formatUserInfo = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName
});

export default function useFirebaseAuth() {
  const [fullUser, setFullUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // handling signing in and out
  const clear = () => {
    setUserInfo(null);
    setLoading(true);
  }

  const signInWithEmailAndPassword = (email, password) => 
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password, displayName) => new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
      const {user} = result;
      user.updateProfile({
        displayName: displayName
      })
      .then(() => {
        setUserInfo(user);
        resolve(user);
      })
      .catch(err => {
        reject(err);
      })
    })
    .catch(err => {
      reject(err);
    })
  })
    

  const signOut = () => {
    firebase.auth().signOut().then(clear);
  }

  // listen for Firebase state change
  const authStateChanged = async (authState) => {
    setFullUser(authState);
    if (!authState) {
      setUserInfo(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatUserInfo(authState);
    setUserInfo(formattedUser);    
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    userInfo,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}