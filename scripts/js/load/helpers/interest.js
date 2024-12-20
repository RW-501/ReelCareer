
/*

////////////////////////////////////////
/////////////////////    handleJobInput  ////////////////////////////////////////////////////////////



*/

function handleJobInput(jobInput, action = "visit") { 
    // Helper function to compare jobs for similarity
    function isSimilarJob(job1, job2) {
      return job1.trim().toLowerCase().includes(job2.trim().toLowerCase());
    }
  
    // Helper function to decay ranks
    function decayRanks(userJobInterest, decayFactor = 0.9) {
      return userJobInterest.map(job => ({
        ...job,
        rank: Math.max(1, Math.floor(job.rank * decayFactor)) // Ensure rank does not go below 1
      }));
    }
  
    // Helper function to prioritize jobs
    function prioritizeJobs(userJobInterest) {
      return userJobInterest.sort((a, b) => b.rank - a.rank);
    }
  
    // Helper function to clean and split input
    function splitAndCleanInput(input) {
      return input
        .split(/\s+/) // Split by whitespace
        .map(word => word.trim()) // Trim extra spaces
        .filter(word => word.length > 0) // Filter out empty strings
        .map(word => word.replace(/[^a-zA-Z0-9]/g, '')); // Remove characters that are not a-z, A-Z, or 0-9
    }
    
    // Main logic
    let userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];
  
    // Decay existing ranks
    userJobInterest = decayRanks(userJobInterest);
  
    // Rank increment values
    const rankIncrement = action === "apply" ? 5 : 2;
  
    // Process each job from the input
    const jobInputs = splitAndCleanInput(jobInput);
    jobInputs.forEach(job => {
      // Check if a similar job already exists
      const existingJobIndex = userJobInterest.findIndex(item => 
        isSimilarJob(item.job, job)
      );
  
      if (existingJobIndex !== -1) {
        // Increment rank if a similar job exists
        userJobInterest[existingJobIndex].rank += rankIncrement;
      } else {
        // Add a new job if it doesn't already exist
        const newJob = { job: job.trim(), rank: rankIncrement };
        if (userJobInterest.length === 15) { // Updated capacity from 6 to 15
          // If at capacity, replace the least popular job
          userJobInterest = prioritizeJobs(userJobInterest);
          userJobInterest.pop();
          userJobInterest.push(newJob);
        } else {
          // Add the new job directly if space is available
          userJobInterest.push(newJob);
        }
      }
    });
  
    // Mark the most recently clicked job as "last"
    userJobInterest.forEach(item => (item.isLast = false));
    const lastJobIndex = userJobInterest.findIndex(item => 
      jobInputs.some(job => isSimilarJob(item.job, job))
    );
    if (lastJobIndex !== -1) {
      userJobInterest[lastJobIndex].isLast = true;
    }
  
    // Prioritize popular jobs and save
    userJobInterest = prioritizeJobs(userJobInterest);
    localStorage.setItem('userJobInterest', JSON.stringify(userJobInterest));
  
    return userJobInterest.map(item => item.job); // Return the updated job list as strings
  }
  
  window.handleJobInput = handleJobInput;
  
  // Function to retrieve and log jobs as a simple array
  function getUserJobInterest() {
    const userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];
  
    // Filter out invalid terms and limit to 10 items
    const filteredJobInterest = userJobInterest
      .map((item) => item.job.toLowerCase()) // Convert to lowercase
      .filter((term) => term.length > 2 && isNaN(term)) // Ensure valid terms
      .slice(0, 10); // Limit to 10 elements
  
    console.log('Filtered User Job Interests (lowercase):', filteredJobInterest);
    return filteredJobInterest;
  }
  
  
  /*
  const jobInterest = getUserJobInterest();
  console.log('const jobInterest =', JSON.stringify(jobInterest));
  */
  
  
  window.getUserJobInterest = getUserJobInterest;
  
  /*
  
  ////////////////////////////////////////
  /////////////////////    handleTagInput  ////////////////////////////////////////////////////////////
  
  
  
  */
  
  
  function handleTagInput(tagInput) {
    // Helper function to compare tags for similarity
    function isSimilarTag(tag1, tag2) {
      return tag1.trim().toLowerCase().includes(tag2.trim().toLowerCase());
    }
  
    // Helper function to decay ranks
    function decayRanks(userTagInterest, decayFactor = 0.9) {
      return userTagInterest.map(tag => ({
        ...tag,
        rank: Math.max(1, Math.floor(tag.rank * decayFactor)) // Ensure rank does not go below 1
      }));
    }
  
    // Helper function to prioritize tags
    function prioritizeTags(userTagInterest) {
      return userTagInterest.sort((a, b) => b.rank - a.rank);
    }
  
    // Main logic
    let userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];
  
    // Decay existing ranks
    userTagInterest = decayRanks(userTagInterest);
  
    // Check if a similar tag already exists
    const existingTagIndex = userTagInterest.findIndex(item => 
      isSimilarTag(item.tag, tagInput)
    );
  
    if (existingTagIndex !== -1) {
      // Increment rank if a similar tag exists
      userTagInterest[existingTagIndex].rank += 1;
    } else {
      // Add a new tag if it doesn't already exist
      const newTag = { tag: tagInput.trim(), rank: 1 };
      if (userTagInterest.length === 6) {
        // If at capacity, replace the "last" tag or least popular tag
        const lastTagIndex = userTagInterest.findIndex(item => item.isLast);
        if (lastTagIndex !== -1) {
          userTagInterest.splice(lastTagIndex, 1, newTag);
        } else {
          userTagInterest = prioritizeTags(userTagInterest);
          userTagInterest.pop();
          userTagInterest.push(newTag);
        }
      } else {
        // Add the new tag directly if space is available
        userTagInterest.push(newTag);
      }
    }
  
    // Mark the most recently clicked tag as "last"
    userTagInterest.forEach(item => (item.isLast = false));
    const currentTagIndex = userTagInterest.findIndex(item => 
      isSimilarTag(item.tag, tagInput)
    );
    if (currentTagIndex !== -1) {
      userTagInterest[currentTagIndex].isLast = true;
    }
  
    // Prioritize popular tags and save
    userTagInterest = prioritizeTags(userTagInterest);
    localStorage.setItem('userTagInterest', JSON.stringify(userTagInterest));
  
    return userTagInterest.map(item => item.tag); // Return the updated tag list as strings
  }
  
  window.handleTagInput = handleTagInput;
  
  // Function to retrieve and log tags as a simple array
  function getUserTagInterest() {
    const userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];
   
    const filteredJTagInterest = userTagInterest
      .map((item) => item.tag.toLowerCase()) // Convert to lowercase
      .filter((term) => term.length > 2 && isNaN(term)) // Ensure valid terms
      .slice(0, 10); // Limit to 10 elements
   
   
    console.log('User Tag Interests (lowercase):', filteredJTagInterest);
    return filteredJTagInterest;
  }
  
  
  window.getUserTagInterest = getUserTagInterest;
  
  
  
  