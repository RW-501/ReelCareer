

function scrollToDivOnLoad(divId = null) {
    // Ensure the page loads at the top by default
    window.scrollTo({ top: 0, behavior: "auto" });
  
    // If divId parameter is provided, scroll to that element
    if (divId) {
        // Wait for the document to load completely
        document.addEventListener("DOMContentLoaded", function () {
            const targetDiv = document.getElementById(divId);
            if (targetDiv) {
                // Smooth scroll to the target element
                targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              //  console.warn(`Element with ID "${divId}" not found.`);
            }
        });
    }
  }
  
   /*
  // Extract `divId` from URL if available
  const urlParams = new URLSearchParams(window.location.search);
  const divId = urlParams.get("scrollTo");
  
  // Pass the extracted divId to the function
  scrollToDivOnLoad(divId);
  */
  
  // Scroll to a specific div if ID is provided, for example "targetDivId"
  //scrollToDivOnLoad("targetDivId");

  scrollToDivOnLoad();