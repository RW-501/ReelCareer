class ScrollEffectObserver {
    constructor(options = {}) {
      // Initialize options for the observer
      this.targets = options.targets || [];  // Array of target elements (classes, IDs, etc.)
      this.observerOptions = {
        root: options.root || null,  // Optional root element for the observer
        rootMargin: options.rootMargin || '0px',  // Root margin for when elements are considered in viewport
        threshold: options.threshold || 0.5,  // When the observer triggers based on element visibility
      };
      this.effects = options.effects || {};  // The effect options to apply based on data attributes
      this.initObserver();  // Initialize the IntersectionObserver when the instance is created
    }
  
    // Function to apply the effect when an element enters or exits the viewport
    applyEffect(entry) {
      const target = entry.target;
      const effectType = target.dataset.effect;  // Get the effect type from the data attribute
      const effectOptions = this.effects[effectType] || {};  // Get the effect options from the provided configuration
  
      if (entry.isIntersecting) {
        // When the element is in the viewport
        target.style.transition = effectOptions.transition || 'all 0.8s ease';  // Set the default transition if none is provided
  
        // Switch based on the animation type configured for the element
        switch (effectOptions.animation) {
          case 'fade-in':
            target.style.opacity = 1;  // Fade-in animation
            break;
          case 'fade-out':
            target.style.opacity = 0;  // Fade-out animation
            break;
          case 'slide-in-left':
            target.style.transform = 'translateX(0)';  // Slide-in from the left
            break;
          case 'slide-in-right':
            target.style.transform = 'translateX(0)';  // Slide-in from the right
            break;
          case 'zoom-in':
            target.style.transform = 'scale(1)';  // Zoom-in effect
            break;
          case 'rotate':
            target.style.transform = 'rotate(0deg)';  // Rotate to 0 degrees
            break;
          case 'play-video':
            if (target.tagName === 'VIDEO') target.play();  // Play the video when in viewport
            break;
          case 'pause-video':
            if (target.tagName === 'VIDEO') target.pause();  // Pause the video when out of viewport
            break;
          default:
            if (effectOptions.custom) {
              effectOptions.custom(target);  // Custom effect if defined
            }
            break;
        }
      } else {
        // When the element exits the viewport
        if (effectOptions.resetOnExit) {
          this.resetEffect(target, effectOptions.animation);  // Reset the effect if resetOnExit is true
        }
      }
    }
  
    // Function to reset the element styles when it exits the viewport
    resetEffect(target, animation) {
        const resetStyles = {
            'fade-in': { opacity: 0 },  // Reset for fade-in (initial state)
            'fade-out': { opacity: 1 },  // Reset for fade-out (initial state)
            'slide-in-left': { transform: 'translateX(-100px)', opacity: 0 },  // Reset for slide-in-left (initial state)
            'slide-in-right': { transform: 'translateX(100px)', opacity: 0 },  // Reset for slide-in-right (initial state)
            'zoom-in': { transform: 'scale(0.8)', opacity: 0 },  // Reset for zoom-in (initial state)
            'rotate': { transform: 'rotate(45deg)', opacity: 0 },  // Reset for rotate (initial state)
            'play-video': { pause: true },  // Reset for play-video: pause the video when out of viewport
            'pause-video': {}  // No reset for pause-video (default state)
        };
    
        // Check if the element has an effect and reset accordingly
        const effectType = target.dataset.effect;
        if (resetStyles[effectType]) {
            // Apply the reset styles to return to initial state
            Object.assign(target.style, resetStyles[effectType]);
        }
    }
    
  
    // Function to initialize the observer and set up observation on target elements
    initObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => this.applyEffect(entry));  // Apply effects on each entry
      }, this.observerOptions);
  
      this.targets.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          const animationType = element.dataset.effect || 'fade-in';  // Default to fade-in if no effect is specified
          const initialStyles = {
            'fade-in': { opacity: 0 },  // Initial styles for fade-in
            'fade-out': { opacity: 1 },  // Initial styles for fade-out
            'slide-in-left': { transform: 'translateX(-100px)', opacity: 0 },  // Initial styles for slide-in-left
            'slide-in-right': { transform: 'translateX(100px)', opacity: 0 },  // Initial styles for slide-in-right
            'zoom-in': { transform: 'scale(0.8)', opacity: 0 },  // Initial styles for zoom-in
            'rotate': { transform: 'rotate(45deg)', opacity: 0 },  // Initial styles for rotate
          };
          // Apply initial styles based on the animation type
          Object.assign(element.style, initialStyles[animationType] || {});
          element.classList.add('observer'); // Add observer class to prevent interference with other classes
          observer.observe(element);  // Start observing the element
        });
      });
    }
  }
  /* 
  // Usage Example
  const scrollEffect = new ScrollEffectObserver({
    // Define the elements to observe: classes, IDs, and input types
    targets: ['.observer.fade-in-element', '#observer.slide-in-section',
         'input.observe-input', 'video.video-player', '.observer.custom-effect'],
    effects: {
      'fade-in': { animation: 'fade-in', transition: 'opacity 0.6s ease-in', resetOnExit: true },
      'fade-out': { animation: 'fade-out', transition: 'opacity 0.6s ease-out', resetOnExit: false },
      'slide-in-left': { animation: 'slide-in-left', transition: 'transform 0.8s ease', resetOnExit: true },
      'slide-in-right': { animation: 'slide-in-right', transition: 'transform 0.8s ease', resetOnExit: true },
      'zoom-in': { animation: 'zoom-in', transition: 'transform 0.7s ease', resetOnExit: true },
      'rotate': { animation: 'rotate', transition: 'transform 1s ease-in-out', resetOnExit: true },
      'play-video': { animation: 'play-video' },
      'pause-video': { animation: 'pause-video', resetOnExit: true },
      'custom': { custom: (element) => element.style.boxShadow = '0 0 10px red' },
      'slide-up': { animation: 'slide-up', transition: 'transform 0.8s ease-out', resetOnExit: true }, // New effect
      'change-bg-color': { custom: (element) => element.style.backgroundColor = 'lightblue' }  // New custom effect
    },
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.25,
  }); */









  
  // Usage Example
  const scrollEffect = new ScrollEffectObserver({
    // Define the elements to observe: classes, IDs, and input types
    targets: ['.observer.fade-in-element', '#observer.slide-in-section',
         'input.observe-input', 'video.video-player', '.observer.custom-effect'],
    effects: {
      'play-video': { animation: 'play-video' },
      'pause-video': { animation: 'pause-video', resetOnExit: true },
    },
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.25,
  });