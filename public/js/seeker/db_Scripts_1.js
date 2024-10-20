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

