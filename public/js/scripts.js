





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





fetch('./suggestions.js')
    .then(response => response.text())
    .then(scriptContent => {
        eval(scriptContent);
        console.log("sug 3",suggestions); // Use suggestions after loading
    });

    fetch('/suggestions.js')
    .then(response => response.text())
    .then(scriptContent => {
        eval(scriptContent);
        console.log("sug 4",suggestions); // Use suggestions after loading
    });

function autoSuggest(input) { 
    const inputValue = input.value ? input.value.toLowerCase() : ''; // Check if input.value is defined
    console.log('Input Value:', inputValue); // Log the current input value
    let suggestion = '';
/*
    // Check if the input is an HTMLInputElement
    if (!(input instanceof HTMLInputElement)) {
        console.error('Input is not a valid HTMLInputElement.');
        return; // Exit the function if input is not valid
    }

*/

    // Find the first suggestion that starts with the input value
    for (let i = 0; i < suggestions.length; i++) {
        if (suggestions[i].toLowerCase().startsWith(inputValue)) {
            suggestion = suggestions[i];
           // console.log('Suggestion Found:', suggestion); // Log the found suggestion
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
        input.removeAttribute('data-suggestion'); // Remove suggestion if none found

    }
}


document.addEventListener('DOMContentLoaded', function() {
    const keywordInput = document.getElementsByClassName('keywordInput')[0];

    // Check if the input exists before adding the event listener
    if (keywordInput) {
        keywordInput.addEventListener('input', function(e) {
            
         //   console.log(keywordInput.event,' event, ', e);

         //   console.log('Input Event Triggered.'); // Log when the input event is triggered
            if (e.inputType === 'deleteContentBackward') {
               // console.log('Backspace, Delete, ');
            }else{
                autoSuggest(this);

            }
 
        });

        keywordInput.addEventListener('keydown', function(e) {
            const suggestion = this.getAttribute('data-suggestion');
            const inputValue = this.value ? this.value.toLowerCase() : ''; // Check if this.value is defined
         //  console.log('Key Down Event Triggered. Input Value:', inputValue); // Log the input value on key down

            // Allow Backspace, Delete, and other keys to function normally
            if (e.key === 'Tab' || e.key === 'Enter') {
                // Prevent default only for Tab and Enter keys
                e.preventDefault();
                if (suggestion && suggestion.toLowerCase().startsWith(inputValue)) {
                    this.value = suggestion;
                    this.setSelectionRange(suggestion.length, suggestion.length);
             //       console.log('Suggestion Selected:', suggestion); // Log when a suggestion is selected
                }
            }
        });
    } else {
        console.error('Keyword Input Not Found!'); // Log an error if the input is not found
    }
});


/*

// Example usage
getUserIP().then(ip => {
    getUserLocationByIP(ip).then(location => {
        if (location) {
            console.log(`City: ${location.city}, State: ${location.state}, ZIP Code: ${location.zip}`);
        } else {
            console.log("Could not retrieve location.");
        }
    });
});

*/
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
