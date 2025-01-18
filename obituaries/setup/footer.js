function updateFooter() {
    const footer = document.getElementById("dynamic-footer");
    const currentYear = new Date().getFullYear();
  
    // Footer links data (from JSON)
    const footerLinks = [
        {
            "url": "https://reelcareer.co",
            "name": "ReelCareer",
            "title": "ReelCareer - #1 Job Board - Find a job today",
        },
        {
            "url": "https://reelcareer.co/obituaries/create",
            "name": "Create Obituary",
            "title": "Create an obituary page - Let the world know your story.",
        },
        {
            "url": "https://reelcareer.co/obituaries",
            "name": "Obituaries",
            "title": "View more Obituaries.",
        },
        {
            "url": "https://reelcareer.co/obituaries/about",
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
                <button id="report-obituary-btn" class="btn btn-danger">
  Report Obituary
</button>
                <p class="footerCopyWrite">&copy; ${currentYear} ReelCareer</p>
            </div>
        </footer>

        <div class="banner">
            <p>Discover more opportunities at <a href="https://reelcareer.co" target="_blank">ReelCareer.co</a></p>
        </div>


<div class="section flowers-section">
    <h2>Why wait for the world to notice your impact?</h2>
    <p>Celebrate your career and achievements today. Create your personalized obituary page and let people give you your flowers while you're still here!</p>
    <div class="button">
        <a href="https://reelcareer.co/obituaries/create">Create Your Career Obituary</a>
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
