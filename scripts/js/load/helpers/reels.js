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
 //       const storageInstance = getStorage(); // Use Firebase's getStorage method

        // Create a storage reference dynamically based on userID and file name
        const fileRef = ref(storage, `videoResumes/${userID}/${videoData.name}`);

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

// Post the video resume dataasync function postReelFunction(videoResumeCaptions, videoURL, uploadedFile, videoDuration) {
    let videoResumeURL = '';

    const userlocationData = JSON.parse(sessionStorage.getItem('userLocation')) || {};
    const userDataSaved = getUserData() || {};
    const userID = auth.currentUser?.uid || userDataSaved.userID;

    if (!userID) {
        showToast('No User Info');
        return;
    }

    const tags = extractHashtags(videoResumeCaptions);
    if (tags.length < 2) {
        showToast("Please add at least two hashtags.");
        return;
    }

    try {
        const videoData = {
            duration: videoDuration,
            name: `${userID}-${new Date().toISOString()}-reel.mp4`,
            file: uploadedFile,
            fileType: "video/mp4",
        };

        videoResumeURL = await uploadVideoResume(userID, videoData);
    } catch (error) {
        console.error('Error during video capture or upload:', error);
        showToast('Failed to upload video resume. Please try again.', "error");
        return;
    }

    if (!videoResumeURL) {
        showToast('Failed to upload video resume. Please try again.', "error");
        return;
    }

    const videoResumeData = {
        createdByID: userID,
        displayName: userDataSaved.displayName || '',
        publicProfile: userDataSaved.publicProfile ?? true,
        profilePicture: userDataSaved.profilePicture || '',
        profileURL: `https://reelcareer.co/u/?u=${userID}`,
        membershipType: userDataSaved.membershipType || 'free',
        location: `${userlocationData.city || ''}, ${userlocationData.state || ''}`,
        verified: userDataSaved.verified || '',
        position: userDataSaved.position || '',
        tags,
        videoResumeCaptions,
        videoResumeURL,
        videoResumeFileName: videoData.name,
        duration: videoData.duration,
        fileType: videoData.fileType,
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

    try {
        const reelDocRef = await addDoc(collection(db, "VideoResumes"), videoResumeData);
        const reelID = reelDocRef.id;

        const userDocRef = doc(db, "Users", userID);
        await updateDoc(userDocRef, {
            videoResumeData: { reelID, videoResumeURL, createdAt: new Date(), status: 'posted' },
        });

        const updatedUserData = { ...userDataSaved, videoResumeData: { reelID, videoResumeURL } };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        showToast("Your Resume Reel is live. @[Video Resume] ", "success", 100000, `https://reelcareer.co/reels#${reelID}`, true);
    } catch (error) {
        console.error("Error saving user data:", error);
        showToast("There was an error posting your resume reel. Please try again later.");
    }



    
const fileInput = document.querySelector(".reel-video-input");
const selectVideoButton = document.querySelector(".select-video-btn");
const uploadButton = document.querySelector(".reel-video-btn");
const videoPreview = document.querySelector(".reel-video-preview");

let uploadedFile = null;
let videoDuration = 0;

selectVideoButton.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file || file.type.split("/")[0] !== "video") {
        showToast("Please select a valid video file.");
        return;
    }
    uploadedFile = file;
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    videoElement.onloadedmetadata = () => {
        videoDuration = videoElement.duration;
        videoPreview.src = videoElement.src;
        videoPreview.hidden = false;
        showToast(`Selected video: ${file.name}`);
    };
});

uploadButton.addEventListener("click", async () => {
    if (!uploadedFile) {
        showToast("No video selected.");
        return;
    }

    try {
        const description = document.querySelector(".reel-video-content").value.trim();
        await postReelFunction(description, URL.createObjectURL(uploadedFile), uploadedFile, videoDuration);
    } catch (error) {
        console.error("Upload error:", error);
        showToast("Error uploading the video. Please try again.");
    }
});
