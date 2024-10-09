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

// Function to inject CSS styles into the document
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* General Styles */

 /* Page Loader Styles */
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }

        .loader.hidden {
            opacity: 0;
            visibility: hidden;
        }

        /* Smooth content loading */
        .content {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }

        .content.loaded {
            opacity: 1;
        }

        /* Skeleton card loader */
        .card.skeleton {
            background-color: #ddd;
            animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }

        /* Card styling */
        .card {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
        }
    `;
    document.head.appendChild(style);
}




 // Function to create and inject loader into DOM
 function createLoader() {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loader';
    loaderDiv.classList.add('loader');
    loaderDiv.setAttribute('aria-live', 'polite');
    loaderDiv.setAttribute('aria-busy', 'true');

    const statusDiv = document.createElement('div');
    statusDiv.setAttribute('role', 'status');
    statusDiv.setAttribute('aria-label', 'Page is loading');
    statusDiv.textContent = 'Loading...';

    loaderDiv.appendChild(statusDiv);

    // Insert loader into the body
    document.body.appendChild(loaderDiv);
}

// Function to remove loader after page load
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500); // Remove from DOM after transition
    }
}

// Run the loader creation function on page load
window.addEventListener('DOMContentLoaded', createLoader);

// Hide the loader when the window fully loads
window.addEventListener('load', hideLoader);


  // Loader and Smooth Content Transition
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const content = document.querySelector('body');

    // Hide loader and show content with smooth transition
    loader.classList.add('hidden');
    content.classList.add('loaded');
});

// Lazy Load for Images using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1 // Trigger lazy loading when 10% of element is visible
    };

    // Image lazy load observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
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
                card.classList.remove('skeleton');
                observer.unobserve(card); // Stop observing after it's loaded
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Loader timeout for slow network
setTimeout(() => {
    const loader = document.getElementById("loader");
    if (!document.body.classList.contains('loaded')) {
        loader.innerHTML = "Still loading, please wait...";
    }
}, 3000); // 3 seconds delay for timeout message









// Navagtion bar
document.addEventListener("DOMContentLoaded", function () {

    // Function to create the navbar
    function createNavbar() {
        const navbarClass = (isHomePage) ?   'navbar-light bg-light' : 'navbar-dark bg-primary ';


        
        return `
            <nav class="navbar navbar-expand-lg ${navbarClass}  shadow-sm sticky-top" role="navigation">
                <div class="container">
                    <a class="navbar-brand" href="${adjustLinkHomeURL}index">ReelCareer</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}job-listings">Job Listings</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}about">About Us</a></li>
                            <li class="nav-item" id="jobSeekerNavItem"><a class="nav-link" href="${adjustLinkURL}job-seeker">Job Seeker</a></li>
                            <li class="nav-item" id="recruiterNavItem"><a class="nav-link" href="${adjustLinkURL}recruiter-dashboard">Recruiter Dashboard</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkHomeURL}views/blog">Blog</a></li>
                            <li class="nav-item"><a class="nav-link" href="${adjustLinkURL}membership">Membership</a></li>
                            <li class="nav-item">
                                <div id="authSection" class="d-flex align-items-center"></div>
                            </li>
                            <li class="nav-item" style="display: none !important">
                                <button id="darkModeToggle" class="btn btn-outline-secondary ml-3" style="display: none !important">Dark Mode</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }

    // Replace the navbar if not on an excluded page
    if (!excludedPages.includes(currentPage)) {
        let existingNavbar = document.querySelector('.navbar');
        
        // If an existing navbar is found, replace it
        if (existingNavbar) {
            existingNavbar.outerHTML = createNavbar();
        } else {
            // If no existing navbar, append it to the body
            document.body.insertAdjacentHTML('afterbegin', createNavbar());
        }

        setupEventListeners(); // Initialize event listeners
        highlightActiveLink(); // Highlight the active link

    }

   
   
   
   
    // Additional content (e.g., company media section) can be included below
    const companyMediaSectionHTML = `
        <section id="companyMedia" class="py-5 company-media">
            <div class="container">
                <h2 class="text-center">Company Media</h2>
                <div class="row" style=" text-align-last: center;">
                    <div class="col-md-6 m-auto">
                        <video controls>
                            <source src="${adjustLinkHomeURL}media/company-video.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="col-md-6 m-auto">
                        <img src="${adjustLinkHomeURL}images/sq_logo_n_BG_tie_reel.png" alt="Company Image" class="img-fluid" style="width: 15rem";>
                    </div>
                </div>
            </div>
        </section>
    `;
    document.body.insertAdjacentHTML('beforeend', companyMediaSectionHTML);
});

// btn-primary
// Function to highlight active links in the navbar
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active'); // Add the active class to the current page link
        } else {
            link.classList.remove('active'); // Remove it from others
        }
    });
}

// Function to update navigation visibility based on user role
function updateNavVisibility(user) {
    const jobSeekerNavItem = document.getElementById("jobSeekerNavItem");
    const recruiterNavItem = document.getElementById("recruiterNavItem");

    if (user) {
        // Display items based on user roles
        jobSeekerNavItem.style.display = user.role === 'jobSeeker' ? 'block' : 'none';
        recruiterNavItem.style.display = user.role === 'recruiter' ? 'block' : 'none';
    } else {
        // Hide both items if not logged in
        jobSeekerNavItem.style.display = 'none';
        recruiterNavItem.style.display = 'none';
    }
}

// Function to handle keyboard navigation for dropdown
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const target = document.activeElement;
        if (target.classList.contains('dropdown-toggle')) {
            target.click();
        }
    }
});












// The Footer <footer id="dynamic-footer"></footer>


// Newsletter Signup Functionality
async function handleNewsletterSignup(email) {
    const ipAddress = await getUserIP();
    const location = await getUserLocation();

    // Check if user has already signed up
    if (localStorage.getItem('hasSignedUp')) {
        alert("You have already subscribed to the newsletter.");
        return;
    }

    // Rate Limiting Check
    const currentTime = new Date().getTime();
    if (!firstAttemptTime || currentTime - firstAttemptTime > RATE_LIMIT_TIME) {
        // Reset attempts after the time limit
        attempts = 0;
        firstAttemptTime = currentTime;
    }

    if (attempts >= MAX_ATTEMPTS) {
        alert("You have exceeded the maximum number of signup attempts. Please try again later.");
        return;
    }

    attempts++; // Increment the attempt count

    try {
        // Add a new document to the NewsLetter collection
        await db.collection('NewsLetter').add({
            email: email,
            ipAddress: ipAddress,
            location: location,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Store sign-up status in local storage
        localStorage.setItem('hasSignedUp', 'true');

        const newsletterMessage = document.getElementById('newsletterMessage');
        newsletterMessage.innerText = `Thank you for subscribing, ${email}!`;
    } catch (error) {
        const newsletterMessage = document.getElementById('newsletterMessage');
        newsletterMessage.innerText = `Error: Unable to subscribe. Please try again later.`;
        console.error("Error adding document: ", error);
    }
}
















// Update the footer function (No changes needed for this part)
function updateFooter() { 
    const footer = document.getElementById('dynamic-footer');
    const currentYear = new Date().getFullYear();
    
  
    const newContent = `
        <div class="bg-dark text-light py-4">
            <div class="container text-center">
                <p>&copy; ${currentYear} <a href="${adjustLinkURL}about" class="text-light" rel="noopener noreferrer">ReelCareer</a>. All Rights Reserved.</p>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="${adjustLinkURL}public/privacy" class="text-light" rel="noopener noreferrer">Privacy Policy</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}public/terms" class="text-light" rel="noopener noreferrer">Terms of Use</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}contact" class="text-light" rel="noopener noreferrer">Contact Us</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}blog" class="text-light" rel="noopener noreferrer">Blog</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}news" class="text-light" rel="noopener noreferrer">News</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}faq" class="text-light" rel="noopener noreferrer">FAQs</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkURL}referral" class="text-light" rel="noopener noreferrer">Affiliate Program</a></li>
                    <li class="list-inline-item"><a href="${adjustLinkHomeURL}backend/dashboard" class="text-light" rel="noopener noreferrer">Admin</a></li>
                </ul>
                <div class="newsletter-signup">
                    <form id="newsletterForm" class="form-inline justify-content-center mt-4">
                        <input type="email" class=" mr-2 mb-2" placeholder="Subscribe to our newsletter" required aria-label="Email address">
                        <select id="newsletterType" class=" mr-2 mb-2"  required>
                            <option value="website_updates">Website Updates</option>
                            <option value="job_alerts">Job Alerts</option>
                            <option value="career_advice">Career Advice</option>
                            <option value="industry_news">Industry News</option>
                        </select>
                        <label  class="ml-2 mr-2 mb-2">
                            <input type="checkbox" id="dataPrivacy" required>
                            I agree to the   <a href="${adjustLinkHomeURL}public/privacy" class="text-light ml-1" rel="noopener noreferrer"> data privacy policy</a>.
                        </label>
                        <button type="submit" id="newsletterFormBtn"  class=" mr-2 mb-2 btn btn-outline-light">Subscribe</button>
                    </form>
                    <p id="newsletterMessage" class="text-light mt-2"></p>
                </div>
                <p class="mt-2">Current Date & Time: <span id="currentDateTime"></span></p>
                <p class="mt-2">Contact Us: <a href="mailto:info@reelcareer.com" class="text-light" rel="noopener noreferrer">info@reelcareer.com</a></p>
                <button id="backToTop" class="btn btn-outline-light mt-2">Back to Top</button>
            </div>
        </div>
    `;
    
    footer.innerHTML = newContent; // Update the footer's HTML content

    // Current Date and Time
    const updateDateTime = () => {
        const now = new Date();
        document.getElementById('currentDateTime').innerText = now.toLocaleString();
    };
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Back to Top Button Functionality
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // Update the event listener for the form
document.getElementById('newsletterFormBtn').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Check if user agreed to the data privacy policy
    if (!document.getElementById('dataPrivacy').checked) {
        alert("You must agree to the data privacy policy.");
        return;
    }

    // Handle the newsletter signup process
    await handleNewsletterSignup(email);
});

}

// Call the function to update the footer when the document is loaded
document.addEventListener('DOMContentLoaded', updateFooter);




function formatSalary(input) {
    // Remove any non-numeric characters except for commas and dollar sign
    let value = input.value.replace(/[^0-9,]/g, '');

    // Remove any commas for easier processing
    value = value.replace(/,/g, '');

    // Ensure the input is valid: it should only be numeric
    if (!/^\d*$/.test(value)) {
        value = ''; // Reset to empty if invalid input
    }

    // Format the number with commas
    if (value) {
        value = Number(value).toLocaleString();
    }

    // Set the formatted value back to the input with a dollar sign
    input.value = value ? `$${value}` : '';
}
function restrictKeys(event) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Escape'];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
}


let jobSuggestions, jobRequirementsSuggestions, locationsSuggestions, citySuggestions, stateSuggestions;

fetch(adjustLinkHomeURL + "public/js/suggestions.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();  // Parse the JSON response
    })
    .then(data => {
        // Assign the fetched data to your variables
        jobSuggestions = data.suggestions;
        jobRequirementsSuggestions = data.jobRequirementsSuggestions;
        locationsSuggestions = data.locationsSuggestions;
        citySuggestions = data.citySuggestions;
        stateSuggestions = data.stateSuggestions;

      /*  console.log("Job Suggestions:", jobSuggestions);
        console.log("Job Requirements Suggestions:", jobRequirementsSuggestions);
        console.log("Locations Suggestions:", locationsSuggestions);
        console.log("City Suggestions:", citySuggestions);
        console.log("State Suggestions:", stateSuggestions); */
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function autoSuggest(input, suggestionsArray) {
const inputValue = input.value ? input.value.toLowerCase().trim() : ''; // Ensure input is defined and trim any extra spaces
console.log('Input Value:', inputValue); // Log the current input value

let suggestion = '';

// Split the input by spaces and get the last part
const lastWord = inputValue.split(' ').pop(); // Get the last part of the input after the most recent space

// Find the first suggestion that starts with the last word
for (let i = 0; i < suggestionsArray.length; i++) {
    if (suggestionsArray[i].toLowerCase().startsWith(lastWord)) {
        suggestion = suggestionsArray[i];
        console.log('Suggestion Found:', suggestion); // Log the found suggestion
        break;
    }
}

    if (suggestion && inputValue !== '') {
        // If a suggestion is found and input isn't empty
        input.setAttribute('data-suggestion', suggestion); // Set a custom data attribute for handling auto-suggestion

        input.value = suggestion; // Temporarily set the input value to the suggestion
        input.selectionStart = inputValue.length; // Set the selection start after the typed characters
        input.selectionEnd = suggestion.length; // Set the selection end to the suggestion length
        console.log('Input Updated to Suggestion:', input.value); // Log the updated input value
    } else {
        console.log('No suggestion available.'); // Log when no suggestion is found
        if (input.getAttribute('data-suggestion')) {
            input.removeAttribute('data-suggestion'); // Clear it if no suggestions
        }
            }
}

document.addEventListener('DOMContentLoaded', function() {
    const keywordInputs = document.getElementsByClassName('keywordInput'); // Get all elements with 'keywordInput' class

    // Loop through all keywordInput elements
    Array.from(keywordInputs).forEach(function(input) {
        input.addEventListener('input', function(e) {
            // Check for backspace input type to avoid suggesting during deletion
            if (e.inputType !== 'deleteContentBackward') {
                let suggestionsArray;

                // Detect input type and assign the corresponding suggestions array
                if (this.classList.contains('job-input')) {
                    suggestionsArray = jobSuggestions;
                } else if (this.classList.contains('location-input')) {
                    suggestionsArray = locationsSuggestions;
                } else if (this.classList.contains('city-input')) {
                    suggestionsArray = citySuggestions;
                } else if (this.classList.contains('state-input')) {
                    suggestionsArray = stateSuggestions;
                } else {
                    suggestionsArray = jobRequirementsSuggestions; // Default to job requirements if no specific input is matched
                }

                if (suggestionsArray) {
                    autoSuggest(this, suggestionsArray); // Use suggestions array here
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            const suggestion = this.getAttribute('data-suggestion');
            const inputValue = this.value ? this.value.toLowerCase() : ''; // Check if this.value is defined

            // Allow Backspace, Delete, and other keys to function normally
            if (e.key === 'Tab' || e.key === 'Enter') {
                // Prevent default only for Tab and Enter keys
                e.preventDefault();
                if (suggestion && suggestion.toLowerCase().startsWith(inputValue)) {
                    this.value = suggestion;
                    this.setSelectionRange(suggestion.length, suggestion.length); // Move cursor to the end of the suggestion
                }
            }
        });
    });
});
    








    // Function to add selected job requirement
    function addJobRequirement(input, suggestion) {
        const selectedContainer = document.getElementById('selectedRequirements'); // Container for selected requirements
        const currentValues = input.value.split(',').map(item => item.trim()); // Get current values as an array
    
        // Add the suggestion if it's not already selected
        if (!currentValues.includes(suggestion)) {
            currentValues.push(suggestion);
            input.value = currentValues.join(', '); // Update input with selected values
    
            // Create a badge for the selected requirement
            const badge = document.createElement('span');
            badge.className = 'badge badge-info mr-1'; // Add classes for styling
            badge.innerText = suggestion;
    
            // Add remove functionality for the badge
            badge.onclick = function() {
                const index = currentValues.indexOf(suggestion);
                if (index > -1) {
                    currentValues.splice(index, 1); // Remove the suggestion from the array
                    input.value = currentValues.join(', '); // Update input
                    selectedContainer.removeChild(badge); // Remove badge from the display
                }
            };
    
            selectedContainer.appendChild(badge); // Append badge to the selected container
        }
    }
    