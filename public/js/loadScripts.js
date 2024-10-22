

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
          location = location[1] || ""; // Return the second part (state)
          break;
        case "county":
          location = location[2] || ""; // Return the third part (county)
          break;
        case "city":
          location = location[location.length - 1]; // Return the last part (city)
          break;
        default:
          location = location.join(", "); // Join the entire array into a string
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
            <button class="btn btn-secondary m-1 tags" onclick="window.location.href='../views/job-listings/?tag=${encodeURIComponent(
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
    return text.length > maxLength ? text.substring(0, maxLength) + "... See More" : text;
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
  
  fetch("https://reelcareer.co/public/js/suggestions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
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
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  
  function autoSuggest(input, suggestionsArray) {
    const inputValue = input.value ? input.value.toLowerCase().trim() : ""; // Ensure input is defined and trim any extra spaces
    console.log("Input Value:", inputValue); // Log the current input value
  
    let suggestion = "";
  
    // Split the input by spaces and get the last part
    const inputParts = inputValue.split(" ");
    const lastWord = inputParts.pop(); // Get the last part of the input after the most recent space
    console.log("Last Word:", lastWord);
  
    // Find the first suggestion that starts with the last word
    for (let i = 0; i < suggestionsArray.length; i++) {
      if (suggestionsArray[i].toLowerCase().startsWith(lastWord)) {
        suggestion = suggestionsArray[i];
        console.log("Suggestion Found:", suggestion); // Log the found suggestion
        break;
      }
    }
  
    // Only modify input value if the suggestion is valid and input isn't empty
    if (suggestion && lastWord !== "") {
      const suggestionPart = suggestion.substring(lastWord.length); // Get the part of the suggestion that the user hasn't typed yet
      const finalValue = inputParts.concat(lastWord + suggestionPart).join(" "); // Reconstruct the full sentence with the suggestion
  
      // Set a custom data attribute for handling auto-suggestion
      input.setAttribute("data-suggestion", suggestion);
  
      // Only update the input value if the user is still typing
      if (document.activeElement === input) {
        // Temporarily set the input value to the final suggestion
        input.value = finalValue; // Set the input value to the sentence with the suggestion
        input.selectionStart = inputValue.length; // Set the selection start after the typed characters
        input.selectionEnd = finalValue.length; // Set the selection end to the full suggestion length
        console.log("Final Value:", finalValue); // Log the updated input value
      }
    } else {
      console.log("No suggestion available."); // Log when no suggestion is found
      if (input.getAttribute("data-suggestion")) {
        input.removeAttribute("data-suggestion"); // Clear it if no suggestions
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const keywordInputs = document.getElementsByClassName("keywordInput"); // Get all elements with 'keywordInput' class
  
    // Loop through all keywordInput elements
    Array.from(keywordInputs).forEach(function (input) {
      input.addEventListener("input", function (e) {
        console.log("e.inputType:", e.inputType);
        let suggestionsArray;
  
        // Detect input type and assign the corresponding suggestions array
        if (this.classList.contains("job-input")) {
          suggestionsArray = jobSuggestions;
        } else if (this.classList.contains("location-input")) {
          suggestionsArray = locationsSuggestions;
        } else if (this.classList.contains("city-input")) {
          suggestionsArray = citySuggestions;
        } else if (this.classList.contains("state-input")) {
          suggestionsArray = stateSuggestions;
        } else {
          suggestionsArray = jobRequirementsSuggestions; // Default to job requirements if no specific input is matched
        }
  
        if (suggestionsArray) {
          autoSuggest(this, suggestionsArray); // Use suggestions array here
        }
      });
  
      input.addEventListener("keydown", function (e) {
        console.log("e.key:", e.key);
  
        const suggestion = this.getAttribute("data-suggestion");
        const inputValue = this.value ? this.value.toLowerCase() : ""; // Check if this.value is defined
  
        // Allow Backspace, Delete, and other keys to function normally
        if (
          e.key === "Backspace" ||
          e.key === "Delete" ||
          e.key === "Tab" ||
          e.key === "Enter"
        ) {
          // Prevent default only for Tab and Enter keys
          if (e.key === "Tab" || e.key === "Enter") {
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
    toast.className = `toast ${type}`; // Add classes for styling
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
    toast.style.zIndex = '1000';
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
    tagsContainer.classList.add("tagsContainer"); // Correct way to add a class


    // Search for the existing input within the container and hide it
    const existingInput = tagsContainer.querySelector("input[type='text']"); // Assuming this is the input you want to hide
    if (existingInput) {
        existingInput.style.display = "none"; // Hide the existing input
    }

        // Create a temporary input to handle tag entries, which will be hidden
        const tagInput = document.createElement("input");
        tagInput.type = "text";
        tagInput.className = "form-control tagInput mt-2";
        tagInput.placeholder = "Add a tag and press Enter";
        tagsContainer.appendChild(tagInput); // Append the input to the container
    
    // Create tags list container dynamically
    const tagsList = document.createElement("div");
    tagsList.className = "mt-2";

   
    // Append input and tag list to container
    tagsContainer.appendChild(tagInput);
    tagsContainer.appendChild(tagsList);

    // Create the Clear Tags button dynamically
    const clearTagsButton = document.createElement("button");
    clearTagsButton.className = "btn clearTagsButton mt-2";
    clearTagsButton.textContent = "Clear Tags";
    tagsContainer.appendChild(clearTagsButton);

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

    // Event listener to clear all tags
    clearTagsButton.addEventListener("click", () => {
        tagsList.innerHTML = ""; // Clear all tags
        updateHiddenInput(); // Update existing input after clearing tags
    });

    // Return input and clear button for external listeners
    return { tagInput, clearTagsButton, tagsList, addTag };
}
