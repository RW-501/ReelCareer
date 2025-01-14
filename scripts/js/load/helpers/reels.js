import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
where, getDocs, storage, getAuth, collection, auth, analytics,
googleProvider,onSnapshot ,
facebookProvider,
getUserId // Export the function
} from 'https://reelcareer.co/scripts/js/load/module.js';



// Upload Video Resume to Firebase Storage
async function uploadVideoResume(userID, videoData) {
    try {
        // Ensure 'storage' is properly initialized
        const storageInstance = getStorage(); // Use Firebase's getStorage method

        // Create a storage reference dynamically based on userID and file name
        const fileRef = ref(storageInstance, `videoResumes/${userID}/${videoData.name}`);

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(fileRef, videoData.file);

        // Get the download URL for the uploaded file
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.error("Error uploading video resume:", error);
        throw new Error('Failed to upload video resume.'); // Handle this in the calling function
    }
}
let videoData = [];
// Post the video resume data
async function postReelFunction(videoResumeCaption, tagID ) {
    let videoResumeURL = '';
    // Fetch required data
   
    const userlocationData = JSON.parse(sessionStorage.getItem('userLocation')) || {};

    const userDataSaved = getUserData() || {};
    const userID = auth.currentUser.uid || userDataSaved.userID;
    console.log("userID: ", userID);
    console.log("userDataSaved: ", userDataSaved);
    console.log("userlocationData: ", userlocationData);

    if (!userID) {
        showToast('No User Info');
        return;
    }

    const videoResumeCaptions = document.getElementById(videoResumeCaption).value.trim();
    const tagsInput = document.getElementById(tagID).value.trim();
    const tags = tagsInput ? tagsInput.split(",").map(item => item.toLowerCase().trim()) : [];

    // Validate tags
    if (!tagsInput.includes(',')) {
        showToast("Please add at least two tags.");
        return; // Prevent form submission if validation fails
    }

    try {
        // Capture video from canvas using MediaRecorder
  

      downloadButton.disabled = true;
      postReelButton.disabled = true;
  
      

         videoData = {
            duration: videoPlayer.duration, // Ensure videoPlayer is initialized
            name: `${userID}-${new Date().toISOString()}-reel.mp4`, // Use .webm or .mp4 as appropriate
            file: uploadedFile, // The video data itself
            fileType: "video/mp4", // Ensure this matches the file type
        };

        // Upload the video file and get the download URL
        videoResumeURL = await uploadVideoResume(userID, videoData);
    } catch (error) {
        console.error('Error during video capture or upload:', error);
        showToast('Failed to upload video resume. Please try again.', "error");
        return; // Stop further processing if upload fails
    }

    if(!videoResumeURL){
      console.error('Error during video capture or upload:', error);
        showToast('Failed to upload video resume. Please try again.', "error");
        return; // Stop further processing if upload fails
    }
    // Construct video resume data
    const videoResumeData = {
      createdByID: userID || '',
        displayName: userDataSaved.displayName || '',
        publicProfile: userDataSaved.publicProfile || true,
        profilePicture: userDataSaved.profilePicture || '',
        profileURL: `https://reelcareer.co/u/?u=${userID}`,
        membershipType: userDataSaved.membershipType || 'free',
        location: `${userlocationData.city || ''}, ${userlocationData.state || ''}`,
        verified: userDataSaved.verified || '',
        position: userDataSaved.position || '',
        tags: tags,
        videoResumeCaptions,

        videoResumeURL,
        videoResumeFileName: videoData.name || '',
        duration: videoData.duration || '',
        fileType: videoData.fileType || '',
        createdAt: new Date(),
        timestamp: serverTimestamp(),
        views: 0,
        shares: 0,
        likes: 0,
        loves: 0,
        gifts: [],
        status: 'posted',
        isDeleted: false,
    };

    console.log("Video Resume Data:", videoResumeData);

    try {
        // Add video resume document to Firestore
        const reelDocRef = await addDoc(collection(db, "VideoResumes"), videoResumeData);
        const reelID = reelDocRef.id; // Get the document ID

        // Update the user's document with the new video resume data
        const userDocRef = doc(db, "Users", userID);
        await updateDoc(userDocRef, {
            videoResumeData: { reelID, videoResumeURL, createdAt: new Date(), status: 'posted' },
        });

        // Optionally update localStorage with the new data
        const updatedUserData = { ...userDataSaved, videoResumeData: { reelID, videoResumeURL } };


        const userDataEcode = setUserData(updatedUserData);

        localStorage.setItem('userData', userDataEcode);


        console.log("Your Resume Reel has been posted successfully!");

        // Show success message
        showToast("Your Resume Reel is live. @[Video Resume] ", "success", 100000, `https://reelcareer.co/reels#${reelID}`, true);
    } catch (error) {
        console.error("Error saving user data:", error);
        showToast("There was an error posting your resume reel. Please try again later.");
    }
}

window.postReelFunction = postReelFunction;








document.addEventListener("DOMContentLoaded", () => {
    const dragDropArea = document.getElementById("drag-drop-area");
    const fileInput = document.getElementById("reel-video-input");
    const videoPreviewContainer = document.getElementById("video-preview-container");
    const videoPreview = document.getElementById("video-preview");
    const uploadButton = document.getElementById("reel-video-btn");
    const uploadStatus = document.getElementById("upload-status");

    let uploadedFile = null;

    // Drag and Drop Event Listeners
    dragDropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dragDropArea.classList.add("dragging");
    });

    dragDropArea.addEventListener("dragleave", () => {
        dragDropArea.classList.remove("dragging");
    });

    dragDropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dragDropArea.classList.remove("dragging");
        handleFileSelection(e.dataTransfer.files[0]);
    });

    dragDropArea.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
        handleFileSelection(e.target.files[0]);
    });

    // Function to Handle File Selection
    function handleFileSelection(file) {
        if (!file || file.type.split("/")[0] !== "video") {
            uploadStatus.textContent = "Please select a valid video file.";
            return;
        }

        uploadedFile = file;
        const fileURL = URL.createObjectURL(file);

        videoPreview.src = fileURL;
        videoPreviewContainer.hidden = false;
        uploadStatus.textContent = "Video ready for upload.";
    }

    // Upload Button Event Listener
    uploadButton.addEventListener("click", async () => {
        if (!uploadedFile) {
            uploadStatus.textContent = "No video selected.";
            return;
        }

        uploadStatus.textContent = "Uploading...";

        try {
            const userID = auth.currentUser?.uid || "defaultUser";
            const videoData = {
                file: uploadedFile,
                name: `${userID}-${new Date().toISOString()}-${uploadedFile.name}`,
            };

            const videoURL = await uploadVideoResume(userID, videoData);
            if (videoURL) {
                const description = document.getElementById("reel-video-content").value.trim();
                await postReelFunction(description, videoURL);
                uploadStatus.textContent = "Video uploaded successfully!";
            } else {
                uploadStatus.textContent = "Failed to upload the video.";
            }
        } catch (error) {
            console.error(error);
            uploadStatus.textContent = "Error uploading the video. Please try again.";
        }
    });
});
