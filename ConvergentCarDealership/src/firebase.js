// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyAUeaxYstx5FdtvIILqBfZi2abEitymXYE",
    authDomain: "convergent-car-dealership.firebaseapp.com",
    projectId: "convergent-car-dealership",
    storageBucket: "convergent-car-dealership.firebasestorage.app",
    messagingSenderId: "191861731493",
    appId: "1:191861731493:web:c38a1d185998024fa09d4c",
    measurementId: "G-JN5PVLJPM9"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
