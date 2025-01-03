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
    if (document.querySelector(selector)) {
        callback();
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector(selector)) {
                obs.disconnect();
                callback();
            }
        });
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
}

preLoadPageScripts();
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

    // Load Toast Notifications after <main> is available
    waitForElement('main', () => {
        loadScript('https://reelcareer.co/scripts/js/load/elements/showToast.js', { defer: true }, () => {
            logExecutionTime('Toast Notifications', performance.now());
        });
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