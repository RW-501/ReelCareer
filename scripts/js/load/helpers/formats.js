function formatLocation(location, options = {}) {
    const { part = "all", reverseOrder = false } = options;
  
    if (Array.isArray(location)) {
      // Reverse the order if needed
      if (reverseOrder) {
        location = location.reverse();
      }
  
      // Handle specific parts of the location
      if (part === "country") {
        return location[0] || "Unknown Country";
      }
      if (part === "state") {
        const state = location[1] || "Unknown State";
        return `<a class="loc-link" href="https://reelcareer.co/jobs/state/?s=${encodeURIComponent(state.toLowerCase().trim())}">${state}</a>`;
      }
      if (part === "county") {
        return location[2] || "Unknown County";
      }
      if (part === "city") {
        const city = location[location.length - 1] || "Unknown City";
        return `<a class="loc-link" href="https://reelcareer.co/jobs/city/?c=${encodeURIComponent(city.toLowerCase().trim())}">${city}</a>`;
      }
  
      // Default: Create links for each relevant part
      return location
        .map((part, index) => {
          if (index === 1) {
            // State link
            return `<a class="loc-link" href="https://reelcareer.co/jobs/state/?s=${encodeURIComponent(part.toLowerCase().trim())}">${part}</a>`;
          } else if (index === location.length - 1) {
            // City link
            return `<a class="loc-link" href="https://reelcareer.co/jobs/city/?c=${encodeURIComponent(part.toLowerCase().trim())}">${part}</a>`;
          } else {
            // Regular text
            return part;
          }
        })
        .join(", ");
    } else if (typeof location === "string") {
      if (location.trim() === "") {
        return "Not specified";
      }
      // Directly format string
      return `<a class="loc-link" href="https://reelcareer.co/jobs/location/?l=${encodeURIComponent(location.toLowerCase().trim())}">${location}</a>`;
    }
  
    return "Not specified";
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
      // Handle invalid or missing jobType values
      if (typeof jobType !== "string" || !jobType.trim()) {
      //  console.warn("Warning: jobType is invalid or empty.");
        return ; // Fallback value
      }
    
      // Normalize spacing, remove hyphens and underscores, and capitalize each word
      return jobType
        .replace(/[-_]/g, " ")              // Replace hyphens and underscores with spaces
        .split(/\s+/)                      // Split into words (handle multiple spaces)
        .map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )                                  // Capitalize first letter of each word
        .join(" ");                        // Join back into a single string
    }
    
    function formatTags(tags) {
      // Check if tags is defined and is an array
      if (Array.isArray(tags) && tags.length > 0) {
        // Map each tag to a string representing a button element
        return tags
          .map((tag) => {
            // Capitalize the first letter of the tag
    
    
            // Return a button as a string, using Bootstrap classes and tag redirection
            return `
              <button class="btn btn-secondary m-1 tags cap" onclick="window.location.href='https://reelcareer.co/job-listings?tag=${encodeURIComponent(
              )}'">
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
    
  
    
  