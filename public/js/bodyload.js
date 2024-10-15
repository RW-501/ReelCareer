/*
<link rel="prefetch" href="next-page.html">

        // Function to dynamically add a prefetch link
        function addPrefetchLink(href) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;

            // Append the prefetch link to the head of the document
            document.head.appendChild(prefetchLink);
        }

        // Call the function to prefetch the next page
        addPrefetchLink('next-page.html');


*/

//import { Collapse } from "bootstrap";

// Function to inject CSS styles into the document
        // Function to add styles
// Function to add styles for loader and content
// Function to add styles for loader and content
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* Page Loader Styles */
        body {
            transition: opacity 2.0s ease-in-out;
        }

        .loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(82, 81, 81, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 2.0s ease-in-out;
        }

        .loader.hidden {
            opacity: 0;
            visibility: hidden;
        }

        /* Spinner Animation */
        .spinner {
            border: 8px solid rgba(255, 255, 255, 0.3);
            border-top: 8px solid #83bad9; /* Branding color */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
            position: relative;
            animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Center the logo with the spinner */
        .loader-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .loading-message {
            font-weight: bold;
            color: #5b6369; /* Improved contrast */
            text-align: center;   
             font-size: 2.50rem;
    color: #5b6369;
    text-shadow: -1px 1px 0px #83bad9;
    font-weight: 800;

        }

        /* ReelCareer.co logo */
        .logo {
            color: #83bad9; /* Branding color */
            margin-top: 10px; /* Space between spinner and logo */
            text-align: center;
            
    font-weight: 800;
    font-size: 3.0rem;
    text-shadow: 1px 0px 0px #6253e7;
        }

        /* Smooth content loading */
        body {
            opacity: 0;
            transition: opacity 2.0s ease-in-out;
        }

        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

const loadingTime = 3000;

// Function to create and inject loader into DOM
function createLoader(message = 'Loading') {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loader';
    loaderDiv.classList.add('loader');
    loaderDiv.setAttribute('role', 'alert'); // Improved accessibility
    loaderDiv.setAttribute('aria-live', 'assertive');
    loaderDiv.setAttribute('aria-busy', 'true');

    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader-container');

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.textContent = 'ReelCareer.co'; // Logo text

    const statusDiv = document.createElement('div');
    statusDiv.classList.add('loading-message');
    statusDiv.setAttribute('role', 'status');
    statusDiv.setAttribute('aria-label', message);

    console.log("Created Loader with message:", message);

    // Add spinner and logo to the loader container
    loaderContainer.appendChild(spinner);
    loaderContainer.appendChild(logo);

    // Add the container and status to the loader
    loaderDiv.appendChild(loaderContainer);
    loaderDiv.appendChild(statusDiv);
    document.body.appendChild(loaderDiv);

    // Start the "Loading" dots animation
    animateLoadingDots(statusDiv, message);
}

// Function to animate the loading dots
function animateLoadingDots(element, baseMessage) {
    let dotCount = 0;
    const maxDots = 3;

    setInterval(() => {
        dotCount = (dotCount + 1) % (maxDots + 1); // Cycle between 0 and 3 dots
        const dots = '.'.repeat(dotCount); // Generate dots string based on count
        element.textContent = `${baseMessage}${dots}`; // Update the text content
    }, loadingTime); // Adjust the speed of the dot animation (500ms per update)
}

// Function to hide loader after page load
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {


        // Remove from DOM after transition
        setTimeout(() => {
            try {
                loader.classList.add('hidden');
                console.log("Hiding Loader...");
                loader.remove();
                console.log("Loader removed successfully.");
            } catch (error) {
                console.error("Error removing loader:", error);
            }
        }, loadingTime); // Adjusted to match opacity transition time (0.5s)
    } else {
        console.warn("Loader not found, cannot hide.");
    }
}

// Initialize styles and loader on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    addStyles(); // Add styles first
    createLoader(); // Then create the loader
});

// Hide loader when the window fully loads
window.addEventListener('load', () => {
    hideLoader(); // Hide loader first
    document.body.classList.add('loaded'); // Then show content
});














function addStyles2() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* Page Loader Styles */
/* Loader Styles for Lazy Images */
.lazy-load {
    display: block; /* Make sure the images are block elements */
    width: 100%; /* Make images responsive */
    height: auto; /* Maintain aspect ratio */
    opacity: 0; /* Start invisible for fade-in effect */
    transition: opacity 0.5s ease-in-out; /* Smooth transition for fade-in */
}

/* Fade-in effect after image loads */
.lazy-load.fade-in {
    opacity: 1; /* Fade in when loaded */
}

/* Skeleton Loading Styles for Cards */
.card.skeleton {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite; /* Skeleton animation */
    border-radius: 4px; /* Rounded corners */
    height: 200px; /* Placeholder height */
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

    `;
    document.head.appendChild(style);
}

addStyles2();
// Lazy Load for Images using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1 // Trigger lazy loading when 10% of the element is visible
    };

    // Image lazy load observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Set the image source
                img.onload = () => img.classList.add('fade-in'); // Add a fade-in effect once loaded
                img.removeAttribute('data-src'); // Remove data-src after loading
                observer.unobserve(img); // Stop observing after it's loaded
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Card lazy load observer (removes skeleton once loaded)
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.remove('skeleton'); // Remove skeleton loading effect
                observer.unobserve(card); // Stop observing after it's loaded
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Fallback for browsers that do not support Intersection Observer
    if (!('IntersectionObserver' in window)) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src; // Load images immediately
        });
    }
});
