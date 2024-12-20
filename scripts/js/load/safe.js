
    // Function to sanitize user input
    function sanitizeInput(input) {
        return input.trim().replace(/<[^>]*>/g, '');
        return input;
      }
  
      window.sanitizeInput = sanitizeInput;
  
      
            // Function to check if input contains potential script injection characters
            window.isSafeInput = function(input) {
              const dangerousPatterns = /(<|>|"|;|&|\$|\(|\)|\*|\\|\/|script|SELECT|UPDATE|DELETE|INSERT|DROP|TABLE|ALTER)/i;
              return !dangerousPatterns.test(input);
          }
  