// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyUaQxvHsMBCf88klHTwHWUMQxrTwhIqM",
  authDomain: "e-riksha-app-c317b.firebaseapp.com",
  projectId: "e-riksha-app-c317b",
  storageBucket: "e-riksha-app-c317b.appspot.com", // Corrected this line
  messagingSenderId: "716077457568",
  appId: "1:716077457568:web:431c8a4f807ed54dd169c5",
  measurementId: "G-ZSX3BMQ6BW"
};

const app = initializeApp(firebaseConfig);

// Make sure you are only declaring db and auth here once
export const db = getFirestore(app);
export const auth = getAuth(app);
