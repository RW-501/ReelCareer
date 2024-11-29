import {
  db, doc, getDoc, query, updateDoc,
  setDoc, ref, signInWithPopup, orderBy, limit,
  uploadBytes, OAuthProvider, arrayUnion, getStorage,
  signOut, addDoc, increment, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  where, getDocs, storage, collection, deleteObject, 
  auth, analytics, googleProvider, facebookProvider,appleProvider,  getDownloadURL
} from 'https://reelcareer.co/js/module.js';


let UserID = "";
let userData = "";

// Fetch the user's IP address
const getUserIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
};

// Get user location by IP
const getUserLocationByIP = async (ip) => {
  try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
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

// Function to update or create user information in Firestore
const saveUserLoginState = async (user) => {
  try {
    const [ip, location] = await Promise.all([getUserIP(), getUserLocationByIP(await getUserIP())]);
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

    const userDocRef = doc(db, "Users", user.uid);
    await setDoc(userDocRef, userData, { merge: true });
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userEmail", user.email);
  } catch (error) {
    console.error("Error saving user login state:", error);
  }
};

// Event listener for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await saveUserLoginState(user);
    UserID = user.uid;

    if (window.location.pathname === "/views/auth") {
      window.location.href = "/views/user";
    }
  } else {
    console.log("No user signed in");
    ["userLoggedIn", "userEmail", "userData"].forEach((item) => localStorage.removeItem(item));
  }
});

// Event listener to handle clicks outside dropdown to close it
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById("dropdown");
  if (dropdown && !dropdown.contains(e.target) && !e.target.closest(".dropdown-toggle")) {
    dropdown.classList.remove("open");
  }
});

// Show login popup with better styling
const showLoginPopup = () => {
  const loginPopup = document.createElement("div");
  loginPopup.id = "login-popup";
  loginPopup.classList.add("login-popup");
  
  loginPopup.innerHTML = `
    <div class="popup-content">
      <h2>Login</h2>
      <button class="btn-login" id="google-login">Login with Google</button><br><br>
      <button class="btn-login" id="facebook-login">Login with Facebook</button><br><br>
      <button class="btn-login" id="apple-login">Login with Apple</button><br><br>
      <form id="email-login-form">
        <input type="email" id="login-email" placeholder="Email" required><br><br>
        <input type="password" id="login-password" placeholder="Password" required><br><br>
        <button type="submit">Login with Email</button>
      </form>
      <p class="form-link">Don't have an account? <a href="/views/auth">Create an account</a></p>
    </div>
    <div class="popup-overlay"></div>
  `;
  
  document.body.appendChild(loginPopup);
  document.getElementById('login-email').focus();
  document.querySelector('.popup-overlay').addEventListener('click', closeLoginPopup);
};

window.showLoginPopup = showLoginPopup;





// Function to logout the user
async function logoutUser() {
  try {
    await firebase.auth().signOut();


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

// Close login popup
const closeLoginPopup = () => {
  const loginPopup = document.getElementById("login-popup");
  if (loginPopup) {
    loginPopup.remove();
  }
};
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

// Improved login form submission
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  showLoading();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserLoginState(userCredential.user);
    window.location.href = "/views/user"; 
  } catch (error) {
    showToast(error.message);
  } finally {
    hideLoading();
  }
});

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
      window.location.href = "/views/user"; // Redirect to profile
    } catch (error) {
      console.error("Error during sign up:", error);
      showToast(error.message, 'error');
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
    showToast(error.message);
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
      showToast(error.message);
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
      window.location.href = "/views/user"; // Redirect to profile
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
    window.location.href = "/views/user"; // Redirect to profile
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

// Function to create the dynamic, responsive navbar
function createNavbar() {
  const currentPage = window.location.pathname;
  const isHomePage = currentPage === "/index.html" || currentPage === "/index" || currentPage === "" || currentPage === "/";

  const navbarClass = isHomePage ? "main-navbar-light" : "main-navbar-dark";
  const toggleClass = isHomePage ? "dropdown-toggle-light" : "dropdown-toggle-dark";

  return `
    <nav id="Main-Nav_bar" class="navbar navbar-expand-lg ${navbarClass} shadow-sm sticky-top" role="navigation">
      <div class="container">
        <a class="navbar-brand embossed" href="https://reelcareer.co/">
          ReelCareer
        </a>
        <button class="navbar-toggler ${toggleClass}" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon">☰</span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/job-listings">Job Listings</a></li>
            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/about">About Us</a></li>
            <li class="nav-item" id="jobSeekerNavItem"><a class="nav-link" href="https://reelcareer.co/views/job-seeker">Job Seeker</a></li>
            <li class="nav-item" id="recruiterNavItem"><a class="nav-link" href="https://reelcareer.co/views/recruiter-dashboard">Recruiter Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/blog">Blog</a></li>
            <li class="nav-item"><a class="nav-link" href="https://reelcareer.co/views/membership">Membership</a></li>
            <li class="nav-item"><div id="authSection" class="d-flex align-items-center"></div></li>
            <li class="nav-item"><button id="darkModeToggle" class="btn btn-outline-secondary ml-3">Dark Mode</button></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Dark mode toggle functionality
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Add smoother transitions for modals and popups
const applySmoothTransitions = () => {
  const styles = document.createElement('style');
  styles.innerHTML = `
    #login-popup {
      animation: fadeIn 0.3s ease-in-out;
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

window.addEventListener('load', () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

window.addEventListener('load', () => {
  handleAuthStateChanged(currentUser);
  createProfileModal();
});


// Helper function to handle authentication state changes
function handleAuthStateChanged(user) {
  const authSection = document.getElementById("authSection");
  const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
  const recruiterNavItem = document.getElementById("recruiterNavItem");

  if (user) {
    // If logged in, show profile info and logout button
    const userName = user.displayName || "User";
    const userPhoto = user.profilePic ? 
      `<img src="${user.profilePic}" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">` :
      `<img src="https://reelcareer.co/images/sq_logo_n_BG_sm.png" alt="Profile Picture" class="rounded-circle" style="width: 40px; height: 40px; margin-right: 10px;">`;

    authSection.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="profileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${userPhoto} Welcome, ${userName}
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
          <a class="dropdown-item" href="https://reelcareer.co/views/user">Profile</a>
          <a class="dropdown-item" href="https://reelcareer.co/views/messaging">Messaging</a>
          <button class="dropdown-item" id="settingsBtn">Account Settings</button>
          <button class="dropdown-item" id="logoutButton">Logout</button>
        </div>
      </div>`;

    // Display Job Seeker and Recruiter links
    jobSeekerNavItem.style.display = "block";
    recruiterNavItem.style.display = "block";
    document.getElementById("logoutButton").onclick = logoutUser;
  } else {
    // If not logged in, show login button
    jobSeekerNavItem.style.display = "none";
    recruiterNavItem.style.display = "none";
    authSection.innerHTML = `<button class="btn btn-primary" id="loginButton">Login / Create Account</button>`;

    document.getElementById("loginButton").onclick = () => {
      window.location.href = adjustLinkHomeURL + "views/auth"; // Redirect to login page
    };
  }

  // Dropdown toggle and close logic
  setupDropdownToggle();
}

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

// Function to create the profile modal HTML
function createProfileModal() {
  const modalHTML = `
    <div id="profileModal" class="modal fade hide" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title" id="profileModalLabel">Update Your Profile</h5>
            <button type="button" class="settings-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
            <p class="text-muted">Keep your profile up to date to improve your visibility and networking opportunities.</p>
            <ul class="nav nav-tabs" id="profileTab" role="tablist">
              ${['personal', 'social', 'membership'].map(createTabItem).join('')}
            </ul>
            <div class="tab-content" id="profileTabContent">
              ${['personal', 'social', 'membership'].map(createTabContent).join('')}
            </div>
            <div class="mt-4">
              <button type="button" class="btn btn-danger" id="deactivateAccountBtn">Deactivate Account</button>
            </div>
          </div>
          <div class="modal-footer border-top-0">
            <button type="button" class="settings-btn-close btn btn-secondary" data-bs-dismiss="modal" id="saveProfileCloseBtn">Close</button>
            <button type="button" class="btn btn-primary" id="saveProfileBtn">Save changes</button>
          </div>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Initialize profile data
  const profileData = {
    username: '', email: '', name: '', bio: '', location: '', tags: '', position: '',
    profilePicture: '', socialLinks: {}, membership: 'free', verified: false
  };

  // Initialize event listeners for saving the profile
  document.getElementById('saveProfileBtn').addEventListener('click', saveProfileData);
  document.getElementById('deactivateAccountBtn').addEventListener('click', () => alert('Account deactivated.'));
}

// Function to generate a tab item
function createTabItem(tab, idx) {
  return `
    <li class="nav-item" role="presentation">
      <button class="nav-link ${idx === 0 ? 'active' : ''}" id="${tab}-tab" data-bs-toggle="tab" data-bs-target="#${tab}" type="button" role="tab" aria-controls="${tab}" aria-selected="${idx === 0}">${capitalize(tab)}</button>
    </li>`;
}

// Function to generate tab content
function createTabContent(tab) {
  return `
    <div class="tab-pane fade ${tab === 'personal' ? 'show active' : ''}" id="${tab}" role="tabpanel" aria-labelledby="${tab}-tab">
      ${tab === 'personal' ? personalTabContent() : tab === 'social' ? socialTabContent() : membershipTabContent()}
    </div>`;
}

// Helper function for personal tab content
function personalTabContent() {
  return `
    <form id="profileForm">
      ${generateInput('text', 'usernameSET', 'Username', 'Your desired username', true)}
      ${generateInput('email', 'emailSET', 'Email')}
      ${generateFileInput('profilePictureSET', 'Profile Picture')}
      ${generateInput('text', 'nameSET', 'Name', 'Your full name', true)}
      ${generateTextarea('bioSET', 'Bio', 'Tell us about yourself')}
      ${generateInput('text', 'locationSET', 'Location', 'Enter your city or state')}
      ${generateInput('text', 'tagsSET', 'Tags', 'Add tags (e.g., JavaScript, Project Management)')}
      ${generateInput('text', 'positionSET', 'Current Position', 'Your job title or current role')}
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="publicProfileSET">
        <label class="form-check-label" for="publicProfileSET">Public Profile</label>
      </div>
      <hr>
    </form>`;
}

// Event handler for saving profile data
function saveProfileData() {
  const profileData = {
    username: document.getElementById('usernameSET').value,
    email: document.getElementById('emailSET').value,
    name: document.getElementById('nameSET').value,
    bio: document.getElementById('bioSET').value,
    location: document.getElementById('locationSET').value,
    tags: document.getElementById('tagsSET').value,
    position: document.getElementById('positionSET').value
  };

  console.log(profileData);
  // Save logic (e.g., send data to backend or Firebase)
}

function generateInput(type, id, label, placeholder = '', required = false) {
  return `
    <div class="mb-3">
      <label for="${id}" class="form-label">${label}</label>
      <input type="${type}" class="form-control" id="${id}" placeholder="${placeholder}" ${required ? 'required' : ''}>
    </div>`;
}

function generateTextarea(id, label, placeholder = '') {
  return `
    <div class="mb-3">
      <label for="${id}" class="form-label">${label}</label>
      <textarea class="form-control" id="${id}" placeholder="${placeholder}"></textarea>
    </div>`;
}

function generateFileInput(id, label) {
  return `
    <div class="mb-3">
      <label for="${id}" class="form-label">${label}</label>
      <input type="file" class="form-control" id="${id}">
    </div>`;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize
window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  handleAuthStateChanged(currentUser);  // This function will handle both login/logout logic and rendering user-specific content.
  createProfileModal();  // Render profile modal when page loads.
};




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
}; 

















// Improved: Preparing location data for Firebase with validation and defaults
function prepareLocationForFirebase(userLocationData) {
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

// Shuffle array utility function with a cleaner approach
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Function to display blogs dynamically with enhanced error handling
async function loadRelatedBlogs() {
  const maxSimilarBlogs = 5;
  const blogContainer = document.getElementById('blogContainer');
  const allBlogs = [];

  try {
      const blogsRef = collection(db, 'Blogs');
      const uTagInterestNorm = getUserTagInterest();
      const uJobInterestNorm = getUserJobInterest();
      const userLocationData = sessionStorage.getItem('userLocation');
      const locationArray = prepareLocationForFirebase(userLocationData);

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

// Function to display fetched blogs
function displayBlogs(blogs, container) {
  container.innerHTML = ''; // Clear previous blogs

  blogs.forEach((blog) => {
      const blogCard = document.createElement('div');
      blogCard.classList.add('blogCard');
      blogCard.innerHTML = `
          <div class="card blog-card shadow-sm">
              <div data-bs-toggle="modal" data-bs-target="#blogModal" class="blog-card-trigger" data-blog-id="${blog.id}">
                  <a href="https://reelcareer.co/views/blog?id=${blog.id}">
                      <img src="${blog.imageUrl}" alt="${blog.title}" class="card-img-top" loading="lazy" />
                  </a>
                  <div class="card-body">
                      <a href="https://reelcareer.co/views/blog?id=${blog.id}">
                          <h5 class="card-title text-primary">${blog.title}</h5>
                      </a>
                      <div class="card-text text-muted">
                          <div>${truncateText(blog.content, 80, `https://reelcareer.co/views/blog?id=${blog.id}`)}</div>
                      </div>
                      <button class="btn btn-outline-primary blog-card-trigger" data-blog-id="${blog.id}">Read More</button>
                  </div>
              </div>
          </div>
      `;
      container.appendChild(blogCard);
  });
}

// Function to fetch and display similar jobs with better handling
async function getSimilarJobs(containerId) {
  const maxSimilarJobs = 6;
  const jobsContainer = document.getElementById(containerId);

  try {
      const jobInterestNorm = getUserJobInterest();
      const userLocationData = sessionStorage.getItem('userLocation');
      const locationArray = prepareLocationForFirebase(userLocationData);
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

// Function to create a job card element
function createJobCard(jobId, jobData) {
  const jobCard = document.createElement('div');
  jobCard.classList.add('col-md-6', 'col-lg-4', 'mb-3');
  jobCard.innerHTML = `
      <div class="similar-job-card">
          <h5><a href="https://reelcareer.co/views/job-details?id=${jobId}" class="job-title-link">${jobData.title}</a></h5>
          <p><strong>${jobData.company}</strong> - ${formatLocation(jobData.location)}</p>
          <p class="card-text"><strong>Type:</strong> ${formatJobType(jobData.type)}</p>
          <p class="card-text"><strong>Salary:</strong> ${formatCurrency(jobData.salary, { decimals: 0 })}</p>
          <div class="job-tags mt-2">
              ${jobData.tags.map(tag => `
                  <a href="https://reelcareer.co/views/job-listings?tag=${encodeURIComponent(tag)}" class="btn btn-primary badge" style="margin: 0.2rem;">${tag}</a>
              `).join('')}
          </div>
          <a href="https://reelcareer.co/views/job-details?id=${jobId}" class="view-job-btn">View Job</a>
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

window.addEventListener('load', () => {
  loadRelatedBlogs();
  getSimilarJobs('similarJobsContainer');
});




function rollInAnimations(config = {}) {
  // Default configuration
  const {
      delayBetweenDivs = 300, // Delay between div animations (ms)
      initialBodyDelay = 1000, // Delay before showing body (ms)
      animationDuration = 600, // Animation duration (ms)
      animationTimingFunction = 'ease', // CSS timing function
      hiddenClass = 'hidden', // Class to hide body
  } = config;

  // Inject CSS Styles
  const loadingStyle = document.createElement('style');
  loadingStyle.innerHTML = `
      /* Hide body initially */
      body.${hiddenClass} { 
          opacity: 0; 
          overflow: hidden;
      }
  
      /* Hidden state for .main child divs */
      .main > div {
          opacity: 0;
          transform: translateX(-100%);
          transition: opacity ${animationDuration}ms ${animationTimingFunction}, 
                      transform ${animationDuration}ms ${animationTimingFunction};
      }
  
      /* Roll-in effect */
      .main > div.roll-in {
          opacity: 1;
          transform: translateX(0);
      }
  `;
  document.head.appendChild(loadingStyle);

  // Main roll-in logic
  document.addEventListener('DOMContentLoaded', function () {
      const mainDivs = document.querySelectorAll('.main > div');

      // Check if elements exist
      if (!mainDivs.length) {
          console.warn('No child divs found in .main container for animations.');
          return;
      }

      // Hide body initially
      document.body.classList.add(hiddenClass);
      document.body.setAttribute('aria-hidden', 'true');

      // Reveal body and trigger roll-in animations
      setTimeout(() => {
          document.body.classList.remove(hiddenClass);
          document.body.removeAttribute('aria-hidden');
          console.log('Body revealed, starting roll-in animations...');

          // Sequentially add the "roll-in" class to each div with a delay
          mainDivs.forEach((div, index) => {
              setTimeout(() => {
                  div.classList.add('roll-in');
                  console.log(`Div #${index + 1} roll-in animation triggered.`);
              }, index * delayBetweenDivs);
          });
      }, initialBodyDelay);
  });
}

// Example usage
rollInAnimations({
  delayBetweenDivs: 500,
  initialBodyDelay: 1500,
  animationDuration: 700,
  animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' // Easing function for bounce effect
});
























function setBreadcrumb(){

  // Get the ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Assuming the ID is passed as a query parameter 'id'
  const jobId = urlParams.get("jobId");
  
  // Select the last breadcrumb anchor
  const lastBreadcrumb = document.getElementById("lastBreadcrumb_a");
  const breadcrumbjobTitleActive = document.getElementById("breadcrumb-active-title");
  const appyJobTitle = document.getElementById("appyJobTitle");
  
  if (id && lastBreadcrumb){
      lastBreadcrumb.href = `https://reelcareer.com/views/job-details?id=${id}`;
  } 
  if (jobId && lastBreadcrumb){
    lastBreadcrumb.href = `https://reelcareer.com/views/job-details?id=${jobId}`;
} 

  if (breadcrumbjobTitleActive && appyJobTitle){
    breadcrumbjobTitleActive.innerText = appyJobTitle.innerText;
  }
 // console.log("setBreadcrumb  ??????????/   ",id, "xxxx   ",jobTitle.innerText);

}
 
window.setBreadcrumb = setBreadcrumb;

 document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    setBreadcrumb();
  }, 1500); // 2000 milliseconds = 2 seconds
  });






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
      "url": "/views/blog",
      "name": "Blog",
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
      "category": "Features",
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
      "category": "Admin",
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
      "url": "/views/job-listings",
      "name": "Job Listings",
      "title": "Job Listings - Search and Apply for Job Openings",
      "category": "Admin",
      "order": 14
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
      links: [
        { url: "/", name: "ReelCareer", title: "ReelCareer - #1 Job Board - Find a job today", order: 0 },
        { url: "/views/about", name: "About ReelCareer", title: "About ReelCareer - Who We Are and Our Mission", order: 1 },
        { url: "/views/privacy", name: "Privacy Policy", title: "Privacy Policy - How We Protect Your Data", order: 2 },
        { url: "/views/terms", name: "Terms of Use", title: "Terms of Use - Website User Agreement and Guidelines", order: 3 },
        { url: "/views/contact", name: "Contact Us", title: "Contact ReelCareer - Get in Touch for Support and Inquiries", order: 4 }
      ]
    },
    companyMedia: {
      title: "Company Media",
      titleStyle: "color: #83bad9; font-weight: 800; text-shadow: 1px 0px 0px #6253e7;",
      video: {
        source: "https://reelcareer.co/images/intro.MP4",
        type: "video/mp4"
      },
      image: {
        src: "https://reelcareer.co/images/sq_logo_n_BG_tie_reelx.png",
        alt: "Company Image",
        style: "width: 15rem;"
      }
    }
  };
  
  
  
  
  // Handle newsletter signup
  async function handleNewsletterSignup(email) {
    const { rateLimitTime, maxAttempts, storageKey, messages } = config.newsletter;
    let attempts = 0;
    let firstAttemptTime = null;
  
    try {
      const ipAddress = await getUserIP();
      const location = await getUserLocation();
  
      if (localStorage.getItem(storageKey)) {
        showToast(messages.alreadySubscribed, "warning");
        return;
      }
  
      const currentTime = Date.now();
      if (!firstAttemptTime || currentTime - firstAttemptTime > rateLimitTime) {
        attempts = 0; // Reset attempts
        firstAttemptTime = currentTime;
      }
  
      if (attempts >= maxAttempts) {
        showToast(messages.tooManyAttempts, "error");
        return;
      }
  
      attempts++;
      await db.collection("NewsLetter").add({
        email,
        ipAddress,
        location,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  
      localStorage.setItem(storageKey, "true");
      document.getElementById("newsletterMessage").textContent = messages.success(email);
  
    } catch (error) {
      console.error("Newsletter signup failed:", error);
      document.getElementById("newsletterMessage").textContent = error.message || messages.error;
    }
  }
  


    // Group links by category
    const groupedLinks = footerLinks.reduce((acc, link) => {
      if (!acc[link.category]) acc[link.category] = [];
      acc[link.category].push(link);
      return acc;
  }, {});


  // Render dynamic footer links
  function renderFooterLinks() {
    const { currentYear, links } = config.footer;
    const footerHTML = `
      <footer>
        <div class="container text-center">
          <p>&copy; ${currentYear} ReelCareer</p>
          <nav>
            ${Object.keys(groupedLinks).map(category => `
              <div>
                <h5>${category}</h5>
                ${groupedLinks[category].map(link => `<a href="${link.url}" title="${link.title}">${link.name}</a>`).join(" | ")}
              </div>`).join("\n")}
          </nav>
        </div>
      </footer>`;
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }
  
  // Render company media
  function renderCompanyMedia() {
    const { title, titleStyle, video, image } = config.companyMedia;
    const mediaHTML = `
      <section id="companyMedia" class="bg-light py-5 company-media">
        <div class="container">
          <h2 class="text-center" style="${titleStyle}">${title}</h2>
          <div class="row text-center">
            <div class="col-md-6 m-auto">
              <div class="video-container">
                <video loop autoplay muted loading="lazy">
                  <source src="${video.source}" type="${video.type}">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div class="col-md-6 m-auto">
<img loading="lazy" src="${image.src}" alt="${image.alt}" class="img-fluid" style="${image.style}">
            </div>
          </div>
        </div>
      </section>`;
    document.body.insertAdjacentHTML("beforeend", mediaHTML);
  }
  
  // Initialize page content
  document.addEventListener("DOMContentLoaded", () => {
    renderFooterLinks();
    renderCompanyMedia();
  });
  




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
        showToast("You must agree to the data privacy policy.", 'warning');
        return;
      }

      // Handle the newsletter signup process
      await handleNewsletterSignup(email);
    });
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

  // Ensure valid pathname, search, and hash values before proceeding
  if (!pathname || !search || !hash) {
   // console.error("Missing necessary parts of the URL: pathname, search, or hash.");
    return "home"; // Return null or a default value
  }

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

  console.log(fieldName); // Log for debugging

  return fieldName || 'defaultViewedBy'; // Fallback value if the field name is somehow invalid
}



// Function to update view data on unload or visibility change
 async function updateViewData(ipAddress, actionTrack, actionName, pageTitle, jobTitleName  ) {
    const viewEndTime = Date.now();
    const durationOfTheView = (viewEndTime - viewStartTime) / 1000;
    const viewedByField = getViewedByField();

    console.log(`${durationOfTheView} durationOfTheView ???????? .`);


    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");

    let userData = '';

    if (storedUserData) {
      // Parse the stored data
       userData = JSON.parse(storedUserData);
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
            lastViewDate: new Date().toISOString()


        },
        ipAddress: ipAddress || userData.ipAddress,
        name: userData.name || 'N/A',
        displayName: userData.displayName || 'N/A',
        userID: userData.userID || 'N/A',
        lastLogin: userData.lastLogin || 'N/A',
        city: locationData.city || 'N/A',
        state: locationData.region || 'N/A',
        zip: locationData.postal || 'N/A',
        country: locationData.country_name || 'N/A',
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
        console.log(`${viewedByField} data updated successfully.`);
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

         updateViewData(ipAddress, "visibilitychange", "N/A", pageTitle, "N/A"  );
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
  const jobArray = userJobInterest.map(item => item.job.toLowerCase()); // Convert to lowercase
  console.log('User Job Interests (lowercase):', jobArray);
  return jobArray;
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
  const tagArray = userTagInterest.map(item => item.tag.toLowerCase()); // Convert to lowercase
  console.log('User Tag Interests (lowercase):', tagArray);
  return tagArray;
}


window.getUserTagInterest = getUserTagInterest;





// Check if user is logged in and handle admin area access
function checkLogin() {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  // Redirect to home if user is not logged in and is in the admin area
  if (window.location.pathname.includes('/backend')) {
      if (!isLoggedIn) {
          if (window.location.pathname.includes('/backend')) {
              showToast('You need to log in to access the Admin area.');
          } else {
              // Redirect to login page or main admin page
              window.location.href = '/backend/dashboard/';
          }
      } else if (window.location.pathname.includes('/backend') || window.location.pathname.includes('/backend/index') || window.location.pathname.includes('/backend/')) {
          showToast('Admin Logged In');
          let firebaseLogin = document.getElementById("firebaseLogin");
          let dashboardContent = document.getElementById("dashboardContent");
      
          if(firebaseLogin){
              firebaseLogin = firebaseLogin.style.display = "none";
              dashboardContent = dashboardContent.style.display = "block";

          }
      
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

  window.updateNavVisibility = updateNavVisibility;
// Initialization
document.addEventListener('DOMContentLoaded', () => {
 

 

// Function to check if the user is logged in
function checkUserLoginStatus() {
  onAuthStateChanged(auth, (user) => {

    if (user) {


      // User is signed in
      console.log('User is logged in:', user);
      localStorage.setItem('userLoggedIn', true);

      if (!window.checkUrl("/backend/") || !window.checkUrl("/backend")) {

      handleAuthStateChanged(user); // Call your function to handle authenticated user
      }
      checkLogin(); // Ensure login is valid on page load
      
      
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
    updateNavVisibility(user);

    setTimeout(() => {
      getModal(user); // Fetch user data and populate modal
      showModal("profileModal"); // Show modal after getting the data
    }, 300);
  });
      return user;
    } else {
      updateNavVisibility(null);

      localStorage.setItem('userLoggedIn', false);

        if (!window.checkUrl("/backend/") || !window.checkUrl("/backend")) {

      handleAuthStateChanged(user); // Call your function to handle authenticated user
      }
      // No user is signed in
      console.log('No user is logged in.');
      return false;
    }
  });


  

  

}

window.checkUserLoginStatus = checkUserLoginStatus;

// Function to setup event listeners
function setupEventListeners() {
  // Dark Mode Toggle functionality
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle?.addEventListener("click", toggleDarkMode);

  // Initialize Dark Mode based on previous settings
  if (localStorage.getItem("darkMode") === "true") {
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

checkUserLoginStatus();

});



