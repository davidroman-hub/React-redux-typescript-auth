
import firebase from 'firebase/app';
import 'firebase/auth' ;
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: process.env.REACT_APP__FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP__FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP__FIREBASE_DB_URL ,
    projectId: process.env.REACT_APP__FIREBASE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP__FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP__FIREBASE_MESSAGING_SEND,
    appId:process.env.REACT_APP__FIREBASE_APP_ID
})