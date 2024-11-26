/*
    
<!-- Firebase configuration/ Login& Out -->
<script src="https://reelcareer.co/public/js/main.js"></script> 

*/

// main.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getFirestore,
  doc, where,
  updateDoc,
  setDoc, limit,increment ,
  serverTimestamp,query ,
  collection,
  getDocs,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { initializeAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

// Your web app's Firebase configuration
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

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = initializeAnalytics(app);

// Now you can use `auth`, `db`, `storage`, and `analytics` in your app

//import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
//const newCollection = collection;

/*
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// Your Firestore code here
  console.log('Firebase found.');
    // Access the necessary functions
const auth = firebase.auth();
*/

// Firebase Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// Loading Indicator
const loadingIndicator = document.getElementById("loading-indicator");
const showLoading = () => (loadingIndicator.style.display = "block");
const hideLoading = () => (loadingIndicator.style.display = "none");

let UserID = "";
let userData = "";

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


// Function to update or create user information in Firestore
const saveUserLoginState = async (user) => {
  try {
    // Fetch IP and location data
    const [ip, location] = await Promise.all([
      getUserIP(),
      getUserLocationByIP(await getUserIP())
    ]);

    // Prepare user data with defaults for missing fields
    const userData = {
      email: user.email || "Unknown",
      lastLogin: serverTimestamp(),
      ipAddress: ip || "Unknown",
      userID: user.uid || "Unknown",
      city: location?.city || "Unknown",
      state: location?.state || "Unknown",
      zip: location?.zip || "Unknown",
      country: location?.country || "Unknown",
      name: user.displayName || "Unknown"
    };

    // Reference to the user document
    const userDocRef = doc(db, "Users", user.uid);

    // Update the user document if it exists, or create a new one if not found
    await setDoc(userDocRef, userData, { merge: true });
    console.log("User info saved/updated successfully:", userData);

    // Save login state to localStorage
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userEmail", user.email);
  } catch (error) {
    console.error("Error saving user login state:", error);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Save user login state and update local storage
    await saveUserLoginState(user);

    // Store UserID (if needed globally)
    UserID = user.uid;

    // Redirect to the user profile if on the login page
    if (window.location.pathname === "/views/auth") {
      window.location.href = "/views/user"; // Redirect to profile
    }
  } else {
    console.log("No user signed in");

    // Clear local storage on sign-out
    ["userLoggedIn", "userEmail", "userData"].forEach((item) =>
      localStorage.removeItem(item)
    );
  }
});

// Sign Up Function
document
  .getElementById("signup-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    showLoading();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      //console.log('Sign Up Successful:', user);
      await saveUserLoginState(user, true); // Update database and local storage
      window.location.href = "/views/user"; // Redirect to profile
    } catch (error) {
      console.error("Error during sign up:", error);
      showToast(error.message, 'error');
    } finally {
      hideLoading();
    }
  });

// Login with Email
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  showLoading();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Login Successful:", user);
    await saveUserLoginState(user, true); // Update database and local storage
    //  window.location.href = '/views/user'; // Redirect to profile
  } catch (error) {
    console.error("Error during login:", error);
    showToast(error.message);
  } finally {
    hideLoading();
  }
});

document
  .getElementById("email-login-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    showLoading();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Email Login Successful:", user);
      await saveUserLoginState(user, true);
      closeLoginPopup();
    } catch (error) {
      console.error("Error during email login:", error);
      showToast(error.message);
    } finally {
      hideLoading();
    }
  });

// Google Login Function
document.getElementById("google-login")?.addEventListener("click", async () => {
  showLoading();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google Login Successful:", user);
    await saveUserLoginState(user, true); // Update database and local storage
    window.location.href = "/views/user"; // Redirect to profile
  } catch (error) {
    console.error("Error during Google login:", error);
    showToast(error.message);
  } finally {
    hideLoading();
  }
});

// Facebook Login Function
document
  .getElementById("facebook-login")
  ?.addEventListener("click", async () => {
    showLoading();
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("Facebook Login Successful:", user);
      await saveUserLoginState(user, true); // Update database and local storage
      window.location.href = "/views/user"; // Redirect to profile
    } catch (error) {
      console.error("Error during Facebook login:", error);
      showToast(error.message);
    } finally {
      hideLoading();
    }
  });

// Apple Login Function
document.getElementById("apple-login")?.addEventListener("click", async () => {
  showLoading();
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    console.log("Apple Login Successful:", user);
    await saveUserLoginState(user, true); // Update database and local storage
    window.location.href = "/views/user"; // Redirect to profile
  } catch (error) {
    console.error("Error during Apple login:", error);
    showToast(error.message);
  } finally {
    hideLoading();
  }
});

// Logout Function
const logout = async () => {
  showLoading(); // Show loading indicator
  const auth = getAuth(); // Get the Firebase Auth instance

  try {
    const user = auth.currentUser; // Get the currently signed-in user

    if (user) {
      // Sign out the user
      await signOut(auth);

      // Optionally update user data in Firestore (e.g., set `loggedIn` to false)
      await saveUserLoginState(user); // Assuming saveUserLoginState can handle logouts as well

      // Clear relevant local storage items
      ["userLoggedIn", "userEmail", "userData"].forEach((item) =>
        localStorage.removeItem(item)
      );

      console.log("Logout successful");
    }

    // Redirect to the login/auth page after logout
    window.location.href = "/views/auth.html";
  } catch (error) {
    console.error("Error during logout:", error);
    showToast(`Error during logout: ${error.message}`, 'error')
  } finally {
    hideLoading(); // Hide loading indicator
  }
};

// Function to logout the user
async function logoutUser() {
  try {
    await firebase.auth().signOut();


  clearTimeout(autoLogoutTimer);
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('autoLogoutTime');
  showToast('You have been logged out.');
  // Redirect to login or home page
  window.location.href = 'https://reelcareer.co/';

} catch (error) {
  console.error("Logout error:", error);
}



}


window.logoutUser = logoutUser;

// Logout button on any page
document.getElementById("logout-button")?.addEventListener("click", logoutUser);

// Function to check if a user is logged in
const checkUserLoggedIn = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      return user.id;
    } else {
      showLoginPopup(); // Trigger the login pop-up
      return false;
    }
  });
};

// Function to create and display the login pop-up
const showLoginPopup = () => {
  // Create the login pop-up container
  const loginPopup = document.createElement("div");
  loginPopup.id = "login-popup";
  loginPopup.style.position = "fixed";
  loginPopup.style.top = "50%";
  loginPopup.style.left = "50%";
  loginPopup.style.transform = "translate(-50%, -50%)";
  loginPopup.style.width = "400px";
  loginPopup.style.backgroundColor = "white";
  loginPopup.style.padding = "20px";
  loginPopup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  loginPopup.style.borderRadius = "8px";
  loginPopup.innerHTML = `
        <h2>Login</h2>
        <button id="google-login">Login with Google</button><br><br>
        <button id="facebook-login">Login with Facebook</button><br><br>
        <button id="apple-login">Login with Apple</button><br><br>
        <form id="email-login-form">
            <input type="email" id="login-email" placeholder="Email" required><br><br>
            <input type="password" id="login-password" placeholder="Password" required><br><br>
            <button type="submit">Login with Email</button>
        </form>
        <p class="form-link">Don't have an account? <a href="/views/auth">Create an account</a></p>
    `;

  document.body.appendChild(loginPopup);
};

// Function to close and remove the login pop-up
const closeLoginPopup = () => {
  const loginPopup = document.getElementById("login-popup");
  if (loginPopup) {
    loginPopup.remove();
  }
};




// Navigation bar
document.addEventListener("DOMContentLoaded", function () {
  console.log("checkUserProfile");
  function checkUserProfile() {
    var profileModal = document.getElementById("profileModal");
    var modalInstance = bootstrap.Modal.getInstance(profileModal);
    modalInstance.hide();
  }


  
  // Function to create the navbar
  function createNavbar() {
    const currentPage = window.location.pathname; // Get the current path from the URL
    const isHomePage = 
          currentPage === "/index.html" || 
          currentPage === "/index" || 
          currentPage === "" || 
          currentPage === "/";
    
    const navbarClass = isHomePage
          ? "navbar-light bg-light "
          : "navbar-dark bg-primary";
    
    return `
            <nav class="navbar navbar-expand-lg ${navbarClass} shadow-sm sticky-top" role="navigation">
                <div class="container">
                 <a class="navbar-brand  embossed" style="
    color: #83bad9;
    font-weight: 800;
    font-size: 2rem;
    text-shadow: 1px 0px 0px #6253e7;" href="https://reelcareer.co/">ReelCareer</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/job-listings">Job Listings</a></li>
                            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/about">About Us</a></li>
                            <li class="nav-item" id="jobSeekerNavItem"><a class="nav-link" href="https://reelcareer.co/views/job-seeker">Job Seeker</a></li>
                            <li class="nav-item" id="recruiterNavItem"><a class="nav-link" href="https://reelcareer.co/views/recruiter-dashboard">Recruiter Dashboard</a></li>
                            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/blog">Blog</a></li>
                            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/membership">Membership</a></li>
                            <li class="nav-item">
                                <div id="authSection" class="d-flex align-items-center"></div>
                            </li>
                            <li class="nav-item" style="display: none !important">
                                <button id="darkModeToggle" class="btn btn-outline-secondary ml-3" style="display: none !important">Dark Mode</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
  }

  // Function to setup event listeners
  function setupEventListeners() {
    // Dark Mode Toggle functionality
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle?.addEventListener("click", toggleDarkMode);

    // Initialize Dark Mode based on previous settings
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }


  }

  // Function to highlight active links in the navbar
  function highlightActiveLink() {
    const navLinks = document.querySelectorAll(
      ".navbar-nav .nav-item .nav-link"
    );
    navLinks.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active"); // Add the active class to the current page link
      } else {
        link.classList.remove("active"); // Remove it from others
      }
    });
  }


    

  const currentPage = window.location.pathname; // Get the current path from the URL


        let  excludedPages = "/backend";
console.log("currentPage    ",currentPage);

  // Replace the navbar if not on an excluded page
  if (!excludedPages.includes(currentPage)) {
    let existingNavbar = document.querySelector(".navbar");

    // If an existing navbar is found, replace it
    if (existingNavbar) {
      existingNavbar.outerHTML = createNavbar();
    } else {
  // If no existing navbar, append it to the body
  document.body.insertAdjacentHTML("afterbegin", createNavbar());

    }


    setupEventListeners(); // Initialize event listeners
    highlightActiveLink(); // Highlight the active link
  
}
 

  // Function to handle keyboard navigation for dropdowns
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      const target = document.activeElement;
      if (target.classList.contains("dropdown-toggle")) {
        target.click();
      }
    }
  });





  // Insert the footer section
  const companyMediaSectionHTML = `
        <section id="companyMedia" class="bg-light py-5 company-media">
            <div class="container">
           <h2 class="text-center" style="
    color: #83bad9;
    font-weight: 800;
    text-shadow: 1px 0px 0px #6253e7;">Company Media</h2>
    <div class="row" style="text-align: center;">
                    <div class="col-md-6 m-auto">
 <div class="col-md-6 m-auto text-center d-block"> 

    <!-- Video Element with Lazy Loading, Autoplay, Muted, and Responsive -->
<div class="video-container" style="text-align: center; max-width: 100%; margin: 20px auto;">
    <video id="myVideo" loop  autoplay muted loading="lazy" style="max-width: 100%; magrain:auto; height: auto;">
        <source src="https://reelcareer.co/images/intro.MP4" type="video/mp4">
        Your browser does not support the video tag.
  </video>

    <!-- Optional: Custom Play Button -->
    <div class="custom-play-button" id="playButton" style="display: none; background-color: rgba(0, 0, 0, 0.7); color: white; padding: 10px; border-radius: 5px; cursor: pointer;">Play</div>
</div>


<!-- Structured Data for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "ReelCareer Introductory Video",
  "description": "Discover how ReelCareer helps job seekers and employers with a seamless job-hunting experience. Learn how to post jobs, manage applications, and find the perfect career opportunities.",
  "thumbnailUrl": "https://www.reelcareer.co/images/sq_logo_n_BG_tie_reelx.png",
  "uploadDate": "2024-10-23",
  "contentUrl": "https://www.reelcareer.co/images/intro.MP4",
  "embedUrl": "https://www.reelcareer.co/",
  "duration": "PT2M30S"
}
</script>
                    </div>
                    </div>
                    <div class="col-md-6 m-auto">
                        <img src="https://reelcareer.co/images/sq_logo_n_BG_tie_reelx.png" alt="Company Image" class="img-fluid" style="width: 15rem;">
                    </div>
                </div>
            </div>
        </section>
    `;
  document.body.insertAdjacentHTML("beforeend", companyMediaSectionHTML);
});





// Newsletter Signup Functionality
async function handleNewsletterSignup(email) {
  const ipAddress = await getUserIP();
  const location = await getUserLocation();

  // Check if user has already signed up
  if (localStorage.getItem("hasSignedUp")) {
    showToast("You have already subscribed to the newsletter.", 'warning');
    return;
  }

  // Rate Limiting Check
  const currentTime = new Date().getTime();
  if (!firstAttemptTime || currentTime - firstAttemptTime > RATE_LIMIT_TIME) {
    // Reset attempts after the time limit
    attempts = 0;
    firstAttemptTime = currentTime;
  }

  if (attempts >= MAX_ATTEMPTS) {
    showToast(
      "You have exceeded the maximum number of signup attempts. Please try again later."
      , 'warning');
    return;
  }

  attempts++; // Increment the attempt count

  try {
    // Add a new document to the NewsLetter collection
    await db.collection("NewsLetter").add({
      email: email,
      ipAddress: ipAddress,
      location: location,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Store sign-up status in local storage
    localStorage.setItem("hasSignedUp", "true");

    const newsletterMessage = document.getElementById("newsletterMessage");
    newsletterMessage.innerText = `Thank you for subscribing, ${email}!`;
  } catch (error) {
    const newsletterMessage = document.getElementById("newsletterMessage");
    newsletterMessage.innerText = `Error: Unable to subscribe. Please try again later.`;
    console.error("Error adding document: ", error);
  }
}
  // Function to inject styles dynamically
  function addStylesFooter() {
    const styles = `
    .newsletter-signup {
        padding: 20px;
    }
    .custom-checkbox-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 30px;
        color: #fff;
    }
    .custom-checkbox-wrapper input {
        display: none;
    }
    .custom-checkbox-wrapper input:checked ~ .custom-checkbox {
        background-color: #007bff;
    }
    .custom-checkbox-wrapper input:checked ~ .custom-checkbox:before {
        content: "\\2714";
        display: block;
        color: #fff;
        font-size: 12px;
        text-align: center;
    }
    .custom-checkbox {
        width: 20px;
        height: 20px;
        background-color: transparent;
        border: 2px solid #fff;
        border-radius: 3px;
        position: absolute;
        left: 0;
        top: 0;
        transition: background-color 0.3s ease;
    }
    .custom-checkbox:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #newsletterFormBtn:hover {
        background-color: #fff;
        color: #000;
    }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Call the function to add the styles
addStylesFooter();
// Update the footer function (No changes needed for this part)
function updateFooter() {
  const footer = document.getElementById("dynamic-footer");
  const currentYear = new Date().getFullYear();

  // Footer links data (from JSON)
  const footerLinks = [
    {
      "url": "/",
      "name": "ReelCareer",
      "title": "ReelCareer - #1 Job Board - Find a job today",
      "category": "General",
      "order": 0
    },{
      "url": "/views/about",
      "name": "About ReelCareer",
      "title": "About ReelCareer - Who We Are and Our Mission",
      "category": "General",
      "order": 1
    },
    {
      "url": "/views/privacy",
      "name": "Privacy Policy",
      "title": "Privacy Policy - How We Protect Your Data",
      "category": "Legal",
      "order": 2
    },
    {
      "url": "/views/terms",
      "name": "Terms of Use",
      "title": "Terms of Use - Website User Agreement and Guidelines",
      "category": "Legal",
      "order": 3
    },
    {
      "url": "/views/contact",
      "name": "Contact Us",
      "title": "Contact ReelCareer - Get in Touch for Support and Inquiries",
      "category": "General",
      "order": 4
    },
    {
      "url": "/views/blog",
      "name": "Blog",
      "title": "ReelCareer Blog - Career Advice, News, and Insights",
      "category": "Content",
      "order": 5
    },
    {
      "url": "/views/news",
      "name": "News",
      "title": "ReelCareer News - Latest Updates and Industry Trends",
      "category": "Content",
      "order": 6
    },
    {
      "url": "/views/faq",
      "name": "FAQs",
      "title": "Frequently Asked Questions - Get Answers to Common Queries",
      "category": "Support",
      "order": 7
    },
    {
      "url": "/views/referral",
      "name": "Affiliate Program",
      "title": "Join the ReelCareer Affiliate Program and Earn Rewards",
      "category": "Marketing",
      "order": 8
    },
    {
      "url": "/views/Personality-&-Trait-Tests",
      "name": "Personality & Trait Tests",
      "title": "Personality & Trait Tests - Discover Your Strengths and Work Style",
      "category": "Features",
      "order": 9
    },
    {
      "url": "/backend/dashboard",
      "name": "Admin",
      "title": "Admin Dashboard - Manage Users, Jobs, and Content",
      "category": "Admin",
      "order": 10
    },
    {
      "url": "/jobs/city",
      "name": "City Jobs",
      "title": "City Jobs - Find Career Opportunities by Location",
      "category": "Features",
      "order": 11
    },
    {
      "url": "/jobs/state",
      "name": "State Jobs",
      "title": "State Jobs - Explore Job Listings by State",
      "category": "Admin",
      "order": 12
    },
    {
      "url": "/jobs/locations",
      "name": "Job Locations",
      "title": "Job Locations - Browse Jobs in Your Area",
      "category": "Features",
      "order": 13
    },
    {
      "url": "/views/job-listings",
      "name": "Job Listings",
      "title": "Job Listings - Search and Apply for Job Openings",
      "category": "Admin",
      "order": 14
    }
  ];
  
  // Sort the links based on their order
  footerLinks.sort((a, b) => a.order - b.order);

  // Generate the footer HTML content dynamically
  const newContent = `
        <div class="py-4">
            <div class="container text-center">
                <p>&copy; ${currentYear} <a href="${footerLinks[0].url}" class="text-light" rel="noopener noreferrer">${footerLinks[0].name}</a>. All Rights Reserved.</p>
                <ul class="list-inline">
                  ${footerLinks.map(link => `
                    <li class="list-inline-item">
                      <a href="${link.url}" class="text-light" rel="noopener noreferrer" title="${link.title}">${link.name}</a>
                    </li>
                  `).join('')}
                </ul>
                <div class="newsletter-signup">
                    <form id="newsletterForm" class="form-inline justify-content-center mt-4">
                        <input type="email" class="form-control mr-2 mb-2" placeholder="Subscribe to our newsletter" required aria-label="Email address">
                        <select id="newsletterType" class="form-control mr-2 mb-2" required>
                            <option value="website_updates">Website Updates</option>
                            <option value="job_alerts">Job Alerts</option>
                            <option value="career_advice">Career Advice</option>
                            <option value="industry_news">Industry News</option>
                        </select>
                        <label class="ml-2 mr-2 mb-2 custom-checkbox-wrapper">
                            <input type="checkbox" id="dataPrivacy" required>
                            <span class="custom-checkbox"></span> 
                            I agree to the <a href="${footerLinks.find(link => link.category === 'Legal').url}" class="text-light ml-1" rel="noopener noreferrer">data privacy policy</a>.
                        </label>
                        <button type="submit" id="newsletterFormBtn" class="mr-2 mb-2 btn btn-outline-light">Subscribe</button>
                    </form>
                    <p id="newsletterMessage" class="text-light mt-2"></p>
                </div>
                <p class="mt-2">Current Date & Time: <span id="currentDateTime"></span></p>
                <p class="mt-2"><a href="${footerLinks.find(link => link.name === 'Contact Us').url}" class="text-light" rel="noopener noreferrer">Contact Us</a></p>
                <button id="backToTop" class="btn btn-outline-light mt-2">Back to Top</button>
            </div>
        </div>
    `;

  footer.innerHTML = newContent; // Update the footer's HTML content

 // Current Date and Time
  const updateDateTime = () => {
    const now = new Date();
    document.getElementById("currentDateTime").innerText = now.toLocaleString();
  };
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Back to Top Button Functionality
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Update the event listener for the form
  document
    .getElementById("newsletterFormBtn")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      // Check if user agreed to the data privacy policy
      if (!document.getElementById("dataPrivacy").checked) {
        showToast("You must agree to the data privacy policy.", 'warning');
        return;
      }

      // Handle the newsletter signup process
      await handleNewsletterSignup(email);
    });
}

// Call the function to update the footer when the document is loaded
document.addEventListener("DOMContentLoaded", updateFooter);

// let mainDefaultPic =

// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// Handle authentication state changes
function handleAuthStateChanged(user) {
  const authSection = document.getElementById("authSection");
  const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
  const recruiterNavItem = document.getElementById("recruiterNavItem");

  if (user) {
    // If the user is logged in, show profile info and logout button
    const userName = user.displayName || "User";
    const defaultPic = `<img src="https://reelcareer.co/images/sq_logo_n_BG_sm.png" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`;
    const userPhoto = user.profilePic
      ? `<img src="${user.profilePic}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`
      : `${defaultPic}`;

    authSection.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${userPhoto} Welcome, ${userName}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="https://reelcareer.co/views/user">Profile</a>
                        <a class="dropdown-item" href="https://reelcareer.co/views/messaging">Messaging</a>
                        <button id="settingsBtn" class="dropdown-item"">Account Settings</button>
                        <button class="dropdown-item" id="logoutButton">Logout</button>
                    </div>
                </div>
            `;

    // Show Job Seeker and Recruiter links
    jobSeekerNavItem.style.display = "block";
    recruiterNavItem.style.display = "block";

    // Handle logout
    document.getElementById("logoutButton").onclick = logoutUser;
  } else {
    // If the user is not logged in, hide the Job Seeker and Recruiter links
    jobSeekerNavItem.style.display = "none";
    recruiterNavItem.style.display = "none";

    // Show "Login / Create Account" button
    authSection.innerHTML = `
                <button class="btn btn-primary" id="loginButton">Login / Create Account</button>
            `;

    document.getElementById("loginButton").onclick = () => {
      window.location.href = adjustLinkHomeURL + "views/auth"; // Redirect to login page
    };
  }

  // Toggle functionality for the dropdown
  const dropdownToggleButton = document.getElementById("profileDropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (dropdownMenu) {
    dropdownToggleButton.addEventListener("click", function () {
      const isExpanded =
        dropdownToggleButton.getAttribute("aria-expanded") === "true";
      dropdownToggleButton.setAttribute("aria-expanded", !isExpanded);
      dropdownMenu.classList.toggle("show", !isExpanded); // Show or hide the dropdown
    });
  }

  // Close the dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if(dropdownToggleButton){
    if (
      !dropdownToggleButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownToggleButton.setAttribute("aria-expanded", false);
      dropdownMenu.classList.remove("show");
    }
}
  });
}

// profileModal.js

// Function to create the profile modal HTML
function createProfileModal() {
  const modalHTML = `<!-- profileModal -->
      <div id="profileModal" class="modal fade hide" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- Adjusted size for better view -->
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title" id="profileModalLabel">Update Your Profile</h5>
              <button type="button" class="settings-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto;"> <!-- Make the modal body scrollable -->
              <!-- Instructional Text -->
              <p class="text-muted">Keep your profile up to date to improve your visibility and networking opportunities.</p>
              <!-- Tabs for different sections -->
              <ul class="nav nav-tabs" id="profileTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">Personal Info</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="social-tab" data-bs-toggle="tab" data-bs-target="#social" type="button" role="tab" aria-controls="social" aria-selected="false">Social Links</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="membership-tab" data-bs-toggle="tab" data-bs-target="#membership" type="button" role="tab" aria-controls="membership" aria-selected="false">Membership</button>
                </li>
              </ul>
              <div class="tab-content" id="profileTabContent">
                <!-- Personal Info Tab -->
                <div class="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                  <form id="profileForm">
                    <!-- Username -->
                    <div class="mb-3">
                      <label for="usernameSET" class="form-label">Username <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" id="usernameSET" required placeholder="Your desired username">
                      <small id="usernameError" class="text-danger"></small>
                    </div>
                    <!-- Email -->
                    <div class="mb-3 mt-3">
                      <label for="emailSET" class="form-label">Email </label>
                      <div class="form-control" id="emailSET"></div>
                    </div>
                    <!-- Profile Picture Upload -->
                    <div class="mb-3">
                      <label for="profilePictureSET" class="form-label">Profile Picture</label>
                      <div class="input-group">
                        <input type="file" class="form-control" id="profilePictureSET" accept="image/*" onchange="previewProfilePicture(this)">
                        <button type="button" class="btn btn-outline-secondary" id="uploadButton">Upload</button>
                      </div>
                      <img id="profilePicPreviewSET" class="img-thumbnail mt-2" style="display:none; width: 100px;" alt="Profile Picture Preview" />
                    </div>
                    <!-- Name -->
                    <div class="mb-3">
                      <label for="nameSET" class="form-label">Name <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" id="nameSET" required placeholder="Your full name">
                    </div>
                    <!-- Bio -->
                    <div class="mb-3">
                      <label for="bioSET" class="form-label">Bio</label>
                      <textarea class="form-control" id="bioSET" rows="3" maxlength="300" placeholder="Tell us about yourself"></textarea>
                    </div>
                    <!-- Location (Auto-suggest) -->
                    <div class="mb-3">
                      <label for="locationSET" class="form-label">Location</label>
                      <input type="text" oninput="autoSuggest(this,'locationSuggestions')" class="form-control keywordInput location-input" id="locationSET" placeholder="Enter your city or state">
                    </div>
                    <!-- Tags (Skills or Interests) -->
                    <div class="mb-3">
                      <label for="tagsSET" class="form-label">Tags</label>
                      <input type="text" oninput="autoSuggest(this, 'jobRequirementsSuggestions')" class="form-control keywordInput" id="tagsSET" placeholder="Add tags (e.g., JavaScript, Project Management)">
                    </div>
                    <!-- Current Position -->
                    <div class="mb-3">
                      <label for="positionSET" class="form-label">Current Position</label>
                      <input type="text" oninput="autoSuggest(this,'jobSuggestions')" class="form-control keywordInput job-input" id="positionSET" placeholder="Your job title or current role">
                    </div>
                    <!-- Public Profile Checkbox -->
                    <div class="form-check mb-3">
                      <input type="checkbox" class="form-check-input" id="publicProfileSET">
                      <label class="form-check-label" for="publicProfileSET">Public Profile</label>
                    </div>
                    <hr>
                  </form>
                </div>
                <!-- Social Links Tab -->
                <div class="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
                  <form>
                    <div class="mb-3">
                      <label for="linkedinSET" class="form-label">LinkedIn Profile</label>
                      <input type="url" class="form-control" id="linkedinSET" placeholder="https://www.linkedin.com/in/yourprofile">
                    </div>
                    <div class="mb-3">
                      <label for="portfolioSET" class="form-label">Portfolio</label>
                      <input type="url" class="form-control" id="portfolioSET" placeholder="https://portfolio.com/yourprofile">
                    </div>
                    <div class="mb-3">
                      <label for="githubSET" class="form-label">GitHub Profile</label>
                      <input type="url" class="form-control" id="githubSET" placeholder="https://github.com/yourprofile">
                    </div>
                    <div class="mb-3">
                      <label for="otherSET" class="form-label">Other Website</label>
                      <input type="url" class="form-control" id="otherSET" placeholder="https://yourwebsite.com">
                    </div>
                    <hr>
                  </form>
                </div>
                <!-- Membership Status Tab -->
                <div class="tab-pane fade" id="membership" role="tabpanel" aria-labelledby="membership-tab">
                  <div class="mb-3">
                    <label class="form-label">Membership Status</label>
                    <p id="membershipStatusSET" class="badge bg-success">Free</p>
                    <button type="button" class="btn btn-link" id="changeMembershipBtn">Change Membership</button>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Verified Status</label>
                    <p id="verifiedStatusSET" class="badge bg-secondary">Not Verified</p>
                  </div>
                </div>
              </div>
              <!-- User ID -->
              <div class="mb-3 mt-3">
                <label for="userIdSET" class="form-label">User ID </label>
                <div class="text-center" id="userIdSET"></div>
              </div>
              <hr>
              <!-- Deactivate Account -->
              <div class="mt-4">
                <button type="button" class="btn btn-danger" id="deactivateAccountBtn">Deactivate Account</button>
              </div>
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="settings-btn-close btn btn-secondary" data-bs-dismiss="modal" id="saveProfileCloseBtn">Close</button>
              <button type="button" class="btn btn-primary" id="saveProfileBtn">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;

  // Append modal HTML to the body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  function activateTab(selectedTab) {
    // Get all nav-link elements within the profileModal
    const navLinks = document.querySelectorAll("#profileModal .nav-link");

    // Remove the 'active' class from all nav-links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.setAttribute("aria-selected", "false"); // Set aria-selected to false
    });

    // Set the selected tab as active
    selectedTab.classList.add("active");
    selectedTab.setAttribute("aria-selected", "true"); // Set aria-selected to true

    // Get the aria-controls attribute of the selected tab
    const ariaControlsValue = selectedTab.getAttribute("aria-controls");

    // Set the aria-controls value to 'a'
    if (ariaControlsValue) {
      selectedTab.setAttribute("aria-controls", "a");
    }

    // Hide all tab content and show the selected tab content
    const tabContents = document.querySelectorAll(
      "#profileTabContent .tab-pane"
    );
    tabContents.forEach((content) => {
      content.classList.remove("show", "active"); // Remove show and active classes
      content.classList.add("hide");
      content.classList.add("fade"); // Ensure they fade out
    });

    // Show the selected tab content
    const activeContent = document.getElementById(ariaControlsValue);
    if (activeContent) {
      activeContent.classList.add("show", "active"); // Add show and active classes
      activeContent.classList.remove("hide");
    }
  }

  // Function to add listeners to specific tabs
  function addTabListeners() {
    const membershipTab = document.getElementById("membership-tab");
    const socialTab = document.getElementById("social-tab");
    const personalTab = document.getElementById("personal-tab");

    // Add event listeners to each tab
    if (membershipTab) {
      membershipTab.addEventListener("click", function () {
        activateTab(this);
      });
    }

    if (socialTab) {
      socialTab.addEventListener("click", function () {
        activateTab(this);
      });
    }

    if (personalTab) {
      personalTab.addEventListener("click", function () {
        activateTab(this);
      });
    }
  }

  // Initialize tab listeners on page load
  addTabListeners();

  // Add responsiveness
  window.addEventListener("resize", () => {
    // Check if modal is visible
    if (document.body.contains(document.getElementById("profileModal"))) {
      document.getElementById("profileModal").classList.add("modal-lg");
    }
  });

  // Function to preview the profile picture
  function previewProfilePicture(input) {
    const file = input.files[0];
    const preview = document.getElementById("profilePicPreviewSET");

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      preview.style.display = "none";
    }
  }

  // Function to show confirmation dialog before saving changes
  function showConfirmationDialog() {}

  // Function to validate input
  function validateInput() {
    const username = document.getElementById("usernameSET");
    const usernameError = document.getElementById("usernameError");

    if (username.value.trim() === "") {
      usernameError.textContent = "Username is required.";
      return false;
    } else {
      usernameError.textContent = "";
      return true;
    }
  }
}

function populateFormFields(userData) {
  console.log("check last");
  document.getElementById("usernameSET").value = userData.displayName || "";
  document.getElementById("emailSET").innerText = userData.email || "";
  document.getElementById("userIdSET").innerText = userData.userID || "";
  document.getElementById("nameSET").value = userData.name || "";
  document.getElementById("locationSET").value = userData.location || "";
  document.getElementById("bioSET").value = userData.bio || "";
  document.getElementById("tagsSET").value = userData.tags
    ? userData.tags.join(", ")
    : "";
  document.getElementById("positionSET").value = userData.position || "";
  document.getElementById("membershipStatusSET").innerText =
    userData.membershipStatus || "Free";
  document.getElementById(
    "verifiedStatusSET"
  ).innerText = userData.verifiedStatus ? "Verified" : "Not Verified";
  document.getElementById("publicProfileSET").checked =
    userData.publicProfile || false;

  // Populate social media fields
  document.getElementById("linkedinSET").value = userData.linkedin || "";
  document.getElementById("portfolioSET").value = userData.portfoio || "";
  document.getElementById("githubSET").value = userData.github || "";
  document.getElementById("otherSET").value = userData.other || "";

  // Profile picture preview
  if (userData.profilePicture) {
    document.getElementById("profilePicPreviewSET").src =
      userData.profilePicture;
    document.getElementById("profilePicPreviewSET").style.display = "block";
  }

  // Show recruiter fields if user is a recruiter
  if (userData.userType === "recruiter") {
    document.getElementById("recruiterFieldsSET").style.display = "block";
    document.getElementById("companyNameSET").value =
      userData.companyName || "";
  }
}

function initializeProfileModal(user) {
  const profileForm = document.getElementById("profileForm");
  const usernameInput = document.getElementById("usernameSET");
  const nameInput = document.getElementById("nameSET");
  const usernameError = document.getElementById("usernameError");
  const profilePictureInput = document.getElementById("profilePictureSET");
  const profilePicPreview = document.getElementById("profilePicPreviewSET");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  // const publicProfileSET = document.getElementById('publicProfileSET');
  // Register event listeners for closing the modal and deactivating the account
  //          const saveProfileCloseBtn =  document.getElementById('saveProfileCloseBtn');
  //        saveProfileCloseBtn.addEventListener('click', hideModal("profileModal"));

  const profileModal = document.getElementById("deactivateAccountBtn");
  profileModal.addEventListener("click", hideModal("profileModal"));

  document
    .getElementById("saveProfileCloseBtn")
    .addEventListener("click", function () {
      showToast("Profile updated successfully!","success");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("profileModal")
      );
      if (modal) {
        modal.hide();
      }
    });
    profileForm.querySelector('.settings-close-btn').addEventListener('click', () => {
      const modalElement = document.getElementById("jobModal");
      const modal = bootstrap.Modal.getInstance(modalElement); // Use Bootstrap's Modal instance
      if (modal) {
        modal.hide(); // This will close the modal
      }
    });
          
  const closeButton = profileForm.querySelector(".settings-btn-close");
  closeButton.addEventListener("click", function () {
    const modalElement = document.getElementById("jobModal");
    const modal = bootstrap.Modal.getInstance(modalElement); // Use Bootstrap's Modal instance
    if (modal) {
      modal.hide(); // This will close the modal
    }
  });

  // Real-time validation
  usernameInput.addEventListener("input", function () {
    validateField(usernameInput, usernameError, "Username is required");
  });

  nameInput.addEventListener("input", function () {
    validateField(nameInput, null, "Name is required");
  });

  function validateField(input, errorElem, errorMessage) {
    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      if (errorElem) errorElem.textContent = errorMessage;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (errorElem) errorElem.textContent = "";
    }
  }

  // Profile picture live preview
  profilePictureInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicPreview.src = e.target.result;
        profilePicPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Save profile button

  saveProfileBtn.addEventListener("click", async function () {
    const userId = auth.currentUser.uid;
    const profileData = {
      displayName: document.getElementById("usernameSET").value,
      name: document.getElementById("nameSET").value,
      location: document.getElementById("locationSET").value,
      bio: document.getElementById("bioSET").value,
      tags: document
        .getElementById("tagsSET")
        .value.split(",")
        .map((tag) => tag.trim()),
      github: document.getElementById("githubSET").value,
      linkedin: document.getElementById("linkedinSET").value,
      other: document.getElementById("otherSET").value,
      portfolio: document.getElementById("portfolioSET").value,
      position: document.getElementById("positionSET").value,
      publicProfile: document.getElementById("publicProfileSET").checked
    };

    // Check if a new profile picture is being uploaded
    if (document.getElementById("profilePictureSET").files.length > 0) {
      const file = document.getElementById("profilePictureSET").files[0];

      const storageRef = ref(storage, "profilePictures/" + userId); // Use the 'ref' function from the modular SDK
      try {
        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        profileData.profilePicture = downloadURL;
      } catch (error) {
        console.error("Upload failed:", error);
        return; // Exit if upload fails
      }
    }

    saveProfile(userId, profileData);
  });

  function saveProfile(userId, profileData) {
    const userDocRef = doc(db, "Users", userId);
    setDoc(userDocRef, profileData, { merge: true })
      .then(() => {
        // Clear the stored user data in local storage since the profile has changed
        localStorage.removeItem("userData");

        // Optionally show a success message
        // alert('Profile updated successfully');
        //   $('#profileModal').modal('hide');
        hideModal("profileModal");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }
}

// Function to show modal and load user data
async function getModal(user) {
  try {
    if (!user) {
      console.log("No such user!");
      return; // Exit early if no user
    }

    // Check if user data is already in local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      console.log("Using stored user data");
      populateFormFields(storedUserData);
    } else {
      // Fetch user data from Firestore
      const userDocRef = doc(db, "Users", user.uid); // Reference to the user document
      const userDoc = await getDoc(userDocRef); // Get the document

      if (userDoc.exists()) {
        // Check if the document exists
        const userData = userDoc.data();
        console.log("Firebase User Data:", userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        populateFormFields(userData);
      } else {
        console.log("User data not found in Firestore.");
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Event listener for the settings button
      document.getElementById("settingsBtn").addEventListener("click", () => {
        const profileModal = document.getElementById("profileModal");

        // Create modal only when settingsBtn is clicked if it doesn't already exist
        if (!profileModal) {
          createProfileModal(); // Create the modal
          initializeProfileModal(user); // Initialize modal
        } else {
          profileModal.classList.add("show"); // Add Bootstrap's 'show' class
          profileModal.setAttribute("aria-hidden", "false");
        }

        setTimeout(() => {
          getModal(user); // Fetch user data and populate modal
          showModal("profileModal"); // Show modal after getting the data
        }, 300);
      });
    }
  });
});

// Export the objects
export {
  onAuthStateChanged,
  db,
  storage,
  analytics,
  app,
  collection,
  getDocs,
  auth
}; // Export db, storage, and analytics

/*   
      function checkUserProfile(userId) {
        console.log("user id  ", userId);
        console.log("check next to last");
    
        // Fetch user profile using the updated Firestore API for Firebase v9+
        const userDocRef = doc(db, 'Users', userId);
        getDoc(userDocRef).then(docSnapshot => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (!userData.username || !userData.name) {
                createProfileModal();
                $('#profileModal').modal('show');
                          populateFormFields(userData);
            }
          } else {
            // No user data found, show the form for first-time setup
            createProfileModal();
            $('#profileModal').modal('show');
              }
        }).catch(error => {
          console.error("Error fetching user data: ", error);
        });
      }
*/
function createBlogModal() {
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'blogModal';
  modal.tabIndex = '-1';
  modal.setAttribute('aria-labelledby', 'blogModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  // Create modal dialog
  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.id = 'blogModalContent';

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h5');
  modalTitle.className = 'modal-title';
  modalTitle.id = 'blogModalLabel';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  // Append elements to modal header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.id = 'modalBlogBody'; // ID for content insertion

  // Create modal footer
  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  const closeFooterButton = document.createElement('button');
  closeFooterButton.type = 'button';
  closeFooterButton.className = 'btn btn-secondary';
  closeFooterButton.setAttribute('data-bs-dismiss', 'modal');
  closeFooterButton.textContent = 'Close';

  const seeMoreButton = document.createElement('button');
  seeMoreButton.type = 'button';
  seeMoreButton.id = 'seeMoreButton';
  seeMoreButton.className = 'btn btn-primary';
  seeMoreButton.textContent = 'See More';

  // Append buttons to modal footer
  modalFooter.appendChild(closeFooterButton);
  modalFooter.appendChild(seeMoreButton);

  // Assemble modal content
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  // Assemble modal dialog
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // Append modal to body
  document.body.appendChild(modal);
}


window.addEventListener('load', function() {
  window.loadRelatedBlogs = async function(jobTags, containerId) {
      try {


           //Reference the 'Blogs' collection
          const blogsRef = collection(db, 'Blogs');
          const blogContainer = document.getElementById(containerId);
          const showMoreButton = document.createElement('button');
          let allBlogs = []; // Store all blogs
          let displayedBlogs = 0; // Track how many blogs have been displayed
          const blogsPerPage = 3; // Number of blogs to show at a time

          // Function to load more blogs
          function loadMoreBlogs() {
              displayBlogs();
              console.log("Loaded more blogs.");
          }

          // Function to open the modal and show full blog content
          async function openBlogModal(blogId, blogContainer) {
            createBlogModal();

              const blog = allBlogs.find(b => b.id === blogId);

              const modalTitle = document.getElementById('blogModalLabel');
              const modalBody = document.getElementById('modalBlogBody');

              const blogModal =  document.getElementById('blogModal');


             


              // Set the modal title and body content
              modalTitle.textContent = blog.title;
              modalBody.innerHTML = `
                  <img src="${blog.imageUrl}" alt="${blog.title}" class="img-fluid" loading="lazy" />
                  <p>${blog.content}</p>
                  <button class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
                  <button class="btn btn-primary" id="seeMoreButton">See More</button>
              `;

              // Update the view count
        //      await updateViewCount(blogId);

        blogModal.appendChild(modalBody);
        
        modalBody.querySelector('.close').addEventListener('click', () => {
          document.body.removeChild(blogModal); // Remove modal when closed

        });

              // Event listener for the See More button
              document.getElementById('seeMoreButton').onclick = () => {
                  loadMoreBlogs(blog.tags); // Fetch more blogs based on the same tags if desired
              };
          }




          // Function to fetch blogs based on job tags
          async function fetchBlogs(jobTags) {
              try {
                  const q = query(blogsRef, where('tags', 'array-contains-any', jobTags));
                  const querySnapshot = await getDocs(q);

                  // Populate the allBlogs array
                  querySnapshot.forEach(doc => {
                      allBlogs.push({ id: doc.id, ...doc.data() });
                  });

                  console.log("allBlogs:", allBlogs);

                  // Display the first set of blogs
                  displayBlogs();

                  // Create "Show More" button
                  showMoreButton.innerText = "Show More";
                  showMoreButton.className = "btn btn-primary mt-3";
                  showMoreButton.addEventListener('click', loadMoreBlogs);
                  blogContainer.appendChild(showMoreButton);
              } catch (error) {
                  console.error("Error fetching related blogs:", error);
              }
          }

          // Function to display blogs
          function displayBlogs() {
              const blogsToShow = allBlogs.slice(displayedBlogs, displayedBlogs + blogsPerPage);
              console.log("Displaying blogs...");

              blogsToShow.forEach(blog => {
                  const blogCard = document.createElement('div');
                  blogCard.classList.add('col-md-4', 'mb-4'); // Use Bootstrap column classes for spacing
                  blogCard.innerHTML = `
                      <div class="card blog-card shadow-sm">
                          <div data-bs-toggle="modal" data-bs-target="#blogModal" class="blog-card-trigger" data-blog-id="${blog.id}">
                               <a href="https://reelcareer.co/views/blog?id=${blog.id}"><img src="${blog.imageUrl}" alt="${blog.title}" class="card-img-top" loading="lazy" /></a>
                          </div>
                          <div class="card-body">
                               <a href="https://reelcareer.co/views/blog?id=${blog.id}"><h5 class="card-title text-primary">${blog.title}</h5></a>
                              <p class="card-text text-muted">
<div>${truncateText(blog.content, 80, `https://reelcareer.co/views/blog?id=${blog.id}`)}</div>
                              </p>
                              <button class="btn btn-outline-primary blog-card-trigger" data-blog-id="${blog.id}">Read More</button>
                          </div>
                      </div>
                  `;
                  blogContainer.appendChild(blogCard);
              });

              displayedBlogs += blogsToShow.length;

              // Hide button if no more blogs to display
              if (displayedBlogs >= allBlogs.length) {
                  showMoreButton.style.display = 'none'; // Hide the button if there are no more blogs
              }
          }

          // Event listener for blog cards to open modal
          blogContainer.addEventListener('click', function(e) {
              if (e.target.classList.contains('blog-card-trigger')) {
                  const blogId = e.target.getAttribute('data-blog-id');

  console.log("????????????????????????? openBlogModal  ",blogId);
                  openBlogModal(blogId, blogContainer);
              }
          });

          // Function to update the view count for the blog
          async function updateViewCount(blogId) {
              const blogRef = doc(db, 'Blogs', blogId);
              await updateDoc(blogRef, {
                  views: increment(1) // Increment the views count by 1
              });
          }

          // Start fetching blogs
          await fetchBlogs(jobTags);

      } catch (error) {
          console.error("Error in loadRelatedBlogs:", error);
      }
  };
});

// Load the function only after the page has fully loaded

/*
window.addEventListener('load', () => {
  // Call the function with job tags and the container ID when needed
  // Example: window.loadRelatedBlogs(['tech', 'web development'], 'blogContainer');
});
const jobTags = ['tag1', 'tag2']; // Replace with your actual job tags
loadRelatedBlogs(jobTags, 'blogContainer'); // Replace 'blogContainer' with your actual container ID

<div class="related-blogs">
    <h3 class="font-weight-bold">Related Articles</h3>
    <hr class="my-2" />
    <div id="blogContainer" class="row p-4">
        <!-- Blog links will be dynamically inserted here -->
    </div>
</div>

*/

// Function to create and add styles for tag-primary and other elements
function getSimilarJobsStyles() {
  const style = document.createElement("style");
  style.textContent = `

  
  /* Style for similar jobs container */
.similar-jobs {
  margin-top: 30px;
}

.similar-job-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.similar-job-card:hover {
  transform: translateY(-5px);
}

.similar-job-card h5 {
  font-size: 1.25rem;
  color: #80b6d5;
  font-weight: 600;
}

.similar-job-card .job-tags {
  margin-top: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}

.similar-job-card .badge {
  background-color: #80b6d5;
  color: #e9ecef;
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.similar-job-card .view-job-btn {
  margin-top: 10px;
  text-align: right;
  display: block;
  text-decoration: none;
  color: #fff;
  background-color: #80b6d5 !important;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.similar-job-card .view-job-btn:hover {
  background-color: #aaabac;
}

.similar-job-card .empty-state {
  padding: 20px;
  border: 2px dashed #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.similar-job-card .empty-state i {
  color: #ccc;
}

.similar-job-card .empty-state p {
  font-size: 1.1em;
  color: #666;
}

.similar-job-card .job-info-box {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 15px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.similar-job-card .job-info-box:hover {
  background-color: #e9ecef;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.similar-job-card .job-info {
  line-height: 1.2;
}

.similar-job-card .job-info p {
  margin: 5px 0;
}

.similar-job-card .job-info strong {
  color: #6c757d;
  font-weight: 600;
}

.similar-job-card .job-info span {
  font-weight: 400;
}

/* Buttons */
.similar-job-card .btn-primary {
  background-color: #639ad4 !important;
  color: white;
  border: none;
  border-radius: 5px;
}

.similar-job-card .btn {
  border-radius: 25px;
}

.similar-job-card .btn-outline-secondary:hover {
  background-color: #e9ecef;
}

/* Box Shadows */
.similar-job-card .shadow-sm {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.similar-job-card .text-indent {
  text-indent: 1.5rem;
}

.similar-job-card img.job-logo {
  width: 150px;
  height: 150px;
}

/* Job Tags */
.similar-job-card .job-tags button {
  background-color: #83bad9;
}

.similar-job-card .job-tags button:hover {
  background-color: #0056b3;
}

.similar-job-card .text-muted {
  font-size: 1rem;
  line-height: 1.6;
}

  `;
  document.head.appendChild(style);
}



window.addEventListener('load', function() {
  window.getSimilarJobs = async function(jobTags, containerId) {
  const maxSimilarJobs = 5; // Limit the number of similar jobs displayed
  const JobsContainer = document.getElementById(containerId);
  getSimilarJobsStyles();
  try {
      // Reference to the 'Jobs' collection and query based on tags
      const jobsRef = collection(db, 'Jobs');
      const q = query(jobsRef, where('tags', 'array-contains-any', jobTags), limit(maxSimilarJobs));
      const querySnapshot = await getDocs(q);

      if(!JobsContainer || querySnapshot.empty) {
     /*   displayEmptyState(JobsContainer, 'No related jobs found.', 'fas fa-briefcase');  */
        return;
      }
      // Clear the specified jobs container
      JobsContainer.innerHTML = ''; // Reset the container for fresh data

      querySnapshot.forEach(doc => {
          const similarJob = doc.data();
          
          // Skip displaying the current job itself if desired (optional, can add logic here)
          // if (doc.id === currentJobId) return;

          // Create the card element for similar jobs
          const jobCard = document.createElement('div');
          jobCard.classList.add('col-md-6', 'col-lg-4', 'mb-3');
          jobCard.innerHTML = `
              <div class="similar-job-card">
                  <!-- Job Title as a Link -->
                  <h5><a href="https://reelcareer.co/views/job-details?id=${doc.id}" class="job-title-link">${similarJob.title}</a></h5>
                  <p><strong>${similarJob.company}</strong> - ${formatLocation(similarJob.location)}</p>
                  <p class="card-text"><strong>Type:</strong> ${formatJobType(similarJob.type)}</p>
                  <p class="card-text"><strong>Salary:</strong> ${formatCurrency(similarJob.salary, { decimals: 0 })}</p>

                  <!-- Display job tags as clickable buttons -->
                  <div class="job-tags mt-2">
                      ${similarJob.tags.map(tag => `
                          <a href="https://reelcareer.co/views/job-listings?tag=${encodeURIComponent(tag)}" class="btn btn-primary badge" style="margin: 0.2rem;">
                              ${tag}
                          </a>
                      `).join('')}
                  </div>

                  <!-- View Job Button -->
                  <a href="https://reelcareer.co/views/job-details?id=${doc.id}" class="view-job-btn">View Job</a>
              </div>
          `;

          // Append the card to the specified container
          JobsContainer.appendChild(jobCard);
      });
  } catch (error) {
      console.error("Error fetching similar jobs: ", error);
      displayEmptyState(JobsContainer, 'Error loading similar jobs.', 'fas fa-briefcase');
  }
}
});

// Function to display an empty state message
function displayEmptyState(container, message, iconClass = 'fas fa-search') {
  container.innerHTML = `
  <div class="empty-state text-center my-4">
      <i class="${iconClass} fa-3x text-muted"></i>
      <p class="text-muted mt-2">${message}</p>
  </div>
`;
}

/*
// Call the function with jobTags and a container element as arguments
const JobsContainer = document.getElementById('similarJobsContainer'); // Example target container
getSimilarJobs(jobTags, JobsContainer);
*/









function roll_in_animations(){
   // Inject CSS Styles
   const loading_style = document.createElement('style');
   loading_style.innerHTML = `
       /* Hide body initially */
       body.hidden { 
           opacity: 0; 
           overflow: hidden;
       }
   
       /* Hidden state for .main child divs */
       .main > div {
           opacity: 0;
           transform: translateX(-100%);
           transition: opacity 0.6s ease, transform 0.6s ease;
       }
   
       /* Roll-in effect */
       .main > div.roll-in {
           opacity: 1;
           transform: translateX(0);
       }
   `;
   document.head.appendChild(loading_style);
   
   // Roll-in function
   document.addEventListener("DOMContentLoaded", function () {
       const mainDivs = document.querySelectorAll(".main > div");
       let delay = 2000; // Delay between roll-ins, in milliseconds
   console.log("Hiding  ??????????/");
       // Hide body initially
       document.body.classList.add("hidden");
   
       // Reveal body and trigger roll-in animations
       setTimeout(() => {
           document.body.classList.remove("hidden");
   
           // Sequentially add the "roll-in" class to each div with a delay
           mainDivs.forEach((div, index) => {
               setTimeout(() => {
                console.log("showing  ??????????/   ",index);

                   div.classList.add("roll-in");
               }, index * delay);
           });
       }, 2000); // Initial delay before body appears
   });

  }

 // roll_in_animations();


function setBreadcrumb(){

  // Get the ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Assuming the ID is passed as a query parameter 'id'
  const jobId = urlParams.get("jobId");
  
  // Select the last breadcrumb anchor
  const lastBreadcrumb = document.getElementById("lastBreadcrumb_a");
  const breadcrumbjobTitleActive = document.getElementById("breadcrumb-active-title");
  const appyJobTitle = document.getElementById("appyJobTitle");
  
  if (id && lastBreadcrumb){
      lastBreadcrumb.href = `https://reelcareer.com/views/job-details?id=${id}`;
  } 
  if (jobId && lastBreadcrumb){
    lastBreadcrumb.href = `https://reelcareer.com/views/job-details?id=${jobId}`;
} 

  if (breadcrumbjobTitleActive && appyJobTitle){
    breadcrumbjobTitleActive.innerText = appyJobTitle.innerText;
  }
 // console.log("setBreadcrumb  ??????????/   ",id, "xxxx   ",jobTitle.innerText);

}
 
window.setBreadcrumb = setBreadcrumb;

 document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    setBreadcrumb();
  }, 1500); // 2000 milliseconds = 2 seconds
  });


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

    window.getUserIP = getUserIP;

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

   // console.log("start tracking");
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

window.attachTrackingListeners = attachTrackingListeners;

function getScrollDepthPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // Calculate the percentage of page scrolled
  const scrollPercentage = (scrollTop + windowHeight) / fullHeight * 100;

  // Ensure percentage stays within 0-100 range
  return Math.min(100, Math.max(0, scrollPercentage.toFixed(2)));
}

let maxScrollDepth = 0;

window.addEventListener('scroll', () => {
    const currentScrollDepth = getScrollDepthPercentage();
    maxScrollDepth = Math.max(maxScrollDepth, currentScrollDepth);
   // console.log(`Current Scroll Depth: ${currentScrollDepth}%`);
  ///  console.log(`Max Scroll Depth: ${maxScrollDepth}%`);
});

// Function to determine the correct `ViewedBy` field based on the URL
function getViewedByField() {
    const path = window.location.pathname;
    const page = path === '/' || path === '/index.html' ? 'home' : path.split('/').filter(Boolean).pop();
    
    return `${page}ViewedBy`;
}


// Function to update view data on unload or visibility change
 async function updateViewData(ipAddress, actionTrack, actionName, pageTitle, jobTitleName  ) {
    const viewEndTime = Date.now();
    const durationOfTheView = (viewEndTime - viewStartTime) / 1000;
    const viewedByField = getViewedByField();

    console.log(`${durationOfTheView} durationOfTheView ???????? .`);


    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");

    let userData = '';

    if (storedUserData) {
      // Parse the stored data
       userData = JSON.parse(storedUserData);
  } 

    if (!ipAddress && !userData.ipAddress ) {
      console.error("Missing IP address. View data not recorded.");
      return;
  }
    // Dynamically set the field for the viewed page
    const viewData = {
        [viewedByField]: {
            viewDate: new Date().toISOString(),
            viewMethod: navigator.userAgentData?.mobile ? "mobile" : "desktop",
            durationOfView: durationOfTheView,
            maxScrollDepth: maxScrollDepth,
            viewsCount: increment(1),
            viewSource: getViewSource(),
            actionTrack: actionTrack,
            actionName: actionName,
            pageTitle: pageTitle,
            jobTitleName: jobTitleName,
            lastViewDate: new Date().toISOString()


        },
        ipAddress: ipAddress || userData.ipAddress,
        name: userData.name || 'N/A',
        displayName: userData.displayName || 'N/A',
        userID: userData.userID || 'N/A',
        lastLogin: userData.lastLogin || 'N/A',
        city: locationData.city || 'N/A',
        state: locationData.region || 'N/A',
        zip: locationData.postal || 'N/A',
        country: locationData.country_name || 'N/A',
        // Additional Data
        browser: navigator.userAgentData?.brands?.[0]?.brand || navigator.userAgent,
        os: navigator.platform || 'N/A',
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        referrer: document.referrer || 'Direct',
        entryURL: window.location.href,
        networkType: navigator.connection?.effectiveType || 'N/A',
        connectionSpeed: navigator.connection?.downlink || 'N/A',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'N/A',
        language: navigator.language || 'N/A',
        lastUpdate: new Date().toISOString(),
        userActivitiesCount: increment(1),
        totalDuration: increment(durationOfView),
        userBlocked: false
    };

    try {
        await setDoc(doc(db, 'Analytics', ipAddress || userData.ipAddress), viewData, { merge: true });
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
 

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
         // console.log("TrackingListeners  last");

            updateViewData(ipAddress, "visibilitychange");
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





  document.addEventListener('click', function (event) {

   

let TrackingOn = true;
    // Get the clicked element
    const target = event.target;
    let interceptTimer = 300;

//    console.log("TrackingOn: ", TrackingOn);
   // console.log("interceptTimer: ", interceptTimer);

   if (window.checkUrl("/backend/") || window.checkUrl("/backend")) {
    TrackingOn = false;
   }

if(TrackingOn){



        // Get the page title
        const pageTitle = document.title;
       // console.log(`Page title: ${pageTitle}`);
        let jobTitleName = '';

        const jobTitle = document.getElementById("jobTitle");
        const appyJobTitle = document.getElementById("appyJobTitle");
        if (jobTitle){
          jobTitleName = jobTitle.innerText;
         // console.log(`Job title: ${jobTitleName}`);
         handleJobInput(jobTitleName);

        }
        if (appyJobTitle){
           jobTitleName = appyJobTitle.innerText;
// Visiting the job
handleJobInput(jobTitleName, "visit");
        }
      

    // Check if it's an anchor tag
    if (target.tagName === 'A' || target.closest('a')) {
        // Prevent default link navigation
        event.preventDefault();

        // Get the URL of the anchor
        const href = target.href || target.closest('a').href;

             // Get the URL and inner text of the anchor
             const linkText = target.innerText.trim();
   
             
             // Perform a custom action before navigating
         //    console.log(`Intercepted link: ${href}`);
          //   console.log(`Link text: ${linkText}`);


             updateViewData(ipAddress, "link", linkText, pageTitle, jobTitleName  );
        // Timeout before proceeding
        setTimeout(() => {
            // Navigate to the URL
            window.location.href = href;
        }, interceptTimer); // Delay for 1 second
    } else if (typeof target.onclick === 'function' || target.hasAttribute('onclick')) {
        // Intercept buttons or elements with onclick handlers
        event.preventDefault();

        // Handle inline onclick attribute
        if (target.hasAttribute('onclick')) {

          // Get the onclick attribute and the inner text of the element
        const onclickAttr = target.getAttribute('onclick');
        const elementText = target.innerText.trim();

        // Log the onclick attribute and the inner text
       // console.log(`Intercepted inline onclick: ${onclickAttr}`);
      //  console.log(`Element text: ${elementText}`);

        updateViewData(ipAddress, onclickAttr, elementText, pageTitle, jobTitleName  );

            // Timeout before manually executing the inline onclick
            setTimeout(() => {
                // Inline onclick execution (using eval)
                eval(onclickAttr);
            }, interceptTimer); // Delay for 1 second
        } else if (typeof target.onclick === 'function') {

                 // Prevent default action
        event.preventDefault();
        // Get the onclick handler function
        const onclickFunction = target.onclick;

        // Extract the function name (if available)
        const functionName = onclickFunction.name || '(anonymous)';

        // Get the inner text of the element
        const elementText = target.innerText.trim();

    /*    // Log the function name and the element text
        console.log('Intercepted programmatic onclick handler.');
        console.log(`Function name: ${functionName}`);
        console.log(`Element text: ${elementText}`);
*/
        updateViewData(ipAddress, functionName, elementText, pageTitle, jobTitleName  );
            // Save the original onclick handler
            const handler = target.onclick;

            // Timeout before manually triggering the original handler
            setTimeout(() => {
                handler.call(target, event); // Execute the handler in the correct context
            }, interceptTimer); // Delay for 1 second
        } if (target.tagName === 'BUTTON' && target.type === 'submit') {
          // Prevent the default submit action
          event.preventDefault();
  
          // Get the button text
          const buttonText = target.innerText.trim();
      //    console.log(`Intercepted button: ${buttonText}`);
  
      if (appyJobTitle){
        jobTitleName = appyJobTitle.innerText;
      // Applying for the job
handleJobInput(jobTitleName, "apply");
      }


          // Find the closest form element
          const form = target.closest('form');
  
          if (form) {
              // Log the form's name or id
              const formName = form.getAttribute('name') || '(no name)';
              const formId = form.id || '(no id)';
             // console.log(`Associated form: Name = ${formName}, ID = ${formId}`);

              const formNameId = formName || formId;

  
              updateViewData(ipAddress, formNameId, buttonText, pageTitle, jobTitleName  );

              // Delay before submitting the form
              setTimeout(() => {
            //      console.log('Proceeding with the submit action after delay.');
                  form.submit(); // Trigger the form submission programmatically
              }, interceptTimer); // Delay by 1 second
          } else {
          //    console.log('No associated form found for this submit button.');
  
        // Check if the button is inside a class job-tags
        if (target.closest('.job-tags')) {
       
          // Add the button text to the array if not already present
          if (!userTagInterest.includes(buttonText)) {
              userTagInterest.push(buttonText);
              handleTagInput(userTagInterest);
            }

      }


              // Optionally, handle cases where no form is present
              setTimeout(() => {
            //      console.log('No form submission performed.');
              }, interceptTimer); // Delay for consistency
          }
      }
    }

}

});

/*

////////////////////////////////////////
/////////////////////    handleJobInput  ////////////////////////////////////////////////////////////



*/
function handleJobInput(jobInput, action = "visit") { 
  // Helper function to compare jobs for similarity
  function isSimilarJob(job1, job2) {
    return job1.trim().toLowerCase().includes(job2.trim().toLowerCase());
  }

  // Helper function to decay ranks
  function decayRanks(userJobInterest, decayFactor = 0.9) {
    return userJobInterest.map(job => ({
      ...job,
      rank: Math.max(1, Math.floor(job.rank * decayFactor)) // Ensure rank does not go below 1
    }));
  }

  // Helper function to prioritize jobs
  function prioritizeJobs(userJobInterest) {
    return userJobInterest.sort((a, b) => b.rank - a.rank);
  }

  // Main logic
  let userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];

  // Decay existing ranks
  userJobInterest = decayRanks(userJobInterest);

  // Rank increment values
  const rankIncrement = action === "apply" ? 5 : 2;

  // Check if a similar job already exists
  const existingJobIndex = userJobInterest.findIndex(item => 
    isSimilarJob(item.job, jobInput)
  );

  if (existingJobIndex !== -1) {
    // Increment rank if a similar job exists
    userJobInterest[existingJobIndex].rank += rankIncrement;
  } else {
    // Add a new job if it doesn't already exist
    const newJob = { job: jobInput.trim(), rank: rankIncrement };
    if (userJobInterest.length === 6) {
      // If at capacity, replace the "last" job or least popular job
      const lastJobIndex = userJobInterest.findIndex(item => item.isLast);
      if (lastJobIndex !== -1) {
        userJobInterest.splice(lastJobIndex, 1, newJob);
      } else {
        userJobInterest = prioritizeJobs(userJobInterest);
        userJobInterest.pop();
        userJobInterest.push(newJob);
      }
    } else {
      // Add the new job directly if space is available
      userJobInterest.push(newJob);
    }
  }

  // Mark the most recently clicked job as "last"
  userJobInterest.forEach(item => (item.isLast = false));
  const currentJobIndex = userJobInterest.findIndex(item => 
    isSimilarJob(item.job, jobInput)
  );
  if (currentJobIndex !== -1) {
    userJobInterest[currentJobIndex].isLast = true;
  }

  // Prioritize popular jobs and save
  userJobInterest = prioritizeJobs(userJobInterest);
  localStorage.setItem('userJobInterest', JSON.stringify(userJobInterest));

  return userJobInterest.map(item => item.job); // Return the updated job list as strings
}

window.handleJobInput = handleJobInput;

// Function to retrieve and log jobs as a simple array
function getUserJobInterest() {
  const userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];
  const jobArray = userJobInterest.map(item => item.job); // Extract only the jobs
  console.log('User Job Interests:', jobArray);
  return jobArray;
}


/*
const jobInterest = getUserJobInterest();
console.log('const jobInterest =', JSON.stringify(jobInterest));
*/


window.getUserJobInterest = getUserJobInterest;

/*

////////////////////////////////////////
/////////////////////    handleTagInput  ////////////////////////////////////////////////////////////



*/


function handleTagInput(tagInput) {
  // Helper function to compare tags for similarity
  function isSimilarTag(tag1, tag2) {
    return tag1.trim().toLowerCase().includes(tag2.trim().toLowerCase());
  }

  // Helper function to decay ranks
  function decayRanks(userTagInterest, decayFactor = 0.9) {
    return userTagInterest.map(tag => ({
      ...tag,
      rank: Math.max(1, Math.floor(tag.rank * decayFactor)) // Ensure rank does not go below 1
    }));
  }

  // Helper function to prioritize tags
  function prioritizeTags(userTagInterest) {
    return userTagInterest.sort((a, b) => b.rank - a.rank);
  }

  // Main logic
  let userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];

  // Decay existing ranks
  userTagInterest = decayRanks(userTagInterest);

  // Check if a similar tag already exists
  const existingTagIndex = userTagInterest.findIndex(item => 
    isSimilarTag(item.tag, tagInput)
  );

  if (existingTagIndex !== -1) {
    // Increment rank if a similar tag exists
    userTagInterest[existingTagIndex].rank += 1;
  } else {
    // Add a new tag if it doesn't already exist
    const newTag = { tag: tagInput.trim(), rank: 1 };
    if (userTagInterest.length === 6) {
      // If at capacity, replace the "last" tag or least popular tag
      const lastTagIndex = userTagInterest.findIndex(item => item.isLast);
      if (lastTagIndex !== -1) {
        userTagInterest.splice(lastTagIndex, 1, newTag);
      } else {
        userTagInterest = prioritizeTags(userTagInterest);
        userTagInterest.pop();
        userTagInterest.push(newTag);
      }
    } else {
      // Add the new tag directly if space is available
      userTagInterest.push(newTag);
    }
  }

  // Mark the most recently clicked tag as "last"
  userTagInterest.forEach(item => (item.isLast = false));
  const currentTagIndex = userTagInterest.findIndex(item => 
    isSimilarTag(item.tag, tagInput)
  );
  if (currentTagIndex !== -1) {
    userTagInterest[currentTagIndex].isLast = true;
  }

  // Prioritize popular tags and save
  userTagInterest = prioritizeTags(userTagInterest);
  localStorage.setItem('userTagInterest', JSON.stringify(userTagInterest));

  return userTagInterest.map(item => item.tag); // Return the updated tag list as strings
}

window.handleTagInput = handleTagInput;

// Function to retrieve and log tags as a simple array
function getUserTagInterest() {
  const userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];
  const tagArray = userTagInterest.map(item => item.tag); // Extract only the tags
  console.log('User Tag Interests:', tagArray);
  return tagArray;
}


window.getUserTagInterest = getUserTagInterest;



localStorage.getItem('userTagInterest')

// Function to check if the user is logged in
function checkUserLoginStatus() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log('User is logged in:', user);
      localStorage.setItem('userLoggedIn', true);
      handleAuthStateChanged(user); // Call your function to handle authenticated user

      return user;
    } else {
      localStorage.setItem('userLoggedIn', false);
      handleAuthStateChanged(null); // Call your function to handle no user signed in

      // No user is signed in
      console.log('No user is logged in.');
      return false;
    }
  });

}

window.checkUserLoginStatus = checkUserLoginStatus;



// Check if user is logged in and handle admin area access
function checkLogin() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Redirect to home if user is not logged in and is in the admin area
  if (window.location.pathname.includes('/backend')) {
      if (!isLoggedIn) {
          if (window.location.pathname.includes('/backend')) {
              showToast('You need to log in to access the Admin area.');
          } else {
              // Redirect to login page or main admin page
              window.location.href = '/backend/dashboard/';
          }
      } else if (window.location.pathname.includes('/backend') || window.location.pathname.includes('/backend/index') || window.location.pathname.includes('/backend/')) {
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
        logoutUser();
      }, parseInt(savedMinutes) * 60 * 1000);


      showToast(`Auto logout initialized for ${savedMinutes} minutes.`);
  } else {
     // showToast('Auto logout is disabled.');
  }
}

window.initializeAutoLogout = initializeAutoLogout;


  // Function to update navigation visibility based on user role
  function updateNavVisibility(user) {
    const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
    const recruiterNavItem = document.getElementById("recruiterNavItem");

    if (user) {
      // Display items based on user roles
      jobSeekerNavItem.style.display =
        user.role === "jobSeeker" ? "block" : "none";
      recruiterNavItem.style.display =
        user.role === "recruiter" ? "block" : "none";
    } else {
      // Hide both items if not logged in
      jobSeekerNavItem.style.display = "none";
      recruiterNavItem.style.display = "none";
    }
  }

  window.updateNavVisibility = updateNavVisibility;
// Initialization
document.addEventListener('DOMContentLoaded', () => {
  checkLogin(); // Ensure login is valid on page load
let user =   checkUserLoginStatus();
updateNavVisibility(user);
    
if (window.checkUrl("/backend/") || window.checkUrl("/backend")) {
  console.log("Admin View");
  initializeAutoLogout();
} else {
  console.log("User View");
  attachTrackingListeners();
}


});



