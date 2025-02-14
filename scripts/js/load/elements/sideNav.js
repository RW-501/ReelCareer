


import {
  db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics,
  googleProvider, onSnapshot,
  facebookProvider,
  getUserId // Export the function
} from 'https://reelcareer.co/scripts/js/load/module.js';

const DEBUG = true;
if (DEBUG) console.log("Module Debug on");


  // Global Maps
  const locationMap = new Map(); // Stores location-based grouping
  const categoryMap = new Map(); // Stores videos grouped by categories
  const topVideos = []; // Stores top-rated videos
  
  
  let userId  = '';

  let connectionType = "";
  let connectedUserIds = null;



let postsPerPage = 10;
let lastVisibleDoc = null;
let searchingByTag = false;

const currentPath = window.location.pathname;
const currentUrl = window.location.href;

const sidePanel = document.getElementById('main-side-panel');


function insertSidePanelContent() {



  if (sidePanel) {

    if (DEBUG)   console.log("****************** sidePanel:");

    sidePanel.innerHTML = `
<nav id="side-nav" aria-label="Side Navigation">

  <div id="btn-menu-area" class="side-panel-menu">

  </div>

  <div id="side-panel-group" role="navigation" aria-label="Main Navigation">

    <ul id="side-nav-list" class="side-nav-list">
      <li class="side-nav-item" id="btn-join-area">
        <button id="btn-join" class="side-nav-button" aria-label="Join"> 
          <i class="fas fa-user" aria-hidden="true"></i><span class="btn-text"> Join</span>
        </button>
      </li>

      <li class="side-nav-item">
        <button id="showUploadPopup" class="side-nav-button" aria-label="Upload Reel">
          <i class="fas fa-upload" aria-hidden="true"></i>
          <span class="btn-text"> Upload Reel</span>
        </button>
      </li>

      <li class="side-nav-item">
        <button id="btn-search" class="side-nav-button" aria-label="Search"> 
          <i id="search-icon" class="fas fa-search search-icon" aria-hidden="true"></i>
          <span class="btn-text"> Search</span>
        </button>
      </li>


      <li class="side-nav-item">
        <button id="btn-location" class="side-nav-button" aria-label="Location">
          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
          <span class="btn-text"> Locations</span>
        </button>
      </li>

      <li class="side-nav-item" hidden>
        <button id="btn-home" class="side-nav-button" aria-label="Go to home">
          <i class="fas fa-home" aria-hidden="true"></i>
          <span class="btn-text"> Home</span>
        </button>
      </li>


      <li class="side-nav-item side-user-btn">
        <button id="btn-profile" class="side-nav-button" aria-label="Profile">
          <i class="fas fa-user" aria-hidden="true"></i>
          <span class="btn-text"> Profile</span>
        </button>
      </li>

      <li id='btn-connetions-area' class="side-nav-item side-user-btn">
        <button id="btn-connection" class="side-nav-button" aria-label="Connection">
          <i class="fas fa-user" aria-hidden="true"></i>
          <span class="btn-text">Connection</span>
        </button>
      </li>

      <li class="side-nav-item side-user-btn">
        <button id="btn-messages" class="side-nav-button" aria-label="Messages">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          <span class="btn-text"> Messages</span>
        </button>
      </li>

      <li class="side-nav-item" hidden>
        <button id="btn-create" class="side-nav-button" aria-label="Create Reel">
          <i class="fas fa-film" aria-hidden="true"></i>
          <span class="btn-text"> Create Reel</span>
        </button>
      </li>

      <li class="side-nav-item">
        <button id="btn-create-obituary" class="side-nav-button" aria-label="Create Obituary">
          <i class="fas fa-book" aria-hidden="true"></i>
          <span class="btn-text"> Create Obituary</span>
        </button>
      </li>

      <li class="side-nav-item">
        <button id="btn-faq" class="side-nav-button" aria-label="FAQ">
          <i class="fas fa-question-circle" aria-hidden="true"></i>
          <span class="btn-text"> FAQ</span>
        </button>
      </li>

      <li class="side-nav-item side-user-btn">
        <button id="btn-video-account" class="side-nav-button" aria-label="Video Account">
          <i class="fas fa-film" aria-hidden="true"></i>
          <span class="btn-text"> Video Account</span>
        </button>
      </li>

      <li class="side-nav-item side-user-btn">
        <button id="btn-video-analytics" class="side-nav-button" aria-label="Reels Analytics">
          <i class="fas fa-eye" aria-hidden="true"></i>
          <span class="btn-text"> Reels Analytics</span>
        </button>
      </li>

      <li class="side-nav-item side-user-btn">
        <button id="btn-video-watchHistory" class="side-nav-button" aria-label="Watch History">
          <i class="fas fa-history" aria-hidden="true"></i>
          <span class="btn-text">  Watch History</span>
        </button>
      </li>
    </ul>

    <!-- Popout Sections -->
    <div id="side-panel-popout-section" role="region" aria-labelledby="side-panel-group">
      <div id="search-section" class="side-panel-popout" aria-labelledby="search-section">
        <h4>Search</h4>
        <input type="text" id="side-panel-search-input" placeholder="Search videos..." aria-label="Search videos" />
        <h5>Suggestions</h5>
        <ul id="search-suggestions" class="search-suggestions" aria-live="polite"></ul>
      </div>

      <div id="location-section" class="side-panel-popout" aria-labelledby="location-section">
        <h4>Location</h4>
        <div id="side-panel-location" aria-live="polite"></div>
        <div id="currentLocationDisplay" aria-live="polite"></div>
        <div id="selectedLocation" aria-live="polite"></div>
        <div id="locationContainer" aria-live="polite"></div>
        <div id="location-video-div" aria-live="polite"></div>
      </div>

      <div id="connection-section" class="side-panel-popout" aria-labelledby="connection-section">
        <h4>Connection</h4>
        <div class="side-panel-connection-btn">
          <button data-type="" class="connection-type-button" aria-label="All Connections">All Connections</button>
          <button data-type="Networking" class="connection-type-button" aria-label="Networking">Networking</button>
          <button data-type="Friends" class="connection-type-button" aria-label="Friends">Friends</button>
          <button data-type="Family" class="connection-type-button" aria-label="Family">Family</button>
          <button data-type="Co-workers" class="connection-type-button" aria-label="Co-Workers">Co-Workers</button>
        </div>
        <div id="side-panel-contacts" aria-live="polite"></div>
      </div>
    </div>
  </div>

  <div class="text-center m-auto">
    <h4 id="navCloseBTN">Close</h4>
  </div>
</nav>

      `;
      loadConnectionsFunc();

  }

  let isSectionOpen = false;

/*
  document.querySelectorAll('.side-nav-button').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('sideNavActive'); // Toggle active class
      console.log('Clicked button ID:', this.id); 
        console.log('Active status:', this.classList.contains('active')); // Check if active is applied
    });
});

*/


  // Close side panel if clicked outside
  document.addEventListener('click', (event) => {
    const isClickInside = sidePanel.contains(event.target) || event.target.closest('#side-nav')
     || event.target.closest('.collapsible-location');

     if (DEBUG)   console.log("isClickInside: ", isClickInside);



    if (!isClickInside && sidePanel.style.display !== 'none') {


      const allPopouts = document.querySelectorAll('.side-panel-popout');
      allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
      isSectionOpen = false;
      //updateButtonTextVisibility('click');

    }
    



  });



  window.addEventListener("scroll", (event) => {
    const targetElement = event.target;

    // Check if the scroll event occurred outside of the sidePanel or #side-nav
    const isScrollOutside = !sidePanel.contains(targetElement);


    if (isScrollOutside && sidePanel.style.display !== 'none') {
      // Hide all popouts when the scroll happens outside the sidePanel
      const allPopouts = document.querySelectorAll('.side-panel-popout');
      allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
      isSectionOpen = false; // Update the section state
      updateButtonTextVisibility("scroll"); // Update UI button visibility if needed
    }
  });


  // Cache popout sections
  const searchSection = document.getElementById('search-section');
  const connectionSection = document.getElementById('connection-section');
  const locationSection = document.getElementById('location-section');


  // Add listeners for showing/hiding sections
  const togglePopout = (section) => {

    ///  console.log("section: ", section);

    const allPopouts = document.querySelectorAll('.side-panel-popout');
    allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts



    if (section.style.display !== 'none') {
        section.style.display = 'none'
      isSectionOpen = false;

    } else {
      section.style.display = 'block'; // Show only the selected section
      isSectionOpen = true;

    }



  };
  const navArea = document.getElementById('side-nav');

  const mainContent = document.getElementById("main-content");
  const mainSidePanel = document.getElementById("main-side-panel");
  const sidePanelGroup = document.getElementById("side-panel-group");
  const sideNavList = document.getElementById("side-nav-list");
  const navCloseBTN = document.getElementById("navCloseBTN");

  
  const isMobile = window.innerWidth <= 768;

  function toggleButtonActive(button) {
    // Remove 'active' from all buttons
    const allButtons = document.querySelectorAll('.side-nav-button');
    allButtons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' to the clicked button
    button.classList.add('active');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (sideNavList.style.display !== 'none') {
        sideNavList.style.display = 'none'
      } else {
        sideNavList.style.display = 'block'
      }
    }
    updateButtonTextVisibility();

  }


  navCloseBTN.addEventListener('click', () => {
            if(navArea.style.display !== 'none'){
              navArea.style.display = 'none'
           }else{
            navArea.style.display = 'block'
            console.warn("side-nav exist.");

           } 
  });

  document.getElementById('btn-menu').addEventListener('click', () => {
    if(navArea.style.display !== 'none'){
      navArea.style.display = 'none'
   }else{
    navArea.style.display = 'block'
    console.warn("side-nav exist.");

   } 
});


  document.getElementById('btn-search').addEventListener('click', () => {

    if (searchSection.style.display === "block") {
      searchSection.style.display = "none"
      isSectionOpen = false;

    } else {
      togglePopout(searchSection);
    }
    toggleButtonActive(document.getElementById('btn-search'));

  });

  document.getElementById('btn-connection').addEventListener('click', () => {
    if (connectionSection.style.display === "block") {
      connectionSection.style.display = "none"
      isSectionOpen = false;

    } else {
      togglePopout(connectionSection);
    }
    toggleButtonActive(document.getElementById('btn-connection'));
  });

  document.getElementById('btn-location').addEventListener('click', () => {
    if (locationSection.style.display === "block") {
     locationSection.style.display = "none"
      isSectionOpen = false;

    } else {
      togglePopout(locationSection);
    }
    toggleButtonActive(document.getElementById('btn-location'));

  });

  function loadButtonsFunc(){

const currentPath = window.location.pathname;
const currentUrl = window.location.href;


  if (DEBUG)    console.log("currentUrl   ", currentUrl);

  document.getElementById('btn-home').addEventListener('click', () => window.location.href = 'https://reelcareer.co');
  document.getElementById('btn-profile').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u');
  document.getElementById('btn-messages').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/messaging');
  document.getElementById('btn-create').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/create');
  document.getElementById('btn-faq').addEventListener('click', () => window.location.href = 'https://reelcareer.co/faq');
  document.getElementById('btn-create-obituary').addEventListener('click', () => window.location.href = 'https://reelcareer.co/obituaries/create');

  
    const videoAccountButton = document.getElementById('btn-video-account');
    const videoAnalyticsButton = document.getElementById('btn-video-analytics');
    const videoWatchHistoryButton = document.getElementById('btn-video-watchHistory');
    const videoReelsSection = document.getElementById('video-reels');
    const mainAnalyticsSection = document.getElementById('main-analytics');


    let showingAccount = true; // Track which section is visible


      videoAccountButton.addEventListener('click', () => {

        if (currentPath.includes('/u/reels')) {

        videoReelsSection.style.display = 'block';
        mainAnalyticsSection.style.display = 'none';
        showingAccount = false;
        if (DEBUG)    console.log(`Switched to: Video Reels`);
        }else{
          window.location.href = 'https://reelcareer.co/u/reels#video-reels';

        }


      });

      videoAnalyticsButton.addEventListener('click', () => {


        if (currentPath.includes('/u/reels')) {

        videoReelsSection.style.display = 'none';
        mainAnalyticsSection.style.display = 'block';
        showingAccount = true;
        console.log(`Switched to: Main Analytics`);
      } else{
        window.location.href = 'https://reelcareer.co/u/reels#main-analytics';


      }

    });


  

   





    videoWatchHistoryButton.addEventListener('click', () => {
      console.log(`Switched to: Main watch  history `);

    if (currentUrl === 'https://reelcareer.co/u/') {
      const watchHistoryButton = document.getElementById('watch-history-tab');
      if (watchHistoryButton) {
          watchHistoryButton.click();
      } else {
          console.warn("Watch History button not found");
      }
    
    } else {
        window.location.href = 'https://reelcareer.co/u/#watch-history-tab';
  
    }
  });



  

  document.getElementById('btn-join').addEventListener('click', () => {

    openPopupLogin();

  });

  // Search and filter functionality
  const searchInput = document.getElementById("side-panel-search-input");

  searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery) {
      if (DEBUG)     console.log("Searching by tag:", searchQuery);
      fetchVideoResumes(1, searchQuery, connectionType);
    } else {
      fetchVideoResumes(1, "", connectionType);
    }
  });




}

loadButtonsFunc();

  const updateButtonTextVisibility = (action) => {

     // mainSidePanel.classList.add('main-side-panel-fixed');

      
      if (isSectionOpen) {


        sideNavList.style.display = 'block';

        mainSidePanel.style.width = 'auto';
        sidePanelGroup.style.display = 'flex';
        document.querySelectorAll('.btn-text').forEach((text) => {
          text.style.display = 'none';
        });
      } else {

        if (action === 'scroll') {

          sideNavList.style.display = 'block';

          mainSidePanel.style.width = 'fit-content';
          sidePanelGroup.style.display = 'flex';
          document.querySelectorAll('.btn-text').forEach((text) => {
            text.style.display = 'none';
          });

        } else if (action === 'click') {
      
          sideNavList.style.display = 'block';

          mainSidePanel.style.width = 'fit-content';

          sidePanelGroup.style.display = 'flex';
          document.querySelectorAll('.btn-text').forEach((text) => {
            text.style.display = 'none';
          });



        } else {


          sideNavList.style.display = 'block';

          mainSidePanel.style.width = 'fit-content';

          sidePanelGroup.style.display = 'block';
          document.querySelectorAll('.btn-text').forEach((text) => {
            text.style.display = 'inline';
          });
        }




        }

      

// Apply the styles
mainContent.style.padding = '5%';
mainContent.style.borderRadius = '0';
mainContent.style.margin = '0';
mainContent.style.maxWidth = '100%';
mainContent.style.width = '100%'; // This line you already mentioned













    
    /* 
                document.querySelectorAll('.btn-text').forEach((text) => {
                  text.style.display = isMobile ? 'none' : 'inline';
                });
     */
  };

  window.addEventListener('resize', updateButtonTextVisibility);
  updateButtonTextVisibility();
}



const styleElement = document.createElement('style');
styleElement.textContent = `







#btn-menu {
    margin: 0;
    padding: 1rem;
    color: white;
    cursor: pointer;

        display: block;

}

#btn-menu-text {
    font-size: 1.2rem;
    font-weight: 600;
    -webkit-text-stroke: thin;
    font-variant: small-caps;
}


#btn-menu  i {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
    width: fit-content;
}




/* Show aria-label text on hover
  .side-nav-item::after {
  content: attr(aria-label);
  position: absolute;
  bottom: -25px; 
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;
}


.side-nav-item:hover::after {
  opacity: 1;
  visibility: visible;
}
 */

#body-main {

  /* Basic Styling for the <i> tags */
#showUploadPopup i {
  font-size: 24px; /* Icon size */
  color: #333; /* Dark gray color for the icon */
  transition: all 0.3s ease; /* Smooth transition for hover/active states */
  cursor: pointer; /* Pointer cursor for interactivity */
  margin: 0 10px; /* Spacing between icons (if there are multiple) */
  padding: 5px;
  border-radius: 50%; /* Rounded icon appearance */
  display: inline-block; /* Keeps the icon inline */
}

/* Hover Effect */
#showUploadPopup i:hover {
  color: #fff; /* Change icon color to white on hover */
  background-color: #007BFF; /* Background turns blue on hover */
  transform: scale(1.1); /* Slightly increase size on hover */
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3); /* Subtle shadow on hover */
}

/* Active Effect */
#showUploadPopup i:active {
  transform: scale(0.98); /* Slight shrinking effect when clicked */
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3); /* Lighter shadow on click */
}

/* Focus Effect */
#showUploadPopup i:focus {
  outline: none; /* Remove default outline */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.4); /* Custom blue focus ring */
}
#main-side-panel {
    width: fit-content;
    position: absolute;
    box-shadow: 0 0 0 3px rgb(102 168 238 / 31%);
    
}



#side-nav {
    background: linear-gradient(45deg, #8abddb, #e3ebf0);
    padding: 20px;


.side-panel-menu  i,
.side-nav-button i,
.side-nav-item i {
    background-color: #e9ecef69;
    border-radius: 25px;
    text-align: center;
    margin: 0;
    display: grid;
    align-content: space-around;
    justify-content: space-around;
    align-items: center;
    justify-items: center;
    width: 2.5rem;
    height: 2.5rem;
}

.side-panel-menu  i,
.side-nav-button i,
.side-nav-item i {
    color: white;
}

.side-panel-menu  i:hover, i:focus,
.side-nav-button i:hover, i:focus,
.side-nav-item i:hover, i:focus {
    background-color: none;
    transform: scale(1.1);
    color: #007bff;
    background: transparent;
}


}


  #side-panel-popout-section {
    display: grid;
}

.side-panel-popout {
    display: none;
    margin: 1rem;
}

  
  /* Search Area Styling */
  .search-area {
    margin-bottom: 20px;
    text-align: center;
  }
  
  #side-panel-search-input {
    padding: 10px;
    width: 100%;
    max-width: 500px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  
  #side-panel-search-input:focus {
    outline: none;
    border-color: rgb(132, 173, 234);
  }
  

/* Basic Styling */
#side-panel-search-input {
  width: 300px;  /* Adjust to desired width */
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 20px;  /* Rounded corners */
  transition: all 0.3s ease; /* Smooth transition */
  outline: none; /* Remove default outline */
  background-color: black;

}

/* Focus Styling */
#side-panel-search-input:focus {
  border-color: #007BFF; /* Border turns blue when focused */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add subtle glow effect */
}

/* Hover Styling */
#side-panel-search-input:hover {
    border: #89bdda solid;
}

/* Placeholder Styling */
#side-panel-search-input::placeholder {
  color: #aaa;  /* Lighter placeholder text */
  font-style: italic;  /* Slightly italic placeholder */
}

/* Basic Button Styling */
.menu-text,
.btn-text {
  background: transparent;
  border: none;
  color: #007BFF; /* Text color */
  font-size: 16px;
  font-weight: 600; /* Slightly bold text */
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition for hover/active states */
  text-transform: uppercase; /* Uppercase text for modern look */
  letter-spacing: 1px; /* Add slight spacing between letters */
  border-radius: 5px; /* Rounded corners */
}



/* Active Effect */
.menu-text:active,
.btn-text:active {
  transform: scale(0.98); /* Slight shrinking effect when clicked */
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3); /* Lighter shadow on click */
}

/* Focus Effect */
.menu-text:focus,
.btn-text:focus {
  outline: none; /* Remove default outline */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.4); /* Custom blue focus ring */
}

.side-nav-button:active {
  transform: scale(0.98); /* Slight shrinking effect when clicked */
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3); /* Lighter shadow on click */
    border: #89bdda solid;
      box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3); /* Subtle shadow for depth */






      }



#side-panel-search-input {
  transform: scale(0.98); /* Slight shrinking effect when clicked */
    border: #89bdda solid;
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3); /* Subtle shadow for depth */
}

.side-panel-menu {
    font: menu;
        color: white;

    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}


}


#locationContainer {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    margin: .5rem;
}

    .side-panel-search {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  
    #side-panel-group {
    display: flex;
    
    }
  
    
    .search-suggestions {
      margin-top: 5px;
      list-style: none;
      padding: 0;
    }
  
    .search-suggestions li {
      padding: 5px 10px;
      cursor: pointer;
    }
  
    .search-suggestions li:hover {
      background: #f0f0f0;
    }
  
    .side-nav-list {
      list-style: none;
      padding: 0;
      margin: 20px 0;
    }
  
    .side-nav-item {
      margin-bottom: 15px;
    }
  
.side-nav-button {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: .5rem;
    font-size: 16px;
    background: linear-gradient(271deg, #89bddb, transparent);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}
  
    .side-nav-button i {
      font-size: 20px;
    }
  
.side-nav-button:hover {
    background: linear-gradient(331deg, #e3ddf9, #88bdda);
    color: #fff;


      /* Hover Effect */
.btn-text {
  color: #fff; /* Text color changes to white on hover */
}



    }


.side-nav-button.active {
    border: #89bdda solid;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
    outline: none;

}

.embedded-Logo {
padding: 1rem;
margins: auto;

    user-select: none;
    font-size: 1.75rem !important;
}

.side-panel-content {
    display: grid;

    gap: 10px;
    margin: 10px;
  }

.connection-type-button {
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: azure;
    cursor: pointer;
    background: linear-gradient(45deg, #91c1dd, #aed0e3);
    transition: background-color 0.3s, color 0.3s;
}

  .connection-type-button:hover {
    background-color:rgb(142, 142, 143);
    color: #fff;
  }


#side-panel-search-inputearch-input {
    background: black;
    }

      }


.sideNavActive {

#side-nav-list {
  display = 'block';
  }
  
  
  #main-side-panel {
  width = 'fit-content';
    }
    
  
  #side-panel-group {
    display = 'block';
    }
    
  
  .btn-text {
  display = 'inline';
  
  }
}

#navCloseBTN {
    color: #83bad9;
    text-shadow: -1px 1px 0px #9e9a9a;
    font-weight: 800;
}


.side-user-btn {
    display: none;

}
  `;




if (sidePanel) {

  insertSidePanelContent();

  document.head.appendChild(styleElement);

  await auth.onAuthStateChanged((user) => {
    if (user) {
         userId = user.uid; // Access the user ID
/*
       if(userId){
        const connectedUserData =  getConnectedUserIds(connectionType);
       //  connectedUserIds = connectedUserData.map(user => user.id);
        
         setTimeout(() => {
            populateSidePanelContacts(connectedUserData);
        }, 500); // Delay of 500 milliseconds (0.5 seconds)
        
          }
*/

        // You can call your functions that require userId here
    } else {
    if (DEBUG)    console.error("No user is signed in.");
      
      }
});
  
 

}










/* 




body {
    background: black !important;
} 


   connectionTypeDropdown.addEventListener("change", (e) => {
      connectionType = e.target.value;
      console.log("Selected connection type:", connectionType);
      fetchVideoResumes(1, "", connectionType);
    });
  });
  

// Add contacts dynamically
const contacts = ['John Doe', 'Jane Smith', 'Michael Brown'];
const contactsList = document.getElementById('contactsList');
contacts.forEach(contact => {
  const listItem = document.createElement('li');
  listItem.textContent = contact;
  contactsList.appendChild(listItem);
});
 */











function populateSidePanelContacts(connectedUserData) {
  const sidePanelContacts = document.getElementById('side-panel-contacts');
  sidePanelContacts.innerHTML = ''; // Reset content

  // Inject CSS for contact styling
  const style = document.createElement('style');
  style.textContent = `

  #side-panel-contacts {
  
    .contact-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }

    .contact-profile-picture {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

.contact-name {
    flex-grow: 1;
    color: #86bbd9;
}

.view-profile-button, .view-videos-button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #b7d1eb;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    text-decoration: none;
}

    .view-profile-button:hover, .view-videos-button:hover {
      background-color: #0056b3;
    }




}

  `;
  document.head.appendChild(style);

  // Iterate over connected user data
  connectedUserData.forEach(user => {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact-item';


    const viewProfileButton = document.createElement('a');

    const profileImg = document.createElement('img');
    profileImg.src = user.profilePicture;
    profileImg.alt = `${user.name}'s profile picture`;
    profileImg.className = 'contact-profile-picture';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = user.name;
    nameSpan.className = 'contact-name';

    viewProfileButton.href = user.profileUrl;
    viewProfileButton.target = '_blank';

    const viewVideosButton = document.createElement('button');
    viewVideosButton.textContent = 'View Videos';
    viewVideosButton.className = 'view-videos-button';
    viewVideosButton.onclick = () => {

      fetchVideoResumes(page = 1, tagFilter = "", '', '', true, user.id);

      if (DEBUG)    console.log(`View videos for user: ${user.name} (ID: ${user.id})`);
    };

    viewProfileButton.appendChild(profileImg);
    viewProfileButton.appendChild(nameSpan);
    contactDiv.appendChild(viewProfileButton);
    contactDiv.appendChild(viewVideosButton);
    sidePanelContacts.appendChild(contactDiv);
  });
}


window.populateSidePanelContacts = populateSidePanelContacts;









function createVideoCard(video, categoryTitle = null) {
  const videoDiv = document.createElement('div');
  videoDiv.className = 'category-item';

  // Optional category title
  if (categoryTitle) {
    const categoryHeader = document.createElement('h3');
    categoryHeader.textContent = categoryTitle;
    categoryHeader.className = 'category-item-h3';
    videoDiv.appendChild(categoryHeader);
  }

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-preview';

  const thumbnail = document.createElement('img');
  thumbnail.src = video.thumbnailURL || 'https://reelcareer.co/images/sq_logo_n_BG_sm.png';
  thumbnail.alt = video.videoResumeTitle || 'Video thumbnail';
  thumbnail.className = 'video-thumbnail';

  const link = document.createElement('a');
  link.href = video.videoResumeURL || `https://reelcareer.co/watch/?v=${video.reelURL}`;
  link.textContent = 'Watch Video';
  link.target = '_blank';
  link.className = 'watch-video-button';
  link.setAttribute('aria-label', `Watch this video ${video.videoResumeTitle || 'Untitled Video'}`);

  videoContainer.appendChild(thumbnail);
  videoContainer.appendChild(link);
  videoDiv.appendChild(videoContainer);

  return videoDiv;
}




async function loadTopCategoriesWithVideos() {
  const searchSuggestionsDiv = document.getElementById('search-suggestions');
  const locationDiv = document.getElementById('location-video-div');
  searchSuggestionsDiv.innerHTML = ''; // Clear any existing content
  locationDiv.innerHTML = ''; // Clear any existing content

  // Avoid repeated style injection
  if (!document.getElementById('video-preview-style')) {
    const style = document.createElement('style');
    style.id = 'video-preview-style';
    style.textContent = `

    #main-side-panel {

      z-index: 50;

.category-item {
    margin-bottom: 20px;
    padding: 1rem;
    background: linear-gradient(153deg, #26449e14, #1d5b9e4f);
}
        .category-item-h3 {
        font-size: 1.5rem;
        }
.video-preview {
    display: flex;
    align-items: center;
    margin-top: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}
.video-thumbnail {
    height: 80px;
    width: 45px;
    margin-right: 10px;
    object-fit: cover;
}
      .video-title {
        font-weight: bold;
        margin-right: 10px;
      }
.watch-video-button {
    padding: 5px 10px;
    border: none;
    background-color: #b7d1eb;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    text-decoration: none;
}
      .watch-video-button:hover {
        background-color: #0056b3;
      }
      
      .location-tab {
          margin-top: 10px;
      }
      .collapsible {
          background-color: #f1f1f1;
          color: #444;
          cursor: pointer;
          padding: 10px;
          text-align: left;
          border: none;
          outline: none;
          font-size: 1.2rem;
          border-radius: 5px;
          margin-bottom: 5px;
      }
      .collapsible.active {
          background-color: #d3d3d3;
      }


      


.videoContent {
    padding: 0 15px;
    display: flex;
    overflow: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background: beige;
    margin: .5rem;
}

      .collapsible-location {
          background: linear-gradient(to bottom, #f4f4f4, #83bad9);
    color: #676767 !important;
    border-radius: 5px;
    padding: 12px 30px;
    font-size: 1rem;
    border: none;
    transition: background 0.3s ease;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
      }

  }


#currentLocationDisplay > button { 
    background: linear-gradient(to top, #f4f4f4, #83bad9);
    color: #676767 !important;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1rem;
    border: none;
    transition: background 0.3s ease;
    display: inline-block;
    font-weight: 100;
    text-align: center;
    vertical-align: middle;
}

#currentLocationDisplay > button:hover {
    background: linear-gradient(to top, #83bad9, #f4f4f4);
    color: #000 !important;
    cursor: pointer;
}


    `;
    document.head.appendChild(style);
  }











  let data ;
if(sidePanel){
  // Define the URL for the JSON file
  const jsonUrl = 'https://reelcareer.co/scripts/json/videoReels.json';

  // Fetch the JSON data
  const response = await fetch(jsonUrl);

  // Log the response to ensure it's being fetched correctly
  //console.log("Response received:", response);

  // Parse the JSON data
   data = await response.json();

   if (DEBUG)   console.log('JSON data:', data);
}
  // Process each video data from the JSON
// Group videos by location (country > state > city)
data.forEach((video) => {
  if (video.isPublic && video.status === 'posted' && !video.isDeleted) {
      const { country, state, city } = video;

      // Create an array of non-empty location parts
      const locationParts = [country, state, city].filter(part => part && part !== 'Unknown');

      // Only proceed if there is at least one valid location part
      if (locationParts.length > 0) {
          const locationKey = locationParts.join(' > '); // Join valid parts with " > "
  
          // Group videos by location
          if (!locationMap.has(locationKey)) {
              locationMap.set(locationKey, []);
          }
          locationMap.get(locationKey).push(video);
      }
 
      

  
  
      // Calculate video rating
      const rating = ((video.views * video.duration) / video.watchTime) * 0.7 + video.likes * 0.3;
      topVideos.push({ ...video, rating });
     // console.warn('topVideos:', topVideos);

      // Group videos by categories
      if (video.reelCategories && video.reelCategories.length > 0) {
        video.reelCategories.forEach((category) => {
          if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
          }
          categoryMap.get(category).push({ ...video, rating });
        });
      }
    }
  });

  
  generateLocationList(data, locationMap);

  // You can now use 'topVideos' and 'categoryMap' as needed
  const sortedCategories = Array.from(categoryMap.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  const randomPhrases = [
    "Explore the creative world of {category}",
    "Top picks in {category}",
    "Watch the best {category} reels",
    "Trending now: {category} talent",
    "See standout work in {category}"
  ];

 
// Main code
const fragment = document.createDocumentFragment();
//console.log('categoryMap:', categoryMap);

sortedCategories.forEach(([category, videos]) => {
  const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)].replace('{category}', category);
  const topVideo = videos.sort((a, b) => b.rating - a.rating)[0];

  if (!topVideo) {
    if (DEBUG)   console.warn('No top video found for category:', category);
    return;
  }

  const videoCard = createVideoCard(topVideo, randomPhrase);
  fragment.appendChild(videoCard);
});

searchSuggestionsDiv.appendChild(fragment);

if (sortedCategories.length === 0) {
  const topRatedVideos = topVideos.sort((a, b) => b.rating - a.rating).slice(0, 5);
  topRatedVideos.forEach((video) => {
  //  const tagPhrase = `Discover amazing content about: ${video.tags.join(', ')}`;
    const tagPhrase = ` ${video.videoResumeTitle}`;
    const videoCard = createVideoCard(video, tagPhrase);
    fragment.appendChild(videoCard);
  });

  searchSuggestionsDiv.appendChild(fragment);
}


}












window.loadTopCategoriesWithVideos = loadTopCategoriesWithVideos;



// Check if sessionStorage contains userLocation and set it
const userLocation = sessionStorage.getItem("userLocation");


function generateLocationList(data, locationMap) {

 // console.log('locationMap:', locationMap);

  // Populate location map with grouped data
  data.forEach((doc) => {
    const { country, state, city } = doc;
    if (country && state && city) {
      if (!locationMap.has(country)) {
        locationMap.set(country, new Map());
      }
      const countryMap = locationMap.get(country);
      if (!countryMap.has(state)) {
        countryMap.set(state, new Map());
      }
      const stateMap = countryMap.get(state);

      // Group videos by city, and keep track of all videos for the city
      if (!stateMap.has(city)) {
        stateMap.set(city, []);
      }
      stateMap.get(city).push(doc);
    }
  });



  // Create a reusable button component for each location (country, state, city)
  function createButton(text, className, location, onClick) {


    // Validate the inputs
    if (typeof text !== 'string' || text.trim() === '') {
      console.error('Button text must be a non-empty string.');
      return null;
    }

    if (typeof className !== 'string' || className.trim() === '') {
      console.error('Class name must be a non-empty string.');
      return null;
    }

    if (!(location instanceof HTMLElement)) {
      console.error('Location must be a valid DOM element.');
      return null;
    }

    if (typeof onClick !== 'function') {
      console.error('onClick must be a valid function.');
      return null;
    }

    
    // Create the button element
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;

    // Add the event listener for the button click
    button.addEventListener('click', (event) => {
      try {
        // Prevent the default button behavior
        event.preventDefault();
        const locationDiv = document.getElementById('location-video-div');
        locationDiv.innerHTML = '';

        // Call the provided onClick handler
        onClick(event);

        if (DEBUG)   console.warn('location: ',text);


      } catch (error) {
        console.error('Error in onClick handler:', error);
      }
    });


    // Append the button to the specified location
    location.appendChild(button);

    return button;
  }

  window.createButton = createButton;

  
    // Function to select the top video for a given city
    function getTopVideo(videos) {
     // console.warn('videos topVideo: ', videos);
  
      // Ensure videos is an array
      if (!Array.isArray(videos)) {
//          console.error("Expected an array but received:", typeof videos, videos);
  
          // If videos is an object (i.e., a single video entry), wrap it in an array
          if (typeof videos === 'object' && videos !== null) {
              videos = [videos]; // Convert single object to an array
          } else {
              return null; // If it's not an object or array, return null
          }
      }
  
      // If the array is empty, return null
      if (videos.length === 0) {
        if (DEBUG)     console.warn("No videos found.");
          return null;
      }
  
      // Find the video with the highest weighted score using reduce
      return videos.reduce((top, video) => {
          const currentScore = video.rating * 0.7 + video.views * 0.3; // Weighted scoring
          const topScore = top.rating * 0.7 + top.views * 0.3;
  
        //  console.log("Evaluating video: ", video, "Current top video: ", top);
  
          return currentScore > topScore ? video : top;
      }, videos[0]); // Start with the first item as the initial "top"
  }
  window.getTopVideo = getTopVideo;


    // Render the list of countries
    function renderLocations(countryMap) {


      locationContainer.innerHTML = '';
      countryMap.forEach((statesMap, country) => {
        const topVideo = getTopVideo(statesMap);


        const countryDiv = document.createElement('div');
        countryDiv.className = 'country-tab';
  
        if(country !== 'Unknown'){
        const countryButton = createButton(
          country,
          'collapsible-location',
          countryDiv,
          () => {
            renderStates(country, statesMap);
            saveLocationToLocalStorage(country, '', '', 'country');

            renderSideVideos(topVideo);

          }
        );
  
        countryDiv.appendChild(countryButton);
        locationContainer.appendChild(countryDiv);
      }

      
      });
    }
  window.renderLocations = renderLocations;

    // Render the list of states for a given country
    function renderStates(country, statesMap) {
      locationContainer.innerHTML = `<button id="backToCountries">Back to Countries</button>`;

      document.getElementById('backToCountries').addEventListener('click', (event) => {
        event.preventDefault();
        const locationDiv = document.getElementById('location-video-div');
        locationDiv.innerHTML = '';

        renderLocations(locationMap.get(country));
      });
      
      statesMap.forEach((citiesMap, state) => {
        const topVideo = getTopVideo(citiesMap);
        if (DEBUG)    console.warn('states topVideo: ',state);

        const stateDiv = document.createElement('div');
        stateDiv.className = 'state-tab';
  
        const stateButton = createButton(
          state,
          'collapsible-location',
          stateDiv,
          () => {
            renderCities(country, state, citiesMap);
            saveLocationToLocalStorage(country, state, '', 'state');
            renderSideVideos(topVideo);

          }
        );
  
        stateDiv.appendChild(stateButton);
        locationContainer.appendChild(stateDiv);
      });
    }
  
    // Render the list of cities for a given state
    function renderCities(country, state, citiesMap) {
      locationContainer.innerHTML = `<button id="backToStates">Back to States</button>`;

document.getElementById('backToStates').addEventListener('click', () => {
  renderStates(locationMap.get(state));
});

      citiesMap.forEach((videos, city) => {
        const topVideo = getTopVideo(videos);

        const cityDiv = document.createElement('div');
        cityDiv.className = 'city-tab';
  
        const cityButton = createButton(
          city,
          'collapsible-location',
          cityDiv,
          () => {
            console.log(`Selected Location: ${country} > ${state} > ${city}`);
            saveLocationToLocalStorage(country, state, city, 'city');
            renderSideVideos(topVideo);
          }
        );
  
        cityDiv.appendChild(cityButton);
        locationContainer.appendChild(cityDiv);
      });
    }
  
    window.renderStates  = renderStates ;
    window.renderCities = renderCities;
    
    // Function to render a video card for the selected city
    function renderSideVideos(video) {
      const locationDiv = document.getElementById('location-video-div');

      const videoCard = createVideoCard(video);
      locationDiv.appendChild(videoCard);

    }
  
    // Function to create a reusable video card
    function createVideoCard(video) {
      if (DEBUG)   console.warn('video createVideoCard: ', video);
  
      // Create wrapper div
      const contentWrapDiv = document.createElement('div');
      contentWrapDiv.className = 'videoContentWrap';
  
      // Create inner content div
      const contentDiv = document.createElement('div');
      contentDiv.className = 'videoContent';
  
      // Video location span
      const contentSpan = document.createElement('span');
      contentSpan.className = 'contentSpan';
      contentSpan.textContent = video.location || 'Unknown location';
  
      // Video thumbnail
      const thumbnail = document.createElement('img');
      thumbnail.src = video.thumbnailURL || 'https://reelcareer.co/images/sq_logo_n_BG_sm.png';
      thumbnail.alt = video.videoResumeTitle || 'Video thumbnail';
      thumbnail.className = 'video-thumbnail';
  
      // Video link
      const videoLink = document.createElement('a');
      videoLink.title = video.videoResumeTitle || 'Untitled Video';
      videoLink.href = `https://reelcareer.co/watch/?v=${video.reelID}`;
      videoLink.textContent = 'Watch Video';
      videoLink.target = '_blank';
      videoLink.className = 'watch-video-button';
      videoLink.setAttribute('aria-label', `Watch this video: ${video.videoResumeTitle || 'Untitled Video'}`);
  
      // Append elements
      contentDiv.appendChild(thumbnail);
      contentDiv.appendChild(videoLink);
      contentWrapDiv.appendChild(contentDiv);
      contentWrapDiv.appendChild(contentSpan);
  
      return contentWrapDiv;
  }
      window.renderSideVideos = renderSideVideos;
  
    // Save selected location to localStorage for later use
    function saveLocationToLocalStorage(country, state, city, type) {
      let locationID = '';
      if (type === 'country') {
        locationID = country;
      } else if (type === 'state') {
        locationID = `${country}-${state}`;
      } else if (type === 'city') {
        locationID = `${country}-${state}-${city}`;
      }
      localStorage.setItem('selectedLocation', locationID);
    }
  
    renderLocations(locationMap)// Initial render for countries
  }
  

function loadConnectionsFunc() {

  let userLocationData = sessionStorage.getItem('userLocation');


  if (userLocationData && sidePanel) {
    let currentLocation = userLocationData ? JSON.parse(userLocationData) : { city: "", state: "", country: "" };

    const locationContainer = document.getElementById('locationContainer');
    locationContainer.innerHTML = ''; // Clear any existing content


    document.getElementById('currentLocationDisplay').innerHTML = `
    <button id="countryBtn">${currentLocation.country || 'Unknown'}</button>
    <button id="stateBtn">${currentLocation.state || 'Unknown'}</button>
    <button id="cityBtn">${currentLocation.city || 'Unknown'}</button>
  `;
  
  // Attach event listeners to buttons
  document.getElementById('countryBtn').addEventListener('click', () => {
    const selectedLocation = document.getElementById('locationContainer');
    locationContainer.innerHTML = '';

      const countryMap = locationMap.get(currentLocation.country);
      if (countryMap) {
          renderLocations(countryMap);
      } else {
          console.warn("Country not found in locationMap");
      }
  });
  
  document.getElementById('stateBtn').addEventListener('click', () => {
    const selectedLocation = document.getElementById('locationContainer');
    locationContainer.innerHTML = '';

    const locationDiv = document.getElementById('location-video-div');
    locationDiv.innerHTML = '';

    // Get the country map first
    const countryMap = locationMap.get(currentLocation.country);
    
    const stateMap = countryMap.get(currentLocation.state);
      if (stateMap) {
         // renderStates(currentLocation.country, stateMap);


          stateMap.forEach((citiesMap, state) => {
            const topVideo = getTopVideo(citiesMap);
    
            const stateDiv = document.createElement('div');
            stateDiv.className = 'state-tab';
      
            const stateButton = createButton(
              currentLocation.state,
              'collapsible-location',
              stateDiv,
              () => {

                
                if (DEBUG)      console.warn('topVideo renderSideVideos: ',topVideo);

               renderSideVideos(topVideo);
    
              }
            );
      
            stateDiv.appendChild(stateButton);
            locationContainer.appendChild(stateDiv);
          });


      } else {
          console.warn("State not found in locationMap");
      }
  });
  
  document.getElementById('cityBtn').addEventListener('click', () => {
    const selectedLocation = document.getElementById('locationContainer');
    locationContainer.innerHTML = '';

    const locationDiv = document.getElementById('location-video-div');
    locationDiv.innerHTML = '';

    const countryMap = locationMap.get(currentLocation.country);
    
    const stateMap = countryMap.get(currentLocation.state);
    const cityMap = stateMap.get(currentLocation.city);
      if (cityMap) {
          //renderCities(currentLocation.country, currentLocation.state, cityMap);

          cityMap.forEach((videos, city) => {
            const topVideo = getTopVideo(videos);
    
            const cityDiv = document.createElement('div');
            cityDiv.className = 'city-tab';
      
            const cityButton = createButton(
              currentLocation.city,
              'collapsible-location',
              cityDiv,
              () => {

                if (DEBUG)     console.warn('topVideo renderSideVideos: ',topVideo);
                renderSideVideos(topVideo);
              }
            );
      
            cityDiv.appendChild(cityButton);
            locationContainer.appendChild(cityDiv);
          });
      
        } else {
          console.warn("City not found in locationMap");
      }
  });
  

    if ((currentPath.includes('/reels/') || currentPath.includes('/videos/'))) {

      const connectionsBTN = document.getElementById('btn-connetions-area');
      if (connectionsBTN) {
        connectionsBTN.classList.add('hidden'); // Adds the 'hidden' class to the element
      }


    } else {
      console.log('No match found.');
    }
  }

  if (sidePanel) {

    loadTopCategoriesWithVideos();

  }

  const connectionsBTN = document.getElementById('connectionsBTN');
  if (connectionsBTN) {
    connectionsBTN.classList.add('hidden'); // Adds the 'hidden' class to the element
  }
}



