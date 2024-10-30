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
let jobIDs = []; // Populate with relevant job IDs, if any
let jobTitle = document.getElementById("jobTitle").value;


// Define the submitJobPost function
const submitJobPost = async (
  jobTitle,
  companyId,
  companyName,
  recruiterID,
  jobIDs
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
    newCompanyId = await submitJobPost(jobTitle, companyIdValue, companyName, recruiterID, jobIDs);

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
    showToast("An error occurred while collecting job details: " + error.message, 'error')
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
    boostExpiration: '',
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
        boostExpiration: '',
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

      showLoader(1000);

      $("#jobModal").modal("hide");

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













let jobIDsList = []; // Initialize an empty array to store jobIDs
let companiesIDsList = []; // Initialize an empty array to store jobIDs
        // Define jobIDsList and companiesIDsList


// Function to fetch job posts and moderated companies for the recruiter
async function fetchRecruiterData(recruiterID) {
  const userRef = doc(db, "Users", recruiterID);
  const userDoc = await getDoc(userRef);
  //console.log("recruiterID   ",recruiterID);




      // Loop through job posts and display them
      if (userDoc.exists()) {

          let jobPosts = userDoc.data().jobPosts || [];

          jobPosts = removeUndefined(jobPosts);

      
// Create a Set to track unique company IDs
const uniqueCompanyIds = new Set();

// Filter jobPosts to create moderatedCompanies with unique company IDs
let moderatedCompanies = jobPosts.filter(job => {
  // Check if the companyId is already in the Set
  let companyID = removeUndefined(job.companyId);

  if (!uniqueCompanyIds.has(companyID)) {
      uniqueCompanyIds.add(companyID); // Add the companyId to the Set
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

          // Clear containers before inserting new job posts and companies
          $('#job-posts-container').empty();
          $('#companies-container').empty();
      

      
          // Loop through job posts and display them
          jobPosts.forEach(job => {
              jobIDsList.push(job.jobID); // Push each jobID into the array
              jobIDsList = removeUndefined(jobIDsList);

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
      job.addboostExpiration;

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
  const currentStatus = $(this).siblings('.status').text().trim();

  try {
      if (currentStatus === 'Paused') {
          // Change to "active" status
          await updateJobStatus(jobID, 'active', recruiterID); // Update status in the database
          $(this).siblings('.status').text('Active'); // Change displayed status to 'Active'
          $(this).text('Pause'); // Change button text to 'Pause'
      } else {
          // Change to "paused" status
          await updateJobStatus(jobID, 'paused', recruiterID); // Update status in the database
          $(this).siblings('.status').text('Paused'); // Change displayed status to 'Paused'
          $(this).text('Resume'); // Change button text to 'Resume'
      }
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
      
          jobIDsList = removeUndefined(jobIDsList);

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
              console.log( "jobIDsList", jobIDsList);  
          
}



$(document).on('click', '.pause-job', async function () {
  const jobID = $(this).data('job-id');
  const currentStatus = $(this).siblings('.status').text().trim();
  
  const newStatus = currentStatus === 'Paused' ? 'Active' : 'Paused';
  
  await updateJobStatus(jobID, newStatus, recruiterID);
  updateJobUI(jobID, newStatus, this); // Use the new function to update UI
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





function getStatusIcon(status) {
let iconClass;

if (typeof status === 'string') {
    switch (status.toLowerCase()) {
        case 'active': iconClass = 'fas fa-check-circle'; break;
        case 'paused': iconClass = 'fas fa-pause-circle'; break;
        case 'deactivated': iconClass = 'fas fa-times-circle'; break;
        case 'approved': iconClass = 'fas fa-thumbs-up'; break;
        case 'rejected': iconClass = 'fas fa-thumbs-down'; break;
        case 'under review': iconClass = 'fas fa-hourglass-half'; break;
        default: iconClass = 'fas fa-question-circle'; break;
    }
} else {
    iconClass = 'fas fa-question-circle';
}

return iconClass;
}
function getStatusColor(status) {
  if (typeof status !== 'string') {
      return 'gray'; // Default color for non-string values
  }
  
  switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'paused': return 'yellow';
      case 'deactivated': return 'red';
      case 'approved': return 'blue';
      case 'rejected': return 'darkred';
      case 'under review': return 'orange';
      default: return 'gray';
  }
}





let debounceTimer;

$('#filter-salary, #filter-deadline').on('input change', function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
      // Call the filtering logic functions
      filterBySalary();
      filterByDeadline();
  }, 300); // Adjust the delay as necessary
});

// Filter job posts based on salary range input
function filterBySalary() {
  const minSalary = parseInt($('#min-salary').val()) || 0;
  const maxSalary = parseInt($('#max-salary').val()) || Infinity;

  $('.job-post').each(function () {
      const salaryText = $(this).find('.job-details li:contains("Salary")').text();
      const salary = parseInt(salaryText.replace(/[^0-9]/g, '')); // Extract number

      // Toggle display based on salary range
      $(this).toggle(salary >= minSalary && salary <= maxSalary);
  });
}

// Filter job posts based on application deadline
function filterByDeadline() {
  const selectedDeadline = new Date($('#filter-deadline').val());

  $('.job-post').each(function () {
      const deadlineText = $(this).find('.job-details li:contains("Application Deadline")').text();
      const deadline = new Date(deadlineText);
      
      // Toggle display if the job's deadline is before the selected deadline
      $(this).toggle(deadline <= selectedDeadline || !deadlineText);
  });
}

















let jobID = '';



// Define the filtering function first
const filterApplications = (applications, statusFilter) => {


if (statusFilter === 'all') return applications;
return applications.filter(app => app.status === criteria);
};

// Define the sorting function
const sortApplications = (applications, sortCriteria) => {
return applications.sort((a, b) => {
    switch (sortCriteria) {
        case "jobTitle": 
            return (a.jobTitle || '').localeCompare(b.jobTitle || '');
        case "companyName": 
            return (a.companyName || '').localeCompare(b.companyName || '');
            case "applicantName": 
            return `${a.firstName || ''} ${a.lastName || ''}`.localeCompare(`${b.firstName || ''} ${b.lastName || ''}`);
        
        default: 
            return 0; // No sorting if criteria is unrecognized
    }
});
};




// Utility: Date Formatting
const formatDate = (dateObj) => dateObj ? new Date(dateObj.seconds * 1000).toLocaleDateString() : "Not available";

const getBoostedStyle = (isBoosted) => {
if (isBoosted) {
    return 'background-color: yellow; font-weight: bold;'; // Example boosted style
} else {
    return ''; // No special style for non-boosted applications
}
};


// Group Applications by Job Title and Company
const groupApplicationsByJob = (applications) => {
return applications.reduce((acc, app) => {
  const key = `${app.jobTitle}|${app.companyName}`;
  (acc[key] = acc[key] || []).push(app);
    return acc;
}, {});
};

// Function to render single application HTML
const renderApplicationHTML = (application, jobTitle, companyName) => {
const statusIcon = getStatusIcon(application.status);
const statusColor = getStatusColor(application.status);

const customQuestionsButton = application.customQuestions && application.customQuestions.length > 0
  ? `<button class="btn btn-outline-info mt-3 view-video-answers" data-applicant-id="${application.id}">
       <i class="bi bi-camera-video"></i> View Video Answers
     </button>`
  : '';

const statusButtons = {
  "Under Review": application.status !== "Under Review"
    ? `<button class="btn btn-warning btn-sm mt-3 ms-2 under-review-application" data-applicant-id="${application.id}">
         <i class="bi bi-pencil-square"></i> Under Review
       </button>`
    : `<button class="btn btn-outline-warning btn-sm mt-3 ms-2" disabled title="Already under review">
         <i class="bi bi-check-circle"></i> Already Under Review
       </button>`,
  "Request Interview": application.status !== "Interview Requested"
    ? `<button class="btn btn-secondary btn-sm mt-3 ms-2 request-interview" data-applicant-id="${application.id}">
         <i class="bi bi-calendar3"></i> Request Interview
       </button>`
    : `<button class="btn btn-outline-secondary btn-sm mt-3 ms-2" disabled title="Interview already requested">
         <i class="bi bi-check-circle"></i> Interview Requested
       </button>`,
  "Request Test": application.status !== "Test Requested"
    ? `<button class="btn btn-warning btn-sm mt-3 ms-2 request-test" data-applicant-id="${application.id}">
         <i class="bi bi-file-earmark-text"></i> Request Test
       </button>`
    : `<button class="btn btn-outline-warning btn-sm mt-3 ms-2" disabled title="Test already requested">
         <i class="bi bi-check-circle"></i> Test Requested
       </button>`
};

return `
  <div class="application-post card mb-3" data-applicant-id="${application.id}" style="border: ${getBoostedStyle(application.isBoosted)};">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <h5 class="applicant-name card-title text-primary" style="color: ${statusColor}; cursor: pointer;">
            ${application.firstName} ${application.lastName} 
            <i class="${statusIcon}" style="margin-left: 5px;"></i>
          </h5>
          ${application.boostedApp ? '<span class="badge bg-warning text-dark ms-2">Boosted</span>' : ''}
        </div>
        <button class="btn btn-outline-success save-application" data-applicant-id="${application.id}">
          <i class="bi bi-bookmark"></i> Save
        </button>
      </div>

      <div class="mt-2">
        <input class="form-check-input select-applicant" type="checkbox" value="${application.id}" id="select-applicant-${application.id}">
        <label class="form-check-label" for="select-applicant-${application.id}">Select</label>
      </div>

      <div class="application-details mt-3" style="display: none;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>Job Title:</strong> ${jobTitle}</li>
          <li class="list-group-item"><strong>Company Name:</strong> ${companyName}</li>
          <li class="list-group-item"><strong>Apply Date:</strong> ${formatDate(application.applyDate)}</li>
          <li class="list-group-item"><strong>Email:</strong> ${application.email}</li>
          <li class="list-group-item"><strong>Phone:</strong> ${application.phone}</li>
          <li class="list-group-item"><strong>Portfolio:</strong> <a href="${application.portfolio}" target="_blank">${application.portfolio || 'N/A'}</a></li>
          <li class="list-group-item"><strong>Feedback:</strong> ${application.feedback || 'No feedback yet.'}</li>
          <li class="list-group-item"><strong>Status:</strong> <span class="badge" style="background-color: ${statusColor};">${application.status}</span></li>
          <li class="list-group-item">
            <label for="noteType-${application.id}"><strong>Note Type:</strong></label>
            <select class="form-select note-type-selector" id="noteType-${application.id}">
              <option value="General">General</option>
              <option value="Important">Important</option>
              <option value="Follow-up">Follow-up</option>
            </select>
          </li>
          <li class="list-group-item">
            <label for="notes-${application.id}"><strong>Notes:</strong></label>
            <textarea id="notes-${application.id}" class="form-control notes-input" rows="4">${application.notes || "No notes available."}</textarea>
          </li>
          <button class="btn btn-outline-success mt-3 save-notes save-application" data-applicant-id="${application.id}">
            <span class="spinner-border spinner-border-sm" role="status" style="display:none;"></span>
            Save Notes
          </button>
        </ul>
        <div class="mt-3">
          <a href="${application.resumeLink}" target="_blank" class="btn btn-link"><i class="bi bi-file-earmark"></i> Download Resume</a>
          <a href="${application.videoResumeLink}" target="_blank" class="btn btn-link"><i class="bi bi-camera-video"></i> Download Video Resume</a>
        </div>
        ${statusButtons["Request Interview"]}
        ${statusButtons["Request Test"]}
        ${statusButtons["Under Review"]}
        ${customQuestionsButton} <!-- Button for video answers -->
      </div>
    </div>

    <div class="card-footer d-flex justify-content-between">
      <button class="btn btn-outline-danger reject-application" data-applicant-id="${application.id}">
        <i class="bi bi-x-circle"></i> Reject
      </button>
      <button class="btn btn-primary approve-application" data-applicant-id="${application.id}">
        <i class="bi bi-check-circle"></i> Approve
      </button>
    </div>
  </div>
`;
};
async function fetchJobApplications(jobIDs) {
jobIDs = removeUndefined(jobIDs);

console.log("fetchJobApplications jobIDs", jobIDs);

try {
  // Show loading state
  $("#application-posts-container").html("<p>Loading applications...</p>");

  const applications = await getApplicationsFromDB(jobIDs);
  
  // Render applications once they are fetched
  renderApplications(applications);

  // Attach event listeners after rendering
  attachToggleJobTitles();
  attachActionButtons();
} catch (error) {
  console.error("Error fetching applications:", error);
  $("#application-posts-container").html(
    "<p>Error fetching applications. Please try again later.</p>"
  );
}
}

// Function to get applications from the database
async function getApplicationsFromDB(jobIDs) { 
  const applicationStatuses = {
    "approved": "Application Approved",
    "rejected": "Application Rejected",
    "under review": "Under Review",
    "pending": "Pending",
    "application approved": "Application Approved",
    "application rejected": "Application Rejected",
    "under review": "Under Review",
    "pending approval": "Pending Approval"
  };

  const applicationsRef = collection(db, "Applications");
  const applicationsQuery = query(applicationsRef, where("jobId", "in", jobIDs));
  const querySnapshot = await getDocs(applicationsQuery);

  const applications = [];
  querySnapshot.forEach((doc) => {
    const application = doc.data();
    applications.push({ ...application, id: doc.id });
  });

  console.log("applications  ", applications);

  // Normalize and map application statuses
  applications.forEach(app => {
    const statusKey = typeof app.status === 'string' ? app.status.trim().toLowerCase() : "";
    const statusValue = applicationStatuses[statusKey] || "Unknown Status";
    app.normalizedStatus = statusValue; // Add normalized status to the application object
  });

  return applications;
}

// Function to render applications
function renderApplications(applications) {
const groupedApplications = groupApplicationsByJob(applications);
$("#application-posts-container").empty();


// Function to render Job Title with Applicants
const renderJobTitleWithApplicants = (jobTitle, companyName, boosted, applicants) => {
  const applicantsHTML = applicants.map(application => renderApplicationHTML(application, jobTitle, companyName)).join('');

  if(boosted){
  const jobHTML = `
      <div class="job-title-section border colorBlue">
          <h4 class="job-title" style="cursor: pointer;">${jobTitle} - ${companyName}</h4>
          <div class="applicants-list" style="display: block;">
              ${applicantsHTML}
          </div>
      </div>
  `;

  // Return the generated jobHTML to be appended elsewhere
  return jobHTML;


  }else{
const jobHTML = `
      <div class="job-title-section">
          <h4 class="job-title" style="cursor: pointer;">${jobTitle} - ${companyName}</h4>
          <div class="applicants-list" style="display: none;">
              ${applicantsHTML}
          </div>
      </div>
  `;

  // Return the generated jobHTML to be appended elsewhere
  return jobHTML;

  }


};


Object.entries(groupedApplications).forEach(([key, applicants]) => {
  const [jobTitle, companyName, boosted] = key.split("|");
  const jobSection = renderJobTitleWithApplicants(jobTitle, companyName, boosted, applicants);
  $("#application-posts-container").append(jobSection);
});

// Make sure sorting and filtering dropdowns are available
setupSortingAndFiltering(applications);
}

// Function to handle status updates without re-fetching from the database
function updateApplicationStatus(applicationId, newStatus) {
// Find the application in the existing state (or you can pass the application data if needed)
const applicationElement = document.getElementById(applicationId); // Use the application ID as the element ID or modify as needed
if (applicationElement) {
  const statusMappings = {
    "approved": "Application Approved",
    "rejected": "Application Rejected",
    "under review": "Under Review",
    "pending": "Pending"
  };

  const normalizedStatus = statusMappings[newStatus] || newStatus; // Map to the normalized status

  // Update the application HTML to reflect the new status
  applicationElement.querySelector('.application-status').textContent = normalizedStatus; // Assuming you have an element with this class for the status
} else {
  console.error("Application not found for ID:", applicationId);
}
}

// Example of how to call the update function when a status is changed
// updateApplicationStatus('some-application-id', 'approved'); // Call this with the actual application ID and the new status

// Other existing functions like renderJobTitleWithApplicants, attachToggleJobTitles, attachActionButtons, etc. remain the same







// Toggle Job Title Sections
function attachToggleJobTitles() {




// Toggle for applicant names
$(document).on('click', '.applicant-name', function () {
console.log("Applicant name clicked");

// Toggle application details
$(this).closest('.application-post').find('.application-details').toggle();
});

// Toggle for job titles (assuming this is also included)
$(document).on('click', '.job-title', function () {
console.log("Job title clicked");

// Toggle applicants list or details associated with job title
$(this).next('.applicants-list').toggle(); // Adjust based on your structure
});

}

$('#sort-applications, #filter-status').on('change', debounce(() => {
fetchJobApplications(jobIDsList);
}, 300));

// Utility: Debounce Function to Optimize Input Events
debounce = (func, delay) => {
let timeout;
return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
};
};

// Utility: Throttle Function to Optimize Scroll Events (if needed)
function throttle(fn, wait) {
let lastTime = 0;
return function(...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
        lastTime = now;
        return fn.apply(this, args);
    }
};
}

$(function () {
$('[data-toggle="tooltip"]').tooltip();
});

// Function to render applications dynamically based on status
function renderApplication(applicantId, status, applicationHTML) {
console.log("status  ", status);

// Mapping system for statuses
const statusMappings = {
  "approved": ["approved", "Application Approved", "application approved"],
  "rejected": ["rejected", "Application Rejected", "application rejected"],
  "under review": ["under review", "Under Review"],
  "pending": ["pending", "pending approval", "Pending Approval"]
};

// Mapping system for corresponding section IDs
const sectionIdMap = {
  'approved': '#approvedApplicationsContainer',
  'under review': '#underReviewApplicationsContainer',
  'rejected': '#rejectedApplicationsContainer',
  'pending': '#pendingApplicationsContainer'
};

// Function to normalize status
function getStatusKey(status) {

  for (const [key, variations] of Object.entries(statusMappings)) {
    if (variations.includes(status.toLowerCase())) {
      return key; // Return the standard status key if a match is found
    }
  }  


  return null; // Return null if no matching status is found
}

// Get the normalized status key
const statusKey = getStatusKey(status);

// If we have a valid status key, find the corresponding container
if (statusKey) {
  const containerSelector = sectionIdMap[statusKey]; // Get the container based on normalized status
  const container = document.querySelector(`${containerSelector} .application-section`);
  
  if (container) {
    container.innerHTML += applicationHTML; // Insert the passed HTML into the correct section
  } else {
    console.error(`Container for status ${statusKey} not found.`);
  }
} else {
  console.error(`Unknown status: ${status}`);
}
return 
;


}

// Example of filtering and sorting logic
function filterAndSortApplications() {
const searchQuery = document.querySelector('#search-applicant').value.toLowerCase();
const sortBy = document.querySelector('#sort-applications').value;
const filterStatus = document.querySelector('#filter-status').value.toLowerCase();

const allApplications = [...document.querySelectorAll('.application-post')];

allApplications.forEach(app => {
  const applicantName = app.dataset.applicantName.toLowerCase();
  const jobTitle = app.dataset.jobTitle.toLowerCase();
  const applicationStatus = app.dataset.status.toLowerCase();

  let shouldDisplay = true;

  // Apply search filter for applicant name and job title
  if (searchQuery && !applicantName.includes(searchQuery) && !jobTitle.includes(searchQuery)) {
    shouldDisplay = false;
  }

  // Apply status filter
  if (filterStatus !== 'all' && applicationStatus !== filterStatus) {
    shouldDisplay = false;
  }
  
  // Display or hide based on filtering
  app.style.display = shouldDisplay ? 'block' : 'none';
});

// Apply sorting logic based on the sortBy value
const sortedApplications = allApplications.filter(app => app.style.display !== 'none');

if (sortBy === 'applicant-name-asc') {
  sortedApplications.sort((a, b) => 
    a.dataset.applicantName.localeCompare(b.dataset.applicantName)
  );
} else if (sortBy === 'applicant-name-desc') {
  sortedApplications.sort((a, b) => 
    b.dataset.applicantName.localeCompare(a.dataset.applicantName)
  );
} else if (sortBy === 'job-title-asc') {
  sortedApplications.sort((a, b) => 
    a.dataset.jobTitle.localeCompare(b.dataset.jobTitle)
  );
} else if (sortBy === 'job-title-desc') {
  sortedApplications.sort((a, b) => 
    b.dataset.jobTitle.localeCompare(a.dataset.jobTitle)
  );
} else if (sortBy === 'company-name-asc') {
  sortedApplications.sort((a, b) => 
    a.dataset.companyName.localeCompare(b.dataset.companyName)
  );
} else if (sortBy === 'company-name-desc') {
  sortedApplications.sort((a, b) => 
    b.dataset.companyName.localeCompare(a.dataset.companyName)
  );
}

// Finally, append sorted applications back to the container
const container = document.querySelector('#application-posts-container');
container.innerHTML = '';
sortedApplications.forEach(app => container.appendChild(app));
}


// Attach event listeners for search, sort, and filter
document.querySelector('#search-applicant').addEventListener('input', filterAndSortApplications);
document.querySelector('#sort-applications').addEventListener('change', filterAndSortApplications);
document.querySelector('#filter-status').addEventListener('change', filterAndSortApplications);


// Action Buttons Event Listeners
function attachActionButtons() {
$('.view-application').off('click').on('click', function () {
    const applicantID = $(this).data('applicant-id');
    viewApplication(applicantID); // Implement this function
});

$('.request-interview').off('click').on('click', function () {
    const applicantID = $(this).data('applicant-id');
    requestInterview(applicantID); // Implement this function
});

$('.request-test').off('click').on('click', function () {
    const applicantID = $(this).data('applicant-id');
    requestTest(applicantID); // Implement this function
});
}


// Search applicants functionality
$('#search-applicant').on('input', function () {
const searchTerm = $(this).val().toLowerCase();
$('.job-title-section').each(function () {
    const jobTitle = $(this).find('.job-title').text().toLowerCase();
    const applicants = $(this).find('.application-post');
    const hasMatchingApplicant = [...applicants].some(applicant => {
        const applicantName = $(applicant).find('.applicant-name').text().toLowerCase();
        return applicantName.includes(searchTerm);
    });
    $(this).toggle(jobTitle.includes(searchTerm) || hasMatchingApplicant);
});
});




// Function to save the application data
async function saveApplication(applicantId) {
const saveButton = document.querySelector(`.save-application[data-applicant-id="${applicantId}"]`);
const spinner = saveButton.querySelector('.spinner-border');

try {
    // Show spinner
    spinner.style.display = 'inline-block';
    saveButton.disabled = true;
    
    const applicationElement = document.querySelector(`.application-post[data-applicant-id="${applicantId}"]`);
    const notes = applicationElement.querySelector('.notes-input').value;
    const noteType = applicationElement.querySelector('.note-type-selector').value;
    
    const maxLength = 500;
    if (notes.length > maxLength) {
        alert(`Please limit your notes to ${maxLength} characters.`);
        return; 
    }

    // Optional: confirmation prompt
    if (!confirm("Are you sure you want to save these notes?")) {
        return; 
    }

    await updateDoc(doc(db, "Applications", applicantId), {
        notes: arrayUnion({  
            note: notes, 
            type: noteType,
            timestamp: new Date().toLocaleString() 
        })
    });

    showToast('Application saved successfully!', 'success');
} catch (error) {
    console.error('Error saving application:', error);
    alert('Error saving application. Please try again.');
} finally {
    // Hide spinner and enable button
    spinner.style.display = 'none';
    saveButton.disabled = false;
}
}



// Function to set the application status to "Under Review"
// Function to set the application status to "Under Review"
async function underReviewApplication(applicantId) {
try {
  // Update the application status in the database
  await updateDoc(doc(db, "Applications", applicantId), {
    status: arrayUnion({  // Use arrayUnion to append a new status
      status: 'under review', // Change status to Under Review
      timestamp: new Date().toLocaleString() // Capture the current time
    })
  });

  showToast('Application set to Under Review successfully!', 'success');
  
  // Update the application status in the UI
  updateApplicationUI(applicantId, 'under review'); // Send the update to the UI

} catch (error) {
  console.error('Error updating application status to Under Review:', error);
  showToast('Error updating application status. Please try again.', 'error');
}
}

// Function to set the application status to "Pending"
async function pendingApplication(applicantId) {
try {
  // Update the application status in the database
  await updateDoc(doc(db, "Applications", applicantId), {
    status: arrayUnion({  // Use arrayUnion to append a new status
      status: 'pending', // Add 'Pending' status
      timestamp: new Date().toLocaleString() // Capture the current time
    })
  });

  showToast('Application set to Pending successfully!', 'success');

  // Update the application status in the UI
  updateApplicationUI(applicantId, 'pending'); // Send the update to the UI

} catch (error) {
  console.error('Error updating application status to Pending:', error);
  showToast('Error updating application status. Please try again.', 'error');
}
}


$('#approve-selected').off('click').on('click', function() {
getSelectedApplicants();  // Call the function to handle selected applicants
});

function getSelectedApplicants() {
// Get all selected (checked) applicants
const selectedApplicants = document.querySelectorAll('.select-applicant:checked');

selectedApplicants.forEach(applicant => {
    const applicantId = applicant.getAttribute('data-applicant-id');
    // Perform actions with each selected applicant (e.g., approve, reject, etc.)
    approveApplication(applicantId);
});
}

$('#reject-selected').off('click').on('click', function() {
getRejectedSelectedApplicants();  // Call the function to handle selected applicants
});

function getRejectedSelectedApplicants() {
// Get all selected (checked) applicants
const selectedApplicants = document.querySelectorAll('.select-applicant:checked');

selectedApplicants.forEach(applicant => {
    const applicantId = applicant.getAttribute('data-applicant-id');
    // Perform actions with each selected applicant (e.g., approve, reject, etc.)
    rejectApplication(applicantId);
});
}



// Function to approve the application
// Function to approve the application
async function approveApplication(applicantId) {
try {
  // Add the new status to the application's status array in the database
  await updateDoc(doc(db, "Applications", applicantId), {
    status: arrayUnion({  // Use arrayUnion to append a new status
      status: 'approved', // Add 'Approved' status
      timestamp: new Date().toLocaleString() // Capture the current time
    })
  });

  // Update the application status in the UI
  updateApplicationUI(applicantId, 'approved'); // Send the update to the UI

  showToast('Application approved successfully!', 'success');
} catch (error) {
  console.error('Error approving application:', error);
  showToast('Error approving application. Please try again.', 'error');
}
}

// Function to reject the application
async function rejectApplication(applicantId) {
try {
  // Add the new status to the application's status array in the database
  await updateDoc(doc(db, "Applications", applicantId), {
    status: arrayUnion({ // Use arrayUnion to append a new status
      status: 'rejected', // Add 'Rejected' status
      timestamp: new Date().toLocaleString() // Capture the current time
    })
  });

  // Update the application status in the UI
  updateApplicationUI(applicantId, 'rejected'); // Send the update to the UI

  showToast('Application rejected successfully!', 'success');
} catch (error) {
  console.error('Error rejecting application:', error);
  showToast('Error rejecting application. Please try again.', 'error');
}
}

// You may need to implement the updateApplicationStatus function if not already done
function updateApplicationUI(applicantId, newStatus) {
const applicationPost = document.querySelector(`.application-post[data-applicant-id="${applicantId}"]`);
if (applicationPost) {
  const statusText = newStatus.charAt(0).toUpperCase() + newStatus.slice(1); // Capitalize the first letter
  applicationPost.querySelector('.applicant-name').innerHTML += ` (${statusText})`; // Append status
  const applicationHTML = renderApplicationHTML({ applicantId, status: statusText }); // Generate HTML for the updated application
  renderApplication(applicantId, statusText, applicationHTML); // Render the application with new status
}
}






// Event listeners for the buttons
document.addEventListener('click', function(event) {
if (event.target.classList.contains('save-application')) {
    const applicantId = event.target.getAttribute('data-applicant-id');
    saveApplication(applicantId);
}

if (event.target.classList.contains('approve-application')) {
    const applicantId = event.target.getAttribute('data-applicant-id');
    approveApplication(applicantId);
}

if (event.target.classList.contains('reject-application')) {
    const applicantId = event.target.getAttribute('data-applicant-id');
    rejectApplication(applicantId);
}

// New event listener for Under Review
if (event.target.classList.contains('under-review-application')) {
    const applicantId = event.target.getAttribute('data-applicant-id');
    underReviewApplication(applicantId);
}

// New event listener for Pending
if (event.target.classList.contains('pending-application')) {
    const applicantId = event.target.getAttribute('data-applicant-id');
    pendingApplication(applicantId);
}
});





// Placeholder functions for actions
function viewApplication(applicantID) {
updateApplicationViews(applicationID, recruiterID);

  console.log(`Viewing application for: ${applicantID}    `+recruiterID);
  // Logic to view application details
}









async function updateApplicationViews(applicationID, recruiterID) {
// Reference to the specific application document
const applicationRef = doc(db, "Applications", applicationID);

// Use Firestore's FieldValue to increment the views by 1
await updateDoc(applicationRef, {
    views: increment(1), // This will increment the views field by 1
    recruiterID: recruiterID,
});

// Optionally show a toast notification to the user
showToast(`Application ${applicationID} views updated successfully.`, 'success');
}





/*


async function updateApplication(applicationID, updates) {
// Reference to the specific application document in Firestore
const applicationRef = doc(db, "Applications", applicationID);

// Update the application with the provided updates
await updateDoc(applicationRef, updates);

// Optionally: Update the application in the recruiter's applications array if necessary
const userRef = doc(db, "Users", updates.recruiterID);
const userDoc = await getDoc(userRef);

if (userDoc.exists()) {
    const userData = userDoc.data();
    const applications = userData.applications || [];

    const applicationIndex = applications.findIndex(app => app.applicationID === applicationID);

    if (applicationIndex !== -1) {
        // Update application in user's applications array
        Object.assign(applications[applicationIndex], updates);

        // Write the updated applications array back to Firestore
        await updateDoc(userRef, {
            applications: applications
        });
    } else {
        console.error("Application not found in user's applications.");
    }
} else {
    console.error("User document does not exist.");
}

// Optionally show a toast notification to the user
// showToast(`Application ${applicationID} has been updated successfully.`, 'success');
}

*/