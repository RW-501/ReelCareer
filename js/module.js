
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



 // console.log("Page loaded Module ?????????????");
  


// Function to check if the user is logged in
function checkUserLoginStatus() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('User is logged in:', user);
        return user;
      } else {
        // No user is signed in
        console.log('No user is logged in.');
        return false;
      }
    });

  }

window.checkUserLoginStatus = checkUserLoginStatus;


// Logout function
function logout() {    // Clear auto logout timer
    clearTimeout(autoLogoutTimer);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('autoLogoutTime');
    showToast('You have been logged out.');
    // Redirect to login or home page
    window.location.href = '../';
}


  window.logout = logout;

  
  // Check if user is logged in and handle admin area access
  function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
    // Redirect to home if user is not logged in and is in the admin area
    if (window.location.pathname.includes('/admin/')) {
        if (!isLoggedIn) {
            if (window.location.pathname.includes('/admin/index')) {
                showToast('You need to log in to access the Admin area.');
            } else {
                // Redirect to login page or main admin page
                window.location.href = '/admin/index';
            }
        } else if (window.location.pathname.includes('/admin') || window.location.pathname.includes('/admin/index') || window.location.pathname.includes('/admin/')) {
            showToast('Admin Logged In');
            let firebaseLogin = document.getElementById("firebaseLogin");
            let dashboardContent = document.getElementById("dashboardContent");
        
            if(firebaseLogin){
                firebaseLogin = firebaseLogin.style.display = "none";
                dashboardContent = dashboardContent.style.display = "block";

            }
        
        }
    }
  }
  
  window.checkLogin = checkLogin;
  
  let autoLogoutTimer = null;

// Initialize auto logout on page load
function initializeAutoLogout() {
    const savedMinutes = localStorage.getItem('autoLogoutTime');
    if (savedMinutes && !isNaN(savedMinutes)) {
        // Set the timer using the saved setting
        autoLogoutTimer = setTimeout(() => {
            logout();
        }, parseInt(savedMinutes) * 60 * 1000);


        showToast(`Auto logout initialized for ${savedMinutes} minutes.`);
    } else {
       // showToast('Auto logout is disabled.');
    }
}

window.initializeAutoLogout = initializeAutoLogout;



  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    checkLogin(); // Ensure login is valid on page load

      
  if (window.checkUrl("/backend/") || window.checkUrl("/backend")) {
    console.log("Admin View");
    checkUserLoginStatus();
    initializeAutoLogout();
  } else {
    console.log("User View");
    attachTrackingListeners();
  }


  });
  
  
  
  


  // Export Firestore, Storage, and Auth instances for use in other modules
export {  db,getStorage, ref, uploadBytes, getDownloadURL,limit ,
    doc,arrayUnion, RecaptchaVerifier ,increment, getDoc   ,signInWithPhoneNumber,
     query, updateDoc , setDoc, addDoc,signInAnonymously , orderBy,
      signInWithPopup,FacebookAuthProvider, GoogleAuthProvider,startAfter ,
       OAuthProvider, signOut, onAuthStateChanged, deleteDoc, getFirestore,
        createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
         where, getDocs, storage, getAuth, collection, auth, analytics };



