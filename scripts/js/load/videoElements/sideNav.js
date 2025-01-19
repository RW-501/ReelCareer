
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
            <input type="text" id="search-input" placeholder="Search videos..." aria-label="Search" style="display: none;" />
            <ul id="search-suggestions" class="search-suggestions" style="display: none;"></ul>
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

          <div id="side-panel-topics">
          <div > Popualer Topics</div>
              <button id="btn-topics" class="side-nav-button"><i class="fas fa-question-circle"></i><span class="btn-text"> Topics</span></button>

</div>

</div>

        </nav>
      `;
    }
  
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
  
    searchIcon.addEventListener('click', () => {
      searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
      searchInput.focus();
    });
  
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      searchSuggestions.style.display = query ? 'block' : 'none';
      searchSuggestions.innerHTML = query ? `<li>Suggested: ${query} reel</li>` : '';
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
  
    .contacts-section select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  `;
  document.head.appendChild(styleElement);
  




  // Listeners for navigation
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-home').addEventListener('click', () => window.location.href = 'https://reelcareer.co');
    document.getElementById('btn-profile').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u');
    document.getElementById('btn-messages').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/messaging');
    document.getElementById('btn-create').addEventListener('click', () => window.location.href = 'https://reelcareer.co/u/create');
    document.getElementById('btn-faq').addEventListener('click', () => window.location.href = 'https://reelcareer.co/views/faq');
    document.getElementById('btn-create-obituary').addEventListener('click', () => window.location.href = 'https://reelcareer.co/obituaries/create');
  });
  
  // Search and filter functionality
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("search-input");
    const connectionTypeDropdown = document.getElementById("connection-type-dropdown");
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
  
    connectionTypeDropdown.addEventListener("change", (e) => {
      connectionType = e.target.value;
      console.log("Selected connection type:", connectionType);
      fetchVideoResumes(1, "", connectionType);
    });
  });
  








/* 
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

