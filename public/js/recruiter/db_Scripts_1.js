import {
    onAuthStateChanged,
    db,
    auth,
    storage,
    analytics,
    app
  } from "../main.js"; // Adjust the path based on your structure
  import {
    query,
    doc,
    getDoc,
    where,
    updateDoc,
    arrayUnion,
    collection,
    getDocs,
    addDoc
  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
  
  let companyId = ""; // Or some existing company ID if applicable
  
  const companyInput = document.getElementById("company");
  const addCompanyButtonContainer = document.getElementById(
    "addCompanyButtonContainer"
  );
  
  // Collect input values
  let companyName = document.getElementById("company").value;
  let recruiterID = document.getElementById("appUserID").innerText;
  let jobID = []; // Populate with relevant job IDs, if any
  let jobTitle = document.getElementById("jobTitle").value;
 

  // Define the submitJobPost function
  const submitJobPost = async (
    jobTitle,
    companyId,
    companyName,
    recruiterID,
    jobID
  ) => {
    try {
      // Check if the company ID is empty
      if (companyId === "") {
         companyName = document.getElementById("company").value;
         recruiterID = document.getElementById("appUserID").innerText;
         jobID = []; // Populate with relevant job IDs, if any
         jobTitle = document.getElementById("jobTitle").value;
       const  location = document.getElementById("jobLocation").value;

      
        // Create a new company in the Companies collection
        const newCompanyRef = await addDoc(collection(db, "Companies"), {
          companyName: companyName,
          recruiterIDs: [recruiterID],
          jobIDs: jobID,
          location: location,
          jobTitles: [jobTitle]
        });
  
      //  console.log("New company added with ID:", newCompanyRef.id);
        return newCompanyRef.id; // Return the new company ID for further use
      } else {
       // console.log("Existing company ID:", companyId);
        return companyId; // Use the provided company ID
      }
    } catch (error) {
      console.error("Error adding company: ", error);
      // Handle the error as needed
    }
  };
  
  // Function to check if the company exists
  const checkCompanyExists = async (companyName) => {
    // Assuming you have a Firestore reference called `db`
    const companiesRef = collection(db, "Companies");
    const q = query(companiesRef, where("companyName", "==", companyName));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // Companies exist, return all matching companies
      return querySnapshot.docs;
    } else {
      // Company does not exist
      return null;
    }
  };
  
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }
  
  companyInput.addEventListener(
    "keyup",
    debounce(async () => {
      const companyName = companyInput.value.trim();
  
      // Clear the button container before checking
      addCompanyButtonContainer.innerHTML = "";
  
      if (companyName) {
        const companyData = await checkCompanyExists(companyName);
  
        if (companyData && companyData.length > 0) {
          // Limit the number of visible companies
          const visibleCount = 5;
          let showMoreButton = null;
  
          // Container for the company list
          const listContainer = document.createElement("div");
          listContainer.className = "company-list-container";
          listContainer.style.maxHeight = "200px"; // Set max height for scrollable list
          listContainer.style.overflowY = "auto"; // Enable vertical scroll
  
          // Display limited companies first
          companyData.slice(0, visibleCount).forEach((doc) => {
            const company = doc.data();
            const companyButton = document.createElement("button");
            companyButton.innerHTML = `${company.companyName} - ${company.location}`;
            companyButton.className = "btn btn-info w-100 mb-2"; // Responsive and margin
            companyButton.addEventListener("click", () => {
              companyId = doc.id; // Save the selected company ID
              //console.log("companyId   ",companyId);
  
              // Retract or hide the list upon selection
              addCompanyButtonContainer.innerHTML = ""; // Clear the list
              document.getElementById("appCompanyID").innerText = companyId;
  
              // Show the selected company in a message
              const selectedCompanyMessage = document.createElement("div");
              selectedCompanyMessage.innerHTML = `Selected company: ${company.companyName}, Location: ${company.location}`;
              selectedCompanyMessage.className = "alert alert-success";
              addCompanyButtonContainer.appendChild(selectedCompanyMessage);
  
              // Optionally, trigger any further action with the selected company ID
              document.getElementById("jobLocation").value = company.location;
            });
            listContainer.appendChild(companyButton);
          });
  
          // Show more button if there are more than visibleCount companies
          if (companyData.length > visibleCount) {
            showMoreButton = document.createElement("button");
            showMoreButton.innerText = "Show More";
            showMoreButton.className = "btn btn-secondary w-100 mb-2";
            showMoreButton.addEventListener("click", () => {
              // Display remaining companies
              companyData.slice(visibleCount).forEach((doc) => {
                const company = doc.data();
                const companyButton = document.createElement("button");
                companyButton.innerHTML = `${company.companyName} - ${company.location}`;
                companyButton.className = "btn btn-info w-100 mb-2";
                companyButton.addEventListener("click", () => {
                  companyId = doc.id;
  
                  // Retract or hide the list upon selection
                  addCompanyButtonContainer.innerHTML = ""; // Clear the list
                  document.getElementById("appCompanyID").innerText = companyId;
  
                  // Show the selected company in a message
                  const selectedCompanyMessage = document.createElement("div");
                  selectedCompanyMessage.innerHTML = `Selected company: ${company.companyName}, Location: ${company.location}`;
                  selectedCompanyMessage.className = "alert alert-success";
                  addCompanyButtonContainer.appendChild(selectedCompanyMessage);
  
                  // Optionally, trigger any further action with the selected company ID
                  document.getElementById("jobLocation").value = company.location;
                });
                listContainer.appendChild(companyButton);
              });
              showMoreButton.style.display = "none"; // Hide the "Show More" button after click
            });
          }
  
          // Add the list container and "Show More" button to the DOM
          addCompanyButtonContainer.appendChild(listContainer);
          if (showMoreButton) {
            addCompanyButtonContainer.appendChild(showMoreButton);
          }
        } else {
          // Company does not exist, create the "Add/Create Company" button
          const addButton = document.createElement("button");
          addButton.innerText = "Add/Create Company";
          addButton.className = "btn btn-primary w-100";
          addButton.addEventListener("click", () => {
            // Redirect to the create company page
            window.location.href =
              "../views/company-page.html?create=" + companyName;
          });
          addCompanyButtonContainer.appendChild(addButton);
        }
      }
    }, 300)
  ); // Adjust delay (300ms) as needed
  
  let userName, publicBool, userPosition;
  
  // Function to fetch user data from local storage or Firestore
  async function fetchUserData() {
    const user = auth.currentUser; // Get the currently signed-in user
    if (!user) {
      console.log("No user is currently signed in.");
      return; // Exit if no user is signed in
    }
  
    try {
      // Check local storage first
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (storedUserData) {
        // Use data from local storage
        userName = storedUserData.displayName;
        publicBool = storedUserData.publicProfile;
        userPosition = storedUserData.position;
      } else {
        // Fetch from Firestore if not found in local storage
        const userDocRef = doc(db, "Users", user.uid); // Reference to the user document
        const userDoc = await getDoc(userDocRef); // Get the document
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Save user data to local storage
          localStorage.setItem("userData", JSON.stringify(userData));
  
          userName = userData.displayName;
          publicBool = userData.publicProfile;
          userPosition = userData.position;
        } else {
          console.log("No such user data!");
        }
      }
    } catch (error) {
      console.error("Error getting user document: ", error);
    }
  }
  
  // Open the job creation modal when the button is clicked
  const createJobBtn = document.getElementById("createJobPostBtn");
  createJobBtn.addEventListener("click", function () {
    $("#jobModal").modal("show"); // This opens the modal
  });
  
  // Event listener for the save draft button
  document
    .getElementById("saveDraftButton")
    .addEventListener("click", async function (event) {
      console.log("saveDraftButton added");
      await fetchUserData(); // Call to fetch user data
      handleJobSubmission(event, "draft");
    });
  
  // Event listener for the boost button
  document
    .getElementById("boostButton")
    .addEventListener("click", async function (event) {
      console.log("boostButton added");
      await fetchUserData(); // Call to fetch user data
      handleJobSubmission(event, "boost");
    });
  
  // Event listener for the create job button
  document
    .getElementById("createJobBtn")
    .addEventListener("click", async function (event) {
      await fetchUserData(); // Call to fetch user data
      handleJobSubmission(event, "post");
    });
  
  // Check for auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // User is signed in, proceed with user ID handling
      //  console.log("User ID: ", user.uid);
        
// Call the function to fetch job posts and moderated companies when the page loads
fetchRecruiterData(user.uid);


        const userDocRef = doc(db, "Users", user.uid); // Reference to the user document
        const userDoc = await getDoc(userDocRef); // Get the document
        if (userDoc.exists()) {
          // User data found
          const userData = userDoc.data();
          userName = userData.displayName;
          publicBool = userData.publicProfile;
          userPosition = userData.position;
        } else {
          console.log("No such user data!");
        }
      } catch (error) {
        console.error("Error getting user document: ", error);
      }
    } else {
      // User is not signed in, redirect to login
      window.location.href = "../";
    }
  });
  
  // Function to display error messages in a user-friendly way
  function showErrorMessage(message) {
    const errorMessageElement = document.getElementById("errorMessage");
  
    if (errorMessageElement) {
      errorMessageElement.innerText = message; // Set the error message text
      errorMessageElement.style.display = "block"; // Show the error message
      errorMessageElement.classList.add("alert", "alert-danger"); // Add Bootstrap classes for styling (if you're using Bootstrap)
  
      // Optionally, you can auto-hide the message after a few seconds
      setTimeout(() => {
        errorMessageElement.style.display = "none"; // Hide the message after 5 seconds
      }, 5000);
    } else {
      console.error("Error element not found on the page.");
    }
  }
  
  async function handleJobSubmission(event, actionType) { 
    event.preventDefault(); // Prevent default form submission behavior

    // Validate the form (custom logic such as compliance checkbox check)
    if (!validateForm()) {
      showErrorMessage("Form validation failed. Please check your inputs.");
      return; // Exit if validation fails
    }

    let companyIdValue = document.getElementById("appCompanyID").innerText;
    let newCompanyId = "";

    try {
      // Call submitJobPost to create or retrieve the company ID
    //  console.log("Attempting to submit job post with companyIdValue:", companyIdValue);
      newCompanyId = await submitJobPost(jobTitle, companyIdValue, companyName, recruiterID, jobID);

      // Instead of returning, handle the case where the company ID might be empty
      if (!newCompanyId || !companyIdValue) {
        showToast("Create a Company Page", 'info');
        // Optionally, you might want to create a new company here or log a message
        // e.g., await createCompany(companyName); // This could be your company creation logic
      } else {
        showToast("New Company ID returned:", newCompanyId, 'info');
        // Update the hidden companyId field with the new value
        document.getElementById("appCompanyID").value = newCompanyId;
      }
    } catch (error) {
      console.error("Error in submitJobPost:", error);
      showErrorMessage("An error occurred while submitting the job post: " + error.message);
      return; // Exit the function on error
    }

    // Collect all job details from the form
    let jobDetails;
    try {
      jobDetails = collectJobDetails(newCompanyId);
    //  console.log("Collected Job Details:", jobDetails);
    } catch (error) {
      console.error("Error collecting job details:", error);
      alert("An error occurred while collecting job details: " + error.message);
      return; // Exit the function on error
    }

    // Based on actionType, modify the jobDetails object
    if (actionType === "draft") {
      jobDetails.status = "draft"; // Save as draft
    } else if (actionType === "post") {
      jobDetails.status = "active"; // Create job post
    } else if (actionType === "boost") {
      jobDetails.status = "active"; // Boosted jobs should be active
      jobDetails.boosted = true; // Mark job as boosted
      jobDetails.boostExpiration = new Date(new Date().setDate(new Date().getDate() + 30)); // Boost for 30 days
    }

    try {
      // Save job details to the database
      const jobId = await saveJobToDatabase(jobDetails);
      showErrorMessage("Job saved successfully with ID:", jobId);

      // Action-specific alerts and UI feedback
      if (actionType === "boost") {
        document.getElementById("jobSuccessLabel").textContent = "Job Boosted Successfully!";
        showSuccessModal(jobId, jobDetails); // Show modal with job title and link
      } else if (actionType === "post") {
        document.getElementById("jobSuccessLabel").textContent = "Job Posted Successfully!";
        showSuccessModal(jobId, jobDetails); // Show modal with job title and link
      } else {
        document.getElementById("jobSuccessLabel").textContent = "Draft Saved Successfully!";
      }



      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting job:", error);
      showErrorMessage("An error occurred while submitting the job: " + error.message);
    }
}



  function validateForm() {
    const complianceCheckbox = document.getElementById("complianceCheck");
    if (!complianceCheckbox.checked) {
      showErrorMessage(
        "Please confirm compliance with Employment and Labor Laws."
      );
      return false;
    }
  
    const forms = document.getElementsByClassName("needs-validation");
    for (let form of forms) {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return false; // Form validation failed
      }
    }
    return true; // Validation passed
  }
  
  let submittedUserPosition = "";
  let submittedBy = "";
  submittedBy = userName;
  submittedUserPosition = userPosition;
  
  function collectJobDetails(newCompanyId) {
  
    return {
      title: document.getElementById("jobTitle").value,
      company: document.getElementById("company").value,
      companyId: document.getElementById("appCompanyID").innerText || newCompanyId,
      description: document.getElementById("jobDescription").value,
      requirements: document.getElementById("jobRequirements").value,
      searchableRequirements: collectJobRequirements(), // Collect enhanced requirements
      location: document.getElementById("jobLocation").value,
      city: document.getElementById("jobCity").value,
      state: document.getElementById("jobState").value,
      zipCode: document.getElementById("jobZipCode").value,
      type: document.getElementById("jobType").value,
      salary: document.getElementById("jobSalary").value,
      salaryPayTime: document.getElementById("salaryPayTime").value,
      boostDuration: new Date(new Date().setDate(new Date().getDate() + 30)), //  for 30 days
      contractToHire: document.getElementById("contractToHire").value,
      education: document.getElementById("education").value,
      experience: document.getElementById("experience").value,
      applicationLink: document.getElementById("applicationLink").value,

      requestLetter: document.getElementById('requestLetter').checked,
      coverLetter: document.getElementById('coverLetter').checked,
      resumeRequired : document.getElementById('requiredResume').checked,

      immediateHire: document.getElementById("immediateHire").value,
      industry: document.getElementById("industry").value,
      benefits: document
        .getElementById("benefits")
        .value.split(",")
        .map((benefit) => benefit.trim()),
      jobFunction:  document
      .getElementById("jobFunction")
      .value.split(",")
      .map((jobFunction) => jobFunction.trim()),
      tags: document
      .getElementById("tagInput")
      .value.split(",")
      .map((tags) => tags.trim()),
      complianceCheck: document.getElementById("complianceCheck").checked,
      boosted: false, // Default not boosted
      status: "draft", // Default status is draft, overridden based on action
      createdAt: new Date(),
      recruiterID: document.getElementById("appUserID").innerText, // Assuming this is the recruiter ID
      applicantsViewed: 0,
      savedForLater: 0,
      applicationAvailableBool: true,
      applicationWebsite: document.getElementById("applicationLink").value,
      customQuestions: collectCustomQuestions(),
      submittedBy: submittedBy || "",
      submittedUserPosition: submittedUserPosition || "",
      applicationDeadline: new Date(new Date().setDate(new Date().getDate() + 30)) //  for 30 days
    };
  }
  
  async function saveJobToDatabase(jobDetails) {
    const jobPostingsRef = collection(db, "Jobs");
    const docRef = await addDoc(jobPostingsRef, jobDetails); // Add job details to "Jobs" collection
    showToast("Job posted successfully with ID:", docRef.id, 'success')
  


    // Update the company's jobs array with the new job object
    const companyRef = doc(db, "Companies", jobDetails.companyId);
    await updateDoc(companyRef, {
      jobs: arrayUnion({
        jobID: docRef.id,
        jobTitle: jobDetails.title,
        submittedAt: new Date(), // Timestamp for job submission
        recruiterID: jobDetails.recruiterID,
        salary: jobDetails.salary,
        submittedBy: jobDetails.submittedBy,
        location: jobDetails.location, // Adding location can be beneficial for filtering
        status: jobDetails.status, // Current status (e.g., active, draft)
        jobType: jobDetails.type, // Full-time, part-time, etc.
        applicationLink: jobDetails.applicationLink // Direct link to apply
      })
    });
  
    // Update the user's jobPosts array with the new job ID
    const userRef = doc(db, "Users", auth.currentUser.uid);
    await updateDoc(userRef, {
        jobPosts: arrayUnion({
          jobTitle: jobDetails.title || "Untitled Job",
          status: jobDetails.status || "draft",
          createdAt: new Date(),
          location: jobDetails.location || "Unknown Location",
          boosted: jobDetails.boosted || false,
          boostDuration: jobDetails.boostDuration || new Date(new Date().setDate(new Date().getDate() + 30)), //  for 30 days
          companyName: jobDetails.company || "Unknown Company",
          companyId: jobDetails.companyId || "No Company ID",
          salary: jobDetails.salary || 0,
          applicationDeadline: jobDetails.applicationDeadline || new Date(new Date().setDate(new Date().getDate() + 30)) //  for 30 days
      })
      
    });
  /*
boostDuration
boosted

  */
    return docRef.id; // Return the job ID for future use
  }
  
  function showSuccessModal(jobId, jobDetails) {
    try {
        document.getElementById("jobIdSuccess").textContent = jobId;
        document.getElementById("jobTitleSuccess").textContent = `Job Title: ${jobDetails.jobTitle}`;;
        document.getElementById("jobTitleLinkSuccess").href = `/views/job-detail.html?id=${jobId}`; // Update the link properly
        document.getElementById("jobLocationSuccess").textContent = jobDetails.location;
        const formattedDate = formatDateString(jobDetails.applicationDeadline);
        document.getElementById("jobExpiryDateSuccess").textContent = formattedDate;
        document.getElementById("jobSalarySuccess").textContent = `${jobDetails.salary} (${jobDetails.salaryPayTime})`;

        if (jobDetails.boosted) {
            document.getElementById("boostDuration").textContent = new Date(new Date().setDate(new Date().getDate() + 30)); //  for 30 days
            document.getElementById("nonBoostedArea").style.display = "none";
            document.getElementById("boostedArea").style.display = "block";
        } else {
            document.getElementById("boostedArea").style.display = "none";
            document.getElementById("nonBoostedArea").style.display = "block";
        }

        // Show the success modal
        $("#jobSuccessModal").modal("show");

        // Prepare sharing links
        const jobPageURL = `https://reelcareer.co/views/job-detail.html?id=${jobId}`;     
        const companyName = jobDetails.company;
        const jobTitle = jobDetails.title; 
        const jobDescription = `Salary: ${jobDetails.salary} ${jobDetails.salaryPayTime}`; 

        // Dynamically update social sharing links
        document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobPageURL)}`;
        document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(jobPageURL)}&text=Check%20out%20this%20job%20opportunity%20at%20${encodeURIComponent(companyName)}!`;
        document.getElementById('shareLinkedIn').href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(jobPageURL)}&title=${encodeURIComponent(jobTitle)}&summary=${encodeURIComponent(jobDescription)}&source=ReelCareer`;
    } catch (error) {
        console.error("Error displaying success modal:", error);
        showErrorMessage("An error occurred while displaying the success message. Please try again.");
    }
}

  
// Function to handle job boosting
function boostJob() {
    // Logic for boosting the job, e.g., sending a request to your server
    const jobId = document.getElementById("jobIdSuccess").textContent;

    // Simulated request to boost the job (replace this with actual API call)
    console.log(`Boosting job with ID: ${jobId}`);

    // Example of success response (you can replace this with actual server response handling)
    const boostDuration = 30; // Duration in days for the boost new Date(new Date().setDate(new Date().getDate() + 30)) //  for 30 days
    document.getElementById("boostDuration").textContent = boostDuration;

    // Update UI accordingly
    document.getElementById("boostedArea").style.display = "block";
    document.getElementById("nonBoostedArea").style.display = "none";
}

// Add event listener for boostJobBtn
document.getElementById("boostJobBtn").addEventListener("click", function() {
    // Call the function to boost the job
    boostJob();
});










  function resetForm() {
    document.getElementById("jobForm").reset();
    document.getElementById("jobForm").classList.remove("was-validated");
  }
  
  // Function to collect job requirements
  function collectJobRequirements() {
    const jobRequirements = {
      education: Array.from(
        document.getElementById("education").selectedOptions
      ).map((option) => option.value),
      experience: Array.from(
        document.getElementById("experience").selectedOptions
      ).map((option) => option.value)
    };
    return jobRequirements;
  }
  
  // Share job listing on social media (you can expand with more detailed URLs for sharing)
  document.getElementById("shareFacebook").addEventListener("click", function () {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.origin + "/views/job-detail.html?id=" + docRef.id
    )}`;
    window.open(shareUrl, "_blank");
  });
  
  document.getElementById("shareLinkedIn").addEventListener("click", function () {
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      window.location.origin + "/views/job-detail.html?id=" + docRef.id
    )}`;
    window.open(shareUrl, "_blank");
  });
  
  document.getElementById("shareTwitter").addEventListener("click", function () {
    const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(
      window.location.origin + "/views/job-detail.html?id=" + docRef.id
    )}&text=Check out this job listing!`;
    window.open(shareUrl, "_blank");
  });

  











  const jobIDsList = []; // Initialize an empty array to store jobIDs
  const companiesIDsList = []; // Initialize an empty array to store jobIDs



// Function to fetch job posts and moderated companies for the recruiter
async function fetchRecruiterData(recruiterID) {
    const userRef = doc(db, "Users", recruiterID);
    const userDoc = await getDoc(userRef);
    //console.log("recruiterID   ",recruiterID);




        // Loop through job posts and display them
        if (userDoc.exists()) {

            const jobPosts = userDoc.data().jobPosts || [];
          
          
        
// Create a Set to track unique company IDs
const uniqueCompanyIds = new Set();

// Filter jobPosts to create moderatedCompanies with unique company IDs
let moderatedCompanies = jobPosts.filter(job => {
    // Check if the companyId is already in the Set
    if (!uniqueCompanyIds.has(job.companyId)) {
        uniqueCompanyIds.add(job.companyId); // Add the companyId to the Set
        return true; // Keep this job post
    }
    return false; // Skip this job post (duplicate)
}).map(job => {
    // Return the unique job post (or modify this to return the desired company structure)
    return {
        companyId: job.companyId,
        companyName: job.companyName,
        location: job.location, // Include other fields as necessary
        industry: job.industry,
        description: job.description,

    };
});

            // Clear containers before inserting new job posts and companies
            $('#job-posts-container').empty();
            $('#companies-container').empty();
        
            // Define jobIDsList and companiesIDsList
            const jobIDsList = [];
        
            // Loop through job posts and display them
            jobPosts.forEach(job => {
                jobIDsList.push(job.jobID); // Push each jobID into the array
            
                // Determine if the job is boosted
                const boostButtonText = job.boosted ? 'Boosted' : 'Boost';
                const boostIcon = job.boosted ? 'fas fa-star' : 'fas fa-star-half-alt'; // Change icon based on boosted status
                
                const jobElement = $(`
                    <div class="job-post card mb-3" data-job-id="${job.jobID}">
                        <div class="card-body">
                            <h5 class="job-title card-title text-primary" style="cursor: pointer;">
                                <i class="${getStatusIcon(job.status)}"></i> ${job.jobTitle}
                                <span class="status-indicator" style="background-color: ${getStatusColor(job.status)};"></span>
                                <i class="${boostIcon} float-end" style="color: gold;" title="${job.boosted ? 'This job is boosted' : 'Boost this job'}"></i> <!-- Boost Icon -->
                            </h5>
                            <div class="job-details" style="display: none;">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><strong>Status:</strong> ${job.status}</li>
                                    <li class="list-group-item"><strong>Created At:</strong> ${job.createdAt.toDate().toLocaleString()}</li>
                                    <li class="list-group-item"><strong>Location:</strong> ${job.location}</li>
                                    <li class="list-group-item"><strong>Company:</strong> ${job.companyName}</li>
                                    <li class="list-group-item"><strong>Salary:</strong> ${job.salary}</li>
                                    <li class="list-group-item"><strong>Application Deadline:</strong> ${job.applicationDeadline ? job.applicationDeadline.toDate().toLocaleString() : "None"}</li>
                                    <li class="list-group-item"><strong>Boost Duration:</strong> ${job.boosted ? job.boostDuration + ' hours' : 'Not Boosted'}</li> <!-- Show boost duration -->
                                </ul>
                                <button class="view-job btn btn-info mt-3" data-job-id="${job.jobID}">View Company</button>
                                <button class="deactivate-job btn btn-danger mt-3" data-job-id="${job.jobID}">Deactivate</button>
                                <button class="pause-job btn btn-warning mt-3" data-job-id="${job.jobID}">Pause</button>
                                <button class="edit-job btn btn-secondary mt-3" disabled>Edit Post</button>
                                <button class="view-analytics btn btn-info mt-3" data-job-id="${job.jobID}">View Analytics</button>
                                <button class="boost-job btn btn-success mt-3" data-job-id="${job.jobID}">${boostButtonText}</button> <!-- Boost Button -->
                                <button class="close-job-details btn btn-secondary mt-3">Close</button> <!-- Close button -->
                            </div>
                        </div>
                    </div>
                `);
                $('#job-posts-container').append(jobElement);
            });
                 
        // Event listener for the boost button
$(document).on('click', '.boost-job', function() {
    const jobID = $(this).closest('.job-post').data('job-id'); // Get the job ID from the parent element
    const jobIndex = jobPosts.findIndex(job => job.jobID === jobID); // Find the job index in the jobPosts array

    if (jobIndex !== -1) {
        const job = jobPosts[jobIndex];
        
        // Toggle boost status
        job.boosted = !job.boosted; // Toggle the boosted status
        job.boostDuration = job.boosted ? 24 : 0; // Set duration to 24 hours if boosted, else 0

        // Update the button text and icon
        const boostButton = $(this);
        const boostIcon = job.boosted ? 'fas fa-star' : 'fas fa-star-half-alt';
        const boostButtonText = job.boosted ? 'Boosted' : 'Boost';
        
        boostButton.text(boostButtonText);
        boostButton.siblings('.status-indicator').toggleClass('text-warning', job.boosted); // Example of changing color

        // Update the icon next to the job title
        boostButton.closest('.job-title').find('i').first().attr('class', boostIcon);
        
        // Optionally, you can update the UI to reflect the boost duration, if necessary
        $(this).closest('.job-details').find('li:contains("Boost Duration:")').text(`Boost Duration: ${job.boosted ? job.boostDuration + ' hours' : 'Not Boosted'}`);
    }
});

            $('#show-drafts').on('click', () => {
                const filteredJobs = jobPosts.filter(job => job.status.toLowerCase() === 'draft');
            
                // Show or hide job posts based on filtered results
                $('.job-post').hide(); // First hide all job posts
                filteredJobs.forEach(job => {
                    // Show job posts that match the filtered results
                    $(`.job-post[data-job-id="${job.jobID}"]`).show();
                });
            });
                    
            $('#show-active').on('click', () => {
                const filteredJobs = jobPosts.filter(job => job.status.toLowerCase() === 'active');
            
                // Show or hide job posts based on filtered results
                $('.job-post').hide(); // First hide all job posts
                filteredJobs.forEach(job => {
                    // Show job posts that match the filtered results
                    $(`.job-post[data-job-id="${job.jobID}"]`).show();
                });
            });
            
            $('#show-all-jobs').on('click', () => {
                const filteredJobs = jobPosts.filter(job => {
                    const jobStatus = job.status.toLowerCase();
                    return jobStatus === 'active' || jobStatus === 'draft' || jobStatus === 'paused';
                });
            
                $('.job-post').hide(); // First hide all job posts
                filteredJobs.forEach(job => {
                    // Show job posts that match the filtered results
                    $(`.job-post[data-job-id="${job.jobID}"]`).show();
                });
            });
            
            $('#show-paused').on('click', () => {
                const filteredJobs = jobPosts.filter(job => job.status.toLowerCase() === 'paused');
            
                $('.job-post').hide(); // First hide all job posts
                filteredJobs.forEach(job => {
                    // Show job posts that match the filtered results
                    $(`.job-post[data-job-id="${job.jobID}"]`).show();
                });
            });
            



// Sort jobs when the sort dropdown changes
$('#sort-job').on('change', function () {
    const sortOrder = $(this).val(); // 'asc' or 'desc'
    
    // Convert the job posts to an array for sorting
    const jobsArray = $('.job-post').toArray();
    
    // Sort the jobs based on the createdAt field, which is assumed to be in a data attribute
    jobsArray.sort(function (a, b) {
        // Get the createdAt timestamps from data attributes
        const dateA = new Date($(a).data('created-at')); // Assuming each .job-post has a data-created-at attribute
        const dateB = new Date($(b).data('created-at'));

        // Compare based on sortOrder
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Clear the current job posts container
    $('#job-posts-container').empty().append(jobsArray); // Clear the container and re-append sorted jobs
});

// Filter job posts based on salary range input
$('#filter-salary').on('input', function () {
    const minSalary = parseInt($('#min-salary').val()) || 0;
    const maxSalary = parseInt($('#max-salary').val()) || Infinity;

    $('.job-post').each(function () {
        const salaryText = $(this).find('.job-details li:contains("Salary")').text();
        const salary = parseInt(salaryText.replace(/[^0-9]/g, '')); // Extract number

        // Toggle display based on salary range
        $(this).toggle(salary >= minSalary && salary <= maxSalary);
    });
});

// Filter job posts based on application deadline
$('#filter-deadline').on('change', function () {
    const selectedDeadline = new Date($(this).val());

    $('.job-post').each(function () {
        const deadlineText = $(this).find('.job-details li:contains("Application Deadline")').text();
        const deadline = new Date(deadlineText);
        
        // Toggle display if the job's deadline is before the selected deadline
        $(this).toggle(deadline <= selectedDeadline || !deadlineText);
    });
});




            // Implement toggle functionality for company details
            $(document).on('click', '.job-title', function () {
                $(this).next('.job-details').toggle();
            });

// Implement toggle functionality for job details
$(document).on('click', '.view-job', function () {
    $(this).next('.job-details').toggle();
    const jobID = $(this).closest('.job-post').data('job-id');
    window.location.href = `../views/job-detail?id=${jobID}`;
});



// Implement close button functionality
$(document).on('click', '.close-job-details', function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    $(this).closest('.job-details').hide(); // Hide the job details (without animation)
});






$(document).on('click', '.deactivate-job', function () {
    const jobID = $(this).data('job-id');
    const $jobPost = $(this).closest('.job-post'); // Get the parent job post element

    // Update the job status to 'deactivated'
    updateJobStatus(jobID, 'deactivated', recruiterID) 
        .then(() => {
           // $jobPost.hide();
            // Hide the job post after successful status update
            $jobPost.slideUp(); // Optional: use slideUp for a smooth transition
        })
        .catch((error) => {
            console.error("Error updating job status:", error);
            // Optionally, show an error message to the user
        });
});






$(document).on('click', '.pause-job', async function () {
    const jobID = $(this).data('job-id');

    // Check the current status
    const currentStatus = $(this).siblings('.status').text().trim();

    // Determine the new status and update accordingly
    if (currentStatus === 'Paused') {
        // Change to "active" status
        await updateJobStatus(jobID, 'active', recruiterID); // Update status in the database

        // Update the UI
        $(this).siblings('.status').text('Active'); // Change displayed status to 'Active'
        $(this).text('Pause'); // Change button text to 'Pause'
    } else {
        // Change to "paused" status
        await updateJobStatus(jobID, 'paused', recruiterID);// Update status in the database

        // Update the UI
        $(this).siblings('.status').text('Paused'); // Change displayed status to 'Paused'
        $(this).text('Resume'); // Change button text to 'Resume'
    }
});


$(document).on('click', '.pause-job', async function () {
    const jobID = $(this).data('job-id');

    try {
        // Update status to 'paused'
        await updateJobStatus(jobID, 'paused', recruiterID);

        // Update the job post status in the UI
        const $jobPost = $(this).closest('.job-post'); // Get the parent job post
        $jobPost.find('.status').text('Paused'); // Update the displayed status
        $(this).text('Resume'); // Change button text to "Resume"
    } catch (error) {
        console.error("Error updating job status:", error);
      
    }
});

// Implement view analytics functionality
$(document).on('click', '.view-analytics', function () {
    const jobID = $(this).data('job-id');
    // Code to open the analytics page or modal
   // openAnalytics(jobID); // Define this function to handle displaying analytics
});




            // Loop through moderated companies and display them
            moderatedCompanies.forEach(company => {
                const companyElement = $(`
                    <div class="company-post card mb-3" data-company-id="${company.companyId}">
                        <div class="card-body">
                            <h5 class="company-name card-title text-primary" style="cursor: pointer;">${company.companyName}</h5>
                            <div class="company-details" style="display: none;">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><strong>Location:</strong> ${company.location}</li>
                                    <li class="list-group-item"><strong>Industry:</strong> ${company.industry}</li>
                                    <li class="list-group-item"><strong>Description:</strong> ${company.description}</li>
                                </ul>
                                <button class="view-company btn btn-info mt-3" data-company-id="${company.companyId}">View Company</button>
                                <button class="edit-company btn btn-secondary mt-3 ms-2" data-company-id="${company.companyId}">Edit Company</button>
                            </div>
                        </div>
                    </div>
                `);
                $('#companies-container').append(companyElement);
            });
        
            // Event delegation to handle View Company button click
            $(document).on('click', '.view-company', function () {
                const companyId = $(this).data('company-id');
                window.location.href = `../views/company-page?c=${companyId}`;
            });
        
            // Event delegation to handle Edit Company button click
            $(document).on('click', '.edit-company', function () {
                const companyId = $(this).data('company-id');
                window.location.href = `../views/company-page?edit=${companyId}`;
            });
        
            // Implement toggle functionality for company details
            $(document).on('click', '.company-name', function () {
                $(this).next('.company-details').toggle();
            });
        
            fetchJobApplications(jobIDsList);

        } else {
            const errorMessage = $(`
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Error!</h4>
                    <p>Unable to retrieve company information. Please try again later.</p>
                    <hr>
                    <p class="mb-0">If the problem persists, contact support.</p>
                </div>
            `);
        
            // Append the error message to the companies container
            $('#companies-container').append(errorMessage);
                }

                console.log( "Users", recruiterID);  
            
}




// Function to get the status color based on job status
function getStatusIcon(status) {
    let iconClass;

    switch (status.toLowerCase()) {
        case 'active':
            iconClass = 'fas fa-check-circle'; // Font Awesome icon for active
            break;
        case 'paused':
            iconClass = 'fas fa-pause-circle'; // Font Awesome icon for paused
            break;
        case 'deactivated':
            iconClass = 'fas fa-times-circle'; // Font Awesome icon for deactivated
            break;
        default:
            iconClass = 'fas fa-question-circle'; // Default icon for unknown status
            break;
    }

    return iconClass; // Return the icon class

}

// Example of how to update the button text based on status
function updatePauseButton($button, status) {
    if (status.toLowerCase() === 'paused') {
        $button.text('Resume'); // Change button text to 'Resume'
    } else if (status.toLowerCase() === 'active') {
        $button.text('Pause'); // Change button text to 'Pause'
    }
}

// Usage example
$(document).on('click', '.pause-job', function () {
    const jobID = $(this).data('job-id');
    const currentStatus = $(this).data('status'); // Assume you have the status stored in the button
    const newStatus = currentStatus === 'paused' ? 'active' : 'paused';
    
    // Call your update function
    updateJobStatus(jobID, newStatus, recruiterID); // Update status in the database

    // Update UI elements
    const $pauseButton = $(this); // Reference to the clicked button
    updatePauseButton($pauseButton, newStatus); // Update button text based on the new status

    // Get and update the status icon
    const iconClass = getStatusIcon(newStatus);
    $pauseButton.find('i').attr('class', iconClass); // Update the icon class
});



// Function to update the job status in the Jobs collection
async function updateJobStatus(jobID, newStatus, recruiterID) {
    const jobRef = doc(db, "Jobs", jobID);
    await updateDoc(jobRef, {
        status: newStatus
    });


    // Update the job status in the user's jobPosts array
    const userRef = doc(db, "Users", recruiterID);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        const jobPosts = userData.jobPosts || [];

        const jobIndex = jobPosts.findIndex(job => job.jobID === jobID);


        if (jobIndex === -1) {
            console.error("Job not found in user's job posts.");
            return; // Exit the function if the job post isn't found
        }
        
        // Proceed with the update
        jobPosts[jobIndex].status = newStatus;
        
        if (jobIndex !== -1) {
            // Update the status of the job post in the array
            jobPosts[jobIndex].status = newStatus;

            // Write the updated jobPosts array back to Firestore
            await updateDoc(userRef, {
                jobPosts: jobPosts
            });
        } else {
            console.error("Job not found in user's job posts.");
        }
    } else {
        console.error("User document does not exist.");
    }

    showToast(`Job ${jobID} has been updated to ${newStatus}.`, 'success');
}

// Expand/Collapse All functionality
$('#expand-all-jobs').on('click', function () {
    $('.job-details').show();
});

$('#collapse-all-jobs').on('click', function () {
    $('.job-details').hide();
});

$('#expand-all-companies').on('click', function () {
    $('.company-details').show();
});

$('#collapse-all-companies').on('click', function () {
    $('.company-details').hide();
});












// Enhanced search functionality (search across job title, location, and company name)
$('#search-job').on('input', function () {
    const searchTerm = $(this).val().toLowerCase();
    $('.job-post').each(function () {
        const jobTitle = $(this).find('.job-title').text().toLowerCase();
        const jobLocation = $(this).find('.job-details p:contains(Location)').text().toLowerCase();
        const companyName = $(this).find('.job-details p:contains(Company)').text().toLowerCase();

        // Toggle display based on search matching job title, location, or company name
        $(this).toggle(jobTitle.includes(searchTerm) || jobLocation.includes(searchTerm) || companyName.includes(searchTerm));
    });
});





// Search companies as the user types
$('#search-company').on('input', function () {
    const searchTerm = $(this).val().toLowerCase(); // Get the search term and convert it to lowercase
    
    $('.company-post').each(function () {
        const companyName = $(this).find('.company-name').text().toLowerCase(); // Get the company name
        const companyLocation = $(this).find('.company-details li:contains("Location:")').text().toLowerCase(); // Get the company location
        const companyIndustry = $(this).find('.company-details li:contains("Industry:")').text().toLowerCase(); // Get the company industry
        
        // Toggle display based on search matching company name, location, or industry
        $(this).toggle(companyName.includes(searchTerm) || companyLocation.includes(searchTerm) || companyIndustry.includes(searchTerm));
    });
});








// Function to fetch job applications based on job IDs
async function fetchJobApplications(jobIDs) {
    const applicationsRef = collection(db, "Applications");
    const applicationsQuery = query(applicationsRef, where("jobId", "in", jobIDs));
    const querySnapshot = await getDocs(applicationsQuery);

    console.log.apply("??????????????/");

    // Clear the container before inserting new applications
    $('#application-posts-container').empty();

    querySnapshot.forEach(doc => {
        const application = doc.data();
        const applicationElement = $(`
            <div class="application-post card mb-3" data-applicant-id="${doc.id}">
                <div class="card-body">
                    <h5 class="applicant-name card-title text-primary" style="cursor: pointer;">
                        ${application.firstName} ${application.lastName}
                    </h5>
                    <div class="application-details" style="display: none;">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Job Title:</strong> ${application.jobTitle}</li>
                            <li class="list-group-item"><strong>Company Name:</strong> ${application.companyName}</li>
<li class="list-group-item"><strong>Apply Date:</strong> 
    ${application.applyDate ? new Date(application.applyDate.seconds * 1000).toLocaleDateString() : "Not available"}
</li>
                            <li class="list-group-item"><strong>Email:</strong> ${application.email}</li>
                            <li class="list-group-item"><strong>Phone:</strong> ${application.phone}</li>
                            <li class="list-group-item"><strong>Notes:</strong> ${application.notes || "No notes available."}</li>
                        </ul>
                        <a href="${application.resumeLink}" target="_blank" class="btn btn-link mt-2">Download Resume</a><br>
                        <a href="${application.videoResumeLink}" target="_blank" class="btn btn-link">Download Video Resume</a><br>
                        <button class="view-application btn btn-info mt-3" data-applicant-id="${doc.id}">View Application</button>
                        <button class="request-interview btn btn-secondary mt-3 ms-2" data-applicant-id="${doc.id}">Request Interview</button>
                        <button class="request-test btn btn-warning mt-3 ms-2" data-applicant-id="${doc.id}">Request Test</button>
                    </div>
                </div>
            </div>
        `);
        $('#application-posts-container').append(applicationElement);
    });
    

    // Implement toggle functionality for application details
    $('.applicant-name').on('click', function () {
        $(this).next('.application-details').toggle();
    });

    // Implement action button functionality
    $('.view-application').on('click', function () {
        const applicantID = $(this).data('applicant-id');
        viewApplication(applicantID); // Implement this function as needed
    });

    $('.request-interview').on('click', function () {
        const applicantID = $(this).data('applicant-id');
        requestInterview(applicantID); // Implement this function as needed
    });

    $('.request-test').on('click', function () {
        const applicantID = $(this).data('applicant-id');
        requestTest(applicantID); // Implement this function as needed
    });
}

// Function to implement search functionality
$('#search-applicant').on('input', function () {
    const searchTerm = $(this).val().toLowerCase();
    $('.application-post').each(function () {
        const applicantName = $(this).find('.applicant-name').text().toLowerCase();
        const jobTitle = $(this).find('.application-details p:contains(Job Title)').text().toLowerCase();
        $(this).toggle(applicantName.includes(searchTerm) || jobTitle.includes(searchTerm));
    });
});

// Sample job IDs array (replace this with the actual array of job IDs)
//const jobIDs = ["L6deju3QokTWiDwHNbl3", "anotherJobID"]; // Update this as necessary

// Call the function to fetch job applications when the page loads


// Placeholder functions for actions
function viewApplication(applicantID) {
    console.log(`Viewing application for: ${applicantID}`);
    // Logic to view application details
}

function requestInterview(applicantID) {
    console.log(`Requesting interview for: ${applicantID}`);
    // Logic to send interview request
}

function requestTest(applicantID) {
    console.log(`Requesting test for: ${applicantID}`);
    // Logic to send test request
}




















