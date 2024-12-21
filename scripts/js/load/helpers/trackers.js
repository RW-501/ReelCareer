import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics, 
  googleProvider,onSnapshot ,  batch,
  facebookProvider,writeBatch ,
  getUserId // Export the function
  } from 'https://reelcareer.co/scripts/js/load/module.js';
  
  



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

    window.getUserIP = getUserIP;

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
            if (!ipAddress && !locationData) { // Fixed condition here
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

   // console.log("start tracking");
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

window.attachTrackingListeners = attachTrackingListeners;

function getScrollDepthPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // Calculate the percentage of page scrolled
  const scrollPercentage = (scrollTop + windowHeight) / fullHeight * 100;

  // Ensure percentage stays within 0-100 range
  return Math.min(100, Math.max(0, scrollPercentage.toFixed(2)));
}

let maxScrollDepth = 0;

window.addEventListener('scroll', () => {
    const currentScrollDepth = getScrollDepthPercentage();
    maxScrollDepth = Math.max(maxScrollDepth, currentScrollDepth);
   // console.log(`Current Scroll Depth: ${currentScrollDepth}%`);
  ///  console.log(`Max Scroll Depth: ${maxScrollDepth}%`);
});

// Function to determine the correct `ViewedBy` field based on the URL
function getViewedByField() {
  const { pathname, search, hash } = window.location;


  /*
  // Ensure valid pathname, search, and hash values before proceeding
  if (!pathname || !search || !hash) {
   // console.error("Missing necessary parts of the URL: pathname, search, or hash.");
    return "home"; // Return null or a default value
  }
*/

  // Extract the base path and remove leading/trailing slashes
  const path = pathname.split('/').filter(Boolean).join('-');

  // Normalize query parameters and hash fragments
  const query = new URLSearchParams(search).toString(); // e.g., "id=ybczQ0a4ohnpkk8EOnHi"
  const hashFragment = hash.replace('#', ''); // Remove '#' from hash

  // Construct a uniform field name
  let page = path || 'home'; // Default to 'home' for empty paths
  if (query) page += `-${query}`;
  if (hashFragment) page += `-${hashFragment}`;

  // Append 'ViewedBy' for the field name
  const fieldName = `${page}ViewedBy`;

 // console.log(fieldName); // Log for debugging

  return fieldName || 'defaultViewedBy'; // Fallback value if the field name is somehow invalid
}



// Function to update view data on unload or visibility change
 async function updateViewData(ipAddress, actionTrack, actionName, pageTitle, jobTitleName  ) {
    const viewEndTime = Date.now();
    const durationOfTheView = (viewEndTime - viewStartTime) / 1000;
    const viewedByField = getViewedByField();

  //  console.log(`${durationOfTheView} durationOfTheView ???????? .`);

    
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");

    let userData = '';

    if (storedUserData) {
      // Parse the stored data
       userData = getUserData();
      // console.log(`${userData} userData ???????? .`);

  } 

    if (!ipAddress && !userData.ipAddress ) {
      console.error("Missing IP address. View data not recorded.");
      return;
  }
    // Dynamically set the field for the viewed page
    const viewData = {
        [viewedByField]: {
            viewDate: new Date().toISOString(),
            viewMethod: navigator.userAgentData?.mobile ? "mobile" : "desktop",
            durationOfView: durationOfTheView,
            maxScrollDepth: maxScrollDepth,
            viewsCount: increment(1),
            viewSource: getViewSource(),
            actionTrack: actionTrack,
            actionName: actionName || "Click",
            pageTitle: pageTitle,
            jobTitleName: jobTitleName || "N/A",
            referrer: document.referrer || 'Direct',
            lastViewDate: new Date().toISOString(),
            entryURL: window.location.href,


        },
        ipAddress: ipAddress || userData.ipAddress,
        name: userData.name || 'N/A',
        displayName: userData.displayName || 'N/A',
        userID: userData.userID || 'N/A',
        lastLogin: userData.lastLogin || 'N/A',
        city: locationData.city || 'N/A',
        state: locationData.state || 'N/A',
        zip: locationData.zip || 'N/A',
        country: locationData.country || 'N/A',
        locationData: locationData,
        // Additional Data
        browser: navigator.userAgentData?.brands?.[0]?.brand || navigator.userAgent,
        os: navigator.platform || 'N/A',
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        referrer: document.referrer || 'Direct',
        entryURL: window.location.href,
        networkType: navigator.connection?.effectiveType || 'N/A',
        connectionSpeed: navigator.connection?.downlink || 'N/A',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'N/A',
        language: navigator.language || 'N/A',
        lastUpdate: new Date().toISOString(),
        userActivitiesCount: increment(1),
        totalDuration: increment(durationOfTheView),
        userBlocked: false
    };

    try {
        await setDoc(doc(db, 'Analytics', ipAddress || userData.ipAddress), viewData, { merge: true });
      //  console.log(`${viewedByField} data updated successfully.`);
    } catch (error) {
        console.error(`Error updating ${viewedByField} data:`, error);
    }
    viewStartTime = 0;
}

// Attach event listeners for tracking
 function setTrackingListeners(ipAddress) {
    window.addEventListener('beforeunload', setInternalPageSource);
    window.addEventListener('load', startViewTimer);
    //console.log("startViewTimer");
 

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
         // console.log("TrackingListeners  last");
         const pageTitle = document.title;

        // updateViewData(ipAddress, "visibilitychange", "N/A", pageTitle, "N/A"  );
        }
    });

  }

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


document.addEventListener('click', function (event) {

   

    let TrackingOn = true;
        // Get the clicked element
        const target = event.target;
        let interceptTimer = 300;
    
    //    console.log("TrackingOn: ", TrackingOn);
       // console.log("interceptTimer: ", interceptTimer);
    
       if (checkUrl("/backend/") || checkUrl("/backend")) {
        TrackingOn = false;
       }
    
    if(TrackingOn){
    
    
    
            // Get the page title
            const pageTitle = document.title;
           // console.log(`Page title: ${pageTitle}`);
            let jobTitleName = '';
    
            const jobTitle = document.getElementById("jobTitle");
            const appyJobTitle = document.getElementById("appyJobTitle");
            if (jobTitle){
              jobTitleName = jobTitle.innerText;
             // console.log(`Job title: ${jobTitleName}`);
             handleJobInput(jobTitleName);
    
            }
            if (appyJobTitle){
               jobTitleName = appyJobTitle.innerText;
    // Visiting the job
    handleJobInput(jobTitleName, "visit");
            }
          
    
        // Check if it's an anchor tag
        if (target.tagName === 'A' || target.closest('a')) {
            // Prevent default link navigation
            event.preventDefault();
    
            // Get the URL of the anchor
            const href = target.href || target.closest('a').href;
    
                 // Get the URL and inner text of the anchor
                 const linkText = target.innerText.trim();
       
                 
                 // Perform a custom action before navigating
             //    console.log(`Intercepted link: ${href}`);
              //   console.log(`Link text: ${linkText}`);
    
    
                 updateViewData(ipAddress, "link", linkText, pageTitle, jobTitleName  );
            // Timeout before proceeding
            setTimeout(() => {
                // Navigate to the URL
                window.location.href = href;
            }, interceptTimer); // Delay for 1 second
        } else if (typeof target.onclick === 'function' || target.hasAttribute('onclick')) {
            // Intercept buttons or elements with onclick handlers
            event.preventDefault();
    
            // Handle inline onclick attribute
            if (target.hasAttribute('onclick')) {
    
              // Get the onclick attribute and the inner text of the element
            const onclickAttr = target.getAttribute('onclick');
            const elementText = target.innerText.trim();
    
            // Log the onclick attribute and the inner text
           // console.log(`Intercepted inline onclick: ${onclickAttr}`);
          //  console.log(`Element text: ${elementText}`);
    
            updateViewData(ipAddress, onclickAttr, elementText, pageTitle, jobTitleName  );
    
                // Timeout before manually executing the inline onclick
                setTimeout(() => {
                    // Inline onclick execution (using eval)
                    eval(onclickAttr);
                }, interceptTimer); // Delay for 1 second
            } else if (typeof target.onclick === 'function') {
    
                     // Prevent default action
            event.preventDefault();
            // Get the onclick handler function
            const onclickFunction = target.onclick;
    
            // Extract the function name (if available)
            const functionName = onclickFunction.name || '(anonymous)';
    
            // Get the inner text of the element
            const elementText = target.innerText.trim();
    
        /*    // Log the function name and the element text
            console.log('Intercepted programmatic onclick handler.');
            console.log(`Function name: ${functionName}`);
            console.log(`Element text: ${elementText}`);
    */
            updateViewData(ipAddress, functionName, elementText, pageTitle, jobTitleName  );
                // Save the original onclick handler
                const handler = target.onclick;
    
                // Timeout before manually triggering the original handler
                setTimeout(() => {
                    handler.call(target, event); // Execute the handler in the correct context
                }, interceptTimer); // Delay for 1 second
            } if (target.tagName === 'BUTTON' && target.type === 'submit') {
              // Prevent the default submit action
              event.preventDefault();
      
              // Get the button text
              const buttonText = target.innerText.trim();
          //    console.log(`Intercepted button: ${buttonText}`);
      
          if (appyJobTitle){
            jobTitleName = appyJobTitle.innerText;
          // Applying for the job
    handleJobInput(jobTitleName, "apply");
          }
    
    
              // Find the closest form element
              const form = target.closest('form');
      
              if (form) {
                  // Log the form's name or id
                  const formName = form.getAttribute('name') || '(no name)';
                  const formId = form.id || '(no id)';
                 // console.log(`Associated form: Name = ${formName}, ID = ${formId}`);
    
                  const formNameId = formName || formId;
    
      
                  updateViewData(ipAddress, formNameId, buttonText, pageTitle, jobTitleName  );
    
                  // Delay before submitting the form
                  setTimeout(() => {
                //      console.log('Proceeding with the submit action after delay.');
                      form.submit(); // Trigger the form submission programmatically
                  }, interceptTimer); // Delay by 1 second
              } else {
                console.log(`Associated form: buttonText = ${buttonText}, target = ${target}`);
                // Check if the button is inside a class job-tags
                if (target.classList.contains('tags')) {
              
         
    
                  handleTagInput(buttonText);
                
    
          }
    
    
                  // Optionally, handle cases where no form is present
                  setTimeout(() => {
                //      console.log('No form submission performed.');
                  }, interceptTimer); // Delay for consistency
              }
          }
        }
    
    }
    
    });
    

    
if (checkUrl("/backend/") || checkUrl("/backend")) {
    console.log("Admin View");
    initializeAutoLogout();
  } else {
    console.log("User View");
    attachTrackingListeners();
  }
  