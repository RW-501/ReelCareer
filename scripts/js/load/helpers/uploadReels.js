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
        let progressToastBar;

        if (progressBar) {
            progressBar.style.display = 'block';
        }else{        
             progressToastBar = showToast('Uploading video resume...', 'info', 0, null, false, null, 0);
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
        reelTitle: video.videoResumeTitle,
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
                { reelID, videoResumeURL: videoData.videoResumeURL, 
                    tags: videoResumeData.tags, isPublic: true,
                     createdAt: new Date(), status: 'posted',
                      reelURL: `https://reelcareer.co/reels/?r=${reelID}` }
            ]
        };

       let  userData = setUserData(updatedUserData);
        localStorage.setItem('userData', userData);

        const uploadContainer = document.getElementById("reel-upload-container");
        if (uploadContainer) {
            uploadContainer.remove();  // Remove the upload container
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
    let videoResumeURL = '';

    const userlocationData = JSON.parse(sessionStorage.getItem('userLocation')) || {};
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
  





  function createReelPopup() {

    const overlay = document.createElement("div");
    overlay.id = "reelsMoreOtionsArea";

    overlay.innerHTML = `
      <div class="video-upload-popup">
        <button class="close-button">&times;</button>
        <h3>Share Your Reel</h3>
        
        <!-- Upload Area -->
        <div class="upload-area" id="uploadArea">
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" id="uploadProgressBar">0%</div>
          </div>
          <input type="text" class="reel-video-title form-control" placeholder="Enter a title for your reel..." maxlength="100">
          <input type="file" class="reel-video-input" accept="video/*" hidden>
          <div class="reel-video-area">
            <button class="select-video-btn btn btn-secondary">Select Video</button>
            <video class="reel-video-preview" controls hidden></video>
          </div>
          <textarea class="reel-video-content form-control" placeholder="Write a description..."></textarea>
          <button class="reel-video-btn btn btn-primary">Post Video</button>
        </div>
  
        <!-- More Options Button -->
        <hr>
        <button id="reels-more-options-btn" class="btn btn-secondary">More Options</button>
        
        <!-- More Options Area -->
        <div id="reels-more-options-area" class="hidden">
          <button id="goBackBtn" class="btn btn-secondary">Go Back</button>
  
          <!-- Boosted Post Option -->
          <div class="reel-groups">
            <label for="isBoostedPost">
              Boosted Post <small id="boostedCostInfo">(Cost: 1 Boosted Credit)</small>
            </label>
            <input type="checkbox" id="isBoostedPost" aria-labelledby="boostedCostInfo" />
          </div>
  
          <!-- Sponsored Post Option -->
          <div class="reel-groups">
            <label for="isSponsoredPost">
              Sponsored Post <small id="sponsoredCostInfo">(Cost: $5)</small>
            </label>
            <input type="checkbox" id="isSponsoredPost" aria-labelledby="sponsoredCostInfo" />
          </div>
  
          <!-- Changeable Data Section -->
          <section id="reel-changeable-data">
            <!-- Public Checkbox -->
            <div class="reel-groups">
              <label for="isPublic">
                Public <small class="text-muted">(Check to make it public)</small>
              </label>
              <input type="checkbox" id="isPublic" aria-label="Make Reel Public" checked />
            </div>
  
            <!-- Captions Textarea -->
            <div class="reel-groups">
              <label for="videoResumeCaptions">Captions <small class="text-muted">(Optional subtitles for your video)</small></label>
              <textarea id="videoResumeCaptions" name="videoResumeCaptions" rows="3" aria-label="Captions" placeholder="Add captions..."></textarea>
            </div>
  
            <!-- Tags Section -->
            <div class="reel-groups">
              <label for="tagsSET-main">
                Tags <small class="text-muted">(Add a tag and press Enter)</small>
              </label>
              <div id="tagsContainerSET-main">
                <input type="text" id="tagsSET-main" class="form-control" aria-label="Tags Input" placeholder="(e.g., JavaScript, Management)">
              </div>
            </div>
  
            <!-- Status Dropdown -->
            <div class="reel-groups">
              <label for="status">Status <small class="text-muted">(Select the current state of your reel)</small></label>
              <select id="status" name="status" aria-label="Reel Status">
                <option value="posted">Posted</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
                <option value="review" disabled>Review</option>
              </select>
            </div>
  
            <!-- Location Input -->
            <div class="reel-groups">
              <label for="location">Location <small class="text-muted">(Where this reel is based)</small></label>
              <input type="text" id="location" name="location" aria-label="Location" placeholder="Enter location" />
            </div>
  
            <!-- Thumbnail Upload Section -->
            <div class="reel-groups">
              <label for="thumbnailUpload">Thumbnail <small class="text-muted">(Upload or link a thumbnail image)</small></label>
              <div id="thumbnailPreviewContainer" style="cursor: pointer;" aria-label="Thumbnail Preview">
                <img id="thumbnailPreview" src="https://reelcareer.co/images/sq_logo_n_BG_sm.png" alt="Thumbnail Preview" style="width: 150px; height: 150px; border: 1px solid #ccc;" />
              </div>
              <input type="file" id="thumbnailUpload" name="thumbnailUpload" accept="image/*" style="display: none;" aria-label="Upload Thumbnail" />
              <input type="hidden" id="thumbnailURL" name="thumbnailURL" />
            </div>
  
            <!-- Related URL Input -->
            <div class="reel-groups">
              <label for="relatedURL">Related URL <small class="text-muted">(Link to related content)</small></label>
              <input type="url" id="relatedURL" name="relatedURL" aria-label="Related URL" placeholder="Enter related URL" />
            </div>
  
            <!-- Ending Card Input -->
            <div id="endingCardArea" class="reel-groups">
              <label for="endingCard">Ending Card <small class="text-muted">(Final message or credit)</small></label>
              <input type="text" id="endingCard" name="endingCard" aria-label="Ending Card" placeholder="Enter ending card information" />
            </div>
  
            <!-- Related Reels List -->
            <div class="reel-groups">
              <label for="relatedReels">Related Reels <small class="text-muted">(List of associated reels)</small></label>
              <div id="relatedReelsListContainer">
                <div id="relatedReelsList" aria-label="Related Reels List"></div>
              </div>
            </div>
  
            <!-- Related Products Section -->
            <div id="relatedProductsArea" class="reel-groups">
              <label for="relatedProducts">Related Products <small class="text-muted">(Attach products linked to this reel)</small></label>
              <button id="addProductButton" type="button" class="btn btn-secondary" aria-label="Add Product">Add Product</button>
              <div id="productListContainer" aria-label="Product List"></div>
            </div>
  
            <!-- Categories Section -->
            <div class="reel-groups">
              <label for="tagsSET-reelCategories">
                Categories <small class="text-muted">(Add up to 3 Categories)</small>
              </label>
              <div id="categories-container"> 
                <button class="category-btn" data-category="Web Development">Web Development</button>
                <button class="category-btn" data-category="Graphic Design">Graphic Design</button>
                <button class="category-btn" data-category="Digital Marketing">Digital Marketing</button>
                <button class="category-btn" data-category="Public Speaking">Public Speaking</button>
                <button class="category-btn" data-category="Fitness Training">Fitness Training</button>
                <button class="category-btn" data-category="Financial Analysis">Financial Analysis</button>
                <button class="category-btn" data-category="Illustration">Illustration</button>
                <button class="category-btn" data-category="Video Editing">Video Editing</button>
                <button class="category-btn" data-category="Sports Coaching">Sports Coaching</button>
                <button class="category-btn" data-category="Photography">Photography</button>
                <button class="category-btn" data-category="Entertainment">Entertainment</button>
                <button class="category-btn" data-category="Sports">Sports</button>
                <button class="category-btn" data-category="Travel">Travel</button>
              </div>
              <div id="tagsContainerSET-reelCategories">
                <input type="text" id="tagsSET-reelCategories" class="form-control" aria-label="Category Tags" placeholder="(e.g., Design, Travel)">
              </div>
            </div>
  
            <!-- Resume Link or Upload -->
            <div class="reel-groups">
              <label for="reelResume">Resume <small class="text-muted">(Provide a link or upload your resume)</small></label>
              <input type="text" id="reelResume" name="reelResume" aria-label="Reel Resume" placeholder="Link or upload resume" />
            </div>
          </section>
  
          <!-- Notification & Comments -->
          <div class="reel-groups-bools">
            <label><input type="checkbox" id="notificationsBool" aria-label="Enable Notifications" /> Enable Notifications <small class="text-muted">(Receive updates about this reel)</small></label>
            <label><input type="checkbox" id="commentsBool" checked aria-label="Allow Comments" /> Allow Comments <small class="text-muted">(Enable viewers to comment)</small></label>
            <label><input type="checkbox" id="giftsBool" aria-label="Enable Gifts" /> Enable Gifts <small class="text-muted">(Allow people to send gifts)</small></label>
          </div>
        </div>
      </div>
    `;
    document.getElementById("reels-more-options-area").appendChild(overlay);

  
    document.getElementById("goBackBtn").addEventListener("click", function() {
        // Show upload area and hide more options area
        document.getElementById("uploadArea").classList.remove("hidden");
        document.getElementById("reels-more-options-area").classList.add("hidden");
      });
      
  
    document.querySelector(".select-video-btn").addEventListener("click", function() {
      document.querySelector(".reel-video-input").click();
    });
  }
  

window.createReelPopup = createReelPopup;



