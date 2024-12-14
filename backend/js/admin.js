


document.addEventListener('DOMContentLoaded', function() {
// https://reelcareer.co/getjobs



// Define your JSON data for navigation
const navData = { 
  "navGroups": [
    {
      "title": "Dashboard and Analytics",
      "links": [
        { "text": "Get Jobs", "href": "https://reelcareer.co/backend/getjobs" },
        { "text": "Get Data", "href": "https://reelcareer.co/backend/getDataAdzuna" },
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
};

  

  function setupAddLink() {
    const addLinkBtn = document.getElementById('addLinkBtn');
    addLinkBtn.addEventListener('click', () => {
      const newLinkText = document.getElementById('newLinkText').value.trim();
      const newLinkHref = document.getElementById('newLinkHref').value.trim();
  
      if (newLinkText && newLinkHref) {
        // Add to the first group if multiple exist
        if (navData.navGroups.length > 0) {
          navData.navGroups[0].links = navData.navGroups[0].links || []; // Ensure links exist
          navData.navGroups[0].links.push({ text: newLinkText, href: newLinkHref });
          localStorage.setItem('navData', JSON.stringify(navData));
          document.getElementById('newLinkText').value = '';
          document.getElementById('newLinkHref').value = '';
          replaceNav();
        } else {
          alert('No navigation group exists to add the link.');
        }
      } else {
        alert('Please enter both Link Text and Link URL.');
      }
    });
  }
  function updateNavDataOrder(fromIndex, toIndex) {
    const group = navData.navGroups[0]; // Modify to allow dynamic group selection
    if (group && group.links) {
      const movedLink = group.links.splice(fromIndex, 1)[0];
      group.links.splice(toIndex, 0, movedLink);
  
      localStorage.setItem('navData', JSON.stringify(navData));
      replaceNav();
    } else {
      console.error('Group or links are undefined.');
    }
  }
  
  
  const storedNav = JSON.parse(localStorage.getItem('navData'));
  if (storedNav && storedNav.navGroups) {
    navData.navGroups = storedNav.navGroups;
  }
  console.log('Stored Nav:', storedNav);
  console.log('Nav Data:', navData);
  
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
  
    // Loop through all navGroups
    if (navData.navGroups && navData.navGroups.length > 0) {
      navData.navGroups.forEach((group, groupIndex) => {
        navHTML += `<h5>${group.title || 'Group ' + (groupIndex + 1)}</h5>`;
        if (group.links && group.links.length > 0) {
          group.links.forEach((link, index) => {
            navHTML += `
              <div class="dropzone" data-drop-index="${index}"></div>
              <li class="list-group-item" draggable="true" data-index="${index}" data-group-index="${groupIndex}">
                <a href="${link.href}" class="text-decoration-none">${link.text}</a>
              </li>`;
          });
        }
        // Final dropzone at the end of the group
        navHTML += `<div class="dropzone" data-drop-index="${group.links ? group.links.length : 0}"></div>`;
      });
    }
  
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
      const dropZones = document.querySelectorAll('.dropzone');
      let draggedItem = null;
  
      listItems.forEach((item) => {
        item.addEventListener('dragstart', () => {
          draggedItem = item;
          setTimeout(() => (item.style.display = 'none'), 0);
        });
  
        item.addEventListener('dragend', () => {
          item.style.display = 'block';
          draggedItem = null;
        });
      });
  
      dropZones.forEach((zone) => {
        zone.addEventListener('dragover', (e) => {
          e.preventDefault();
          zone.classList.add('bg-light');
        });
  
        zone.addEventListener('dragleave', () => {
          zone.classList.remove('bg-light');
        });
  
        zone.addEventListener('drop', (e) => {
          e.preventDefault();
          zone.classList.remove('bg-light');
  
          const dropIndex = parseInt(zone.dataset.dropIndex);
          if (draggedItem) {
            const fromIndex = parseInt(draggedItem.dataset.index);
            if (fromIndex !== dropIndex) {
              updateNavDataOrder(fromIndex, dropIndex);
            }
          }
        });
      });
    }
  
    function updateNavDataOrder(fromIndex, toIndex) {
      const group = navData.navGroups[0];
      const movedLink = group.links.splice(fromIndex, 1)[0];
      group.links.splice(toIndex, 0, movedLink);
  
      localStorage.setItem('navData', JSON.stringify(navData));
      replaceNav();
    }
  
    function setupAddLink() {
      const addLinkBtn = document.getElementById('addLinkBtn');
      addLinkBtn.addEventListener('click', () => {
        const newLinkText = document.getElementById('newLinkText').value.trim();
        const newLinkHref = document.getElementById('newLinkHref').value.trim();
  
        if (newLinkText && newLinkHref) {
          navData.navGroups[0].links.push({ text: newLinkText, href: newLinkHref });
          localStorage.setItem('navData', JSON.stringify(navData));
          document.getElementById('newLinkText').value = '';
          document.getElementById('newLinkHref').value = '';
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
