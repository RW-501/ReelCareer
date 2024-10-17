

import { onAuthStateChanged, db, auth, storage, analytics, app  } from '../main.js'; // Adjust the path based on your structure
import { query, where, orderBy, limit,  collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

document.getElementById('saveDraftButton').addEventListener('click', function(event) {
    console.log("saveDraftButton  added???????????????????????????");

    handleJobSubmission(event, 'draft');
});

document.getElementById('boostButton').addEventListener('click', function(event) {
    console.log("boostButton added???????????????????????????");

    handleJobSubmission(event, 'boost');
});

document.getElementById('createJobBtn').addEventListener('click', function(event) {
    console.log("createJobBtn???????????????????????????");

    handleJobSubmission(event, 'post');
});

let userName, publicBool, userPosition;

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



    // Collect input values
    const companyId = ""; // Or some existing company ID if applicable
    const companyName = document.getElementById("company").value;
    const recruiterIDs = document.getElementById("appUserID").innerText;
    const jobIDs = []; // Populate with relevant job IDs, if any
    const jobTitle = document.getElementById("jobTitle").value;

    // Define the submitJobPost function
    const submitJobPost = async (jobTitle, companyId, companyName, recruiterIDs, jobIDs) => {
        try {
            // Check if the company ID is empty
            if (companyId === "") {
                // Create a new company in the Companies collection
                const newCompanyRef = await addDoc(collection(db, 'Companies'), {
                    companyName: companyName,
                    recruiterIDs: recruiterIDs,
                    jobIDs: jobIDs,
                    jobTitle: jobTitle,
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

    // Call submitJobPost to create or retrieve the company ID
    const newCompanyId = await submitJobPost(jobTitle, companyId, companyName, recruiterIDs, jobIDs);
    
    
    



async function handleJobSubmission(event, actionType) {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate the form (custom logic such as compliance checkbox check)
    if (!validateForm()) {
        return;  // Exit if validation fails
    }

    // Collect all job details from the form
    const jobDetails = collectJobDetails();

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
        const jobId = await saveJobToDatabase(jobDetails); // Save job details to database

        // Action-specific alerts and UI feedback
        if (actionType === 'boost') {
            alert("Job listing boosted successfully for 30 days!");
        } else if (actionType === 'post') {
            showSuccessModal(jobId, jobDetails.title);  // Show modal with job title and link
        } else {
            alert("Draft saved successfully.");
        }
        
        resetForm();  // Reset the form after successful submission
    } catch (error) {
        console.error("Error submitting job:", error);
        alert("An error occurred: " + error.message);
    }
}


function validateForm() {
    const complianceCheckbox = document.getElementById('complianceCheck');
    if (!complianceCheckbox.checked) {
        alert('Please confirm compliance with Employment and Labor Laws.');
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
if(publicBool === true){
submittedBy = userName;
submittedUserPosition = userPosition;
}

function collectJobDetails() {
    return {
        title: document.getElementById("jobTitle").value,
        description: document.getElementById("jobDescription").value,
        requirements: document.getElementById("jobRequirements").value,
        searchableRequirements: collectJobRequirements(),  // Collect enhanced requirements
        location: document.getElementById("jobLocation").value,
        city: document.getElementById("jobCity").value,
        state: document.getElementById("jobState").value,
        zipCode: document.getElementById("jobZipCode").value,
        type: document.getElementById("jobType").value,
        salary: document.getElementById("jobSalary").value,  // Ensure it's a number
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

    // Update the company's jobIDs array with the new job ID
    const companyRef = doc(db, "Companies", jobDetails.companyId);
    await updateDoc(companyRef, {
        jobIDs: arrayUnion(docRef.id)  // Add the new job ID to the jobIDs array
    });

    return docRef.id;  // Return the job ID for future use
}


function showSuccessModal(jobId, jobTitle) {
    document.getElementById("jobId").textContent = jobId;
    document.getElementById("jobTitleLink").textContent = jobTitle;
    document.getElementById("jobTitleLink").href = `/views/job-detail.html?id=${jobId}`;
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


   