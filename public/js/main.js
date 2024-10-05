
/*
    
<!-- Firebase configuration/ Login& Out -->
<script src="../public/js/main.js"></script> 

*/

// main.js




// Bootstrap CSS 
//import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { initializeAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js"; // Use the same version
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Correctly initialize storage
const analytics = initializeAnalytics(app);

//import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
//const newCollection = collection;
// Export the objects
export { db, storage, analytics, app,collection, getDocs }; // Export db, storage, and analytics


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

// Save login state in the database and local storage
const saveUserLoginState = async (user, isLoggedIn) => {
    try {
        // Save to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            loggedIn: isLoggedIn,
            lastLogin: serverTimestamp(),
        });
        // Save to local storage
        localStorage.setItem('userLoggedIn', isLoggedIn);
        localStorage.setItem('userEmail', user.email);
    } catch (error) {
        console.error('Error saving login state:', error);
    }
};

// Check if user is already signed in (this can be included on all pages)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is signed in:', user);
        await saveUserLoginState(user, true); // Update local storage
        // Optional: Redirect only if on a specific page, like the login page
        if (window.location.pathname === '/auth.html') {
            window.location.href = '/profile.html'; // Adjust path as needed
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
        console.log('Sign Up Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
        window.location.href = '/profile.html'; // Redirect to profile
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
        window.location.href = '/profile.html'; // Redirect to profile
    } catch (error) {
        console.error('Error during login:', error);
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
        window.location.href = '/auth.html'; // Redirect to login/auth page after logout
    } catch (error) {
        console.error('Error during logout:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
};

// Google Login Function
document.getElementById('google-login')?.addEventListener('click', async () => {
    showLoading();
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('Google Login Successful:', user);
        await saveUserLoginState(user, true); // Update database and local storage
        window.location.href = '/profile.html'; // Redirect to profile
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
        window.location.href = '/profile.html'; // Redirect to profile
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
        window.location.href = '/profile.html'; // Redirect to profile
    } catch (error) {
        console.error('Error during Apple login:', error);
        alert(error.message);
    } finally {
        hideLoading();
    }
});

// Logout button on any page
document.getElementById('logout-button')?.addEventListener('click', logout);



// Function to inject CSS styles into the document
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* General Styles */

        


/* Custom styles for mobile responsiveness */
@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.2rem; /* Increase the brand text size on mobile */
    }

    .nav-link {
        font-size: 0.9rem; /* Decrease the nav link text size */
    }

    .company-media img {
        width: 100%; /* Make company media images responsive */
        height: auto; /* Maintain aspect ratio */
    }

    /* Adjust video size on mobile */
    video {
        width: 100%;
        height: auto;
    }
}
@media (max-width: 768px) {
    body {
        font-size: 14px; /* Smaller text on mobile */
    }

    .navbar {
        flex-direction: column; /* Stack navbar items */
    }
}

@media (max-width: 576px) {
    .navbar-brand {
        font-size: 1.5rem; /* Adjust brand size */
    }
}

img {
    max-width: 100%;
    height: auto;
}
button, .nav-link {
    padding: 10px 15px;
    font-size: 16px;
}

        
    footer {
        margin-top: 50px;
    }
    footer p {
        margin-bottom: 0;
    }
    `;
    document.head.appendChild(style);
}

// Call the function to add styles when the document is ready
document.addEventListener('DOMContentLoaded', addStyles);





// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.googletagmanager.com/gtag/js?id=G-LBTK319K2X','ga');

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-LBTK319K2X');

// Define rate limiting variables
const RATE_LIMIT_TIME = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 3; // Allow 3 attempts within the rate limit time
let attempts = 0;
let firstAttemptTime = null;

// Function to get user's IP address
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Unable to fetch IP address: ", error);
        return null;
    }
}

// Function to get user's location
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                reject(error);
            });
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}



// Navagtion bar
document.addEventListener("DOMContentLoaded", function () {
    // Pages where we don't want to show the navbar
    const excludedPages = ['/indexxxx.html', '/aboutxx.html'];

    // Get the current page path
    const currentPage = window.location.pathname;

    // Define if the root is at the home page or deeper directories
    const isHomePage = currentPage === '/ReelCareer/index.html' || currentPage === '/';

    // Adjust hrefs based on the root page
    const adjustLinkURL = (isHomePage) ? '/ReelCareer/views/' || '/ReelCareer/public/' : '';
    const adjustLinkHomeURL = (isHomePage) ? '/ReelCareer/' : '';

    // Function to create the navbar
    function createNavbar() {
        const navbarClass = (isHomePage) ?  'navbar-dark bg-dark' : 'navbar-light bg-light';
        
        console.log("nav currentPage   ",currentPage);
        console.log("nav isHomePage   ",isHomePage);
        console.log("nav adjustLinkURL   ",adjustLinkURL);
        console.log("nav navbarClass   ",navbarClass);
        console.log("nav adjustLinkHomeURL   ",adjustLinkHomeURL);
        return `
            <nav class="navbar navbar-expand-lg ${navbarClass}  shadow-sm sticky-top" role="navigation">
                <div class="container">
                    <a class="navbar-brand" href="${adjustLinkHomeURL}index.html">ReelCareer</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}job-listings.html">Job Listings</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}about.html">About Us</a></li>
                            <li class="nav-item" id="jobSeekerNavItem"><a class="nav-link" href="${adjustLinkURL}job-seeker.html">Job Seeker</a></li>
                            <li class="nav-item" id="recruiterNavItem"><a class="nav-link" href="${adjustLinkURL}recruiter-dashboard.html">Recruiter Dashboard</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}news.html">News</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}company-profile.html">Company Profiles</a></li>
                            <li class="nav-item">
                                <div id="authSection" class="d-flex align-items-center"></div>
                            </li>
                            <li class="nav-item">
                                <button id="darkModeToggle" class="btn btn-outline-secondary ml-3">Dark Mode</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
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

   


    // Function to setup event listeners
    function setupEventListeners() {
        // Dark Mode Toggle functionality
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('click', toggleDarkMode);

        // Initialize Dark Mode based on previous settings
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
      //  firebase.initializeApp(firebaseConfig);
      onAuthStateChanged(auth, handleAuthStateChanged);

    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // Handle authentication state changes
    function handleAuthStateChanged(user) {
        const authSection = document.getElementById("authSection");
        const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
        const recruiterNavItem = document.getElementById("recruiterNavItem");

        if (user) {
            // If the user is logged in, show profile info and logout button
            const userName = user.displayName || 'User';
            const userPhoto = user.photoURL ? `<img src="${user.photoURL}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">` : '';
            
            authSection.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${userPhoto} Welcome, ${userName}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="${adjustLinkURL}profile.html">Profile</a>
                        <a class="dropdown-item" href="${adjustLinkURL}settings.html">Account Settings</a>
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
                window.location.href = 'auth.html'; // Redirect to login page
            };
        }
    }

    // Function to logout the user
    async function logoutUser() {
        try {
            await firebase.auth().signOut();
            window.location.href = 'auth.html'; // Redirect to login page after logout
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    // Additional content (e.g., company media section) can be included below
    const companyMediaSectionHTML = `
        <section id="companyMedia" class="py-5 company-media">
            <div class="container">
                <h2 class="text-center">Company Media</h2>
                <div class="row">
                    <div class="col-md-6">
                        <video controls>
                            <source src="${adjustLinkURL}media/company-video.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="col-md-6">
                        <img src="${adjustLinkURL}media/company-image.jpg" alt="Company Image" class="img-fluid">
                    </div>
                </div>
            </div>
        </section>
    `;
    document.body.insertAdjacentHTML('beforeend', companyMediaSectionHTML);
});

// btn-primary
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

// Function to handle keyboard navigation for dropdown
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const target = document.activeElement;
        if (target.classList.contains('dropdown-toggle')) {
            target.click();
        }
    }
});












// The Footer <footer id="dynamic-footer"></footer>


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
    
    // Function to determine the correct root path for links
    function getRootPath() {
        const currentPage = window.location.pathname;
        if (currentPage.startsWith('/view/')) {
            return '../';
        } else if (currentPage.startsWith('/public/')) {
            return '../';
        } else {
            return '';
        }
    }

    const rootPath = getRootPath();
    const newContent = `
        <div class="bg-dark text-light py-4">
            <div class="container text-center">
                <p>&copy; ${currentYear} <a href="${rootPath}about.html" class="text-light" rel="noopener noreferrer">ReelCareer</a>. All Rights Reserved.</p>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="${rootPath}public/privacy.html" class="text-light" rel="noopener noreferrer">Privacy Policy</a></li>
                    <li class="list-inline-item"><a href="${rootPath}public/terms.html" class="text-light" rel="noopener noreferrer">Terms of Use</a></li>
                    <li class="list-inline-item"><a href="${rootPath}contact.html" class="text-light" rel="noopener noreferrer">Contact Us</a></li>
                    <li class="list-inline-item"><a href="${rootPath}blog.html" class="text-light" rel="noopener noreferrer">Blog</a></li>
                    <li class="list-inline-item"><a href="${rootPath}faq.html" class="text-light" rel="noopener noreferrer">FAQs</a></li>
                    <li class="list-inline-item"><a href="${rootPath}sponsor.html" class="text-light" rel="noopener noreferrer">Become a Sponsor</a></li>
                    <li class="list-inline-item"><a href="${rootPath}apply.html" class="text-light" rel="noopener noreferrer">Apply for a Job with Us</a></li>
                    <li class="list-inline-item"><a href="${rootPath}recruiter.html" class="text-light" rel="noopener noreferrer">For Recruiters</a></li>
                    <li class="list-inline-item"><a href="${rootPath}affiliate.html" class="text-light" rel="noopener noreferrer">Affiliate Program</a></li>
                </ul>
                <div class="newsletter-signup">
                    <form id="newsletterForm">
                        <input type="email" placeholder="Subscribe to our newsletter" required aria-label="Email address">
                        <select id="newsletterType" multiple required>
                            <option value="website_updates">Website Updates</option>
                            <option value="job_alerts">Job Alerts</option>
                            <option value="career_advice">Career Advice</option>
                            <option value="industry_news">Industry News</option>
                        </select>
                        <label>
                            <input type="checkbox" id="dataPrivacy" required>
                            I agree to the <a href="${rootPath}public/privacy.html" class="text-light" rel="noopener noreferrer">data privacy policy</a>.
                        </label>
                        <button type="submit" class="btn btn-outline-light">Subscribe</button>
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
console.log("dynamic-footer ?????????????");

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
}

// Call the function to update the footer when the document is loaded
document.addEventListener('DOMContentLoaded', updateFooter);



// Update the event listener for the form
document.getElementById('newsletterForm').addEventListener('submit', async function(event) {
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
