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
            background: rgba(255, 255, 255, 0.9);
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
            border-top: 8px solid #007bff; /* Branding color */
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
            font-size: 24px; /* Increased font size for better visibility */
            font-weight: bold;
            color: #333; /* Improved contrast */
            text-align: center;
        }

        /* ReelCareer.co logo */
        .logo {
            font-size: 36px; /* Logo size */
            font-weight: bold;
            color: #007bff; /* Branding color */
            margin-top: 10px; /* Space between spinner and logo */
            text-align: center;
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

// Function to create and inject loader into DOM
function createLoader(message = 'Loading...') {
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
    statusDiv.textContent = message;

    console.log("Created Loader with message:", message);

    loaderContainer.appendChild(spinner);
    loaderContainer.appendChild(logo);
    loaderDiv.appendChild(loaderContainer);
    loaderDiv.appendChild(statusDiv);
    document.body.appendChild(loaderDiv);
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
        }, 3000); // Adjusted to match opacity transition time (0.5s)
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

















// Lazy Load for Images using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1 // Trigger lazy loading when 10% of element is visible
    };

    // Image lazy load observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
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
                card.classList.remove('skeleton');
                observer.unobserve(card); // Stop observing after it's loaded
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });
});



