





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
    const isHomePage = currentPage === '/index.html' || 
                       currentPage === '/index' || 
                       currentPage === '' || 
                       currentPage === '/';

    let adjustLinkURL = (isHomePage) ? '/views/' : '';
    let adjustLinkHomeURL = (isHomePage) ? '' : '/';
       // Pages where we don't want to show the navbar

    // Check specific paths
    if (currentPage.includes("/public")) {
        adjustLinkURL = "/public/";
    } 
    if (currentPage.includes("/views")) {
        adjustLinkURL = "/views/";
    }

    return { isHomePage, currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages };
}

// scripts.js
const {isHomePage, currentPage, adjustLinkURL, adjustLinkHomeURL, excludedPages } = getAdjustedLinks();



//console.log(adjustLinkURL, adjustLinkHomeURL);

       /*
       console.log("nav currentPage   ",currentPage);
        console.log("nav isHomePage   ",isHomePage);
        console.log("nav adjustLinkURL   ",adjustLinkURL);
      //  console.log("nav navbarClass   ",navbarClass);
        console.log("nav adjustLinkHomeURL   ",adjustLinkHomeURL);

console.log("nav currentPage   ",currentPage);
console.log("nav isHomePage   ",isHomePage);
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





// Utility variables
let viewStartTime;
let locationData;
let ipAddress;


window.userLocationService = function() {

//window.userLocationService = (function () {
    const ipAPI = 'https://api.ipify.org?format=json';
    const locationAPI = 'https://ipapi.co';

    // Fetch the user's IP address
    const getUserIP = async () => {
        try {
            const response = await fetch(ipAPI);
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    };

    // Fetch the user's location based on IP address
    const getUserLocationByIP = async (ip) => {
        try {
            const response = await fetch(`${locationAPI}/${ip}/json/`);
            const data = await response.json();
            return {
                city: data.city || 'N/A',
                state: data.region || 'N/A',
                zip: data.postal || 'N/A',
                country: data.country_name || 'N/A'
            };
        } catch (error) {
            console.error('Error fetching location by IP:', error);
            return null;
        }
    };

    // Main function to get IP and location together
    const getUserIPAndLocation = async () => {
        try {
            ipAddress = sessionStorage.getItem('userIP');
            locationData = JSON.parse(sessionStorage.getItem('userLocation'));

            // If IP or location are not cached, fetch them
            if (!ipAddress || !locationData) { // Fixed condition here
                ipAddress = await getUserIP();
                locationData = await getUserLocationByIP(ipAddress);

                console.log("locationData  ",locationData);


                // Cache in session storage for the current session
                if (ipAddress && locationData) {
                    sessionStorage.setItem('userIP', ipAddress);
                    sessionStorage.setItem('userLocation', JSON.stringify(locationData));
                }
            }

            return { ipAddress, locationData };
        } catch (error) {
            console.error('Error retrieving user IP and location:', error);
            return null;
        }
    };

    // Expose only the main function
    return {
        getUserIPAndLocation
    };
}();

// Function to set the last internal page
function setInternalPageSource() {
    sessionStorage.setItem('lastInternalPage', window.location.href);
}

// Function to start tracking the view time
function startViewTimer() {
    viewStartTime = Date.now();
}

// Determine the source of the visit
const getViewSource = () => {
    const externalSource = document.referrer && !document.referrer.includes(window.location.origin)
        ? document.referrer
        : null;
    const internalSource = sessionStorage.getItem('lastInternalPage');
    return externalSource || internalSource || 'Direct Visit';
};

// Function to initialize user IP and location data
async function attachTrackingListeners() {
    try {
        const { ipAddress: ip, locationData: location } = await userLocationService.getUserIPAndLocation(); // Fixed destructuring
        ipAddress = ip;
        locationData = location;

        setTrackingListeners(ipAddress);
    } catch (error) {
        console.error("Error fetching user IP and location:", error);
    }
}

// Function to determine the correct `ViewedBy` field based on the URL
// Function to determine the correct `ViewedBy` field based on the URL
function getViewedByField() {
    const path = window.location.pathname;
    const page = path === '/' || path === '/index.html' ? 'home' : path.split('/').filter(Boolean).pop();
    
    return `${page}ViewedBy`;
}


// Function to update view data on unload or visibility change
 async function updateViewData(ipAddress, timer, exitTrack) {
    const viewEndTime = Date.now();
    const durationOfView = (viewEndTime - viewStartTime) / 1000;
    const viewedByField = getViewedByField();

   // console.log(`${ipAddress} ipAddress ???????? .`);

    if (!ipAddress) {
        console.error("Missing IP address. View data not recorded.");
        return;
    }

    // Dynamically set the field for the viewed page
    const viewData = {
        [viewedByField]: {
            viewDate: new Date().toISOString(),
            viewMethod: navigator.userAgentData?.mobile ? "mobile" : "desktop",
            durationOfView: durationOfView,
            contactViews: increment(1),
            viewSource: getViewSource(),
            timer: timer,
            exitTrack: exitTrack
        },
        ipAddress,
        ...locationData,
        lastViewDate: new Date().toISOString(),
        userActivitiesCount: increment(1),
        totalDuration: increment(durationOfView),
        userBlocked: false
    };

    try {
        await setDoc(doc(db, 'Analytics', ipAddress), viewData, { merge: true });
        console.log(`${viewedByField} data updated successfully.`);
    } catch (error) {
        console.error(`Error updating ${viewedByField} data:`, error);
    }
}

// Attach event listeners for tracking
 function setTrackingListeners(ipAddress) {
    window.addEventListener('beforeunload', setInternalPageSource);
    window.addEventListener('load', startViewTimer);
    //console.log("startViewTimer");
    let timer = 20000;

    triggerUpdateWithTimeout(ipAddress, timer);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
         // console.log("TrackingListeners  last");

            updateViewData(ipAddress, '', "offLoad");
        }
    });
}


 // Define the  function to check if a specific keyword is in the URL
 window.checkUrl = function(keyword) {
    // Get the current URL
    const currentUrl = window.location.href;
   // console.log("currentUrl:", currentUrl);
    //console.log("keyword:", keyword);
  
    // Return true if the keyword is found in the URL, otherwise false
    return currentUrl.includes(keyword);
  };



// Function to trigger the update after 20 seconds
function triggerUpdateWithTimeout(ipAddress, time) {
    
    // Set a timeout for 20 seconds (20000 milliseconds)
    setTimeout(() => {
      // Call the updateViewData function after the delay
      updateViewData(ipAddress, time, 'timeOut');
    }, time);  // 20,000 milliseconds = 20 seconds
  }
  




  document.addEventListener("DOMContentLoaded", () => {

  attachTrackingListeners() 

});
  
    

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



