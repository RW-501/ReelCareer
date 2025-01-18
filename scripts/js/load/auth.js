

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
  popupContainer.style.position = 'fixed';
  popupContainer.style.top = '0';
  popupContainer.style.left = '0';
  popupContainer.style.width = '100%';
  popupContainer.style.height = '100%';
  popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  popupContainer.style.display = 'flex';
  popupContainer.style.justifyContent = 'center';
  popupContainer.style.alignItems = 'center';
  popupContainer.style.zIndex = '1000';
  popupContainer.style.visibility = 'hidden';

  popupContainer.innerHTML = `
      <div id="popup-login-content" style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); width: 90%; max-width: 400px; position: relative;">
          <span id="popup-login-close" style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 18px;">&times;</span>
          <form id="popup-login-form">
              <h2>Log In</h2>
              <input type="email" id="popup-login-email" placeholder="Email" required style="width: 100%; padding: 10px; margin-bottom: 10px;">
              <div class="input-container">
                  <input type="password" id="popup-login-password" placeholder="Password" required style="width: 100%; padding: 10px;">
                  <span id="toggle-popup-login-password" style="cursor: pointer;">👁️</span>
              </div>
              <button type="submit" style="width: 100%; padding: 10px; background: #639ad4; color: white; border: none; border-radius: 4px; cursor: pointer;">Log In</button>
          </form>
      </div>
  `;

  document.body.appendChild(popupContainer);

  // Close popup when the close button or outside is clicked
  document.getElementById('popup-login-close').addEventListener('click', closePopupLogin);
  popupContainer.addEventListener('click', function(event) {
      if (event.target === popupContainer) closePopupLogin();
  });

  // Toggle password visibility
  document.getElementById('toggle-popup-login-password').addEventListener('click', function() {
      const passwordField = document.getElementById('popup-login-password');
      passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  });

  // Form submit handler (example)
  document.getElementById('popup-login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('popup-login-email').value;
      const password = document.getElementById('popup-login-password').value;
      alert(`Logging in with Email: ${email}`);
      closePopupLogin();
  });
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


