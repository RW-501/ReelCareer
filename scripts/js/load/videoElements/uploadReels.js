import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
    doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
    query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
    uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
    OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
    where, getDocs, storage, getAuth, collection, auth, analytics,
    googleProvider, onSnapshot,
    facebookProvider,
    getUserId // Export the function
} from 'https://reelcareer.co/scripts/js/load/module.js';

const DEBUG = true;
if (DEBUG) console.log("Debug on");


let isMultipleUpload = false;

// Upload Video Resume to Firebase Storage
async function uploadVideoResume(
  userID,
  videoData,
  uploadSessionKey = `upload_${videoData.name}`
) {
  try {
    document.getElementById("uploadArea").classList.add("hidden");
    const reelsOptionsArea = document.getElementById("reels-more-options-area");
    reelsOptionsArea.classList.remove("hidden");

    if (DEBUG) console.log("videoDuration:", videoDuration);
    if (DEBUG) console.log("uploadedFile:", uploadedFile);

    if (reelsOptionsArea) {
      reelsOptionsArea.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const fileRef = ref(storage, `users/${userID}/reels/${videoData.name}`);
    const uploadTask = uploadBytesResumable(fileRef, videoData.file);
    const progressBar = document.getElementById("uploadProgressBar");
    const saveReelChangesBtn = document.getElementById("saveReelChangesBtn");
    let progressToastBar;

    if (saveReelChangesBtn) {
      saveReelChangesBtn.disabled = true; // Disable the button
      saveReelChangesBtn.innerText = "Uploading video..."; // Update button text
    }

    if (progressBar) {
      progressBar.style.display = "block";
    } else {
      progressToastBar = showToast(
        "Uploading video...",
        "info",
        0,
        null,
        false,
        null,
        0
      );
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (progressBar) {
          progressBar.style.width = `${progress}%`;
          progressBar.textContent = `${Math.floor(progress)}%`;
        } else {
          if (progressToastBar) {
            progressToastBar.style.width = `${progress}%`;
          }
          if (saveReelChangesBtn) {
            saveReelChangesBtn.disabled = true; // Disable the button
            saveReelChangesBtn.innerText = `Uploading video... ${progress}%`; // Update button text
          }
        }

        localStorage.setItem(
          uploadSessionKey,
          JSON.stringify({
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            progress,
            name: videoData.name,
            userID,
            videoData,
            originalFileName: videoData.originalFileName
          })
        );
      },
      (error) => {
        console.error("Error uploading video resume:", error);
        showToast("Failed to upload video resume.");
        localStorage.removeItem(uploadSessionKey);
        if (progressBar) {
          //  progressBar.style.display = 'none';
        }
      },
      async () => {
        //console.log("uploadTask.snapshot.ref:", uploadTask.snapshot.ref);

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        //  console.log("Video URL:", downloadURL);

        progressBar.style.width = "100%";
        progressBar.textContent = "Upload Complete!";
        saveReelChangesBtn.disabled = false; // Disable the button

        localStorage.removeItem(uploadSessionKey);
        setTimeout(() => {
          if (progressBar) {
            // progressBar.style.display = 'none';
          }
        }, 2000);

        // Update metadata when upload completes
        await completeMetadataUpdate(userID, videoData, downloadURL);

        // return downloadURL;  // Return the download URL
      }
    );
  } catch (error) {
    console.error("Error uploading video resume:", error);
    showToast("Failed to upload video resume.");
  }
}

window.uploadVideoResume = uploadVideoResume;

function removeStopWords(text, stopWordsSet) {
  if (!text) {
   // console.warn("No text provided to remove stop words.");
    return [];
  }

  return text
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .split(" ") // Split into words
    .filter((word) => word && !stopWordsSet.has(word)); // Remove empty strings and stop words
}

// Usage
const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "if", "then", "else", "of", "to", "in", "on", "with", "by", 
    "for", "at", "from", "into", "over", "after", "before", "under", "about", "above", "below", 
    "between", "against", "during", "without", "within", "along", "through", "as", "around", "near", 
    "is", "was", "were", "be", "been", "being", "am", "are", "has", "have", "had", "do", "does", 
    "did", "not", "no", "yes", "can", "could", "will", "would", "shall", "should", "may", "might", 
    "must", "this", "that", "these", "those", "it", "its", "my", "your", "our", "their", "his", 
    "her", "him", "he", "she", "they", "we", "you", "i", "me", "us", "mine", "yours", "ours", 
    "hers", "theirs", "what", "which", "who", "whom", "whose", "how", "why", "where", "when", 
    "any", "some", "all", "few", "many", "most", "more", "less", "such", "than", "too", "very", 
    "so", "just", "only", "even", "again", "also", "well", "ever", "always", "never", "now", 
    "then", "here", "there", "one", "two", "three", "first", "second", "third", "each", "every", 
    "either", "neither", "both", "several", "other", "another", "much", "same", "own", "last", 
    "next", "new", "old", "great", "small", "few", "lot", "bit", "least", "moreover", "however", 
    "therefore", "meanwhile", "thus", "hence", "instead", "further", "furthermore", "otherwise", 
    "nonetheless", "likewise", "similarly", "whereas", "albeit", "nonetheless", "anywhere", 
    "everywhere", "somewhere", "nowhere", "thereby", "therefore"
  ]);
  

// Function to extract hashtags and store them in an array
function extractHashtags(caption) {
  if (!caption) {
   // console.warn("Caption is undefined or null");
    return []; // Avoid further errors
  }

  //console.log("Extracting hashtags from:", caption);

  // Extract only words starting with '#'
  const words = caption.match(/#\w+/g) || []; // This pattern strictly matches hashtags
  if (DEBUG) console.log("Hashtags found:", words);

  // Filter out stop words and limit to 15 unique tags
  const filteredTags = words
    .map((word) => word.slice(1).toLowerCase()) // Remove '#' and convert to lowercase
    .filter((word) => word && !stopWords.has(word)) // Filter out stop words
    .slice(0, 15); // Limit to 15 unique tags

  if (filteredTags.length === 0) {
    //showToast("No valid tags found, using processed keywords as tags.");
  }

  return Array.from(new Set(filteredTags)); // Ensure tags are unique
}

// Validate 'createdAt' timestamp
const createdAtDate = new Date();
if (isNaN(createdAtDate.getTime())) {
  console.error("Invalid 'createdAt' Date");
  throw new Error("Invalid Date Value for 'createdAt'");
}

async function completeMetadataUpdate(userID, videoData, videoResumeURL) {
  const userlocationData =
    JSON.parse(sessionStorage.getItem("userLocation")) || {};
  const userDataSaved = getUserData() || {};
  const tags = extractHashtags(videoData.videoResumeCaptions); // Ensure captions are passed in videoData

  const relatedReels =
    userDataSaved.videoResumeData
      ?.map((video) => ({
        reelID: video.reelID,
        videoResumeTitle: video.videoResumeTitle || "",
        videoUrl: video.videoResumeURL,
        reelURL: video.reelURL,
        reelTags: video.tags,
        reelcreatedDate: video.createdAt
      }))
      .sort((a, b) => b.reelcreatedDate - a.reelcreatedDate)
      .slice(0, 5) || [];

  const videoResumeTitle = videoData.videoResumeTitle;

  const originalFileName = videoData.originalFileName;

  if (DEBUG)  console.log("originalFileName: ", originalFileName);
  if (DEBUG) console.log("videoResumeTitle: ", videoResumeTitle);
  const searchableVideoResumeTitle = removeStopWords(
    videoResumeTitle,
    stopWords
  );

  if (tags.length < 2) {
    //  showToast("Please add at least two hashtags.");
    //   return;
  }
  const videoResumeData = {
    // User and Profile Information
    createdByID: userID || "", // Ensure userID is always defined
    displayName: userDataSaved.displayName || "",
    publicProfile: userDataSaved.publicProfile ?? true, // Default to true if null/undefined
    profilePicture: userDataSaved.profilePicture || "",
    profileURL: `https://reelcareer.co/u/?u=${userID}`,
    membershipType: userDataSaved.membershipType || "free",

    // Location Information
    location: `${userlocationData.city || ""}, ${userlocationData.state || ""}`,
    city: userlocationData.city || "",
    state: userlocationData.state || "",
    country: userlocationData.country || "",
    zip: userlocationData.zip || "",

    // Video Resume Information
    searchableVideoResumeTitle: searchableVideoResumeTitle || "",
    videoResumeCaptions: videoData.videoResumeCaptions || "",
    videoResumeTitle: videoResumeTitle || "",
    thumbnailURL:
      videoData.thumbnailURL ||
      "https://reelcareer.co/images/sq_logo_n_BG_sm.png",
    videoResumeURL: videoResumeURL || "",
    videoResumeFileName: videoData.name || "",
    duration: videoData.duration / 2 || 0,
    size: videoData.size || 0,
    dimensions: videoData.dimensions || "",
    fileType: videoData.fileType || "",
    collection: videoData.collection || "group_1",

    // Timestamp Information
    createdAt: createdAtDate || null, // Default to null if not provided
    timestamp: serverTimestamp(),

    // Engagement and Stats Information
    views: 0,
    uniqueViews: 0,
    shares: 0,
    likes: 0,
    loves: 0,
    gifts: [],
    endingCardBool: false,
    endingCard: "",
    relatedURLBool: false,
    relatedURL: "",
    repeatViews: 0,

    rating: 100,

    // Related Content
    relatedReels: relatedReels || [],
    reelCategories: [], // Empty array by default
    reelResume: [], // Empty array by default

    // Products & Comments
    relatedProductsBool: false,
    relatedProducts: [],
    watchTime: 0,
    engagements: 0,
    reach: 0,
    reported: 0,

    // Interaction Data
    comments: 0,
    shortList: 0,
    saved: 0,
    notificationsBool: false,

    // Reel Settings
    isPinned: false,
    isPinnedReelCareer: false,
    commentsBool: true,
    locationBool: true,
    videoPlacement: [],

    // Post Settings
    giftsBool: true,
    viewsBool: true,
    likesBool: true,
    lovesBool: true,
    isPublic: true,
    isBoostedPost: false,
    isSponsoredPost: false,
    status: "draft",
    isDeleted: false
  };

  let reelID = "";

  if (DEBUG)  console.log("videoResumeData: ", videoResumeData);

  try {
    const reelDocRef = await addDoc(
      collection(db, "VideoResumes"),
      videoResumeData
    );
    reelID = reelDocRef.id; // Get the reelID from Firestore document reference

    // Store the reelID in localStorage
    localStorage.setItem("reelID", reelID);

    // Update the videoResumeData with the new reelID and generate the reelURL
    const reelURL = `https://reelcareer.co/watch/?v=${reelID}`;

    // Update videoResumeData object in Firestore
    await updateDoc(reelDocRef, {
      reelID: reelID,
      reelURL: reelURL
    });
    if (DEBUG)  console.log("Successfully updated reel document with: ", {
      reelID,
      reelURL
    });
  } catch (error) {
    console.error("Error updating reel document: ", error);
  }

  try {
    const userDocRef = doc(db, "Users", userID);
    await updateDoc(userDocRef, {
      videoResumeData: arrayUnion({
        reelID: reelID,
        reported: 0,

        videoResumeTitle: videoData.videoResumeTitle,
        videoResumeURL: videoResumeURL,
        tags: tags || [],
        createdAt: createdAtDate,
        status: "posted",
        reelURL: `https://reelcareer.co/watch/?v=${reelID}`
      })
    });
  } catch (error) {
    console.error("Error updating user document: ", error, {
      userID,
      videoData: {
        videoResumeTitle: videoData.videoResumeTitle,
        videoResumeURL: videoResumeURL,
        tags: tags || [],
        reelID: reelID,
        createdAt: createdAtDate,
        status: "posted",
        reelURL: `https://reelcareer.co/watch/?v=${reelID}`
      }
    });
  }

  try {
    const updatedUserData = {
      videoResumeData: [
        ...(userDataSaved.videoResumeData || []),
        {
          reelID: reelID,
          videoResumeTitle: videoData.videoResumeTitle,
          videoResumeURL: videoResumeURL,
          tags: tags || [],
          isPublic: true,
          createdAt: createdAtDate,
          status: "posted",
          reelURL: `https://reelcareer.co/watch/?v=${reelID}`
        }
      ]
    };

    let userData = setUserData(updatedUserData);
    localStorage.setItem("userData", userData);
    if (DEBUG)   console.log("LocalStorage userData updated with: ", updatedUserData);
    showToast("Reel Saved successfully.");
  } catch (error) {
    console.error("Error setting or saving user data locally: ", error, {
      updatedUserData
    });
  }

  const descriptionInput = document.querySelector(".reel-video-content");
  const titleInput = document.querySelector(".reel-video-title");
  titleInput.value = "";
  descriptionInput.value = "";

  const saveReelChangesBtn = document.getElementById("saveReelChangesBtn");
  const moreOptionsArea = document.getElementById("reels-more-options-area");

  // Place your control logic here only if the elements are present
  const uploadContainer = document.getElementById("reel-upload-container");
  if (!uploadContainer) {
    console.warn("No Upload container found.");

    createVideoUploadPopup();
    document.getElementById("uploadArea").classList.add("hidden");
    moreOptionsArea.classList.remove("hidden");
  } else {
    if (uploadContainer && uploadContainer.style.display === "none") {
      uploadContainer.style.display = "block";
      if (DEBUG)   console.log("Upload container found, It was hidden.");
    } else if (uploadContainer && uploadContainer.style.display === "block") {
      console.log("Upload container found. and is open");

      document.getElementById("uploadArea").style.display = "none";
      moreOptionsArea.style.display = "block";
      document.getElementById("uploadArea").classList.add("hidden");
      moreOptionsArea.classList.remove("hidden");

      if (saveReelChangesBtn) {
        saveReelChangesBtn.disabled = false;
        saveReelChangesBtn.innerText = `Save Changes`;
      }
    } else if (
      (moreOptionsArea.style.display = "block" && isMultipleUpload === true)
    ) {
      saveReelChangesBtn.click();

      moreOptionsArea.style.display = "none";
      document.getElementById("uploadArea").classList.remove("hidden");
      moreOptionsArea.classList.add("hidden");

      if (saveReelChangesBtn) {
        saveReelChangesBtn.disabled = true;
        saveReelChangesBtn.innerText = ``;
      }
    }
  }
}

window.completeMetadataUpdate = completeMetadataUpdate;

async function postReelFunction(
  videoResumeTitle,
  videoResumeCaptions,
  uploadedFile,
  videoDuration,
  collection
) {
  let videoResumeURL = "";

  try {
    const userDataSaved = getUserData() || {};
    const userID = auth.currentUser?.uid || userDataSaved.userID;

    if (!userID) {
      showToast("No User Info");
      return;
    }

    const tags = extractHashtags(videoResumeCaptions);
    if (tags.length < 2) {
      // showToast("Please add at least two hashtags.");
      //  return;
    }

    // Ensure videoResumeTitle is a string and trim extra spaces before taking the first 10 characters
    const titleSnippet = videoResumeTitle.trim().substring(0, 10);
    const fileName = `${userID}-${titleSnippet}_reel.mp4`.replace(/\s+/g, '');

    const videoData = {
      duration: videoDuration,
      name: fileName,
      videoResumeTitle,
      videoResumeCaptions,
      collection: collection,
      tags: tags || [],
      userID,
      file: uploadedFile,
      fileType: "video/mp4",
      dimensions: videoDimensions,
      size: videoSizeInMB,
      originalFileName: uploadedFile.name
    };

    await uploadVideoResume(userID, videoData);
  } catch (error) {
    console.error("Error during video capture or upload:", error);
    showToast("Failed to upload video resume. Please try again.", "error");
    return;
  }
}

window.postReelFunction = postReelFunction;

let videoSizeInMB ;

let uploadedFiles = null;
let uploadedFile = null;
let videoDuration = 0;
let videoDimensions = '';


function createThumbnailPicker(file, previewContainer, index, duration, sizeInMB){
    const thumbnailPreviewPickerSection = document.getElementById('thumbnailPreviewPickerSection');
    const thumbnailPreview = document.getElementById('thumbnailPreview'); // Assume an image element for showing preview
    const videoElement = document.createElement('video');
    let thumbnailBlob = null;

    if (DEBUG)  console.log("file:", file);

    if (DEBUG)   console.log("videoElement:", videoElement);
    if (DEBUG)  console.log("previewContainer:", previewContainer);

    if (!videoElement) {
        console.warn("videoElement is not defined or not found in the DOM.");
    }

    if (!previewContainer) {
        console.warn("previewContainer is not defined or not found in the DOM.");
         previewContainer = document.querySelector(".videoElements");
    }
    
    if (file && file.type && file.type.startsWith('video/')) {
        videoElement.src = URL.createObjectURL(file);  // Safe to use file.type
        previewContainer.src = URL.createObjectURL(file);
        previewContainer.load(); // Ensure the video is reloaded to reflect changes
        //videoElement.play(); // Optional: Start playback automatically
        previewContainer.hidden = false; // Ensure the preview container is visible
        videoElement.hidden = false;    // Ensure the main video element is visible

        if (DEBUG)     console.log('file:', file);
        if (DEBUG)    console.log(' URL.createObjectURL(file);:', previewContainer.src);

    } else if (file) {
        videoElement.src = file;  // Handle non-video file as a fallback
    } else {
        console.error('Invalid file provided to createThumbnailPicker.');
        return;  // Exit the function to avoid further errors
    }

    videoElement.id = "videoToUpload";
     videoDuration = duration;
     if (DEBUG)  console.log('videoDuration:', videoDuration);
     videoSizeInMB = sizeInMB;

    videoElement.onloadedmetadata = () => {
        let metaVideoDuration = videoElement.duration;

        // Create range slider for custom seeking
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = metaVideoDuration.toString();
        slider.step = '0.1';
        slider.value = (metaVideoDuration / 2).toString();
        slider.id = 'thumbnailSlider';

        thumbnailPreviewPickerSection.appendChild(slider);

        const updateThumbnail = (time) => {
            if (DEBUG)    console.log('updateThumbnail called with time:', time);

            videoElement.currentTime = time;
            videoElement.crossOrigin = 'anonymous'; // Enable cross-origin support
            if (DEBUG)    console.log('videoElement currentTime set to:', videoElement.currentTime);

            videoElement.onseeked = () => {
                if (DEBUG)        console.log('onseeked event triggered');

                const canvas = document.createElement('canvas');
                if (DEBUG)     console.log('Created canvas element:', canvas);

                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                if (DEBUG)   console.log('Canvas dimensions set to:', canvas.width, 'x', canvas.height);
                videoDimensions = `${canvas.width, 'x', canvas.height}`;

                const ctx = canvas.getContext('2d');
                if (DEBUG)    console.log('Canvas rendering context obtained:', ctx);

                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                if (DEBUG)     console.log('Image drawn on canvas from videoElement at time:', videoElement.currentTime);

                // Convert canvas to Blob and update preview
                canvas.toBlob((blob) => {
                    if (blob) {
                        if (DEBUG)     console.log('Blob created successfully:', blob);
                        thumbnailBlob = blob;  // Store blob for upload
                        thumbnailPreview.src = URL.createObjectURL(blob);   // Update thumbnail image
                        if (DEBUG)      console.log('Thumbnail preview updated with blob URL:', thumbnailPreview.src);
                    } else {
                        console.error('Failed to create thumbnail blob.');
                    }
                }, 'image/png');
            };
        };



        // Initialize with middle frame
        updateThumbnail(metaVideoDuration / 2);

        // Add event listener for slider to update thumbnail
        slider.addEventListener('input', (event) => {
            const selectedTime = parseFloat(event.target.value);
            updateThumbnail(selectedTime);
        });
    };


    return   videoElement;

}

window.createThumbnailPicker = createThumbnailPicker;



function initializeVideoUploadHandlers() {
    const fileInput = document.querySelector(".reel-video-input");
    const selectVideoButton = document.getElementById("mainSelectVideoBtn");
    const uploadButton = document.querySelector(".reel-video-btn");
    const videoPreview = document.querySelector(".reel-video-preview");

    if (!fileInput || !selectVideoButton || !uploadButton || !videoPreview) {
        console.error("One or more video upload elements not found.");
        return;
    }



    // Trigger file input when the select video button is clicked
    selectVideoButton.addEventListener("click", () => {
        fileInput.click();
    });

    // Handle file input changes
    fileInput.addEventListener("change", async (e) => {
        const files = e.target.files;
      
        if (files.length === 0) {
          showToast("Please select valid video files.");
          return;
        }
      
        // Filter out files that are not videos
        const videoFiles = Array.from(files).filter(file => file.type.split("/")[0] === "video");
      
        if (videoFiles.length === 0) {
          showToast("Please select valid video files.");
          return;
        }
      
        if (videoFiles.length > 1) {
          showToast("Multiple Upload.");
          isMultipleUpload = true;
        } else {
          isMultipleUpload = false;
        }
      
        // Store the valid video files
        uploadedFiles = videoFiles;
      
        if (DEBUG) console.log("uploadedFiles:", uploadedFiles);
      
        // Clear previous thumbnails and preview
        const previewContainer = document.getElementById("reelVideoPreview");
        previewContainer.innerHTML = ""; // Clear previous previews
      
        // Process each video file to get duration and size
        uploadedFiles.forEach((file, index) => {
          const videoURL = URL.createObjectURL(file); // Create a temporary URL for the video
          const videoElement = document.createElement("video"); // Create a video element to load the file
      
          videoElement.src = videoURL;
      
          videoElement.addEventListener("loadedmetadata", () => {
            const duration = videoElement.duration; // Get video duration in seconds
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Convert file size to MB
      
            if (DEBUG)   console.log(`Video ${index + 1}:`);
            if (DEBUG)     console.log(`- Duration: ${duration.toFixed(2)} seconds`);
            if (DEBUG)   console.log(`- Size: ${sizeInMB} MB`);
      
            // Add the thumbnail and metadata preview
            createThumbnailPicker(file, previewContainer, index, duration, sizeInMB);
      
            // Revoke the object URL after use
            URL.revokeObjectURL(videoURL);
          });
        });
      });
      


    let videoDataArray = []; // Array to hold multiple video data objects
    let userDataSaved; 
    let userID;
    

         userDataSaved = getUserData() || {};
         userID = auth.currentUser?.uid || userDataSaved.userID;

    document.getElementById("uploadVideosBtn").addEventListener("click", async () => {


        // Get the value of the description and trim it
        let description = document.querySelector(".reel-video-content").value.trim();
        let videoResumeTitle = document.querySelector(".reel-video-title").value.trim();

        // Find the word following the `$`
        let match = description.match(/\$(\w+)/); // Regex to match the word after `$`

        if (match) {
            // If a word is found, assign it to the target input field
            document.querySelector(".reel-video-collection").value = match[1];
        } else {
            console.warn("No word found after $ in the description.");
        }


        const tags = extractHashtags(description);
        const titleSnippet = videoResumeTitle.substring(0, 10);
        const fileName = `${userID}-${titleSnippet}_reel.mp4`.replace(/\s+/g, '');

        if (DEBUG)  console.log('videoDuration:', videoDuration);

        videoDataArray = uploadedFiles.map((file, index) => ({
            name: fileName,
            file: file,
            collection: document.querySelector(".reel-video-collection").value.trim() || `Collection ${match}`,
            description: description || file.name.replace(/\.[^/.]+$/, '').replace(/[_\-\.]+/g, ' '),
            title: videoResumeTitle || file.name.replace(/\.[^/.]+$/, '').replace(/[_\-\.]+/g, ' '),
            videoDuration: videoDuration,
            fileType: "video/mp4",
            userID,
            tags: tags || [],
            originalFileName: file.name,
            videoResumeCaptions: description || file.name.replace(/\.[^/.]+$/, '').replace(/[_\-\.]+/g, ' '),
            videoResumeTitle:  videoResumeTitle || file.name.replace(/\.[^/.]+$/, '').replace(/[_\-\.]+/g, ' '),
            duration: videoDuration,
            size: videoSizeInMB,
            dimensions: videoDimensions,  


        }));
        if (DEBUG)  console.log("videoDataArray:", videoDataArray);



        if (videoDataArray.length === 0) {
            showToast("No videos selected.");
            return;
        }

         userDataSaved = getUserData() || {};
         userID = auth.currentUser?.uid || userDataSaved.userID;

        if (!userID) {
            showToast('No User Info');
            return;
        }

        await uploadMultipleVideoResumes(userID, videoDataArray);
    });


    uploadButton.addEventListener("click", async (e) => {
        e.preventDefault();

        if (!uploadedFile) {
            showToast("No video selected.");
            return;
        }


        try {
            const descriptionInput = document.querySelector(".reel-video-content");
            const titleInput = document.querySelector(".reel-video-title");
            const collectionInput = document.querySelector(".reel-video-collection").value.trim() || `collection `;

            let description = descriptionInput.value.trim();
            let title = titleInput.value.trim();

            // Normalize the file name if title or description is empty
            if (!title || !description) {
                // Extract the file name without the extension
                let normalizedFileName = uploadedFile.name.replace(/\.[^/.]+$/, ''); // Remove file extension
                // Replace _, -, and . with spaces
                normalizedFileName = normalizedFileName.replace(/[_\-\.]+/g, ' ').trim();

                // Assign normalized file name as title or description if empty
                if (!title) {
                    title = normalizedFileName;
                    titleInput.value = title; // Update the title input field
                }
                if (!description) {
                    description = normalizedFileName;
                    descriptionInput.value = description; // Update the description input field
                }
            }

            // Call the postReelFunction with the processed title and description
            await postReelFunction(title, description, uploadedFile, videoDuration, collectionInput);

        } catch (error) {

            console.error("Upload error:", error);
            showToast("Error uploading the video. Please try again.");
        }
    });
}


window.initializeVideoUploadHandlers = initializeVideoUploadHandlers;


// Function to upload multiple videos
async function uploadMultipleVideoResumes(userID, videoDataArray) {
    for (const videoData of videoDataArray) {
        // Reset progress bar for each video
        const progressBar = document.getElementById("uploadProgressBar");
        if (progressBar) {
            progressBar.style.width = "0%";
            progressBar.textContent = "0%";
        }

        try {
            // Call the existing upload function for each video
            await uploadVideoResume(userID, videoData);

            // Reset or clear the current video data if needed
            if (DEBUG)    console.log(`Upload complete for video: ${videoData.name}`);
        } catch (error) {
            console.error(`Error uploading video ${videoData.name}:`, error);
            continue; // Continue to the next video in case of an error
        }
    }

    // Final UI updates after all uploads are complete
    const saveReelChangesBtn = document.getElementById("saveReelChangesBtn");
    if (saveReelChangesBtn) {
        saveReelChangesBtn.disabled = false;
        saveReelChangesBtn.innerText = 'Save Changes';
    }
    showToast("All videos uploaded successfully!", "success");
}







