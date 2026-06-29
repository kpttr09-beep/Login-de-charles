// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtCQF6Ee1Hjo08_hOscabABN5IAOsCtpc",
  authDomain: "login-f5f26.firebaseapp.com",
  projectId: "login-f5f26",
  storageBucket: "login-f5f26.firebasestorage.app",
  messagingSenderId: "445908284320",
  appId: "1:445908284320:web:c737e04d1f314d2418eac5",
  measurementId: "G-W92TQ2RNBG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);