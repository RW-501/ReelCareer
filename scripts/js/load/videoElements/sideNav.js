
let postsPerPage = 10;
let lastVisibleDoc = null;
let searchingByTag = false; 


function insertSidePanelContent() {
    const sidePanel = document.getElementById('main-side-panel');
    if (sidePanel) {
      sidePanel.innerHTML = `
        <nav id="side-nav" aria-label="Side Navigation">
          <div class="side-panel-search">
           <button id="btn-search" class="side-nav-button"> <i id="search-icon" class="fas fa-search search-icon"><span class="btn-text"> Search</span></i></button>
          </div>
   
          <div id="side-panel-group">


          <ul class="side-nav-list">
            <li class="side-nav-item">
              <button id="btn-home" class="side-nav-button"><i class="fas fa-home"></i><span class="btn-text"> Home</span></button>
            </li>

            <li class="side-nav-item"  id="btn-join-area" >
              <button id="btn-join" class="side-nav-button"><i class="fas fa-user"></i><span class="btn-text"> Join</span></button>
            </li>
            <li class="side-nav-item side-user-btn">
              <button id="showUploadPopup" class="side-nav-button"><i class="fas fa-upload"></i><span class="btn-text"> Upload Your Reel</span></button>
            </li>
            <li class="side-nav-item side-user-btn">
              <button id="btn-profile" class="side-nav-button"><i class="fas fa-user"></i><span class="btn-text"> Profile</span></button>
            </li>
                       
            <li class="side-nav-item side-user-btn">
              <button id="btn-connection" class="side-nav-button"><i class="fas fa-envelope"></i><span class="btn-text">Connection</span></button>
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

        <li class="side-nav-item" >
              <button id="btn-video-account" class="side-nav-button"><i class="fas fa-film"></i><span class="btn-text"> Video Account</span></button>
            </li>

          </ul>
          <div id="side-panel-popout-section">

          <div id="search-section" class="side-panel-popout">
     <h4>Search</h4>

                      <input type="text" id="search-input" placeholder="Search videos..." aria-label="Search"  />
     <h5>Suggestions</h5>
               <div class="side-panel-content">

            <ul id="search-suggestions" class="search-suggestions" ></ul>
            </div>
                    </div>  

                    
          <div id="connection-section" class="side-panel-popout">
     <h4>Connection</h4>
      <div class="side-panel-content">
      <div id="side-panel-contacts">


        </div>
      <div class="side-panel-connection-btn">

        <button data-type="" class="connection-type-button">All Connections</button>
        <button data-type="Networking" class="connection-type-button">Networking</button>
        <button data-type="Friends" class="connection-type-button">Friends</button>
        <button data-type="Family" class="connection-type-button">Family</button>
        <button data-type="Co-workers" class="connection-type-button">Co-Workers</button>
              </div>

      
      
        </div>
</div>


</div>


</div>

        </nav>
      `;
    }
      const user = auth.currentUser;
  
      if(!user){  
        const allUserBtns = document.querySelectorAll('.side-user-btn');
        allUserBtns.forEach((btns) => btns.style.display = 'none'); // Hide all popouts
      }else{

        document.getElementById('search-section').style.display = 'block';
      }
  // Close side panel if clicked outside
  document.addEventListener('click', (event) => {
    const isClickInside = sidePanel.contains(event.target) || event.target.closest('#side-nav');
    if (!isClickInside && sidePanel.style.display !== 'none') {
    
    
        const allPopouts = document.querySelectorAll('.side-panel-popout');
        allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
     
      //  sidePanel.style.display = 'none'; // Close the side panel
    }
  });

        // Cache popout sections
        const searchSection = document.getElementById('search-section');
        const connectionSection = document.getElementById('connection-section');
      
        // Add listeners for showing/hiding sections
        const togglePopout = (section) => {

          ///  console.log("section: ", section);

            const allPopouts = document.querySelectorAll('.side-panel-popout');
          allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
          section.style.display = 'block'; // Show only the selected section
        };
      

        document.getElementById('btn-search').addEventListener('click', () => {
            togglePopout(searchSection);
        });
        document.getElementById('btn-connection').addEventListener('click', () => {
            togglePopout(connectionSection);
          });
        
        document.getElementById('btn-home').addEventListener('click', () => window.location.href = 'https://reelcareer.co');
        document.getElementById('btn-profile').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u');
        document.getElementById('btn-messages').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/messaging');
        document.getElementById('btn-create').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/create');
        document.getElementById('btn-faq').addEventListener('click', () => window.location.href = 'https://reelcareer.co/views/faq');
        document.getElementById('btn-create-obituary').addEventListener('click', () => window.location.href = 'https://reelcareer.co/obituaries/create');
        document.getElementById('btn-video-account').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/reels');
        document.getElementById('btn-join').addEventListener('click', () => {

      openPopupLogin();
  
        });

        // Search and filter functionality
        const searchInput = document.getElementById("search-input");
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
            const isMobile = window.innerWidth <= 768;
            document.querySelectorAll('.btn-text').forEach((text) => {
              text.style.display = isMobile ? 'none' : 'inline';
            });
          };
        
          window.addEventListener('resize', updateButtonTextVisibility);
          updateButtonTextVisibility();
        }

 
  
  document.addEventListener('DOMContentLoaded', insertSidePanelContent);
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `




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

    #side-nav {
      background-color: #f4f4f4;
      padding: 20px;
      border-radius: 10px;
    }


  #side-panel-popout-section {
    display: grid;
}

.side-panel-popout {
    display: none;
        margin: 1rem;

}


/* Basic Styling */
#search-input {
  width: 300px;  /* Adjust to desired width */
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 20px;  /* Rounded corners */
  transition: all 0.3s ease; /* Smooth transition */
  outline: none; /* Remove default outline */
  background-color: #fff;
}

/* Focus Styling */
#search-input:focus {
  border-color: #007BFF; /* Border turns blue when focused */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add subtle glow effect */
}

/* Hover Styling */
#search-input:hover {
  border-color: #888; /* Darker border on hover */
}

/* Placeholder Styling */
#search-input::placeholder {
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

/* Hover Effect */
.btn-text:hover {
  color: #fff; /* Text color changes to white on hover */
  background-color: #007BFF; /* Button background turns blue on hover */
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3); /* Subtle shadow for depth */
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











    .side-panel-search {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  
    #side-panel-group {
    display: flex;
    
    }
    .search-icon {
      color: #666;
      cursor: pointer;
    }
  
    .search-suggestions {
      margin-top: 5px;
      list-style: none;
      padding: 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #fff;
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
      padding: 10px;
      font-size: 16px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
    }
  
    .side-nav-button i {
      font-size: 20px;
    }
  
    .side-nav-button:hover {
      background-color: #007bff;
      color: #fff;
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
    cursor: pointer;
    background: #fff;
    transition: background-color 0.3s, color 0.3s;
  }

  .connection-type-button:hover {
    background-color: #007bff;
    color: #fff;
  }



    
  `;
  document.head.appendChild(styleElement);
  










/* 

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
       // console.log("Window scrolled:", window.innerHeight + window.scrollY);
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
            !searchingByTag
        ) {
         //   console.log("Fetching more videos due to scroll");
         //   fetchVideoResumes();
        }
    });
//  });

