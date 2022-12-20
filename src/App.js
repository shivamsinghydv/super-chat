import React, { useEffect, useRef, useState } from 'react';
import {GoogleButton} from 'react-google-button'
import './App.css';

import { initializeApp } from 'firebase/app';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { UserAuth } from './context/AuthContext';
import { query, orderBy, limit, collection, addDoc, doc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AuthContextProvider } from './context/AuthContext'; 
import { useAuthState } from 'react-firebase-hooks/auth';



const firebaseConfig ={
    apiKey: "AIzaSyB6_fEOtWFrjaMU8NRZL9XiqK_5EKy0ZwQ",
    authDomain: "suppachat.firebaseapp.com",
    projectId: "suppachat",
    storageBucket: "suppachat.appspot.com",
    messagingSenderId: "564369189985",
    appId: "1:564369189985:web:e46a21d7179c962ee00e20",
    measurementId: "G-4DEHP0MM9V"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
// const analytics = getAnalytics();


function App() {
  const [user] = useAuthState(auth);
  const handleSignOut = async ()=>{
    try{
      await signOut(auth);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <AuthContextProvider>
    {/* setUser(currentUser); */}
      <header>
        <h1>💬</h1>
        <h3>{user?.displayName}</h3>
        {user? <button onClick={handleSignOut}>LogOut</button>: <></>}
        
      </header>

      <section>
        {user? <NamAste /> : <SignIn />}
{/*   
      {user? <ChatRoom />\ : <SignIn />} */}
        <p>Do not violate the community guidelines or you will be banned for life!</p>
      </section>
      </AuthContextProvider>
    </div>
  );
}

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const handleGoogleSignIn = async () =>{
    try{
      await googleSignIn();
    }catch(error){
      console.log(error);
    }
  };
  
  return (
    <>
      <GoogleButton className="sign-in" onClick={handleGoogleSignIn}/>
      {/* <button className="sign-in" onClick={handleGoogleSignIn}>Sign in with Google</button> */}
    </>
  )

}

const NamAste=()=>{
  return (<>
    <div>
      <h2>
        Full features of this app coming soon...
      </h2>
    </div></>
  )
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  </>)
}


export default App;