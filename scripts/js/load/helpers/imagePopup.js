
    // Add click listener to lazy-image elements
    document.body.addEventListener("click", event => {
        const target = event.target;
          // Check if the clicked element is a lazy-image
          if (target.classList.contains("video-post")) {
            const videoSrc = target.src || target.getAttribute("data-videosrc");  

            const profileID = target.getAttribute("data-created-by-i-d");
            // Create the full-screen popup
            createMediaPopup(videoSrc, profileID,"video");
        }
 
  
        // Check if the clicked element is a lazy-image
        if (target.classList.contains("lazy-image")) {
            const imageSrc = target.src || target.getAttribute("data-src");  
            
            const profileID = target.getAttribute("data-id");
            // Create the full-screen popup
            createMediaPopup(imageSrc, profileID,"image");
        }
    });
  
// Function to create the full-screen popup
const createMediaPopup = (mediaSrc, idURL, type) => {
    let overlay = document.getElementById("fullscreen-popup");
    
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("fullscreen-popup");
        overlay.id = "fullscreen-popup";
        document.body.appendChild(overlay);

        overlay.style.display = "block";
        overlay.style.visibility = "visible";
        overlay.style.opacity = 1;
    } else {
        // Ensure it is visible if it already exists
        overlay.style.display = "block";
        overlay.style.visibility = "visible";
        overlay.style.opacity = 1;

    }

    // Set the capacity to 1 if relevant
    const maxCapacity = 1;
    const currentChildren = overlay.childElementCount;
    if (currentChildren >= maxCapacity) {
        console.log("Maximum capacity reached. Not adding new content.");
    } else {
        // Logic to add content or elements into overlay
        console.log("Content can be added since capacity is not full.");
    }

    // Determine whether the media is an image or video based on the file extension or MIME type
    const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(mediaSrc);
    const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(mediaSrc);
    
console.log("mediaSrc  ",mediaSrc);

    // If it's an image, create an image popup
    if (isImage || type == "image") {
        overlay.innerHTML = `
            <img src="${mediaSrc}" class="popup-image" alt="Full-size image">
            <button class="close-button">&times;</button>
            <button class="view-profile-button">View Profile</button>
        `;
    }
    // If it's a video, create a video popup
    else if (isVideo || type == "video") {
        overlay.innerHTML = `
            <video class="popup-video" controls autoplay>
                <source src="${mediaSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <button class="close-button">&times;</button>
            <button class="view-video-button">View Profile</button>
        `;
    } else {
        // Handle unsupported media types
        console.error("Unsupported media type.");
        return;
    }

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Add functionality to the close button
    const closeButton = overlay.querySelector(".close-button");
    closeButton.addEventListener("click", () => overlay.remove());

    // Add functionality to the "More Videos" button
    const viewProfileButton = overlay.querySelector(".view-profile-button");
    viewProfileButton.addEventListener("click", () => {
        window.location.href = `https://reelcareer.co/u/?u=${idURL}`;
    });

    const viewVideoButton = overlay.querySelector(".view-video-button");
    viewVideoButton.addEventListener("click", () => {
        window.location.href = `https://reelcareer.co/watch/?v=${idURL}`;
    });

};

  window.createMediaPopup = createMediaPopup;