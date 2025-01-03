function updateFooter() {
    const footer = document.getElementById("dynamic-footer");
    const currentYear = new Date().getFullYear();
  
    // Footer links data (from JSON)
    const footerLinks = [
        {
            "url": "/",
            "name": "ReelCareer",
            "title": "ReelCareer - #1 Job Board - Find a job today",
        },
        {
            "url": "/obituaries/create",
            "name": "Create Obituary",
            "title": "Create an obituary page - Let the world know your story.",
        },
        {
            "url": "/obituaries",
            "name": "Obituaries",
            "title": "View more Obituaries.",
        },
        {
            "url": "/about",
            "name": "About Obituaries",
            "title": "About Career Obituaries.",
        }
    ];

    // Render Footer Links
    function renderFooterLinks() {
        const footerHTML = `
        <footer>
            <div class="footerMainContainer text-center">
                <p>Designed with love and reflection. The future is limitless.</p>

                <nav class='footerNavContainer'>
                    <div class='footerNavItems'>
                        ${footerLinks.map(link => 
                            ` <a href="${link.url}" title="${link.title}">${link.name}</a> `
                        ).join(" | ")}
                    </div>
                </nav>
                <p class="footerCopyWrite">&copy; ${currentYear} ReelCareer</p>
            </div>
        </footer>

        <div class="banner">
            <p>Discover more opportunities at <a href="https://ReelCareer.co" target="_blank">ReelCareer.co</a></p>
        </div>

        <div class="section flowers-section">
            <h2>Do you ever feel like you have to die before people notice your work?</h2>
            <p>Let people give you your flowers now! Create an obituary page now and let the world know your story.</p>
            <div class="button">
                <a href="https://ReelCareer.co/obituaries/create">Create Your Obituary</a>
            </div>
        </div>
        `;
        
        const footer = document.getElementById('dynamic-footer');
        footer.innerHTML = footerHTML;
    }

    // Call the renderFooterLinks function to generate the footer content
    renderFooterLinks();
}

// Call updateFooter on page load
updateFooter();
