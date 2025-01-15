
    // Add click listener to lazy-image elements
    document.body.addEventListener("click", event => {
        const target = event.target;
          // Check if the clicked element is a lazy-image
          if (target.classList.contains("video-post")) {
            const imageSrc = target.src || target.getAttribute("data-videosrc");  

            const profileID = target.getAttribute("data-created-by-i-d");
            // Create the full-screen popup
            createImagePopup(imageSrc, profileID);
        }
 
  
        // Check if the clicked element is a lazy-image
        if (target.classList.contains("lazy-image")) {
            const imageSrc = target.src || target.getAttribute("data-src");  
            
            const mediaId = target.getAttribute("data-id");
            // Create the full-screen popup
            createImagePopup(imageSrc);
        }
    });
  
    // Function to create the full-screen popup
    const createImagePopup = (imageSrc, idURL) => {
        // Create the overlay
        const overlay = document.createElement("div");
        overlay.classList.add("fullscreen-popup");
  
        // Set the inner HTML of the overlay             <button class="more-images-button">View Profile</button>

        overlay.innerHTML = `
            <img src="${imageSrc}" class="popup-image" alt="Full-size image">
            <button class="close-button">&times;</button>
        `;
  
        // Append the overlay to the body
        document.body.appendChild(overlay);
  
        // Add functionality to the close button
        const closeButton = overlay.querySelector(".close-button");
        closeButton.addEventListener("click", () => overlay.remove());
  
        // Add functionality to the "More Videos" button
        const moreVideosButton = overlay.querySelector(".more-images-button");
        moreVideosButton.addEventListener("click", () => {
          window.location.href = `/u/?u=${idURL}`;
         //   alert("Redirect to videos or perform another action here.");
        });
    };

    
  