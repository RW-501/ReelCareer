import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
// Firestore imports
import {
  getFirestore,
  doc, arrayRemove,
  getDoc, serverTimestamp,
  query, startAfter,
  updateDoc, orderBy,
  setDoc, limit, 
  addDoc, deleteDoc,writeBatch ,
  getDocs, increment,
  where, arrayUnion,onSnapshot ,
  collection
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

// Authentication imports
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider, signInAnonymously,
  signOut, RecaptchaVerifier,
  onAuthStateChanged, signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

// Storage import
import { getDownloadURL, uploadBytes, uploadBytesResumable, ref, getStorage, deleteObject } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js';

// Analytics import
import { initializeAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js';

// Initialize Firebase
let auth;
let db;
let storage;
let analytics;
let userId;
let batch;

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDiwC3Dmd88-t3N9iRV5cZ3snVkEXinclg",
    authDomain: "reelcareer-cb4b0.firebaseapp.com",
    projectId: "reelcareer-cb4b0",
    storageBucket: "reelcareer-cb4b0.appspot.com",
    messagingSenderId: "365163764840",
    appId: "1:365163764840:web:21c44f8625c9b6831e6fdd",
    measurementId: "G-LBTK319K2X"
  };

  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    analytics = initializeAnalytics(app);
     batch = writeBatch(db); // db is the Firestore database reference

 //   console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Error, TRY RELOADING:", error);
  }
}

// Function to get the current user ID

async function getUserId() {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe(); // Cleanup listener
            if (user) {
                resolve(user.uid);
            } else {
                reject(null);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Module User ID: ", user.uid);

      // Store user ID and email in local storage
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userID', user.uid);
      localStorage.setItem('userEmail', user.email);

      userId = user.uid;

      if (!window.checkUrl("/backend/") || !window.checkUrl("/backend")) {
  
        handleAuthStateChanged(user); // Call your function to handle authenticated user
        }

        const userDataSaved =  getUserData() || [];

        if (userDataSaved.darkMode === "true") {
            document.body.classList.add("dark-mode");
          }
    
    
          // Redirect to the user page if on the auth page
          if (window.location.pathname === "/views/auth") {
          //  window.location.href = "/u/";
          }

          


    } else {
      console.log("No user signed in");

      // Clear local storage
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');

      userId = null;

  
      localStorage.setItem('userLoggedIn', false);

        if (!window.checkUrl("/backend/") || !window.checkUrl("/backend")) {

      handleAuthStateChanged(user); // Call your function to handle authenticated user
      }
    }
    checkLogin(user); // Ensure login is valid on page load


  });
});

// Initialize Google and Facebook Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export Firestore, Storage, and Auth instances for use in other modules
export {
  db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics,
  googleProvider,onSnapshot ,writeBatch ,batch,
  facebookProvider,
  getUserId // Export the function
};

