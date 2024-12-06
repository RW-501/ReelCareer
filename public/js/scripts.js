





// Function to inject CSS styles into the document
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* General Styles */

   /* Styles for the suggestion dropdown */

   input::selection {
    background: #d0eaff; /* Light blue background for the suggestion part */
    color: #000; /* Text color for the suggestion part */
}


@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.2rem; /* Increase the brand text size on mobile */
    }

    .nav-link {
        font-size: 0.9rem; /* Decrease the nav link text size */
    }

    .company-media img {
        width: 100%; /* Make company media images responsive */
        height: auto; /* Maintain aspect ratio */
    }

    /* Adjust video size on mobile */
    video {
        width: 100%;
        height: auto;
    }
}
@media (max-width: 768px) {
    body {
        font-size: 14px; /* Smaller text on mobile */
    }

    .navbar {
        flex-direction: column; /* Stack navbar items */
    }
}

@media (max-width: 576px) {
    .navbar-brand {
        font-size: 1.5rem; /* Adjust brand size */
    }
}

img {
    max-width: 100%;
    height: auto;
}
button, .nav-link {
    padding: 10px 15px;
    font-size: 16px;
}

        
    footer {
        margin-top: 50px;
    }
    footer p {
        margin-bottom: 0;
    }


    `;
    document.head.appendChild(style);
}





// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.googletagmanager.com/gtag/js?id=G-LBTK319K2X','ga');

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-LBTK319K2X');


 function addFavicons() {
    const head = document.head;

    // Standard Favicon
    const faviconStandard = document.createElement('link');
    faviconStandard.rel = 'icon';
    faviconStandard.type = 'image/x-icon';
    faviconStandard.href = 'https://reelcareer.co/images/favicons/favicon.ico';
    head.appendChild(faviconStandard);

    // 32x32 Favicon
    const favicon32 = document.createElement('link');
    favicon32.rel = 'icon';
    favicon32.type = 'image/png';
    favicon32.sizes = '32x32';
    favicon32.href = 'https://reelcareer.co/images/favicons/favicon-32x32.png';
    head.appendChild(favicon32);

    // 16x16 Favicon
    const favicon16 = document.createElement('link');
    favicon16.rel = 'icon';
    favicon16.type = 'image/png';
    favicon16.sizes = '16x16';
    favicon16.href = 'https://reelcareer.co/images/favicons/favicon-16x16.png';
    head.appendChild(favicon16);

    // Apple Touch Icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = 'https://reelcareer.co/images/favicons/apple-touch-icon.png';
    head.appendChild(appleTouchIcon);

    // Android Favicon (192x192)
    const androidFavicon192 = document.createElement('link');
    androidFavicon192.rel = 'icon';
    androidFavicon192.type = 'image/png';
    androidFavicon192.sizes = '192x192';
    androidFavicon192.href = 'https://reelcareer.co/images/favicons/android-chrome-192x192.png';
    head.appendChild(androidFavicon192);

    // Chrome Favicon (512x512)
    const androidFavicon512 = document.createElement('link');
    androidFavicon512.rel = 'icon';
    androidFavicon512.type = 'image/png';
    androidFavicon512.sizes = '512x512';
    androidFavicon512.href = 'https://reelcareer.co/images/favicons/android-chrome-512x512.png';
    head.appendChild(androidFavicon512);
}

// Call the function to add favicons
addFavicons();





    

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



document.addEventListener("DOMContentLoaded", () => {
    // Add click listener to lazy-image elements
    document.body.addEventListener("click", event => {
        const target = event.target;
  
        // Check if the clicked element is a lazy-image
        if (target.classList.contains("lazy-image")) {
            const imageSrc = target.src || target.getAttribute("data-src");  
             const mediaId = target.getAttribute("data-id");
  


            // Create the full-screen popup
            createImagePopup(imageSrc);
        }
    });
  
    // Function to create the full-screen popup
    const createImagePopup = (imageSrc) => {
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
          window.location.href = `/views/user?u=${mediaId}`;
         //   alert("Redirect to videos or perform another action here.");
        });
    };
  });
  
  