


document.addEventListener('DOMContentLoaded', function() {

// Define your JSON data for navigation
const navData = {
    "navGroups": [
      {
        "title": "Dashboard and Analytics",
        "links": [
          { "text": "Tickets", "href": "https://reelcareer.co/backend/tickets" },
          { "text": "Notes", "href": "https://reelcareer.co/backend/notes" },
          { "text": "Title Fix", "href": "https://reelcareer.co/backend/titles-fix" },
          { "text": "Sitemap Builder", "href": "https://reelcareer.co/backend/sitemap" },
          { "text": "Lower Case DB", "href": "https://reelcareer.co/backend/lowerCaseDB" }
        ]
      },{
        "navGroups": [
          {
            "title": "Dashboard and Analytics",
            "links": [
              { "text": "Tickets", "href": "https://reelcareer.co/backend/tickets" },
              { "text": "Notes", "href": "https://reelcareer.co/backend/notes" },
              { "text": "Title Fix", "href": "https://reelcareer.co/backend/titles-fix" },
              { "text": "Sitemap Builder", "href": "https://reelcareer.co/backend/sitemap" },
              { "text": "Lower Case DB", "href": "https://reelcareer.co/backend/lowerCaseDB" }
            ]
          },
          {
            "title": "Management Tools",
            "links": [
              { "text": "Content Management", "href": "https://reelcareer.co/backend/content-management" },
              { "text": "User Management", "href": "https://reelcareer.co/backend/user-management" },
              { "text": "Job Management", "href": "https://reelcareer.co/backend/job-management" },
              { "text": "Application Management", "href": "https://reelcareer.co/backend/application-management" }
            ]
          },
          {
            "title": "General Settings and Utilities",
            "links": [
              { "text": "Contact", "href": "https://reelcareer.co/backend/contact" },
              { "text": "Settings", "href": "https://reelcareer.co/backend/settings" },
              { "text": "Support", "href": "https://reelcareer.co/backend/support" },
              { "text": "Chatbot", "href": "https://reelcareer.co/backend/chatbot" },
              { "text": "Notifications Management", "href": "https://reelcareer.co/backend/notifications-management" },
              { "text": "System Logs", "href": "https://reelcareer.co/backend/system-logs" }
            ]
          },
          {
            "title": "Finance and Monetization",
            "links": [
              { "text": "Transactions", "href": "https://reelcareer.co/backend/transactions" },
              { "text": "Integration Management", "href": "https://reelcareer.co/backend/integration-management" },
              { "text": "Payments", "href": "https://reelcareer.co/backend/payments" },
              { "text": "Monetization", "href": "https://reelcareer.co/backend/monetization" }
            ]
          },
          {
            "title": "SEO and Cleanup",
            "links": [
              { "text": "Delete Dup", "href": "https://reelcareer.co/backend/delete-dup" },
              { "text": "SEO Helper", "href": "https://reelcareer.co/backend/seo-helper" }
            ]
          },
          {
            "title": "Role and Personality Management",
            "links": [
              { "text": "Role Management", "href": "https://reelcareer.co/backend/role-management" },
              { "text": "Trait Personality Management", "href": "https://reelcareer.co/backend/trait-personality-management" }
            ]
          }
        ]
      }
      
      // Add other groups as needed
    ]
  };
 
  // Load from localStorage if it exists
    const storedNav = JSON.parse(localStorage.getItem('navData'));
    if (storedNav) navData.navGroups = storedNav.navGroups;
  
    function replaceNav() {
      let oldNav = document.getElementById('Main_Nav');
  
      if (!oldNav) {
        oldNav = document.createElement('nav');
        oldNav.id = 'Main_Nav';
        document.body.prepend(oldNav);
      }
  
      let navHTML = `
        <div class="container mt-3">
          <ul class="list-group mb-3" id="link-list">`;
  
      // Generate the list
      navData.navGroups.forEach((group) => {
        group.links.forEach((link, index) => {
          navHTML += `
            <li class="list-group-item" draggable="true" data-index="${index}" data-title="${group.title}">
              <a href="${link.href}" class="text-decoration-none">${link.text}</a>
            </li>
          `;
        });
      });
  
      navHTML += `
          </ul>
          <div>
            <input type="text" id="newLinkText" placeholder="Link Text" class="form-control mb-2" />
            <input type="text" id="newLinkHref" placeholder="Link URL" class="form-control mb-2" />
            <button id="addLinkBtn" class="btn btn-primary">Add Link</button>
          </div>
        </div>`;
  
      oldNav.innerHTML = navHTML;
      addDragAndDrop();
      setupAddLink();
    }
  
    function addDragAndDrop() {
      const listItems = document.querySelectorAll('#link-list .list-group-item');
      let draggedItem = null;
  
      listItems.forEach((item) => {
        item.addEventListener('dragstart', (e) => {
          draggedItem = item;
          setTimeout(() => (item.style.display = 'none'), 0);
        });
  
        item.addEventListener('dragover', (e) => {
          e.preventDefault();
          const dropZone = e.currentTarget;
          dropZone.classList.add('bg-light');
        });
  
        item.addEventListener('dragleave', () => {
          const dropZone = event.currentTarget;
          dropZone.classList.remove('bg-light');
        });
  
        item.addEventListener('drop', (e) => {
          e.preventDefault();
          const dropZone = e.currentTarget;
          dropZone.classList.remove('bg-light');
          if (draggedItem !== dropZone) {
            const list = document.getElementById('link-list');
            const draggedIndex = draggedItem.dataset.index;
            const dropIndex = dropZone.dataset.index;
  
            list.insertBefore(draggedItem, dropZone.nextSibling);
  
            // Update data order
            updateNavDataOrder(draggedIndex, dropIndex);
          }
        });
  
        item.addEventListener('dragend', () => {
          draggedItem.style.display = 'block';
          draggedItem = null;
        });
      });
    }
  
    function updateNavDataOrder(fromIndex, toIndex) {
      const group = navData.navGroups[0]; // Handle the first group for simplicity
      const movedLink = group.links.splice(fromIndex, 1)[0];
      group.links.splice(toIndex, 0, movedLink);
  
      // Save to localStorage
      localStorage.setItem('navData', JSON.stringify(navData));
  
      // Re-render to update indices
      replaceNav();
    }
  
    function setupAddLink() {
      const addLinkBtn = document.getElementById('addLinkBtn');
      addLinkBtn.addEventListener('click', () => {
        const newLinkText = document.getElementById('newLinkText').value.trim();
        const newLinkHref = document.getElementById('newLinkHref').value.trim();
  
        if (newLinkText && newLinkHref) {
          // Add new link to the first group
          navData.navGroups[0].links.push({ text: newLinkText, href: newLinkHref });
  
          // Save to localStorage
          localStorage.setItem('navData', JSON.stringify(navData));
  
          // Clear input fields
          document.getElementById('newLinkText').value = '';
          document.getElementById('newLinkHref').value = '';
  
          // Re-render navigation
          replaceNav();
        } else {
          alert('Please enter both Link Text and Link URL.');
        }
      });
    }
  
    replaceNav();
  });
  




  document.addEventListener('DOMContentLoaded', function() {
    addStylesheetToHeader();
});

function addStylesheetToHeader() {
    // Create a new <link> element
    const link = document.createElement('link');
    
    // Set the attributes for the <link> element
    link.rel = 'stylesheet';
    link.href = 'https://reelcareer.co/public/css/styles.css';
    
    // Append the <link> element to the <head> section of the document
    document.head.appendChild(link);
}
