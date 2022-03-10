import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDe19zbttbatbduEDVQC169qGk6TJfrWUg",
    authDomain: "trivia-race-ab4b4.firebaseapp.com",
    projectId: "trivia-race-ab4b4",
    storageBucket: "trivia-race-ab4b4.appspot.com",
    messagingSenderId: "207775465003",
    appId: "1:207775465003:web:a6ce80f8d51b43bb3b346e",
    measurementId: "G-PXQLTXX8V9"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, db};