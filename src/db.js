import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTm55fjJypsU3dnwqKp6cuP54n3b4ZhM4",
  authDomain: "contact-book-6ccc1.firebaseapp.com",
  projectId: "contact-book-6ccc1",
  storageBucket: "contact-book-6ccc1.firebasestorage.app",
  messagingSenderId: "668096421407",
  appId: "1:668096421407:web:2508e8a2f3e6bf6b397f2a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;