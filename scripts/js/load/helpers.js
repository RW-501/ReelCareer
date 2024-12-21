

// Function to extract the state name from the URL (e.g., /jobs/state/ohio)
function getKeyFromURL(key) {
    // Get the full URL
    const urlParams = new URLSearchParams(window.location.search);
  
    // Get the value of the 's' parameter
    let segment = urlParams.get(key);
  
    if (!segment) return null;  // Return null if no state is found
  
    // Format the state name (capitalize the first letter of each word)
    segment = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
      console.log("segment ",segment);
    return segment;
  }
  
  window.getKeyFromURL = getKeyFromURL;
    

  
const convertFirestoreTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      console.error('Invalid timestamp:', timestamp);
      return 'Invalid Timestamp'; // Or you can return null or any default value you prefer
    }
  
    // Create a new Date object from the timestamp (seconds value)
    const date = new Date(timestamp.seconds * 1000); // Multiply by 1000 to convert to milliseconds
    return date.toLocaleString(); // Or you can use any formatting method you prefer
  };
  
  window.convertFirestoreTimestamp = convertFirestoreTimestamp;
  
  // Event listener to handle clicks outside dropdown to close it
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown && !dropdown.contains(e.target) && !e.target.closest(".dropdown-toggle")) {
      dropdown.classList.remove("open");
    }
  });

  
   // Define the  function to check if a specific keyword is in the URL
   function checkUrl(keyword) {
    // Get the current URL
    const currentUrl = window.location.href;
   // console.log("currentUrl:", currentUrl);
    //console.log("keyword:", keyword);
  
    // Return true if the keyword is found in the URL, otherwise false
    return currentUrl.includes(keyword);
  };
  
  window.checkUrl = checkUrl;