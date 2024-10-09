





// Function to inject CSS styles into the document
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* General Styles */

   /* Styles for the suggestion dropdown */

   input::selection {
    background: #d0eaff; /* Light blue background for the suggestion part */
    color: #000; /* Text color for the suggestion part */
}


@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.2rem; /* Increase the brand text size on mobile */
    }

    .nav-link {
        font-size: 0.9rem; /* Decrease the nav link text size */
    }

    .company-media img {
        width: 100%; /* Make company media images responsive */
        height: auto; /* Maintain aspect ratio */
    }

    /* Adjust video size on mobile */
    video {
        width: 100%;
        height: auto;
    }
}
@media (max-width: 768px) {
    body {
        font-size: 14px; /* Smaller text on mobile */
    }

    .navbar {
        flex-direction: column; /* Stack navbar items */
    }
}

@media (max-width: 576px) {
    .navbar-brand {
        font-size: 1.5rem; /* Adjust brand size */
    }
}

img {
    max-width: 100%;
    height: auto;
}
button, .nav-link {
    padding: 10px 15px;
    font-size: 16px;
}

        
    footer {
        margin-top: 50px;
    }
    footer p {
        margin-bottom: 0;
    }
    `;
    document.head.appendChild(style);
}












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
const currentPage = window.location.pathname;

// Define if the root is at the home page or deeper directories
const isHomePage = currentPage === '/ReelCareer/index.html' || currentPage === '/ReelCareer/' || currentPage === '' || currentPage === '/';

// Adjust hrefs based on the root page
let  adjustLinkURL = (isHomePage) ? '/ReelCareer/views/' || '/ReelCareer/public/' : '';
 let adjustLinkHomeURL = (isHomePage) ? '' : '/ReelCareer/';
if (currentPage.includes("/ReelCareer/public")) {
    adjustLinkURL = "/ReelCareer/public/";
    } 

// Check if "/ReelCareer/view" is in the URL
if (currentPage.includes("/ReelCareer/views")) {
    adjustLinkURL = "/ReelCareer/views/";
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
        console.log('input.value.length:', input.value.length); // Log the current input value

        if(input.value.length > 2 ){
        const inputValue = input.value ? input.value.toLowerCase().trim() : ''; // Ensure input is defined and trim any extra spaces
        console.log('Input Value:', inputValue); // Log the current input value
        
        let suggestion = '';
        
        // Split the input by spaces and get the last part
        const words = inputValue.split(' ');
        const lastWord = words.pop(); // Get the last word after the most recent space
        console.log('words:', words); 
        console.log('Last Word:', lastWord); 

            
        // Find the first suggestion that starts with the last word
        for (let i = 0; i < suggestionsArray.length; i++) {
            if (suggestionsArray[i].toLowerCase().startsWith(lastWord)) {
                suggestion = suggestionsArray[i];
                console.log('Suggestion Found:', suggestion); // Log the found suggestion
                break;
            }
        }
    
        if (suggestion && lastWord !== '') {
            // If a suggestion is found and the last word isn't empty
            input.setAttribute('data-suggestion', suggestion); // Set a custom data attribute for handling auto-suggestion
            
            // Update the input value to reflect the suggestion only for the last word
            input.value = words.join(' ') + ' ' + suggestion; // Preserve previous input and add the suggestion
            input.selectionStart = input.value.length; // Set the selection start after the typed characters
            input.selectionEnd = input.value.length + suggestion.length; // Set the selection end to the end of the input
            console.log('input.value.length', input.value.length); 
            console.log('suggestion.length:', suggestion.length); 

            console.log('Input Updated to Suggestion:', input.value); // Log the updated input value
        } else {
            // Clear the suggestion if no match is found
            if (input.getAttribute('data-suggestion')) {
                input.removeAttribute('data-suggestion'); // Clear it if no suggestions
            }
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
    
    

// Simple encryption/decryption functions
const secretKey = 'WeThaBest'; // Replace with your own secret key
let userINFO = "";

function encrypt(data) {
    let encrypted = btoa(JSON.stringify(data));
    return encrypted;
}

function decrypt(encryptedData) {
    let decrypted = atob(encryptedData);
    return JSON.parse(decrypted);
}


// Check Local Storage for User Location Data
function checkLocalStorageForLocation() {
    const storedData = localStorage.getItem('userLocation');
    if (storedData) {
        const decryptedData = decrypt(storedData);
        return decryptedData; // Return the decrypted data
    }
    return null; // No data found
}


// Function to get user info and store it in local storage
async function getUserInfo() {
    let userLocation = checkLocalStorageForLocation();

    if (!userLocation) {
        // User location not found, retrieve it
        const ip = await getUserIP();
        if (!ip) {
            console.error("Unable to retrieve IP address.");
            return;
        }

        userLocation = await getUserLocationByIP(ip);
        if (userLocation) {
            console.log(`City: ${userLocation.city}, State: ${userLocation.state}, ZIP Code: ${userLocation.zip}`);

            // Encrypt and store the data in local storage
            const encryptedData = encrypt({
                ip: ip,
                city: userLocation.city,
                state: userLocation.state,
                zip: userLocation.zip
            });
            localStorage.setItem('userLocation', encryptedData);
        } else {
            console.log("Could not retrieve location.");
        }
    } else {
        console.log(`Retrieved from Local Storage: City: ${userLocation.city}, State: ${userLocation.state}, ZIP Code: ${userLocation.zip}`);
    }
    userINFO = userLocation

    return userINFO;
}

getUserInfo();


console.log("userINFO  ",userINFO);
