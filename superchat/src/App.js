// Import React and required hooks
import React, { useRef, useState } from 'react';
import './App.css';

// Import Firebase and its modules (compat version for older syntax)
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Import React Firebase Hooks for real-time data and auth state
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Initialize Firebase with your app config
firebase.initializeApp({
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
  measurementId: "YOUR_MEASUREMENT_ID_HERE"
});

// Get Firebase Auth and Firestore services
const auth = firebase.auth();
const firestore = firebase.firestore();

// Top-level App component
function App() {
  const [user] = useAuthState(auth); // Hook to check if user is signed in

  return (
    <div className="App">
      <header className="App-header">
        <SignOut /> {/* Show Sign Out if logged in */}
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />} {/* Conditional rendering based on auth */}
      </section>
    </div>
  );
}

// Sign In Component using Google Auth
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider(); // Google login provider
    auth.signInWithPopup(provider); // Show popup to login
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

// Sign Out Button
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

// Chat Room Component - Handles message list & sending
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages'); // Reference to Firestore collection
  const query = messagesRef.orderBy('createdAt').limit(25); // Query: last 25 messages
  const [messages] = useCollectionData(query, { idField: 'id' }); // Live collection listener
  const [formValue, setFormValue] = useState(''); // State for message input

  // Send Message Handler
  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const { uid, photoURL } = auth.currentUser; // Current user's ID and photo

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Firebase timestamp
      uid,
      photoURL // Save user's avatar
    });

    setFormValue(''); // Clear input
  };

  return (
    <>
      <main>
        {/* Loop through messages and render each one */}
        {messages && messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type something  ... 🔥"
        />
        <button type="submit">🪶</button>
      </form>
    </>
  );
}

// Chat Message Component - Shows each individual message
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // Style message based on who sent it (you vs others)
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="avatar" />
      <p>{text}</p>
    </div>
  );
}

export default App;
