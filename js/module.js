
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
// Firestore imports
import { 
    getFirestore, 
    doc, 
    getDoc, 
    query, startAfter ,
    updateDoc,orderBy, 
    setDoc, limit,    
    addDoc, deleteDoc ,
    getDocs, increment,
    where, arrayUnion,
    collection 
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

// Authentication imports
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    OAuthProvider, signInAnonymously  ,
    signOut, RecaptchaVerifier,
    onAuthStateChanged, signInWithPhoneNumber,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

// Storage import
import { getDownloadURL,uploadBytes,  ref, getStorage, deleteObject } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js';

// Analytics import
import { initializeAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js';

let auth;
let db;
let storage;
let analytics;

// Function to initialize Firebase
function initializeFirebase() {

        // Firebase configuration
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
         auth = getAuth(app); // Initialize auth
         db = getFirestore(app); // Initialize Firestore
         storage = getStorage(app); // Initialize Storage
         analytics = initializeAnalytics(app);

    //  console.log("Firestore initialized:", db);

    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}


document.addEventListener('DOMContentLoaded', initializeFirebase);



 console.log("Page loaded Module ?????????????");
  




  // Export Firestore, Storage, and Auth instances for use in other modules
export {  db,getStorage, ref, uploadBytes, getDownloadURL,limit ,
    doc,arrayUnion, RecaptchaVerifier ,increment, getDoc   ,signInWithPhoneNumber,
     query, updateDoc , setDoc, addDoc,signInAnonymously, facebookProvider, orderBy,
      signInWithPopup,FacebookAuthProvider, GoogleAuthProvider,startAfter ,
       OAuthProvider, signOut, onAuthStateChanged, deleteDoc, getFirestore,
        createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
         where, getDocs, storage, getAuth, collection, auth, analytics };



