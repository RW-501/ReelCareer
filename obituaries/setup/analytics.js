  // Import Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import {  getFirestore, collection, doc, setDoc, updateDoc, getDoc, increment, arrayUnion, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
  import { 
    getAuth, signInAnonymously, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

  

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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let userID = '';

// Listen for authentication state changes to get the user ID

// Handle user authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // The user is signed in
     userID = user.uid;  // Use the user's unique ID
    console.log('User ID:', userID);

  }
});



// Assuming pageID is set somewhere on the page (like an element with ID "pageID")
const page = document.getElementById('pageID');
let pageID = '';
if(page){
 pageID = page.innerText;

}







// Function to fetch user IP and location details
async function getUserDetails() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
  
      // Extract necessary details
      return {
        ip: data.ip,
        city: data.city,
        state: data.region,
        country: data.country_name, // Include country
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  }
  
  // Function to track analytics
  async function trackAnalytics() {
    const userDetails = await getUserDetails();
    if (!userDetails) return;
  let userBool = false;

    if(userID){
        userBool = true;
    }
    const { ip: userIP, city, state, country, location } = userDetails; // Destructure country
    const pageTitle = document.title; // Get page title
    const lastReferrer = document.referrer || "Direct"; // Get referral website
    const userDevice = navigator.userAgent; // Get user device info
    const timestamp = new Date(); // Current timestamp
  
    const analyticsRef = doc(db, "A_Ob_Analytics", userIP); // Reference the user's document
    const docSnap = await getDoc(analyticsRef);
  
    if (docSnap.exists()) {
      // If IP exists, update data
      await updateDoc(analyticsRef, {
        totalPageViews: increment(1), // Increment page views
        lastPageViewed: timestamp, // Update last viewed date
        pageID: pageID || "",
        pageViewed: arrayUnion({ title: pageTitle, time: timestamp }), // Add new page to array
        [`pageViewCount.${pageTitle}`]: increment(1), // Increment specific page count
        lastReferral: lastReferrer, // Update referral website
        lastCity: city, // Update last city
        lastState: state, // Update last state
        lastCountry: country, // Update last country
      });
    } else {
      // If IP does not exist, create a new document
      await setDoc(analyticsRef, {
        userBool: userBool,
        totalPageViews: 1,
        lastPageViewed: timestamp,
        lastPageViewed: [{ title: pageTitle, time: timestamp }],
        pageViewCount: { [pageTitle]: 1 },
        lastReferral: lastReferrer,
        userDevice: userDevice,
        userID: userID,
        userIP: userIP,
        city: city,
        state: state,
        country: country, // Store country
        location: location, // Store location details
      });
    }
  }
  
  // Track analytics on page load
  window.addEventListener("load", trackAnalytics);
  