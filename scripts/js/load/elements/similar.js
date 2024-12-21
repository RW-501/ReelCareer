
async function checkImageURL(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            return url; // Image is accessible
        } else if (response.status === 403) {
         //   console.error(`403 Forbidden: Cannot access the image at ${url}`);
            return 'https://reelcareer.co/images/rc_text_sm.png'; // Correct the protocol here
        } else {
        //    console.warn(`Unexpected response: ${response.status}`);
            return 'https://reelcareer.co/images/rc_text_sm.png'; // Correct the protocol here
        }
    } catch (error) {
      //  console.error(`Error checking image URL: ${error.message}`);
        return 'https://reelcareer.co/images/rc_text_sm.png'; // Correct the protocol here
    }
  }
  
  
  window.checkImageURL = checkImageURL;
  
  
  
  
  // Improved: Preparing location data for Firebase with validation and defaults
  function prepareLocationForFirebase() {
    let userLocationData = sessionStorage.getItem('userLocation');
  
    if (typeof userLocationData === 'string') {
        try {
            userLocationData = JSON.parse(userLocationData); // Safely parse string
        } catch (e) {
            console.error("Invalid JSON in userLocationData:", e);
            return ['', '', '', '']; // Return empty if parsing fails
        }
    }
  
    // Destructure with defaults for undefined properties
    const { city = '', state = '', zip = '', country = '' } = userLocationData || {};
    return [city, state, zip, country];
  }
  
  window.prepareLocationForFirebase = prepareLocationForFirebase;
  // Shuffle array utility function with a cleaner approach
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
  
  // Function to display blogs dynamically with enhanced error handling
  async function loadRelatedBlogs() {
    const maxSimilarBlogs = 6;
    const blogContainer = document.getElementById('blogContainer');
    const allBlogs = [];
  
    try {
        const blogsRef = collection(db, 'Blogs');
        const uTagInterestNorm = getUserTagInterest();
        const uJobInterestNorm = getUserJobInterest();
        const locationArray = prepareLocationForFirebase();
  
        let queryConfig = null;
        if (uTagInterestNorm.length > 0) {
            queryConfig = query(blogsRef, where('tags', 'array-contains-any', uTagInterestNorm), limit(maxSimilarBlogs));
        } else if (uJobInterestNorm.length > 0) {
            queryConfig = query(blogsRef, where('tags', 'array-contains-any', uJobInterestNorm), limit(maxSimilarBlogs));
        } else {
            queryConfig = query(blogsRef, where('tags', 'array-contains-any', locationArray), limit(maxSimilarBlogs));
        }
  
        const querySnapshot = await getDocs(queryConfig);
  
        querySnapshot.forEach((doc) => {
            allBlogs.push({ id: doc.id, ...doc.data() });
        });
  
        if (allBlogs.length > 0) {
            shuffleArray(allBlogs); // Randomize blog order
            displayBlogs(allBlogs, blogContainer); // Display blogs
        } else {
            console.log("No related blogs found.");
            displayEmptyState(blogContainer, 'No related blogs found.', 'fas fa-blog');
        }
  
    } catch (error) {
        console.error("Error fetching related blogs:", error);
        displayEmptyState(blogContainer, 'Error loading related blogs.', 'fas fa-exclamation-triangle');
    }
  }
  
  window.loadRelatedBlogs = loadRelatedBlogs;
  
  // Function to display fetched blogs
  async function displayBlogs(blogs, container) {
    container.innerHTML = ''; // Clear previous blogs
  
    for (const blog of blogs) {
      const blogCard = document.createElement('div');
      blogCard.classList.add('blogCard');
      
      // Use await to resolve the image URL before using it
      const imageUrl = await checkImageURL(blog.imageUrl);
  
      blogCard.innerHTML = `
          <div class="card blog-card shadow-sm">
              <div data-bs-toggle="modal" data-bs-target="#blogModal" class="blog-card-trigger" data-blog-id="${blog.id}">
                   
                     <div class="blog-image-area"> <img src="${imageUrl}" alt="${blog.title}" class="blog-card-img-top lazy-image" loading="lazy" />
                </div> 
                  <div class="card-body">
                      <a href="https://reelcareer.co/views/blog?b=${blog.id}">
                          <h5 class="card-title text-primary">${blog.title}</h5>
                      </a>
                      <div class="blog-card-text text-muted">
                         <a  title="${blog.title}" href="https://reelcareer.co/views/blog?b=${blog.id}"> <div>${truncateText(blog.content, 80, `https://reelcareer.co/views/blog?b=${blog.id}`)}</div></a>
                      </div>
                  
                      
                      <a class="btn btn-outline-primary blog-card-trigger" title="${blog.title}" href="https://reelcareer.co/views/blog?b=${blog.id}">Read More</a>
                  </div>
              </div>
          </div>
      `;
      container.appendChild(blogCard);
    }
  }
  
  
  // Function to fetch and display similar jobs with better handling
  async function getSimilarJobs() {
    const maxSimilarJobs = 6;
    const jobsContainer = document.getElementById('similarJobsContainer');
  
    try {
        const jobInterestNorm = getUserJobInterest();
        const locationArray = prepareLocationForFirebase();
        const jobsRef = collection(db, 'Jobs');
  
        let queryConfig;
        if (jobInterestNorm.length === 0) {
            queryConfig = query(jobsRef, where('location', 'array-contains-any', locationArray), limit(maxSimilarJobs));
        } else {
            queryConfig = query(jobsRef, where('searchableTitle', 'array-contains-any', jobInterestNorm), limit(maxSimilarJobs));
        }
  
        const querySnapshot = await getDocs(queryConfig);
  
        if (!jobsContainer || querySnapshot.empty) {
            displayEmptyState(jobsContainer, 'No related jobs found.', 'fas fa-briefcase');
            return;
        }
  
        jobsContainer.innerHTML = ''; // Reset container
  
        querySnapshot.forEach((doc) => {
            const jobData = doc.data();
            const jobCard = createJobCard(doc.id, jobData);
            jobsContainer.appendChild(jobCard);
        });
  
    } catch (error) {
        console.error("Error fetching similar jobs:", error);
        displayEmptyState(jobsContainer, 'Error loading similar jobs.', 'fas fa-exclamation-triangle');
    }
  }
  window.getSimilarJobs = getSimilarJobs;
  
  // Function to create a job card element
  function createJobCard(jobId, jobData) {
    const jobCard = document.createElement('div');
    jobCard.classList.add('col-md-6', 'col-lg-4', 'mb-3');
    jobCard.innerHTML = `
        <div class="similar-job-card">
            <h5><a href="https://reelcareer.co/jobs/job-details?id=${jobId}" class="job-title-link">${jobData.title}</a></h5>
            <p><strong>${jobData.company}</strong> - ${formatLocation(jobData.location)}</p>
            <p class="card-text"><strong>Type:</strong> ${formatJobType(jobData.type)}</p>
            <p class="card-text"><strong>Salary:</strong> ${formatCurrency(jobData.salary, { decimals: 0 })}</p>
            <div class="job-tags mt-2">
                ${jobData.tags.map(tag => `
                    <a href="https://reelcareer.co/job-listings?tag=${encodeURIComponent(tag)}" class="btn btn-primary badge" style="margin: 0.2rem;">${tag}</a>
                `).join('')}
            </div>
            <a href="https://reelcareer.co/jobs/job-details?id=${jobId}" class="view-job-btn">View Job</a>
        </div>
    `;
    return jobCard;
  }
  
  // Function to display an empty state
  function displayEmptyState(container, message, iconClass = 'fas fa-search') {
    container.innerHTML = `
        <div class="empty-state text-center my-4">
            <i class="${iconClass} fa-3x text-muted"></i>
            <p class="text-muted mt-2">${message}</p>
        </div>
    `;
  }
  
  
  
  
  
  