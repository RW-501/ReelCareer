
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











import {
 
createVideoUploadPopup,
handleUserAuthentication,
} from 'https://reelcareer.co/scripts/js/video_js/createVideoUploadPopup.js';




let DELAY = 500;

function handleComments(docId, commentsBtn) {
    const inputContainer = document.getElementById(`comment-section-${docId}`);
  
    // Check if the comments container is hidden
    if (inputContainer.classList.contains("hidden")) {
      fetchComments(docId);
    }
  
    // Delay the toggle by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      inputContainer.classList.toggle("hidden");
    }, DELAY); // 2 seconds delay
  }
  window.handleComments = handleComments;
  
  function renderTags(tags, videoTags) {
    videoTags.innerHTML = ""; // Clear previous tags
    // Check if tags is defined and is an array
    if (!tags || tags.length === 0) {
      tags = videoTags;
    }
    if (Array.isArray(tags) && tags.length > 0) {
      tags.forEach((tag) => {
        // Create a button element for each tag
        const button = document.createElement("button");
        button.className = "btn btn-secondary m-1 tags"; // Bootstrap button styling
        button.textContent = tag;
        // Add a click event to redirect to job-listings with the selected tag
        button.onclick = () => {
          showToast(`Tag ${tag} was clicked`);
        };
        // Append the button to the jobTags container
        videoTags.appendChild(button);
      });
    } else {
      // Optionally, display a message if no tags are available
      const noTagsMessage = document.createElement("span");
      noTagsMessage.textContent = "No tags available.";
      noTagsMessage.className = "text-muted"; // Optional styling
      videoTags.appendChild(noTagsMessage);
    }
  }
  window.renderTags = renderTags;
  
  // Function to handle Play/Pause with overlay
  function togglePlay(
    video,
    controlsTop,
    controlsPlay,
    controlsBottom,
    videoCard
  ) {
    // Add a 2-second timeout before playing/pausing the video and toggling animations
    setTimeout(() => {
      if (video.paused) {
        video.play();
        // Animate elements out
        controlsTop.classList.add("slide-up");
        controlsBottom.classList.add("slide-down");
        controlsPlay.classList.add("fade-out");
      } else {
        video.pause();
        // Animate elements back in
        controlsTop.classList.remove("slide-up");
        controlsBottom.classList.remove("slide-down");
        controlsPlay.classList.remove("fade-out");
      }
    }, DELAY); // 2 seconds delay
  }
  window.togglePlay = togglePlay;
  
  // Listener for when the video ends
  function addVideoEndListener(
    video,
    controlsTop,
    controlsPlay,
    controlsBottom,
    videoCard,
    docId
  ) {
    let totalWatchTime = 0;  // Track total watch time
    let sessionStartTime = null;  // Record when the video starts playing
  
    function startTracking() {
      sessionStartTime = new Date().getTime();  // Store the start time in milliseconds
    }
  
    function stopTracking() {
      if (sessionStartTime) {
        const elapsed = (new Date().getTime() - sessionStartTime) / 1000;  // Calculate elapsed time in seconds
        totalWatchTime += elapsed;  // Add to total watch time
        sessionStartTime = null;  // Reset session start

        updateUserVideoWatchTime(totalWatchTime / 2);

      }
    }
  
    video.addEventListener("play", () => {
      startTracking();
    });
  
    video.addEventListener("pause",  async () => {
      stopTracking();

            // Bring elements back when video stops
            controlsTop.classList.remove("slide-up");
            controlsBottom.classList.remove("slide-down");
            controlsPlay.classList.remove("fade-out");

      const videoRef = doc(db, "VideoResumes", docId);
  
      try {
        await updateDoc(videoRef, {
          watchTime: increment(Math.round(totalWatchTime))  // Use whole seconds for Firestore increment
        });
        totalWatchTime = 0;  // Add to total watch time
        sessionStartTime = null; 


        // Update UI instantly (if needed)
      //  console.log(`Total watch time: ${Math.round(totalWatchTime)} seconds`);
  
      } catch (error) {
        console.error("Error updating watch time: ", error);
      }
      
    });
  
    video.addEventListener("ended", async () => {
      stopTracking();  // Ensure we capture the final segment of watch time
  
      // Bring elements back when video stops
      controlsTop.classList.remove("slide-up");
      controlsBottom.classList.remove("slide-down");
      controlsPlay.classList.remove("fade-out");

      const videoRef = doc(db, "VideoResumes", docId);
  
      try {
        await updateDoc(videoRef, {
          watchTime: increment(Math.round(totalWatchTime))  // Use whole seconds for Firestore increment
        });
        totalWatchTime = 0;  // Add to total watch time
        sessionStartTime = null; 

        // Update UI instantly (if needed)
       // console.log(`Total watch time: ${Math.round(totalWatchTime)} seconds`);
  
      } catch (error) {
        console.error("Error updating watch time: ", error);
      }
    });


    function updateUserVideoWatchTime(totalWatchTime){
// Retrieve user data
let userData = getUserData() || {};  // Default to an empty object if no data is found

// Increment the videoWatchCount, initializing it if not already set
userData.videoWatchTime = (userData.videoWatchTime || 0) + totalWatchTime;
console.log('totalWatchTime:', totalWatchTime);

// Prepare updated user data object
const updatedVideoWatchTimeUserData = {
  videoWatchTime: userData.videoWatchTime
};
// Optionally, log updated user data
console.log('updatedVideoWatchTimeUserData user data:', updatedVideoWatchTimeUserData);
// Save updated user data
userData = setUserData(updatedVideoWatchTimeUserData); // Assuming this function merges and stores data

// Store userData back using custom setUserData function, no need for JSON.stringify
localStorage.setItem('userData', userData);



    }




    video.addEventListener("click", async () => {
        if (video.paused) {
//          video.play();
        } else {
          video.pause();
        }
      });
    



  }
  
  window.addVideoEndListener = addVideoEndListener;

  // Function to toggle Mute/Unmute
  function toggleMute(video, muteButton) {
    // Toggle mute state
    video.muted = !video.muted;
  
    // Save the mute preference to localStorage
    localStorage.setItem("videoMutePreference", video.muted);
  
    // Update the button icon
    muteButton.innerHTML = video.muted
      ? '<i class="fa fa-volume-up"></i>'
      : '<i class="fa fa-volume-mute"></i>';
  }
  window.toggleMute = toggleMute;
  
  // Function to handle Fullscreen
  function toggleFullscreen(video, fullscreenButton) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }
  window.toggleFullscreen = toggleFullscreen;
  
  function handleJoinUsBtn(docId) {
    // Add further functionality as needed
  
    window.location = "https://reelcareer.co/views/auth";
  }
  window.handleJoinUsBtn = handleJoinUsBtn;
  
  async function addToShortlist(videoId, currentUid) {
    const user = auth.currentUser;

    if(!user){
      openPopupLogin();
      return;
    }
    const userID = auth.currentUser.uid;  

    try {
      // Add video to user's shortlist
      const shortlistRef = collection(db, "Users", userID, "Shortlists");
      await addDoc(shortlistRef, {
        userID: currentUid,
        videoID: videoId,
        timestamp: new Date()
      });
  
      showToast("Video added to your shortlist.");
  
      // Update shortlist count in VideoResumes collection
      const videoRef = doc(db, "VideoResumes", videoId);
      await updateDoc(videoRef, {
        shortList: increment(1)
      });
  
    } catch (error) {
      console.error("Error adding to shortlist: ", error);
      showToast("Error adding video to shortlist.");
    }
  }
  
  window.addToShortlist = addToShortlist;
  





  function calculateVideoRating(videoCard) {
    // Extracting and parsing relevant data attributes from the video card element
    const views = parseInt(videoCard.dataset.views, 10) || 0; // Total number of views, default to 0 if not provided
    const uniqueViews = parseInt(videoCard.dataset.uniqueViews, 10) || 0; // Unique views count, default to 0
    const repeatViews = parseInt(videoCard.dataset.repeatViews, 10) || 0; // Repeat views count, default to 0
    const watchTime = parseInt(videoCard.dataset.watchTime, 10) || 0; // Total watch time in seconds, default to 0
    const engagements = parseInt(videoCard.dataset.engagements, 10) || 0; // Total engagements (likes, comments, etc.), default to 0
    const duration = parseInt(videoCard.dataset.duration, 10) || 0; // Video duration in seconds, default to 0
    const likes = parseInt(videoCard.dataset.likes, 10) || 0; // Total number of likes, default to 0
    const reach = parseInt(videoCard.dataset.reach, 10) || 0; // Total reach (number of unique viewers), default to 0
  
    // Handle timestamps for time decay calculations
    const createdAt = new Date(videoCard.dataset.createdAt).getTime(); // Convert 'createdAt' date to milliseconds
    const timestamp = videoCard.dataset.timestamp ? 
      new Date(parseInt(videoCard.dataset.timestamp, 10)).getTime() : Date.now(); // Convert 'timestamp' to milliseconds, default to current time if not available
  
    // Calculate the number of days since the video was posted
    const timeSincePosted = (Date.now() - (createdAt || timestamp)) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  
    // Define the time decay factor based on how many days have passed since posting
    let decayFactor;
    if (timeSincePosted <= 7) {
      decayFactor = 1; // No decay for content posted within the first 7 days
    } else if (timeSincePosted <= 30) {
      decayFactor = 0.98 ** timeSincePosted; // Gradual decay for content between 8 and 30 days old
    } else {
      decayFactor = 0.95 ** timeSincePosted; // Faster decay for content older than 30 days
    }
  
    // Define weightings for different engagement metrics (customizable)
    const viewWeight = 0.2; // Weight assigned to total views
    const watchTimeWeight = 0.4; // Weight assigned to watch time
    const engagementWeight = 0.5; // Weight assigned to total engagements
    const reachWeight = 0.1; // Weight assigned to reach
    const viewDurationWeight = 0.35; // Weight assigned to view-to-duration ratio
    const repeatViewWeight = 0.25; // Weight assigned to repeat views
  
    // Calculate engagement and view scores
    const engagementScore = engagements + likes * 1.5; // Engagement score considers likes with a higher weight
    const viewScore = views + uniqueViews * 1.2; // View score gives additional weight to unique views
    console.log("viewScore:", viewScore);
    console.log("engagementScore:", engagementScore);

    // Calculate watch time ratio (portion of video watched)
    const watchTimeRatio = duration > 0 ? watchTime / duration : 0; // Avoid division by zero
    console.log("watchTimeRatio:", watchTimeRatio);

    // Calculate view-duration ratio: how long viewers stay per unique view
    const viewDurationRatio = uniqueViews > 0 ? (views * duration) / uniqueViews : 0; // Avoid division by zero
    console.log("viewDurationRatio:", viewDurationRatio);

    // Calculate repeat view score
    const repeatViewScore = repeatViews * repeatViewWeight; // Weight repeat views separately
    console.log("repeatViewScore:", repeatViewScore);

    // Combine all metrics into a base rating using the defined weights
    const baseRating = 
      (viewScore * viewWeight) + // Weighted view score
      (watchTimeRatio * watchTimeWeight * 100) + // Weighted watch time ratio
      (engagementScore * engagementWeight) + // Weighted engagement score
      (reach * reachWeight) + // Weighted reach
      (viewDurationRatio * viewDurationWeight) + // Weighted view-duration ratio
      repeatViewScore; // Add repeat view score
      console.log("baseRating:", baseRating);

    // Apply the time decay factor to the base rating
    const finalRating = baseRating * decayFactor;
  
    // Return the final rating, rounded to two decimal places
    return Math.round(finalRating * 100) / 100;
  }
  
  function updateViewCount(videoCountButton) {
    let viewCount = parseInt(videoCountButton.textContent.replace(/,/g, '')) || 0;
    viewCount++;

    // Apply animation class
    videoCountButton.classList.add('view-update-animation');

    // Wait for animation to complete before updating the number
    setTimeout(() => {
        videoCountButton.innerHTML = formatNumber(viewCount);
        videoCountButton.classList.remove('view-update-animation');
    }, 300); // Matches animation duration
}

// Function to format numbers
function formatNumber(num) {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return num.toLocaleString(); // Adds commas for numbers below 1K
    }
}


  // Function to increment view count
  async function incrementViewCount(docId, videoElement) {
    const videoRef = doc(db, "VideoResumes", docId);
    const viewsCollection = collection(db, `VideoResumes/${docId}/views`);
    

      // Check if the video was already counted
  if (videoElement.getAttribute('data-view-counted') === 'true') {
    console.log("View already counted for this session.");
    return;
  }

  const videoCountButton = document.getElementById(`video-count_${docId}`);


  // Update UI instantly
  updateViewCount(videoCountButton);
  

    try {

// Retrieve user data
let userData = getUserData() || {};  // Default to an empty object if no data is found

// Increment the videoWatchCount, initializing it if not already set
userData.videoWatchCount = (userData.videoWatchCount || 0) + 1;

// Prepare updated user data object
const updatedVideoWatchCountUserData = {
  videoWatchCount: userData.videoWatchCount
};

// Save updated user data
userData = setUserData(updatedVideoWatchCountUserData); // Assuming this function merges and stores data

// Store userData back using custom setUserData function, no need for JSON.stringify
localStorage.setItem('userData', userData);

// Optionally, log updated user data
console.log('updatedVideoWatchCountUserData data:', updatedVideoWatchCountUserData);



let userIP = sessionStorage.getItem("userIP");

if(!userIP){

      // Fetch the user's IP address
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
       userIP = data.ip;
  
      if (!userIP) {
        console.warn("Unable to retrieve IP address.");
        return;
      }
  

}


      // Check if this IP has already been recorded for this video
      const ipDocRef = doc(viewsCollection, userIP);
      const ipDocSnapshot = await getDoc(ipDocRef);
  

        const videoCard = document.getElementById(`video-${docId}`);
        const rating = calculateVideoRating(videoCard);
  console.log(`doc: `,docId,' updated Video Rating:', rating);
  

            // Increment view count in the main document
            await updateDoc(videoRef, {
              views: increment(1),
              rating: rating 
            });
  // Set attribute to prevent multiple counts in the same session
    videoElement.setAttribute('data-view-counted', 'true');



   // console.log("videoCard:", videoCard);

// Extract video data from data attributes
const videoData = {
  videoId: videoCard.dataset.videoId,                          // Unique video ID
  videoSrc: videoCard.dataset.videosrc,                        // Source URL of the video
  videoResumeTitle: videoCard.dataset.videoResumeTitle,        // Video title
  thumbnailURL: videoCard.dataset.thumbnailURL,                // Thumbnail image URL
  reelURL: videoCard.dataset.reelURL,                          // URL of the page containing the video
  searchableTitle: videoCard.dataset.searchableVideoResumeTitle, // Searchable title for the video resume
  categories: videoCard.dataset.reelCategories,                // Categories associated with the video
  duration: videoCard.dataset.duration,                // Categories associated with the video
  location: videoCard.dataset.location,                // Categories associated with the video
  rating: videoCard.dataset.rating,                // Categories associated with the video
  tags: videoCard.dataset.tags                                 // Tags associated with the video
};

console.log("videoData from card:", videoData);

const videoInterestEntry = {
  searchableTitle: videoData.searchableTitle || [],
  location: videoData.location || "",
  rating: videoData.rating || 0,
  duration: videoData.duration || 0,
  categories: videoData.categories || [],
  tags: videoData.tags || [],
  liked: false // Assuming this boolean is passed, set to true for testing
};

handleVideoInterestInput(videoInterestEntry);

    getUserVideoInterest();

  




// Create a watch history entry for the video
const videoWatchHistoryEntry = {
  videoId: videoData.videoId || "",
  title: videoData.videoResumeTitle || "",
  src: videoData.videoSrc || "",
  pageUrl: videoData.reelURL || "",
  thumbnail: videoData.thumbnailURL || "",
  watchTime: new Date()  // Timestamp to track when the video was watched
};

// Get existing watch history from userData or initialize it
let videoWatchHistory = userData.videoWatchHistory || [];
videoWatchHistory.push(videoWatchHistoryEntry);  // Add the new entry to the history

// Update userData with the new watch history
const updatedUserData = {
  videoWatchHistory: videoWatchHistory  // Update the video watch history
};

// Save updated user data
 userData = setUserData(updatedUserData);

 localStorage.setItem('userData', userData);
// Optional: Debug output for confirmation
console.log("Updated userData with videoWatchHistory:", videoWatchHistoryEntry);


if (ipDocSnapshot.exists()) {
  console.log("View already recorded for this IP.");
  await updateDoc(videoRef, {
    repeatViews: increment(1) // Firestore increment
  });
  return; // Prevent duplicate view increment
}





      // Record the unique view
      await setDoc(ipDocRef, {
        viewedAt: new Date()
      });
  
      // Increment view count in the main document
      await updateDoc(videoRef, {
        engagegments: increment(1), // Firestore increment
        uniqueViews: increment(1) // Firestore increment

      });
      
 
      console.log("View count incremented");
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
  }
  
  window.incrementViewCount = incrementViewCount;
  



  function updateLikes(likeButton) {
    let likesCount = parseInt(likeButton.textContent.replace(/,/g, '')) || 0;
    likesCount++;

    // Apply animation class
    likeButton.classList.add('like-update-animation');

    // Wait for animation to complete before updating the number
    setTimeout(() => {
        likeButton.innerHTML = `<i class="fa fa-thumbs-up"></i> ${formatNumber(likesCount)}`;
        likeButton.classList.remove('like-update-animation');
    }, 300); // Matches animation duration
}

  // Function to handle likes
  async function handleLike(docId, likeButton, videoElement) {
    const user = auth.currentUser;

    if(!user){
      openPopupLogin();
      return;
    }
    const userID = auth.currentUser.uid;
    
    const videoRef = doc(db, "VideoResumes", docId);
    const likesCollection = collection(db, `VideoResumes/${docId}/likes`); // Subcollection to track unique likes
  
    try {
      // Check if the user has already liked this video
      const userLikeRef = doc(likesCollection, userID);
      const userLikeSnapshot = await getDoc(userLikeRef);
      
      if (userLikeSnapshot.exists()) {
        showToast("You already liked this video.");
        return;
      }
      
      // Extract video data from data attributes
      const videoCard = document.getElementById(`video-${docId}`);

      console.log("videoCard:", videoCard);
  
  // Extract video data from data attributes
  const videoData = {
    videoId: videoCard.dataset.videoId,                          // Unique video ID
    videoSrc: videoCard.dataset.videosrc,                        // Source URL of the video
    videoResumeTitle: videoCard.dataset.videoResumeTitle,        // Video title
    thumbnailURL: videoCard.dataset.thumbnailURL,                // Thumbnail image URL
    reelURL: videoCard.dataset.reelURL,                          // URL of the page containing the video
    searchableTitle: videoCard.dataset.searchableVideoResumeTitle, // Searchable title for the video resume
    categories: videoCard.dataset.reelCategories,                // Categories associated with the video
    duration: videoCard.dataset.duration,                // Categories associated with the video
    location: videoCard.dataset.location,                // Categories associated with the video
    rating: videoCard.dataset.rating,                // Categories associated with the video
    tags: videoCard.dataset.tags                                 // Tags associated with the video
  };
  
  console.log("videoData:", videoData);
  
  const videoInterestEntry = {
    searchableTitle: videoData.searchableTitle || [],
    location: videoData.location || "",
    rating: videoData.rating || 0,
    duration: videoData.duration || 0,
    categories: videoData.categories || [],
    tags: videoData.tags || [],
    liked: true // Assuming this boolean is passed, set to true for testing
  };

handleVideoInterestInput(videoInterestEntry);
      // Add user ID to the likes subcollection to record the like
      await setDoc(userLikeRef, {
        likedAt: new Date()
      });
  
      // Increment like count in the main document
      await updateDoc(videoRef, {
        engagegments: increment(1), // Firestore increment
        likes: increment(1) // Firestore increment
      });
  
      // Update UI instantly

      updateLikes(likeButton);
    } catch (error) {
      console.error("Error updating like count: ", error);
    }
  }
  
  window.handleLike = handleLike;
  
  async function handleShareCount(docId, shareButton) {
    const videoRef = doc(db, "VideoResumes", docId);
  
    try {
      await updateDoc(videoRef, {
        engagegments: increment(1), // Firestore increment
        share: increment(1) // Firestore increment
      });
  
      // Update UI instantly
     
    } catch (error) {
      console.error("Error updating share count: ", error);
    }
  }
  window.handleShareCount = handleShareCount;
  
  // Function to format video duration to HH:MM:SS
  function formatDuration(duration) {
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor((duration / 60) % 60);
    const hours = Math.floor(duration / 3600);
  
    return [
      hours > 0 ? hours.toString().padStart(2, "0") : "00",
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0")
    ]
      .filter((part) => part !== "00") // Remove leading zeros if hours are zero
      .join(":");
  }
  window.formatDuration = formatDuration;
  
  // Native Share Function
  async function handleShare(docId, shareButton, videoID, videoResumeTitle, profilePicture) {
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      const file = new File([blob], 'profile-picture.png', { type: blob.type });
      
      navigator.share({
        title: "Check out this Reel on ReelCareer!",
        text: videoResumeTitle,
        url: `https://reelcareer.co/watch/?v=${videoID}`,
        files: [file]  // Including a file
      })
      .then(() => {
        showToast("Video shared successfully");
        handleShareCount(docId, shareButton);
      })
      .catch((error) => console.error("Error sharing video: ", error));
    } else {
        showToast("Sharing images is not supported on this device.");
    }
  }
  
  window.handleShare = handleShare;
  
  // Add Comment Functionality
  async function addComment(docId, parentCommentId = null) {
    const inputId = parentCommentId
      ? `reply-input-${parentCommentId}`
      : `comment-input-${docId}`;
    const commentInput = document.getElementById(inputId);
    const commentText = commentInput.value.trim();
    const userDataSaved = getUserData() || [];
    const user = auth.currentUser;

    if(!user){
      openPopupLogin();
      return;
    }
    const userID = auth.currentUser.uid;  
    if (commentText) {
      const commentsRef = collection(db, "VideoResumes", docId, "comments");
  
      try {
        await addDoc(commentsRef, {
          text: commentText,
          commenterID: userID || userDataSaved.userId,
          commenterName: userDataSaved.displayName || "User",
          commenterProfileURL: `https://reelcareer.co/u/?u=${userID}`,
          commenterProfilePicture:
            userDataSaved.profilePicture ||
            "https://reelcareer.co/images/sq_logo_n_BG_sm.png'",
          parentCommentId: parentCommentId || null, // Track parent comment
          timestamp: serverTimestamp()
        });
        const videoRef = doc(db, "VideoResumes", docId);
  
        try {
          await updateDoc(videoRef, {
            engagegments: increment(1), // Firestore increment
            comments: increment(1) // Firestore increment
          });
      
          // Update UI instantly
         
        } catch (error) {
          console.error("Error updating comment count: ", error);
        }
        // Clear input and refresh comments
        commentInput.value = "";
        fetchComments(docId);
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  }
  
  window.addComment = addComment;
  
  // Fetch and Display Comments
  const loadedComments = new Set(); // Keeps track of loaded docIds
  
  async function fetchComments(docId) {
    // Check if comments for this video have already been loaded
    if (loadedComments.has(docId)) {
      console.log(`Comments for ${docId} already loaded`);
      return; // Stop fetching to prevent duplication
    }
  
    loadedComments.add(docId); // Mark this docId as loaded
  
    const commentsRef = collection(db, "VideoResumes", docId, "comments");
    const querySnap = await getDocs(
      query(commentsRef, orderBy("timestamp", "asc"))
    );
  
    const commentsContainer = document.getElementById(
      `comments-container-${docId}`
    );
    commentsContainer.innerHTML = ""; // Clear previous comments (if any)
  
    const commentsMap = {}; // For organizing comments by parent
  
    // Group comments by parentCommentId
    querySnap.forEach((doc) => {
      const comment = { id: doc.id, ...doc.data() };
      if (comment.parentCommentId) {
        commentsMap[comment.parentCommentId] =
          commentsMap[comment.parentCommentId] || [];
        commentsMap[comment.parentCommentId].push(comment);
      } else {
        commentsMap[comment.id] = commentsMap[comment.id] || [];
        commentsMap[comment.id].unshift(comment); // Main comment
      }
    });
  
    // Render comments
    Object.values(commentsMap).forEach((group) => {
      group.forEach((comment) => {
        if (!comment.parentCommentId) {
          renderComment(comment, docId, commentsMap, commentsContainer);
        }
      });
    });
  }
  window.fetchComments = fetchComments;
  
  /*
    loadedComments.delete(docId); // To reload comments for a single video
    loadedComments.clear();       // To reload comments for all videos
    */
  
  const renderedComments = new Set(); // To keep track of rendered comments
  
  function renderComment(comment, docId, commentsMap, container) {
    // Avoid rendering the same comment multiple times
    if (renderedComments.has(comment.id)) return;
    renderedComments.add(comment.id);
  
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment-item");
    commentElement.innerHTML = `
            <div class="comment-main">
    
                          <div class="reply-commenter-area">
                <img src="${
                  comment.commenterProfilePicture ||
                  `https://reelcareer.co/images/sq_logo_n_BG_sm.png`
                }" alt="${
      comment.commenterName
    }" class="comment-avatar lazy-image">
                <a href="${comment.commenterProfileURL}" class="comment-name">${
      comment.commenterName
    }</a>
                </div>
    
                <div class="comment-content">
                <div class="reply-text-area">${comment.text}</div>
    
                <div class="reply-btn-area">
                    <button class="reply-btn" onclick="showReplyInput('${
                      comment.id
                    }', '${docId}','${comment.commenterName}')">
                        <i class="fa fa-reply"></i> Reply
                    </button>
                    </div>
    
                    <div id="replies-container-${comment.id}"></div>
                </div>
            </div>
    
    <hr>
    <div  id="reply-input-area-${comment.id}" class="reply-input-area hidden">
              <div id="reply-input-container-${
                comment.id
              }" class="reply-input-container" >
                <small id="reply-to-container-${
                  comment.id
                }" class="reply-to-container">Reply to: ${
      comment.commenterName
    }</small> 
            </div>
    
                <div class="reply-send-area">
                <input type="text" id="reply-input-${
                  comment.id
                }" placeholder="Write a reply..." />
                <button onclick="addComment('${docId}', '${
      comment.id
    }')" aria-label="Post Reply">
                    <i class="fa fa-paper-plane"></i>
                </button>
                </div>
    
            </div>
        `;
  
    container.appendChild(commentElement);
  
    // Render replies (if any)
    if (commentsMap[comment.id]) {
      const repliesContainer = document.getElementById(
        `replies-container-${comment.id}`
      );
      commentsMap[comment.id].forEach((reply) => {
        renderComment(reply, docId, commentsMap, repliesContainer);
      });
    }
  }
  window.renderComment = renderComment;
  
  function showReplyInput(commentId, docID, commenterName) {
    const replyInputArea = document.getElementById(
      `reply-input-area-${commentId}`
    );
  
    // Delay the toggling of the reply input area by 1 second
    setTimeout(() => {
      replyInputArea.classList.remove("hidden");
    }, DELAY); // 1 second delay
  }
  
  window.showReplyInput = showReplyInput;
  
  async function submitVideoReport() {
    const selectedReasons = [];

    const user = auth.currentUser;
    
    if(!user){
      openPopupLogin();
      return;
    }
    const userID = auth.currentUser.uid;

    document
      .querySelectorAll('#reportJobForm input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        selectedReasons.push(checkbox.value);
      });
  
    const userDataSaved = getUserData() || [];
    const message = document.getElementById("reportMessage").value;
    const statusMessage = document.getElementById("reportStatusMessage");
    const closeButton = document.getElementById("closeReportModalButton");
  let videoId =  document.getElementById("currentVideoId").innerText;
// Assume docId is known
const videoCard = document.getElementById(`videoCard_${videoId}`);


// Declare variables for dataset values
let docIdValue = '';
let videoResumeTitle = '';
let createdByID = '';
let displayName = '';

// Check if element exists
if (videoCard) {
    docIdValue = videoCard.dataset.videoId;
    videoResumeTitle = videoCard.dataset.videoResumeTitle;
    createdByID = videoCard.dataset.createdByID;
    displayName = videoCard.dataset.displayName;

    console.log('Doc ID:', docIdValue);
    console.log('Video Resume Title:', videoResumeTitle);
    console.log('Created By ID:', createdByID);
    console.log('Display Name:', displayName);
} else {
    console.error(`Element with id videoCard_${videoId} not found.`);
}






    // Clear any previous messages
    statusMessage.innerHTML = "";
    statusMessage.className = "";
  
    if (selectedReasons.length === 0 && !message) {
      statusMessage.innerHTML =
        "Please select a reason or enter a message before submitting.";
      statusMessage.className = "text-danger";
      return;
    }
    // Report Data to Firebase
    const reportData = {
      videoId: videoId,
      videoTitle: videoResumeTitle,
      videoCreaterID: createdByID,
      videoCreaterDisplayName: displayName,
      videoURL: `https://reelcareer.co/watch/?v=${videoId}`,
      reasons: selectedReasons,
      message: message,
      URL: window.location.href,
      submittedAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
      submittedBy: "user",
      submittedByUserID: userID,
      submittedByUserName: userDataSaved.displayName || "User",
      type: "User Video Report",
      pageTitle: document.title,
      status: "submitted"
    };
  
    // Create content for the follow-up message
    const reasonsContent =
      selectedReasons.length > 0 ? `Reasons: ${selectedReasons.join(", ")}` : "";
      const followUpMessageContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p>Hello <strong>${userDataSaved.displayName}</strong>,</p>
          <p>Thank you for reporting the issue with the Reel <em>${reportData.videoTitle}</em>. Our support team will review your report and follow up with you shortly.</p>
          <p><strong>Report Reasons:</strong> ${reasonsContent}</p>
          <p>We appreciate your help in keeping ReelCareer a safe and professional platform.</p>
          <p>Best regards,</p>
          <p><strong>The ReelCareer Team</strong></p>
      </div>
  `;
  
  const reportedUserMessageContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p>Hello <strong>${reportData.videoCreaterDisplayName}</strong>,</p>
          <p>Your video titled <em>${reportData.videoTitle}</em> (ID: ${videoId}) has been reported by another user. Please review the content to ensure it complies with ReelCareer’s terms and guidelines.</p>
          <p><strong>Reported Reasons:</strong> ${reasonsContent}</p>
          <p>Our support team will review the report and take appropriate action if necessary.</p>
          <p>Thank you for your cooperation.</p>
          <p>Best regards,</p>
          <p><strong>The ReelCareer Team</strong></p>
      </div>
  `;
  
    // Follow-up Message Data
    const followUpMessage = {
      recipientID: userID,
      recipientName: userDataSaved.displayName || "User",
      recipientProfileURL: `https://reelcareer.co/u/?u=${userID}`,
      recipientProfilePicture: "",
      recipientRead: false,
      participants: ["000000", userID],
      senderID: "000000", // Support account ID
      senderName: "Support",
      senderProfilePicture: "https://reelcareer.co/Images/logo.png",
      senderProfileURL: "https://reelcareer.co/support",
      group: "main",
      messageType: "support",
      contactLocation: "platform",
      conversationID: `conversation_${videoId}_${userID}`,
      content: followUpMessageContent.trim(),
      connectedBool: true,
      createdAt: new Date(),
      timestamp: serverTimestamp(),
      contentType: "notification",
      status: "unread",
      attachments: ""
    };
  
    const reportedUserMessage = {
      recipientID: videoCreaterID,
      recipientName: videoCreaterDisplayName || "User",
      recipientProfileURL: `https://reelcareer.co/u/?u=${videoCreaterID}`,
      recipientProfilePicture: "",
      recipientRead: false,
      participants: ["000000", videoCreaterID],
      senderID: "000000", // Support account ID
      senderName: "Support",
      senderProfilePicture: "https://reelcareer.co/Images/logo.png",
      senderProfileURL: "https://reelcareer.co/support",
      group: "main",
      messageType: "support",
      contactLocation: "platform",
      conversationID: `conversation_${videoId}_${videoCreaterID}`,
      content: reportedUserMessageContent.trim(),
      connectedBool: true,
      createdAt: new Date(),
      timestamp: serverTimestamp(),
      contentType: "notification",
      status: "unread",
      attachments: ""
    };






    try {
      // Submit the report
      const reportRef = await addDoc(
        collection(db, "SupportTickets"),
        reportData
      );
      showToast(`Report submitted with ID: ${reportRef.id}`);
  

      // Send the Reported-User message
      await addDoc(collection(db, "Messages"), reportedUserMessage)

      // Send the follow-up message
      await addDoc(collection(db, "Messages"), followUpMessage);
      console.log("Follow-up message sent successfully!");
  
      // Show success message to user
      statusMessage.innerHTML =
        "Your report has been submitted. Thank you for your feedback.";
      statusMessage.className = "text-success";
      closeButton.style.display = "block";
  
      // Disable submit button after success
      document.querySelector(
        '#reportJobForm button[type="button"]'
      ).disabled = true;

      const videoRef = doc(db, "VideoResumes", videoId);
  
      try {
        await updateDoc(videoRef, {
          reported: increment(1) // Firestore increment
        });
    
        // Update UI instantly
       
      } catch (error) {
        console.error("Error updating reported count: ", error);
      }

    } catch (error) {
      console.error("Error submitting report or follow-up message:", error);
  
      statusMessage.innerHTML =
        "There was an error submitting your report. Please try again later.";
      statusMessage.className = "text-danger";
    } finally {
    }
  }
  window.submitVideoReport = submitVideoReport;
  
  function openReportModal(docId, videoData) {
    document.getElementById("currentVideoId").innerText = docId;
    document.getElementById("reportJobModal").style.display = "block"; // No need for !important
  }
  
  // Close the report job modal
  function closeReportModal() {
    document.getElementById("reportJobModal").style.display = "none"; // No need for !important
  }
  
  // Attach the modal open/close functions to the global window object
  window.openReportModal = openReportModal;
  window.closeReportModal = closeReportModal;
  
  // Get elements for modal interactions
  const closeModal = document.querySelector(".close");
  const cancelBtn = document.getElementById("closeReportModalButton");
  const modal = document.getElementById("applicationModal");
  
  // Close modal on clicking the close button (X)
  if (closeModal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none"; // No need for !important
    });
  }
  
  // Close modal on clicking the cancel button
  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      modal.style.display = "none"; // No need for !important
    });
  }







  
  async function handleSendGift(createdByID, displayName, videoTitle, videoID, userId) {
    const popupHtml = `
      <div class="gift-popup-overlay" 
           data-created-by-id="${createdByID}" 
           data-display-name="${displayName}" 
           data-video-title="${videoTitle}" 
           data-video-id="${videoID}" 
           data-user-id="${userId}">
        <div class="gift-popup">
          <h2>Send a Gift to ${displayName}</h2>
          <p>Support this video: <strong>${videoTitle}</strong></p>
          <div id="gift_choices">
            <button onclick="selectGift('Coffee', 5)">☕ Coffee - $5</button>
            <button onclick="selectGift('Lunch', 15)">🍴 Lunch - $15</button>
            <button onclick="selectGift('Custom', 0)">💰 Custom Amount</button>
          </div>
          <div id="custom-amount-area" style="display: none;">
            <label for="customAmount">Enter Custom Amount ($):</label>
            <input type="text" id="customAmount" placeholder="Minimum $5">
          </div>
          <div id="payment-area" style="display: none;">
            <p id="payment-info"></p>
            <div id="paypal-button-container"></div>
          </div>
          <button id="back-button" style="display: none;" onclick="giftPopupBackBtn()">Back</button>
          <button onclick="closeGiftPopup()">Close</button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHtml);
  }
  
  function closeGiftPopup() {
    const popup = document.querySelector('.gift-popup-overlay');
    if (popup) {
      popup.remove();
    }
  }
  
  window.handleSendGift = handleSendGift;
  window.closeGiftPopup = closeGiftPopup;
  
 
function giftPopupBackBtn(){
  const gift_choices = document.getElementById('gift_choices');
  const custom_amount_area = document.getElementById('custom-amount-area');
  const payment_area = document.getElementById('payment-area');
  const back_button = document.getElementById('back-button');

  if(custom_amount_area.style.display = "block"){
    gift_choices.style.display = "none";
    custom_amount_area.style.display = "none";
    payment_area.style.display = "none";
    gift_choices.style.display = "block";
    document.getElementById('customAmount').value = '';
    back_button.style.display = "none";


  }else
  if(payment_area.style.display = "block"){
    custom_amount_area.style.display = "none";
    payment_area.style.display = "none";
    gift_choices.style.display = "block";
    document.getElementById('customAmount').value = '';
    back_button.style.display = "none";

  }else{
    back_button.style.display = "none";
    payment_area.style.display = "none";
    gift_choices.style.display = "block";

  }

}
window.giftPopupBackBtn = giftPopupBackBtn;

async function selectGift(giftType, price) {




    
  const back_button = document.getElementById('back-button');
  back_button.style.display = "block";

  let paypalButtonContainer = document.getElementById('paypal-button-container');
  paypalButtonContainer.innerHTML = '';
  // Get the custom amount entered by the user
  let customAmount = document.getElementById('customAmount').value.trim();

  // Remove any non-numeric characters (e.g., '$', ',') and convert to a valid number
  customAmount = customAmount.replace(/[^\d.-]/g, '');

  // Convert to a number (will be NaN if invalid input is entered)
  customAmount = parseFloat(customAmount);

  const gift_choices = document.getElementById('gift_choices');
  const custom_amount_area = document.getElementById('custom-amount-area');
  const payment_area = document.getElementById('payment-area');
  const payment_info = document.getElementById('payment-info');

if(giftType == "custom" && !customAmount > 0){
  custom_amount_area.style.display = "block";
  gift_choices.style.display = "none";

  return;
}else{
  custom_amount_area.style.display = "none";
/// procecced
}


// If the custom amount is invalid or empty, use the selected price
const amountToPay = isNaN(customAmount) || customAmount <= 0 ? price : customAmount;

// Calculate the service fee (10%) and the amount the user will receive
const serviceFee = amountToPay * 0.10;
const amountToReceive = amountToPay - serviceFee;

if (amountToPay < 5 || amountToPay == '') {
  payment_info.innerHTML = ` 
    <p><strong>Note:</strong> There is a minimum contribution of $5.00.</p>
    Please choose a gift amount of at least $5.00 to proceed. 
    <br>To continue, kindly adjust your contribution and try again.
  `;
  gift_choices.style.display = "none";
  payment_area.style.display = "block";

  return;
}

payment_info.innerHTML = `
  You selected the ${giftType} gift with an amount of $${amountToPay}. 
  A 10% service fee of $${serviceFee.toFixed(2)} will be deducted. 
  <p>The user will receive $${amountToReceive.toFixed(2)}.</p>
`;

gift_choices.style.display = "none";
payment_area.style.display = "block";

  showToast(`You selected the ${giftType} gift with an amount of $${amountToPay}`);

  // Initialize PayPal Button
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amountToPay.toFixed(2),
          }
        }]
      });
    },
    onApprove: async function(data, actions) {
      const details = await actions.order.capture();

      // Handle successful payment (e.g., save to Firestore)
      await handlePaymentSuccess(giftType, amountToPay, details);

      // Optionally close the gift popup after payment is successful
      closeGiftPopup();
    },
    onError: function(err) {
      console.error('PayPal error:', err);
      showToast('There was an error with your payment. Please try again.');
    }
  }).render('#paypal-button-container'); // Render the PayPal button inside the container
}
window.selectGift = selectGift;

// Handle payment success (save to Firestore) 
async function handlePaymentSuccess(giftType, amountToPay, paymentDetails) {
  try {
    const giftsRefs = collection(db, `VideoResumes/${videoID}/Gifts-Transactions`);
    const transactionsRefs = collection(db, `A_Transactions`); // Corrected path

    if(!userId){
      userId = auth.currentUser.uid; // Logged-in user ID
    }

    const userIP = await getUserIP();

    let createdByID, displayName, videoTitle, videoID;

    const popup = document.querySelector('.gift-popup-overlay');
    if (popup) {
       createdByID = popup.dataset.createdById;
       displayName = popup.dataset.displayName;
       videoTitle = popup.dataset.videoTitle;
       videoID = popup.dataset.videoId;
           
      console.log(createdByID, displayName, videoTitle, videoID, userId); // Logs the retrieved values
    }
    
    if (!message) {
      showToast("Please enter a message before submitting.");
      return;
    }

    await addDoc(giftsRefs, {
      giftType,
      videoID,
      amount: amountToPay,
      paymentDetails,
      status: "completed",
      timestamp: serverTimestamp(),
    });


    await addDoc(transactionsRefs, {
      giftType,
      videoID,
      url: `https://reelcareer.co/watch/?v=${videoID}`,
      pageName,
      paymentDetails,
      withdraw_amount: 0,
      note: `Credit to Account: Video: ${videoTitle}, Video ID: ${videoID}`,
      transactionType: `credit`,
      status: "active",
      pageOwnerUserID: '',
      videoOwnerUserID: createdByID,
      userID: userId,
      userIP: userIP,
      amount: amountToPay,
      timestamp: serverTimestamp(),
    });

    showToast("Thank you for your contribution!");
  } catch (error) {
    console.error("Error processing payment:", error);
    showToast("There was an error processing your gift. Please try again.");
  }
}








  async function handleConnect(docId, connectButton, viewProfilePicture, viewUserID, viewDisplayName) {
    
    const user = auth.currentUser;

    if(!user){
      openPopupLogin();
      return;
    }
   
    showToast(`Attempting to connect with user ID: ${viewUserID}`);
  
    try {
      const userID = auth.currentUser.uid; // Logged-in user ID
      const userDataSaved = (await getUserData()) || {};
      const toName = viewDisplayName;
      const toProfilePicture = viewProfilePicture || "https://reelcareer.co/images/sq_logo_n_BG_tie_reel.png";
  
      // Validate inputs
      if (!userID || !viewUserID) {
        showToast("User information is incomplete.");
        return;
      }
  
      if (userID === viewUserID) {
        showToast("You cannot connect with yourself.");
        return;
      }
  
      // Construct document ID for the connection
      const connectionDocId = `${viewUserID}_${userID}`;
      const connectionRef = doc(db, "Connections", connectionDocId);
  
      // Check if the connection already exists
      const docSnapshot = await getDoc(connectionRef);
      if (docSnapshot.exists()) {
        showToast("You have already sent a connection request or are already connected.");
        connectButton.innerText = "Pending";
        return;
      }
  
      // Disable button to prevent multiple submissions
      connectButton.disabled = true;
      connectButton.innerText = "Sending...";
  
      // Prepare connection data
      const connectionData = {
        from: userID,
        to: viewUserID,
        toProfilePicture: toProfilePicture,
        toName: toName,
        toProfileURL: `https://reelcareer.co/u/?u=${viewUserID}`,
        toGroup: "Networking",
        acceptDate: "",
        participants: [userID, viewUserID],
        status: "pending",
        createdAt: new Date(),
        fromGroup: "Networking",
        fromNote: "",
        fromName: userDataSaved.displayName,
        fromProfilePicture: userDataSaved.profilePicture || "https://reelcareer.co/images/sq_logo_n_BG_tie_reel.png",
        fromProfileURL: `https://reelcareer.co/u/?u=${userID}`
      };
  
      // Save connection data
      await setDoc(connectionRef, connectionData);
  
      // Update button and notify user
      connectButton.innerText = "Pending";
      showToast("Connection request sent!");
    } catch (error) {
      console.error("Error sending connection request:", error);
      connectButton.innerText = "Connect";
      showToast("Error sending connection request. Please try again.");
    } finally {
      connectButton.disabled = false;
    }
  }
  window.handleConnect = handleConnect;


  // Utility Function: Update Button State
  function updateButtonState(button, text, disable = false) {
    button.innerText = text;
    button.disabled = disable;
  }
  
  function sendMessage(
    docId,
    profilePicture,
    reelUserID,
    recipientName,
    connectBtn
  ) {
    setRecipientName(recipientName);
  
  
    console.log("recipientName: ", recipientName);
    console.log("reelUserID: ", reelUserID);

    const user = auth.currentUser;

    if(!user){
      openPopupLogin();
      return;
    }
    const senderID = auth.currentUser.uid;



    console.log("senderID: ", senderID);
  
    if (senderID !== reelUserID) {
      document.getElementById("recipient-id").value = reelUserID; // Set recipient ID
  
      $("#sendMessageModal").modal("show"); // Show modal
    } else {
      showToast("You cannot send a message to yourself.");
    }
  }
  

  if (document
    .getElementById("message-content-editable")) {

  // Sync content from editable div to hidden textarea
  document
    .getElementById("message-content-editable")
    .addEventListener("keyup", function () {
      const content = this.innerText.trim();
      document.getElementById("message-content").value = content;
      toggleSendButton(content);
    });
  }

  // Show recipient's name
  function setRecipientName(recipientName) {
    document.getElementById(
      "recipient-name"
    ).textContent = `Message to: ${recipientName}`;
  }
  
  // Enable/disable Send button
  function toggleSendButton(content) {
    const attachment = document.getElementById("message-attachments").files[0];
    const sendButton = document.querySelector(
      '#sendMessageForm button[type="submit"]'
    );
    sendButton.disabled = !(content || attachment);
  }
  

  if (document
    .getElementById("sendMessageForm")) {

  // Your form submission logic
  document
    .getElementById("sendMessageForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
  
      // Gather recipient and sender data
  
      const recipientID = document.getElementById("recipient-id").value;
      const senderID = auth.currentUser.uid;
      const content = document.getElementById("message-content").value.trim();
      const connectBtn = document.getElementById("connect-btn");
  
      const userDataSaved = getUserData() || {};
      const connectedBool = connectBtn.innerText === "Connected";
  
      // Get the video card by its ID
      const currentVideoId = document.getElementById("currentVideoId").innerText;
      const videoCard = document.getElementById(`videoCard_${currentVideoId}`);
  
      // Access the dataset attributes
      const docId = videoCard.dataset.docId;
      const timestamp = videoCard.dataset.timestamp;
      const tags = videoCard.dataset.tags;
      const displayName = videoCard.dataset.displayName;
      const position = videoCard.dataset.position;
      const location = videoCard.dataset.location;
      const verified = videoCard.dataset.verified;
      const reelUserID = videoCard.dataset.reelUserId; // Note: 'reel-user-i-d' translates to 'reelUserId'
      const profilePicture = videoCard.dataset.profilePicture;
      const duration = videoCard.dataset.duration;
      const likes = videoCard.dataset.likes;
      const loves = videoCard.dataset.loves;
      const userID = videoCard.dataset.userId; // 'user-i-d' becomes 'userId'
      const views = videoCard.dataset.views;
      const videoResumeTitle = videoCard.dataset.videoResumeTitle;
  
      // Log the retrieved data
      console.log({
        videoResumeTitle,
        docId,
        timestamp,
        tags,
        displayName,
        position,
        location,
        verified,
        reelUserID,
        profilePicture,
        duration,
        likes,
        loves,
        userID,
        views
      });
  
      console.log("senderID: ", senderID);
  
      // Construct message data
      const messageData = {
        recipientID,
        recipientName,
        recipientProfilePicture,
        recipientProfileURL: `https://reelcareer.co/u?u=${recipientID}`,
        senderID: userDataSaved.userID || senderID,
        senderName: userDataSaved.displayName,
        senderProfilePicture: userDataSaved.profilePicture,
        senderProfileURL: `https://reelcareer.co/u?u=${userDataSaved.userID}`,
        group: "main",
        messageType: "contact",
        contactLocation: "video reel",
        participants: [userDataSaved.userID || senderID, recipientID],
        conversationID: recipientID,
        content,
        connectedBool,
        createdAt: new Date(),
        timestamp: serverTimestamp(),
        contentType: "text",
        status: "unread",
        attachments: "",
        attachmentUrl,
        isDeleted: false
      };
  
      try {
        const messagesCollection = collection(db, "Messages");
        await addDoc(messagesCollection, messageData);
  
        showToast("Message sent successfully!");
        $("#sendMessageModal").modal("hide");
        document.getElementById("message-content").value = "";
      } catch (error) {
        console.error("Error sending message:", error);
        showToast("Failed to send message. Please try again.");
      }
    });
  
  }








    export { 
        createVideoUploadPopup,
        handleUserAuthentication,
        handleComments,
        renderTags,
        togglePlay,
        addVideoEndListener,
        toggleMute,
        toggleFullscreen,
        handleJoinUsBtn,
        addToShortlist,
        incrementViewCount,
        handleLike,
        handleShareCount,
        formatDuration,
        handleShare,
        addComment,
        fetchComments,
        renderComment,
        submitVideoReport,
        openReportModal,
        closeReportModal,
        handleConnect,
        updateButtonState,
        sendMessage,
        setRecipientName,
        toggleSendButton 
        
      };