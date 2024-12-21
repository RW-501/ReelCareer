

import {
  db, doc, getDoc, query, updateDoc,
  setDoc, ref, signInWithPopup, orderBy,limit, 
  uploadBytes, OAuthProvider, arrayUnion, getStorage,
  signOut, addDoc, increment, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  where, getDocs, storage, collection, deleteObject, getUserId,
  auth, analytics, deleteDoc, getDownloadURL, serverTimestamp 
} from 'https://reelcareer.co/scripts/js/load/module.js';

const user = getUserId;
  


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

if (!window.checkUrl("/backend/") || !window.checkUrl("/backend")) {

  
console.log("user?    ",user);
  handleAuthStateChanged(user); // Call your function to handle authenticated user
  }