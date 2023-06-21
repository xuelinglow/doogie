// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz93JeJJuFGk5nhoi-Qse2bZs78PZNWnQ",
  authDomain: "doogie-dc57a.firebaseapp.com",
  projectId: "doogie-dc57a",
  storageBucket: "doogie-dc57a.appspot.com",
  messagingSenderId: "149594730850",
  appId: "1:149594730850:web:d9a782adf7e64979ec3c3b",
  measurementId: "G-9EW2D9XGFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export {db}