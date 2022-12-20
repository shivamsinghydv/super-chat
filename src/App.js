import React, { useRef, useState } from 'react';
import './App.css';
import {GoogleButton} from 'react-google-button'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore } from 'firebase/firestore';
import { UserAuth } from './context/AuthContext';
import { AuthContextProvider } from './context/AuthContext';
import { async } from '@firebase/util';
// import {initializeApp} from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';

// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyB6_fEOtWFrjaMU8NRZL9XiqK_5EKy0ZwQ",
//     authDomain: "suppachat.firebaseapp.com",
//     projectId: "suppachat",
//     storageBucket: "suppachat.appspot.com",
//     messagingSenderId: "564369189985",
//     appId: "1:564369189985:web:e46a21d7179c962ee00e20",
//     measurementId: "G-4DEHP0MM9V"
//   })


// const auth = getAuth(firebaseApp);

const firestore = getFirestore();
// const analytics = getAnalytics();


function App() {

  // const [user] = useAuthState(auth);
  // https://firebase.google.com/docs/reference/js/firebase.User

  return (
    <div className="App">
    setUser(user);
      <AuthContextProvider>
      <header>
        <h1>💬</h1>
        {/* <SignOut /> */}
      </header>

      <section>
        
      {/* {user ? <ChatRoom /> : <SignIn />} */}
      <SignIn />
      </section>
      </AuthContextProvider>
    </div>
  );
}


const SignIn = () => {
  const {googleSignIn} = UserAuth();
  const handleGoogleSignIn = async () =>{
    try{
      await googleSignIn();
    }catch(error){
      console.log(error);
    }
  }
  // const signInWithGoogle = () => {
    // const provider = new GoogleAuthProvider;  
  // provider.setCustomParameters({
    // prompt: "select_account"
  // });
  // getAuth.signInWithPopup
  // }

  return (
    <>
      <GoogleButton className="sign-in" onClick={handleGoogleSignIn}/>
      {/* <button className="sign-in" onClick={handleGoogleSignIn}>Sign in with Google</button> */}
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = doc('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
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