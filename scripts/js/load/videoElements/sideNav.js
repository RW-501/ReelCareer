
let postsPerPage = 10;
let lastVisibleDoc = null;
let searchingByTag = false; // Track if search mode is active
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

