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






function formatLocation(location, options = {}) {
    const { part = 'all', reverseOrder = false } = options; // Set default options

    // Check if input is an array
    if (Array.isArray(location)) {
        if (reverseOrder) {
            location = location.reverse(); // Reverse the order of the array
        }

        // If the user wants only a specific part of the location (e.g., city, country)
        switch (part) {
            case 'country':
                location = location[0]; // Return the first part (country)
                break;
            case 'state':
                location = location[1] || ''; // Return the second part (state)
                break;
            case 'county':
                location = location[2] || ''; // Return the third part (county)
                break;
            case 'city':
                location = location[location.length - 1]; // Return the last part (city)
                break;
            default:
                location = location.join(', '); // Join the entire array
        }
    }

    // Check if input is a valid string after handling the array case
    if (typeof location !== 'string' || location.trim() === '') {
        return 'Not specified'; // Return 'Not specified' for invalid input
    }
    
    // Add spaces after commas, periods, dashes, slashes, or colons
    let formattedLocation = location.replace(/([.,-/])(\S)/g, '$1 $2');
    
    // Remove any extra spaces
    formattedLocation = formattedLocation.replace(/\s+/g, ' ').trim();

    // Capitalize each word
    formattedLocation = formattedLocation.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

   // console.log("Formatted Location: ", formattedLocation);
    return formattedLocation;
}
/*
'country', 'state', 'city' 'county'

let jobLocation = ['US', 'California', 'Los Angeles County', 'Preuss'];
console.log(formatLocation(jobLocation, { part: 'city' }));
// Output: "Preuss"

let jobLocation = ['US', 'California', 'Los Angeles County', 'Preuss'];
console.log(formatLocation(jobLocation, { reverseOrder: true }));
// Output: "Preuss, Los Angeles County, California, Us"


*/

/*
// Usage examples
console.log(formatLocation("US,Texas,Dallas,Highland Park")); // "Us, Texas, Dallas, Highland Park"
console.log(formatLocation("New.York,USA"));                  // "New. York, Usa"
console.log(formatLocation("Houston.TX,USA"));                // "Houston. Tx, Usa"
console.log(formatLocation("us-texas/dallas,highland park")); // "Us- Texas/ Dallas, Highland Park"
console.log(formatLocation("  New York  .USA "));             // "New York. Usa"
console.log(formatLocation(""));                              // ""
*/

function formatJobType(jobType) {
    // Remove hyphens and underscores
    jobType = jobType.replace(/[-_]/g, ' ');

    // Capitalize each word
    jobType = jobType.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

    return jobType;
}


function formatTags(tags) {
    // Check if tags is defined and is an array
    if (Array.isArray(tags) && tags.length > 0) {
        // Map each tag to a string representing a button element
        return tags.map(tag => {
            // Capitalize the first letter of the tag
            const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

            // Return a button as a string, using Bootstrap classes and tag redirection
            return `
                <button class="btn btn-secondary m-1 tags" onclick="window.location.href='../views/job-listings/?tag=${encodeURIComponent(capitalizedTag)}'">
                    ${capitalizedTag}
                </button>
            `;
        }).join(''); // Join all buttons into a single string
    }
    return ''; // Return an empty string if no valid tags
}

// formatTags(jobData.tags);


function formatCurrency(value, options = {}) { 
    // Set default options for internationalization and currency formatting
    const { locale = 'en-US', currency = 'USD', useIntl = false, decimals = 0 } = options;

    // Check if value is undefined or null, and set to 0 in that case
    if (value === undefined || value === null) {
        value = 0;
    }

    // If the value is a number, convert it to a string for processing
    let cleanValue = typeof value === 'number' ? value.toString() : value;

    // Remove any non-numeric characters except dots and commas
    cleanValue = cleanValue.replace(/[^0-9.,-]/g, '');

    // Handle commas and convert to standard float
    cleanValue = cleanValue.replace(/,/g, '');

    // Convert to number
    let number = parseFloat(cleanValue);

    // Ensure the number is valid
    if (isNaN(number)) {
        return useIntl 
            ? new Intl.NumberFormat(locale, { style: 'currency', currency }).format(0)
            : '$0.00'; // Return default for invalid numbers
    }

    // If using Intl for international formatting
    if (useIntl) {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
    }

    // Manually format the number as currency (with commas)
    const formattedNumber = number.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Return formatted currency
    return `$${formattedNumber}`;
}

/*
// Usage examples with default formatting
console.log(formatCurrency("1234.56"));        // "$1,234.56"
console.log(formatCurrency("$1,234.56"));      // "$1,234.56"
console.log(formatCurrency("1,234,567.89"));   // "$1,234,567.89"
console.log(formatCurrency("1000"));           // "$1,000.00"
console.log(formatCurrency("$1,234.5"));       // "$1,234.50"

// Usage examples with international formatting
console.log(formatCurrency("1234,56", { locale: 'de-DE', currency: 'EUR', useIntl: true }));  // "1.234,56 €"
console.log(formatCurrency("1234.56", { locale: 'en-GB', currency: 'GBP', useIntl: true }));  // "£1,234.56"
console.log(formatCurrency("$1234.56", { locale: 'en-US', useIntl: true }));                 // "$1,234.56"
*/



// Truncate text function
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
console.log('lastWord', lastWord);

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
        input.setAttribute('data-suggestion', lastWord + suggestion); // Set a custom data attribute for handling auto-suggestion

        input.value = lastWord + suggestion; // Temporarily set the input value to the suggestion
        console.log('lastWord + suggestion', lastWord + suggestion);
        input.selectionStart = inputValue.length; // Set the selection start after the typed characters
        input.selectionEnd = suggestion.length + inputValue.length; // Set the selection end to the suggestion length
        console.log('suggestion.length:', suggestion.length); // Log the updated input value
        console.log('inputValue.length:', inputValue.length); // Log the updated input value
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
            console.log('e.inputType.   ',e.inputType); 
            // Check for backspace input type to avoid suggesting during deletion
            if (e.inputType !== 'deleteContentBackward' || e.inputType !== 'insertText') {
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
    







// profileModal.js

// Function to create the profile modal HTML
function createProfileModal() {
    const modalHTML = `
      <div id="profileModal" class="modal fade" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="profileModalLabel">Update Your Profile</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="profileForm">
                <!-- Username -->
                <div class="mb-3">
                  <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="username" required>
                  <small id="usernameError" class="text-danger"></small>
                </div>
  
                <!-- Name -->
                <div class="mb-3">
                  <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="name" required>
                </div>
  
                <!-- Location (Auto-suggest) -->
                <div class="mb-3">
                  <label for="location" class="form-label">Location</label>
                  <input type="text" class="form-control" id="location" placeholder="Enter your city or state">
                </div>
  
                <!-- Profile Picture Upload -->
                <div class="mb-3">
                  <label for="profilePicture" class="form-label">Profile Picture</label>
                  <input type="file" class="form-control" id="profilePicture" accept="image/*">
                  <img id="profilePicPreview" class="img-thumbnail mt-2" style="display:none; width: 100px;" />
                </div>
  
                <!-- Bio -->
                <div class="mb-3">
                  <label for="bio" class="form-label">Bio</label>
                  <textarea class="form-control" id="bio" rows="3" maxlength="300"></textarea>
                </div>
  
                <!-- Tags (Skills or Interests) -->
                <div class="mb-3">
                  <label for="tags" class="form-label">Tags</label>
                  <input type="text" class="form-control" id="tags" placeholder="Add tags (e.g., JavaScript, Project Management)">
                </div>
  
                <!-- Company Name (For Recruiters) -->
                <div id="recruiterFields" class="mb-3" style="display: none;">
                  <label for="companyName" class="form-label">Company Name</label>
                  <input type="text" class="form-control" id="companyName">
                </div>
  
                <!-- Current Position -->
                <div class="mb-3">
                  <label for="position" class="form-label">Current Position</label>
                  <input type="text" class="form-control" id="position">
                </div>
  
                <!-- Membership Status -->
                <div class="mb-3">
                  <label class="form-label">Membership Status</label>
                  <p id="membershipStatus" class="badge bg-success">Free</p>
                  <button type="button" class="btn btn-link" id="changeMembershipBtn">Change Membership</button>
                </div>
  
                <!-- Verified Status -->
                <div class="mb-3">
                  <label class="form-label">Verified Status</label>
                  <p id="verifiedStatus" class="badge bg-secondary">Not Verified</p>
                </div>
  
                <!-- Public Profile Checkbox -->
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="publicProfile">
                  <label class="form-check-label" for="publicProfile">Public Profile</label>
                </div>
  
                <!-- Deactivate Account -->
                <div class="mt-4">
                  <button type="button" class="btn btn-danger" id="deactivateAccountBtn">Deactivate Account</button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="saveProfileBtn">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Append modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Function to initialize modal functionality
  function initializeProfileModal() {
    const profileForm = document.getElementById('profileForm');
    const usernameInput = document.getElementById('username');
    const nameInput = document.getElementById('name');
    const usernameError = document.getElementById('usernameError');
    const profilePictureInput = document.getElementById('profilePicture');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
  
    // Real-time validation
    usernameInput.addEventListener('input', function () {
      validateField(usernameInput, usernameError, 'Username is required');
    });
  
    nameInput.addEventListener('input', function () {
      validateField(nameInput, null, 'Name is required');
    });
  
    function validateField(input, errorElem, errorMessage) {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        if (errorElem) errorElem.textContent = errorMessage;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (errorElem) errorElem.textContent = '';
      }
    }
  
    // Profile picture live preview
    profilePictureInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePicPreview.src = e.target.result;
          profilePicPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Save profile button
    saveProfileBtn.addEventListener('click', function () {
      if (validateProfileForm()) {
        alert('Profile saved successfully!');
        // Add actual save logic here
      } else {
        alert('Please fill in all required fields.');
      }
    });
  
    function validateProfileForm() {
      // Check if username and name are valid
      const isUsernameValid = usernameInput.value.trim() !== '';
      const isNameValid = nameInput.value.trim() !== '';
      return isUsernameValid && isNameValid;
    }
  
    // Change membership button
    const changeMembershipBtn = document.getElementById('changeMembershipBtn');
    changeMembershipBtn.addEventListener('click', function () {
      alert('Change membership clicked');
      // Logic to handle membership change can go here
    });
  }
  
  // Check if username is set and show modal if not
  function checkUsernameAndShowModal() {
    // Simulate fetching data from Firebase
    const userProfile = { username: '', name: '', location: '' }; // Replace this with actual Firebase data fetching
  
    if (!userProfile.username) {
      createProfileModal();
      $('#profileModal').modal('show');
      initializeProfileModal();
    }
  }
  
  // Execute the check when the page loads
 // document.addEventListener('DOMContentLoaded', checkUsernameAndShowModal);
  