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
        function addStyles() {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = `

                /* Page Loader Styles */
                .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out;
                }

                .loader.hidden {
                    opacity: 0;
                    visibility: hidden;
                }

                /* Smooth content loading */
                body {
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                body.loaded {
                    opacity: 1;
                }



                @keyframes shimmer {
                    0% { background-position: -200px 0; }
                    100% { background-position: 200px 0; }
                }

  
            `;
            document.head.appendChild(style);
        }

        // Function to create and inject loader into DOM
        function createLoader() {
            const loaderDiv = document.createElement('div');
            loaderDiv.id = 'loader';
            loaderDiv.classList.add('loader');
            loaderDiv.setAttribute('aria-live', 'polite');
            loaderDiv.setAttribute('aria-busy', 'true');

            const statusDiv = document.createElement('div');
            statusDiv.setAttribute('role', 'status');
            statusDiv.setAttribute('aria-label', 'Page is loading');
            statusDiv.textContent = 'Loading...';
console.log("created Loader   ???????????//");

            loaderDiv.appendChild(statusDiv);

            // Insert loader into the body
            document.body.appendChild(loaderDiv);
        }

        // Function to hide loader after page load
        function hideLoader() {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('hidden');
                console.log("hide Loader   ???????????//");

                // Remove from DOM after transition
                setTimeout(() => loader.remove(), 10000); // Adjusted to match opacity transition
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
            const content = document.body;
            content.classList.add('loaded'); // Then show content
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

// Loader timeout for slow network
setTimeout(() => {
    const loader = document.getElementById("loader");
    if (!document.body.classList.contains('loaded')) {
        loader.innerHTML = "Still loading, please wait...";
    }
}, 3000); // 3 seconds delay for timeout message




