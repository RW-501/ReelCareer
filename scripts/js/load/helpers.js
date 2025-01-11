

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












async function convertTextToLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g; // Regex to match URLs

  // Helper function to fetch metadata for a URL
  async function fetchMetadataFromProxy(url) {
      try {
          
          // Ensure that the URL is HTTPS
          if (url.startsWith('http://')) {
              throw new Error('Insecure HTTP URL'); // Throw an error if URL is not HTTPS
          }

          // Fetch the raw HTML content of the URL
          const response = await fetch(url);

          // Log the response status and content type
        //  console.log("Response Status: ", response.status);
      //    console.log("Response Content-Type: ", response.headers.get("content-type"));

          // Check if the response is HTML
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("text/html")) {
              throw new Error(`Invalid content type: ${contentType}`);
          }

          // Get the HTML text from the response
          const htmlText = await response.text();

          // Parse the HTML using DOMParser
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');

          // Extract the metadata (title, description, image) from the meta tags
          const metadata = {
              title: doc.querySelector('title') ? doc.querySelector('title').textContent : url,
              description: doc.querySelector('meta[name="description"]') ? doc.querySelector('meta[name="description"]').getAttribute('content') : '',
              image: getImage(doc),
              url: url,
          };
          console.log("metadata: ", metadata);

          return metadata;
      } catch (error) {
          console.error("Error fetching metadata:", error.message);
          return { title: url, description: "", image: "", url };
      }
  }

  // Function to fetch image using different strategies
  function getImage(doc) {
      // Try fetching the image from various sources

      // 1. Open Graph (og:image)
      let image = doc.querySelector('meta[property="og:image"]') ? doc.querySelector('meta[property="og:image"]').getAttribute('content') : '';

      // 2. Twitter Card (twitter:image)
      if (!image) {
          image = doc.querySelector('meta[name="twitter:image"]') ? doc.querySelector('meta[name="twitter:image"]').getAttribute('content') : '';
      }

      // 3. Favicon (link[rel="icon"])
      if (!image) {
          image = doc.querySelector('link[rel="icon"]') ? doc.querySelector('link[rel="icon"]').getAttribute('href') : '';
      }

      // 4. First image found in the page (img tag)
      if (!image) {
          const firstImage = doc.querySelector('img') ? doc.querySelector('img').getAttribute('src') : '';
          if (firstImage) {
              image = firstImage.startsWith('http') ? firstImage : new URL(firstImage, doc.baseURI).href;
          }
      }

      return image || '';  // Return the first valid image found, or an empty string if none is found
  }

  // Process the text content of the contentDiv
  let parts = text.split(urlRegex);

  const fragment = document.createDocumentFragment();

  for (let part of parts) {
      if (urlRegex.test(part)) {
          let url = part.startsWith("http") ? part : `http://${part}`;

          // Check for mixed content and avoid fetching metadata for HTTP links
          if (url.startsWith('http://')) {
              // If the URL is HTTP, treat it as a plain link
              const linkElement = document.createElement('a');
              linkElement.href = url;
              linkElement.target = "_blank";
              linkElement.rel = "noopener noreferrer";
              linkElement.textContent = url;

              fragment.appendChild(linkElement);
          } else {
              const metadata = await fetchMetadataFromProxy(url);

              // Create a container for the preview
              const previewDiv = document.createElement("div");
              previewDiv.className = "link-preview";

              previewDiv.innerHTML = `
                  <a href="${metadata.url}" target="_blank" rel="noopener noreferrer">
                      <div class="preview-content">
                          ${metadata.image ? `<img src="${metadata.image}" alt="Link Image" class="preview-image">` : ""}
                          <div class="preview-text">
                              <div class="preview-title">${metadata.title}</div>
                              <p class="preview-description">${metadata.description}</p>
                          </div>
                      </div>
                  </a>
              `;

              fragment.appendChild(previewDiv);
          }
      } else {
          fragment.appendChild(document.createTextNode(part));
      }
  }

  // Replace the content of the div with the new HTML
//  contentDiv.innerHTML = ""; // Clear the current content
 // contentDiv.appendChild(fragment);

  return fragment;
}


window.convertTextToLinks = convertTextToLinks;