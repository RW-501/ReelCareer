// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getFirestore, collection, doc, setDoc, updateDoc, getDoc, increment, arrayUnion, addDoc, getDocs, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { 
    getAuth, signInAnonymously, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);


let pageID = '';

let userID = '';

window.addEventListener("load", () => {
/*
// Handle user authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // The user is signed in
     userID = user.uid;  // Use the user's unique ID
    console.log('User ID:', userID);

  }
});
*/
// Assuming pageID is set somewhere on the page (like an element with ID "pageID")
const page = document.getElementById('pageID');
if(page){
 pageID = page.innerText;

}

});




// Utility variables
let viewStartTime;
let locationData;
let ipAddress;

// User Location Service
window.userLocationService = function () {
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
      if (!ipAddress || !locationData) {
        ipAddress = await getUserIP();
        locationData = await getUserLocationByIP(ipAddress);

        console.log("Fetched location data:", locationData);

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

  // Expose the main function
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

// Function to track analytics
async function trackAnalytics() {
  const { ipAddress, locationData } = await userLocationService.getUserIPAndLocation();
  if (!ipAddress || !locationData) return;

  let userBool = false;

  if (userID) {
    userBool = true;
  }

  const { city, state, country } = locationData; // Destructure location data
  const pageTitle = document.title; // Get page title
  const lastReferrer = document.referrer || "Direct"; // Get referral website
  const userDevice = navigator.userAgent; // Get user device info
  const timestamp = new Date(); // Current timestamp

  // Check if pageTitle is valid (not empty)
  if (!pageTitle || pageTitle.trim() === "") {
    console.error("Page title is empty. Skipping analytics tracking.");
    return;
  }

  const analyticsRef = doc(db, "A_Ob_Analytics", ipAddress); // Reference the user's document
  const docSnap = await getDoc(analyticsRef);

  if (docSnap.exists()) {
    // If IP exists, update data
    await updateDoc(analyticsRef, {
      totalPageViews: increment(1), // Increment page views
      lastPageViewed: timestamp, // Update last viewed date
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
      pageViewed: [{ title: pageTitle, time: timestamp }],
      pageViewCount: { [pageTitle]: 1 }, // Ensure pageViewCount is set correctly
      lastReferral: lastReferrer,
      userDevice: userDevice,
      userID: userID,
      userIP: ipAddress,
      city: city,
      state: state,
      country: country, // Store country
      location: locationData, // Store location details
    });
  }
}

startViewTimer();  // Start view timer as soon as the page loads
setInternalPageSource();  // Set the current page as the last internal page

// Start tracking view time as soon as the page loads
document.addEventListener('DOMContentLoaded', () => {

  trackAnalytics();  // Start tracking analytics after the page has loaded
});



function addToastStyles() {
  // Check if the style already exists
  if (document.getElementById('toast-styles')) return;

  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
      .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: white;
          padding: 15px 25px;
          border-radius: 10px;
          font-size: 16px;
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          opacity: 0;
          animation: fadeInOut 5s forwards;
          z-index: 9999;
      }
      .toast.success {
          background-color: #28a745;
      }
      .toast.error {
          background-color: #dc3545;
      }
      .toast .close-toast {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 0 10px;
          margin-left: 15px;
          transition: opacity 0.3s;
      }
      .toast .close-toast:hover {
          opacity: 0.7;
          color: red;
      }
      @keyframes fadeInOut {
          0% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
          }
          10% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
          }
          90% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
          }
          100% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
          }
      }
  `;
  document.head.appendChild(style);
}

// Call the function to add the styles
addToastStyles();

  /* 
function showToast(message, type = "success") {
  // Create a toast container (div)
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add(type); // Add type for different styles (e.g., success, error)

  // Add message to the toast
  toast.innerHTML = `
    <span>${message}</span>
    <button class="close-toast">×</button>
  `;

  // Append the toast to the body
  document.body.appendChild(toast);

  // Get the close button and add event listener
  const closeButton = toast.querySelector(".close-toast");
  closeButton.addEventListener("click", () => {
    toast.remove();
  });

  // Apply the toast animation
  toast.style.animation = "fadeInOut 5s forwards";

  // Remove the toast after 5 seconds (or when clicked)
  setTimeout(() => {
    toast.remove();
  }, 5000); // Toast disappears after 5 seconds
}


window.showToast = showToast;

 */

