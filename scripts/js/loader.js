const DEBUG = true;

let loadCount = 0;
const loadedScripts = new Set();
const currentPath = window.location.pathname;

function logExecutionTime(scriptName, startTime) {
    if (DEBUG) {
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`${scriptName} initialized. Execution Time: ${executionTime.toFixed(2)} ms. Load Count: ${loadCount++}`);
    }
}

function loadScript(src, { async = false, defer = false, type = 'text/javascript' } = {}, callback) {
    if (loadedScripts.has(src)) {
        console.log(`Script already loaded: ${src}`);
        if (callback) callback();
        return;
    }

    const startTime = performance.now();
    const script = document.createElement('script');
    script.src = src;
    script.type = type;  // Set type to 'module' for ES6 modules
    script.async = async;
    script.defer = defer;
    script.onload = () => {
        loadedScripts.add(src);
        logExecutionTime(src, startTime);
        if (callback) callback();
    };
    script.onerror = () => {
        console.error(`Error loading script: ${src}`);
    };

    document.head.appendChild(script);
}

// Wait until a specific DOM element exists
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
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}

// Function to load stylesheets
function loadStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

// Load Bootstrap CSS
loadStylesheet("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");

// Load FontAwesome CSS
loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

// Load Main CSS
loadStylesheet("https://reelcareer.co/scripts/css/main.css");

// Load scripts dynamically after specific elements are available
function loadPageScripts() {
    // Logo Script (immediate)
    loadScript('https://reelcareer.co/scripts/js/load/elements/loadLogo.js', { async: false }, () => {
        logExecutionTime('Logo', performance.now());
    });

    
    loadScript('https://reelcareer.co/scripts/js/load/ecode.js', { async: true }, () => {
        logExecutionTime('ecode Script', performance.now());
    });

    // Load navBar.js as a module after <nav> is available
        loadScript('https://reelcareer.co/scripts/js/load/elements/navBar.js', { defer: false, type: 'module' }, () => {
            logExecutionTime('Navigation Bar', performance.now());
        });

    // Load footer.js after <footer> is available
    waitForElement('footer', () => {
        loadScript('https://reelcareer.co/scripts/js/load/elements/footer.js', { defer: true }, () => {
            logExecutionTime('Footer', performance.now());
        });
    });

    


    loadScript('https://reelcareer.co/scripts/js/load/loginState.js', { defer: true }, () => {
        logExecutionTime('loginState Script', performance.now());
    });


    // Load Toast Notifications after <main> is available
    waitForElement('main', () => {
        loadScript('https://reelcareer.co/scripts/js/load/elements/showToast.js', { async: true }, () => {
            logExecutionTime('Toast Notifications', performance.now());
        });
    });

    // Load Job Card Script
    loadScript('https://reelcareer.co/scripts/js/load/elements/jobCard.js', { async: true }, () => {
        logExecutionTime('Job Card', performance.now());
    });

    loadScript('https://reelcareer.co/scripts/js/load/safe.js', { async: true }, () => {
        logExecutionTime('Safety Script', performance.now());
    });

    loadScript('https://reelcareer.co/scripts/js/load/helpers.js', { async: true }, () => {
        logExecutionTime('Helper Script', performance.now());
    });



    loadScript('https://reelcareer.co/scripts/js/load/functions/uName.js', { defer: true }, () => {
        logExecutionTime('uName Script', performance.now());
    });






    loadScript('https://reelcareer.co/scripts/js/load/elements/similar.js', { defer: true }, () => {
        logExecutionTime('similar Script', performance.now());
    });




        loadScript('https://reelcareer.co/scripts/js/load/auth.js', { async: false, type: 'module'  }, () => {
            logExecutionTime('auth Script', performance.now());
        });
    
    




    loadScript('https://reelcareer.co/bot/js/chatbot.js', { defer: true }, () => {
        logExecutionTime('chatBot Script', performance.now());
    });


    if (currentPath.includes('u/')) {
        waitForElement('main', () => {
        loadScript('https://reelcareer.co/scripts/js/load/functions/rollIn.js', { defer: true }, () => {
            logExecutionTime('rollIn Script', performance.now());
        });
    });
    }


    const isTargetPage = currentPath === "/" || currentPath === "/index.html" ||
                          currentPath.includes('jobs') || currentPath.includes('reels') || currentPath.includes('views');
    
    if (isTargetPage) {
        // Load interest.js as a module
        loadScript('https://reelcareer.co/scripts/js/load/helpers/interest.js', { async: true, type: 'module' }, () => {
            logExecutionTime('Interest Script', performance.now());
        });

        // Load trackers.js as a module
        loadScript('https://reelcareer.co/scripts/js/load/helpers/trackers.js', { defer: true, type: 'module' }, () => {
            logExecutionTime('Trackers Script', performance.now());
        });

        loadScript('https://reelcareer.co/scripts/js/load/helpers/censorWord.js', { defer: true }, () => {
            logExecutionTime('censorWord Script', performance.now());
        });


    }





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
}

// Initialize page scripts after DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadPageScripts);













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