
import firebase from 'firebase/app';
import 'firebase/auth' ;
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyArUrdTilHjLDMM3HVb67hH7JpAXisjMdg",
    authDomain: "typescript-auth-redux.firebaseapp.com",
    databaseURL: "https://typescript-auth-redux.firebaseio.com",
    projectId: "typescript-auth-redux",
    storageBucket: "typescript-auth-redux.appspot.com",
    messagingSenderId: "168404088720",
    appId: "1:168404088720:web:82763e8aa9a6868edce515"
})

export default  firebase;