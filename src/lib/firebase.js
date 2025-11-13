// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf3h-x62vL8UhFi3x4UpJAP4faAeBpLNE",
  authDomain: "studytogether-14a65.firebaseapp.com",
  projectId: "studytogether-14a65",
  storageBucket: "studytogether-14a65.firebasestorage.app",
  messagingSenderId: "917416581658",
  appId: "1:917416581658:web:f8241b3045555660d30fa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimedb = getDatabase(app);
export const storage = getStorage(app);