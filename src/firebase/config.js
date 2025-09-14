// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjRYdIsP6hnMnski-spc1pWuJwjA_7mNI",
  authDomain: "bikepartshubapp.firebaseapp.com",
  projectId: "bikepartshubapp",
  storageBucket: "bikepartshubapp.appspot.com",
  messagingSenderId: "778797142877",
  appId: "1:778797142877:web:fd53dc57fcbe02e0f8ceb4",
  measurementId: "G-5FKWWRNX6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Storage - THIS WAS MISSING!
export const storage = getStorage(app);

// Debug: Log to verify storage is initialized
console.log(
  "Firebase Storage initialized with bucket:",
  app.options.storageBucket
);

export default app;
