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
  const companyName = document.getElementById("company").value;
  const recruiterID = document.getElementById("appUserID").innerText;
  const jobID = []; // Populate with relevant job IDs, if any
  const jobTitle = document.getElementById("jobTitle").value;
  
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
        // Create a new company in the Companies collection
        const newCompanyRef = await addDoc(collection(db, "Companies"), {
          companyName: companyName,
          recruiterIDs: [recruiterID],
          jobIDs: jobID,
          jobTitles: [jobTitle]
        });
  
        console.log("New company added with ID:", newCompanyRef.id);
        return newCompanyRef.id; // Return the new company ID for further use
      } else {
        console.log("Existing company ID:", companyId);
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
  
        console.log(
          "Using stored user data:",
          userName,
          publicBool,
          userPosition
        );
      } else {
        // Fetch from Firestore if not found in local storage
        const userDocRef = doc(db, "Users", user.uid); // Reference to the user document
        const userDoc = await getDoc(userDocRef); // Get the document
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(
            "Firebase User Data:",
            userData.displayName,
            userData.publicProfile,
            userData.position
          );
  
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
      console.log("createJobBtn added");
      await fetchUserData(); // Call to fetch user data
      handleJobSubmission(event, "post");
    });
  
  // Check for auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // User is signed in, proceed with user ID handling
        console.log("User ID: ", user.uid);
        const userDocRef = doc(db, "Users", user.uid); // Reference to the user document
        const userDoc = await getDoc(userDocRef); // Get the document
        if (userDoc.exists()) {
          // User data found
          const userData = userDoc.data();
          console.log("userName User Data:", userData.displayName);
          console.log("publicBool User Data:", userData.publicProfile);
          console.log("userPosition User Data:", userData.position);
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
  
    const companyIdValue = document.getElementById("appCompanyID").innerText;
    let newCompanyId = "";
  
    try {
      // Call submitJobPost to create or retrieve the company ID
      console.log(
        "Attempting to submit job post with companyIdValue:",
        companyIdValue
      );
      newCompanyId = await submitJobPost(
        jobTitle,
        companyIdValue,
        companyName,
        recruiterID,
        jobID
      );
  
      if (!newCompanyId || !companyIdValue) {
        showErrorMessage("Create a Company Page");
  
        return;
      } else {
        showErrorMessage("New Company ID returned:", newCompanyId);
      }
      // Update the hidden companyId field with the new value
      document.getElementById("appCompanyID").value = newCompanyId;
    } catch (error) {
      console.error("Error in submitJobPost:", error);
      showErrorMessage(
        "An error occurred while submitting the job post: " + error.message
      );
      return; // Exit the function on error
    }
  
    // Collect all job details from the form
    let jobDetails;
    try {
      jobDetails = collectJobDetails(newCompanyId);
      console.log("Collected Job Details:", jobDetails);
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
      jobDetails.boostExpiration = new Date(
        new Date().setDate(new Date().getDate() + 30)
      ); // Boost for 30 days
    }
  
    try {
      // Save job details to the database
      // console.log("Saving job to database with details:", jobDetails);
      const jobId = await saveJobToDatabase(jobDetails);
      showErrorMessage("Job saved successfully with ID:", jobId);
  
      // Action-specific alerts and UI feedback
      if (actionType === "boost") {
        document.getElementById("jobSuccessLabel").textContent =
          "Job Boosted Successfully!";
        document.querySelector(".modal-body .lead").textContent =
          "Your job listing has been boosted for increased visibility!";
        showSuccessModal(jobId, jobDetails); // Show modal with job title and link
      } else if (actionType === "post") {
        document.getElementById("jobSuccessLabel").textContent =
          "Job Posted Successfully!";
        showSuccessModal(jobId, jobDetails); // Show modal with job title and link
      } else {
        document.getElementById("jobSuccessLabel").textContent =
          "Draft Saved Successfully!";
      }
  
      // Log the job event in analytics
      logEvent(analytics, "job_post", {
        jobTitle: jobDetails.title,
        actionType: actionType,
        boostStatus: jobDetails.boosted ? "boosted" : "normal"
      });
  
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting job:", error);
      showErrorMessage(
        "An error occurred while submitting the job: " + error.message
      );
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
    console.log("newCompanyId: ", newCompanyId);
  
    return {
      title: document.getElementById("jobTitle").value,
      company: document.getElementById("company").value,
      companyId: document.getElementById("appCompanyID").innerText,
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
      // boostDuration: document.getElementById('boostDuration').value,
      contractToHire: document.getElementById("contractToHire").value,
      education: document.getElementById("education").value,
      experience: document.getElementById("experience").value,
      applicationLink: document.getElementById("applicationLink").value,
      immediateHire: document.getElementById("immediateHire").value,
      industry: document.getElementById("industry").value,
      benefits: document
        .getElementById("benefits")
        .value.split(",")
        .map((benefit) => benefit.trim()),
      jobFunction: document.getElementById("jobFunction").value,
      tags: Array.from(document.getElementById("tagsList").children).map((tag) =>
        tag.textContent.slice(0, -1).trim()
      ), // Correctly reference the tags list
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
    console.log("Job posted successfully with ID:", docRef.id);
  

    console.log("jobDetails.companyId id???????????/   ",jobDetails.companyId);

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
    console.log(jobDetails);
  
    // Update the user's jobPosts array with the new job ID
    const userRef = doc(db, "Users", auth.currentUser.uid);
    await updateDoc(userRef, {
        jobPosts: arrayUnion({
          jobID: docRef.id,
          jobTitle: jobDetails.title || "Untitled Job",
          status: jobDetails.status || "draft",
          createdAt: new Date(),
          location: jobDetails.location || "Unknown Location",
          boosted: jobDetails.boosted || false,
          companyName: jobDetails.company || "Unknown Company",
          companyId: jobDetails.companyId || "No Company ID",
          salary: jobDetails.salary || 0, // Default to 0 if undefined
          applicationDeadline: jobDetails.applicationDeadline || new Date() // Default to current date if undefined
        
      })
      
    });
  /*

  */
    return docRef.id; // Return the job ID for future use
  }
  
  function showSuccessModal(jobId, jobDetails) {
    document.getElementById("jobId").textContent = jobId;
    document.getElementById("jobTitleLink").textContent = jobDetails.jobTitle;
    document.getElementById(
      "jobTitleLink"
    ).href = `/views/job-detail.html?id=${jobId}`;
    document.getElementById("jobLocation").textContent = jobDetails.location;
    document.getElementById("jobSalary").textContent = jobDetails.salary;
    document.getElementById("jobExpiryDate").textContent = jobDetails.applicationDeadline;
    document.getElementById("salaryPayTime").textContent =
      jobDetails.salaryPayTime;
  
    $("#jobSuccessModal").modal("show"); // Show the success modal

    if (jobDetails.boosted) {
        document.getElementById("boostedLabel").style.display = "inline-block";
        ocument.getElementById("boostDuration").textContent = boostDuration;
      } else {
        document.getElementById("boostedLabel").style.display = "none";
      }
  }
  
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

  











let jobIDs = [];


console.log("recruiterID   ",recruiterID);

// Function to fetch job posts and moderated companies for the recruiter
async function fetchRecruiterData(recruiterID) {
    const userRef = doc(db, "Users", recruiterID);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const jobPosts = userDoc.data().jobPosts || [];
        const moderatedCompanies = userDoc.data().companyId || []; // Assuming moderated companies are stored similarly

        // Clear containers before inserting new job posts and companies
        $('#job-posts-container').empty();
        $('#companies-container').empty();

        // Loop through job posts and display them
        jobPosts.forEach(job => {
            jobIDs.push(job.jobID); // Push each jobID into the array
            const jobElement = $(`
                <div class="job-post" data-job-id="${job.jobID}">
                    <div class="job-title" style="cursor: pointer;">${job.jobTitle}</div>
                    <div class="job-details" style="display: none;">
                        <p>Status: ${job.status}</p>
                        <p>Created At: ${job.createdAt.toDate().toLocaleString()}</p>
                        <p>Location: ${job.location}</p>
                        <p>Company: ${job.companyName}</p>
                        <p>Salary: ${job.salary}</p>
                        <p>Application Deadline: ${job.applicationDeadline.toDate().toLocaleString()}</p>
                        <button class="deactivate-job" data-job-id="${job.jobID}">Deactivate</button>
                    </div>
                </div>
            `);
            $('#job-posts-container').append(jobElement);
        });

        // Implement toggle functionality for job details
        $('.job-title').on('click', function () {
            $(this).next('.job-details').toggle();
        });

        // Implement deactivate job functionality
        $('.deactivate-job').on('click', function () {
            const jobID = $(this).data('job-id');
            updateJobStatus(jobID, 'deactivated'); // Update status to 'deactivated'
        });

        // Add event listener for job title click to redirect to the job detail page
        $('.job-title').on('click', function () {
            const jobID = $(this).closest('.job-post').data('job-id');
            window.location.href = `/job-detail.html?id=${jobID}`;
        });

    } else {
        console.error("No such document!");
    }

    // Loop through moderated companies and display them
    moderatedCompanies.forEach(company => {
        const companyElement = $(`
            <div class="company-post" data-company-id="${company.companyId}">
                <div class="company-name" style="cursor: pointer;">${company.companyName}</div>
                <div class="company-details" style="display: none;">
                    <p>Location: ${company.location}</p>
                    <p>Industry: ${company.industry}</p>
                    <p>Description: ${company.description}</p>
                    <button class="view-company" data-company-id="${company.companyId}">View Company</button>
                    <button class="edit-company" data-company-id="${company.companyId}">Edit Company</button>
                </div>
            </div>
        `);
        $('#companies-container').append(companyElement);

        
    });

// Event delegation to handle View Company button click
$(document).on('click', '.view-company', function () {
    const companyId = $(this).data('company-id');
    window.location.href = `/view-company.html?id=${companyId}`;
});

// Event delegation to handle Edit Company button click
$(document).on('click', '.edit-company', function () {
    const companyId = $(this).data('company-id');
    window.location.href = `/edit-company.html?id=${companyId}`;
});



    // Implement toggle functionality for company details
    $('.company-name').on('click', function () {
        $(this).next('.company-details').toggle();
    });
}

// Function to show toast notifications
function showToast(message) {
    const toast = $(`<div class="toast">${message}</div>`);
    $('body').append(toast);
    setTimeout(() => {
        toast.fadeOut(() => {
            toast.remove();
        });
    }, 3000);
}

// Function to update the job status in the Jobs collection
async function updateJobStatus(jobID, newStatus) {
    const jobRef = doc(db, "Jobs", jobID);
    await updateDoc(jobRef, {
        status: newStatus
    });
    showToast(`Job ${jobID} has been updated to ${newStatus}.`);
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

// Event delegation for dynamically added elements
$(document).on('click', '.job-title', function () {
    $(this).next('.job-details').toggle();
});


// Call the function to fetch job posts and moderated companies when the page loads
fetchRecruiterData(recruiterID);











// Function to fetch job applications based on job IDs
async function fetchJobApplications(jobIDs) {
    const applicationsRef = collection(db, "Applications");
    const applicationsQuery = query(applicationsRef, where("jobId", "in", jobIDs));
    const querySnapshot = await getDocs(applicationsQuery);

    // Clear the container before inserting new applications
    $('#application-posts-container').empty();

    querySnapshot.forEach(doc => {
        const application = doc.data();
        const applicationElement = $(`
            <div class="application-post" data-applicant-id="${doc.id}">
                <div class="applicant-name" style="cursor: pointer;">
                    ${application.firstName} ${application.lastName}
                </div>
                <div class="application-details" style="display: none;">
                    <p>Job Title: ${application.jobTitle}</p>
                    <p>Company Name: ${application.companyName}</p>
                    <p>Apply Date: ${new Date(application.applyDate.seconds * 1000).toLocaleDateString()}</p>
                    <p>Email: ${application.email}</p>
                    <p>Phone: ${application.phone}</p>
                    <p>Notes: ${application.notes || "No notes available."}</p>
                    <a href="${application.resumeLink}" target="_blank">Download Resume</a><br>
                    <a href="${application.videoResumeLink}" target="_blank">Download Video Resume</a><br>
                    <button class="view-application" data-applicant-id="${doc.id}">View Application</button>
                    <button class="request-interview" data-applicant-id="${doc.id}">Request Interview</button>
                    <button class="request-test" data-applicant-id="${doc.id}">Request Test</button>
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











// Function to update the job status in the Jobs collection
async function updateJobStatus(jobID, newStatus) {
const jobRef = doc(db, "Jobs", jobID);
await updateDoc(jobRef, {
status: newStatus
});
alert(`Job ${jobID} has been updated to ${newStatus}.`);
}

// Placeholder function to view company details
function viewCompany(companyID) {
console.log(`Viewing company: ${companyID}`);
// Logic to view company details (open a modal, redirect, etc.)
}

// Placeholder function to edit company details
function editCompany(companyID) {
console.log(`Editing company: ${companyID}`);
// Logic to edit company details (open a modal, redirect, etc.)
}

// Function to implement search functionality
$('#search-job').on('input', function () {
const searchTerm = $(this).val().toLowerCase();
$('.job-post').each(function () {
const jobTitle = $(this).find('.job-title').text().toLowerCase();
$(this).toggle(jobTitle.includes(searchTerm));
});
});

// Call the function to fetch job posts and moderated companies when the page loads
fetchRecruiterData(recruiterID);





















// Function to fetch job applications based on job IDs
async function fetchJobApplications(jobIDs) {
    const applicationsRef = collection(db, "Applications");
    const applicationsQuery = query(applicationsRef, where("jobId", "in", jobIDs));
    const querySnapshot = await getDocs(applicationsQuery);

    // Clear the container before inserting new applications
    $('#application-posts-container').empty();

    querySnapshot.forEach(doc => {
        const application = doc.data();
        const applicationElement = $(`
            <div class="application-post" data-applicant-id="${doc.id}">
                <div class="applicant-name" style="cursor: pointer;">
                    ${application.firstName} ${application.lastName}
                </div>
                <div class="application-details" style="display: none;">
                    <p>Job Title: ${application.jobTitle}</p>
                    <p>Company Name: ${application.companyName}</p>
                    <p>Apply Date: ${new Date(application.applyDate.seconds * 1000).toLocaleDateString()}</p>
                    <p>Email: ${application.email}</p>
                    <p>Phone: ${application.phone}</p>
                    <p>Notes: ${application.notes || "No notes available."}</p>
                    <a href="${application.resumeLink}" target="_blank">Download Resume</a><br>
                    <a href="${application.videoResumeLink}" target="_blank">Download Video Resume</a><br>
                    <button class="view-application" data-applicant-id="${doc.id}">View Application</button>
                    <button class="request-interview" data-applicant-id="${doc.id}">Request Interview</button>
                    <button class="request-test" data-applicant-id="${doc.id}">Request Test</button>
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
const jobIDs = ["L6deju3QokTWiDwHNbl3", "anotherJobID"]; // Update this as necessary

// Call the function to fetch job applications when the page loads
fetchJobApplications(jobIDs);

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
