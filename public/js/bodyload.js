/*
<link rel="prefetch" href="next-page">

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

function scrollToDivOnLoad(divId = null) {
  // Ensure the page loads at the top by default
  window.scrollTo({ top: 0, behavior: "auto" });

  // If divId parameter is provided, scroll to that element
  if (divId) {
      // Wait for the document to load completely
      document.addEventListener("DOMContentLoaded", function () {
          const targetDiv = document.getElementById(divId);
          if (targetDiv) {
              // Smooth scroll to the target element
              targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
              console.warn(`Element with ID "${divId}" not found.`);
          }
      });
  }
}

// Usage example:
// Default load at the top
scrollToDivOnLoad();

/*
// Extract `divId` from URL if available
const urlParams = new URLSearchParams(window.location.search);
const divId = urlParams.get("scrollTo");

// Pass the extracted divId to the function
scrollToDivOnLoad(divId);
*/

// Scroll to a specific div if ID is provided, for example "targetDivId"
//scrollToDivOnLoad("targetDivId");

// Function to create and inject loader with text logo and animation
function createLoader(message = "ReelCareer") {
  const loaderDiv = document.createElement("div");
  loaderDiv.id = "loaderX";
  loaderDiv.classList.add("loader-container");
  loaderDiv.setAttribute("role", "alert");
  loaderDiv.setAttribute("aria-live", "assertive");
  loaderDiv.setAttribute("aria-busy", "true");

  // Create animated text logo
  const logo = document.createElement("div");
  logo.classList.add("text-logo");
  logo.innerText = message;

  // Append the logo to the loader
  loaderDiv.appendChild(logo);

  // Append loader to body
  document.body.appendChild(loaderDiv);
}

// Inject the styles for loader and text logo
function addStyles() {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    /* Loader Container */
    .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f4f4f4;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    /* Fading Text Logo */
    .text-logo {
        font-family: 'Arial', sans-serif;
        font-size: 2.5rem;
        font-weight: bold;
        color: #007bff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        animation: fadeLogo 2s infinite alternate;
    }

    /* Fading animation */
    @keyframes fadeLogo {
        0% { opacity: 1; }
        100% { opacity: 0.5; }
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

// Call the functions to initialize the loader
addStyles();
createLoader("ReelCareer");

  let pauseTime = false;
  
  let loaderTimer = 700;
 // console.log(" createLoader();   ");

  function setLoaderTimer(loaderTimer) {
    setTimeout(() => {
      hideLoader(); // Hide loader first
      pauseTime = false;
    }, loaderTimer);

    function hideLoader() {
     // console.log("pauseTime   ", pauseTime);
      if (pauseTime === false) {
        const loader = document.getElementById("loaderX");
        loader.classList.add("hidden");
        loader.remove();
       // console.log(" loader.remove();   ");

      }
      }
  }
  
  function showLoader(timer = 700) {
    pauseTime = false;
    createLoader(); 
    setLoaderTimer(timer);
  }

  // Hide loader when the window fully loads
  window.addEventListener("load", () => {
    document.body.classList.add("loaded"); // Then show content
  setLoaderTimer(500);
  });


 











  

  function addStyles2() {
    const style = document.createElement("style");
    style.type = "text/css";
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
  



.gridBody{
   grid-gap: .05rem !important;
         display: grid  !important;

}

  /* Flexbox Layout Spacing */
  .card-top, .card-bottom {
      display: grid  !important;
    width: auto;
    column-gap: .5rem !important;
    -webkit-text-stroke: thin;
    grid-row: auto;
    grid-area: auto;
    grid-gap: .05rem !important;
  }

  /* Job Details Section Background and Shadow */
  .card-bottom {
      background: linear-gradient(145deg, var(--highlight-bg), #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      padding: 10px 25px;
      border-radius: 5px;
      border-style: solid;
      border-color: var(--highlight-bg);
  }









      `;
    document.head.appendChild(style);
  }
  
  addStyles2();
  
  // Lazy Load for Images using Intersection Observer
  document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-load");
    const cards = document.querySelectorAll(".card");
  
    const observerOptions = {
      threshold: 0.1 // Trigger lazy loading when 10% of the element is visible
    };
  
    // Image lazy load observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src; // Set the image source
          img.onload = () => img.classList.add("fade-in"); // Add a fade-in effect once loaded
          img.removeAttribute("data-src"); // Remove data-src after loading
          observer.unobserve(img); // Stop observing after it's loaded
        }
      });
    }, observerOptions);
  
    lazyImages.forEach((image) => {
      imageObserver.observe(image);
    });
  
    // Card lazy load observer (removes skeleton once loaded)
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.remove("skeleton"); // Remove skeleton loading effect
          observer.unobserve(card); // Stop observing after it's loaded
        }
      });
    }, observerOptions);
  
    cards.forEach((card) => {
      cardObserver.observe(card);
    });
  
    // Fallback for browsers that do not support Intersection Observer
    if (!("IntersectionObserver" in window)) {
      lazyImages.forEach((img) => {
        img.src = img.dataset.src; // Load images immediately
      });
    }
  });
  












  // Function to create a job card and append it to the container
  function createJobCard(job, container) {
    // Create the job card
    const jobCard = document.createElement("div");
    jobCard.id = `job_Card_${job.id}`;
    jobCard.className = "JOB_CARD  mb-4 noCopy";
    // Adding data attributes for search purposes
    jobCard.dataset.title = job.title ? job.title.toLowerCase() : '';
    jobCard.dataset.company = job.company ? job.company.toLowerCase() : '';
    jobCard.dataset.location = Array.isArray(job.location) 
        ? job.location.join(', ').toLowerCase() 
        : (job.location ? job.location.toLowerCase() : '');
    jobCard.dataset.salary = job.salary && job.salary !== 0 ? job.salary : '$0.00';
    jobCard.dataset.jobType = normalizeJobType(job.type); // Normalize job type if applicable
    jobCard.dataset.city = job.city ? job.city.toLowerCase() : '';
    jobCard.dataset.state = job.state ? job.state.toLowerCase() : '';
    jobCard.dataset.zipCode = job.zipCode ? job.zipCode.toString() : '';
    jobCard.dataset.industry = job.industry ? job.industry.toLowerCase() : '';
    jobCard.dataset.immediateHire = job.immediateHire !== undefined ? job.immediateHire.toString() : '';
    jobCard.dataset.contractToHire = job.contractToHire !== undefined ? job.contractToHire.toString() : '';
    jobCard.dataset.country = job.country ? job.country.toLowerCase() : '';
    jobCard.dataset.county = job.county ? job.county.toLowerCase() : '';
    jobCard.dataset.status = job.status ? job.status.toLowerCase() : '';
    jobCard.dataset.searchableTitle  = Array.isArray(job.searchableTitle) 
    ? job.searchableTitle.join(', ').toLowerCase() 
    : (job.searchableTitle ? job.searchableTitle.toLowerCase() : '');
    jobCard.dataset.source = job.source ? job.source.toLowerCase() : '';
    
    // Salary min/max datasets
    jobCard.dataset.salaryMin = job.salaryMin ? job.salaryMin : '';
    jobCard.dataset.salaryMax = job.salaryMax ? job.salaryMax : '';
    

    // Benefits, requirements, and tags datasets (arrays converted to strings for filtering)
    jobCard.dataset.benefits = job.benefits ? job.benefits.join(', ').toLowerCase() : '';
    jobCard.dataset.requirements = Array.isArray(job.requirements) 
        ? job.requirements.join(', ').toLowerCase() 
        : (job.requirements ? job.requirements.toLowerCase() : '');
    jobCard.dataset.tags = job.tags ? job.tags.join(', ').toLowerCase() : '';
    
    // Additional metadata
    jobCard.dataset.submittedBy = job.submittedBy ? job.submittedBy.toLowerCase() : '';
    
    jobCard.innerHTML = `
    <div class="card jobCard gridBody h-100 shadow-sm" >
      
      <!-- Job Title and Company -->
      <div class="card-top" >
        <a href="https://reelcareer.co/views/job-details?id=${job.id}"
           class="job-title-link" 
          >
          ${job.title}
        </a>
        <p class="company-card-text-area" >
            <i class="fas fa-building" style="color: #007bff;"></i>
            <strong>${job.company}</strong>
        </p>
      </div>
  
      <!-- Job Image with Lazy Load (optional) -->
      ${
        job.imageUrl
          ? `
        <div class="job-image-container mb-3" style="margin-bottom: 15px;">
          <img src="${job.imageUrl}" alt="${job.title}" class="img-fluid" loading="lazy" style="border-radius: 8px; width: 100%; height: auto;">
        </div>`
          : ""
      }
  
      <!-- Location, Type, and Salary -->
      <div class="card-bottom" >
        
        <p class="location-text-area c-text">
          <i class="fas fa-map-marker-alt" style="color: #007bff;"></i> 
          ${formatLocation(job.location)}
        </p>
        
        <p class="job-type-text-area c-text">
          <strong>Type:</strong>
           ${formatJobType(job.type)}
        </p>
        
        <p class="salary-text-area c-text">
          <strong>Salary:</strong>
          ${formatCurrency(job.salary, { decimals: 0 })}
          <span class="salary-text">${job.salaryPayTime || ""}</span>
        </p>

        <p class="source-text-area c-text">
          <small>Source:</small>
            <small>${job.source}</small>

        </p>

      </div>
  
      <!-- View Details Button -->
      <a href="https://reelcareer.co/views/job-details?id=${job.id}" 
         class="card-CTA-Btn" 
         aria-label="View job details for ${job.title}">
        View Details
      </a>
    </div>
  `;
  
      
      jobCard.style.opacity = '0';
 
      // Delay function to set the opacity after a specified time
setTimeout(() => {
  jobCard.style.opacity = '1';
}, 700); // Delay in milliseconds (2000 ms = 2 seconds)
    
    container.appendChild(jobCard);
}

 // Toast Notification Function
function showToast(message, type = 'info', duration = 3000) {
   
  // Create a div for the toast
  const toast = document.createElement('div');
  
  // Set inline styles for the toast
  toast.style.position = 'fixed';
  toast.style.bottom = '20px'; // Position from the bottom
  toast.style.left = '50%'; // Center horizontally
  toast.style.transform = 'translateX(-50%)'; // Centering
  toast.style.padding = '15px 20px'; // Padding for the toast
  toast.style.borderRadius = '5px'; // Rounded corners
  toast.style.color = 'white'; // Text color
  toast.style.fontSize = '16px'; // Font size
  toast.style.zIndex = '9999'; // Ensure it appears above other elements
  toast.style.transition = 'opacity 0.5s ease'; // Fade transition
  
  // Set background color based on toast type
  switch (type) {
      case 'success':
          toast.style.backgroundColor = '#4CAF50'; // Green for success
          break;
      case 'error':
          toast.style.backgroundColor = '#F44336'; // Red for error
          break;
      case 'info':
          toast.style.backgroundColor = '#2196F3'; // Blue for info
          break;
      case 'warning':
          toast.style.backgroundColor = '#FF9800'; // Orange for warning
          break;
      default:
          toast.style.backgroundColor = '#2196F3'; // Default to info
  }

 

  toast.className = `toast toast-${type}`; // Add classes for styling
  toast.innerText = message; // Set the message text



  // Append the toast to the body
  document.getElementById('main-content').appendChild(toast);

  // Set a timer to remove the toast after the specified duration
  setTimeout(() => {
      toast.classList.add('fade-out'); // Add fade-out effect
      setTimeout(() => {
          document.body.removeChild(toast); // Remove toast from DOM
      }, 500); // Time to wait for fade-out animation
  }, duration);
}

// Example usage: Replace alerts with showToast
// showToast('This is a success message!', 'success');
// showToast('This is an error message!', 'error');
// showToast('This is an info message!', 'info');
// showToast('This is a warning message!', 'warning');


/**
 * Function to show a "Saved" message and fade the button out after a specified delay
 * @param {string} buttonId - The ID of the button element to update and hide
 * @param {string} message - The message to display on the button
 * @param {number} [delay=1000] - The delay (in milliseconds) before the fade effect starts (default is 1000ms)
 */
function showMessageAndFadeBtn(buttonId, message, delay = 1000) {
  const btn = document.getElementById(buttonId);

  if (!btn) {
    console.error("Button with the specified ID not found.");
    return;
  }

  // Set the text of the button to the provided message
  btn.innerText = message;

  // Apply delay before starting the fade-out effect
  setTimeout(function() {
    btn.style.transition = "opacity 1s"; // Apply smooth fade transition
    btn.style.opacity = 0; // Fade the button out

    // After the fade-out, hide the button completely
    setTimeout(function() {
      btn.style.display = "none";
    }, 1000); // Wait for the fade-out effect to complete before hiding the button
  }, delay); // Delay before starting the fade effect
}

window.showMessageAndFadeBtn = showMessageAndFadeBtn;