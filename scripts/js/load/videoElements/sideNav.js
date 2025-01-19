
let postsPerPage = 10;
let lastVisibleDoc = null;
let searchingByTag = false; 







function insertSidePanelContent() {
    const sidePanel = document.getElementById('main-side-panel');
    if (sidePanel) {
      sidePanel.innerHTML = `
        <nav id="side-nav" aria-label="Side Navigation">
          <div class="side-panel-search">
            <input type="text" id="search-input" placeholder="Search videos..." aria-label="Search" />
          </div>
          <ul class="side-nav-list">
            <li class="side-nav-item">
              <button id="btn-home" class="side-nav-button">Home</button>
            </li>
            <li class="side-nav-item">
              <button id="showUploadPopup" class="side-nav-button">Upload Your Reel</button>
            </li>
            <li class="side-nav-item">
              <button id="btn-profile" class="side-nav-button">Profile</button>
            </li>
            <li class="side-nav-item">
              <button id="btn-messages" class="side-nav-button">Messages</button>
            </li>
            <li class="side-nav-item">
              <button id="btn-create" class="side-nav-button">Create Reel</button>
            </li>
          </ul>
          <div class="contacts-section">
            <h4>Contacts</h4>
            <select id="connection-type-dropdown" class="connection-type-dropdown">
              <option value="">All Connections</option>
              <option value="Networking">Networking</option>
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
              <option value="Co-workers">Co-Workers</option>
            </select>
          </div>
        </nav>
      `;
    }
  }
  

  document.addEventListener('DOMContentLoaded', insertSidePanelContent);



















// Track if search mode is active
//  document.addEventListener("DOMContentLoaded", () => {
   // console.log("DOMContentLoaded event fired");

 

    // Search videos by tag
    const searchInput = document.getElementById("search-input");
const connectionTypeDropdown = document.getElementById("connection-type-dropdown");

let connectionType = "";

searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    // Trigger search by tag when there is an input
    if (searchQuery) {
        searchingByTag = true;
        console.log("Searching by tag:", searchQuery);
        fetchVideoResumes(1, searchQuery, connectionType);  // Pass connectionType along with the search query
    } else {
        searchingByTag = false;
        console.log("Not searching by tag");
        fetchVideoResumes(1, "", connectionType);  // Reset to show all videos
    }
});

connectionTypeDropdown.addEventListener("change", (e) => {
    connectionType = e.target.value; // Set connection type filter
    console.log("Selected connection type:", connectionType);
    fetchVideoResumes(1, "", connectionType);  // Fetch videos based on the new connection type


});





document.getElementById('btn-home').addEventListener('click', () => {
  window.location.href = 'https://reelcareer.co';
});

document.getElementById('btn-profile').addEventListener('click', () => {
  window.location.href = 'https://reelcareer.co/u';
});

document.getElementById('btn-messages').addEventListener('click', () => {
  window.location.href = 'https://reelcareer.co/u/messaging';
});

document.getElementById('btn-create').addEventListener('click', () => {
  window.location.href = 'https://reelcareer.co/u/create';
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

