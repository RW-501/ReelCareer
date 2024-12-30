const style = document.createElement('style');
style.innerHTML = `
  .card {
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .shadow-futuristic {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }

  .futuristic-gradient {
    background: linear-gradient(45deg, #007bff, #5e17eb);
    color: white;
    padding: 15px;
  }

  .futuristic-bg {
    background-color: #f8f9fa;
    padding: 15px;
  }

  .futuristic-icon {
    color: #5e17eb;
  }

  .futuristic-link {
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .futuristic-link:hover {
    color: #ffcc00;
  }

  .futuristic-image {
    border-radius: 10px;
    object-fit: cover;
  }

  .futuristic-divider {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }

  .futuristic-button {
    display: inline-block;
    padding: 10px 20px;
    color: #ffffff;
    background-color: #5e17eb;
    border: none;
    border-radius: 50px;
    text-align: center;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .futuristic-button:hover {
    background-color: #ffcc00;
    color: #000;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

// Append the style element to the head of the document
document.head.appendChild(style);

let cardCount = 0;

  // Function to create a job card and append it to the container
  function createJobCard(job, container) {
    // Create the job card
    cardCount++;
    console.log(" cardCount:", cardCount);
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
    
    if (cardCount % 3 === 0) {

    jobCard.innerHTML = ` 
  <div class="card jobCard gridBody h-100 shadow-futuristic">
    <!-- Job Title and Company -->
    <div class="card-top futuristic-gradient">
      <a href="https://reelcareer.co/jobs/job-details?id=${job.id}" 
         class="job-title-link futuristic-link">
        ${job.title}
      </a>
      <p class="company-card-text-area">
        <i class="fas fa-building futuristic-icon"></i>
        <strong>${job.company}</strong>
      </p>
    </div>

    <!-- Job Image with Lazy Load -->
    ${
      job.imageUrl
        ? `
      <div class="job-image-container mb-3">
        <img src="${job.imageUrl}" alt="${job.title}" 
             class="img-fluid futuristic-image" loading="lazy">
      </div>`
        : ""
    }

    <!-- Location, Type, and Salary -->
    <div class="card-bottom futuristic-bg">
      <p class="location-text-area c-text">
        <i class="fas fa-map-marker-alt futuristic-icon"></i>
        <h6>${formatLocation(job.location)}</h6>
      </p>
      <p class="industry-text-area c-text">
        <strong>Industry:</strong>
        <span>${job.industry}</span>
      </p>
      <p class="category-text-area c-text">
        <strong>Category:</strong>
        <span>${job.category}</span>
      </p>
      <hr class="futuristic-divider">
      <p class="job-type-text-area c-text">
        <strong>Type:</strong>
        <span>${formatJobType(job.type)}</span>
      </p>
      <p class="salary-text-area c-text">
        <strong>Salary:</strong>
        <span>${formatCurrency(job.salary, { decimals: 0 })}</span>
        <span class="salary-text">${job.salaryPayTime || ""}</span>
      </p>
      <p class="source-text-area c-text">
        <small>Source:</small>
        <small>${job.source}</small>
      </p>
    </div>

    <!-- View Details Button -->
    <a href="https://reelcareer.co/jobs/job-details?id=${job.id}" 
       class="card-CTA-Btn futuristic-button" 
       aria-label="View job details for ${job.title}">
      View Details
    </a>
  </div>
`;
  }else{

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

    }
 // console.log("container  ", container);
      
      jobCard.style.opacity = '0';
 
      // Delay function to set the opacity after a specified time
setTimeout(() => {
  jobCard.style.opacity = '1';
}, 700); // Delay in milliseconds (2000 ms = 2 seconds)
    
    container.appendChild(jobCard);
}