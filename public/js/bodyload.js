/*
<link rel="prefetch" href="next-page.html">

        // Function to dynamically add a prefetch link
        function addPrefetchLink(href) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;

            // Append the prefetch link to the head of the document
            document.head.appendChild(prefetchLink);
        }

        // Call the function to prefetch the next page
        addPrefetchLink('next-page.html');


*/

//import { Collapse } from "bootstrap";

// Function to inject CSS styles into the document
        // Function to add styles
// Function to add styles for loader and content
// Function to add styles for loader and content


function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `

/* Loader Container */


/* Loader Container */
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999;
    opacity: 1;
   /* transition: opacity 0.5s ease-in-out; */
}

/* Animated Resume */
.resume {
    display: flex;
    flex-direction: row;
    width: 320px;
    height: 420px;
    background-color: #f4f4f4;
    position: relative;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.resume:hover {
    box-shadow: 0px 0px 13px 8px #3024f28a;
    }

/* Sidebar for Profile Picture and Personal Info */
.resume-sidebar {
    width: 30%;
    background-color: #007bff;
    padding: 10px;
    text-align: center;
    color: white;
}

/* Profile Picture at the top of the sidebar */
.profile-pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto 15px;
    border: 3px solid #ffffff;
}

/* Personal Information Section under profile picture */
.personal-info {
    font-size: 0.5rem;
    margin-top: 10px;
    text-align: left;
  

}

/* Main Resume Content */
.resume-main {
    width: 70%;
    padding: 15px;
    background-color: #ffffff;
    position: relative;
}

/* Header Section (Name or Title) */
.resume-header {
    position: absolute;
    top: 15px;
    left: 10px;
    right: 10px;
    height: 15px;
    background-color: #007bff;
    border-radius: 3px;
    animation: loadingText 1s infinite ease-in-out;
}

/* Line Sections (Representing Resume Content) */
.resume-line {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 8px;
    background-color: #d3d3d3;
    border-radius: 2px;
}

/* Reel Container */
.reel-container {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

/* Reel with 5 Holes and Center Hole */
.reel {
    width: 100px;
    height: 100px;
    border: 10px solid #007bff; /* Reel border */
    border-radius: 50%; /* Circular shape */
    background-color: #fff;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    animation: rotateReel 3s linear infinite;
}

/* Center Hole */
.reel::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background-color: #007bff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

/* 5 Holes Around the Reel */
.reel::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at 10px 10px, transparent 10px, #007bff 11px),
                radial-gradient(circle at 70px 10px, transparent 10px, #007bff 11px),
                radial-gradient(circle at 10px 70px, transparent 10px, #007bff 11px),
                radial-gradient(circle at 70px 70px, transparent 10px, #007bff 11px),
                radial-gradient(circle at 40px 40px, transparent 7px, #007bff 8px);
    transform: translate(-50%, -50%);
}

/* Rotate the reel */
@keyframes rotateReel {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}


/* Adjust line positions (move them down to make space for the reel) */
.l1 { top: 200px; animation: loadingText 1.2s infinite ease-in-out; }
.l2 { top: 220px; animation: loadingText 1.4s infinite ease-in-out; }
.l3 { top: 240px; animation: loadingText 1.6s infinite ease-in-out; }
.l4 { top: 260px; animation: loadingText 1.8s infinite ease-in-out; }
.l5 { top: 280px; animation: loadingText 2s infinite ease-in-out; }
.l6 { top: 300px; animation: loadingText 2.2s infinite ease-in-out; }
.l7 { top: 320px; animation: loadingText 2.4s infinite ease-in-out; }
.l8 { top: 340px; animation: loadingText 2.6s infinite ease-in-out; }


/* Footer Section (Represents Contact or Footer Info) */
.resume-footer {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height: 12px;
    background-color: #007bff;
    border-radius: 2px;
    animation: loadingText 2.8s infinite ease-in-out;
}

/* Loading Message Style */
.loading-message {
    color: #83bad9; /* Branding color */
    font-weight: 800;
    font-size: 2.0rem;
    text-shadow: -2px -1px 0px #007bff;
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin-top: 20px;
}

/* Animation for Lines (Simulating Typing) */
@keyframes loadingText {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

/* Fade out Loader */
.loader.hidden {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s 0.5s, opacity 0.5s;
}

/* Smooth content loading */
body {
    opacity: 0;
    display: none;
    transition: opacity .5s ease-in-out;
}

body.loaded {
    opacity: 1;
    display: block;
}




    `;
    document.head.appendChild(style);
}


// Function to create and inject loader with animated resume and dynamic dots
function createLoader(message = 'ReelCareer') {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loaderX';
    loaderDiv.classList.add('loader-container');
    loaderDiv.setAttribute('role', 'alert');
    loaderDiv.setAttribute('aria-live', 'assertive');
    loaderDiv.setAttribute('aria-busy', 'true');

    // Create animated resume container
    const resume = document.createElement('div');
    resume.classList.add('resume');
    resume.setAttribute("id","theOnlyResume");

    // Sidebar
    const sidebar = document.createElement('div');
    sidebar.classList.add('resume-sidebar');

    // Profile Picture
    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-pic');

    // Personal Info
    const personalInfo = document.createElement('div');
    personalInfo.classList.add('personal-info');
    personalInfo.innerHTML = `
        <strong>Ron W.</strong><hr>
        <strong>ReelCareer.co</strong><br>
        <strong>(469) 225-9929</strong>
    `;

    // Append profile picture and personal info to sidebar
    sidebar.appendChild(profilePic);
    sidebar.appendChild(personalInfo);

    // Main Resume Content
    const mainContent = document.createElement('div');
    mainContent.classList.add('resume-main');

    // Resume lines (simulating text)
    const lines = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8'].map(cls => {
        const line = document.createElement('div');
        line.classList.add('resume-line', cls);
        return line;
    });

    // Footer
    const footer = document.createElement('div');
    footer.classList.add('resume-footer');

// Video Reel Container
const reelContainer = document.createElement('div');
reelContainer.classList.add('reel-container');

// Reel (with perforations)
const reel = document.createElement('div');
reel.classList.add('reel');

// Reel center (for the hole in the middle of the reel)
const reelCenter = document.createElement('div');
reelCenter.classList.add('reel-center');

// Append reel center to the reel
reel.appendChild(reelCenter);

// Append reel to reel container
reelContainer.appendChild(reel);


// Append reel container to mainContent
mainContent.appendChild(reelContainer);

    // Append lines and footer to mainContent
    lines.forEach(line => mainContent.appendChild(line));
    mainContent.appendChild(footer);

    // Create dynamic loading message with dots
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('loading-message');
    statusDiv.setAttribute('role', 'status');
    statusDiv.textContent = message;

    // Append sidebar and mainContent to resume
    resume.appendChild(sidebar);
    resume.appendChild(mainContent);

    // Append resume and status message to loader div
    loaderDiv.appendChild(resume);
    loaderDiv.appendChild(statusDiv);

    // Add loader to the body
    document.body.appendChild(loaderDiv);
}
let pauseTime = false;
// Hide loader and fade in content
function hideLoader() {
    const loader = document.getElementById('loaderX');
    if (pauseTime === false) {
        setTimeout(() => {
            loader.classList.add('hidden');
            loader.remove();
        }, 3000);
    }
}


    addStyles(); // Add styles first
    createLoader(); // Then create the loader
    document.getElementById('theOnlyResume').addEventListener('click', () => {
       pauseTime = true;
    });

    document.getElementById('loaderX').addEventListener('click', () => {
        const loader = document.getElementById('loaderX');
                loader.classList.add('hide');
                loader.remove();
    });

// Hide loader when the window fully loads
window.addEventListener('load', () => {
    hideLoader(); // Hide loader first
    document.body.classList.add('loaded'); // Then show content
});





function addStyles2() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* Page Loader Styles */
/* Loader Styles for Lazy Images */
.lazy-load {
    display: block; /* Make sure the images are block elements */
    width: 100%; /* Make images responsive */
    height: auto; /* Maintain aspect ratio */
    opacity: 0; /* Start invisible for fade-in effect */
    transition: opacity 0.5s ease-in-out; /* Smooth transition for fade-in */
}

/* Fade-in effect after image loads */
.lazy-load.fade-in {
    opacity: 1; /* Fade in when loaded */
}

/* Skeleton Loading Styles for Cards */
.card.skeleton {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite; /* Skeleton animation */
    border-radius: 4px; /* Rounded corners */
    height: 200px; /* Placeholder height */
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

    `;
    document.head.appendChild(style);
}

addStyles2();


// Lazy Load for Images using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1 // Trigger lazy loading when 10% of the element is visible
    };

    // Image lazy load observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Set the image source
                img.onload = () => img.classList.add('fade-in'); // Add a fade-in effect once loaded
                img.removeAttribute('data-src'); // Remove data-src after loading
                observer.unobserve(img); // Stop observing after it's loaded
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Card lazy load observer (removes skeleton once loaded)
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.remove('skeleton'); // Remove skeleton loading effect
                observer.unobserve(card); // Stop observing after it's loaded
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Fallback for browsers that do not support Intersection Observer
    if (!('IntersectionObserver' in window)) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src; // Load images immediately
        });
    }
});





// Function to create a job card and append it to the container
function createJobCard(job, container) {
    // Create the job card
    const jobCard = document.createElement('div');
    jobCard.className = 'col-md-4 mb-4';
    jobCard.innerHTML = `
    <div class="card jobCard h-100 shadow-sm" style="
        border-radius: 12px; 
        overflow: hidden; 
        transition: transform 0.3s ease, box-shadow 0.3s ease;">
        
      <div class="card-body" style="
          padding: 20px;
          display: flex; 
          flex-direction: column; 
          justify-content: space-between;">
          
        <!-- Job Title and Company -->
        <div>
          <a href="${adjustLinkURL}job-detail.html?id=${job.id}" class="job-title-link" style="
              font-size: 20px; 
              font-weight: bold; 
              color: #007bff; 
              margin-bottom: 10px;">
            ${job.title}
          </a>
          <p class="card-text" style="
              font-size: 16px; 
              color: #333; 
              margin-bottom: 10px;">
            <strong>${job.company}</strong>
          </p>
        </div>
  
        <!-- Job Image with Lazy Load (optional) -->
        ${job.imageUrl ? `
          <div class="job-image-container mb-3">
            <img src="${job.imageUrl}" alt="${job.title}" class="img-fluid" loading="lazy" style="border-radius: 8px;">
          </div>` : ''}
  
        <!-- Location, Type, and Salary -->
        <div>
          <p class="card-text" style="
              font-size: 14px; 
              color: #666; 
              margin-bottom: 5px;">
            <i class="fas fa-map-marker-alt" style="color: #007bff;"></i> 
            ${formatLocation(job.location, { part: 'city' })}, ${formatLocation(job.location, { part: 'state' })}
          </p>
          <p class="card-text" style="
              font-size: 14px; 
              color: #666; 
              margin-bottom: 5px;">
            <strong>Type:</strong> ${formatJobType(job.type)}
          </p>
          <p class="card-text" style="
              font-size: 14px; 
              color: #666;">
            <strong>Salary:</strong> ${formatCurrency(job.salary, {decimals: 0})}
          </p>
        </div>
  
        <!-- View Details Button -->
        <a href="${adjustLinkURL}job-detail.html?id=${job.id}" class="btn btn-primary w-100 mt-3" style="
            padding: 12px 0; 
            background-color: #007bff; 
            border: none; 
            border-radius: 8px; 
            font-size: 16px; 
            transition: background-color 0.3s ease;
            text-transform: uppercase;">
          View Details
        </a>
      </div>
    </div>
    `;
  
    container.appendChild(jobCard);
  }
  







// Function to add sponsor section to the container
function createSponsoredJobCard(sponsors, container) {
    if (sponsors.length > 0) {
        const sponsorSection = document.createElement('div');
        sponsorSection.className = 'col-12 mt-4';
        sponsorSection.innerHTML = `
            <h5 class="text-center mb-4">Our Sponsors</h5>
            <div class="sponsorArea row">
                ${sponsors.map(sponsor => `
                    <div class="col-md-4">
                        <div class="card sponsorCard h-100 shadow-sm">
                            <img class="card-img-top" src="${sponsor.logoUrl || '/ReelCareer/images/favicons/android-chrome-512x512.png'}" alt="${sponsor.name}">
                            <div class="card-body">
                                <h6 class="card-title">${sponsor.name}</h6>
                                <h4 class="card-text">${sponsor.company}</h4>
                <p class="card-text"><strong>Salary:</strong> $${sponsor.salary}</p>
                <a href="views/job-detail.html?id=${sponsor.id}" class="btn btn-primary w-100 mt-3">Apply Now</a>                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(sponsorSection);
    }
}


function getUserDisplayName() {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        // Parse the stored data
        const userData = JSON.parse(storedUserData);
        
        // Return the displayName if it exists
        return userData.displayName || 'No display name available'; // Fallback if displayName is not set
    } else {
        console.log('No user data found in local storage');
        return 'No user data available'; // Fallback if no user data exists
    }
}

// Example usage
const userDisplayName = getUserDisplayName();
console.log("User Display Name:", userDisplayName);
