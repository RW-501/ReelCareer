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
} from 'https://reelcareer.co/scripts/js/load/module.js';



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


