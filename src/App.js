import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {GoogleButton} from 'react-google-button'
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, query, orderBy, limit, getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { MessageInput } from './components/MessageInput';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SendMessage} from './components/MessageInput/sendMesg'


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


function ChatSpace (){
  const [user] = useAuthState(auth);
  return (
        <div className="messages-container">
          {/* <h2>{user.displayName}</h2> */}
            {/* <MessageInput /> */}
          <ChatRoom />
        </div>
  )   
}
//   return (
//     <>
//         <div>
//         </div>
//     </>
// );

function ChatRoom() {
  // console.log('Heli')
  return <div>
    <MessageInput />
  </div>;
}


const handleSubmit = (event) => {
  event.preventDefault();
  SendMessage(roomId, user, value);
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



// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

//   return (<>
//     <div className={`message ${messageClass}`}>
//       <p>{text}</p>
//     </div>
//   </>)
// }


export default App;