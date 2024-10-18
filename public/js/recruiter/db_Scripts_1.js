

import { onAuthStateChanged, db, auth, storage, analytics, app  } from '../main.js'; // Adjust the path based on your structure
import { query, doc, getDoc, where, updateDoc, limit,  collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";


let companyId = ""; // Or some existing company ID if applicable

const companyInput = document.getElementById("company");
const addCompanyButtonContainer = document.getElementById("addCompanyButtonContainer");



    // Collect input values
    const companyName = document.getElementById("company").value;
    const recruiterID = document.getElementById("appUserID").innerText;
    const jobID = []; // Populate with relevant job IDs, if any
    const jobTitle = document.getElementById("jobTitle").value;

    // Define the submitJobPost function
    const submitJobPost = async (jobTitle, companyId, companyName, recruiterID, jobID) => {
        try {
            // Check if the company ID is empty
            if (companyId === "") {
                // Create a new company in the Companies collection
                const newCompanyRef = await addDoc(collection(db, 'Companies'), {
                    companyName: companyName,
                    recruiterIDs: [recruiterID],
                    jobIDs: jobID,
                    jobTitles: [jobTitle],
                });

                console.log('New company added with ID:', newCompanyRef.id);
                return newCompanyRef.id; // Return the new company ID for further use
            } else {
                console.log('Existing company ID:', companyId);
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

companyInput.addEventListener("keyup", debounce(async () => {
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
                    document.getElementById('appCompanyID').innerText = companyId;

                    // Show the selected company in a message
                    const selectedCompanyMessage = document.createElement("div");
                    selectedCompanyMessage.innerHTML = `Selected company: ${company.companyName}, Location: ${company.location}`;
                    selectedCompanyMessage.className = "alert alert-success";
                    addCompanyButtonContainer.appendChild(selectedCompanyMessage);

             
                            // Optionally, trigger any further action with the selected company ID
                            document.getElementById('jobLocation').value = company.location;
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
                            document.getElementById('appCompanyID').innerText = companyId;

                            // Show the selected company in a message
                            const selectedCompanyMessage = document.createElement("div");
                            selectedCompanyMessage.innerHTML = `Selected company: ${company.companyName}, Location: ${company.location}`;
                            selectedCompanyMessage.className = "alert alert-success";
                            addCompanyButtonContainer.appendChild(selectedCompanyMessage);

                            // Optionally, trigger any further action with the selected company ID
                            document.getElementById('jobLocation').value = company.location;
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
                window.location.href = "../views/company-page.html?create=" + companyName;
            });
            addCompanyButtonContainer.appendChild(addButton);
        }
    }
}, 300)); // Adjust delay (300ms) as needed



let userName, publicBool, userPosition;

// Function to fetch user data from local storage or Firestore
async function fetchUserData() {
    const user = auth.currentUser; // Get the currently signed-in user
    if (!user) {
        console.log('No user is currently signed in.');
        return; // Exit if no user is signed in
    }

    try {
        // Check local storage first
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            // Use data from local storage
            userName = storedUserData.displayName;
            publicBool = storedUserData.publicProfile;
            userPosition = storedUserData.position;

            console.log('Using stored user data:', userName, publicBool, userPosition);
        } else {
            // Fetch from Firestore if not found in local storage
            const userDocRef = doc(db, 'Users', user.uid); // Reference to the user document
            const userDoc = await getDoc(userDocRef); // Get the document

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('Firebase User Data:', userData.displayName, userData.publicProfile, userData.position);

                // Save user data to local storage
                localStorage.setItem('userData', JSON.stringify(userData));

                userName = userData.displayName;
                publicBool = userData.publicProfile;
                userPosition = userData.position;
            } else {
                console.log('No such user data!');
            }
        }
    } catch (error) {
        console.error("Error getting user document: ", error);
    }
}

// Open the job creation modal when the button is clicked
const createJobBtn = document.getElementById('createJobPostBtn');
createJobBtn.addEventListener('click', function() {

    $('#jobModal').modal('show');  // This opens the modal
});


// Event listener for the save draft button
document.getElementById('saveDraftButton').addEventListener('click', async function(event) { 
    console.log("saveDraftButton added");
    await fetchUserData(); // Call to fetch user data
    handleJobSubmission(event, 'draft');
});

// Event listener for the boost button
document.getElementById('boostButton').addEventListener('click', async function(event) {
    console.log("boostButton added");
    await fetchUserData(); // Call to fetch user data
    handleJobSubmission(event, 'boost');
});

// Event listener for the create job button
document.getElementById('createJobBtn').addEventListener('click', async function(event) {
    console.log("createJobBtn added");
    await fetchUserData(); // Call to fetch user data
    handleJobSubmission(event, 'post');
});


// Check for auth state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // User is signed in, proceed with user ID handling
            console.log("User ID: ", user.uid);
            const userDocRef = doc(db, 'Users', user.uid); // Reference to the user document
            const userDoc = await getDoc(userDocRef); // Get the document
            if (userDoc.exists()) {
                // User data found
                const userData = userDoc.data();
                console.log('userName User Data:', userData.displayName);    
                console.log('publicBool User Data:', userData.publicProfile);    
                console.log('userPosition User Data:', userData.position);    
                userName = userData.displayName;
                publicBool = userData.publicProfile;
                userPosition = userData.position;
            } else {
                console.log('No such user data!');
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
        errorMessageElement.innerText = message;  // Set the error message text
        errorMessageElement.style.display = "block";  // Show the error message
        errorMessageElement.classList.add("alert", "alert-danger");  // Add Bootstrap classes for styling (if you're using Bootstrap)

        // Optionally, you can auto-hide the message after a few seconds
        setTimeout(() => {
            errorMessageElement.style.display = "none";  // Hide the message after 5 seconds
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
        return;  // Exit if validation fails
    }

    const companyIdValue = document.getElementById('appCompanyID').innerText;
    let newCompanyId;

    try {
        
        // Call submitJobPost to create or retrieve the company ID
        console.log("Attempting to submit job post with companyIdValue:", companyIdValue);
        newCompanyId = await submitJobPost(jobTitle, companyIdValue, companyName, recruiterID, jobID);
        showErrorMessage("New Company ID returned:", newCompanyId);

        // Update the hidden companyId field with the new value
        document.getElementById('appCompanyID').value = newCompanyId;
        
    } catch (error) {
        console.error("Error in submitJobPost:", error);
        showErrorMessage("An error occurred while submitting the job post: " + error.message);
        return;  // Exit the function on error
    }

    // Collect all job details from the form
    let jobDetails;
    try {
        jobDetails = collectJobDetails(newCompanyId);
        console.log("Collected Job Details:", jobDetails);
    } catch (error) {
        console.error("Error collecting job details:", error);
        alert("An error occurred while collecting job details: " + error.message);
        return;  // Exit the function on error
    }

    // Based on actionType, modify the jobDetails object
    if (actionType === 'draft') {
        jobDetails.status = 'draft';  // Save as draft
    } else if (actionType === 'post') {
        jobDetails.status = 'active';  // Create job post
    } else if (actionType === 'boost') {
        jobDetails.status = 'active';  // Boosted jobs should be active
        jobDetails.boosted = true;     // Mark job as boosted
        jobDetails.boostExpiration = new Date(new Date().setDate(new Date().getDate() + 30)); // Boost for 30 days
    }

    try {
        // Save job details to the database
       // console.log("Saving job to database with details:", jobDetails);
        const jobId = await saveJobToDatabase(jobDetails);
        showErrorMessage("Job saved successfully with ID:", jobId);

        // Action-specific alerts and UI feedback
        if (actionType === 'boost') {
            document.getElementById("jobSuccessLabel").textContent = "Job Boosted Successfully!";
            document.querySelector(".modal-body .lead").textContent = "Your job listing has been boosted for increased visibility!";
            showSuccessModal(jobId, jobDetails.title);  // Show modal with job title and link
        } else if (actionType === 'post') {
            document.getElementById("jobSuccessLabel").textContent = "Job Posted Successfully!";
            showSuccessModal(jobId, jobDetails.title);  // Show modal with job title and link
        } else {
            document.getElementById("jobSuccessLabel").textContent = "Draft Saved Successfully!";
        }

        // Log the job event in analytics
        logEvent(analytics, 'job_post', {
            jobTitle: jobDetails.title,
            actionType: actionType,
            boostStatus: jobDetails.boosted ? 'boosted' : 'normal'
        });

        resetForm();  // Reset the form after successful submission
    } catch (error) {
        console.error("Error submitting job:", error);
        showErrorMessage("An error occurred while submitting the job: " + error.message);
    }
}


function validateForm() {
    const complianceCheckbox = document.getElementById('complianceCheck');
    if (!complianceCheckbox.checked) {
        showErrorMessage('Please confirm compliance with Employment and Labor Laws.');
        return false;
    }

    const forms = document.getElementsByClassName('needs-validation');
    for (let form of forms) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;  // Form validation failed
        }
    }
    return true;  // Validation passed
}


let  submittedUserPosition = "";
let submittedBy = "";
submittedBy = userName;
submittedUserPosition = userPosition;


function collectJobDetails(newCompanyId) {
    console.log("newCompanyId: ", newCompanyId);

    return {
        title: document.getElementById("jobTitle").value,
        company: document.getElementById("appCompanyID").value,
        companyId: document.getElementById("jobDescription").value,
        description: document.getElementById("jobDescription").value,
        requirements: document.getElementById("jobRequirements").value,
        searchableRequirements: collectJobRequirements(),  // Collect enhanced requirements
        location: document.getElementById("jobLocation").value,
        city: document.getElementById("jobCity").value,
        state: document.getElementById("jobState").value,
        zipCode: document.getElementById("jobZipCode").value,
        type: document.getElementById("jobType").value,
        salary: document.getElementById('jobSalary').value,
        salaryPayTime: document.getElementById('salaryPayTime').value,
       // boostDuration: document.getElementById('boostDuration').value,
        contractToHire: document.getElementById("contractToHire").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        applicationLink: document.getElementById("applicationLink").value,
        immediateHire: document.getElementById("immediateHire").value,
        industry: document.getElementById("industry").value,
        benefits: document.getElementById("benefits").value.split(",").map(benefit => benefit.trim()),
        jobFunction: document.getElementById("jobFunction").value,
        tags: Array.from(document.getElementById("tagsList").children).map(tag => tag.textContent.slice(0, -1).trim()),  // Correctly reference the tags list
        complianceCheck: document.getElementById("complianceCheck").checked,
        boosted: false,  // Default not boosted
        status: 'draft',  // Default status is draft, overridden based on action
        createdAt: new Date(),
        recruiterID: document.getElementById("appUserID").innerText,  // Assuming this is the recruiter ID
        applicantsViewed: 0,
        savedForLater: 0,
        applicationAvailableBool: true,
        applicationWebsite: "",
        customQuestions: collectCustomQuestions(),
        submittedBy:  submittedBy,
        submittedUserPosition: submittedUserPosition,
        applicationDeadline: new Date(new Date().setDate(new Date().getDate() + 30)), //  for 30 days
    };
}

async function saveJobToDatabase(jobDetails) {
    const jobPostingsRef = collection(db, "Jobs");
    const docRef = await addDoc(jobPostingsRef, jobDetails);  // Add job details to "Jobs" collection
    console.log("Job posted successfully with ID:", docRef.id);

    // Update the company's jobs array with the new job object
    const companyRef = doc(db, "Companies", jobDetails.companyId);
    await updateDoc(companyRef, {
        jobs: arrayUnion({
            jobID: docRef.id,
            jobTitle: jobDetails.title,
            submittedAt: new Date(),  // Timestamp for job submission
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
    const userRef = doc(db, 'Users', auth.currentUser.uid);
    await updateDoc(userRef, {
        jobPosts: arrayUnion({
            jobID: docRef.id,
            jobTitle: jobDetails.title,
            status: jobDetails.status,  // E.g., 'draft', 'active', 'boosted'
            createdAt: new Date(),  // Timestamp of job creation
            location: jobDetails.location,  // Job location
            boosted: jobDetails.boosted || false,  // Whether the job is boosted
            companyName: jobDetails.companyName,  // Name of the company
            companyId: jobDetails.companyId,  // ID of the company
            salary: jobDetails.salary,  // Salary for the job post
            expiryDate: jobDetails.expiryDate  // When the job posting expires
        })
    });
    
    if (jobDetails.boosted) {
        document.getElementById("boostedLabel").style.display = "inline-block";
        ocument.getElementById('boostDuration').textContent = boostDuration;
    } else {
        document.getElementById("boostedLabel").style.display = "none";
    }
    

    return docRef.id;  // Return the job ID for future use
}




function showSuccessModal(jobId, jobTitle) {
    document.getElementById("jobId").textContent = jobId;
    document.getElementById("jobTitleLink").textContent = jobTitle;
    document.getElementById("jobTitleLink").href = `/views/job-detail.html?id=${jobId}`;
    document.getElementById("jobLocation").textContent = jobDetails.location;
document.getElementById("jobSalary").textContent = jobDetails.salary;
document.getElementById("jobExpiryDate").textContent = new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString();
document.getElementById('salaryPayTime').textContent = jobDetails.salaryPayTime;



    $('#jobSuccessModal').modal('show');  // Show the success modal
}


function resetForm() {
    document.getElementById("jobForm").reset();
    document.getElementById("jobForm").classList.remove('was-validated');
}








    // Function to collect job requirements
    function collectJobRequirements() {
        const jobRequirements = {
            education: Array.from(document.getElementById("education").selectedOptions).map(option => option.value),
            experience: Array.from(document.getElementById("experience").selectedOptions).map(option => option.value),
        };
        return jobRequirements;
    }
         
    
    // Share job listing on social media (you can expand with more detailed URLs for sharing)
document.getElementById("shareFacebook").addEventListener('click', function() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/views/job-detail.html?id=' + docRef.id)}`;
    window.open(shareUrl, '_blank');
});

document.getElementById("shareLinkedIn").addEventListener('click', function() {
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin + '/views/job-detail.html?id=' + docRef.id)}`;
    window.open(shareUrl, '_blank');
});

document.getElementById("shareTwitter").addEventListener('click', function() {
    const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(window.location.origin + '/views/job-detail.html?id=' + docRef.id)}&text=Check out this job listing!`;
    window.open(shareUrl, '_blank');
});


   