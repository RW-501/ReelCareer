
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
// Firestore imports
import { 
    getFirestore, 
    doc, 
    getDoc, 
    query, startAfter ,
    updateDoc,orderBy, 
    setDoc,    
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
      } else {
        // No user is signed in
        console.log('No user is logged in.');
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
export {  db,getStorage, ref, uploadBytes, getDownloadURL,
    doc,arrayUnion, RecaptchaVerifier ,increment, getDoc   ,signInWithPhoneNumber,
     query, updateDoc , setDoc, addDoc,signInAnonymously , orderBy,
      signInWithPopup,FacebookAuthProvider, GoogleAuthProvider,startAfter ,
       OAuthProvider, signOut, onAuthStateChanged, deleteDoc, getFirestore,
        createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
         where, getDocs, storage, getAuth, collection, auth, analytics };




// Utility variables
let viewStartTime;
let locationData;
let ipAddress;


window.userLocationService = function() {

//window.userLocationService = (function () {
    const ipAPI = 'https://api.ipify.org?format=json';
    const locationAPI = 'https://ipapi.co';

    // Fetch the user's IP address
    const getUserIP = async () => {
        try {
            const response = await fetch(ipAPI);
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    };

    // Fetch the user's location based on IP address
    const getUserLocationByIP = async (ip) => {
        try {
            const response = await fetch(`${locationAPI}/${ip}/json/`);
            const data = await response.json();
            return {
                city: data.city || 'N/A',
                state: data.region || 'N/A',
                zip: data.postal || 'N/A',
                country: data.country_name || 'N/A'
            };
        } catch (error) {
            console.error('Error fetching location by IP:', error);
            return null;
        }
    };

    // Main function to get IP and location together
    const getUserIPAndLocation = async () => {
        try {
            ipAddress = sessionStorage.getItem('userIP');
            locationData = JSON.parse(sessionStorage.getItem('userLocation'));

            // If IP or location are not cached, fetch them
            if (!ipAddress || !locationData) { // Fixed condition here
                ipAddress = await getUserIP();
                locationData = await getUserLocationByIP(ipAddress);

                console.log("locationData  ",locationData);


                // Cache in session storage for the current session
                if (ipAddress && locationData) {
                    sessionStorage.setItem('userIP', ipAddress);
                    sessionStorage.setItem('userLocation', JSON.stringify(locationData));
                }
            }

            return { ipAddress, locationData };
        } catch (error) {
            console.error('Error retrieving user IP and location:', error);
            return null;
        }
    };

    // Expose only the main function
    return {
        getUserIPAndLocation
    };
}();

// Function to set the last internal page
function setInternalPageSource() {
    sessionStorage.setItem('lastInternalPage', window.location.href);
}

// Function to start tracking the view time
function startViewTimer() {
    viewStartTime = Date.now();
}

// Determine the source of the visit
const getViewSource = () => {
    const externalSource = document.referrer && !document.referrer.includes(window.location.origin)
        ? document.referrer
        : null;
    const internalSource = sessionStorage.getItem('lastInternalPage');
    return externalSource || internalSource || 'Direct Visit';
};

// Function to initialize user IP and location data
async function attachTrackingListeners() {
    try {
        const { ipAddress: ip, locationData: location } = await userLocationService.getUserIPAndLocation(); // Fixed destructuring
        ipAddress = ip;
        locationData = location;

        setTrackingListeners(ipAddress);
    } catch (error) {
        console.error("Error fetching user IP and location:", error);
    }
}

// Function to determine the correct `ViewedBy` field based on the URL
// Function to determine the correct `ViewedBy` field based on the URL
function getViewedByField() {
    const path = window.location.pathname;
    const page = path === '/' || path === '/index.html' ? 'home' : path.split('/').filter(Boolean).pop();
    
    return `${page}ViewedBy`;
}


// Function to update view data on unload or visibility change
 async function updateViewData(ipAddress, timer, exitTrack) {
    const viewEndTime = Date.now();
    const durationOfView = (viewEndTime - viewStartTime) / 1000;
    const viewedByField = getViewedByField();

   // console.log(`${ipAddress} ipAddress ???????? .`);

    if (!ipAddress) {
        console.error("Missing IP address. View data not recorded.");
        return;
    }

    // Dynamically set the field for the viewed page
    const viewData = {
        [viewedByField]: {
            viewDate: new Date().toISOString(),
            viewMethod: navigator.userAgentData?.mobile ? "mobile" : "desktop",
            durationOfView: durationOfView,
            contactViews: increment(1),
            viewSource: getViewSource(),
            timer: timer,
            exitTrack: exitTrack
        },
        ipAddress,
        ...locationData,
        lastViewDate: new Date().toISOString(),
        userActivitiesCount: increment(1),
        totalDuration: increment(durationOfView),
        userBlocked: false
    };

    try {
        await setDoc(doc(db, 'Analytics', ipAddress), viewData, { merge: true });
        console.log(`${viewedByField} data updated successfully.`);
    } catch (error) {
        console.error(`Error updating ${viewedByField} data:`, error);
    }
}

// Attach event listeners for tracking
 function setTrackingListeners(ipAddress) {
    window.addEventListener('beforeunload', setInternalPageSource);
    window.addEventListener('load', startViewTimer);
    //console.log("startViewTimer");
    let timer = 20000;

    triggerUpdateWithTimeout(ipAddress, timer);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
         // console.log("TrackingListeners  last");

            updateViewData(ipAddress, '', "offLoad");
        }
    });
}


 // Define the  function to check if a specific keyword is in the URL
 window.checkUrl = function(keyword) {
    // Get the current URL
    const currentUrl = window.location.href;
   // console.log("currentUrl:", currentUrl);
    //console.log("keyword:", keyword);
  
    // Return true if the keyword is found in the URL, otherwise false
    return currentUrl.includes(keyword);
  };



// Function to trigger the update after 20 seconds
function triggerUpdateWithTimeout(ipAddress, time) {
    
    // Set a timeout for 20 seconds (20000 milliseconds)
    setTimeout(() => {
      // Call the updateViewData function after the delay
      updateViewData(ipAddress, time, 'timeOut');
    }, time);  // 20,000 milliseconds = 20 seconds
  }
  



