
// Load FontAwesome CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
document.head.appendChild(link);


// Load FontAwesome CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://reelcareer.co/scripts/css/main.css";
document.head.appendChild(link);

// Track loaded scripts to prevent duplicates
const loadedScripts = new Set();

function loadScript(src, callback) {
    if (loadedScripts.has(src)) {
        console.log(`Script already loaded: ${src}`);
        if (callback) callback();
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = 'module'; // Use "module" for ES6 modules
    script.onload = () => {
        console.log(`Script loaded successfully: ${src}`);
        loadedScripts.add(src);
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

// Load scripts dynamically after specific elements are available
function loadPageScripts() {
    // Logo Script (immediate)
    loadScript('https://reelcareer.co/scripts/js/load/loadLogo.js', () => {
        console.log('Logo initialized.');
    });

    // Load navBar.js after <nav> is available
    waitForElement('nav', () => {
        loadScript('https://reelcareer.co/scripts/js/load/navBar.js', () => {
            console.log('Navigation bar initialized.');
        });
    });

    // Load footer.js after <footer> is available
    waitForElement('footer', () => {
        loadScript('https://reelcareer.co/scripts/js/load/footer.js', () => {
            console.log('Footer initialized.');
        });
    });

    // Example: Add more deferred scripts as needed
    /*
    loadScript('https://reelcareer.co/js/showToast.js', () => {
        console.log('Toast notifications initialized.');
    });

    if (window.location.pathname.includes('chat')) {
        loadScript('https://reelcareer.co/js/chatBot.js', () => {
            console.log('Chatbot initialized.');
        });
    }
    */
}

// Initialize page scripts after DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadPageScripts);







/*

  export {
    myFunction
  };
  
  import {
    myFunction
 } from 'https://reelcareer.co/js/navBar.js';
*/