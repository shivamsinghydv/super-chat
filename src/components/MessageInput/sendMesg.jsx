import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { db } from "../../firebase";

const SendMessage = async (roomId, user, text) => {
    try {
        await addDoc(collection(db, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
  }


  // ...
  
async function loginWithGoogle() {
      try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth();
  
          const { user } = await signInWithPopup(auth, provider);
  
          return { uid: user.uid, displayName: user.displayName };
      } catch (error) {
          if (error.code !== 'auth/cancelled-popup-request') {
              console.error(error);
          }
  
          return null;
      }
  }
  
export { loginWithGoogle, SendMessage} 