
/*
    
<!-- Firebase configuration/ Login& Out -->
<script src="../public/js/main.js"></script> 

*/

// main.js



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, updateDoc, setDoc, serverTimestamp, collection, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
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
const appleProvider = new OAuthProvider('apple.com');

// Loading Indicator
const loadingIndicator = document.getElementById('loading-indicator');
const showLoading = () => loadingIndicator.style.display = 'block';
const hideLoading = () => loadingIndicator.style.display = 'none';

let UserID = "";
let userData = "";

// Function to update or create user information in Firestore
const saveUserLoginState = async (user) => {
    try {
        const ip = await getUserIP();
        const location = await getUserLocationByIP(ip);

        // Prepare data for user document
        const userData = {
            email: user.email,
            profilePic: user.photoURL || null,
            displayName: user.displayName || 'Anonymous',
            lastLogin: serverTimestamp(),
            ipAddress: ip || 'Unknown',
            city: location?.city || 'Unknown',
            state: location?.state || 'Unknown',
            zip: location?.zip || 'Unknown',
            country: location?.country || 'Unknown',
        };

        // Reference to the user document
        const userDocRef = doc(db, "Users", user.uid);

        // First attempt to update the document if it exists
        try {
            await updateDoc(userDocRef, userData);
            console.log('User info updated successfully:', userData);

        } catch (error) {
            // If the document doesn't exist, create it using setDoc
            if (error.code === 'not-found') {
                await setDoc(userDocRef, userData);
                console.log('New user document created:', userData);
            } else {
                throw error; // Re-throw other errors
            }
        }

        // Save login status to localStorage (optional)
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('userEmail', user.email);
    } catch (error) {
        console.error('Error saving user login state:', error);
    }
};


// Check if user is already signed in (this can be included on all pages)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is signed in:', user);
        await saveUserLoginState(user, true); // Update local storage
        // Optional: Redirect only if on a specific page, like the login page
        UserID = user.id;

        if (window.location.pathname === '/views/auth.html') {
            window.location.href = '/ReelCareer/views/user'; // Redirect to profile
        }
    } else {
        console.log('No user signed in');
        localStorage.removeItem('userLoggedIn'); // Clear local storage
        localStorage.removeItem('userEmail');
    }
});




// Sign Up Function
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    showLoading();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        //console.log('Sign Up Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
        window.location.href = '/ReelCareer/views/user'; // Redirect to profile
    } catch (error) {
        console.error('Error during sign up:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});

// Login with Email
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    showLoading();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Login Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
      //  window.location.href = '/ReelCareer/views/user'; // Redirect to profile
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});

document.getElementById('email-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    showLoading();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Email Login Successful:', user);
        await saveUserLoginState(user, true);
        closeLoginPopup();
    } catch (error) {
        console.error('Error during email login:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});



// Google Login Function
document.getElementById('google-login')?.addEventListener('click', async () => {
    showLoading();
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('Google Login Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
      //  window.location.href = '/ReelCareer/views/user'; // Redirect to profile
    } catch (error) {
        console.error('Error during Google login:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});

// Facebook Login Function
document.getElementById('facebook-login')?.addEventListener('click', async () => {
    showLoading();
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log('Facebook Login Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
      //  window.location.href = '/ReelCareer/views/user'; // Redirect to profile
    } catch (error) {
        console.error('Error during Facebook login:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});

// Apple Login Function
document.getElementById('apple-login')?.addEventListener('click', async () => {
    showLoading();
    try {
        const result = await signInWithPopup(auth, appleProvider);
        const user = result.user;
        console.log('Apple Login Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
      //  window.location.href = '/ReelCareer/views/user'; // Redirect to profile
    } catch (error) {
        console.error('Error during Apple login:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});


// Logout Function
const logout = async () => {
    showLoading();
    try {
        const user = auth.currentUser;
        if (user) {
            await signOut(auth);
            await saveUserLoginState(user, false); // Update database to set loggedIn to false
            localStorage.removeItem('userLoggedIn'); // Clear local storage
            localStorage.removeItem('userEmail');
            console.log('Logout Successful');
        }
        window.location.href = '/views/auth.html'; // Redirect to login/auth page after logout
    } catch (error) {
        console.error('Error during logout:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
};

 // Function to logout the user
 async function logoutUser() {
    try {
        await firebase.auth().signOut();
        window.location.href =  adjustLinkHomeURL+'views/auth'; // Redirect to login page after logout
    } catch (error) {
        console.error("Logout error:", error);
    }
}

// Logout button on any page
document.getElementById('logout-button')?.addEventListener('click', logout);



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
    const loginPopup = document.createElement('div');
    loginPopup.id = 'login-popup';
    loginPopup.style.position = 'fixed';
    loginPopup.style.top = '50%';
    loginPopup.style.left = '50%';
    loginPopup.style.transform = 'translate(-50%, -50%)';
    loginPopup.style.width = '400px';
    loginPopup.style.backgroundColor = 'white';
    loginPopup.style.padding = '20px';
    loginPopup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    loginPopup.style.borderRadius = '8px';
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
    const loginPopup = document.getElementById('login-popup');
    if (loginPopup) {
        loginPopup.remove();
    }
};







// myModule.js
export function setupLinks() {
    const { currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages } = getAdjustedLinks();
    // Use adjustLinkURL and adjustLinkHomeURL as needed within the module
}

// Navigation bar  
document.addEventListener("DOMContentLoaded", function () {

    console.log("checkUserProfile");
    function checkUserProfile() {

            var profileModal = document.getElementById('profileModal');
            var modalInstance = bootstrap.Modal.getInstance(profileModal);
            modalInstance.hide();
        
                }

    // Optionally, you can call it directly in the module if needed
    const { currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages } = getAdjustedLinks();
    console.log(adjustLinkURL, adjustLinkHomeURL);

    // Function to create the navbar
    function createNavbar() {
        const isHomePage = currentPage === '/ReelCareer/index.html' ||  '/ReelCareer/index' || currentPage === '/ReelCareer/' || currentPage === '' || currentPage === '/';
        const navbarClass = (isHomePage) ? 'navbar-light bg-light' : 'navbar-dark bg-primary';

        return `
            <nav class="navbar navbar-expand-lg ${navbarClass} shadow-sm sticky-top" role="navigation">
                <div class="container">
                 <a class="navbar-brand" style="
    color: #83bad9;
    font-weight: 500;
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
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle?.addEventListener('click', toggleDarkMode);

        // Initialize Dark Mode based on previous settings
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
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
        const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
        navLinks.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active'); // Add the active class to the current page link
            } else {
                link.classList.remove('active'); // Remove it from others
            }
        });
    }

    // Function to update navigation visibility based on user role
    function updateNavVisibility(user) {
        const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
        const recruiterNavItem = document.getElementById("recruiterNavItem");

        if (user) {
            // Display items based on user roles
            jobSeekerNavItem.style.display = user.role === 'jobSeeker' ? 'block' : 'none';
            recruiterNavItem.style.display = user.role === 'recruiter' ? 'block' : 'none';
        } else {
            // Hide both items if not logged in
            jobSeekerNavItem.style.display = 'none';
            recruiterNavItem.style.display = 'none';
        }
    }

    // Replace the navbar if not on an excluded page
    if (!excludedPages.includes(currentPage)) {
        let existingNavbar = document.querySelector('.navbar');

        // If an existing navbar is found, replace it
        if (existingNavbar) {
            existingNavbar.outerHTML = createNavbar();
        } else {
            // If no existing navbar, append it to the body
            document.body.insertAdjacentHTML('afterbegin', createNavbar());
        }

        setupEventListeners(); // Initialize event listeners
        highlightActiveLink(); // Highlight the active link
    }

    // Function to handle keyboard navigation for dropdowns
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            const target = document.activeElement;
            if (target.classList.contains('dropdown-toggle')) {
                target.click();
            }
        }
    });

    // Insert the footer section
    const companyMediaSectionHTML = `
        <section id="companyMedia" class="py-5 company-media">
            <div class="container">
           <h2 class="text-center" style="
    color: #83bad9;
    font-weight: 800;
    text-shadow: 1px 0px 0px #6253e7;">Company Media</h2>
    <div class="row" style="text-align: center;">
                    <div class="col-md-6 m-auto">
                        <video controls>
                            <source src="${adjustLinkHomeURL}media/company-video.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="col-md-6 m-auto">
                        <img src="${adjustLinkHomeURL}images/sq_logo_n_BG_tie_reel.png" alt="Company Image" class="img-fluid" style="width: 15rem;">
                    </div>
                </div>
            </div>
        </section>
    `;
    document.body.insertAdjacentHTML('beforeend', companyMediaSectionHTML);
});


// Newsletter Signup Functionality
async function handleNewsletterSignup(email) {
    const ipAddress = await getUserIP();
    const location = await getUserLocation();

    // Check if user has already signed up
    if (localStorage.getItem('hasSignedUp')) {
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
        alert("You have exceeded the maximum number of signup attempts. Please try again later.");
        return;
    }

    attempts++; // Increment the attempt count

    try {
        // Add a new document to the NewsLetter collection
        await db.collection('NewsLetter').add({
            email: email,
            ipAddress: ipAddress,
            location: location,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Store sign-up status in local storage
        localStorage.setItem('hasSignedUp', 'true');

        const newsletterMessage = document.getElementById('newsletterMessage');
        newsletterMessage.innerText = `Thank you for subscribing, ${email}!`;
    } catch (error) {
        const newsletterMessage = document.getElementById('newsletterMessage');
        newsletterMessage.innerText = `Error: Unable to subscribe. Please try again later.`;
        console.error("Error adding document: ", error);
    }
}
















// Update the footer function (No changes needed for this part)
function updateFooter() { 
    const footer = document.getElementById('dynamic-footer');
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
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}backend/dashboard" class="text-light" rel="noopener noreferrer">Admin</a></li>
                </ul>
                <div class="newsletter-signup">
                    <form id="newsletterForm" class="form-inline justify-content-center mt-4">
                        <input type="email" class=" mr-2 mb-2" placeholder="Subscribe to our newsletter" required aria-label="Email address">
                        <select id="newsletterType" class=" mr-2 mb-2"  required>
                            <option value="website_updates">Website Updates</option>
                            <option value="job_alerts">Job Alerts</option>
                            <option value="career_advice">Career Advice</option>
                            <option value="industry_news">Industry News</option>
                        </select>
                        <label  class="ml-2 mr-2 mb-2">
                            <input type="checkbox" id="dataPrivacy" required>
                            I agree to the   <a href="${adjustLinkHomeURL}public/privacy" class="text-light ml-1" rel="noopener noreferrer"> data privacy policy</a>.
                        </label>
                        <button type="submit" id="newsletterFormBtn"  class=" mr-2 mb-2 btn btn-outline-light">Subscribe</button>
                    </form>
                    <p id="newsletterMessage" class="text-light mt-2"></p>
                </div>
                <p class="mt-2">Current Date & Time: <span id="currentDateTime"></span></p>
                <p class="mt-2">Contact Us: <a href="mailto:info@reelcareer.com" class="text-light" rel="noopener noreferrer">info@reelcareer.com</a></p>
                <button id="backToTop" class="btn btn-outline-light mt-2">Back to Top</button>
            </div>
        </div>
    `;
    
    footer.innerHTML = newContent; // Update the footer's HTML content

    // Current Date and Time
    const updateDateTime = () => {
        const now = new Date();
        document.getElementById('currentDateTime').innerText = now.toLocaleString();
    };
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Back to Top Button Functionality
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // Update the event listener for the form
document.getElementById('newsletterFormBtn').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Check if user agreed to the data privacy policy
    if (!document.getElementById('dataPrivacy').checked) {
        alert("You must agree to the data privacy policy.");
        return;
    }

    // Handle the newsletter signup process
    await handleNewsletterSignup(email);
});

}

// Call the function to update the footer when the document is loaded
document.addEventListener('DOMContentLoaded', updateFooter);




    
   // let mainDefaultPic = 




    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // Handle authentication state changes
    function handleAuthStateChanged(user) {

        console.log("handleAuthStateChanged");

        const authSection = document.getElementById("authSection");
        const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
        const recruiterNavItem = document.getElementById("recruiterNavItem");

        if (user) {
            // If the user is logged in, show profile info and logout button
            const userName = user.displayName || 'User';
            const defaultPic = `<img src="${adjustLinkHomeURL}images/sq_logo_n_BG_sm.png" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`
            const userPhoto = user.profilePic ? `<img src="${user.profilePic}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">` : `${defaultPic}`;
            
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
            jobSeekerNavItem.style.display = 'block';
            recruiterNavItem.style.display = 'block';

            // Handle logout
            document.getElementById('logoutButton').onclick = logoutUser;
        } else {
            // If the user is not logged in, hide the Job Seeker and Recruiter links
            jobSeekerNavItem.style.display = 'none';
            recruiterNavItem.style.display = 'none';

            // Show "Login / Create Account" button
            authSection.innerHTML = `
                <button class="btn btn-primary" id="loginButton">Login / Create Account</button>
            `;

            document.getElementById('loginButton').onclick = () => {
                window.location.href = adjustLinkHomeURL+'views/auth'; // Redirect to login page
            };
        }

    // Toggle functionality for the dropdown
    const dropdownToggleButton = document.getElementById('profileDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggleButton.addEventListener('click', function() {
        const isExpanded = dropdownToggleButton.getAttribute('aria-expanded') === 'true';
        dropdownToggleButton.setAttribute('aria-expanded', !isExpanded);
        dropdownMenu.classList.toggle('show', !isExpanded); // Show or hide the dropdown
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!dropdownToggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownToggleButton.setAttribute('aria-expanded', false);
            dropdownMenu.classList.remove('show');
        }
    });

    // Check if user data exists and show modal if missing

   
}
















// profileModal.js

// Function to create the profile modal HTML
function createProfileModal() {

    console.log("profileModal check 3");

    const modalHTML = `<!-- profileModal -->
      <div id="profileModal" class="modal fade" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title" id="profileModalLabel">Update Your Profile</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="profileForm">
                <!-- Username -->
                <div class="mb-3">
                  <label for="usernameSET" class="form-label">Username <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="usernameSET" required>
                  <small id="usernameError" class="text-danger"></small>
                </div>
  
                <!-- Profile Picture Upload -->
                <div class="mb-3">
                  <label for="profilePictureSET" class="form-label">Profile Picture</label>
                  <input type="file" class="form-control" id="profilePictureSET" accept="image/*">
                  <img id="profilePicPreview" class="img-thumbnail mt-2" style="display:none; width: 100px;" />
                </div>
  
                <!-- Email -->
                <div class="mb-3">
                  <label for="emailSET" class="form-label">Email </label>
                  <div class="form-control" id="emailSET"></div>
                </div>
  
                <!-- Name -->
                <div class="mb-3">
                  <label for="nameSET" class="form-label">Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="nameSET" required>
                </div>
  
                <!-- Bio -->
                <div class="mb-3">
                  <label for="bioSET" class="form-label">Bio</label>
                  <textarea class="form-control" id="bioSET" rows="3" maxlength="300"></textarea>
                </div>
  
                <!-- Location (Auto-suggest) -->
                <div class="mb-3">
                  <label for="locationSET" class="form-label">Location</label>
                  <input type="text" oninput="autoSuggest(this.value,'locationSuggestions')"
                         class="form-control keywordInput location-input" 
                         id="locationSET" placeholder="Enter your city or state">
                </div>
  
                <!-- Tags (Skills or Interests) -->
                <div class="mb-3">
                  <label for="tagsSET" class="form-label">Tags</label>
                  <input type="text" oninput="autoSuggest(this.value,'jobRequirementsSuggestions')"
                         class="form-control keywordInput" id="tagsSET" placeholder="Add tags (e.g., JavaScript, Project Management)">
                </div>
  
                <!-- Company Name (For Recruiters) -->
                <div id="recruiterFieldsSET" class="mb-3" style="display: none;">
                  <label for="companyNameSET" class="form-label">Company Name</label>
                  <input type="text" class="form-control" id="companyNameSET">
                </div>
  
                <!-- Current Position -->
                <div class="mb-3">
                  <label for="positionSET" class="form-label">Current Position</label>
                  <input type="text" oninput="autoSuggest(this.value,'jobSuggestions')"
                         class="form-control keywordInput job-input" id="positionSET">
                </div>
  
                <!-- Membership Status -->
                <div class="mb-3">
                  <label class="form-label">Membership Status</label>
                  <p id="membershipStatusSET" class="badge bg-success">Free</p>
                  <button type="button" class="btn btn-link" id="changeMembershipBtn">Change Membership</button>
                </div>
  
                <!-- Verified Status -->
                <div class="mb-3">
                  <label class="form-label">Verified Status</label>
                  <p id="verifiedStatusSET" class="badge bg-secondary">Not Verified</p>
                </div>
  
                <!-- Public Profile Checkbox -->
                <div class="form-check mb-3">
                  <input type="checkbox" class="form-check-input" id="publicProfileSET">
                  <label class="form-check-label" for="publicProfileSET">Public Profile</label>
                </div>
  
                <!-- Deactivate Account -->
                <div class="mt-4">
                  <button type="button" class="btn btn-danger" id="deactivateAccountBtn">Deactivate Account</button>
                </div>
              </form>
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="saveProfileBtn">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Append modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
/*


*/

function populateFormFields(userData) {
    console.log("check last");
    console.log("user info FROM FIREBASE ", userData);
    document.getElementById('usernameSET').value = userData.displayName || '';
    document.getElementById('emailSET').innerText = userData.email || '';
    document.getElementById('nameSET').value = userData.name || '';
    document.getElementById('locationSET').value = userData.city + ", " + userData.state || '';
    document.getElementById('bioSET').value = userData.bio || '';
    document.getElementById('tagsSET').value = userData.tags ? userData.tags.join(', ') : '';
    document.getElementById('positionSET').value = userData.position || '';
    document.getElementById('membershipStatusSET').innerText = userData.membershipStatus || 'Free';
    document.getElementById('verifiedStatusSET').innerText = userData.verifiedStatus ? 'Verified' : 'Not Verified';
    document.getElementById('publicProfileSET').checked = userData.publicProfile || false;

    // Profile picture preview
    if (userData.profilePicture) {
        document.getElementById('profilePicPreviewSET').src = userData.profilePicture;
        document.getElementById('profilePicPreviewSET').style.display = 'block';
    }

    // Show recruiter fields if user is a recruiter
    if (userData.userType === 'recruiter') {
        document.getElementById('recruiterFieldsSET').style.display = 'block';
        document.getElementById('companyNameSET').value = userData.companyName || '';
    }
}

function initializeProfileModal() {
    const profileForm = document.getElementById('profileForm');
    const usernameInput = document.getElementById('usernameSET');
    const nameInput = document.getElementById('nameSET');
    const usernameError = document.getElementById('usernameError');
    const profilePictureInput = document.getElementById('profilePictureSET');
    const profilePicPreview = document.getElementById('profilePicPreviewSET');
    const saveProfileBtn = document.getElementById('saveProfileBtn');

    // Real-time validation
    usernameInput.addEventListener('input', function () {
        validateField(usernameInput, usernameError, 'Username is required');
    });

    nameInput.addEventListener('input', function () {
        validateField(nameInput, null, 'Name is required');
    });

    function validateField(input, errorElem, errorMessage) {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            if (errorElem) errorElem.textContent = errorMessage;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (errorElem) errorElem.textContent = '';
        }
    }

    // Profile picture live preview
    profilePictureInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicPreview.src = e.target.result;
                profilePicPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Save profile button
    saveProfileBtn.addEventListener('click', function () {
        const userId = auth.currentUser.uid;
        const profileData = {
            displayName: document.getElementById('usernameSET').value,
            name: document.getElementById('nameSET').value,
            location: document.getElementById('locationSET').value,
            bio: document.getElementById('bioSET').value,
            tags: document.getElementById('tagsSET').value.split(',').map(tag => tag.trim()),
            position: document.getElementById('positionSET').value,
            profilePic: document.getElementById('publicProfileSET').checked
        };

        // Check if a new profile picture is being uploaded
        if (document.getElementById('profilePictureSET').files.length > 0) {
            const file = document.getElementById('profilePictureSET').files[0];
            const storageRef = firebase.storage().ref('profilePictures/' + userId);
            const uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', null, error => {
                console.error('Upload failed:', error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    profileData.profilePicture = downloadURL;
                    updateFirebaseProfile(userId, profileData);
                });
            });
        } else {
            updateFirebaseProfile(userId, profileData);
        }
    });

    function updateFirebaseProfile(userId, profileData) {
        const user = auth.currentUser;
        console.log("user info FROM FIREBASE ", user);

        user.updateProfile({
            displayName: profileData.displayName,
            photoURL: profileData.profilePicture || user.photoURL // Use existing photo if not updated
        }).then(() => {
            saveProfile(userId, profileData);
        }).catch(error => {
            console.error('Error updating Firebase Auth user:', error);
        });
    }

    function saveProfile(userId, profileData) {
        const userDocRef = doc(db, 'Users', userId);
        setDoc(userDocRef, profileData, { merge: true })
            .then(() => {
                alert('Profile updated successfully');
                $('#profileModal').modal('hide');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    }
}



document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(user => {
        if (user) {
            // Set a small timeout to ensure elements have loaded

            createProfileModal();
            initializeProfileModal(); // Initialize modal only if the form exists

            setTimeout(() => {
                const profileForm = document.getElementById('profileForm');
                if (profileForm) {
                    console.log('User info????????????/  :', userData);
                    console.log("verified: ", verified);

                    populateFormFields(user); // Populate fields with user data
                    document.getElementById('settingsBtn').addEventListener('click', showModal);
                } else {
                    console.error("Profile modal form not found in the DOM.");
                }
            }, 500); // Delay by 500 milliseconds (adjust as needed)
        }
    });
});


// Export the objects
export { onAuthStateChanged, db, storage, analytics, app,collection, getDocs, auth }; // Export db, storage, and analytics



     
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