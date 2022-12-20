
function ChatRoom() {
    const dummy = useRef;
    // e.preventDefault();
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue] = useState('');
    const { uid, photoURL } = auth.currentUser;
    async function sendMessage(user, text) {
      try {
        const messageRef = await addDoc(collection(db, "messages"), {
        uid,
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL      
        });
      } catch (error){console.log(error)}
  
      
      // setFormValue('');
      // dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    async function getmessages(db) {
      const messages = collection(db, 'messages');
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
  