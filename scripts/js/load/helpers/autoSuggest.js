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
  let DEBOUNCe_DELAY = 300;

  // Fetch suggestions data from JSON file
  async function fetchSuggestions() {

  // Constants for configuration 
  let Main_SUGGESTIONS_URL = "https://reelcareer.co/scripts/json/suggestions.json";
  
    
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
   // console.error("Invalid input element or value is undefined");
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

window.autoSuggest = autoSuggest;

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
    }, DEBOUNCe_DELAY);
  
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