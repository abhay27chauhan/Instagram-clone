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
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export default firebase;