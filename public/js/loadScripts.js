

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

// Function to format currency (for both input fields and static numbers)
function formatCurrency(value, options = {}) { 
    const { locale = 'en-US', currency = 'USD', decimals = 0 } = options;

    // Convert to string if value is a number
    let cleanValue = typeof value === 'number' ? value.toString() : String(value);

    // Remove any non-numeric characters except dots and commas
    cleanValue = cleanValue.replace(/[^0-9.,-]/g, '');

    // Remove commas and convert to number
    cleanValue = cleanValue.replace(/,/g, '');
    let number = parseFloat(cleanValue);

    // Handle invalid numbers
    if (isNaN(number)) {
        return '$0.00';  // Return default if value is invalid
    }

    // Manually format the number as currency (with commas)
    let formattedNumber = number.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `$${formattedNumber}`;
}

function updateCurrency(input) {
    // Format the current input value
    const formattedValue = formatCurrency(input.value, { decimals: 0 });
    // Update the input value with formatted currency
    input.value = formattedValue;

    // Optionally, set the cursor position after the formatted number
    const position = formattedValue.length; // Cursor position at the end
    input.setSelectionRange(position, position);
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
        const inputParts = inputValue.split(' ');
        const lastWord = inputParts.pop(); // Get the last part of the input after the most recent space
        console.log('Last Word:', lastWord);
    
        // Find the first suggestion that starts with the last word
        for (let i = 0; i < suggestionsArray.length; i++) {
            if (suggestionsArray[i].toLowerCase().startsWith(lastWord)) {
                suggestion = suggestionsArray[i];
                console.log('Suggestion Found:', suggestion); // Log the found suggestion
                break;
            }
        }
    
        // Only modify input value if the suggestion is valid and input isn't empty
        if (suggestion && lastWord !== '') {
            const suggestionPart = suggestion.substring(lastWord.length); // Get the part of the suggestion that the user hasn't typed yet
            const finalValue = inputParts.concat(lastWord + suggestionPart).join(' '); // Reconstruct the full sentence with the suggestion
    
            // Set a custom data attribute for handling auto-suggestion
            input.setAttribute('data-suggestion', suggestion);
    
            // Only update the input value if the user is still typing
            if (document.activeElement === input) {
                // Temporarily set the input value to the final suggestion
                input.value = finalValue; // Set the input value to the sentence with the suggestion
                input.selectionStart = inputValue.length; // Set the selection start after the typed characters
                input.selectionEnd = finalValue.length; // Set the selection end to the full suggestion length
                console.log('Final Value:', finalValue); // Log the updated input value
            }
        } else {
            console.log('No suggestion available.'); // Log when no suggestion is found
            if (input.getAttribute('data-suggestion')) {
                input.removeAttribute('data-suggestion'); // Clear it if no suggestions
            }
        }
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        const keywordInputs = document.getElementsByClassName('keywordInput'); // Get all elements with 'keywordInput' class
    
        // Loop through all keywordInput elements
        Array.from(keywordInputs).forEach(function (input) {
            input.addEventListener('input', function (e) {
                console.log('e.inputType:', e.inputType); 
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
            });
    
            input.addEventListener('keydown', function (e) {
                console.log('e.key:', e.key); 
    
                const suggestion = this.getAttribute('data-suggestion');
                const inputValue = this.value ? this.value.toLowerCase() : ''; // Check if this.value is defined
    
                // Allow Backspace, Delete, and other keys to function normally
                if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Enter') {
                    // Prevent default only for Tab and Enter keys
                    if (e.key === 'Tab' || e.key === 'Enter') {
                        e.preventDefault();
                        if (suggestion && suggestion.toLowerCase().startsWith(inputValue)) {
                            this.value = suggestion; // Set the value to the suggestion
                            this.setSelectionRange(suggestion.length, suggestion.length); // Move cursor to the end of the suggestion
                        }
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





    

// Function to show the modal
function showModal() {
    console.log('hideModal:');

    const modalElement = document.getElementById('profileModal');
    const modal = new bootstrap.Modal(modalElement);
    //modal.removeAttribute('inert');
    modal.classList.add('show'); // Add bootstrap's 'show' class
    modal.setAttribute('aria-hidden', 'false');

}



function hideModal() {
    const modal = document.getElementById('profileModal');

    modal.setAttribute('inert', '');
    modal.classList.remove('show'); // Remove bootstrap's 'show' class
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.add('hide'); // Add a 'hide' class if needed

    const modalBackdrop = document.querySelector('.modal-backdrop');
// Check if the modal backdrop exists
if (modalBackdrop) {
    // Remove the 'show' class
    modalBackdrop.classList.remove('show');

    // Add the 'hide' class
    modalBackdrop.classList.add('hide');
    
   // modalBackdrop.setAttribute('inert', '');
    modalBackdrop.setAttribute('aria-hidden', 'true');
}
    const modalopen = document.querySelector('body');
    modalopen.classList.remove('modal-open');

}





