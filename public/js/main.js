import {
  db, getStorage, ref, uploadBytes, getDownloadURL, limit,
doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
where, getDocs, storage, getAuth, collection, auth, analytics, 
googleProvider,onSnapshot ,  batch,
facebookProvider,writeBatch ,
getUserId // Export the function
} from 'https://reelcareer.co/js/module.js';



// Function to encode user data
const encodeUserData = (userData, secretKey = '') => {
  try {
 //   console.log("secretKey: ", secretKey);

    // Serialize user data to a JSON string
    const jsonString = JSON.stringify(userData);
    if (!jsonString) {
      console.error("Error: User data is empty or invalid");
      return null;
    }
  //  console.log("userData User Data: ", userData);
   // console.log("jsonString Data: ", jsonString);

    // Base64 encode the JSON string
    let base64String = btoa(jsonString);
   // console.log("base64String Data: ", base64String);

    // Optionally append a secret key for obfuscation
    if (secretKey) {
      base64String = btoa(base64String + secretKey);
    }

   // console.log("Encoded Data: ", base64String);
    return base64String;
  } catch (error) {
    console.error("Error encoding user data:", error);
    return null;
  }
};

window.encodeUserData = encodeUserData;

// Function to decode user data
const decodeUserData = (encodedData, secretKey = '') => {
  try {
   // console.log("Encoded Data: ", encodedData);

    // Optionally remove the secret key if it's been appended
    let base64String = encodedData;
    if (secretKey) {
      base64String = base64String.replace(secretKey, ''); // Remove the secret key if appended
    }

    // Decode from Base64
    let jsonString = atob(base64String);
 //   console.log("Decoded Base64 String: ", jsonString);

    // Check if the decoded string is valid JSON
    try {
      const userData = JSON.parse(jsonString);
    //  console.log("Decoded User Data: ", userData);
      return userData;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
     // console.log("Decoded Base64 String is not valid JSON:", jsonString);
      return null;
    }

  } catch (error) {
    console.error("Error decoding user data:", error);
    return null;
  }
};


window.decodeUserData = decodeUserData;









// Function to update or create user information in Firestore
const saveUserLoginState = async (user) => {
  try {
    //console.log(" User info: ", user);

 
let jobArray = [], tagArray = [];

const userDataSaved =  getUserData() || [];
const userIP = sessionStorage.getItem('userIP') || "";

    let userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];

    let userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];
    //console.log(" User userIP: ", userIP);

    
    const profilePic = document.getElementById('nav-bar-profilePic').src;

 

    if(userTagInterest.length == 0){
      userTagInterest = [
   {
    tag: locationData.city,
    rank: 1
    }, {
      isLast: true,
      tag: locationData.state,
      rank: 1
      }, {
        isLast: true,
        tag: "job",
        rank: 1
        }, {
          isLast: true,
          tag: "jobs",
          rank: 1
          }
  ];
  }

  if(userJobInterest.length == 0){
    userJobInterest =  [  {
      isLast: true,
      job: locationData.city,
      rank: 1
      }, {
        isLast: true,
        job: locationData.state,
        rank: 1
        }, {
          isLast: true,
          job: "job",
          rank: 1
          }, {
            isLast: true,
            job: "jobs",
            rank: 1
            }
    ];
  }
   tagArray = userTagInterest.map(item => item.tag); // Extract only the tags

   jobArray = userJobInterest.map(item => item.job); // Extract only the tags

 // console.log(" User tagArray: ", tagArray);
 // console.log(" User jobArray: ", jobArray);

 // console.log(" userTagInterest: ", userTagInterest);
 // console.log(" userJobInterest: ", userJobInterest);

    let userData = {
      email: user.email || "Unknown",
      lastLogin: serverTimestamp(),
      ipAddress: userIP || "",
      userID: user.uid || "",
      displayName: userDataSaved.displayName || user.displayName,
      verified: user.emailVerified || false,
      phoneNumber: user.phoneNumber || '',
      profilePicture: user.photoURL || profilePic,
      membershipType: userDataSaved.membershipType || "free",
      membershipExpiry: userDataSaved.membershipExpiry || new Date(new Date().setDate(new Date().getDate() + 30)), // 30-day deadline

  

      tags: tagArray || "",
      jobInterest: jobArray  || "",
      publicProfile: userDataSaved.publicProfile || true,
      resumeCount: userDataSaved.resumes?.length || 0, // Optional chaining prevents errors if `resumes` is undefined
      savedForLater: userDataSaved.savedJobs?.length || 0,
      userAppsCount: userDataSaved.userApps?.length || 0,
      jobPostsCount: userDataSaved.jobPosts?.length || 0,
      tagsCount: tagArray.length || 0,
      jobInterestCount: jobArray.length || 0,

    };

    //console.log(" User userData: ", userData);

 

    const userDocRef = doc(db, "Users", user.uid);
    await setDoc(userDocRef, userData, { merge: true });




 userData = setUserData(userData);
// console.log("userData   ",userData);

 localStorage.setItem('userData', userData);

 
//let newUserData = getUserData();

//console.log("newUserData   ",newUserData);

    localStorage.setItem('userJobInterest', JSON.stringify(userJobInterest));
    localStorage.setItem('userTagInterest', JSON.stringify(userTagInterest));


    localStorage.setItem("userLoggedIn", "true");


    showToast("Login state saved successfully!", "success");

  window.location.href = "/u/"; // Redirect to profile

    
  } catch (error) {
    console.error("Error saving user login state:", error);
  }



};

// Add padding to Base64 string if necessary
const addBase64Padding = (base64String) => {
  return base64String.length % 4 === 0 ? base64String : base64String + '='.repeat(4 - (base64String.length % 4));
};

const LOCAL_STORAGE_KEY = 'userData';

function setUserData(userData) {


      // Retrieve the current object from localStorage
      let currentData = getUserData() || {};
  
      // Merge the updates into the current data
      const updatedData = { ...currentData, ...userData };
      
 
      console.log("updatedData Data:", updatedData);


  // Encode user data
  let encodedData = encodeUserData(updatedData, "WeThaBest");
  encodedData = addBase64Padding(encodedData);

  //console.log("Encoded Data:", encodedData);

  // Store in localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, encodedData);
    
  return encodedData;
}

window.setUserData = setUserData;

function getUserData() {
  try {
    const encodedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!encodedData) {
      //console.error("No data found in localStorage");
      return null;
    }

    // Remove the secret key if it's appended (you need to know how the secret key was appended)
    const secretKey = "WeThaBest"; // Your secret key used during encoding
    const decodedString = atob(encodedData); // Decode base64 first

    // Remove the secret key part (if it was added during encoding)
    const base64WithoutSecretKey = decodedString.replace(secretKey, "");
   // console.log("Decoded Base64 String without Secret Key:", base64WithoutSecretKey);

    // Now decode the base64 string without the secret key
    const jsonString = atob(base64WithoutSecretKey);

    // Parse the JSON string
    const userData = JSON.parse(jsonString);
   // console.log("Decoded User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Error decoding user data:", error);
    return null;
  }
}

window.getUserData = getUserData;





// Function to update a specific value in localStorage
function updateLocalStorage(key, updates) {
  // Retrieve the current object from localStorage
  let currentData = JSON.parse(localStorage.getItem(key)) || {};
  
  // Merge the updates into the current data
  const updatedData = { ...currentData, ...updates };
  
  // Save the updated object back to localStorage
  localStorage.setItem(key, JSON.stringify(updatedData));
}

window.updateLocalStorage = updateLocalStorage;






let userDataSaved = await getUserData() || {};

// To verify
//console.log("userDataSaved   ", userDataSaved);






const convertFirestoreTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.seconds) {
    console.error('Invalid timestamp:', timestamp);
    return 'Invalid Timestamp'; // Or you can return null or any default value you prefer
  }

  // Create a new Date object from the timestamp (seconds value)
  const date = new Date(timestamp.seconds * 1000); // Multiply by 1000 to convert to milliseconds
  return date.toLocaleString(); // Or you can use any formatting method you prefer
};

window.convertFirestoreTimestamp = convertFirestoreTimestamp;

// Event listener to handle clicks outside dropdown to close it
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById("dropdown");
  if (dropdown && !dropdown.contains(e.target) && !e.target.closest(".dropdown-toggle")) {
    dropdown.classList.remove("open");
  }
});







async function logoutUser() {
  try {
    await signOut(auth);

    // Clear auto logout timer and localStorage
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
// Event listener to handle login forms, popups, and more...
document.getElementById("logout-button")?.addEventListener("click", logoutUser);



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


// Other event listeners (Google, Facebook, Apple login) go here...
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
    } catch (error) {
      console.error("Error during sign up:", error);
      showToast(error.message, 'error');
    } finally {
      hideLoading();
    }
  });



  // Improved login form submission
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
// Get values from the login form
const email = sanitizeInput(document.getElementById("login-email").value);
const password = sanitizeInput(document.getElementById("login-password").value);

  showLoading();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserLoginState(userCredential.user);
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
document.getElementById("phoneLogin")?.addEventListener("click", async () => {
    const phoneNumberInput = document.getElementById("phoneNumber").value.trim();
    const phoneNumberError = document.getElementById("phoneNumberError");


    if(!phoneNumberInput){
      return;
    }
    showLoading(); // Show loading spinner
    try {
        // Format and validate phone number
        const phoneNumber = formatPhoneNumber(phoneNumberInput);
        phoneNumberError.style.display = "none";

        // Initialize reCAPTCHA
        const appVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
        await appVerifier.render();
        
        // Send SMS code
        confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        showToast("Code sent successfully.");
        
        // Show verification code input
        document.getElementById("verifyCodeButton").style.display = "block";
        document.getElementById("verificationCodeGroup").style.display = "block";
        document.getElementById("sendVerificationCode").style.display = "none";

    } catch (error) {
        phoneNumberError.textContent = error.message;
        phoneNumberError.style.display = "block";
        showToast("Error sending code. Try again.", "error");
    } finally {
        hideLoading(); // Hide loading spinner
    }
});

// Verify Code Function
document.getElementById("verifyCode")?.addEventListener("click", async () => {
    const verificationCode = document.getElementById("verificationCode").value.trim();

    if (!verificationCode) {
        showToast("Please enter the verification code.", "error");
        return;
    }

    showLoading(); // Show loading spinner
    try {
        // Confirm verification code
        const result = await confirmationResult.confirm(verificationCode);
        const user = result.user;

        console.log("User verified:", user);
        await saveUserLoginState(user, true); // Save user state

        showToast("Login successful!", "success");
        document.getElementById("success-message").innerText = "Login successful!";
        document.getElementById("success-message").style.display = "block";

        // Redirect or show dashboard
        showDashboard();

    } catch (error) {
        handleError("Invalid verification code. Please try again.", error);
        showToast("Invalid verification code. Try again.", "error");
    } finally {
        hideLoading(); // Hide loading spinner
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



// Function to check and hide profile modal when logging out
function checkUserProfile() {
  console.log("checkUserProfile");

  const profileModal = document.getElementById("profileModal");
  const modalInstance = bootstrap.Modal.getInstance(profileModal);
  modalInstance.hide();
}
window.checkUserProfile = checkUserProfile;







function createNavbar() {
  const currentPage = window.location.pathname;
  const isHomePage =
    currentPage === "/index.html" ||
    currentPage === "/index" ||
    currentPage === "" ||
    currentPage === "/";

  const navbarClass = isHomePage ? "main-navbar-light" : "main-navbar-dark";
  const toggleClass = isHomePage
    ? "dropdown-toggle-light"
    : "dropdown-toggle-dark";

  // JSON Data for Nav Items with aria-label
  const navItems = [
    {
      href: "https://reelcareer.co/job-listings",
      icon: "fa fa-briefcase",
      text: "Job Listings",
      ariaLabel: "Go to job listings page",
    },
    {
      href: "https://reelcareer.co/reels",
      icon: "fa fa-video",
      text: "Reels",
      ariaLabel: "Go to reels page",
    },
    {
      href: "https://reelcareer.co/views/membership",
      icon: "fa fa-user",
      text: "Membership",
      ariaLabel: "Go to membership page",
    },
    {
      href: "https://reelcareer.co/views/blogs",
      icon: "fa fa-pencil-alt",
      text: "Blogs",
      ariaLabel: "Go to blogs page",
    },
    /*
    {
      href: "https://reelcareer.co/views/about",
      icon: "fa fa-info-circle",
      text: "About Us",
      ariaLabel: "Go to about us page",
    },

    */
  ];

  // Generate Icons for Always-Visible Bar
  const generateIcons = (items) =>
    items
      .map(
        (item) => `
        <li class="nav-item mx-2">
          <a class="nav-link" href="${item.href}" aria-label="${item.ariaLabel}">
            <i class="${item.icon}"></i>
          </a>
        </li>`
      )
      .join("");


      

  return `
    <nav id="Main-Nav_bar" class="navbar navbar-expand-lg ${navbarClass} shadow-sm sticky-top" role="navigation">
      <div class="container d-flex align-items-center justify-content-between">
        <!-- Logo -->
        <a class="navbar-brand embossed" id="MAIN-LOGO-Reel-Career" href="https://reelcareer.co/" aria-label="Go to home page">
          ReelCareer
        </a>

        <!-- Always-visible Icons -->
        <ul class="navbar-nav d-flex flex-row justify-content-center flex-grow-1" id="iconBar">
          ${generateIcons(navItems)}
        </ul>

        <!-- Auth Section -->
        <div id="authSection" class="d-flex align-items-center">
          <button id="darkModeToggle" class="btn btn-outline-secondary" aria-label="Toggle dark mode">Dark Mode</button>
        </div>
      </div>
    </nav>
  `;
}






// Dark mode toggle functionality
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");


  // Check if the body has the dark-mode class, and set darkMode to true or false
  const userData = {
    darkMode: document.body.classList.contains("dark-mode") || false
  };
  const userDataEcode = setUserData(userData);
  localStorage.setItem('userData', userDataEcode);

}


// Add smoother transitions for modals and popups
const applySmoothTransitions = () => {
  const styles = document.createElement('style');
  styles.innerHTML = `
    #login-popup {
      animation: fadeIn 1s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(styles);
};

window.addEventListener('load', () => {
  applySmoothTransitions();
});



// Helper function to handle authentication state changes
function handleAuthStateChanged(user) {
  const authSection = document.getElementById("authSection");

  if (user) {

    const userDataSaved = getUserData() || [];


    const dropdownMenuItems = [
      {
        title: "Profile",
        href: "https://reelcareer.co/u/",
        icon: "fa fa-user",
        ariaLabel: "Go to Profile"
      },
      {
        title: "Create",
        href: "https://reelcareer.co/u/create",
        icon: "fa fa-plus-circle",
        ariaLabel: "Create Content"
      },
      {
        title: "Messaging",
        href: "https://reelcareer.co/u/messaging",
        icon: "fa fa-envelope",
        ariaLabel: "View Messages"
      },
      {
        title: "Job Seeker",
        href: "https://reelcareer.co/u/seeker/",
        icon: "fa fa-briefcase",
        ariaLabel: "Go to Job Seeker Dashboard"
      },
      {
        title: "Recruiter Dashboard",
        href: "https://reelcareer.co/u/recuiter/",
        icon: "fa fa-tachometer-alt",
        ariaLabel: "Go to Recruiter Dashboard"
      },
    ];
    

    // If logged in, show profile info and logout button
    const userName = userDataSaved.displayName || "User";
    const userPhoto = userDataSaved.profilePicture
      ? `<img id="nav-bar-profilePic" src="${userDataSaved.profilePicture}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`
      : `<img id="nav-bar-profilePic" src="https://reelcareer.co/images/sq_logo_n_BG_sm.png" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`;
    
    // Function to generate dropdown items
    const generateDropdownItems = (items) => {
      return items
        .map(
          (item) => `
          <a class="dropdown-item" href="${item.href}" aria-label="${item.ariaLabel}">
            <i class="${item.icon}" style="margin-right: 8px;"></i> ${item.title}
          </a>
        `
        )
        .join("");
    };
    
    // Add the dropdown menu dynamically
    authSection.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${userPhoto} Welcome, <name id="nav-user-name">${userName}</name>
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
          ${generateDropdownItems(dropdownMenuItems)}
          <hr>
          <button class="dropdown-item" id="logoutButton">
            <i class="fa fa-sign-out-alt" style="margin-right: 8px;"></i> Logout
          </button>
        </div>
      </div>`;
    
    
      // Display Job Seeker and Recruiter links

    document.getElementById("logoutButton").onclick = logoutUser;
  } else {
    // If not logged in, show login button

    authSection.innerHTML = `<button class="btn btn-primary" id="loginButton">Login / Create Account</button>`;

    document.getElementById("loginButton").onclick = () => {
      window.location.href = "https://reelcareer.co/views/auth"; // Redirect to login page
    };
  }

  // Dropdown toggle and close logic
  setupDropdownToggle();
}

window.handleAuthStateChanged = handleAuthStateChanged;


// Dropdown toggle and close logic encapsulated into a function
function setupDropdownToggle() {
  const dropdownToggleButton = document.getElementById("profileDropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownMenu) {
    dropdownToggleButton.addEventListener("click", function () {
      const isExpanded = dropdownToggleButton.getAttribute("aria-expanded") === "true";
      dropdownToggleButton.setAttribute("aria-expanded", !isExpanded);
      dropdownMenu.classList.toggle("show", !isExpanded); // Show or hide the dropdown
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!dropdownToggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownToggleButton.setAttribute("aria-expanded", false);
        dropdownMenu.classList.remove("show");
      }
    });
  }
}

document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick);

function handleOutsideClick(event) {
  const navBar = document.getElementById('Main-Nav_bar');
  const navCollapse = document.getElementById('navbarNav');
if(navBar && navCollapse ){
  // Check if the click/touch is outside the navbar and the collapse menu
  if (!navBar.contains(event.target) && navCollapse.classList.contains('show')) {
    navCollapse.classList.remove('show'); // Collapse the navbar if it's open
  }
}
}








// Function to extract the state name from the URL (e.g., /jobs/state/ohio)
function getKeyFromURL(key) {
  // Get the full URL
  const urlParams = new URLSearchParams(window.location.search);

  // Get the value of the 's' parameter
  let segment = urlParams.get(key);

  if (!segment) return null;  // Return null if no state is found

  // Format the state name (capitalize the first letter of each word)
  segment = segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

    console.log("segment ",segment);
  return segment;
}

window.getKeyFromURL = getKeyFromURL;
  




async function checkImageURL(url) {
  try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
          return url; // Image is accessible
      } else if (response.status === 403) {
       //   console.error(`403 Forbidden: Cannot access the image at ${url}`);
          return 'https://reelcareer.co/images/rc_text_sm.png'; // Correct the protocol here
      } else {
      //    console.warn(`Unexpected response: ${response.status}`);
          return 'https://reelcareer.co/images/rc_text_sm.png'; // Correct the protocol here
      }
  } catch (error) {
    //  console.error(`Error checking image URL: ${error.message}`);
      return 'https://reelcareer.co/images/rc_text_sm.png'; // Correct the protocol here
  }
}


window.checkImageURL = checkImageURL;




// Improved: Preparing location data for Firebase with validation and defaults
function prepareLocationForFirebase() {
  let userLocationData = sessionStorage.getItem('userLocation');

  if (typeof userLocationData === 'string') {
      try {
          userLocationData = JSON.parse(userLocationData); // Safely parse string
      } catch (e) {
          console.error("Invalid JSON in userLocationData:", e);
          return ['', '', '', '']; // Return empty if parsing fails
      }
  }

  // Destructure with defaults for undefined properties
  const { city = '', state = '', zip = '', country = '' } = userLocationData || {};
  return [city, state, zip, country];
}

window.prepareLocationForFirebase = prepareLocationForFirebase;
// Shuffle array utility function with a cleaner approach
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Function to display blogs dynamically with enhanced error handling
async function loadRelatedBlogs() {
  const maxSimilarBlogs = 6;
  const blogContainer = document.getElementById('blogContainer');
  const allBlogs = [];

  try {
      const blogsRef = collection(db, 'Blogs');
      const uTagInterestNorm = getUserTagInterest();
      const uJobInterestNorm = getUserJobInterest();
      const locationArray = prepareLocationForFirebase();

      let queryConfig = null;
      if (uTagInterestNorm.length > 0) {
          queryConfig = query(blogsRef, where('tags', 'array-contains-any', uTagInterestNorm), limit(maxSimilarBlogs));
      } else if (uJobInterestNorm.length > 0) {
          queryConfig = query(blogsRef, where('tags', 'array-contains-any', uJobInterestNorm), limit(maxSimilarBlogs));
      } else {
          queryConfig = query(blogsRef, where('tags', 'array-contains-any', locationArray), limit(maxSimilarBlogs));
      }

      const querySnapshot = await getDocs(queryConfig);

      querySnapshot.forEach((doc) => {
          allBlogs.push({ id: doc.id, ...doc.data() });
      });

      if (allBlogs.length > 0) {
          shuffleArray(allBlogs); // Randomize blog order
          displayBlogs(allBlogs, blogContainer); // Display blogs
      } else {
          console.log("No related blogs found.");
          displayEmptyState(blogContainer, 'No related blogs found.', 'fas fa-blog');
      }

  } catch (error) {
      console.error("Error fetching related blogs:", error);
      displayEmptyState(blogContainer, 'Error loading related blogs.', 'fas fa-exclamation-triangle');
  }
}

window.loadRelatedBlogs = loadRelatedBlogs;

// Function to display fetched blogs
async function displayBlogs(blogs, container) {
  container.innerHTML = ''; // Clear previous blogs

  for (const blog of blogs) {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blogCard');
    
    // Use await to resolve the image URL before using it
    const imageUrl = await checkImageURL(blog.imageUrl);

    blogCard.innerHTML = `
        <div class="card blog-card shadow-sm">
            <div data-bs-toggle="modal" data-bs-target="#blogModal" class="blog-card-trigger" data-blog-id="${blog.id}">
                 
                   <div class="blog-image-area"> <img src="${imageUrl}" alt="${blog.title}" class="blog-card-img-top lazy-image" loading="lazy" />
              </div> 
                <div class="card-body">
                    <a href="https://reelcareer.co/views/blog?b=${blog.id}">
                        <h5 class="card-title text-primary">${blog.title}</h5>
                    </a>
                    <div class="blog-card-text text-muted">
                       <a  title="${blog.title}" href="https://reelcareer.co/views/blog?b=${blog.id}"> <div>${truncateText(blog.content, 80, `https://reelcareer.co/views/blog?b=${blog.id}`)}</div></a>
                    </div>
                
                    
                    <a class="btn btn-outline-primary blog-card-trigger" title="${blog.title}" href="https://reelcareer.co/views/blog?b=${blog.id}">Read More</a>
                </div>
            </div>
        </div>
    `;
    container.appendChild(blogCard);
  }
}


// Function to fetch and display similar jobs with better handling
async function getSimilarJobs() {
  const maxSimilarJobs = 6;
  const jobsContainer = document.getElementById('similarJobsContainer');

  try {
      const jobInterestNorm = getUserJobInterest();
      const locationArray = prepareLocationForFirebase();
      const jobsRef = collection(db, 'Jobs');

      let queryConfig;
      if (jobInterestNorm.length === 0) {
          queryConfig = query(jobsRef, where('location', 'array-contains-any', locationArray), limit(maxSimilarJobs));
      } else {
          queryConfig = query(jobsRef, where('searchableTitle', 'array-contains-any', jobInterestNorm), limit(maxSimilarJobs));
      }

      const querySnapshot = await getDocs(queryConfig);

      if (!jobsContainer || querySnapshot.empty) {
          displayEmptyState(jobsContainer, 'No related jobs found.', 'fas fa-briefcase');
          return;
      }

      jobsContainer.innerHTML = ''; // Reset container

      querySnapshot.forEach((doc) => {
          const jobData = doc.data();
          const jobCard = createJobCard(doc.id, jobData);
          jobsContainer.appendChild(jobCard);
      });

  } catch (error) {
      console.error("Error fetching similar jobs:", error);
      displayEmptyState(jobsContainer, 'Error loading similar jobs.', 'fas fa-exclamation-triangle');
  }
}
window.getSimilarJobs = getSimilarJobs;

// Function to create a job card element
function createJobCard(jobId, jobData) {
  const jobCard = document.createElement('div');
  jobCard.classList.add('col-md-6', 'col-lg-4', 'mb-3');
  jobCard.innerHTML = `
      <div class="similar-job-card">
          <h5><a href="https://reelcareer.co/jobs/job-details?id=${jobId}" class="job-title-link">${jobData.title}</a></h5>
          <p><strong>${jobData.company}</strong> - ${formatLocation(jobData.location)}</p>
          <p class="card-text"><strong>Type:</strong> ${formatJobType(jobData.type)}</p>
          <p class="card-text"><strong>Salary:</strong> ${formatCurrency(jobData.salary, { decimals: 0 })}</p>
          <div class="job-tags mt-2">
              ${jobData.tags.map(tag => `
                  <a href="https://reelcareer.co/job-listings?tag=${encodeURIComponent(tag)}" class="btn btn-primary badge" style="margin: 0.2rem;">${tag}</a>
              `).join('')}
          </div>
          <a href="https://reelcareer.co/jobs/job-details?id=${jobId}" class="view-job-btn">View Job</a>
      </div>
  `;
  return jobCard;
}

// Function to display an empty state
function displayEmptyState(container, message, iconClass = 'fas fa-search') {
  container.innerHTML = `
      <div class="empty-state text-center my-4">
          <i class="${iconClass} fa-3x text-muted"></i>
          <p class="text-muted mt-2">${message}</p>
      </div>
  `;
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
      "url": "/views/blogs",
      "name": "Blogs",
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
      "category": "Content",
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
      "category": "Features",
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
      "url": "/job-listings",
      "name": "Job Listings",
      "title": "Job Listings - Search and Apply for Job Openings",
      "category": "General",
      "order": 14
    },
        {
          "url": "/bot",
          "name": "Chat Bot",
          "title": "Chat Bot - Get Instant Assistance with Your Job Search",
          "category": "Support",
          "order": 15
        },
        {
          "url": "/reels",
          "name": "Video Reels",
          "title": "Video Reels - Showcase Your Resume with a Personal Touch",
          "category": "Content",
          "order": 16
        },
        {
          "url": "/support",
          "name": "Support",
          "title": "Support - Get Help with Your Job Search and Account",
          "category": "Support",
          "order": 17
        },
        {
          "url": "/membership",
          "name": "Membership",
          "title": "Membership - Unlock Premium Features and Job Opportunities",
          "category": "General",
          "order": 18
        }
      
      
  ];
  
  // Sort the links based on their order
  footerLinks.sort((a, b) => a.order - b.order);





  const config = {
    newsletter: {
      rateLimitTime: 60000, // Example: 60 seconds
      maxAttempts: 3,
      storageKey: "newsletter_hasSignedUp",
      messages: {
        alreadySubscribed: "You have already subscribed to the newsletter.",
        tooManyAttempts: "Too many attempts. Please try again later.",
        success: email => `Thank you for subscribing, ${email}!`,
        error: "Error: Unable to subscribe. Please try again."
      }
    },
    footer: {
      currentYear: new Date().getFullYear(),


    },
    companyMedia: {
      title: "ReelCareer Media",
      titleStyle: "color: #83bad9; font-weight: 800; text-shadow: 1px 0px 0px #6253e7;",
      video: {
        source: "https://reelcareer.co/images/intro.MP4",
        type: "video/mp4"
      },
      image: {
        src: "https://reelcareer.co/images/sq_logo_n_BG_tie_reelx.png",
        alt: "ReelCareer.co  Image",
        style: "width: 15rem;"
      }
    }
  };
  
  
  


    // Group links by category
    const groupedLinks = footerLinks.reduce((acc, link) => {
      if (!acc[link.category]) acc[link.category] = [];
      acc[link.category].push(link);
      return acc;
  }, {});


  // Render dynamic footer links
  function renderFooterLinks() {
    const { currentYear, links } = config.footer;
    const uploadDate = new Date().toISOString();

    const footerHTML = `
      <footer>
        <div class="footerMainContainer text-center">
          <p class="footerSocialMedia" ></p>
          <nav class='footerNavContainer'>
            ${Object.keys(groupedLinks).map(category => `
              <div class='footerNavItems'>
                <h5>${category}</h5>
                ${groupedLinks[category].map(link => `<a href="${link.url}" title="${link.title}">${link.name}</a>`).join("")}
              </div>`).join("\n")}
          </nav>
                    <p class="footerCopyWrite" >&copy; ${currentYear} ReelCareer</p>

        </div>
<button id="backToTop" title="Go to top">↑</button>

      </footer>`;
      const footer = document.getElementById('dynamic-footer');

    footer.insertAdjacentHTML("beforeend", footerHTML);
  }
  
  // Render company media
  function renderCompanyMedia() {
    const { title, titleStyle, video, image } = config.companyMedia;
    const uploadDate = new Date().toISOString();

    const mediaHTML = `
      <section id="companyMedia" class="bg-light py-5 company-media">
        <div class="container">
          <h2 class="text-center" style="${titleStyle}">${title}</h2>
          <div class="footerMediaArea text-center">
            <div class="col-md-6 m-auto">
              <div class="footerVideoContainer">
                <video  class="footerVideo"  loop autoplay muted loading="lazy">
                  <source src="${video.source}" type="${video.type}">
                  Your browser does not support the video tag.
                </video>
                ${`<script type="application/ld+json">
                  {
                    "@context": "https://schema.org",
                    "@type": "VideoObject",
                    "name": "Intro Video",
                    "description": "Introduction to ReelCareer",
                    "thumbnailUrl": "${image.src}",
                    "uploadDate": "${uploadDate} , 
                    "contentUrl": "${video.source}",
                    "embedUrl": "${video.source}",
                    "encodingFormat": "video/mp4",
                     "duration": "PT2M30S"
                  }
                  </script>
                  `}
                  <a href="${video.source}"style="
    display: block;
">Watch our latest video</a>

              </div>
            </div>
            <div class="col-md-6 m-auto">
            <a href="${image.src}">
<img loading="lazy" src="${image.src}" alt="${image.alt}" class="img-fluid" style="${image.style}">
          </a>
</div>
          </div>
        </div>
      </section>`;
    document.body.insertAdjacentHTML("beforeend", mediaHTML);
  }
  
 
  

  // Render dynamic content
  renderFooterLinks();
  renderCompanyMedia();

  // Back to Top Button Functionality
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Update the event listener for the newsletter form
  const newsletterFormBtn = document.getElementById("newsletterFormBtn");
  if (newsletterFormBtn) {
    newsletterFormBtn.addEventListener("submit", async function (event) {
      event.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (!document.getElementById("dataPrivacy")?.checked) {
        showToast("You must agree to the data privacy policy.", 'warning');
        return;
      }

      await handleNewsletterSignup(email);
    });
  }



}

// Call the function to update the footer when the document is loaded
document.addEventListener("DOMContentLoaded", updateFooter);




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
            if (!ipAddress && !locationData) { // Fixed condition here
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
  const { pathname, search, hash } = window.location;


  /*
  // Ensure valid pathname, search, and hash values before proceeding
  if (!pathname || !search || !hash) {
   // console.error("Missing necessary parts of the URL: pathname, search, or hash.");
    return "home"; // Return null or a default value
  }
*/

  // Extract the base path and remove leading/trailing slashes
  const path = pathname.split('/').filter(Boolean).join('-');

  // Normalize query parameters and hash fragments
  const query = new URLSearchParams(search).toString(); // e.g., "id=ybczQ0a4ohnpkk8EOnHi"
  const hashFragment = hash.replace('#', ''); // Remove '#' from hash

  // Construct a uniform field name
  let page = path || 'home'; // Default to 'home' for empty paths
  if (query) page += `-${query}`;
  if (hashFragment) page += `-${hashFragment}`;

  // Append 'ViewedBy' for the field name
  const fieldName = `${page}ViewedBy`;

 // console.log(fieldName); // Log for debugging

  return fieldName || 'defaultViewedBy'; // Fallback value if the field name is somehow invalid
}



// Function to update view data on unload or visibility change
 async function updateViewData(ipAddress, actionTrack, actionName, pageTitle, jobTitleName  ) {
    const viewEndTime = Date.now();
    const durationOfTheView = (viewEndTime - viewStartTime) / 1000;
    const viewedByField = getViewedByField();

  //  console.log(`${durationOfTheView} durationOfTheView ???????? .`);

    
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");

    let userData = '';

    if (storedUserData) {
      // Parse the stored data
       userData = getUserData();
      // console.log(`${userData} userData ???????? .`);

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
            actionName: actionName || "Click",
            pageTitle: pageTitle,
            jobTitleName: jobTitleName || "N/A",
            referrer: document.referrer || 'Direct',
            lastViewDate: new Date().toISOString(),
            entryURL: window.location.href,


        },
        ipAddress: ipAddress || userData.ipAddress,
        name: userData.name || 'N/A',
        displayName: userData.displayName || 'N/A',
        userID: userData.userID || 'N/A',
        lastLogin: userData.lastLogin || 'N/A',
        city: locationData.city || 'N/A',
        state: locationData.state || 'N/A',
        zip: locationData.zip || 'N/A',
        country: locationData.country || 'N/A',
        locationData: locationData,
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
        totalDuration: increment(durationOfTheView),
        userBlocked: false
    };

    try {
        await setDoc(doc(db, 'Analytics', ipAddress || userData.ipAddress), viewData, { merge: true });
      //  console.log(`${viewedByField} data updated successfully.`);
    } catch (error) {
        console.error(`Error updating ${viewedByField} data:`, error);
    }
    viewStartTime = 0;
}

// Attach event listeners for tracking
 function setTrackingListeners(ipAddress) {
    window.addEventListener('beforeunload', setInternalPageSource);
    window.addEventListener('load', startViewTimer);
    //console.log("startViewTimer");
 

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
         // console.log("TrackingListeners  last");
         const pageTitle = document.title;

        // updateViewData(ipAddress, "visibilitychange", "N/A", pageTitle, "N/A"  );
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
            console.log(`Associated form: buttonText = ${buttonText}, target = ${target}`);
            // Check if the button is inside a class job-tags
            if (target.classList.contains('tags')) {
          
     

              handleTagInput(buttonText);
            

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

  // Helper function to clean and split input
  function splitAndCleanInput(input) {
    return input
      .split(/\s+/) // Split by whitespace
      .map(word => word.trim()) // Trim extra spaces
      .filter(word => word.length > 0) // Filter out empty strings
      .map(word => word.replace(/[^a-zA-Z0-9]/g, '')); // Remove characters that are not a-z, A-Z, or 0-9
  }
  
  // Main logic
  let userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];

  // Decay existing ranks
  userJobInterest = decayRanks(userJobInterest);

  // Rank increment values
  const rankIncrement = action === "apply" ? 5 : 2;

  // Process each job from the input
  const jobInputs = splitAndCleanInput(jobInput);
  jobInputs.forEach(job => {
    // Check if a similar job already exists
    const existingJobIndex = userJobInterest.findIndex(item => 
      isSimilarJob(item.job, job)
    );

    if (existingJobIndex !== -1) {
      // Increment rank if a similar job exists
      userJobInterest[existingJobIndex].rank += rankIncrement;
    } else {
      // Add a new job if it doesn't already exist
      const newJob = { job: job.trim(), rank: rankIncrement };
      if (userJobInterest.length === 15) { // Updated capacity from 6 to 15
        // If at capacity, replace the least popular job
        userJobInterest = prioritizeJobs(userJobInterest);
        userJobInterest.pop();
        userJobInterest.push(newJob);
      } else {
        // Add the new job directly if space is available
        userJobInterest.push(newJob);
      }
    }
  });

  // Mark the most recently clicked job as "last"
  userJobInterest.forEach(item => (item.isLast = false));
  const lastJobIndex = userJobInterest.findIndex(item => 
    jobInputs.some(job => isSimilarJob(item.job, job))
  );
  if (lastJobIndex !== -1) {
    userJobInterest[lastJobIndex].isLast = true;
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

  // Filter out invalid terms and limit to 10 items
  const filteredJobInterest = userJobInterest
    .map((item) => item.job.toLowerCase()) // Convert to lowercase
    .filter((term) => term.length > 2 && isNaN(term)) // Ensure valid terms
    .slice(0, 10); // Limit to 10 elements

  console.log('Filtered User Job Interests (lowercase):', filteredJobInterest);
  return filteredJobInterest;
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
 
  const filteredJTagInterest = userTagInterest
    .map((item) => item.tag.toLowerCase()) // Convert to lowercase
    .filter((term) => term.length > 2 && isNaN(term)) // Ensure valid terms
    .slice(0, 10); // Limit to 10 elements
 
 
  console.log('User Tag Interests (lowercase):', filteredJTagInterest);
  return filteredJTagInterest;
}


window.getUserTagInterest = getUserTagInterest;





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
  if (path.includes('/backend') || path.includes('/backend/index')) {
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


 

// Initialization
document.addEventListener('DOMContentLoaded', () => {
 

 


// Function to setup event listeners
function setupEventListeners() {
  // Dark Mode Toggle functionality
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle?.addEventListener("click", toggleDarkMode);




  const userDataSaved = getUserData() || [];

  // Initialize Dark Mode based on previous settings
  if (userDataSaved.darkMode === "true") {
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
let excludedPages = ["/backend/", "/admin/", "/settings/"];

// Replace the navbar if not on an excluded page
if (!excludedPages.some((excluded) => currentPage.startsWith(excluded))) {
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



if (window.checkUrl("/backend/") || window.checkUrl("/backend")) {
  console.log("Admin View");
  initializeAutoLogout();
} else {
  console.log("User View");
  attachTrackingListeners();
}


});



// General function to listen to Firestore events and show toast notifications
function listenForFirestoreEvents(collectionName, eventType) {
  const collectionRef = collection(db, collectionName); // Reference to the collection

  // Listener for collection changes
  onSnapshot(collectionRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' && eventType === 'new') {
        // New item added, trigger toast
        if (collectionName === 'Jobs') {
          showToast(`New job posted: ${change.doc.data().title}`);
        } else if (collectionName === 'Users') {
          showToast(`New member joined: ${change.doc.data().username}`);
        }
        // Add more collection-specific logic as needed

      } else if (change.type === 'modified' && eventType === 'update') {
        // Item updated, trigger toast
        if (collectionName === 'Jobs') {
          showToast(`Job updated: ${change.doc.data().title}`);
        } else if (collectionName === 'Users') {
          showToast(`Member updated: ${change.doc.data().username}`);
        }
        // Add more collection-specific logic as needed

      } else if (change.type === 'removed' && eventType === 'remove') {
        // Item removed, trigger toast
        if (collectionName === 'Jobs') {
          showToast(`Job removed: ${change.doc.data().title}`);
        } else if (collectionName === 'Users') {
          showToast(`Member removed: ${change.doc.data().username}`);
        }
        // Add more collection-specific logic as needed
      }
    });
  });
}
/*
// Example usage:
listenForFirestoreEvents('Jobs', 'new'); // For new job posts
listenForFirestoreEvents('Users', 'new'); // For new members
listenForFirestoreEvents('Jobs', 'update'); // For job updates
listenForFirestoreEvents('Users', 'update'); // For member updates
listenForFirestoreEvents('Jobs', 'remove'); // For job removals
*/








        








document.addEventListener('DOMContentLoaded', function () {
  
  function rollInAnimations(config = {}) {
    // Default configuration
    let {
      delayBetweenDivs = 1000, // Delay between div animations (ms)
      initialBodyDelay = 1000, // Delay before showing body (ms)
      animationDuration = 1000, // Animation duration (ms)
      animationTimingFunction = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Easing function for bounce effect
      hiddenClass = 'hide', // Class to hide body
      showClass = 'show',
    } = config;

 //   console.log('rollInAnimations config:', config);

    // Inject CSS Styles
    const loadingStyle = document.createElement('style');
    loadingStyle.innerHTML = `
      /* Hide body initially */
      body.${hiddenClass} { 
          opacity: 0; 
          overflow: hidden;
      }
  
      /* Hidden state for .main child divs */
      main > div {
          opacity: 0;
          transform: translateX(-100%);
          transition: opacity ${animationDuration}ms ${animationTimingFunction}, 
                      transform ${animationDuration}ms ${animationTimingFunction};
      }
  
      /* Roll-in effect */
      main > div.${showClass} {
          opacity: 1;
          transform: translateX(0);
      }
    `;
    document.head.appendChild(loadingStyle);

    const mainDivs = document.querySelectorAll('main > div');
    const mainContainer = document.querySelector('main');

    // Check if elements exist
    if (!mainDivs.length) {
   //   console.warn('No child divs found in .main container for animations.');
      return;
    }

    // Hide main container initially
    mainContainer.classList.add(hiddenClass);
    mainContainer.setAttribute('aria-hidden', 'true');

    // Reveal main container and trigger roll-in animations
    setTimeout(() => {
      mainContainer.classList.remove(hiddenClass);
      mainContainer.removeAttribute('aria-hidden');
    //  console.log('Main container revealed, starting roll-in animations...');

      // Sequentially add the "roll-in" class to each div with a delay
      mainDivs.forEach((div, index) => {
        setTimeout(() => {
          div.classList.add(showClass);
         // console.log(`Div #${index + 1} roll-in animation triggered.`);
        }, index * delayBetweenDivs);
      });
    }, initialBodyDelay);
  }






  
  


  function scrollToDivOnLoad(divId = null) {
    // Ensure the page loads at the top by default
    window.scrollTo({ top: 0, behavior: "auto" });
  
    // If divId parameter is provided, scroll to that element
    if (divId) {
        // Wait for the document to load completely
        document.addEventListener("DOMContentLoaded", function () {
            const targetDiv = document.getElementById(divId);
            if (targetDiv) {
                // Smooth scroll to the target element
                targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              //  console.warn(`Element with ID "${divId}" not found.`);
            }
        });
    }
  }
  
 
  
  /*
  // Extract `divId` from URL if available
  const urlParams = new URLSearchParams(window.location.search);
  const divId = urlParams.get("scrollTo");
  
  // Pass the extracted divId to the function
  scrollToDivOnLoad(divId);
  */
  
  // Scroll to a specific div if ID is provided, for example "targetDivId"
  //scrollToDivOnLoad("targetDivId");
        

  const waitForElements = (selector, callback) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      callback(elements);
    } else {
     // requestAnimationFrame(() => waitForElements(selector, callback));
    }
  };
  
  waitForElements("main", () => {
      // Example usage
  rollInAnimations();
 // Usage example:
  // Default load at the top
  scrollToDivOnLoad();
   // initializeLazyLoading(lazyLoadSettings);
  });
  



});








let USERDATA = '';


function getUserDisplayName() {
  // Retrieve user data from local storage
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData) {
    // Parse the stored data
     USERDATA =  getUserData();

    // Return the displayName if it exists
    return USERDATA.displayName || "No name available"; // Fallback if displayName is not set
  } else {
    //console.log("No user data found in local storage");
    return "No user data available"; // Fallback if no user data exists
  }
}


// Example usage
const userDisplayName = getUserDisplayName();
console.log("Welcome: ", userDisplayName);














// Function to escape special characters for use in regular expressions 
function escapeRegExp(str) {
  return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}

// Function to create precompiled regular expressions for vulgar words
function compileVulgarWordRegex(vulgarWordsArray) {
  return vulgarWordsArray.map((word) => ({
    word,
    regex: new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi'),
  }));
}

// Function to censor vulgar words
function censorWord(match) {
  return match.length > 2
    ? match[0] + '***' + match[match.length - 1] // First and last letter with ***
    : match[0] + '*'; // For short words
}

// Function to replace vulgar words and log contextual information
function scanAndReplaceVulgarWords(vulgarWordsArray, logging = false) {
  const mainContainer = document.getElementById('main-content');
  if (!mainContainer) {
    // console.error("Main container not found.");
    return;
  }

  // Precompile vulgar word regex patterns
  const vulgarWordPatterns = compileVulgarWordRegex(vulgarWordsArray);

  // Array to hold the support ticket data
  const supportTickets = [];

  const treeWalker = document.createTreeWalker(mainContainer, NodeFilter.SHOW_TEXT, null, false);
  let currentNode;

  while ((currentNode = treeWalker.nextNode())) {
    let text = currentNode.nodeValue;
    let originalText = text;
    const detectedWords = [];

    vulgarWordPatterns.forEach(({ regex, word }) => {
      if (regex.test(text)) {
        detectedWords.push(word);
        text = text.replace(regex, censorWord);
      }
    });

    // If vulgar words were detected, collect additional information
    if (detectedWords.length > 0) {
      const parentJobCard = currentNode.parentElement.closest('.JOB_CARD');
      const jobCardId = parentJobCard ? parentJobCard.id.replace(/^job_card_/i, '') : null;

      const parentVideoCard = currentNode.parentElement.closest('.video-card');
      const videoCardId = parentVideoCard ? parentVideoCard.id.replace(/^videoCard_/i, '') : null;

      const isJobPage = window.location.href.includes('job-page'); // Modify based on the URL structure of job pages

      const jobTitleElement = parentJobCard.querySelector('.job-title-link');

// Get the inner text of the job-title-link
const jobTitle = jobTitleElement ? jobTitleElement.innerText : null;
      // Determine the type based on the parent element or page
      let ticketType = 'Unknown';  // Default to 'Unknown'
      if (parentJobCard) {
        ticketType = 'Job Card';
      } else if (parentVideoCard) {
        ticketType = 'Video Card';
      } else if (isJobPage) {
        ticketType = 'Job Page';
      }

      const ticket = {
        jobID: new URL(window.location.href).searchParams.get('id'),
        jobTitle: jobTitle,
        videoID: videoCardId,
        jobCardID: jobCardId,
        message: `Vulgar words detected: ${detectedWords.join(', ')}`,
        pageTitle: document.title,
        reasons: detectedWords,
        URL: window.location.href,
        submittedAt: new Date().toISOString(),
        timestamp: serverTimestamp(),
        submittedBy: 'System',
        type: ticketType,
        status: "submitted"
      };

      supportTickets.push(ticket);
      if (logging) {
        // console.log(`Vulgar words detected: ${detectedWords.join(', ')}`);
      }
    }

    // Only update the text node if changes were made
    if (text !== originalText) {
      currentNode.nodeValue = text;
      // if (logging) console.log(`Replaced in node: ${originalText} -> ${text}`);
    }
  }

  // Send support tickets after scanning and replacing
  if (supportTickets.length > 0) {
    sendToSupportTickets(supportTickets);
  }
}




async function sendToSupportTickets(tickets) {
  const supportTicketsRef = collection(db, 'SupportTickets');
  const batch = writeBatch(db);

  for (const ticket of tickets) {
    const { jobID, videoID } = ticket;

    // Create a query to check if a ticket already exists for the same jobID and videoID
    const existingTicketQuery = query(
      supportTicketsRef,
      where("jobID", "==", jobID),
      where("videoID", "==", videoID)
    );

    try {
      // Execute the query to check for existing tickets
      const querySnapshot = await getDocs(existingTicketQuery);
      if (querySnapshot.empty) {
        // No existing ticket found, create a new one
        const ticketRef = doc(supportTicketsRef);  // Create a reference for a new document
        batch.set(ticketRef, ticket);  // Add the 'set' operation to the batch
       // console.log(`New ticket created for jobID: ${jobID} and videoID: ${videoID}`);
      } else {
      //  console.log(`Duplicate ticket found for jobID: ${jobID} and videoID: ${videoID}. Ticket not submitted.`);
      }
    } catch (error) {
     // console.error("Error checking for existing ticket:", error);
    }
  }

  // Commit the batch to Firestore
  try {
    await batch.commit();
    console.log("Support tickets successfully submitted.");
  } catch (error) {
    console.error("Error submitting support tickets:", error);
  }
}



window.scanAndReplaceVulgarWords = scanAndReplaceVulgarWords;




document.addEventListener("DOMContentLoaded", () => {
  // Example list of vulgar words
  const vulgarWords = [
    // Variations of "badword"
    "stupid", "shit", "ass", "fuck", "pussy", "dick", "azz", "fucked", "fucking", "bitch", "bitches", "bitching", "bitch*",
    
    // Variations of "curseword"
    "shited", "shits", "bstard", "biatch", "damned", "damnit", "damn it", "damn", "hell", 
     "fuc*king", "f*king", "f***ed", "s*ux", "sh1t", "j*erk", "a55", "b1tch", "f8ck", "f1ck", "h4te", "l0ser",
  
  
    // Variations of "dummy"
    "d*ummy", "du*mmy", "dum*my", "dumm*y", "du*mmy", "dum*m*y", "dumm*my",
  
    // More general words - add misspellings as needed
    "s*tupid", "sh*it", "a*ss", "f*uck", "fu*ck", "fuc*k", "b*itch", "bi*tch", "bit*ch", "bitch*",
    "f***", "fuc*king", "f*king", "f***ed", "s*ux", "sh1t", "j*erk", "a55", "b1tch", "f8ck", "f1ck", "h4te", "l0ser",
    
    // Numbers or special character combinations
    "f***", "b1tch", "sh1t", "d4mn", "h3ll", "f8ck", "c*rse", "i*d10t", "j*erk", "l0s3r", "m*therf*cker", "f*k",
    
    // Substitutions
    "f*uck", "fu*k", "f**k", "fuc*k", "fuc**k", "sh*it", "sh*t", "b**ch", "b*itch", "b*tch", "b1tch", "s3x", "j**k",
    
    // Additional patterns and mixed-up character replacements
    "f*u**k", "s*hit", "sh1t", "m*therf*cker", "sh*tshow", "sh*tstain", "l33t", "b**tch", "b!tch", "a*s*hole",
    
    // Keyboard substitutions
     "k!ll", "g0d", "tw*tch", "w*nky", "pr*ck", "pr1ck", "p*ss", "ass", "d*ck", "b**w", "c**t", "s*ck"
  ];
  
// Run the scanner and replacer function after DOM is loaded
  setTimeout(() => {
    scanAndReplaceVulgarWords(vulgarWords);
  }, 2000); // Delay of 2 seconds (2000 milliseconds)


});


/*
const detectedWords = scanForVulgarWords(vulgarWords);

if (detectedWords.length > 0) {
  alert("Warning: Vulgar content detected in the page.");
}

*/




// Initialize the toggle states based on local storage values or default
let isTextToVoiceOn = userDataSaved.textToVoice || false;
let isVoiceToTextOn = userDataSaved.voiceToText || false;

let recognition; // SpeechRecognition instance
const speechSynthesis = window.speechSynthesis;
let utterance;

// TEXT TO VOICE TOGGLE FUNCTION
function toggleTextToVoice() {
    const button = document.getElementById("textToVoiceBtn");

    if (!isTextToVoiceOn) {
        // Set the utterance and speak the text (this is an example)
        speechSynthesis.speak(utterance);

        button.innerHTML = '<i id="textVoiceIcon" class="fas fa-volume-mute"></i>';
        isTextToVoiceOn = true;
        button.style.color = "#003366"; // Dark Blue
        button.setAttribute("aria-pressed", "true");

        // Event: Update button after speaking ends
        utterance.onend = () => {
            isTextToVoiceOn = false;
            button.innerHTML = '<i id="textVoiceIcon" class="fas fa-volume-up"></i>';
            button.setAttribute("aria-pressed", "false");
            button.style.color = "#FFFFFF"; // White color
        };

   
    } else {
        // Stop speaking
        window.speechSynthesis.cancel();
        isTextToVoiceOn = false;
        button.innerHTML = '<i id="textVoiceIcon" class="fas fa-volume-up"></i>';
        button.setAttribute("aria-pressed", "false");
        button.style.color = "#FFFFFF"; // White color


    }

    const userData = {

      textToVoice: isTextToVoiceOn
    
    };
    const userDataEcode = setUserData(userData);

    localStorage.setItem('userData', userDataEcode);


}

// VOICE TO TEXT TOGGLE FUNCTION
function toggleVoiceToText() {
    const button = document.getElementById("voiceToTextBtn");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        showToast("Sorry, your browser does not support Speech Recognition.");
        return;
    }

    if (!isVoiceToTextOn) {
        // Start listening
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            document.getElementById("chat-input").innerText = transcript;
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.start();
        button.innerHTML = '<i id="voiceTextIcon" class="fas fa-microphone-slash"></i> ';
        isVoiceToTextOn = true;
        button.setAttribute("aria-pressed", "true");
        button.style.color = "#003366"; // Dark Blue

       

        console.log("Voice recognition started...");
    } else {
        // Stop listening
        if (recognition) {
            recognition.stop();
        }
        button.innerHTML = '<i id="voiceTextIcon" class="fas fa-microphone"></i> ';
        isVoiceToTextOn = false;
        button.setAttribute("aria-pressed", "false");
        button.style.color = "#FFFFFF"; // White color


        console.log("Voice recognition stopped.");
    }

    
    const userData = {

      voiceToText: isVoiceToTextOn
    
    };
    const userDataEcode = setUserData(userData);

    localStorage.setItem('userData', userDataEcode);
}

let allQuestions = [];

// Fetch the structured JSON from the /chat_bot.json file
// Fetch the structured JSON from the /chat_bot.json file




function loadChatbot() {
  // Create Chatbot Button
// Create the chatbot button
const chatButton = document.createElement("button");
chatButton.id = "chatbot-button";
chatButton.innerText = "Chat with us";

// Initial button styles
chatButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
        background: linear-gradient(45deg, #8fc0dc, #b2d1e3);
        font-family: sans-serif;
color: white;
    border: solid rgb(106 220 238 / 23%);
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease; /* Smooth transition for hover effects */
    z-index: 1000;
`;

// Add hover effects
chatButton.addEventListener("mouseover", () => {
  chatButton.style.backgroundColor = "#6e97db"; // Darker blue for hover
  chatButton.style.transform = "scale(1.05)"; // Slightly scale up
});

chatButton.addEventListener("mouseout", () => {
  chatButton.style.backgroundColor = "#84adea"; // Original color
  chatButton.style.transform = "scale(1)"; // Reset scale
});

// Add active effects (when button is clicked)
chatButton.addEventListener("mousedown", () => {
  chatButton.style.backgroundColor = "#5a82c2"; // Even darker blue for click
  chatButton.style.transform = "scale(0.95)"; // Slightly shrink button
});

chatButton.addEventListener("mouseup", () => {
  chatButton.style.backgroundColor = "#6e97db"; // Back to hover state
  chatButton.style.transform = "scale(1.05)";
});



  // Create Chatbot Panel
// Create the chat panel
const chatPanel = document.createElement("div");
chatPanel.id = "chatbot-panel";
chatPanel.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  display: none; /* Hidden initially */
  flex-direction: column;
  z-index: 9999;
  transition: all 0.3s ease; /* Smooth transition for resizing */
`;

// Function to resize panel based on screen width
function resizeChatPanel() {
  if (window.innerWidth <= 768) { // For mobile screens
    chatPanel.style.width = "90vw"; // 90% of viewport width
    chatPanel.style.height = "80vh"; // 80% of viewport height
    chatPanel.style.bottom = "10px"; // Adjust positioning
    chatPanel.style.right = "10px";
    chatPanel.style.borderRadius = "5px";
  } else { // For larger screens
    chatPanel.style.width = "350px";
    chatPanel.style.height = "400px";
    chatPanel.style.bottom = "20px";
    chatPanel.style.right = "20px";
    chatPanel.style.borderRadius = "8px";
    chatPanel.style.height = "80vh";
  }
}

// Function to replace main content with chatbot if the page is /bot

// Append the chat panel to the body
document.body.appendChild(chatPanel);

  chatPanel.innerHTML = `
 <div style="background-color: #84adea;color: white;padding: 10px;text-align: center;height: 3rem;display: flex;flex-direction: row;flex-wrap: wrap;align-content: flex-start;justify-content: space-between;align-items: center;">
<a href="https://reelcareer.co/bot" aria-label="ReelCareer Chatbot" style="color: white; text-decoration: none;">
  <strong>ReelCareer Chatbot</strong>
</a>

<div class="closeArea" style="
    margin-right: 1.5rem;
">

  <!-- Fullscreen Toggle Button -->
    <button id="toggleFullscreenBtn" 
            aria-label="Toggle Chatbot Fullscreen" 
            aria-pressed="false" 
            style="background-color: transparent; margin-bottom: .5rem; color: white; border: none; margin-right: .5rem; border-radius: 4px; cursor: pointer;">
        <i id="fullscreenIcon" class="fas fa-expand"></i>
    </button>
          <button id="close-chat" style=" font-family: sans-serif; background: none;border: none;color: #ffffff;cursor: pointer;font-size: x-large;padding: 0;margin: 0;">×</button>
      </div>
      </div>

      <div id="chatbot-messages" style="text-align: center;overflow-y: scroll;margin: auto;display: block;font-family: sans-serif;height: 80vh;"></div>
      <div style="padding: 10px; border-top: 1px solid #ddd;">
          <div id="chat-input" contenteditable="true" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; min-height: 40px;"></div>
         
<div class="chatControls" style="display: flex; gap: 10px; margin-top: 10px;">
    <!-- Voice-to-Text Button -->
    <button id="voiceToTextBtn" 
            aria-label="Activate Voice-to-Text" 
            aria-pressed="false" 
            style="background-color: #84adea; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
        <i id="voiceTextIcon" class="fas fa-microphone"></i>
    </button>

    <!-- Text-to-Voice Button -->
    <button id="textToVoiceBtn" 
            aria-label="Activate Text-to-Voice" 
            aria-pressed="false" 
            style="background-color: #84adea; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
        <i id="textVoiceIcon" class="fas fa-volume-up"></i>
    </button>

    <!-- Send Button -->
    <button id="send-chat" 
            aria-label="Send Message" 
            style="margin-top: 0; width: 100%; background-color: #84adea; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
        Send
    </button>
</div>

          </div>
  `;

  // Append to Body
  document.body.appendChild(chatButton);
  document.body.appendChild(chatPanel);

 // Function to toggle fullscreen state of the chatbot panel
function toggleChatbotFullscreen() {
  const chatbotPanel = document.getElementById('chatbot-panel');
  const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');
  
  // Check if the panel is already in fullscreen mode
  const isFullscreen = chatbotPanel.style.height === '100vh'; // Fullscreen height

  if (isFullscreen) {
    // If it's fullscreen, set it back to normal size
    chatbotPanel.style.position = "fixed"; // Reset position (e.g., relative or initial)
    chatbotPanel.style.top = 'initial';
    chatbotPanel.style.bottom = '20px';
    chatbotPanel.style.right = '20px';
    chatbotPanel.style.left = 'initial';
    chatbotPanel.style.height = '80vh'; // Reset to original height
    chatbotPanel.style.width = '350px'; // Reset to original width
    
    // Optionally, reset other properties like margin, padding, etc.
    // chatbotPanel.style.margin = "initial";
    // chatbotPanel.style.padding = "initial";

    toggleFullscreenBtn.setAttribute('aria-pressed', 'false'); // Update ARIA attribute
    document.getElementById('fullscreenIcon').classList.replace('fa-compress', 'fa-expand'); // Change icon back
  } else {
    // If it's not fullscreen, make it fullscreen
    chatbotPanel.style.position = "fixed"; // Position it absolutely
    chatbotPanel.style.top = 0;
    chatbotPanel.style.bottom = 0;
    chatbotPanel.style.right = 0;
    chatbotPanel.style.left = 0;
    chatbotPanel.style.height = '100vh'; // Fullscreen height
    chatbotPanel.style.width = '100vw'; // Fullscreen width
    chatbotPanel.style.zIndex = 9999;
    chatbotPanel.style.padding = '1rem 0'

    toggleFullscreenBtn.setAttribute('aria-pressed', 'true'); // Update ARIA attribute
    document.getElementById('fullscreenIcon').classList.replace('fa-expand', 'fa-compress'); // Change icon to indicate fullscreen mode
  }
}


// DOM Elements
//const chatButton = document.getElementById("chatButton");
//const chatPanel = document.getElementById("chatPanel");
const closeChatButton = document.getElementById("close-chat");
const sendChatButton = document.getElementById("send-chat");
const chatInput = document.getElementById("chat-input");
const textToVoiceButton = document.getElementById("textToVoiceBtn");
const voiceToTextButton = document.getElementById("voiceToTextBtn");
const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');

// Event Listeners
chatButton.addEventListener("click", () => {
  // Delay chat panel opening by 2 seconds
  setTimeout(() => {
      chatPanel.style.display = "flex";
      loadGeneralQuestions(); // Only load questions when the panel is open
  }, 500); // 2 seconds delay
});

closeChatButton.addEventListener("click", () => {
  // Delay chat panel closing by 2 seconds
  setTimeout(() => {
      chatPanel.style.display = "none";
  }, 500); // 2 seconds delay
});

sendChatButton.addEventListener("click", sendMessage);

textToVoiceButton.addEventListener("click", toggleTextToVoice);
voiceToTextButton.addEventListener("click", toggleVoiceToText);

toggleFullscreenBtn.addEventListener("click", toggleChatbotFullscreen);

// Chat input - 'Enter' or 'Return' key press simulation
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission or other default behavior
        sendChatButton.click();  // Simulate a click on the send button
    }
});

  function replaceMainContentWithBot() {
    const currentUrl = window.location.href;
    console.log("currentUrl   ",currentUrl);

    if (currentUrl === "https://reelcareer.co/bot/" || currentUrl === "https://reelcareer.co/bot") {
      const mainContent = document.getElementById("main-content");
      const closeChatBtn = document.getElementById("close-chat");

      if (mainContent) {
        
        closeChatBtn.style.display = "none";
        chatButton.style.display = "none";
        chatPanel.style.cssText = `
    width: 100%;
    min-height: 600px;
    background-color: white;
    font-family: sans-serif;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 5px;
    box-shadow: none;
    opacity: 1;
    transition: none;
    transform: none;
    height: 80vh;
    place-content: space-between;
    place-items: stretch;
    display: grid;
    bottom: 10px;
    right: 10px;
    margin: auto;
    max-height: 100%;
`

        // Replace main-content with chatbot
        mainContent.appendChild(chatPanel);

             loadGeneralQuestions(); // Only load questions when panel is open
          
        
      }
    }else{

  // Attach resize event listener
  window.addEventListener("resize", resizeChatPanel);
  resizeChatPanel(); // Call initially on load
    }
   
  }
  

  replaceMainContentWithBot(); // Replace content if on /bot page

}

async function fetchChatbotData() {
  try {
    const response = await fetch('https://reelcareer.co/bot/chat_bot.json');
    const data = await response.json();

    // Combine the general questions and predefined questions
     allQuestions = [
      ...data.generalQuestions.map(q => ({ ...q, onload: true })),  // Mark general questions for onload
      ...data.predefinedQuestions.map(q => ({ ...q, onload: false }))  // Mark predefined questions for later
    ];

   //console.log(allQuestions);  // Output the combined questions

    // Further processing can be done here...
    loadChatbot();
    
  } catch (error) {
    console.error('Error fetching chatbot data:', error);
  }
}


// Load only general questions when chatbot is opened
function loadGeneralQuestions() {
  const messageArea = document.getElementById("chatbot-messages");
  if (messageArea) {
    //console.log("Loading general questions...");
    messageArea.innerHTML = "<p><strong>Choose a topic to get started:</strong></p>";
    messageArea.style.cssText = " text-align: center;     overflow-y: scroll;  margin: auto; display: block; font-family: sans-serif;";



    // Filter and display only onload questions (general questions)
    allQuestions.filter(q => q.onload).forEach(q => {
        const button = document.createElement("button");
        button.innerText = q.question;
        button.style.cssText = "color: #30343f; margin: 5px;padding: 5px 10px;cursor: pointer;border: #dde3ed solid;border-radius: 25px;background-color: aliceblue;";
        button.addEventListener("click", () => handleUserInput(q.question));
        messageArea.appendChild(button);
    });
  } else {
    console.error("Chatbot message area not found.");
  }
}






// Handle user input
async function handleUserInput(userMessage) {
  const messageArea = document.getElementById("chatbot-messages");




  // Call sendMessage to get the answer and question id
  const result = await sendMessage(userMessage);

  if (result && result.answer) {
    // Wait for displayMessage to complete typing before proceeding
    await displayMessage("bot", result.answer);

    // If an ID is returned, display the helpful questionnaire
    if (result.id) {
      console.log("Question ID:", result.id);
      setTimeout(() => {
        addHelpfulButtons(result.id);
      }, 500); // 0.5 second delay
          }
  } else {
    await displayMessage(
      "bot",
      "Sorry, I couldn't find an answer for that. Please contact us via our [Contact Us](https://reelcareer.com/contact) page."
    );
 //   logUnansweredQuestion(userMessage);
  }
}





// Function to create and append "Was this helpful?" buttons
function addHelpfulButtons(questionId) {
  const messageArea = document.getElementById("chatbot-messages");

  // Container for the helpful area
  const helpfulContainer = document.createElement("div");
  helpfulContainer.style.cssText = `
    display: grid;
    align-items: stretch;
    gap: 10px;
    margin-top: 10px;
    padding: 5px 0px;
    font-family: Arial, sans-serif;
    align-content: stretch;
    justify-content: space-around;
    justify-items: stretch;
        margin-bottom: 2rem;
    padding-bottom: 2rem;  `;

  // Text
  const helpfulText = document.createElement("span");
  helpfulText.textContent = "Was this helpful?";
  helpfulText.style.cssText = `
    font-size: 1.5rem;
    color: #555;
  `;

  // Yes button
  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.style.cssText = `
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  `;
  yesButton.addEventListener("mouseenter", () => {
    yesButton.style.backgroundColor = "#218838";
  });
  yesButton.addEventListener("mouseleave", () => {
    yesButton.style.backgroundColor = "#28a745";
  });
  yesButton.addEventListener("click", async () => {
    await updateHelpfulCount(questionId, true);
    showToast("Thank you for your feedback!");
    helpfulContainer.style.display = "none";

  });

  // No button
  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.style.cssText = `
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  `;
  noButton.addEventListener("mouseenter", () => {
    noButton.style.backgroundColor = "#c82333";
  });
  noButton.addEventListener("mouseleave", () => {
    noButton.style.backgroundColor = "#dc3545";
  });
  noButton.addEventListener("click", async () => {
    await updateHelpfulCount(questionId, false);
    showToast("Thank you for your feedback!");
    helpfulContainer.style.display = "none";
  });

  // Append elements to the container
  helpfulContainer.appendChild(helpfulText);
  helpfulContainer.appendChild(yesButton);
  helpfulContainer.appendChild(noButton);

  // Append the helpful area to the message area
  messageArea.appendChild(helpfulContainer);
  messageArea.scrollTop = messageArea.scrollHeight;


}

async function updateHelpfulCount(questionId, isHelpful) {
  try {
    const chatbotDocRef = doc(db, "ChatbotInteractions", questionId);

    // Fetch the current document data
    const docSnapshot = await getDoc(chatbotDocRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // Update the helpful count and view count
      const updatedHelpfulCount = isHelpful ? data.helpful + 1 : data.helpful;
      const updatedViewCount = data.views + 1;  // Increment views count

      // Update the document with the new counts
      await updateDoc(chatbotDocRef, {
        helpfulCount: updatedHelpfulCount,
        views: updatedViewCount
      });


    } else {
      console.error("Document does not exist.");
    }
  } catch (error) {
    console.error("Error updating helpful or view count:", error);
  }
        // Determine the response message based on the feedback
        const responseMessage = isHelpful
        ? "Thank you for your feedback! We're glad we could help."
        : "Is there anything else we can assist you with?";

      // Display the appropriate response message
      displayMessage("bot", responseMessage);
}


// Function to simulate smooth scrolling
function smoothScrollToBottom() {
  const messageArea = document.getElementById("chatbot-messages");

  const start = messageArea.scrollTop;
  const end = messageArea.scrollHeight;
  const duration = 300; // Duration of the scroll animation in milliseconds
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    messageArea.scrollTop = start + (end - start) * easeInOutQuad(progress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Easing function for smooth animation
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Display messages in the chat panel
function displayMessage(sender, message) {
  return new Promise((resolve) => {
    const messageArea = document.getElementById("chatbot-messages");
    const messageDiv = document.createElement("div");
    messageDiv.style.margin = "8px 0";
    messageDiv.style.padding = "8px 12px";
    messageDiv.style.borderRadius = "10px";
    messageDiv.style.maxWidth = "80%";
    messageDiv.style.wordWrap = "break-word";
    messageDiv.style.textAlign ="left";

    // Style based on sender
    // Style based on sender
  messageDiv.style.cssText = sender === "bot"
  ? `    margin: 8px 0px;
    padding: 8px 12px;
    border-radius: 10px;
    max-width: 70%;
    overflow-wrap: anywhere;
    background-color: #e6f7ff;
    color: #333333;
    font-family: Arial, sans-serif;
    display: grid;
    word-wrap: break-word;
    justify-content: start;
    justify-items: start;
    text-align: left;`

  :   `  
    padding: 8px 12px;
    border-radius: 10px;
    max-width: 70%;
    overflow-wrap: anywhere;
    background-color: rgb(212, 237, 218);
    color: rgb(21, 87, 36);
    font-family: Arial, sans-serif;
    display: grid;
        word-wrap: break-word;
    place-content: stretch end;
    justify-items: stretch;
    text-align: left;
    width: 100%;
    margin: auto 0px auto auto;
    justify-content: start;
`;
let messageWithLinks = '';
    // Replace URLs with <a> tags if they exist in the message
    if(message){
     messageWithLinks = message.replace(
      /https?:\/\/[^\s]+/g,
      (url) => `<a href="${url}" target="_blank" style="color: #007bff; text-decoration: underline;">${url}</a>`
    );
  }

    const senderLabel = sender === "bot"
      ? '<strong style="color: #007bff;">Chatbot:</strong> '
      : '<strong style="color: #28a745;">You:</strong> ';

    // Typing effect for bot messages
    if (sender === "bot") {
      let index = 0;
      const typingSpeed = 70;

      utterance = new SpeechSynthesisUtterance(message);
      toggleTextToVoice();



      messageDiv.innerHTML = `${senderLabel}`; // Start empty with sender label
      const typingEffect = setInterval(() => {

        smoothScrollToBottom();

        if(messageWithLinks.length > 0){

        messageDiv.innerHTML = `${senderLabel}${messageWithLinks.substring(0, index + 1)}`;
         }else{
          return;
         }
        index++;

        if (index === messageWithLinks.length) {
          clearInterval(typingEffect);
          resolve(); // Resolve the promise when typing completes
        }
      }, typingSpeed);

      
    } else {
      setTimeout(() => {
        messageDiv.innerHTML = senderLabel + messageWithLinks;
      }, 500);

      resolve(); // Immediately resolve for user messages
    }


    setTimeout(() => {
      messageArea.appendChild(messageDiv);
    }, 300);
    smoothScrollToBottom();

  });
}
window.displayMessage = displayMessage;

// Log unanswered questions
async function logUnansweredQuestion(message) {
  const chatBotData = {
      activate: false,
      status: "review",
      id: '',
      question: message,
      answer: "",
      category: "General",
      tags: [],
      supportURL: "", 
      helpful: 0, 
      views: 0,      
      createdAt: new Date(),
      timestamp: serverTimestamp()
  };
  await addDoc(collection(db, "ChatbotInteractions"), chatBotData);
}













// Unified sanitization and validation function
function sanitizeAndValidateInput(input) {
  // Step 1: Remove any HTML tags
  const sanitized = input.replace(/<[^>]*>/g, "").trim();

  // Step 2: Allow common special characters while blocking dangerous patterns
  if (!isSafeInputChat(sanitized)) {
      return null; // Return null if unsafe content is found
  }

  return sanitized; // Return the clean input without forcing lowercase
}

// Updated safety check
window.isSafeInputChat = function (input) {
  // Allow safe special characters: $,.!@#()&%/* and numbers, letters, spaces
  // Block harmful patterns like scripts, SQL keywords, and backslashes
  const dangerousPatterns = /(script|SELECT|UPDATE|DELETE|INSERT|DROP|TABLE|ALTER|--|\\)/i;

  return !dangerousPatterns.test(input);
};


// Send message and match it to predefined questions
async function sendMessage(userMessage) {
  // 1. Fetch raw input if no argument is passed
  if (!userMessage || typeof userMessage !== "string") {
    userMessage = document.getElementById("chat-input").innerText;
    if (!userMessage || userMessage.trim() === "") {
      console.warn("Message is empty.");
      return; // Exit if the input is empty
    }
  }
   // 2. Sanitize and normalize the input
   const sanitizedMessage = sanitizeAndValidateInput(userMessage);
   if (!sanitizedMessage) {
     showToast("Invalid or unsafe input.");
     return; // Exit if the message fails sanitization or validation
   }
 

 // Trim and normalize the user message
const trimmedMessage = sanitizedMessage.trim().toLowerCase();

displayMessage("user", trimmedMessage) 
userMessage = '';
// Initialize score variables
let bestMatch = null;
let highestScore = 0;
//console.log("Initial Best Match:", bestMatch);
//console.log("Initial Highest Score:", highestScore);

// Define weights for tags and categories
const tagWeight = 2;
const categoryWeight = 1;
console.log("Tag Weight:", tagWeight, "Category Weight:", categoryWeight);

// Iterate over all questions to find the best match
allQuestions.forEach((questionObj, index) => {
    let score = 0;
  //  console.log(`Evaluating Question #${index + 1}:`, questionObj);

    // Score based on the number of matching tags
    questionObj.tags.forEach(tag => {
        if (trimmedMessage.includes(tag.toLowerCase())) {
            score += tagWeight; // Increase score by tagWeight
          //  console.log(`Matched tag: ${tag}. Current score: ${score}`);
        }
    });

    // Score based on matching question text
    if (trimmedMessage.includes(questionObj.question.toLowerCase())) {
        score += categoryWeight; // Increase score by categoryWeight
       // console.log(`Matched question: "${questionObj.question}". Current score: ${score}`);
    }

    // Score based on matching category
    if (trimmedMessage.includes(questionObj.category.toLowerCase())) {
        score += categoryWeight; // Increase score by categoryWeight
       // console.log(`Matched category: "${questionObj.category}". Current score: ${score}`);
    }
    // Update best match if the score is higher
    if (score > highestScore) {
        highestScore = score;
        bestMatch = questionObj;
        console.log(`New best match found:`, bestMatch);
    }
});

//console.log("Final Best Match:", bestMatch);
//console.log("Final Highest Score:", highestScore);

// Return answer and question id if a best match is found
if (bestMatch && highestScore > 0) {
   // console.log("Returning best match:", bestMatch.answer);
   // displayMessage("bot", bestMatch.answer);
    return {
        answer: bestMatch.answer,
        id: bestMatch.id  // Include the ID of the best match
    };
} else {
    // Log unanswered question and suggest contacting support
    if(trimmedMessage){
    let brainOutput = processMessage(trimmedMessage);
    displayMessage("bot", brainOutput);
    }
    if(!trimmedMessage){

     //  logUnansweredQuestion(trimmedMessage);
    console.log("No match found, suggesting contact with support.");
    return {
        answer: "Sorry, I couldn't find an answer to your question. Please contact support for assistance.",
        id: null  // If no match, return null for id
    };
  }
}

}



// Variable to hold the loaded script
let brainScriptLoaded = false;

// Function to dynamically load an external JavaScript file as a module
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'module'; // Set as ES Module
  script.onload = function() {
    brainScriptLoaded = true;  // Set flag when the script is loaded
    if (callback) callback();  // Call the callback after the script is loaded
  };
  script.onerror = function() {
    console.error('Error loading script: ' + src);
  };
  document.head.appendChild(script);  // Append the script tag to the head

  (function loadTensorFlowJS() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs";
    script.async = true;
    script.onload = () => console.log('TensorFlow.js loaded successfully.');
    script.onerror = () => console.error('Failed to load TensorFlow.js.');
    document.body.appendChild(script);
})();








}





setTimeout(() => {

  fetchChatbotData();


  
}, 500); // 5000 milliseconds = 5 seconds



// Function to load brain.js and execute functionality after it is loaded
function loadBrainAndCallFunction() {
  loadScript('https://reelcareer.co/bot/js/brain.js', function() {
    console.log('Brain module loaded successfully.');
  });
}

loadBrainAndCallFunction();

async function loadJsonData(url) {
  loadScript(url, function() {
    console.log('JSON loaded successfully.');
  });
  
}

//loadJsonData('https://reelcareer.co/scripts/json/main.js');


