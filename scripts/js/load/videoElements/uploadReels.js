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


let videoData;

// Upload Video Resume to Firebase Storage

async function uploadVideoResume(userID, videoData, uploadSessionKey = `upload_${videoData.name}`) {
    try {
        const fileRef = ref(storage, `users/${userID}/reels/${videoData.name}`);
        const uploadTask = uploadBytesResumable(fileRef, videoData.file);
        const progressBar = document.getElementById("uploadProgressBar");
        const saveReelChangesBtn = document.getElementById("saveReelChangesBtn");
        let progressToastBar;

    

        if (saveReelChangesBtn) {
            saveReelChangesBtn.disabled = true;  // Disable the button
            saveReelChangesBtn.innerText = 'Uploading video...';  // Update button text
        }
        

        if (progressBar) {
            progressBar.style.display = 'block';
        }else{        
             progressToastBar = showToast('Uploading video...', 'info', 0, null, false, null, 0);
        }

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               
               
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                    progressBar.textContent = `${Math.floor(progress)}%`;


                    }else{        
                        if (progressToastBar) {
                            progressToastBar.style.width = `${progress}%`;
                        }
                        if (saveReelChangesBtn) {
                            saveReelChangesBtn.disabled = true;  // Disable the button
                            saveReelChangesBtn.innerText = `Uploading video... ${progress}%`;  // Update button text
                        }
                        
                }
  
                localStorage.setItem(uploadSessionKey, JSON.stringify({
                    bytesTransferred: snapshot.bytesTransferred,
                    totalBytes: snapshot.totalBytes,
                    progress,
                    name: videoData.name,
                    userID,
                    videoData
                }));
   
                
            },
            (error) => {
                console.error("Error uploading video resume:", error);
                showToast('Failed to upload video resume.');
                localStorage.removeItem(uploadSessionKey);
                if (progressBar) {
                  //  progressBar.style.display = 'none';
                }
            },
            async () => {
                //console.log("uploadTask.snapshot.ref:", uploadTask.snapshot.ref); 

                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              //  console.log("Video URL:", downloadURL);

                progressBar.style.width = '100%';
                progressBar.textContent = 'Upload Complete!';
                
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
        showToast('Failed to upload video resume.');
    }
}

window.uploadVideoResume = uploadVideoResume;




function removeStopWords(text, stopWordsSet) {
    if (!text) {
        console.error("No text provided to remove stop words.");
        return [];
    }

    return text
        .toLowerCase()  // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, "")  // Remove special characters
        .split(" ")  // Split into words
        .filter(word => word && !stopWordsSet.has(word));  // Remove empty strings and stop words
}

// Usage
const stopWords = new Set(["a", "an", "the", "and", "or", "but", "if", "then", "else", "of", "to", "in", "on", "with", "by", "for", "at", "from", "into", "over", "after", "before", "under", "about",
     "above", "below", "is", "was", "were", "be", "has", "had", "do", "does", "did", "not",
      "this", "that", "these", "those", "it", "its", "my", "your", "our", "their", "his",
       "her", "him", "he", "she", "they", "we", "you", "i"]);




// Function to extract hashtags and store them in an array
function extractHashtags(caption) {
    if (!caption) {
        console.error("Caption is undefined or null");
        return [];  // Avoid further errors
    }

  

    console.log("Extracting hashtags from:", caption);

    // Extract only words starting with '#'
    const words = caption.match(/#\w+/g) || [];  // This pattern strictly matches hashtags
    console.log("Hashtags found:", words);

    // Filter out stop words and limit to 15 unique tags
    const filteredTags = words
        .map(word => word.slice(1).toLowerCase())  // Remove '#' and convert to lowercase
        .filter(word => word && !stopWords.has(word))  // Filter out stop words
        .slice(0, 15);  // Limit to 15 unique tags

    if (filteredTags.length === 0) {
        //showToast("No valid tags found, using processed keywords as tags.");
    }

    return Array.from(new Set(filteredTags));  // Ensure tags are unique
}


    // Validate 'createdAt' timestamp
    const createdAtDate = new Date();
    if (isNaN(createdAtDate.getTime())) {
        console.error("Invalid 'createdAt' Date");
        throw new Error("Invalid Date Value for 'createdAt'");
    }

    


async function completeMetadataUpdate(userID, videoData, videoResumeURL) {
    const userlocationData = JSON.parse(sessionStorage.getItem('userLocation')) || {};
    const userDataSaved = getUserData() || {};
    const tags = extractHashtags(videoData.videoResumeCaptions);  // Ensure captions are passed in videoData

    const relatedReels = userDataSaved.videoResumeData?.map(video => ({
        reelID: video.reelID,
        videoResumeTitle: video.videoResumeTitle || '',
        videoUrl: video.videoResumeURL,
        reelURL: video.reelURL,
        reelTags: video.tags,
        reelcreatedDate: video.createdAt
    })).sort((a, b) => b.reelcreatedDate - a.reelcreatedDate).slice(0, 5) || [];




    


    const searchableVideoResumeTitle = removeStopWords(videoData.videoResumeTitle, stopWords);

    if (tags.length < 2) {
        //  showToast("Please add at least two hashtags.");
       //   return;
      }
  
    const videoResumeData = {
        createdByID: userID,
        displayName: userDataSaved.displayName || '',
        publicProfile: userDataSaved.publicProfile || true,
        profilePicture: userDataSaved.profilePicture || '',
        profileURL: `https://reelcareer.co/u/?u=${userID}`,
        membershipType: userDataSaved.membershipType || 'free',
        location: `${userlocationData.city || ''}, ${userlocationData.state || ''}`,
        city: userlocationData.city || '',
        state: userlocationData.state || '',
        country: userlocationData.country || '',
        zip: userlocationData.zip || '',
        searchableVideoResumeTitle: searchableVideoResumeTitle,

        verified: userDataSaved.verified || '',
        position: userDataSaved.position || '',
        tags: tags || [],
        videoResumeCaptions: videoData.videoResumeCaptions,
        videoResumeTitle: videoData.videoResumeTitle,
        thumbnailURL: videoData.thumbnailURL || 'https://reelcareer.co/images/sq_logo_n_BG_sm.png',
        videoResumeURL,
        videoResumeFileName: videoData.name,
        duration: videoData.duration,
        fileType: videoData.fileType,
        createdAt: createdAtDate,
        timestamp: serverTimestamp(),
        views: 0,
        uniqueViews: 0,
        shares: 0,
        likes: 0,
        loves: 0,
        gifts: [],
        endingCardBool: false,
        endingCard: '',
        relatedURLBool: false,
        relatedURL: '',

        relatedReels: relatedReels,
        reelCatagories: [],
        reelResume: [],

        relatedProductsBool: false,
        relatedProducts: [],

        watchTime: 0,
        engagegments: 0,
        reach: 0,
        reported: 0,
        
        comments: 0,
        shortList: 0,
        saved: 0,
        notifcationsBool: false,

        isPinned: false,
        isPinnedReelCareer: false,
        commentsBool: true,
        locationBool: true,
        videoPlacement: [],

        giftsBool: true,
        viewsBool: true,
        likesBool: true,
        lovesBool: true,

        isPublic: true,
        isBoostedPost: false,
        isSponsoredPost: false,
        status: 'draft',
        isDeleted: false,
    };
let reelID = '';

   // console.log("videoResumeData: ", videoResumeData);

    try {
        const reelDocRef = await addDoc(collection(db, "VideoResumes"), videoResumeData);
         reelID = reelDocRef.id;  // Get the reelID from Firestore document reference

        // Store the reelID in localStorage
        localStorage.setItem('reelID', reelID);
        
    
            // Update the videoResumeData with the new reelID and generate the reelURL
            const reelURL = `https://reelcareer.co/reels/?r=${reelID}`;
    
            // Update videoResumeData object in Firestore
            await updateDoc(reelDocRef, {
                reelID: reelID,
                reelURL: reelURL
            });
          console.log("Successfully updated reel document with: ", { reelID, reelURL });
        
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
                    status: 'posted',
                    reelURL: `https://reelcareer.co/reels/?r=${reelID}`
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
                    status: 'posted',
                    reelURL: `https://reelcareer.co/reels/?r=${reelID}`,
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
                        status: 'posted',
                        reelURL: `https://reelcareer.co/reels/?r=${reelID}`
                    }
                ]
            };
        
        
            let userData = setUserData(updatedUserData);
            localStorage.setItem('userData', userData);
            console.log("LocalStorage userData updated with: ", updatedUserData);
            showToast('Reel Saved successfully.');

        } catch (error) {
            console.error("Error setting or saving user data locally: ", error, {
                updatedUserData
            });
        }      
    

        const saveReelChangesBtn = document.getElementById("saveReelChangesBtn");
       
       
            // Place your control logic here only if the elements are present
            const uploadContainer = document.getElementById("reel-upload-container");
            if (!uploadContainer) {

                console.log("No Upload container found.");

                createVideoUploadPopup();
                document.getElementById("uploadArea").classList.add("hidden");
                document.getElementById("reels-more-options-area").classList.remove("hidden");
            } else {
           
        
            if (uploadContainer && uploadContainer.style.display === "none") {
                uploadContainer.style.display = "block";
                console.log("Upload container found, It was hidden.");

            } else if (uploadContainer && uploadContainer.style.display === "block") {
                console.log("Upload container found. and is open");

                document.getElementById("uploadArea").style.display = "none";
                document.getElementById("reels-more-options-area").style.display = "block";
                document.getElementById("uploadArea").classList.add("hidden");
                document.getElementById("reels-more-options-area").classList.remove("hidden");
            }
        
            if (saveReelChangesBtn) {
                saveReelChangesBtn.disabled = false;
                saveReelChangesBtn.innerText = `Save Changes`;
            }

        }


        
        
}



window.completeMetadataUpdate = completeMetadataUpdate;




async function postReelFunction(videoResumeTitle, videoResumeCaptions, uploadedFile, videoDuration) {
    document.getElementById("uploadArea").classList.add("hidden");
    //document.getElementById("reels-more-options-area").classList.remove("hidden");
    const reelsOptionsArea = document.getElementById("reels-more-options-area");
    reelsOptionsArea.classList.remove("hidden");


    if (reelsOptionsArea) {
        reelsOptionsArea.scrollIntoView({ behavior: "smooth", block: "start" });
    }
   
    let videoResumeURL = '';

    const userDataSaved = getUserData() || {};
    const userID = auth.currentUser?.uid || userDataSaved.userID;

    if (!userID) {
        showToast('No User Info');
        return;
    }

    const tags = extractHashtags(videoResumeCaptions);
    if (tags.length < 2) {
       // showToast("Please add at least two hashtags.");
      //  return;
    }

    // Ensure videoResumeTitle is a string and trim extra spaces before taking the first 10 characters
    const titleSnippet = videoResumeTitle.trim().substring(0, 10);
    const fileName = `${userID}-${titleSnippet}-reel.mp4`.replace(/\s+/g, '');
    

    try {
        const videoData = {
            duration: videoDuration,
            name: fileName,
            videoResumeTitle,
            videoResumeCaptions,
            tags: tags || [],
            userID,
            file: uploadedFile,
            fileType: "video/mp4",
        };
    
        
         await uploadVideoResume(userID, videoData);
    } catch (error) {
        console.error('Error during video capture or upload:', error);
        showToast('Failed to upload video resume. Please try again.', "error");
        return;
    }




}

window.postReelFunction = postReelFunction;

function createThumbnailPicker(file) {
    const thumbnailPreviewPickerSection = document.getElementById('thumbnailPreviewPickerSection');
    const thumbnailPreview = document.getElementById('thumbnailPreview'); // Assume an image element for showing preview
    const videoElement = document.createElement('video');
    let thumbnailBlob = null;
    let videoDuration = 0;


    if (typeof input === 'string' && input.startsWith('http')) {
        // Handle URL
        videoElement.src = input;  // Directly use the URL
    } else if (file && file.type && file.type.startsWith('video/')) {
        videoElement.src = URL.createObjectURL(file);  // Safe to use file.type
    } else {
        console.error('Invalid file provided to createThumbnailPicker.');
        return;  // Exit the function to avoid further errors
    }
    
    videoElement.id = "videoToUpload";

    videoElement.onloadedmetadata = () => {
         videoDuration = videoElement.duration;

        // Create range slider for custom seeking
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = videoDuration.toString();
        slider.step = '0.1';
        slider.value = (videoDuration / 2).toString();
        slider.id = 'thumbnailSlider';

        thumbnailPreviewPickerSection.appendChild(slider);

        const updateThumbnail = (time) => {
            videoElement.currentTime = time;
            videoElement.crossOrigin = 'anonymous'; // Enable cross-origin support

            videoElement.onseeked = () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                
                // Convert canvas to Blob and update preview
                canvas.toBlob((blob) => {
                    if (blob) {
                        thumbnailBlob = blob;  // Store blob for upload
                        thumbnailPreview.src = URL.createObjectURL(blob);  // Update thumbnail image
                    } else {
                        console.error('Failed to create thumbnail blob.');
                    }
                }, 'image/png'); 
            };
        };

        // Initialize with middle frame
        updateThumbnail(videoDuration / 2);

        // Add event listener for slider to update thumbnail
        slider.addEventListener('input', (event) => {
            const selectedTime = parseFloat(event.target.value);
            updateThumbnail(selectedTime);
        });
    };


    return videoDuration;
}

window.createThumbnailPicker = createThumbnailPicker;




function initializeVideoUploadHandlers() {
    const fileInput = document.querySelector(".reel-video-input");
    const selectVideoButton = document.querySelector(".select-video-btn");
    const uploadButton = document.querySelector(".reel-video-btn");
    const videoPreview = document.querySelector(".reel-video-preview");

    if (!fileInput || !selectVideoButton || !uploadButton || !videoPreview) {
      console.error("One or more video upload elements not found.");
      return;
    }

    let uploadedFile = null;
    let videoDuration = 0;

    selectVideoButton.addEventListener("click", (e) => {

        fileInput.click();
    });

    
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file || file.type.split("/")[0] !== "video") {
          //  console.log("Invalid file type:", file.type); // Check the file type
            showToast("Please select a valid video file.");
            return;
        }
        

        uploadedFile = file;
        videoDuration =  createThumbnailPicker(file);

    });


        
    uploadButton.addEventListener("click", async (e) => {
        e.preventDefault();

        if (!uploadedFile) {
            showToast("No video selected.");
            return;
        }
     
        
        try {
            const description = document.querySelector(".reel-video-content").value.trim();
            const title = document.querySelector(".reel-video-title").value.trim();
            await postReelFunction(title, description, uploadedFile, videoDuration);
        } catch (error) {

            console.error("Upload error:",error);
            showToast("Error uploading the video. Please try again.");
        }
    });
}


  window.initializeVideoUploadHandlers = initializeVideoUploadHandlers;

  // Call this function once the popup is created or relevant DOM is ready
  





  

