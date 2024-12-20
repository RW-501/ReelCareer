

document.addEventListener('click', function (event) {

   

    let TrackingOn = true;
        // Get the clicked element
        const target = event.target;
        let interceptTimer = 300;
    
    //    console.log("TrackingOn: ", TrackingOn);
       // console.log("interceptTimer: ", interceptTimer);
    
       if (window.checkUrl("/backend/") || window.checkUrl("/backend")) {
        TrackingOn = false;
       }
    
    if(TrackingOn){
    
    
    
            // Get the page title
            const pageTitle = document.title;
           // console.log(`Page title: ${pageTitle}`);
            let jobTitleName = '';
    
            const jobTitle = document.getElementById("jobTitle");
            const appyJobTitle = document.getElementById("appyJobTitle");
            if (jobTitle){
              jobTitleName = jobTitle.innerText;
             // console.log(`Job title: ${jobTitleName}`);
             handleJobInput(jobTitleName);
    
            }
            if (appyJobTitle){
               jobTitleName = appyJobTitle.innerText;
    // Visiting the job
    handleJobInput(jobTitleName, "visit");
            }
          
    
        // Check if it's an anchor tag
        if (target.tagName === 'A' || target.closest('a')) {
            // Prevent default link navigation
            event.preventDefault();
    
            // Get the URL of the anchor
            const href = target.href || target.closest('a').href;
    
                 // Get the URL and inner text of the anchor
                 const linkText = target.innerText.trim();
       
                 
                 // Perform a custom action before navigating
             //    console.log(`Intercepted link: ${href}`);
              //   console.log(`Link text: ${linkText}`);
    
    
                 updateViewData(ipAddress, "link", linkText, pageTitle, jobTitleName  );
            // Timeout before proceeding
            setTimeout(() => {
                // Navigate to the URL
                window.location.href = href;
            }, interceptTimer); // Delay for 1 second
        } else if (typeof target.onclick === 'function' || target.hasAttribute('onclick')) {
            // Intercept buttons or elements with onclick handlers
            event.preventDefault();
    
            // Handle inline onclick attribute
            if (target.hasAttribute('onclick')) {
    
              // Get the onclick attribute and the inner text of the element
            const onclickAttr = target.getAttribute('onclick');
            const elementText = target.innerText.trim();
    
            // Log the onclick attribute and the inner text
           // console.log(`Intercepted inline onclick: ${onclickAttr}`);
          //  console.log(`Element text: ${elementText}`);
    
            updateViewData(ipAddress, onclickAttr, elementText, pageTitle, jobTitleName  );
    
                // Timeout before manually executing the inline onclick
                setTimeout(() => {
                    // Inline onclick execution (using eval)
                    eval(onclickAttr);
                }, interceptTimer); // Delay for 1 second
            } else if (typeof target.onclick === 'function') {
    
                     // Prevent default action
            event.preventDefault();
            // Get the onclick handler function
            const onclickFunction = target.onclick;
    
            // Extract the function name (if available)
            const functionName = onclickFunction.name || '(anonymous)';
    
            // Get the inner text of the element
            const elementText = target.innerText.trim();
    
        /*    // Log the function name and the element text
            console.log('Intercepted programmatic onclick handler.');
            console.log(`Function name: ${functionName}`);
            console.log(`Element text: ${elementText}`);
    */
            updateViewData(ipAddress, functionName, elementText, pageTitle, jobTitleName  );
                // Save the original onclick handler
                const handler = target.onclick;
    
                // Timeout before manually triggering the original handler
                setTimeout(() => {
                    handler.call(target, event); // Execute the handler in the correct context
                }, interceptTimer); // Delay for 1 second
            } if (target.tagName === 'BUTTON' && target.type === 'submit') {
              // Prevent the default submit action
              event.preventDefault();
      
              // Get the button text
              const buttonText = target.innerText.trim();
          //    console.log(`Intercepted button: ${buttonText}`);
      
          if (appyJobTitle){
            jobTitleName = appyJobTitle.innerText;
          // Applying for the job
    handleJobInput(jobTitleName, "apply");
          }
    
    
              // Find the closest form element
              const form = target.closest('form');
      
              if (form) {
                  // Log the form's name or id
                  const formName = form.getAttribute('name') || '(no name)';
                  const formId = form.id || '(no id)';
                 // console.log(`Associated form: Name = ${formName}, ID = ${formId}`);
    
                  const formNameId = formName || formId;
    
      
                  updateViewData(ipAddress, formNameId, buttonText, pageTitle, jobTitleName  );
    
                  // Delay before submitting the form
                  setTimeout(() => {
                //      console.log('Proceeding with the submit action after delay.');
                      form.submit(); // Trigger the form submission programmatically
                  }, interceptTimer); // Delay by 1 second
              } else {
                console.log(`Associated form: buttonText = ${buttonText}, target = ${target}`);
                // Check if the button is inside a class job-tags
                if (target.classList.contains('tags')) {
              
         
    
                  handleTagInput(buttonText);
                
    
          }
    
    
                  // Optionally, handle cases where no form is present
                  setTimeout(() => {
                //      console.log('No form submission performed.');
                  }, interceptTimer); // Delay for consistency
              }
          }
        }
    
    }
    
    });
    