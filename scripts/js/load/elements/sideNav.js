
let postsPerPage = 10;
let lastVisibleDoc = null;
let searchingByTag = false; 
const currentPath = window.location.pathname;

const sidePanel = document.getElementById('main-side-panel');


function insertSidePanelContent() {
    if (sidePanel) {
      sidePanel.innerHTML = `
        <nav id="side-nav" aria-label="Side Navigation">
          <div class="side-panel-search">
           <button id="btn-search" class="side-nav-button"> <i id="search-icon" class="fas fa-search search-icon"></i><span class="btn-text"> Search</span></button>
          </div>

          <div id="side-panel-group">


          <ul class="side-nav-list">
            <li class="side-nav-item">
              <button id="btn-home" class="side-nav-button"><i class="fas fa-home"></i><span class="btn-text"> Home</span></button>
            </li>

            <li class="side-nav-item"  id="btn-join-area" >
              <button id="btn-join" class="side-nav-button"><i class="fas fa-user"></i><span class="btn-text"> Join</span></button>
            </li>
            
            <li class="side-nav-item">
              <button id="btn-location" class="side-nav-button"><i class="fas fa-map-marker-alt"></i><span class="btn-text">Locations</span></button>
            </li>

            <li class="side-nav-item side-user-btn">
              <button id="showUploadPopup" class="side-nav-button"><i class="fas fa-upload"></i><span class="btn-text"> Upload Reel</span></button>
            </li>
            <li class="side-nav-item side-user-btn">
              <button id="btn-profile" class="side-nav-button"><i class="fas fa-user"></i><span class="btn-text"> Profile</span></button>
            </li>
                       
            <li class="side-nav-item side-user-btn">
              <button id="btn-connection" class="side-nav-button"><i class="fas fa-user"></i><span class="btn-text">Connection</span></button>
            </li>
            <li class="side-nav-item side-user-btn">
              <button id="btn-messages" class="side-nav-button"><i class="fas fa-envelope"></i><span class="btn-text"> Messages</span></button>
            </li>
            <li class="side-nav-item" hidden>
              <button id="btn-create" class="side-nav-button"><i class="fas fa-film"></i><span class="btn-text"> Create Reel</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-create-obituary" class="side-nav-button"><i class="fas fa-book"></i><span class="btn-text"> Create Obituary</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-faq" class="side-nav-button"><i class="fas fa-question-circle"></i><span class="btn-text"> FAQ</span></button>
            </li>

        <li class="side-nav-item side-user-btn">
              <button id="btn-video-account" class="side-nav-button"><i class="fas fa-film"></i><span class="btn-text"> Video Account</span></button>
            </li>



<li class="side-nav-item side-user-btn">
    <button id="btn-video-analytics" class="side-nav-button">
        <i class="fas fa-eye"></i><span class="btn-text"> Reels Analytics</span>
    </button>
</li>

<li class="side-nav-item side-user-btn">
    <button id="btn-video-watchHistory" class="side-nav-button">
        <i class="fas fa-history"></i><span class="btn-text">  Watch History</span>
    </button>
</li>







          </ul>

<div id="side-panel-popout-section">

        <div id="search-section" class="side-panel-popout">
          <h4>Search</h4>
          <input type="text" id="side-panel-search-input" placeholder="Search videos..." aria-label="Search"  />
          <h5>Suggestions</h5>

          <div class="side-panel-content">
          <ul id="search-suggestions" class="search-suggestions" ></ul>
          </div>
          
        </div>  

                    
  <div id="location-section" class="side-panel-popout">
     <h4>Location</h4>
    <div class="side-panel-content">

      <div id="side-panel-location"></div>


      <div id="currentLocationDisplay"></div>
      <div id="selectedLocation"></div>
      <div id="locationContainer"></div>


      <div id="location-video-div"></div>
    </div>
  </div>





  <div id="connection-section" class="side-panel-popout">
     <h4>Connection</h4>
    <div class="side-panel-content">

      <div class="side-panel-connection-btn">
        <button data-type="" class="connection-type-button">All Connections</button>
        <button data-type="Networking" class="connection-type-button">Networking</button>
        <button data-type="Friends" class="connection-type-button">Friends</button>
        <button data-type="Family" class="connection-type-button">Family</button>
        <button data-type="Co-workers" class="connection-type-button">Co-Workers</button>
      </div>

      <div id="side-panel-contacts"></div>

    </div>
  </div>


</div>

</div>


  <div class="text-center m-auto btn-text">
    <h3 class="font-weight-bold embedded-Logo">ReelCareer.co</h3>
</div>
        </nav>
      `;
    }
    
  
    
  // Close side panel if clicked outside
  document.addEventListener('click', (event) => {
    const isClickInside = sidePanel.contains(event.target) || event.target.closest('#side-nav');
    if (!isClickInside && sidePanel.style.display !== 'none') {
    
    
        const allPopouts = document.querySelectorAll('.side-panel-popout');
        allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
        isSectionOpen = false;
        updateButtonTextVisibility();

      //  sidePanel.style.display = 'none'; // Close the side panel
    }
  });

        // Cache popout sections
        const searchSection = document.getElementById('search-section');
        const connectionSection = document.getElementById('connection-section');
        const locationSection = document.getElementById('location-section');

        let isSectionOpen = false;
      
        // Add listeners for showing/hiding sections
        const togglePopout = (section) => {

          ///  console.log("section: ", section);

            const allPopouts = document.querySelectorAll('.side-panel-popout');
          allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
          section.style.display = 'block'; // Show only the selected section

          isSectionOpen = true;

          updateButtonTextVisibility();
        };
      

        function toggleButtonActive(button) {
            const allButtons = document.querySelectorAll('.side-nav-button');
            allButtons.forEach(btn => btn.classList.remove('active'));  // Remove 'active' from all buttons
            button.classList.add('active');  // Add 'active' to the clicked button
          }
          
          document.getElementById('btn-search').addEventListener('click', () => {
            togglePopout(searchSection);
            toggleButtonActive(document.getElementById('btn-search'));
          });
          
          document.getElementById('btn-connection').addEventListener('click', () => {
            togglePopout(connectionSection);
            toggleButtonActive(document.getElementById('btn-connection'));
          });

          document.getElementById('btn-location').addEventListener('click', () => {
            togglePopout(locationSection);
            toggleButtonActive(document.getElementById('btn-location'));
          });


          const currentUrl = window.location.href;
          console.log("currentUrl   ",currentUrl);
          
        document.getElementById('btn-home').addEventListener('click', () => window.location.href = 'https://reelcareer.co');
        document.getElementById('btn-profile').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u');
        document.getElementById('btn-messages').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/messaging');
        document.getElementById('btn-create').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/create');
        document.getElementById('btn-faq').addEventListener('click', () => window.location.href = 'https://reelcareer.co/faq');
        document.getElementById('btn-create-obituary').addEventListener('click', () => window.location.href = 'https://reelcareer.co/obituaries/create');

        document.addEventListener('DOMContentLoaded', () => {
          const currentPath = window.location.pathname;
          const currentUrl = window.location.href;
      
          console.log("currentPath: ", currentPath);
      
          const videoAccountButton = document.getElementById('btn-video-account');
          const videoAnalyticsButton = document.getElementById('btn-video-analytics');
          const videoWatchHistoryButton = document.getElementById('btn-video-watchHistory');
          const videoReelsSection = document.getElementById('video-reels');
          const mainAnalyticsSection = document.getElementById('main-analytics');
      
          if (currentPath.includes('/u/reels')) {
              let showingAccount = true; // Track which section is visible
      
              videoAccountButton.addEventListener('click', () => {
                  videoReelsSection.style.display = 'block';
                  mainAnalyticsSection.style.display = 'none';
                  showingAccount = false;
                  console.log(`Switched to: Video Reels`);
              });
      
              videoAnalyticsButton.addEventListener('click', () => {
                  videoReelsSection.style.display = 'none';
                  mainAnalyticsSection.style.display = 'block';
                  showingAccount = true;
                  console.log(`Switched to: Main Analytics`);
              });
          } else {
              videoAccountButton.addEventListener('click', () => {
                  window.location.href = 'https://reelcareer.co/u/reels#video-reels';
              });
      
              videoAnalyticsButton.addEventListener('click', () => {
                  window.location.href = 'https://reelcareer.co/u/reels#main-analytics';
              });
          }
      
          if (currentUrl === 'https://reelcareer.co/u/') {
              document.getElementById('watch-history-tab').click(); // Automatically opens watch history tab if needed
          } else {
              videoWatchHistoryButton.addEventListener('click', () => {
                  window.location.href = 'https://reelcareer.co/u/#watch-history-tab';
              });
          }
      });
      
       
        document.getElementById('btn-join').addEventListener('click', () => {

      openPopupLogin();
  
        });

        // Search and filter functionality
        const searchInput = document.getElementById("side-panel-search-input");
        let connectionType = "";
      
        searchInput.addEventListener("input", (e) => {
          const searchQuery = e.target.value.trim().toLowerCase();
          if (searchQuery) {
            console.log("Searching by tag:", searchQuery);
            fetchVideoResumes(1, searchQuery, connectionType);
          } else {
            fetchVideoResumes(1, "", connectionType);
          }
        });

        const updateButtonTextVisibility = () => {
          const mainContent = document.getElementById("main-content");
          const mainSidePanel = document.getElementById("main-side-panel");
          const sidePanelGroup = document.getElementById("side-panel-group");

            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
              document.querySelectorAll('.btn-text').forEach((text) => {
                text.style.display = 'inline';
              });
              mainSidePanel.style.width = '100%';
              mainContent.style.width = '100%';
              sidePanelGroup.style.display = 'grid';







            }else{
              document.querySelectorAll('.btn-text').forEach((text) => {
                text.style.display = isMobile ? 'none' : 'inline';
              });
              mainContent.style.width = '100%';




             if(isSectionOpen) {


             }



            }


          };
          
          window.addEventListener('resize', updateButtonTextVisibility);
          updateButtonTextVisibility();
        }

 
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `

#body-main {
    display: flex;
    width: 100%;
    flex-flow: wrap;
    max-width: 100%;
    overflow-wrap: anywhere;
    align-content: stretch;
    align-items: stretch;
}
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
        display: block;

}

#main-content {
    max-width: 74%;
    display: block;
}


#side-nav {
    background: linear-gradient(45deg, #8abddb, #e3ebf0);
    padding: 20px;
    border-radius: 10px;



         .side-panel-search i,
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

        .side-panel-search i,
  .side-nav-item i {
    color: white;
}
        .side-panel-search i:hover, i:focus,
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
  #main-content {
    padding: 20px;
  
    border-radius: 10px;
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
.btn-text:active {
  transform: scale(0.98); /* Slight shrinking effect when clicked */
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3); /* Lighter shadow on click */
}

/* Focus Effect */
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
      border-radius: 5px;
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
  `;




  if(sidePanel){

    document.addEventListener('DOMContentLoaded', insertSidePanelContent);
  
    document.head.appendChild(styleElement);
  


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












    // Infinite Scroll
    window.addEventListener("scroll", () => {
      if (currentPath.includes('/reel/') || currentPath.includes('/videos/')){
       // console.log("Window scrolled:", window.innerHeight + window.scrollY);
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
            !searchingByTag
        ) {
         //   console.log("Fetching more videos due to scroll");
         //   fetchVideoResumes();
        }
      }
    });
//  });

