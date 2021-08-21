import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

import firebaseConfig from './secrets'

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    notifications: firestore.collection("notifications"),
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const createUserProfileDocument = async (userAuth) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
    
  return {userRef, snapShot};
};

export default firebase;