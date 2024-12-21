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


 // Define the  function to check if a specific keyword is in the URL
 window.checkUrl = function(keyword) {
  // Get the current URL
  const currentUrl = window.location.href;
 // console.log("currentUrl:", currentUrl);
  //console.log("keyword:", keyword);

  // Return true if the keyword is found in the URL, otherwise false
  return currentUrl.includes(keyword);
};

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









