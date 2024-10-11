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

function formatLocation(location) {
    // Check if input is a valid string
    if (typeof location !== 'string' || location.trim() === '') {
        return ''; // Return empty string for invalid input
    }
    
    // Add spaces after commas, periods, dashes, slashes, or colons
    let formattedLocation = location.replace(/([.,-/])(\S)/g, '$1 $2');
    
    // Remove any extra spaces
    formattedLocation = formattedLocation.replace(/\s+/g, ' ').trim();

    // Capitalize each word
    formattedLocation = formattedLocation.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    console.log("formatLocation ",formattedLocation );
    return formattedLocation;
}

/*
// Usage examples
console.log(formatLocation("US,Texas,Dallas,Highland Park")); // "Us, Texas, Dallas, Highland Park"
console.log(formatLocation("New.York,USA"));                  // "New. York, Usa"
console.log(formatLocation("Houston.TX,USA"));                // "Houston. Tx, Usa"
console.log(formatLocation("us-texas/dallas,highland park")); // "Us- Texas/ Dallas, Highland Park"
console.log(formatLocation("  New York  .USA "));             // "New York. Usa"
console.log(formatLocation(""));                              // ""
*/


function formatCurrency(value, options = {}) {
    // Set default options for internationalization and currency formatting
    const { locale = 'en-US', currency = 'USD', useIntl = false, decimals = 2 } = options;

    // Remove any non-numeric characters except dots and commas
    let cleanValue = value.replace(/[^0-9.,-]/g, '');

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

    // Otherwise, manually format the number as currency (with commas)
    return '$' + number.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
        input.setAttribute('data-suggestion', suggestion); // Set a custom data attribute for handling auto-suggestion

        input.value = suggestion; // Temporarily set the input value to the suggestion
        input.selectionStart = inputValue.length; // Set the selection start after the typed characters
        input.selectionEnd = suggestion.length + input.value; // Set the selection end to the suggestion length
        console.log('suggestion.length:', suggestion.length); // Log the updated input value
        console.log('input.value:', input.value); // Log the updated input value
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
    



