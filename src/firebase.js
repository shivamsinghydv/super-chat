import {initializeApp} from 'firebase/app';
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6_fEOtWFrjaMU8NRZL9XiqK_5EKy0ZwQ",
    authDomain: "suppachat.firebaseapp.com",
    projectId: "suppachat",
    storageBucket: "suppachat.appspot.com",
    messagingSenderId: "564369189985",
    appId: "1:564369189985:web:e46a21d7179c962ee00e20",
    measurementId: "G-4DEHP0MM9V"
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);