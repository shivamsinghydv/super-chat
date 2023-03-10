// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6_fEOtWFrjaMU8NRZL9XiqK_5EKy0ZwQ",
  authDomain: "suppachat.firebaseapp.com",
  databaseURL: "https://suppachat-default-rtdb.firebaseio.com",
  projectId: "suppachat",
  storageBucket: "suppachat.appspot.com",
  messagingSenderId: "564369189985",
  appId: "1:564369189985:web:e46a21d7179c962ee00e20",
  measurementId: "G-4DEHP0MM9V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);