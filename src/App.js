import React, { useEffect, useRef, useState } from 'react';
import {GoogleButton} from 'react-google-button'
import './App.css';

import { auth, firestore } from './firebase';
import { signOut } from 'firebase/auth';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore"

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
      {user? <ChatSpace /> : <SignIn />}
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

const ChatSpace = () => {
  const dummy = useRef();
  // e.preventDefault();
  // const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue] = useState('');
  const { uid, photoURL } = auth.currentUser;
  async function sendMessage(user, text) {
    try {
      const messageRef = await addDoc(collection(firestore, "messages"), {
      uid,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL      
      });
    } catch (error){console.log(error)}
    // setFormValue('');
    // dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  async function getmessages(firestore) {
    const messages = collection(firestore, 'messages');
    const mesgSnapshot = await getDocs(messages);
    const mesgList = mesgSnapshot.docs.map(doc => doc.data());
    return mesgList;
  }
};



const handleSubmit = (event) => {
  event.preventDefault();
  sendMessage(roomId, user, value);
  setValue('');

  return (<div>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={handleSubmit}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </div>)
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