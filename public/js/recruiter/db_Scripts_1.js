

import { db, storage, analytics, app  } from '../js/main.js'; // Adjust the path based on your structure
import { query, where, orderBy, limit,  collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";



      // Add event listener for form submission
      document.getElementById("createJobBtn").click = async function (event) {
        event.preventDefault(); // Prevent default form submission
    
        // Custom form validation
        (function() {
            'use strict';
            window.addEventListener('load', function() {
                var forms = document.getElementsByClassName('needs-validation');
                for (var i = 0; i < forms.length; i++) {
                    forms[i].addEventListener('submit', function(event) {
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
        
    
    const recruiterIDs = []; // Populate with relevant recruiter IDs
        const jobIDs = []; // Populate with relevant job IDs
    
        // Call the submitJobPost function
        const newCompanyId = await submitJobPost(companyId, companyName, recruiterIDs, jobIDs);
    
    
    // Collect the job details
        const jobDetails = { 
            company: document.getElementById("company").value,
            companyId: '' || newCompanyId,
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
            contractToHire: document.getElementById("contractToHire").value,
                immediateHire: document.getElementById("immediateHire").value,
                industry: document.getElementById("industry").value,
                benefits: document.getElementById("benefits").value.split(",").map(benefit => benefit.trim()),
                jobFunction: document.getElementById("jobFunction").value,
            tags: Array.from(tagsList.children).map(tag => tag.textContent.slice(0, -1).trim()), // Get tags without the 'x' button
            boosted:"None", // Check if boosted
            boostExpiration: "00",
            boostExpiresAt: "00",
            boostedByID: "00",
            boostExpiration: "00",
            boostExpiration: "00",
            status: "active",
            createdAt: new Date(),
            applicantsViewed: 0,
            savedForLater: 0,
            recruiterID: UserID, // Replace with actual recruiter ID
            customQuestions: collectCustomQuestions(),
        };
    
        console.log(jobDetails);
        // Now you can save the jobDetails to your Firebase collection
    
        if (jobDetails.title && jobDetails.description && jobDetails.location && jobDetails.type) {
            const jobPostingsRef = collection(db, "Jobs");
            try {
                const docRef = await addDoc(jobPostingsRef, jobDetails);
                console.log("Job posting added successfully with ID: ", docRef.id);
    
                // Hide the job creation modal
                $('#jobModal').modal('hide');
    
                // Show success modal with job ID
                document.getElementById("jobId").textContent = docRef.id;
                $('#jobSuccessModal').modal('show');
    
                // Reset the form
                document.getElementById("jobForm").reset();
                document.getElementById("jobForm").classList.remove('was-validated');
    
            } catch (error) {
                console.error("Error creating job posting:", error);
                alert("Error creating job posting: " + error.message);
            }
        }
    };
    

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


