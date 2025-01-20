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
        console.log("uploadVideoResume userID: ", userID);
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

              //  navigator.sendBeacon('/log-progress', JSON.stringify({ userID, progress }));
            },
            (error) => {
                console.error("Error uploading video resume:", error);
                showToast('Failed to upload video resume.');
                localStorage.removeItem(uploadSessionKey);
                if (progressBar) {
                    progressBar.style.display = 'none';
                }
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                progressBar.style.width = '100%';
                progressBar.textContent = 'Upload Complete!';
                
                localStorage.removeItem(uploadSessionKey);
                setTimeout(() => {
                    if (progressBar) {
                        progressBar.style.display = 'none';
                    }
                }, 2000);

                // Update metadata when upload completes
                await completeMetadataUpdate(userID, videoData, downloadURL);
                showToast('Video uploaded successfully!', 'success');
                const reelUploadContainer = document.getElementById('reel-upload-container');
                if (!reelUploadContainer) {
                    createVideoUploadPopup();
                    document.getElementById("uploadArea").classList.add("hidden");
                    document.getElementById("reels-more-options-area").classList.remove("hidden");
                } else if (reelUploadContainer.style.display == "none") {
                    reelUploadContainer.style.display = "block"; // Corrected assignment
                }
                

                if (saveReelChangesBtn) {
                    saveReelChangesBtn.disabled = false;  // Disable the button
                    saveReelChangesBtn.innerText = `Save Changes`;  // Update button text
                }

                return downloadURL;  // Return the download URL


            }
        );
    } catch (error) {
        console.error("Error uploading video resume:", error);
        showToast('Failed to upload video resume.');
    }
}

window.uploadVideoResume = uploadVideoResume;

async function completeMetadataUpdate(userID, videoData, videoResumeURL) {
    const userlocationData = JSON.parse(sessionStorage.getItem('userLocation')) || {};
    const userDataSaved = getUserData() || {};
    const tags = extractHashtags(videoData.videoResumeCaptions);  // Ensure captions are passed in videoData
    if (tags.length < 2) {
        showToast("Please add at least two hashtags.");
        return;
    }
    console.log("completeMetadataUpdate userID: ", userID);

    const relatedReels = userDataSaved.videoResumeData?.map(video => ({
        reelID: video.reelID,
        videoResumeTitle: video.videoResumeTitle || '',
        videoUrl: video.videoResumeURL,
        reelURL: video.reelURL,
        reelTags: video.tags,
        reelcreatedDate: new Date(video.createdAt)
    })).sort((a, b) => b.reelcreatedDate - a.reelcreatedDate).slice(0, 5) || [];


        // Searchable Title
        const searchableVideoResumeTitle = videoData.videoResumeTitle
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")  // Remove special characters
            .split(" ")  // Split into words
            .filter(Boolean);  // Remove empty strings


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
        tags,
        videoResumeCaptions: videoData.videoResumeCaptions,
        videoResumeTitle: videoData.videoResumeTitle,
        thumbnailURL: 'https://reelcareer.co/images/sq_logo_n_BG_sm.png',
        videoResumeURL,
        videoResumeFileName: videoData.name,
        duration: videoData.duration,
        fileType: videoData.fileType,
        createdAt: new Date(),
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
        status: 'posted',
        isDeleted: false,
    };

    console.log("videoResumeData: ", videoResumeData);

    try {
        const reelDocRef = await addDoc(collection(db, "VideoResumes"), videoResumeData);
        const reelID = reelDocRef.id;



    document.getElementById('reelID').innerText = reelID;

            // Update the videoResumeData with the new reelID and generate the reelURL
    const reelURL = `https://reelcareer.co/reels/?r=${reelID}`;

    // Now you can update the videoResumeData object with the new reelID and reelURL
    await updateDoc(reelDocRef, {
        reelID: reelID,
        reelURL: reelURL
    });
    
    console.log("videoResumeData: ", { ...videoResumeData, reelID, reelURL });

        const userDocRef = doc(db, "Users", userID);
        await updateDoc(userDocRef, {
            videoResumeData: arrayUnion({
                reelID,
                reported: 0,
                videoResumeTitle: videoData.videoResumeTitle,
                videoResumeURL: videoData.videoResumeURL,
                tags: videoResumeData.tags,
                createdAt: new Date(),
                status: 'posted',
                reelURL: `https://reelcareer.co/reels/?r=${reelID}`
            })
        });

        const updatedUserData = {
            ...userDataSaved,
            videoResumeData: [
                ...(userDataSaved.videoResumeData || []),
                { reelID,videoResumeTitle: videoData.videoResumeTitle,
                     videoResumeURL: videoData.videoResumeURL, 
                    tags: videoResumeData.tags, isPublic: true,
                     createdAt: new Date(), status: 'posted',
                      reelURL: `https://reelcareer.co/reels/?r=${reelID}` }
            ]
        };

       let  userData = setUserData(updatedUserData);
        localStorage.setItem('userData', userData);

        const uploadContainer = document.getElementById("reel-upload-container");
        if (uploadContainer) {
           // uploadContainer.remove();  // Remove the upload container
        }


        showToast("Your Resume Reel is live.", "success", 100000, `https://reelcareer.co/reels#${reelID}`, true, 'View Here');
    } catch (error) {
        console.error("Error updating metadata:", error);
    }
}



window.completeMetadataUpdate = completeMetadataUpdate;






// Function to extract hashtags and store them in an array
function extractHashtags(caption) {

    if (!caption) {
        console.error("Caption is undefined or null");
        return [];  // Avoid further errors
    }
    const stopWords = new Set(["a", "an", "the", "and", "or", "but", "if", "then", "else", "of", "to", "in", "on", "with", "by", "for", "at", "from", "into", "over", "after", "before", "under", "about",
         "above", "below", "is", "was", "were", "be", "has", "had", "do", "does", "did", "not",
          "this", "that", "these", "those", "it", "its", "my", "your", "our", "their", "his",
           "her", "him", "he", "she", "they", "we", "you", "i"]);


           console.log("Upload extractHashtags:", caption);

    // Extract words that start with '#' or treat entire caption if no hashtags
    const words = caption.match(/#\w+|\b\w+\b/g) || [];
    console.log("words extractHashtags:", words);

    // Filter out stop words, remove hashtags, and limit to 15 unique tags
    const filteredTags = words
        .map(word => word.replace(/^#/, '').toLowerCase()) // Remove '#' and convert to lowercase
        .filter(word => word && !stopWords.has(word)) // Filter out stop words
        .slice(0, 15); // Limit to 15 words

    if (filteredTags.length === 0) {
        showToast("No valid tags found, using processed keywords as tags.");
    }

    return Array.from(new Set(filteredTags));  // Ensure tags are unique
}



async function postReelFunction(videoResumeTitle, videoResumeCaptions, uploadedFile, videoDuration) {
    document.getElementById("uploadArea").classList.add("hidden");
    document.getElementById("reels-more-options-area").classList.remove("hidden");
    let videoResumeURL = '';

    const userDataSaved = getUserData() || {};
    const userID = auth.currentUser?.uid || userDataSaved.userID;

    if (!userID) {
        showToast('No User Info');
        return;
    }
    console.log("words videoResumeCaptions:", videoResumeCaptions);

    const tags = extractHashtags(videoResumeCaptions);
    if (tags.length < 2) {
        showToast("Please add at least two hashtags.");
        return;
    }

    try {
         videoData = {
            duration: videoDuration,
            name: uploadedFile.name || `${userID}-${new Date().toISOString()}-reel.mp4`,
            videoResumeTitle: videoResumeTitle,
            videoResumeCaptions: videoResumeCaptions,
            videoDuration: videoDuration,
            tags: tags,
            userID: userID,
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


   
}

window.postReelFunction = postReelFunction;






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
        const title = document.querySelector(".reel-video-title").value.trim();
        await postReelFunction(title, description, URL.createObjectURL(uploadedFile), videoDuration);
      } catch (error) {
        console.error("Upload error:", error);
        showToast("Error uploading the video. Please try again.");
      }
    });
  }
  window.initializeVideoUploadHandlers = initializeVideoUploadHandlers;

  // Call this function once the popup is created or relevant DOM is ready
  





  

