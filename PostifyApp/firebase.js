// firebase.js
// Import Firebase SDK modules for initialization and services
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase project configuration for media-manager-app
// This connects the app to Firebase Authentication, Firestore, and Storage services
const firebaseConfig = {
  apiKey: "AIzaSyBHMb_PXpVJs1Ouq5fVjyjPV7DE6UvEZos",
  authDomain: "media-manager-app-e4d76.firebaseapp.com",
  projectId: "media-manager-app-e4d76",
  storageBucket: "media-manager-app-e4d76.firebasestorage.app",
  messagingSenderId: "505572560563",
  appId: "1:505572560563:web:7444c0c4d6a0c4d352aac6",
  measurementId: "G-J8702K4VLW"
};

// Initialize Firebase app with configuration
export const app = initializeApp(firebaseConfig);

// Initialize Firestore database for storing user data and posts
export const db = getFirestore(app);

// Initialize Firebase Authentication for user login/signup
export const auth = getAuth(app);

// Initialize Firebase Storage for media file uploads
export const storage = getStorage(app);
