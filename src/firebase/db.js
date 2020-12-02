import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD34d0UOqToC2Grxeac_0DGvPlieAg402s",
    authDomain: "todo-19a7f.firebaseapp.com",
    databaseURL: "https://todo-19a7f.firebaseio.com",
    projectId: "todo-19a7f",
    storageBucket: "todo-19a7f.appspot.com",
    messagingSenderId: "994494082339",
    appId: "1:994494082339:web:7d2d2fdcd55db62701b096"
  };
  // Initialize Firebase
 export const db = firebase.initializeApp(firebaseConfig).firestore();