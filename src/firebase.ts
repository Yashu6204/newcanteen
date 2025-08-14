// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYO13ZGcH94peQt13be1PcDnJP6W5ct_g",
  authDomain: "newcanteen-f40b1.firebaseapp.com",
  projectId: "newcanteen-f40b1",
  storageBucket: "newcanteen-f40b1.firebasestorage.app",
  messagingSenderId: "102810118848",
  appId: "1:102810118848:web:658a1a179e2e3e6c365b25",
  measurementId: "G-3G7YD40S5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


