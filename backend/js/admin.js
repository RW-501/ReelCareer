


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
  function replaceNav() {
    // Get or create the Main_Nav element
    let oldNav = document.getElementById('Main_Nav');

    if (!oldNav) {
        oldNav = document.createElement('nav');
        oldNav.id = 'Main_Nav';
        document.body.prepend(oldNav); // Add the nav to the top of the body
    }

    // Build the new navigation HTML
    let navHTML = `
        <div class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://reelcareer.co">ReelCareer.co</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
    `;

    // Loop through navGroups and their links
    navData.navGroups.forEach(group => {
        navHTML += `<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="${group.title.replace(/\s/g, '-')}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${group.title}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="${group.title.replace(/\s/g, '-')}">
        `;

        group.links.forEach(link => {
            navHTML += `<a class="dropdown-item" href="${link.href}">${link.text}</a>`;
        });

        navHTML += `</div></li>`;
    });

    navHTML += `
                </ul>
            </div>
        </div>
    `;

    // Replace the oldNav content with the new HTML
    oldNav.innerHTML = navHTML;
}

// Call the function to replace the navigation
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
