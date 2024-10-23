/*
    
<!-- Firebase configuration/ Login& Out -->
<script src="../public/js/main.js"></script> 

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
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
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
    if (window.location.pathname === "/views/auth.html") {
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
      alert(error.message);
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
    alert(error.message);
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
      alert(error.message);
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
    alert(error.message);
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
      alert(error.message);
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
    alert(error.message);
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
    alert(`Error during logout: ${error.message}`);
  } finally {
    hideLoading(); // Hide loading indicator
  }
};

// Function to logout the user
async function logoutUser() {
  try {
    await firebase.auth().signOut();
    window.location.href = adjustLinkHomeURL + "views/auth"; // Redirect to login page after logout
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Logout button on any page
document.getElementById("logout-button")?.addEventListener("click", logout);

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
        <p class="form-link">Don't have an account? <a href="/views/auth.html">Create an account</a></p>
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

// myModule.js
export function setupLinks() {
  const {
    currentPage,
    adjustLinkURL,
    adjustLinkHomeURL,
    excludedPages
  } = getAdjustedLinks();
  // Use adjustLinkURL and adjustLinkHomeURL as needed within the module
}

// Navigation bar
document.addEventListener("DOMContentLoaded", function () {
  console.log("checkUserProfile");
  function checkUserProfile() {
    var profileModal = document.getElementById("profileModal");
    var modalInstance = bootstrap.Modal.getInstance(profileModal);
    modalInstance.hide();
  }

  // Optionally, you can call it directly in the module if needed
  const {
    currentPage,
    adjustLinkURL,
    adjustLinkHomeURL,
    excludedPages
  } = getAdjustedLinks();
  console.log(adjustLinkURL, adjustLinkHomeURL);

  // Function to create the navbar
  function createNavbar() {
    const isHomePage =
      currentPage === "/index.html" ||
      "/index" ||
      currentPage === "" ||
      currentPage === "/";
    const navbarClass = isHomePage
      ? "navbar-light bg-light"
      : "navbar-dark bg-primary";

    return `
            <nav class="navbar navbar-expand-lg ${navbarClass} shadow-sm sticky-top" role="navigation">
                <div class="container">
                 <a class="navbar-brand" style="
    color: #83bad9;
    font-weight: 800;
    font-size: 2rem;
    text-shadow: 1px 0px 0px #6253e7;" href="${adjustLinkHomeURL}index">ReelCareer</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}job-listings">Job Listings</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}about">About Us</a></li>
                            <li class="nav-item" id="jobSeekerNavItem"><a class="nav-link" href="${adjustLinkURL}job-seeker">Job Seeker</a></li>
                            <li class="nav-item" id="recruiterNavItem"><a class="nav-link" href="${adjustLinkURL}recruiter-dashboard">Recruiter Dashboard</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkHomeURL}views/blog">Blog</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}membership">Membership</a></li>
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

    // Firebase Authentication listener
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleAuthStateChanged(user); // Call your function to handle authenticated user
      } else {
        handleAuthStateChanged(null); // Call your function to handle no user signed in
      }
    });
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
 <div class="col-md-6 m-auto text-center"> 

    <!-- Video Element with Lazy Loading, Autoplay, Muted, and Responsive -->
<div class="video-container" style="text-align: center; max-width: 100%; margin: 20px auto;">
    <video id="myVideo" loop  autoplay muted loading="lazy" style="max-width: 100%; height: auto;">
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
  "uploadDate": "2023-10-23",
  "contentUrl": "https://www.reelcareer.co/images/intro.MP4",
  "embedUrl": "https://www.reelcareer.co/",
  "duration": "PT2M30S"
}
</script>
                    </div>
                    </div>
                    <div class="col-md-6 m-auto">
                        <img src="${adjustLinkHomeURL}images/sq_logo_n_BG_tie_reelx.png" alt="Company Image" class="img-fluid" style="width: 15rem;">
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
    alert("You have already subscribed to the newsletter.");
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
    alert(
      "You have exceeded the maximum number of signup attempts. Please try again later."
    );
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

  const newContent = `
        <div class="bg-dark text-light py-4">
            <div class="container text-center">
                <p>&copy; ${currentYear} <a href="${adjustLinkURL}about" class="text-light" rel="noopener noreferrer">ReelCareer</a>. All Rights Reserved.</p>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}public/privacy" class="text-light" rel="noopener noreferrer">Privacy Policy</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}public/terms" class="text-light" rel="noopener noreferrer">Terms of Use</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}contact" class="text-light" rel="noopener noreferrer">Contact Us</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}blog" class="text-light" rel="noopener noreferrer">Blog</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}news" class="text-light" rel="noopener noreferrer">News</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}faq" class="text-light" rel="noopener noreferrer">FAQs</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}referral" class="text-light" rel="noopener noreferrer">Affiliate Program</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}Personality-&-Trait-Tests" class="text-light" rel="noopener noreferrer">Personality & Trait Tests</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}backend/dashboard" class="text-light" rel="noopener noreferrer">Admin</a></li>
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
            I agree to the <a href="${adjustLinkHomeURL}public/privacy" class="text-light ml-1" rel="noopener noreferrer">data privacy policy</a>.
        </label>

        <button type="submit" id="newsletterFormBtn" class="mr-2 mb-2 btn btn-outline-light">Subscribe</button>
    </form>

    <p id="newsletterMessage" class="text-light mt-2"></p>
</div>

                <p class="mt-2">Current Date & Time: <span id="currentDateTime"></span></p>
                <p class="mt-2"><a href="${adjustLinkURL}contact" class="text-light" rel="noopener noreferrer">Contact Us</a></p>
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
        alert("You must agree to the data privacy policy.");
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
    const defaultPic = `<img src="${adjustLinkHomeURL}images/sq_logo_n_BG_sm.png" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`;
    const userPhoto = user.profilePic
      ? `<img src="${user.profilePic}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`
      : `${defaultPic}`;

    authSection.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${userPhoto} Welcome, ${userName}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="${adjustLinkURL}user">Profile</a>
                        <a class="dropdown-item" href="${adjustLinkURL}messaging">Messaging</a>
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
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="saveProfileCloseBtn">Close</button>
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
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("profileModal")
      );
      if (modal) {
        modal.hide();
      }
    });

  const closeButton = document.querySelector(".btn-close");
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


