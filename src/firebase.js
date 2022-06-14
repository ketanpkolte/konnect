import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF7hRjumiuOcnZfRDMf6tswHo6KruJYv8",
  authDomain: "konnect-59527.firebaseapp.com",
  projectId: "konnect-59527",
  storageBucket: "konnect-59527.appspot.com",
  messagingSenderId: "577587970371",
  appId: "1:577587970371:web:a4666ba1b28c65fa092ff6",
  measurementId: "G-QQLWBLN9R9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, db, provider };

