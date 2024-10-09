
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




    document.getElementById('email-login-form').addEventListener('submit', async (e) => {
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
};

// Function to close and remove the login pop-up
const closeLoginPopup = () => {
    const loginPopup = document.getElementById('login-popup');
    if (loginPopup) {
        loginPopup.remove();
    }
};








