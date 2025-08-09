

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



let userINFO;


  // Delay slightly to ensure Firebase auth state is ready
  setTimeout(() => {

onAuthStateChanged(auth, (user) => {
  userINFO = user;

  const path = window.location.pathname;
  const isBackendArea = path.includes('/backend');

  console.log("onAuthStateChanged path:", path, "user:", userINFO);

    if (!isBackendArea) {
      try {
        handleAuthStateChanged(userINFO);
      } catch (err) {
        console.error("Error in handleAuthStateChanged:", err);
      }
    } else {
      try {
        checkAdminLogin(userINFO);
      } catch (err) {
        console.error("Error in checkAdminLogin:", err);
      }
    }
});

  }, 250); // 250ms delay




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
      }, //https://reelcareer.co/obituaries
      {
        href: "https://reelcareer.co/obituaries",
        icon: "fa fa-pencil-alt",        
        text: "Career Obituaries",
        ariaLabel: "Create An Career Obituary"
      },
      /*
      {
        href: "https://reelcareer.co/views/blogs",
        icon: "fa fa-pencil-alt",
        text: "Blogs",
        ariaLabel: "Go to blogs page",
      },
      */
      {
        href: "https://reelcareer.co/membership",
        icon: "fa fa-user",
        text: "Membership",
        ariaLabel: "Go to membership page",
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
      <nav id="Main-Nav_bar" class="navbar navbar ${navbarClass}" role="navigation">
        <div id="main-nav-bar">

            <div id="btn-menu" class="main-nav-menu-btn" aria-label="Toggle navigation menu">
      <span id="btn-menu-text" class="menu-text">
      <i id="menu-icon" class="fas fa-bars bar-icon" aria-hidden="true"></i>
      </span>
    </div>

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
 
          </div>
        </div>
      </nav>
    `;
  }
  
  
  
  
  
  


  // Helper function to handle authentication state changes
  function handleAuthStateChanged(user) {
    const authSection = document.getElementById("authSection");
    if (user) {


// Assuming getUserData() returns an object, not an array
const userDataSaved = getUserData() || {};



const lastUpdateTimestamp = userDataSaved.lastUpdateTime;
const lastUpdateDate = new Date((lastUpdateTimestamp.seconds * 1000) + (lastUpdateTimestamp.nanoseconds / 1000000));

if (DEBUG) console.log("lastUpdateTime:", lastUpdateDate);

if (!lastUpdateDate || (new Date() - lastUpdateDate) > 30 * 60 * 1000) {
  if (DEBUG)  console.log("updating user:", user.displayName);

     saveUserLoginState(user); // Save user state
}

      

      const dropdownMenuItems = [
        {
          title: "Profile",
          href: "https://reelcareer.co/u/",
          icon: "fa fa-user",
          ariaLabel: "Go to Profile"
        },
    
        {
          title: "Reels Dashboard",
          href: "https://reelcareer.co/u/reels",
          icon: "fas fa-film",
          ariaLabel: "Go to Video Dashboard"
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
         {
          title: "Career Obituaries",
          href: "https://reelcareer.co/obituaries",
          icon: "fa fa-plus-circle",
          ariaLabel: "Create An Career Obituary"
        }
      ];
      

      // If logged in, show profile info and logout button
      const userName = userDataSaved.displayName || user.displayName || "User";
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
            ${userPhoto} 
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
          <small id="nav-welcome-name" > Welcome <name id="nav-user-name">${userName}</name></small>
          <hr>
            ${generateDropdownItems(dropdownMenuItems)}
            <hr>


            <button class="dropdown-item" id="accountButton">
              <i class="fa fa-user" style="margin-right: 8px;"></i> Account Info
            </button>

            <button class="dropdown-item" id="logoutButton">
              <i class="fa fa-sign-out-alt" style="margin-right: 8px;"></i> Logout
            </button>

          </div>
        </div>`;
 
      
        // Display Job Seeker and Recruiter links

        document.getElementById("logoutButton").addEventListener("click", () => {
          logoutUser();
        });
        


        document.getElementById("accountButton").addEventListener("click", () => {
          window.location.href = "https://reelcareer.co/u/account";
        });
        
    
        


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


 // Function to handle keyboard navigation for dropdowns
 document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    const target = document.activeElement;
    if (target.classList.contains("dropdown-toggle")) {
      target.click();
    }
  }
});


  

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


   // Define the  function to check if a specific keyword is in the URL
   function checkUrl(keyword) {
    // Get the current URL
    const currentUrl = window.location.href;
   // console.log("currentUrl:", currentUrl);
   // console.log("keyword:", keyword);
  
    // Return true if the keyword is found in the URL, otherwise false
    return currentUrl.includes(keyword);
  };
  
  window.checkUrl = checkUrl;




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
  
 

async function logoutUser() {
  if (DEBUG) console.log("logoutUser: ", auth);

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
  

 
  
  