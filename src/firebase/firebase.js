import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAX2xrNcM8QvI9ImuecyCi6izv7WFkbL3o",
  authDomain: "ecoaudit-4d2a2.firebaseapp.com",
  projectId: "ecoaudit-4d2a2",
  storageBucket: "ecoaudit-4d2a2.firebasestorage.app",
  messagingSenderId: "348272274",
  appId: "1:348272274:web:29d075c43346fdfbb0584b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;