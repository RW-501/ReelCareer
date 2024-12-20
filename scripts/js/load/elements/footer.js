

  
  
// Update the footer function (No changes needed for this part)
function updateFooter() {
    const footer = document.getElementById("dynamic-footer");
    const currentYear = new Date().getFullYear();
  
    // Footer links data (from JSON)
    const footerLinks = [
      {
        "url": "/",
        "name": "ReelCareer",
        "title": "ReelCareer - #1 Job Board - Find a job today",
        "category": "General",
        "order": 0
      },{
        "url": "/views/about",
        "name": "About ReelCareer",
        "title": "About ReelCareer - Who We Are and Our Mission",
        "category": "General",
        "order": 1
      },
      {
        "url": "/views/privacy",
        "name": "Privacy Policy",
        "title": "Privacy Policy - How We Protect Your Data",
        "category": "Legal",
        "order": 2
      },
      {
        "url": "/views/terms",
        "name": "Terms of Use",
        "title": "Terms of Use - Website User Agreement and Guidelines",
        "category": "Legal",
        "order": 3
      },
      {
        "url": "/views/contact",
        "name": "Contact Us",
        "title": "Contact ReelCareer - Get in Touch for Support and Inquiries",
        "category": "General",
        "order": 4
      },
      {
        "url": "/views/blogs",
        "name": "Blogs",
        "title": "ReelCareer Blog - Career Advice, News, and Insights",
        "category": "Content",
        "order": 5
      },
      {
        "url": "/views/news",
        "name": "News",
        "title": "ReelCareer News - Latest Updates and Industry Trends",
        "category": "Content",
        "order": 6
      },
      {
        "url": "/views/faq",
        "name": "FAQs",
        "title": "Frequently Asked Questions - Get Answers to Common Queries",
        "category": "Support",
        "order": 7
      },
      {
        "url": "/views/referral",
        "name": "Affiliate Program",
        "title": "Join the ReelCareer Affiliate Program and Earn Rewards",
        "category": "Marketing",
        "order": 8
      },
      {
        "url": "/views/Personality-&-Trait-Tests",
        "name": "Personality & Trait Tests",
        "title": "Personality & Trait Tests - Discover Your Strengths and Work Style",
        "category": "Content",
        "order": 9
      },
      {
        "url": "/backend/dashboard",
        "name": "Admin",
        "title": "Admin Dashboard - Manage Users, Jobs, and Content",
        "category": "Admin",
        "order": 10
      },
      {
        "url": "/jobs/city",
        "name": "City Jobs",
        "title": "City Jobs - Find Career Opportunities by Location",
        "category": "Features",
        "order": 11
      },
      {
        "url": "/jobs/state",
        "name": "State Jobs",
        "title": "State Jobs - Explore Job Listings by State",
        "category": "Features",
        "order": 12
      },
      {
        "url": "/jobs/locations",
        "name": "Job Locations",
        "title": "Job Locations - Browse Jobs in Your Area",
        "category": "Features",
        "order": 13
      },
      {
        "url": "/job-listings",
        "name": "Job Listings",
        "title": "Job Listings - Search and Apply for Job Openings",
        "category": "General",
        "order": 14
      },
          {
            "url": "/bot",
            "name": "Chat Bot",
            "title": "Chat Bot - Get Instant Assistance with Your Job Search",
            "category": "Support",
            "order": 15
          },
          {
            "url": "/reels",
            "name": "Video Reels",
            "title": "Video Reels - Showcase Your Resume with a Personal Touch",
            "category": "Content",
            "order": 16
          },
          {
            "url": "/support",
            "name": "Support",
            "title": "Support - Get Help with Your Job Search and Account",
            "category": "Support",
            "order": 17
          },
          {
            "url": "/membership",
            "name": "Membership",
            "title": "Membership - Unlock Premium Features and Job Opportunities",
            "category": "General",
            "order": 18
          }
        
        
    ];
    
    // Sort the links based on their order
    footerLinks.sort((a, b) => a.order - b.order);
  
  
  
  
  
    const config = {
      newsletter: {
        rateLimitTime: 60000, // Example: 60 seconds
        maxAttempts: 3,
        storageKey: "newsletter_hasSignedUp",
        messages: {
          alreadySubscribed: "You have already subscribed to the newsletter.",
          tooManyAttempts: "Too many attempts. Please try again later.",
          success: email => `Thank you for subscribing, ${email}!`,
          error: "Error: Unable to subscribe. Please try again."
        }
      },
      footer: {
        currentYear: new Date().getFullYear(),
  
  
      },
      companyMedia: {
        title: "ReelCareer Media",
        titleStyle: "color: #83bad9; font-weight: 800; text-shadow: 1px 0px 0px #6253e7;",
        video: {
          source: "https://reelcareer.co/images/intro.MP4",
          type: "video/mp4"
        },
        image: {
          src: "https://reelcareer.co/images/sq_logo_n_BG_tie_reelx.png",
          alt: "ReelCareer.co  Image",
          style: "width: 15rem;"
        }
      }
    };
    
    
    
  
  
      // Group links by category
      const groupedLinks = footerLinks.reduce((acc, link) => {
        if (!acc[link.category]) acc[link.category] = [];
        acc[link.category].push(link);
        return acc;
    }, {});
  
  
    // Render dynamic footer links
    function renderFooterLinks() {
      const { currentYear, links } = config.footer;
      const uploadDate = new Date().toISOString();
  
      const footerHTML = `
        <footer>
          <div class="footerMainContainer text-center">
            <p class="footerSocialMedia" ></p>
            <nav class='footerNavContainer'>
              ${Object.keys(groupedLinks).map(category => `
                <div class='footerNavItems'>
                  <h5>${category}</h5>
                  ${groupedLinks[category].map(link => `<a href="${link.url}" title="${link.title}">${link.name}</a>`).join("")}
                </div>`).join("\n")}
            </nav>
                      <p class="footerCopyWrite" >&copy; ${currentYear} ReelCareer</p>
  
          </div>
  <button id="backToTop" title="Go to top">↑</button>
  
        </footer>`;
        const footer = document.getElementById('dynamic-footer');
  
      footer.insertAdjacentHTML("beforeend", footerHTML);
    }
    
    // Render company media
    function renderCompanyMedia() {
      const { title, titleStyle, video, image } = config.companyMedia;
      const uploadDate = new Date().toISOString();
  
      const mediaHTML = `
        <section id="companyMedia" class="bg-light py-5 company-media">
          <div class="container">
            <h2 class="text-center" style="${titleStyle}">${title}</h2>
            <div class="footerMediaArea text-center">
              <div class="col-md-6 m-auto">
                <div class="footerVideoContainer">
                  <video  class="footerVideo"  loop autoplay muted loading="lazy">
                    <source src="${video.source}" type="${video.type}">
                    Your browser does not support the video tag.
                  </video>
                  ${`<script type="application/ld+json">
                    {
                      "@context": "https://schema.org",
                      "@type": "VideoObject",
                      "name": "Intro Video",
                      "description": "Introduction to ReelCareer",
                      "thumbnailUrl": "${image.src}",
                      "uploadDate": "${uploadDate} , 
                      "contentUrl": "${video.source}",
                      "embedUrl": "${video.source}",
                      "encodingFormat": "video/mp4",
                       "duration": "PT2M30S"
                    }
                    </script>
                    `}
                    <a href="${video.source}"style="
      display: block;
  ">Watch our latest video</a>
  
                </div>
              </div>
              <div class="col-md-6 m-auto">
              <a href="${image.src}">
  <img loading="lazy" src="${image.src}" alt="${image.alt}" class="img-fluid" style="${image.style}">
            </a>
  </div>
            </div>
          </div>
        </section>`;
      document.body.insertAdjacentHTML("beforeend", mediaHTML);
    }
    
   
    
  
    // Render dynamic content
    renderFooterLinks();
    renderCompanyMedia();
  
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    // Update the event listener for the newsletter form
    const newsletterFormBtn = document.getElementById("newsletterFormBtn");
    if (newsletterFormBtn) {
      newsletterFormBtn.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
  
        if (!document.getElementById("dataPrivacy")?.checked) {
          showToast("You must agree to the data privacy policy.", 'warning');
          return;
        }
  
        await handleNewsletterSignup(email);
      });
    }
  
  
  
  }
  
  // Call the function to update the footer when the document is loaded
  document.addEventListener("DOMContentLoaded", updateFooter);
  
  
  