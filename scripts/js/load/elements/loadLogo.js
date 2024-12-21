/*
<link rel="prefetch" href="next-page">

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



// Function to create and inject loader with text logo and animation
function createLoader(message = "ReelCareer") {
    const loaderDiv = document.createElement("div");
    loaderDiv.id = "loaderX";
    loaderDiv.classList.add("loader-container");
    loaderDiv.setAttribute("role", "alert");
    loaderDiv.setAttribute("aria-live", "assertive");
    loaderDiv.setAttribute("aria-busy", "true");
  
    // Create animated text logo
    const logo = document.createElement("div");
    logo.classList.add("text-logo");
    logo.innerText = message;
  
    // Append the logo to the loader
    loaderDiv.appendChild(logo);
  
    // Append loader to body
    document.body.appendChild(loaderDiv);
  }
  
  // Inject the styles for loader and text logo
  function addStyles() {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
    html {
    background-color: #fff;
    }
      /* Loader Container */
      .loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f4f4f4;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
      }
  
      /* Fading Text Logo */
      .text-logo {
      color: #639ad4;
      font-weight: 700;
      -webkit-text-stroke: thin;
      font-size: xx-large;
      font-variant: small-caps;
              font-size: 2.5rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: fadeLogo 2s infinite alternate;
      }
  
      /* Fading animation */
      @keyframes fadeLogo {
          0% { opacity: 1; }
          100% { opacity: 0.5; }
      }
  
      /* Fade out Loader */
      .loader.hide {
          opacity: 0;
          visibility: hidden;
          transition: visibility 0s 0.5s, opacity 0.5s;
      }
  
      /* Smooth content loading */
      body {
          opacity: 0;
          visibility: hidden;
          transition: opacity .5s ease-in-out;
      }
  
      body.loaded {
          opacity: 1;
          visibility: visible;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Call the functions to initialize the loader
  addStyles();
  createLoader("ReelCareer");
  
    let pauseTime = false;
    
    let loaderTimer = 700;
   // console.log(" createLoader();   ");
  
    function setLoaderTimer(loaderTimer) {
      setTimeout(() => {
        hideLoader(); // Hide loader first
        pauseTime = false;
      }, loaderTimer);
  
      function hideLoader() {
       // console.log("pauseTime   ", pauseTime);
        if (pauseTime === false) {
          const loader = document.getElementById("loaderX");
          loader.classList.add("hide");
          loader.remove();
         // console.log(" loader.remove();   ");
  
        }
        }
    }
    
    function showLoader(timer = 700) {
      pauseTime = false;
      createLoader(); 
      setLoaderTimer(timer);
    }
  
    // Hide loader when the window fully loads
    window.addEventListener("load", () => {
      document.body.classList.add("loaded"); // Then show content
    setLoaderTimer(1000);
    });
  