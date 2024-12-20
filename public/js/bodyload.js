














  
  





  // Function to create a job card and append it to the container
  function createJobCard(job, container) {
    // Create the job card

    //console.log("Job Data:", job);

    const jobCard = document.createElement("div");
    jobCard.id = `job_Card_${job.id}`;
    jobCard.className = "JOB_CARD  mb-4 noCopy";
    // Adding data attributes for search purposes
    jobCard.dataset.title = job.title ? job.title.toLowerCase() : '';
    jobCard.dataset.company = job.company ? job.company.toLowerCase() : '';
    jobCard.dataset.location = Array.isArray(job.location) 
        ? job.location.join(', ').toLowerCase() 
        : (job.location ? job.location.toLowerCase() : '');
    jobCard.dataset.salary = job.salary && job.salary !== 0 ? job.salary : '$0.00';
    jobCard.dataset.jobType = normalizeJobType(job.type); // Normalize job type if applicable
    jobCard.dataset.city = job.city ? job.city.toLowerCase() : '';
    jobCard.dataset.state = job.state ? job.state.toLowerCase() : '';
    jobCard.dataset.zipCode = job.zipCode ? job.zipCode.toString() : '';
    jobCard.dataset.industry = job.industry ? job.industry.toLowerCase() : '';
    jobCard.dataset.category = job.category ? job.category.toLowerCase() : '';
    jobCard.dataset.immediateHire = job.immediateHire !== undefined ? job.immediateHire.toString() : '';
    jobCard.dataset.contractToHire = job.contractToHire !== undefined ? job.contractToHire.toString() : '';
    jobCard.dataset.country = job.country ? job.country.toLowerCase() : '';
    jobCard.dataset.county = job.county ? job.county.toLowerCase() : '';
    jobCard.dataset.status = job.status ? job.status.toLowerCase() : '';
    jobCard.dataset.searchableTitle  = Array.isArray(job.searchableTitle) 
    ? job.searchableTitle.join(', ').toLowerCase() 
    : (job.searchableTitle ? job.searchableTitle.toLowerCase() : '');
    jobCard.dataset.source = job.source ? job.source.toLowerCase() : '';
    
    // Salary min/max datasets
    jobCard.dataset.salaryMin = job.salaryMin ? job.salaryMin : '';
    jobCard.dataset.salaryMax = job.salaryMax ? job.salaryMax : '';
    

    // Benefits, requirements, and tags datasets (arrays converted to strings for filtering)
    jobCard.dataset.benefits = job.benefits ? job.benefits.join(', ').toLowerCase() : '';
    jobCard.dataset.requirements = Array.isArray(job.requirements) 
        ? job.requirements.join(', ').toLowerCase() 
        : (job.requirements ? job.requirements.toLowerCase() : '');
    jobCard.dataset.tags = job.tags ? job.tags.join(', ').toLowerCase() : '';
    
    // Additional metadata
    jobCard.dataset.submittedBy = job.submittedBy ? job.submittedBy.toLowerCase() : '';
    
    jobCard.innerHTML = `
    <div class="card jobCard gridBody h-100 shadow-sm " >
      
      <!-- Job Title and Company -->
      <div class="card-top" >
        <a href="https://reelcareer.co/jobs/job-details?id=${job.id}"
           class="job-title-link" 
          >
          ${job.title}
        </a>
        <p class="company-card-text-area" >
            <i class="fas fa-building" style="color: #007bff;"></i>
            <strong>${job.company}</strong>
        </p>
      </div>
  
      <!-- Job Image with Lazy Load (optional) -->
      ${
        job.imageUrl
          ? `
        <div class="job-image-container mb-3" style="margin-bottom: 15px;">
          <img src="${job.imageUrl}" alt="${job.title}" class="img-fluid" loading="lazy" style="border-radius: 8px; width: 100%; height: auto;">
        </div>`
          : ""
      }
  
      <!-- Location, Type, and Salary -->
      <div class="card-bottom" >
        
        <p class="location-text-area c-text">
          <i class="fas fa-map-marker-alt" style="color: #007bff;"></i> 
          <h6>${formatLocation(job.location)}</h6>
        </p>
    
        <p class="industry-text-area c-text">
          <strong>Industry:</strong>
           <h9>${job.industry}</h9>
        </p>
    

        <p class="category-text-area c-text">
          <strong>Category:</strong>
           <h9>${job.category}</h9>
        </p>
    <hr>


        <p class="job-type-text-area c-text">
          <strong>Type:</strong>
          <h9>${formatJobType(job.type)}</h9>
        </p>
        
        <p class="salary-text-area c-text">
          <strong>Salary:</strong>
         <h8> ${formatCurrency(job.salary, { decimals: 0 })}</h8>
          <span class="salary-text">${job.salaryPayTime || ""}</span>
        </p>

        <p class="source-text-area c-text">
          <small>Source:</small>
            <small>${job.source}</small>

        </p>

      </div>
  
      <!-- View Details Button -->
      <a href="https://reelcareer.co/jobs/job-details?id=${job.id}" 
         class="card-CTA-Btn" 
         aria-label="View job details for ${job.title}">
        View Details
      </a>
    </div>
  `;
 // console.log("container  ", container);
      
      jobCard.style.opacity = '0';
 
      // Delay function to set the opacity after a specified time
setTimeout(() => {
  jobCard.style.opacity = '1';
}, 700); // Delay in milliseconds (2000 ms = 2 seconds)
    
    container.appendChild(jobCard);
}


function showToast(message, type = 'info', duration = 3500, link = null, confirm = false) {
  const toast = document.createElement('div');
  
  // Accessibility (Screen Readers)
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  // Styling for the toast
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 18px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  toast.style.color = '#fff';
  toast.style.zIndex = '9999';
  toast.style.fontFamily = 'Arial, sans-serif';
  toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease, bottom 0.3s ease';
  
  // Fade-in effect
  toast.style.transform = 'translateY(20px)';
  toast.style.opacity = '0';

  // Add dynamic styling for toast types
  switch (type) {
    case 'success':
      toast.style.backgroundColor = '#4CAF50'; // Green for success
      break;
    case 'error':
      toast.style.backgroundColor = '#F44336'; // Red for error
      break;
    case 'info':
      toast.style.backgroundColor = '#2196F3'; // Blue for info
      break;
    case 'warning':
      toast.style.backgroundColor = '#FF9800'; // Orange for warning
      break;
    default:
      toast.style.backgroundColor = '#2196F3'; // Default to info
  }

  // Structure toast message and buttons
  toast.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-icons" style="color: white; font-size: 28px;">${type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info'}</span>
        <span style="color: white; font-size: 16px; font-weight: 500;">${message}</span>
      </div>
      ${confirm ? `
        <button onclick="dismissToast(this)" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">Confirm</button>
      ` : `
        <button onclick="dismissToast(this)" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">&times;</button>
      `}
    </div>
  `;

  // Format message with link if applicable
  const formattedMessage = message.replace(
    /@\[(.+?)\]/g,
    `<a href="${link}" target="_blank" style="color: #fff; text-decoration: underline;">$1</a>`
  );
  toast.innerHTML = formattedMessage;

  // Append the toast to the body
  document.body.appendChild(toast);

  // Fade-in effect
  setTimeout(() => {
    toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    toast.style.bottom = '20px';
  }, 10);

  // Automatically fade-out and remove the toast if not a confirmation toast
  if (!confirm) {
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.classList.add('fade-out'); // Add fade-out effect
      toast.style.bottom = '-50px'; // Toast goes out of view
    }, duration); // Toast disappears after specified duration

    // Remove toast from DOM after animation
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, duration + 300); // Allow 0.3s for fade-out animation
  }
}

// Function to dismiss toast manually
function dismissToast(button) {
  const toast = button.closest('.toast');
  if (toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.parentNode.removeChild(toast);
    }, 300);
  }
}
// Example usage: Replace alerts with showToast
// showToast('This is a success message!', 'success');
// showToast('This is an error message!', 'error');
// showToast('This is an info message!', 'info');
// showToast('This is a warning message!', 'warning');


/**
 * Function to show a "Saved" message and fade the button out after a specified delay
 * @param {string} buttonId - The ID of the button element to update and hide
 * @param {string} message - The message to display on the button
 * @param {number} [delay=1000] - The delay (in milliseconds) before the fade effect starts (default is 1000ms)
 */
function showMessageAndFadeBtn(buttonId, message, delay = 1000) {
  const btn = document.getElementById(buttonId);

  if (!btn) {
    console.error("Button with the specified ID not found.");
    return;
  }

  // Set the text of the button to the provided message
  btn.innerText = message;

  // Apply delay before starting the fade-out effect
  setTimeout(function() {
    btn.style.transition = "opacity 1s"; // Apply smooth fade transition
    btn.style.opacity = 0; // Fade the button out

    // After the fade-out, hide the button completely
    setTimeout(function() {
      btn.style.display = "none";
    }, 1000); // Wait for the fade-out effect to complete before hiding the button
  }, delay); // Delay before starting the fade effect
}

window.showMessageAndFadeBtn = showMessageAndFadeBtn;


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





