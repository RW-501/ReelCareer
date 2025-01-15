
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
    // Create the overlay
    const overlay = document.createElement("div");
    overlay.classList.add("fullscreen-popup");

    // Determine whether the media is an image or video based on the file extension or MIME type
    const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(mediaSrc);
    const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(mediaSrc);
    
console.log("mediaSrc  ",mediaSrc);

    // If it's an image, create an image popup
    if (isImage || type == "image") {
        overlay.innerHTML = `
            <img src="${mediaSrc}" class="popup-image" alt="Full-size image">
            <button class="close-button">&times;</button>
            <button class="more-images-button">View Profile</button>
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
            <button class="more-images-button">View Profile</button>
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
    const moreVideosButton = overlay.querySelector(".more-images-button");
    moreVideosButton.addEventListener("click", () => {
        window.location.href = `/u/?u=${idURL}`;
        // alert("Redirect to videos or perform another action here.");
    });
};

  window.createMediaPopup = createMediaPopup;