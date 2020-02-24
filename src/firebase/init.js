import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDkXgLth_ONlzB8Ag-UnPkBOTrAXZ9S_o4",
  authDomain: "chat-with-firebase-c8c3a.firebaseapp.com",
  databaseURL: "https://chat-with-firebase-c8c3a.firebaseio.com",
  projectId: "chat-with-firebase-c8c3a",
  storageBucket: "chat-with-firebase-c8c3a.appspot.com",
  messagingSenderId: "650835285858",
  appId: "1:650835285858:web:fa824b74c561f0681f7e3b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings( {timestampsInSnapshots: true} )

export default firebaseApp.firestore()
