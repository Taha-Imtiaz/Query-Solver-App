import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 



//how firebase identify we are using query-solver app.

var firebaseConfig = {
    apiKey: "AIzaSyARl1LTizNzbsvsXEBuBHDTdQL_vbOuwBQ",
    authDomain: "query-solver-7d993.firebaseapp.com",
    databaseURL: "https://query-solver-7d993.firebaseio.com",
    projectId: "query-solver-7d993",
    storageBucket: "query-solver-7d993.appspot.com",
    messagingSenderId: "581714510494",
    appId: "1:581714510494:web:2d1436fdd9c33cfd91b18f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  
  export var auth = firebase.auth()
  export var firestore = firebase.firestore()
  export var serverTimestamp = () =>  firebase.firestore.FieldValue.serverTimestamp()
  export var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export default firebase

