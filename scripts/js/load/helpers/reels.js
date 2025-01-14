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











// Function to extract hashtags and store them in an array
function extractHashtags(caption) {
    const regex = /#\w+/g;
    const hashtags = caption.match(regex) || [];
    
    if (hashtags.length < 2) {
        showToast("Please add at least two hashtags.");
        return []; // Return an empty array if validation fails
    }

    // Validate hashtags (optional)
    const invalidHashtags = hashtags.filter(tag => !/^#[a-zA-Z0-9_]+$/.test(tag));
    if (invalidHashtags.length > 0) {
        showToast("Hashtags must only contain letters, numbers, or underscores.");
        return []; // Return an empty array if invalid hashtags are found
    }

    return hashtags.map(tag => tag.toLowerCase());  // Convert to lowercase for consistency
}


let videoData = [];

// Post the video resume data
async function postReelFunction(videoResumeCaptions, videoURL) {
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

    const tags = extractHashtags(videoResumeCaptions);  // Extract hashtags from the caption

    // Validate tags
    if (!tags.includes(',')) {
        showToast("Please add at least two tags.");
        return; // Prevent form submission if validation fails
    }

    try {
        // Create a hidden video element to get the duration
        const videoElement = document.createElement('video');
        videoElement.src = videoURL; // Set the video URL

        // Wait for the video metadata to be loaded to get the duration
        await new Promise((resolve, reject) => {
            videoElement.onloadedmetadata = () => {
                resolve(); // Resolve the promise when metadata is loaded
            };
            videoElement.onerror = (error) => {
                reject("Error loading video metadata");
            };
        });

        // Now that the video is loaded, get its duration
        const videoDuration = videoElement.duration; // Get video duration
        console.log("Video Duration:", videoDuration);

        videoData = {
            duration: videoDuration, // Store the video duration
            name: `${userID}-${new Date().toISOString()}-reel.mp4`, // Use .webm or .mp4 as appropriate
            file: videoURL, // The video data itself
            fileType: "video/mp4", // Ensure this matches the file type
        };

        // Upload the video file and get the download URL
        videoResumeURL = await uploadVideoResume(userID, videoData);
    } catch (error) {
        console.error('Error during video capture or upload:', error);
        showToast('Failed to upload video resume. Please try again.', "error");
        return; // Stop further processing if upload fails
    }

    if (!videoResumeURL) {
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


    const fileInput = document.querySelector(".reel-video-input");
    const selectVideoButton = document.querySelector(".select-video-btn");
    const uploadButton = document.querySelector(".reel-video-btn");

    let uploadedFile = null;

    // Select Video Button Event
    selectVideoButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file || file.type.split("/")[0] !== "video") {
            alert("Please select a valid video file.");
            return;
        }
        uploadedFile = file;
        alert(`Selected video: ${file.name}`);
    });

    uploadButton.addEventListener("click", async () => {
        if (!uploadedFile) {
            alert("No video selected.");
            return;
        }

        try {
            const userID = auth.currentUser?.uid || "defaultUser";
            const videoData = {
                file: uploadedFile,
                name: `${userID}-${new Date().toISOString()}-${uploadedFile.name}`,
            };

            const videoURL = await uploadVideoResume(userID, videoData);
            if (videoURL) {
                const description = document.querySelector(".reel-video-content").value.trim();
                await postReelFunction(description, videoURL);
                alert("Video uploaded successfully!");
            } else {
                alert("Failed to upload the video.");
            }
        } catch (error) {
            console.error(error);
            alert("Error uploading the video. Please try again.");
        }
    });
