

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

  
  // Truncate text function
  function truncateText(text, maxLength, href) {
    return text.length > maxLength 
        ? text.substring(0, maxLength) + `... <a href="${href}">See More</a>` 
        : text;
}

window.truncateText = truncateText;


  // Function to show the modal
  function showModal(Modal) {
    console.log("showModal:");
  
    const modalElement = document.getElementById(Modal);
    //const modal = new bootstrap.Modal(modalElement);
    //modal.removeAttribute('inert');
    modalElement.classList.add("show"); // Add bootstrap's 'show' class
    modalElement.style.display = "initial";
    modalElement.setAttribute("aria-hidden", "false");
    modalElement.removeAttribute("hide");
  }
  
  window.showModal = showModal;



  function hideModal(Modal) {
    const modal = document.getElementById(Modal);
    console.log("hideModal:");
  
    //modal.setAttribute('inert', '');
    modal.classList.remove("show"); // Remove bootstrap's 'show' class
    modal.setAttribute("aria-hidden", "true");
    modal.classList.add("hide"); // Add a 'hide' class if needed
    //modal.style.display = "none";

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
  
  window.hideModal = hideModal;



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
window.removeUndefined = removeUndefined;



    

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


