import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0SFB8pGB4zNM4MkwCWkIm4bTfwnQNpkM",
  authDomain: "resume-maker-403fe.firebaseapp.com",
  projectId: "resume-maker-403fe",
  storageBucket: "resume-maker-403fe.firebasestorage.app",
  messagingSenderId: "597427657248",
  appId: "1:597427657248:web:7276937f956961d7307a45",
  measurementId: "G-5L736YW6SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 