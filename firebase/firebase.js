// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDlurv5f_r7L4JF2FxuHybwo6_06Na7wPM",

  authDomain: "instagramclone-a573f.firebaseapp.com",

  projectId: "instagramclone-a573f",

  storageBucket: "instagramclone-a573f.appspot.com",

  messagingSenderId: "678250441431",

  appId: "1:678250441431:web:1c240fdbcc221433c4de92"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
