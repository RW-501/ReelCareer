

import { db, storage, analytics, app  } from '../main.js'; // Adjust the path based on your structure
import { query, where, orderBy, limit,  collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Open the job creation modal when the button is clicked
const createJobBtn = document.getElementById('createJobPostBtn');
createJobBtn.addEventListener('click', function() {
    $('#jobModal').modal('show');  // This opens the modal
});

// Add event listener for form submission
document.getElementById("createJobPostBtn").addEventListener('click', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Custom form validation
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            var forms = document.getElementsByClassName('needs-validation');
            for (var i = 0; i < forms.length; i++) {
                forms[i].addEventListener('submit', function(event) {
                    const complianceCheckbox = document.getElementById('complianceCheck');

                    if (!complianceCheckbox.checked) {
                        alert('Please confirm compliance with Employment and Labor Laws.');
                        event.preventDefault(); // Prevent form submission if not checked
                    }

                    if (this.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.classList.add('was-validated');
                }, false);
            }
        }, false);
    })();

    // Function to collect job requirements
    function collectJobRequirements() {
        const jobRequirements = {
            education: Array.from(document.getElementById("education").selectedOptions).map(option => option.value),
            experience: Array.from(document.getElementById("experience").selectedOptions).map(option => option.value),
        };
        return jobRequirements;
    }

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
    
    // Create job details object
    const jobDetails = { 
        company: companyName, // Use the correct company name
        companyId: newCompanyId,
        title: jobTitle,
        description: document.getElementById("jobDescription").value,
        requirements: document.getElementById("jobRequirements").value,
        searchableRequirements: collectJobRequirements(), // Collect enhanced requirements
        location: document.getElementById("jobLocation").value,
        city: document.getElementById("jobCity").value,
        state: document.getElementById("jobState").value,
        zipCode: document.getElementById("jobZipCode").value,
        type: document.getElementById("jobType").value,
        salary: parseFloat(document.getElementById("jobSalary").value) || 0, // Ensure it's a number
        contractToHire: document.getElementById("contractToHire").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        applicationLink: document.getElementById("applicationLink").value,
        immediateHire: document.getElementById("immediateHire").value,
        industry: document.getElementById("industry").value,
        benefits: document.getElementById("benefits").value.split(",").map(benefit => benefit.trim()),
        jobFunction: document.getElementById("jobFunction").value,
        tags: Array.from(document.getElementById("tagsList").children).map(tag => tag.textContent.slice(0, -1).trim()), // Correctly reference the tags list
        complianceCheck: document.getElementById("complianceCheck").checked,
        boosted: "", // Check if boosted
        boostExpiration: "",
        boostExpiresAt: "",
        boostedByID: "",
        status: "active",
        createdAt: new Date(),
        applicantsViewed: 0,
        savedForLater: 0,
        applicationAvailableBool: true,
        recruiterID: recruiterIDs, // Replace with actual recruiter ID
        customQuestions: collectCustomQuestions(),
    };

    console.log(jobDetails);

    // Save jobDetails to Firebase collection
    if (jobDetails.title && jobDetails.description && jobDetails.location && jobDetails.type) {
        const jobPostingsRef = collection(db, "Jobs");
        try {
            const docRef = await addDoc(jobPostingsRef, jobDetails);
            console.log("Job posting added successfully with ID: ", docRef.id);

            // Add the new job ID to the corresponding company's jobIDs array
            const companyRef = doc(db, "Companies", newCompanyId);
            await updateDoc(companyRef, {
                jobIDs: arrayUnion(docRef.id) // Adds the new job ID to the jobIDs array
            });

            // Hide the job creation modal
            $('#jobModal').modal('hide');

// Show success modal with job ID and job title link
document.getElementById("jobId").textContent = docRef.id;
document.getElementById("jobTitleLink").textContent = jobDetails.title;
document.getElementById("jobTitleLink").href = `/views/job-detail.html?id=${docRef.id}`;
$('#jobSuccessModal').modal('show');

// Boost job functionality (stub)
document.getElementById("boostJobBtn").addEventListener('click', async function() {
    try {
        // Example: Update job posting with boost status
        await updateDoc(doc(db, "Jobs", docRef.id), {
            boosted: true,
            boostExpiration: new Date(new Date().setDate(new Date().getDate() + 30)) // 30-day boost
        });
        alert("Job listing boosted for 30 days!");
    } catch (error) {
        console.error("Error boosting job: ", error);
        alert("Failed to boost job listing.");
    }
});

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


            // Reset the form
            document.getElementById("jobForm").reset();
            document.getElementById("jobForm").classList.remove('was-validated');

        } catch (error) {
            console.error("Error creating job posting:", error);
            alert("Error creating job posting: " + error.message);
        }
    }
});






const saveDraftButton = document.getElementById("saveDraftButton");

// Function to handle saving the job posting as a draft
saveDraftButton.addEventListener("click", () => {
    // Here you would gather the job posting details and save them as a draft in your database
    const jobDetails = { 
        company: document.getElementById("company").value,
        companyId: "000",
        title: document.getElementById("jobTitle").value,
        description: document.getElementById("jobDescription").value,
        requirements: document.getElementById("jobRequirements").value,
        SearchableRequirements: collectJobRequirements(), // Collect enhanced requirements
        location: document.getElementById("jobLocation").value,
        city: document.getElementById("jobCity").value,
        state: document.getElementById("jobState").value,
        zipCode: document.getElementById("jobZipCode").value,
        type: document.getElementById("jobType").value,
        salary: parseFloat(document.getElementById("jobSalary").value),
        tags: Array.from(tagsList.children).map(tag => tag.textContent.slice(0, -1).trim()), // Get tags without the 'x' button
        boosted: document.getElementById("boost").checked, // Check if boosted
        createdAt: new Date(),
        applicantsViewed: 0,
        savedForLater: 0,
        recruiterID: UserID, // Replace with actual recruiter ID
        customQuestions: collectCustomQuestions(),
        status: "draft",
    };

    // Save jobDetails to your database
    console.log("Job posting saved as draft:", jobDetails);
});


