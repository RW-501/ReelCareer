  
  function rollInAnimations(config = {}) {
    // Default configuration
    let {
      delayBetweenDivs = 1000, // Delay between div animations (ms)
      initialBodyDelay = 1000, // Delay before showing body (ms)
      animationDuration = 1000, // Animation duration (ms)
      animationTimingFunction = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Easing function for bounce effect
      hiddenClass = 'hide', // Class to hide body
      showClass = 'show',
    } = config;

 //   console.log('rollInAnimations config:', config);

    // Inject CSS Styles
    const loadingStyle = document.createElement('style');
    loadingStyle.innerHTML = `
      /* Hide body initially */
      body.${hiddenClass} { 
          opacity: 0; 
          overflow: hidden;
      }
  
      /* Hidden state for .main child divs */
      main > div {
          opacity: 0;
          transform: translateX(-100%);
          transition: opacity ${animationDuration}ms ${animationTimingFunction}, 
                      transform ${animationDuration}ms ${animationTimingFunction};
      }
  
      /* Roll-in effect */
      main > div.${showClass} {
          opacity: 1;
          transform: translateX(0);
      }
    `;
    document.head.appendChild(loadingStyle);

    const mainDivs = document.querySelectorAll('main > div');
    const mainContainer = document.querySelector('main');

    // Check if elements exist
    if (!mainDivs.length) {
   //   console.warn('No child divs found in .main container for animations.');
      return;
    }

    // Hide main container initially
    mainContainer.classList.add(hiddenClass);
    mainContainer.setAttribute('aria-hidden', 'true');

    // Reveal main container and trigger roll-in animations
    setTimeout(() => {
      mainContainer.classList.remove(hiddenClass);
      mainContainer.removeAttribute('aria-hidden');
    //  console.log('Main container revealed, starting roll-in animations...');

      // Sequentially add the "roll-in" class to each div with a delay
      mainDivs.forEach((div, index) => {
        setTimeout(() => {
          div.classList.add(showClass);
         // console.log(`Div #${index + 1} roll-in animation triggered.`);
        }, index * delayBetweenDivs);
      });
    }, initialBodyDelay);
  }

        
  rollInAnimations();

  

  