
let postsPerPage = 10;
let lastVisibleDoc = null;
let searchingByTag = false; 


function insertSidePanelContent() {
    const sidePanel = document.getElementById('main-side-panel');
    if (sidePanel) {
      sidePanel.innerHTML = `
        <nav id="side-nav" aria-label="Side Navigation">
          <div class="side-panel-search">
            <i id="search-icon" class="fas fa-search search-icon"></i>
          </div>

          <div id="side-panel-group">


          <ul class="side-nav-list">
            <li class="side-nav-item">
              <button id="btn-home" class="side-nav-button"><i class="fas fa-home"></i><span class="btn-text"> Home</span></button>
            </li>
            <li class="side-nav-item">
              <button id="showUploadPopup" class="side-nav-button"><i class="fas fa-upload"></i><span class="btn-text"> Upload Your Reel</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-profile" class="side-nav-button"><i class="fas fa-user"></i><span class="btn-text"> Profile</span></button>
            </li>
                       
            <li class="side-nav-item">
              <button id="btn-connection" class="side-nav-button"><i class="fas fa-envelope"></i><span class="btn-text">Connection</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-messages" class="side-nav-button"><i class="fas fa-envelope"></i><span class="btn-text"> Messages</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-create" class="side-nav-button"><i class="fas fa-film"></i><span class="btn-text"> Create Reel</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-create-obituary" class="side-nav-button"><i class="fas fa-book"></i><span class="btn-text"> Create Obituary</span></button>
            </li>
            <li class="side-nav-item">
              <button id="btn-faq" class="side-nav-button"><i class="fas fa-question-circle"></i><span class="btn-text"> FAQ</span></button>
            </li>
          </ul>
          <div id="side-panel-popout-section">

          <div id="search-section" class="side-panel-popout">
          <div > Popualer Topics</div>

                      <input type="text" id="search-input" placeholder="Search videos..." aria-label="Search"  />

            <ul id="search-suggestions" class="search-suggestions" ></ul>
                    </div>  

                    
          <div id="connection-section" class="side-panel-popout">
     <h4>Connection</h4>
      <div class="connection-buttons">
        <button data-type="" class="connection-type-button">All Connections</button>
        <button data-type="Networking" class="connection-type-button">Networking</button>
        <button data-type="Friends" class="connection-type-button">Friends</button>
        <button data-type="Family" class="connection-type-button">Family</button>
        <button data-type="Co-workers" class="connection-type-button">Co-Workers</button>
      </div>
</div>


</div>


</div>

        </nav>
      `;
    }
  

        // Cache popout sections
        const searchSection = document.getElementById('search-section');
        const connectionSection = document.getElementById('connection-section');
      
        // Add listeners for showing/hiding sections
        const togglePopout = (section) => {

            console.log("section: ", section);

            const allPopouts = document.querySelectorAll('.side-panel-popout');
          allPopouts.forEach((popout) => popout.style.display = 'none'); // Hide all popouts
          section.style.display = 'block'; // Show only the selected section
        };
      

        document.getElementById('search-icon').addEventListener('click', () => {
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
  
.connection-buttons {
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

