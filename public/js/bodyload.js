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

/* Loader Container */

.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
}



/* Animated Resume */
.resume {
    width: 60px;
    height: 100px;
    background-color: #007bff;
    position: relative;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: -6px -4px 8px 0px rgb(0 0 0 / 54%);
    text-align: center;
    color: wheat;
}

/* Resume Lines (Represent Text Being Typed Out) */
.resume::before, .resume::after, .resume::third, .resume::4  {
    position: absolute;
    left: 0;
    right:0;
    margin:auto;
    border-radius: 2px;
    background-color: white;
}

/* First Line of Text */
.l1 {
    left: 0;
    right:0;
    margin:auto;
    top: 8px;
    height: 3px;
    width: 50px;
    position: absolute;
    background-color: #222222;
        animation: loadingText 1s infinite cubic-bezier(0.4, 0, 1, 1);
    }

/* Second Line of Text */
.l2 {
    left: 0;
    right:0;
    margin:auto;
 
        top: 16px;
    height: 3px;
    width: 30px;
    position: absolute;
    background-color: #222222;
         animation: loadingText 1.3s infinite cubic-bezier(0.4, 0, 1, 1);
    }

/* Third Line of Text */
.l3 {
    left: 0;
    right:0;
    margin:auto;
    top: 30px;
    height: 3px;
    width: 40px;
    position: absolute;
    background-color: #222222;
        animation: loadingText 1.6s infinite cubic-bezier(0.4, 0, 1, 1);
    }

.l4 {
    left: 0;
    right:0;
    margin:auto;
    top: 40px;
    height: 3px;
    width: 40px;
    position: absolute;
    background-color: #222222;
        animation: loadingText 1.9s infinite cubic-bezier(0.4, 0, 1, 1);
    }
    .l5 {
    left: 0;
    right:0;
    margin:auto;
    top: 50px;
    height: 3px;
    width: 40px;
    position: absolute;
    background-color: #222222;
        animation: loadingText 2.3s infinite cubic-bezier(0.4, 0, 1, 1);
    }
    .l6 {
    left: 0;
    right:0;
    margin:auto;
    top: 60px;
    height: 3px;
    width: 40px;
    position: absolute;
    background-color: #222222;
        animation: loadingText 2.6s infinite cubic-bezier(0.4, 0, 1, 1);
    }


.l7 {
    left: 0;
    right:0;
    margin:auto;
    top: 70px;
    height: 3px;
    width: 40px;
    position: absolute;
    background-color: #222222;
        animation: loadingText 2.8s infinite cubic-bezier(0.4, 0, 1, 1);
    }
    .l8 {
    left: 0;
    right:0;
    margin:auto;
    top: 80px;
    height: 3px;
    width: 40px;
    position: absolute;
    background-color: #222222;
    
    animation: loadingText 3.0s infinite cubic-bezier(0.4, 0, 1, 1);
    }
    



/* Loading Message Style */
.loading-message {
            color: #83bad9; /* Branding color */
            
    font-weight: 800;
    font-size: 2.0rem;
    text-shadow: -2px -1px 0px #007bff;
            font-family: 'Arial', sans-serif;
    text-align: center;

}

/* Loading Dots Animation */
@keyframes loadingText {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

/* Fade out Loader */
.loader.hidden {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s 0.5s, opacity 0.5s;
}

/* Smooth content loading */
body {
    opacity: 0;
    transition: opacity .5s ease-in-out;
}

body.loaded {
    opacity: 1;
}





    `;
    document.head.appendChild(style);
}


let dotsInterval;
// Function to create and inject loader with animated resume and dynamic dots
function createLoader(message = 'ReelCareer') {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loaderX';
    loaderDiv.classList.add('loader-container');
    loaderDiv.setAttribute('role', 'alert'); // Improved accessibility
    loaderDiv.setAttribute('aria-live', 'assertive');
    loaderDiv.setAttribute('aria-busy', 'true');


    // Create animated resume icon
    const resume = document.createElement('div');
    resume.classList.add('resume');

    const l1 = document.createElement('div');
    l1.classList.add('l1');
    l1.innerHTML="_____";

    const l2 = document.createElement('div');
    l2.classList.add('l2');
    l2.innerHTML="__"; 

    const l3 = document.createElement('div');
    l3.classList.add('l3');
    l3.innerHTML="____";

    const l4 = document.createElement('div');
    l4.classList.add('l4');
    l4.innerHTML="____";   

    const l5 = document.createElement('div');
    l5.classList.add('l5');
    l5.innerHTML="____";

    const l6 = document.createElement('div');
    l6.classList.add('l6');
    l6.innerHTML="____";

    const l7 = document.createElement('div');
    l7.classList.add('l7');
    l7.innerHTML="____";

    const l8 = document.createElement('div');
    l8.classList.add('l8');
    l8.innerHTML="_  _";


    // Create dynamic loading message with dots
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('loading-message');
    statusDiv.setAttribute('role', 'status');
    statusDiv.textContent = message;

    // Append resume and status message to loader div
    resume.appendChild(l3);
    resume.appendChild(l4);
    resume.appendChild(l6); 
    resume.appendChild(l6);

    
    loaderDiv.appendChild(resume);
    loaderDiv.appendChild(statusDiv);

    // Add loader to the body
    document.body.appendChild(loaderDiv);
}


function hideLoader() {
    const loader = document.getElementById('loaderX');
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
        }, 1500); // Adjusted to match opacity transition time (0.5s)
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
   // hideLoader(); // Hide loader first
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
