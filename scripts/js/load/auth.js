

import {
  db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics,
  googleProvider,onSnapshot ,writeBatch ,batch,
  facebookProvider, linkWithCredential,
  getUserId
} from 'https://reelcareer.co/scripts/js/load/module.js';

const user = getUserId;
  

  // Show loading spinner
  const showLoading = () => {
    const loader = document.createElement("div");
    loader.id = "loading-spinner";
    loader.classList.add("loading-spinner");
    loader.innerHTML = `
      <div class="spinner"></div>
    `;
    document.body.appendChild(loader);
  };
  
  // Hide loading spinner
  const hideLoading = () => {
    const loader = document.getElementById("loading-spinner");
    if (loader) {
      loader.remove();
    }
  };
  function formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters except '+'
    let cleanedNumber = phoneNumber.replace(/[^+\d]/g, "");
  
    // Add +1 if it's missing
    if (!cleanedNumber.startsWith("+")) {
        cleanedNumber = `+1${cleanedNumber}`;
    } else if (!cleanedNumber.startsWith("+1")) {
        cleanedNumber = `+1${cleanedNumber.slice(1)}`; // Replace other country codes with +1
    }
  
    // Validate that the final format matches +1 followed by 10 digits
    const phoneRegex = /^\+1\d{10}$/;
    if (!phoneRegex.test(cleanedNumber)) {
        throw new Error("Invalid phone number format. Use a 10-digit US number.");
    }
  
    return cleanedNumber; // Return formatted phone number
  }
  // Global Variables
  let confirmationResult; // Used to store the result of signInWithPhoneNumber
  
  function addAuthEventListener() {

  // Handle Signup Form Submission
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  
  showLoading();
  try {
    // Sign up with email/password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // If user was signed in anonymously before, merge accounts
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      // Get the anonymous user
      const anonymousUser = auth.currentUser;

      // Link the anonymous account with email/password account
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(anonymousUser, credential);
      console.log('Anonymous account merged with email/password account');

      // After linking, the user ID will be updated to the email/password account ID
    }


    const joinedDate = new Date();  // Store the current date as the joined date
    await saveUserLoginState(user, true, joinedDate); // Pass joined date to saveUserLoginState
  } catch (error) {
    console.error("Error during sign up:", error);
    showToast(error.message, 'error');
  } finally {
    hideLoading();
  }
});

  
  
// Handle Login Form Submission
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = sanitizeInput(document.getElementById("login-email").value);
  const password = sanitizeInput(document.getElementById("login-password").value);

  showLoading();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserLoginState(userCredential.user); // Update database and local storage
  } catch (error) {
    showToast(error.message);
  } finally {
    hideLoading();
  }
});
 

  // Phone Login Function
 
// Phone Login (same logic applies)
document.getElementById("phoneLogin")?.addEventListener("click", async () => {
  const phoneNumberInput = document.getElementById("phoneNumber").value.trim();
  
  if (!phoneNumberInput) return;
  
  showLoading(); // Show loading spinner
  try {
    const phoneNumber = formatPhoneNumber(phoneNumberInput);
    const appVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
    await appVerifier.render();
    
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    showToast("Code sent successfully.",confirmationResult);
    
    // Show verification code input
    document.getElementById("verifyCodeButton").style.display = "block";
    document.getElementById("verificationCodeGroup").style.display = "block";
    document.getElementById("sendVerificationCode").style.display = "none";
  } catch (error) {
    showToast("Error sending code. Try again.", "error");
  } finally {
    hideLoading(); // Hide loading spinner
  }
});

document.getElementById("verifyCode")?.addEventListener("click", async () => {
  const verificationCode = document.getElementById("verificationCode").value.trim();
  
  if (!verificationCode) {
    showToast("Please enter the verification code.", "error");
    return;
  }
  
  showLoading(); // Show loading spinner
  try {
    const result = await confirmationResult.confirm(verificationCode);
    const user = result.user;

    // If user was signed in anonymously before, merge accounts
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const anonymousUser = auth.currentUser;
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, verificationCode);
      
      // Link the anonymous account with the phone account
      await linkWithCredential(anonymousUser, credential);
      console.log('Anonymous account merged with phone account');
    }

    showToast("Login successful!", "success");
    await saveUserLoginState(user, true); // Save user state
  } catch (error) {
    showToast("Invalid verification code. Try again.", "error");
  } finally {
    hideLoading(); // Hide loading spinner
  }
});
  
  
// Google Login
document.getElementById("google-login")?.addEventListener("click", async () => {
  showLoading();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // If user was signed in anonymously before, merge accounts
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const anonymousUser = auth.currentUser;
      const credential = GoogleAuthProvider.credential(result.credential.idToken);
      
      // Link the anonymous account with the Google account
      await linkWithCredential(anonymousUser, credential);
      console.log('Anonymous account merged with Google account');
    }

    await saveUserLoginState(user, true); // Update database and local storage
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
    } catch (error) {
      console.error("Error during Apple login:", error);
      showToast(error.message);
    } finally {
      hideLoading();
    }
  });

}
window.addAuthEventListener = addAuthEventListener;

// Check if user is logged in and handle admin area access
// Helper functions
function redirectToLogin() {
    showToast('You need to log in to access the Admin area.');
    window.location.href = 'https://reelcareer.co/views/auth';
  }
  
  function redirectToDashboard() {
    window.location.href = 'https://reelcareer.co/backend/dashboard/';
  }
  
  function showAdminContent() {
    const firebaseLogin = document.getElementById("firebaseLogin");
    const dashboardContent = document.getElementById("dashboardContent");
  
    if (firebaseLogin) firebaseLogin.style.display = "none";
    if (dashboardContent) dashboardContent.style.display = "block";
  }
  
  function checkLogin(user) {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const path = window.location.pathname;
  
    // Check if user is trying to access the backend/admin area
    const isBackendArea = path.includes('/backend') || path.includes('/backend/');
    if (!isBackendArea) return; // No further action needed for non-admin areas
  
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        redirectToLogin();
        return;
    }
  
    // Backend page handling
    if (path.includes('/backend') || path.includes('/backend/index') || path.includes('/admin')) {
        if (user.email === "1988lrp@gmail.com") { 
            showToast(`Admin Logged In, Welcome ${user.displayName}`);
            showAdminContent();
        } else {
            showToast('You are not an admin');
            redirectToLogin();
        }
    }
  }
  
  window.checkLogin = checkLogin;
  




  // Create and inject the popup login structure
  function createPopupLogin() {
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popup-login-container';

    
    const popupStyles = document.createElement('style');
    popupStyles.innerHTML = `
      #popup-login-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        visibility: hidden;
      }
      
      #popup-login-content {
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        width: 100%;
        max-width: 500px;
        position: relative;
        animation: slideIn 0.3s ease-in-out;
      }
      
      #popup-login-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 24px;
        color: #757575;
        transition: color 0.2s;
      }
      
      #popup-login-close:hover {
        color: #d32f2f;
      }
  
      .login-tabs button {
        padding: 10px 20px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
      }
  
      .login-tabs button.active {
        background-color: #1a73e8;
        color: #fff;
      }
  
      .login-tabs button:not(.active):hover {
        background-color: #e8f0fe;
      }
  
      input[type="email"],
      input[type="password"],
      input[type="text"] {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        transition: border-color 0.3s, box-shadow 0.3s;
      }
  
      input:focus {
        border-color: #1a73e8;
        box-shadow: 0 0 5px rgba(26, 115, 232, 0.3);
      }
  
      button[type="submit"],
      #google-login,
      #phone-login,
      #facebook-login,
      #apple-login {
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
      }
  
      #google-login {
        background-color: #4285f4;
        color: white;
      }
  
      #google-login:hover {
        background-color: #357ae8;
      }
  
      button[type="submit"] {
        background-color: #1a73e8;
        color: white;
      }
  
      button[type="submit"]:hover {
        background-color: #155ab6;
      }
  
      button:active {
        transform: scale(0.98);
      }
  
      #forgot-password-link {
        color: #1a73e8;
        text-decoration: none;
        transition: color 0.2s;
      }
  
      #forgot-password-link:hover {
        color: #0c47a1;
      }
  
      @keyframes slideIn {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.body.appendChild(popupStyles);

    popupContainer.innerHTML = `
       <div id="popup-login-content" style="background: white;padding: 30px;border-radius: 12px;
       box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);width: 100%;max-width: 500px;position: relative;overflow-y: auto;height: 70%;">
       
       <span id="popup-login-close" style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 24px;">&times;</span>
        <div class="login-tabs">
          <button id="tab-login" class="active">Log In</button>
          <button id="tab-signup">Sign Up</button>
        </div>
        <div id="login-form-section">
          <form id="popup-login-form">
            <h2>Log In</h2>
            <input type="email" id="login-email" placeholder="Email" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <button type="submit">Log In</button>
          </form>
          <div class="social-login">
            <button id="google-login">Continue with Google</button>
            <button id="phone-login">Phone Login</button>
            <button id="facebook-login" hidden>Continue with Facebook</button>
            <button id="apple-login" hidden>Continue with Apple</button>
          </div>
          <div>
            <a href="#" id="forgot-password-link">Forgot Password?</a>
          </div>
        </div>
        <div id="signup-form-section" style="display: none;">
          <form id="signup-form">
            <h2>Sign Up</h2>
            <input type="email" id="signup-email" placeholder="Email" required>
            <input type="password" id="signup-password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div id="phone-verification" style="display: none;">
          <input type="text" id="phoneNumber" placeholder="Enter Phone Number">
          <button id="sendVerificationCode">Send Verification Code</button>
          <div id="verificationCodeGroup" style="display: none;">
            <input type="text" id="verificationCode" placeholder="Enter Verification Code">
            <button id="verifyCode">Verify Code</button>
          </div>
        </div>
      </div>
    `;
  
    document.body.appendChild(popupContainer);
    addAuthEventListener();

    const closePopup = document.getElementById("popup-login-close");
    closePopup.addEventListener("click", () => {
      popupContainer.style.visibility = "hidden";
    });
  
    document.getElementById("tab-login").addEventListener("click", () => {
      document.getElementById("login-form-section").style.display = "block";
      document.getElementById("signup-form-section").style.display = "none";
    });
  
    document.getElementById("tab-signup").addEventListener("click", () => {
      document.getElementById("login-form-section").style.display = "none";
      document.getElementById("signup-form-section").style.display = "block";
    });

    document.getElementById('phoneLogin').addEventListener('click', function(event) {
      event.preventDefault();
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('phone-login-form').style.display = 'block';
  });
  
/*     document.getElementById("forgot-password-link").addEventListener("click", () => {
      const email = prompt("Enter your email address:");
      if (email) {
        showLoading();
        sendPasswordResetEmail(auth, email)
          .then(() => showToast("Password reset email sent.", "success"))
          .catch((error) => showToast(`Error: ${error.message}`, "error"))
          .finally(hideLoading);
      }
    }); */


  }
  
function openPopupLogin() {


  const popupContainer = document.getElementById('popup-login-container');
  if (popupContainer) {


      popupContainer.style.visibility = 'visible'; // Ensure visibility is set
      popupContainer.style.opacity = '0';         // Start with opacity 0
      popupContainer.style.transition = 'opacity 0.5s ease-in-out'; // Add transition
      setTimeout(() => {
          popupContainer.style.opacity = '1';     // Fade in
      }, 10); // Small delay to ensure transition works
  }
}

function closePopupLogin() {
  const popupContainer = document.getElementById('popup-login-container');
  if (popupContainer) {
      popupContainer.style.transition = 'opacity 0.5s ease-in-out'; // Add transition
      popupContainer.style.opacity = '0';         // Fade out
      setTimeout(() => {
          popupContainer.style.visibility = 'hidden'; // Hide after fading out
      }, 500); // Match the transition duration
  }
}


window.openPopupLogin = openPopupLogin;
window.closePopupLogin = closePopupLogin;

// Initialize the popup when the page loads
createPopupLogin();

// Example call to open the popup from anywhere in main.js
// openPopupLogin();




async function verifySecurityQuestionPopup(nextAction) {
  // Retrieve stored user data
  const storedUserData = getUserData() || {};


    // Check if user has security questions set
    if (!storedUserData.securityQuestions || storedUserData.securityQuestions.length === 0) {
        showToast('Please complete your account setup by setting security questions.', 'info');
        openSecuritySetupPopup();
        return;
    }

    // Select a random security question
    const randomIndex = Math.floor(Math.random() * storedUserData.securityQuestions.length);
    const randomQuestion = storedUserData.securityQuestions[randomIndex];

    // Create popup for answering security question
    const popup = document.createElement('div');
    popup.className = 'popup-container';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Security Verification</h3>
            <p>Please answer the following security question:</p>
            <p><strong>${randomQuestion}</strong></p>
            <input type="text" id="securityAnswer" placeholder="Enter your answer" maxlength="100">
            <button id="verifyAnswer" class="btn btn-primary">Verify</button>
            <button id="cancelVerification" class="btn btn-secondary">Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);



let securityQuestionFailCount = storedUserData.securityQuestionFailCount || 0;
let securityQuestionResetTime = storedUserData.securityQuestionResetTime || null;

// Event listener for verify button
document.getElementById('verifyAnswer').addEventListener('click', () => {
    const userAnswer = document.getElementById('securityAnswer').value.trim();
    
    if (userAnswer && userAnswer === userData.securityQuestions[randomIndex]) {
        // Reset fail count on correct answer
        securityQuestionFailCount = 0;
        updateUserData({ securityQuestionFailCount });  // Save updated count
        showToast('Security verification successful.', 'success');
        document.body.removeChild(popup);
        nextAction();  // Proceed with the action
    } else {
        securityQuestionFailCount += 1;
        const now = new Date();

        // Set reset time if limit reached
        if (securityQuestionFailCount === 3) {
            securityQuestionResetTime = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
            updateUserData({ securityQuestionFailCount, securityQuestionResetTime });
        } else {
            updateUserData({ securityQuestionFailCount });
        }

        if (securityQuestionResetTime && new Date() > new Date(securityQuestionResetTime)) {
            // Reset fail count after reset time passes
            securityQuestionFailCount = 0;
            securityQuestionResetTime = null;
            updateUserData({ securityQuestionFailCount, securityQuestionResetTime });
        } else if (securityQuestionFailCount >= 3) {
            showToast('Too many incorrect attempts. Please try again later.', 'error');
            document.body.removeChild(popup);
        } else {
            showToast('Incorrect answer. Please try again.', 'error');
        }
    }
});

// Helper function to update and encode user data
function updateUserData(data) {
    const userData = { ...getUserData(), ...data };
    const encodedData = setUserData(userData);
    localStorage.setItem('userData', encodedData);
}

    // Event listener for cancel button
    document.getElementById('cancelVerification').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}


window.verifySecurityQuestionPopup = verifySecurityQuestionPopup;


function openSecuritySetupPopup() {
  // Add your existing security question setup logic here
  showToast('Redirecting to security setup...', 'info');
  
  setTimeout(() => {
      window.location.href = 'https://reelcareer.co/u/account.html#reset-security-questions';
  }, 3000); // 3-second delay before redirecting
}


