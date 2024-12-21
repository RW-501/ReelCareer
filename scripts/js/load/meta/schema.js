function addBreadcrumbsSchema() {
    // Define the breadcrumb data
    const breadcrumbData = [
        { url: "/", name: "ReelCareer" },
        { url: "/views/about", name: "About ReelCareer" },
        { url: "/views/privacy", name: "Privacy Policy" },
        { url: "/views/terms", name: "Terms of Use" },
        { url: "/views/contact", name: "Contact Us" },
        { url: "/views/blogs", name: "Blogs" },
        { url: "/views/news", name: "News" },
        { url: "/views/faq", name: "FAQs" },
        { url: "/views/referral", name: "Affiliate Program" },
        { url: "/views/Personality-&-Trait-Tests", name: "Personality & Trait Tests" },
        { url: "/backend/dashboard", name: "Admin" },
        { url: "/jobs/city", name: "City Jobs" },
        { url: "/jobs/state", name: "State Jobs" },
        { url: "/jobs/locations", name: "Job Locations" },
        { url: "/job-listings", name: "Job Listings" },
        { url: "/bot", name: "Chat Bot" },
        { url: "/reels", name: "Video Reels" },
        { url: "/support", name: "Support" },
        { url: "/membership", name: "Membership" }
    ];

    // Map breadcrumb data to schema format
    const itemListElement = breadcrumbData.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.name,
        "item": `https://www.reelcareer.co${breadcrumb.url}`
    }));

    // Create the schema object
    const breadcrumbsSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
    };

    // Add schema to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbsSchema, null, 2);
    document.head.appendChild(script);
}

// Call the function to add the breadcrumbs schema
addBreadcrumbsSchema();
