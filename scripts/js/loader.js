


/* Documentation */

/**
 * Toggles debugging mode for logging script execution details.
 */
const DEBUG = false;

/**
 * Tracks the number of loaded scripts.
 */
let loadCount = 0;

/**
 * Tracks the total file size of loaded scripts in KB.
 */
let totalFileSize = 0;

/**
 * Tracks the page load start time for performance measurement.
 */
let pageStartTime = performance.now();

/**
 * Maintains a set of loaded scripts to prevent duplicate loading.
 */
const loadedScripts = new Set();

/**
 * Stores the current page's path for conditional script loading.
 */
const currentPath = window.location.pathname;

/**
 * Logs the execution time and file size of a script and tracks overall page load statistics.
 * @param {string} scriptName - Name or URL of the script.
 * @param {number} startTime - The script's load start time.
 * @param {string} fileSize - The file size of the script in KB.
 */
function logExecutionTime(scriptName, startTime, fileSize) {
    if (DEBUG) {
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(
            `${scriptName} initialized. Execution Time: ${executionTime.toFixed(2)} ms. File Size: ${fileSize}. Load Count: ${loadCount++}`
        );
    }

    if (fileSize !== "unknown" && fileSize !== "not available") {
        totalFileSize += parseFloat(fileSize);
    }

    if (loadCount === "end") {
        const pageEndTime = performance.now();
        const pageLoadTime = (pageEndTime - pageStartTime) / 1000;
        console.log(`Total Page Load Time: ${pageLoadTime.toFixed(2)} seconds.`);
        console.log(`Total Page Size: ${totalFileSize.toFixed(2)} KB.`);
    }
}

/**
 * Dynamically loads a script with optional attributes and callback function.
 * @param {string} src - URL of the script.
 * @param {Object} options - Attributes for the script (async, defer, type).
 * @param {function} callback - Callback executed after the script loads.
 */
async function loadScript(src, { async = false, defer = false, type = 'text/javascript' } = {}, callback) {
    if (loadedScripts.has(src)) {
        console.log(`Script already loaded: ${src}`);
        if (callback) callback();
        return;
    }

    const startTime = performance.now();
    let fileSize = "unknown";

    try {
        const response = await fetch(src, { method: 'HEAD' });
        if (response.ok) {
            fileSize = response.headers.get('Content-Length');
            if (fileSize) {
                fileSize = `${(fileSize / 1024).toFixed(2)} KB`;
            } else {
                fileSize = "not available";
            }
        } else {
            console.warn(`Unable to fetch file size for: ${src}`);
        }
    } catch (error) {
        console.error(`Error fetching file size for ${src}:`, error);
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.async = async;
    script.defer = defer;
    script.onload = () => {
        loadedScripts.add(src);
        logExecutionTime(src, startTime, fileSize);
        if (callback) callback();
    };
    script.onerror = () => {
        console.error(`Error loading script: ${src}`);
    };

    document.head.appendChild(script);
}

/**
 * Waits until a specific DOM element is available, then executes a callback function.
 * @param {string} selector - CSS selector for the target element.
 * @param {function} callback - Callback executed when the element becomes available.
 */
function waitForElement(selector, callback) {
    // Check if the element already exists
    const element = document.querySelector(selector);
    if (element) {
        callback();
    } else {
        // If the element doesn't exist, set up a MutationObserver
        const observer = new MutationObserver((mutations, obs) => {
            // Check if the element appears
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();  // Disconnect the observer once the element is found
                callback();
            }
        });
        
        // Observe changes to the document body, including all child nodes and subtree
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

/**
 * Dynamically loads a stylesheet into the document.
 * @param {string} href - URL of the stylesheet.
 */
function loadStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}




/** 
 * Function: preLoadPageScripts
 * ----------------------------
 * This function is responsible for loading critical scripts and stylesheets 
 * that are required before the main page scripts are initialized. It includes:
 * 
 * - Logo script for immediate display.
 * - Navigation bar, authentication, and meta scripts for foundational features.
 * - jQuery and Popper.js for library dependencies.
 * - Bootstrap, FontAwesome, and custom CSS for styling.
 * 
 * The function dynamically loads each resource with appropriate attributes 
 * (e.g., async, defer) and logs execution times, file sizes, and other metadata 
 * for performance tracking.
 */
function preLoadPageScripts() {









        // Load Toast Notifications after <main> is available
            loadScript('https://reelcareer.co/scripts/js/load/elements/showToast.js', { defer: true }, () => {
                logExecutionTime('Toast Notifications', performance.now());
            });
        
    
    // Logo Script (immediate)
    loadScript('https://reelcareer.co/scripts/js/load/elements/loadLogo.js', { async: false }, () => {
        logExecutionTime('Logo', performance.now());
    });

    loadScript('https://reelcareer.co/scripts/js/load/ecode.js', { async: false, defer: false }, () => {
        logExecutionTime('ecode Script', performance.now());

        loadScript('https://reelcareer.co/scripts/js/load/auth.js', { async: false, type: 'module' }, () => {
            logExecutionTime('auth Script', performance.now());

              // Load navBar.js as a module after <nav> is available
        loadScript('https://reelcareer.co/scripts/js/load/elements/navBar.js', { async: false, defer: false, type: 'module' }, () => {
            logExecutionTime('Navigation Bar', performance.now());
        });
        });

      
    });

    loadScript('https://reelcareer.co/scripts/js/load/meta/meta.js', { async: false }, () => {
        logExecutionTime('meta', performance.now());
    });

    loadScript('https://reelcareer.co/scripts/js/load/meta/schema.js', { async: false }, () => {
        logExecutionTime('schema', performance.now());
    });



    // Load favicons.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/meta/favicons.js', {  async: false }, () => {
        logExecutionTime('favicons Script', performance.now());
    });



    loadScript('https://code.jquery.com/jquery-3.5.1.slim.min.js', { async: false }, () => {
        logExecutionTime('jquery', performance.now());
    });

    loadScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js', { async: false }, () => {
        logExecutionTime('schema', performance.now());
    });

    // Load Bootstrap CSS
    loadStylesheet("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
    logExecutionTime('Bootstrap CSS', performance.now());

    // Load FontAwesome CSS
    loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
    logExecutionTime('FontAwesome CSS', performance.now());

    // Load Main CSS
    loadStylesheet("https://reelcareer.co/scripts/css/main.css");
    logExecutionTime('Main CSS', performance.now());

    if (currentPath.includes('obituaries')) {
        // Load obituaries CSS
        loadStylesheet("https://reelcareer.co/obituaries/style.css");
        logExecutionTime('Obituaries CSS', performance.now());
    }


    // Load formats.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/helpers/formats.js', { defer: true }, () => {
        logExecutionTime('formats Script', performance.now());
    });




}

preLoadPageScripts();


// Call waitForElement to check for the 'main' element
//waitForElement('main', () => {
    // Hide the body initially
 //   document.body.style.visibility = 'hidden';
//});

// Wait for the page to load
window.addEventListener('load', function() {
    // Once the page is fully loaded, make the body visible
    document.body.style.visibility = 'visible';
});






/** 
 * Function: loadPageScripts
 * -------------------------
 * This function dynamically loads JavaScript scripts after specific elements 
 * in the DOM become available. It ensures that scripts are loaded only when 
 * necessary, optimizing page performance and resource usage.
 * 
 * Key Features:
 * - Dynamically waits for specific elements (e.g., `<footer>`, `<main>`) 
 *   before loading associated scripts.
 * - Supports deferred and asynchronous loading of scripts.
 * - Logs the execution time for each script for performance monitoring.
 * - Includes condition-based script loading for targeted pages or paths.
 * 
 * Usage:
 * This function is automatically triggered after the `DOMContentLoaded` 
 * event is fired, ensuring that the DOM is fully parsed before script 
 * initialization.
 */
function loadPageScripts() {

    if (!currentPath.includes('obituaries')) {
    // Load footer.js after <footer> is available
    loadScript('https://reelcareer.co/scripts/js/load/elements/footer.js', { defer: false }, () => {
        logExecutionTime('Footer', performance.now());
    });
    }
    
    // Load loginState.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/loginState.js', { defer: true, type: 'module' }, () => {
        logExecutionTime('loginState Script', performance.now());
    });





    if (!currentPath.includes('obituaries')) {
        // Load Job Card Script
        loadScript('https://reelcareer.co/scripts/js/load/elements/jobCard.js', { async: true }, () => {
            logExecutionTime('Job Card', performance.now());
        });
    }
    

    // Load Safety Script
    loadScript('https://reelcareer.co/scripts/js/load/safe.js', { async: true }, () => {
        logExecutionTime('Safety Script', performance.now());
    });

    // Load Helper Functions
    loadScript('https://reelcareer.co/scripts/js/load/helpers.js', { async: true }, () => {
        logExecutionTime('Helper Script', performance.now());
    });

    // Load uName Script
    loadScript('https://reelcareer.co/scripts/js/load/functions/uName.js', { defer: true }, () => {
        logExecutionTime('uName Script', performance.now());
    });

    if (!currentPath.includes('obituaries')) {
    // Load interest.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/helpers/interest.js', { async: true, type: 'module' }, () => {
        logExecutionTime('Interest Script', performance.now());
    });

    // Load similar.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/elements/similar.js', { async: true, type: 'module' }, () => {
        logExecutionTime('Similar Script', performance.now());
    });
    }



    // Load autoSuggest.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/helpers/autoSuggest.js', { defer: true }, () => {
        logExecutionTime('autoSuggest Script', performance.now());
    });



    // Load tagSystem.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/helpers/tagSystem.js', { async: true }, () => {
        logExecutionTime('tagSystem Script', performance.now());
    });



    // Load googleAnalytics.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/meta/googleAnalytics.js', {  defer: true }, () => {
        logExecutionTime('googleAnalytics Script', performance.now());
    });



    loadScript('https://www.paypal.com/sdk/js?client-id=AcOZi3sszHkpUZJCLDRglEAusFk4W_siExTkNTWQhjMSFRxV7Prc81274wHQ8H-wYYfnWsm4p6Rw55Qp&currency=USD', {  type: 'module'  }, () => {
        logExecutionTime('paypal', performance.now());
    });




    // Load imagePopup.js as a module
    loadScript('https://reelcareer.co/scripts/js/load/helpers/imagePopup.js', {  defer: true }, () => {
        logExecutionTime('imagePopup Script', performance.now());
    });

    // Load Chatbot Script
    loadScript('https://reelcareer.co/bot/js/chatbot.js', { defer: true }, () => {
        logExecutionTime('chatBot Script', performance.now());
    });

    if (!currentPath.includes('obituaries')) {
    // Conditional: Load rollIn Script for specific user pages
    if (currentPath.includes('u/')) {
        waitForElement('main', () => {
            loadScript('https://reelcareer.co/scripts/js/load/functions/rollIn.js', { defer: true }, () => {
                logExecutionTime('rollIn Script', performance.now());
            });
        });
    }
    }

    // Conditional: Load trackers.js and censorWord.js for target pages
    const isTargetPage = currentPath === "/" || currentPath === "/index.html" ||
                         currentPath.includes('jobs') || currentPath.includes('reels') || currentPath.includes('views');
    if (isTargetPage) {
        if (!currentPath.includes('obituaries')) {
        // Load trackers.js as a module
        loadScript('https://reelcareer.co/scripts/js/load/helpers/trackers.js', { defer: true, type: 'module' }, () => {
            logExecutionTime('Trackers Script', performance.now());
        });
    }
        // Load censorWord Script
        loadScript('https://reelcareer.co/scripts/js/load/helpers/censorWord.js', { defer: true }, () => {
            logExecutionTime('censorWord Script', performance.now());
        });
    }
}

// Initialize page scripts after DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadPageScripts);








    /*
      
  let userDataSaved = await getUserData() || {};
  
  // To verify
  //console.log("userDataSaved   ", userDataSaved);



  */



    // Placeholder for additional async/defer scripts
    // Example:
    // loadScript('https://example.com/asyncScript.js', { async: true }, () => {
    //     logExecutionTime('Async Script', performance.now());
    // });


    // Example: Add more deferred scripts as needed
    /*
    if (window.location.pathname.includes('chat')) {
        loadScript('https://reelcareer.co/js/chatBot.js', () => {
            console.log('Chatbot initialized.');
        });
    }
    */


    






/*

  export {
    myFunction
  };
  
  import {
    myFunction
 } from 'https://reelcareer.co/js/navBar.js';
*/









// Object to store global callbacks by name
const globalCallbacks = {
    globalTimer: () => {
       // alert('Time is up! Action performed.');  // Display an alert when time is up
    },

    notifyUser: () => {
        console.log('Notification sent to user.');  // Log a notification message in the console
    },

   
    pingTimer: (pingURL, timerId) => {
   //     console.log('Pinging URL:', pingURL);
   //     console.log('timerId:', timerId);
        fetch(pingURL)
            .then(response => {
                if (response.status === 200) {
                    let message = 'Page is Ready... ';
                     showToast(message, 'info', 50000000, pingURL, true, "View Now");

                    // Perform action for 402 (e.g., notify user, start a process, etc.)
                    globalCallbacks.notifyUser();
                } else if (response.status === 404) {
                    showToast('Page is not a available yet.');
                    // If 404 is received, reset the timer and set it to 1 minute

                    
                    setGlobalTimer(30000, 'pingTimer', timerId, pingURL);  // Pass timeLeft and pingURL

                } else {
                    console.log('Received status code:', response.status);
                    // Handle other status codes or errors
                }
            })
            .catch(error => {
                console.error('Error pinging URL:', error);
                // Handle network errors
            });
    }
};

// Global timer function


function setGlobalTimer(countdownMilliseconds, callbackName, timerId, pingURL) {
    if (callbackName === "pingTimer" && !pingURL) {
        return;
    }
    
    
    const endTime = Date.now() + countdownMilliseconds;  // countdownMilliseconds is used directly
    const timerData = { endTime, callbackName, pingURL };  // Include pingURL in the timerData object
    console.log('??????????/  Pinging URL:', pingURL);

    // Store the timer data as a JSON string
    localStorage.setItem(`timer_${timerId}`, JSON.stringify(timerData));

    function updateTimer() {
        const storedData = JSON.parse(localStorage.getItem(`timer_${timerId}`));

        if (!storedData) {
            clearInterval(intervalId);
            return;
        }

        const now = Date.now();
        const timeLeft = Math.max(0, storedData.endTime - now);
        if (timeLeft <= 0) {

            if (globalCallbacks[storedData.callbackName]) {

                if (storedData.callbackName === 'pingTimer') {
                    globalCallbacks[storedData.callbackName](storedData.pingURL, timerId);
                }
                 else {
                    globalCallbacks[storedData.callbackName]();
                }
                clearInterval(intervalId);
                localStorage.removeItem(`timer_${timerId}`);
                console.log('removeItem');
    
            } else {
                console.error(`Callback function "${storedData.callbackName}" not found.`);
            }
        } else {
            console.log(`Timer ${timerId}: ${Math.ceil(timeLeft / 1000)} seconds remaining.`);
        }
    }

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer();  // Initial call
}



// Function to start the timer and update the clock
function startTimer(timerId, timeLeft) {
    console.log("timerId  ", timerId);

    const clockElement = document.getElementById(timerId);

    // Update clock every second
    const intervalId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            clockElement.innerText = 'Time\'s Up!';
        } else {
            clockElement.innerText = `${Math.ceil(timeLeft / 1000)} sec`;
        }
        timeLeft -= 1000;  // Decrease time by 1 second (1000 ms)
    }, 1000);
}

// Function to restore timers and create clocks for each
function restoreTimersOnPageLoad() {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('timer_')) {
            const timerData = JSON.parse(localStorage.getItem(key));
            const timerId = key.split('timer_')[1];
            console.log("timerData  ",timerData);

            if (timerData && timerData.endTime && timerData.callbackName) {
                let timeLeft = Math.max(0, timerData.endTime - Date.now());

                if (timeLeft > 0) {
                    console.log(`Restoring timer ${timerId} with ${Math.ceil(timeLeft / 1000)} seconds remaining.`);
                    setGlobalTimer(timeLeft, timerData.callbackName, timerId, timerData.pingURL);  // Pass timeLeft and pingURL
                } else {
                    console.log(`Timer ${timerId} has already expired.`);
                    console.log('removeItem');

                    localStorage.removeItem(key);
                }
            }
        }
    });
}







// Restore timers when the page is loaded
window.addEventListener('load', restoreTimersOnPageLoad);

window.setGlobalTimer = setGlobalTimer;

