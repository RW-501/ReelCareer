





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


function getAdjustedLinks() {
    const excludedPages = ['/indexxxx.html', '/aboutxx.html'];
    const currentPage = window.location.pathname;

    // Define if the root is at the home page or deeper directories
    const isHomePage = currentPage === '/ReelCareer/index.html' || 
                       currentPage === '/ReelCareer/index' || 
                       currentPage === '/ReelCareer/' || 
                       currentPage === '' || 
                       currentPage === '/';

    let adjustLinkURL = (isHomePage) ? '/ReelCareer/views/' : '';
    let adjustLinkHomeURL = (isHomePage) ? '' : '/ReelCareer/';
       // Pages where we don't want to show the navbar

    // Check specific paths
    if (currentPage.includes("/ReelCareer/public")) {
        adjustLinkURL = "/ReelCareer/public/";
    } 
    if (currentPage.includes("/ReelCareer/views")) {
        adjustLinkURL = "/ReelCareer/views/";
    }

    return { currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages };
}

// main.js
const { currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages } = getAdjustedLinks();
//console.log(adjustLinkURL, adjustLinkHomeURL);

       /* 
       console.log("nav currentPage   ",currentPage);
        console.log("nav isHomePage   ",isHomePage);
        console.log("nav adjustLinkURL   ",adjustLinkURL);
        console.log("nav navbarClass   ",navbarClass);
        console.log("nav adjustLinkHomeURL   ",adjustLinkHomeURL);
*/
        


 function addFavicons() {
    const head = document.head;

    // Standard Favicon
    const faviconStandard = document.createElement('link');
    faviconStandard.rel = 'icon';
    faviconStandard.type = 'image/x-icon';
    faviconStandard.href = adjustLinkHomeURL+'images/favicons/favicon.ico';
    head.appendChild(faviconStandard);

    // 32x32 Favicon
    const favicon32 = document.createElement('link');
    favicon32.rel = 'icon';
    favicon32.type = 'image/png';
    favicon32.sizes = '32x32';
    favicon32.href = adjustLinkHomeURL+'images/favicons/favicon-32x32.png';
    head.appendChild(favicon32);

    // 16x16 Favicon
    const favicon16 = document.createElement('link');
    favicon16.rel = 'icon';
    favicon16.type = 'image/png';
    favicon16.sizes = '16x16';
    favicon16.href = adjustLinkHomeURL+'images/favicons/favicon-16x16.png';
    head.appendChild(favicon16);

    // Apple Touch Icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = adjustLinkHomeURL+'images/favicons/apple-touch-icon.png';
    head.appendChild(appleTouchIcon);

    // Android Favicon (192x192)
    const androidFavicon192 = document.createElement('link');
    androidFavicon192.rel = 'icon';
    androidFavicon192.type = 'image/png';
    androidFavicon192.sizes = '192x192';
    androidFavicon192.href = adjustLinkHomeURL+'images/favicons/android-chrome-192x192.png';
    head.appendChild(androidFavicon192);

    // Chrome Favicon (512x512)
    const androidFavicon512 = document.createElement('link');
    androidFavicon512.rel = 'icon';
    androidFavicon512.type = 'image/png';
    androidFavicon512.sizes = '512x512';
    androidFavicon512.href = adjustLinkHomeURL+'images/favicons/android-chrome-512x512.png';
    head.appendChild(androidFavicon512);
}

// Call the function to add favicons
addFavicons();






// Function to fetch the user's IP address and location
const getUserIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
};

const getUserLocationByIP = async (ip) => {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return {
            city: data.city,
            state: data.region,
            zip: data.postal,
            country: data.country_name,
        };
    } catch (error) {
        console.error('Error fetching location by IP:', error);
        return null;
    }
};







    

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


// Check Local Storage for User Location Data
function checkLocalStorageForLocation() {
    const storedData = localStorage.getItem('userLocation');
    if (storedData) {
        const decryptedData = decrypt(storedData);
        return decryptedData; // Return the decrypted data
    }
    return null; // No data found
}


// Function to get user info and store it in local storage
async function getUserInfo() {
    let userLocation = checkLocalStorageForLocation();

    if (!userLocation) {
        // User location not found, retrieve it
        const ip = await getUserIP();
        if (!ip) {
            console.error("Unable to retrieve IP address.");
            return;
        }

        userLocation = await getUserLocationByIP(ip);
        if (userLocation) {
            console.log(`City: ${userLocation.city}, State: ${userLocation.state}, ZIP Code: ${userLocation.zip}`);

            // Encrypt and store the data in local storage
            const encryptedData = encrypt({
                ip: ip,
                city: userLocation.city,
                state: userLocation.state,
                zip: userLocation.zip
            });
            localStorage.setItem('userLocation', encryptedData);
        } else {
            console.log("Could not retrieve location.");
        }
    } else {
     //   console.log(`Retrieved from Local Storage: City: ${userLocation.city}, State: ${userLocation.state}, ZIP Code: ${userLocation.zip}`);
    }
    userINFO = userLocation

    return userINFO;
}

getUserInfo();


console.log("userINFO  ",userINFO);
