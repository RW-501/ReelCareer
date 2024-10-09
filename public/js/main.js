
/*
    
<!-- Firebase configuration/ Login& Out -->
<script src="../public/js/main.js"></script> 

*/

// main.js




import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, updateDoc, setDoc, serverTimestamp, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
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

let UserID = '';

// Check if user is already signed in (this can be included on all pages)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is signed in:', user);
        await saveUserLoginState(user, true); // Update local storage
        // Optional: Redirect only if on a specific page, like the login page
        UserID = user.id;

        if (window.location.pathname === '/views/auth.html') {
            window.location.href = '/views/user.html'; // Adjust path as needed
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
        window.location.href = '/views/user.html'; // Redirect to profile
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
     //   window.location.href = '/views/user.html'; // Redirect to profile
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
      //  window.location.href = '/views/user.html'; // Redirect to profile
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
       // window.location.href = '/views/user.html'; // Redirect to profile
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
      //  window.location.href = '/views/user.html'; // Redirect to profile
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


console.log("???????outside?????????   ");


// Navagtion bar
document.addEventListener("DOMContentLoaded", function () {
    console.log"DOMContentLoaded   ");

    // Function to create the navbar
    function createNavbar() {
        const navbarClass = (isHomePage) ?   'navbar-light bg-light' : 'navbar-dark bg-primary ';


        
        return `
            <nav class="navbar navbar-expand-lg ${navbarClass}  shadow-sm sticky-top" role="navigation">
                <div class="container">
                    <a class="navbar-brand" href="${adjustLinkHomeURL}index">ReelCareer</a>
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

  

   
   
   
   
    // Additional content (e.g., company media section) can be included below
    const companyMediaSectionHTML = `
        <section id="companyMedia" class="py-5 company-media">
            <div class="container">
                <h2 class="text-center">Company Media</h2>
                <div class="row" style=" text-align-last: center;">
                    <div class="col-md-6 m-auto">
                        <video controls>
                            <source src="${adjustLinkHomeURL}media/company-video.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="col-md-6 m-auto">
                        <img src="${adjustLinkHomeURL}images/sq_logo_n_BG_tie_reel.png" alt="Company Image" class="img-fluid" style="width: 15rem";>
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
        const darkModeToggle = document.getElementById?.('darkModeToggle');
        darkModeToggle.addEventListener('click', toggleDarkMode);

        // Initialize Dark Mode based on previous settings
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
      //  firebase.initializeApp(firebaseConfig);
      onAuthStateChanged(auth, handleAuthStateChanged);

    }





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
    
  
    const newContent = `
        <div class="bg-dark text-light py-4">
            <div class="container text-center">
                <p>&copy; ${currentYear} <a href="${adjustLinkURL}about" class="text-light" rel="noopener noreferrer">ReelCareer</a>. All Rights Reserved.</p>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="${adjustLinkURL}public/privacy" class="text-light" rel="noopener noreferrer">Privacy Policy</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}public/terms" class="text-light" rel="noopener noreferrer">Terms of Use</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}contact" class="text-light" rel="noopener noreferrer">Contact Us</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}blog" class="text-light" rel="noopener noreferrer">Blog</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}news" class="text-light" rel="noopener noreferrer">News</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}faq" class="text-light" rel="noopener noreferrer">FAQs</a></li>
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
        const authSection = document.getElementById("authSection");
        const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
        const recruiterNavItem = document.getElementById("recruiterNavItem");

        if (user) {
            // If the user is logged in, show profile info and logout button
            const userName = user.displayName || 'User';
            const defaultPic = `<img src="${adjustLinkHomeURL}images/sq_logo_n_BG_sm.png" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`
            const userPhoto = user.photoURL ? `<img src="${user.photoURL}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">` : `"${defaultPic}"`;
            
            authSection.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${userPhoto} Welcome, ${userName}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="${adjustLinkURL}user">Profile</a>
                        <a class="dropdown-item" href="${adjustLinkURL}messaging">Messaging</a>
                        <a class="dropdown-item" href="${adjustLinkURL}settings">Account Settings</a>
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
    }

   


setupEventListeners(); // Initialize event listeners
highlightActiveLink(); // Highlight the active link
