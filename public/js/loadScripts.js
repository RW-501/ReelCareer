

function formatLocation(location, options = {}) {
  const { part = "all", reverseOrder = false } = options; // Set default options

  // Check if input is an array
  if (Array.isArray(location)) {
    if (reverseOrder) {
      location = location.reverse(); // Reverse the order of the array
    }

    // If the user wants only a specific part of the location (e.g., city, country)
    switch (part) {
      case "country":
        location = location[0]; // Return the first part (country)
        break;
      case "state":

        location = `<a href="/state#${encodeURIComponent(location[1] || "").toLowerCase().trim()}">${location[1] || ""}</a>`; // Return state link
        break;
      case "county":
        location = location[2] || ""; // Return the third part (county)
        break;
      case "city":
        location = `<a href="/city#${encodeURIComponent(location[location.length - 1]).toLowerCase().trim()}">${location[location.length - 1]}</a>`; // Return city link
        break;
      default:
        location = location.map((part, index) => {
          if (index === 1) {
            // State
            return `<a href="/state#${encodeURIComponent(part).toLowerCase().trim()}">${part}</a>`;
          } else if (index === location.length - 1) {
            // City
            return `<a href="/city#${encodeURIComponent(part).toLowerCase().trim()}">${part}</a>`;
          } else {
            return part;
          }
        }).join(", "); // Join the entire array into a string
    }
  } else if (typeof location === "string") {
    // If location is a string, we format it directly
    if (location.trim() === "") {
      return "Not specified"; // Return 'Not specified' for empty string
    }
  } else {
    // If location is neither an array nor a valid string, return 'Not specified'
    return "Not specified";
  }

  // Capitalize each word of the location, whether it's from an array or string
  location = location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Add spaces after commas, periods, dashes, slashes, or colons
  let formattedLocation = location.replace(/([.,-/])(\S)/g, "$1 $2");

  // Remove any extra spaces
  formattedLocation = formattedLocation.replace(/\s+/g, " ").trim();

  return formattedLocation;
}


  function formatDateString(dateString) {
    // Ensure dateString is a string or object with seconds and nanoseconds
    if (typeof dateString !== 'string' && typeof dateString !== 'object') {
        return "Invalid date";
    }

    let date;

    // Check for object format with seconds and nanoseconds
    if (typeof dateString === 'object' && dateString.seconds && dateString.nanoseconds) {
        // Convert seconds to milliseconds and create a Date object
        date = new Date(dateString.seconds * 1000 + dateString.nanoseconds / 1000000);
    } else {
        // If dateString is not already a string, convert it to a string
        if (typeof dateString !== 'string') {
            dateString = String(dateString);
        }

        // Try to parse with Date object directly
        date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            // Regex to match "Month DD, YYYY, at HH:mm:ss AM/PM UTC±HH" format
            const regex = /(\w+ \d{1,2}, \d{4}),? at (\d{1,2}:\d{2}:\d{2})\s?(AM|PM) UTC([+-]\d{1,2})/;
            const match = dateString.match(regex);

            if (match) {
                // Destructure matched parts
                const [ , monthDayYear, time, period, offset ] = match;

                // Combine date and time into a standard parseable format
                const formattedDateString = `${monthDayYear} ${time} ${period}`;
                date = new Date(formattedDateString);

                // Adjust for UTC offset if applicable
                const offsetHours = parseInt(offset, 10);
                date.setHours(date.getHours() - offsetHours);
            } else {
                // Fallback regex for "YYYY-MM-DD" format
                const fallbackRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (fallbackRegex.test(dateString)) {
                    const parts = dateString.split("-");
                    date = new Date(parts[0], parts[1] - 1, parts[2]);
                } else {
                    return "Invalid date";
                }
            }
        }
    }

    // If date is valid, format it and return
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/*
// Test cases
console.log(formatDateString("November 19, 2024, at 3:21:48 AM UTC-6")); // Expected: "November 19, 2024"
console.log(formatDateString("2024-11-19"));                             // Expected: "November 19, 2024"
console.log(formatDateString(1732032108000));                           // Expected: Date based on timestamp
*/
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
    jobType = jobType.replace(/[-_]/g, " ");
  
    // Capitalize each word
    jobType = jobType
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  
    return jobType;
  }
  
  function formatTags(tags) {
    // Check if tags is defined and is an array
    if (Array.isArray(tags) && tags.length > 0) {
      // Map each tag to a string representing a button element
      return tags
        .map((tag) => {
          // Capitalize the first letter of the tag
          const capitalizedTag =
            tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  
          // Return a button as a string, using Bootstrap classes and tag redirection
          return `
            <button class="btn btn-secondary m-1 tags" onclick="window.location.href='https://reelcareer.co/views/job-listings?tag=${encodeURIComponent(
              capitalizedTag
            )}'">
              ${capitalizedTag}
            </button>
          `;
        })
        .join(""); // Join all buttons into a single string
    }
    return ""; // Return an empty string if no valid tags
  }
  
  
  // formatTags(jobData.tags);
  
  // Function to format currency (for both input fields and static numbers)
  function formatCurrency(value, options = {}) { 
    const { locale = "en-US", currency = "USD", decimals = 0 } = options;
  

    // Convert to string if value is a number
    let cleanValue = typeof value === "number" ? value.toString() : String(value);
  
    // Remove any non-numeric characters except dots and commas
    cleanValue = cleanValue.replace(/[^0-9.,-]/g, "");
  
    // Remove commas and convert to number
    cleanValue = cleanValue.replace(/,/g, "");
    let number = parseFloat(cleanValue);
  
    // Handle invalid numbers
    if (isNaN(number)) {
      return "$0.00"; // Return default if value is invalid
    }
  
    // Manually format the number as currency (with commas)
    let formattedNumber = number
      .toFixed(decimals)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return `$${formattedNumber}`;
  }
  
  function updateCurrency(input) {

 
    // Format the current input value
    const formattedValue = formatCurrency(input.value, { decimals: 0 });
    // Update the input value with formatted currency or "Negotiable"
    input.value  = formattedValue;
  
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
  function truncateText(text, maxLength, href) {
    return text.length > maxLength 
        ? text.substring(0, maxLength) + `... <a href="${href}">See More</a>` 
        : text;
}

  
  function restrictKeys(event) {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Enter",
      "Escape"
    ];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  
  //let jobSuggestions, jobRequirementsSuggestions, locationsSuggestions, citySuggestions, stateSuggestions;
  
  //const {isHomePage, currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages } = getAdjustedLinks();
  function getSuggestionStyles() {
    const style = document.createElement("style");
    style.textContent = `
    .suggestion-dropdown {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ccc;
      background-color: white;
      max-height: 200px;
      overflow-y: auto; /* Allow scrolling if too many suggestions */
      width: 100%; /* Match input width */
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 1000; /* Ensure dropdown appears above other elements */
    }
  
    .suggestion-dropdown li {
      padding: 8px 12px;
      cursor: pointer;
    }
  
    .suggestion-dropdown li:hover {
      background-color: #f0f0f0; /* Highlight on hover */
    }
  
    .suggestion-dropdown li:focus {
      outline: none; /* Remove default outline */
      background-color: #e6e6e6; /* Highlight when focused */
    }
    `;
    document.head.appendChild(style);
  }
  
  getSuggestionStyles();
  let DEBOUNCE_DELAY = 300;

  // Fetch suggestions data from JSON file
  async function fetchSuggestions() {

  // Constants for configuration 
  let Main_SUGGESTIONS_URL = "https://reelcareer.co/public/js/suggestions.json";
  
    
    try {
      const response = await fetch(Main_SUGGESTIONS_URL);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
  
      const data = await response.json();
      
      jobSuggestions = data.suggestions || [];
      jobRequirementsSuggestions = data.jobRequirementsSuggestions && data.suggestions || [];
      locationsSuggestions = data.locationsSuggestions && data.stateSuggestions && data.citySuggestions || [];
      citySuggestions = data.citySuggestions || [];
      stateSuggestions = data.stateSuggestions || [];
    } catch (error) {
      handleFetchError(error);
    }
  }
  
  // Handle fetch errors
  function handleFetchError(error) {
    console.error("There was a problem with the fetch operation:", error);
    alert("Failed to fetch suggestions. Please try again later.");
  }
  
  // Debounce function to limit function call frequency
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  

// Adjust createSuggestionDropdown to keep dropdown behavior the same
function createSuggestionDropdown(input, suggestions) {
  // Remove existing dropdown if present
  const existingDropdown = document.querySelector('.suggestion-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
  }

  // Create a new dropdown
  const dropdown = document.createElement('ul');
  dropdown.classList.add('suggestion-dropdown');

  suggestions.forEach(suggestion => {
    const listItem = document.createElement('li');
    listItem.textContent = suggestion;
    listItem.tabIndex = 0; // Make the list items focusable
    listItem.addEventListener('click', () => {
      input.value = suggestion; // Set input value on suggestion click
      input.placeholder = ""; // Clear placeholder on selection
      input.focus(); // Refocus on the input
      dropdown.remove(); // Remove dropdown after selection
    });

    // Keyboard navigation for list items
    listItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.value = suggestion;
        input.placeholder = ""; // Clear placeholder on selection
        input.focus();
        dropdown.remove();
      }
    });

    dropdown.appendChild(listItem);
  });

  document.body.appendChild(dropdown); // Append dropdown to body
  const { top, left, right, height } = input.getBoundingClientRect();
  dropdown.style.position = 'absolute';
  dropdown.style.top = `${top + height}px`;
  dropdown.style.width = `fit-content`;
  let newLeft = left + 50 / 4;
  dropdown.style.left = `${newLeft}px`;
  dropdown.style.right = `${right}px`;

  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target) && event.target !== input) {
      dropdown.remove(); // Remove dropdown if clicking outside
    }
  });
}
  
 // Update autoSuggest function to display the suggestion in the input field
// Enhanced autoSuggest function
function autoSuggest(input, suggestionsArray) {
  // Validate the input element and its value
  if (!input || !input.value || typeof input.value !== "string") {
    console.error("Invalid input element or value is undefined");
    return;
  }

  const inputValue = input.value.toLowerCase().trim();
  const inputParts = inputValue.split(" ");
  const lastWord = inputParts.pop() || "";

  if (lastWord.length < 2) {
    input.removeAttribute("data-suggestion");
    input.placeholder = ""; // Clear placeholder when there's no suggestion
    return;
  }

  // Filter suggestions to match the last word
  const matchedSuggestions = suggestionsArray.filter(s => s.toLowerCase().startsWith(lastWord));

  if (matchedSuggestions.length > 0) {
    // Display the first suggestion as placeholder text
    input.placeholder = input.value + matchedSuggestions[0].slice(lastWord.length);

    // Create a dropdown for additional options
    createSuggestionDropdown(input, matchedSuggestions);
  } else {
    input.removeAttribute("data-suggestion");
    input.placeholder = ""; // Clear placeholder if no match found
  }
}



  // Initialize on DOM content loaded
  document.addEventListener("DOMContentLoaded", () => {
    fetchSuggestions();
  
    const keywordInputs = document.querySelectorAll(".keywordInput");
  
    // Debounced autoSuggest function
    const debouncedAutoSuggest = debounce((input) => {
      let suggestionsArray;
  
      if (input.classList.contains("job-input")) {
        suggestionsArray = jobSuggestions;
      } else if (input.classList.contains("tagInput")) {
        suggestionsArray = locationsSuggestions;
      } else if (input.classList.contains("keywordInput")) {
        suggestionsArray = citySuggestions;      
      } else if (input.classList.contains("location-input")) {
          suggestionsArray = citySuggestions;      
      } else if (input.classList.contains("city-input")) {
            suggestionsArray = citySuggestions;
      } else if (input.classList.contains("state-input")) {
        suggestionsArray = stateSuggestions;
      } else {
        suggestionsArray = jobRequirementsSuggestions;
      }
  
      if (suggestionsArray.length > 0) {
        autoSuggest(input, suggestionsArray);
      }
    }, DEBOUNCE_DELAY);
  
    // Event delegation for keyword inputs
    document.body.addEventListener("input", (e) => {
      if (e.target.classList.contains("keywordInput")) {
        debouncedAutoSuggest(e.target);
      }
    });
  
    // Event listener for keydown events on all inputs
    document.body.addEventListener("keydown", (e) => {
      const target = e.target;
      if (target.classList.contains("keywordInput")) {
        const suggestion = target.getAttribute("data-suggestion");
  
        if (["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          return;
        }
  
        if (["Tab", "Enter"].includes(e.key) && suggestion) {
          e.preventDefault();
          target.value = suggestion;
          target.setSelectionRange(suggestion.length, suggestion.length);
        }
      }
    });
  });









  
  
  // Function to add selected job requirement
  function addJobRequirement(input, suggestion) {
    const selectedContainer = document.getElementById("selectedRequirements"); // Container for selected requirements
    const currentValues = input.value.split(",").map((item) => item.trim()); // Get current values as an array
  
    // Add the suggestion if it's not already selected
    if (!currentValues.includes(suggestion)) {
      currentValues.push(suggestion);
      input.value = currentValues.join(", "); // Update input with selected values
  
      // Create a badge for the selected requirement
      const badge = document.createElement("span");
      badge.className = "badge badge-info mr-1"; // Add classes for styling
      badge.innerText = suggestion;
  
      // Add remove functionality for the badge
      badge.onclick = function () {
        const index = currentValues.indexOf(suggestion);
        if (index > -1) {
          currentValues.splice(index, 1); // Remove the suggestion from the array
          input.value = currentValues.join(", "); // Update input
          selectedContainer.removeChild(badge); // Remove badge from the display
        }
      };
  
      selectedContainer.appendChild(badge); // Append badge to the selected container
    }
  }
  
  // Function to show the modal
  function showModal(Modal) {
    console.log("showModal:");
  
    const modalElement = document.getElementById(Modal);
    //const modal = new bootstrap.Modal(modalElement);
    //modal.removeAttribute('inert');
    modalElement.classList.add("show"); // Add bootstrap's 'show' class
    modalElement.setAttribute("aria-hidden", "false");
    modalElement.removeAttribute("hide");
  }
  
  function hideModal(Modal) {
    const modal = document.getElementById(Modal);
    console.log("hideModal:");
  
    //modal.setAttribute('inert', '');
    modal.classList.remove("show"); // Remove bootstrap's 'show' class
    modal.setAttribute("aria-hidden", "true");
    modal.classList.add("hide"); // Add a 'hide' class if needed
  
    const modalBackdrop = document.querySelector(".modal-backdrop");
    // Check if the modal backdrop exists
    if (modalBackdrop) {
      // Remove the 'show' class
      modalBackdrop.classList.remove("show");
  
      // Add the 'hide' class
      modalBackdrop.classList.add("hide");
  
      // modalBackdrop.setAttribute('inert', '');
      modalBackdrop.setAttribute("aria-hidden", "true");
    }
    const modalopen = document.querySelector("body");
    modalopen.classList.remove("modal-open");
  }
  

  // Function to show toast notifications
// Function to show toast notifications
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type} noCopy`; // Add classes for styling
    toast.setAttribute('role', 'alert'); // Accessibility
    toast.innerText = message;

    // Add styles to the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 20px';
    toast.style.margin = '10px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    toast.style.color = '#fff';
    toast.style.zIndex = '9999999999999999';
    toast.style.transition = 'opacity 0.5s ease-in-out';
    toast.style.opacity = '1';

    // Set background color based on the type of toast
    switch (type) {
        case 'success':
            toast.style.backgroundColor = '#28a745'; // Green
            break;
        case 'error':
            toast.style.backgroundColor = '#dc3545'; // Red
            break;
        case 'info':
            toast.style.backgroundColor = '#17a2b8'; // Blue
            break;
        case 'warning':
            toast.style.backgroundColor = '#ffc107'; // Yellow
            break;
        default:
            toast.style.backgroundColor = '#6c757d'; // Default gray
    }

    document.body.appendChild(toast);

    // Fade out effect before removal
    setTimeout(() => {
        toast.style.opacity = '0'; // Start fade-out
        setTimeout(() => toast.remove(), 500); // Remove after fade-out
    }, 3000);
}



// Function to create and add styles for tag-primary and other elements
function addTagStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .tagsContainer { 
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 5px;
            min-height: 40px;
        }

        .tagInput {
            border: none;
            outline: none;
            flex-grow: 1;
        }

        .tag {
            background-color: #639ad4 ; 
            color: white;
            border-radius: 3px;
            padding: 5px 10px;
            margin: 3px;
            display: inline-flex;
            align-items: center;
                font-size: 1rem;
        }

        .tag button {
            background: none;
            border: none;
            color: white;
            margin-left: 5px;
            cursor: pointer;
        }

        .clearTagsButton {
            background-color: #dc3545; /* Bootstrap danger color */
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            margin-top: 5px;
        }

        .clearTagsButton:hover {
            background-color: #c82333; /* Darker shade on hover */
        }
    `;
    document.head.appendChild(style);
}


function createTagInputSystem({ tagsContainerId, badgeClass = "tag-primary" }) {
    const tagsContainer = document.getElementById(tagsContainerId);
    tagsContainer.classList.add("tagsContainer"); // Ensure the class is added

    // Search for the existing input within the container and hide it
    const existingInput = tagsContainer.querySelector("input[type='text']");
    if (existingInput) {
        existingInput.style.display = "none"; // Hide the existing input
    }

    // Create a temporary input to handle tag entries
    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.className = "form-control tagInput mt-2 noCopy";
    tagInput.placeholder = "Add a tag and press Enter";
    tagsContainer.appendChild(tagInput); // Append the new input to the container
    
    // Create tags list container dynamically
    const tagsList = document.createElement("div");
    tagsList.className = "mt-2 noCopy";
    tagsContainer.appendChild(tagsList); // Append the tags list to the container

    // Create the Clear Tags button dynamically
    const clearTagsButton = document.createElement("button");
    clearTagsButton.className = "btn clearTagsButton mt-2";
    clearTagsButton.textContent = "Clear Tags";
    tagsContainer.appendChild(clearTagsButton); // Append the clear button below the tags list

    // Function to update the existing input with tags
    function updateHiddenInput() {
        const tags = Array.from(tagsList.children).map(tag => tag.textContent.replace(" x", "").trim());
        if (existingInput) {
            existingInput.value = tags.join(","); // Update the existing input with comma-separated tags
        }
    }

    // Function to add a tag
    function addTag(tag) {
        if (!tag) return; // Prevent empty tags

        const tagElement = document.createElement("span");
        tagElement.className = `tag badge ${badgeClass} mr-1`; // Using provided badge class
        tagElement.textContent = tag;

        const removeButton = document.createElement("button");
        removeButton.textContent = " x"; // Close button
        removeButton.className = "ml-1 btn btn-sm tag"; // Styling for remove button
        removeButton.onclick = () => {
            tagsList.removeChild(tagElement);
            updateHiddenInput(); // Update existing input after removing tag
        };

        tagElement.appendChild(removeButton);
        tagsList.appendChild(tagElement);
        updateHiddenInput(); // Update existing input when a new tag is added
    }

    // Set up event listener for the tag input
    tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && tagInput.value.trim() !== "") {
            e.preventDefault(); // Prevent form submission
            const tag = tagInput.value.trim();
            addTag(tag); // Add the new tag
            tagInput.value = ""; // Clear the input
        }
    });

    // Set up event listener for focus out
tagInput.addEventListener("focusout", () => {
    const tag = tagInput.value.trim();
    if (tag) {
        // Show a toast notification when focus is lost and there's a value
        showToast('Press Enter to add Tag', 'info');
    }
});
    // Event listener to clear all tags
    clearTagsButton.addEventListener("click", () => {
        tagsList.innerHTML = ""; // Clear all tags
        updateHiddenInput(); // Update existing input after clearing tags
    });

    // Return input and clear button for external listeners
    return { tagInput, clearTagsButton, tagsList, addTag };
}





function removeUndefined(arr) {
  if (!Array.isArray(arr)) {
      console.error("Input is not an array. Please provide a valid array.");
      return [];
  }
  
  // Log original array length
  const originalLength = arr.length;

  // Filter out undefined values
  const filteredArr = arr.filter(item => item !== undefined);

  // Log how many undefined values were removed
  const removedCount = originalLength - filteredArr.length;
  if (removedCount > 0) {
      console.log(`${removedCount} undefined value(s) removed.`);
  } else {
      console.log("No undefined values were found.");
  }

  return filteredArr;
}
/*
// Example usage
let arr = ['4WGIUfwBvFZmZ2LgNCOi', '0sokveOmwRnDpwxJeKen', 'gKLzhmR5OZenwMqZO9Vz', 'e51VHSQm6LwE3y6LZ5Eg', '7UfXOPzgojo2bUCQB25Q', undefined];
let cleanedArr = removeUndefined(arr);
console.log(cleanedArr);

*/

