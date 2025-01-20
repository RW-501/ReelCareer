
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
        console.log(`Total watch time: ${Math.round(totalWatchTime)} seconds`);
  
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
        console.log(`Total watch time: ${Math.round(totalWatchTime)} seconds`);
  
      } catch (error) {
        console.error("Error updating watch time: ", error);
      }
    });








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
      ? '<i class="fa fa-volume-mute"></i>'
      : '<i class="fa fa-volume-up"></i>';
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
  
  // Function to increment view count
  async function incrementViewCount(docId, videoElement) {
    const videoRef = doc(db, "VideoResumes", docId);
    const viewsCollection = collection(db, `VideoResumes/${docId}/views`);
    

      // Check if the video was already counted
  if (videoElement.getAttribute('data-view-counted') === 'true') {
    console.log("View already counted for this session.");
    return;
  }


    try {
      // Fetch the user's IP address
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const userIP = data.ip;
  
      if (!userIP) {
        console.warn("Unable to retrieve IP address.");
        return;
      }
  
      // Check if this IP has already been recorded for this video
      const ipDocRef = doc(viewsCollection, userIP);
      const ipDocSnapshot = await getDoc(ipDocRef);
  
            // Increment view count in the main document
            await updateDoc(videoRef, {
              views: increment(1) // Firestore increment
            });
  // Set attribute to prevent multiple counts in the same session
    videoElement.setAttribute('data-view-counted', 'true');

      if (ipDocSnapshot.exists()) {
        console.log("View already recorded for this IP.");
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
      
      const videoCountButton = document.getElementById(`video-count_${docId}`);


     // Update UI instantly
     let viewCount = parseInt(videoCountButton.textContent) || 0;
     viewCount++;
     videoCountButton.innerHTML = `${viewCount}`;

      console.log("View count incremented");
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
  }
  
  window.incrementViewCount = incrementViewCount;
  
  
  // Function to handle likes
  async function handleLike(docId, likeButton) {
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
      let likesCount = parseInt(likeButton.textContent) || 0;
      likesCount++;
      likeButton.innerHTML = `<i class="fa fa-thumbs-up"></i> ${likesCount}`;
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
        url: `https://reelcareer.co/reels/?r=${videoID}`,
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
      videoURL: `https://reelcareer.co/reels/?r=${videoId}`,
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
      url: `https://reelcareer.co/reels/?r=${videoID}`,
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
  
  // Sync content from editable div to hidden textarea
  document
    .getElementById("message-content-editable")
    .addEventListener("keyup", function () {
      const content = this.innerText.trim();
      document.getElementById("message-content").value = content;
      toggleSendButton(content);
    });
  
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
  








// Function to create a popup for video upload with dynamic styling
function createVideoUploadPopup() {
    // Inject styling if not already present
    if (!document.getElementById("videoUploadStyles")) {
        const uploadStyles = document.createElement("style");
        uploadStyles.id = "videoUploadStyles";
        uploadStyles.textContent = `
            .video-upload-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 5000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .video-upload-popup {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                max-width: 500px;
                width: 90%;
                position: relative;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                background: transparent;
                border: none;
                font-size: 24px;
                cursor: pointer;
                    color: red;
            }
                    #uploadProgressBar {
                    disply:none;
                    }
            .progress {
                height: 20px;
                margin-bottom: 15px;
            }
            .select-video-btn, .reel-video-btn {
                width: 100%;
                padding: 10px;
                margin-top: 10px;
            }
                .reel-video-title {
    font-size: 16px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

            .reel-video-content {
                margin-top: 15px;
                width: 100%;
                min-height: 80px;
            }
            .reel-video-preview {
                width: 100%;
                height: auto;
                margin-top: 10px;
            }








#reels-more-options-area {


            button {
              padding: 10px 20px;
              font-size: 16px;
          }
          
          .reel-groups {
              background-color: #dcdcdc85;
              border-radius: 8px;
              margin: .5rem;
              padding: 1rem;
              display: grid;
          
              
          }
          .reel-groups label {
              display: inline-block;
              margin-bottom: .5rem;
              color: #86bcda;
              font-family: sans-serif;
              font-size: 1rem;
              font-weight: 400;
          }
          
          
          
          #editReelForm {
          input[type="text"],
          input[type="checkbox"],
          input[type="text"],
           input[type="url"],
           select, 
            textarea {
              width: 100%;
              padding: 10px;
              margin: 10px 0;
              border: 1px solid #ddd;
              border-radius: 4px;
              background-color: #f1f3f5;
              color: #000;
              transition: border 0.3s ease;
          }
          
          }
          .reel-groups-bools {
              margin: 5% auto;
              display: flex;
              border: 1px solid #888;
              border-radius: 8px;
              align-content: stretch;
              justify-content: space-around;
              align-items: stretch;
              justify-items: stretch;
              grid-column-gap: 3rem;
              flex-direction: row;
              flex-wrap: wrap;
              padding: 1.5rem;
          }
          
          #editReelForm {
          
          /* Modern checkbox styling */
          input[type="checkbox"] {
              -webkit-appearance: none; /* Remove default checkbox */
              -moz-appearance: none;
              appearance: none;
              width: 1.5rem; /* Adjust size for modern look */
              height: 1.5rem;
              margin: 0 10px 0 0;
              border: 2px solid #ddd; /* Border for custom design */
              border-radius: 4px; /* Rounded corners */
              background-color: #f1f3f5;
              position: relative;
              cursor: pointer;
              transition: all 0.3s ease;
              color: #000;
          
          }
          
          input[type="checkbox"]:checked {
              background-color: #007bff; /* Active color */
              border-color: #007bff;
          }
          
          input[type="checkbox"]:checked::after {
              content: '';
              position: absolute;
              top: 4px; /* Adjust positioning of checkmark */
              left: 4px;
              width: 6px;
              height: 10px;
              border: solid white;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg); /* Create a checkmark */
          }
          
          input[type="checkbox"]:hover {
              border-color: #0056b3; /* Hover effect */
          }
          
          }
              .reel-groups-bools label {
           
              border-radius: 8px;
              }
          }    
          
          
          
          
          .category-btn {
              margin: .2rem;
          }
          
           
          .tag  {
              background-color: #8a8a8a;
              color: rgb(255 255 255);
              border: none;
              padding: 5px 10px;
              font-size: 1.5rem;
              cursor: pointer;
              border-radius: 5px;
              transition: background-color 0.3s;
              display: flex;
              margin: .5rem;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: center;
              align-content: stretch;
          }
          
          
          
          
          
          .tags {
              color: rgb(255 255 255);
              border: none;
              padding: 5px 10px;
              font-size: 1.5rem;
              cursor: pointer;
              border-radius: 5px;
              transition: background-color 0.3s;
              display: table-caption;
              margin: .5rem;
          }
          
          
          .tag-primary {
              background-color: #8fbdec;
          
          }
          
          
          
          
          
          .videoElements {
              display: block;
              margin: auto;
          }
          
          
          
          
          
          .videoElements {
              display: block;
              margin: auto;
          }
          
          
          
          
          
    }



.hidden {
display: none;
}


#reel-upload-container .video-upload-popup {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    position: relative;
    height: 90%;
    overflow-y: auto;
    margin: auto;
}
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }
.upload-area {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    text-align: center;
}
  .upload-area.drag-over {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.1);
  }
.select-video-btn {
    padding: 10px 20px;
    background: linear-gradient(90deg, #3498db, #84adea);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
  .select-video-btn:hover {
    background: linear-gradient(90deg, #2980b9, #71368a);
  }
  .progress {
    margin: 10px 0;
  }
  .progress-bar {
    width: 0%;
    height: 20px;
    background: linear-gradient(90deg, #16a085, #27ae60);
    color: white;
    text-align: center;
    border-radius: 5px;
    animation: progress-animation 2s ease-in-out forwards;
  }
  @keyframes progress-animation {
    from { width: 0%; }
    to { width: 100%; }
  }
  .form-control {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
.reel-video-btn {
    background: linear-gradient(90deg, #84adea, #cbdcf7);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
  .reel-video-btn:hover {
    background: linear-gradient(90deg,rgb(106, 74, 220),rgb(119, 172, 232));
  }
  #thumbnailPreviewContainer {
    border-radius: 5px;
    overflow: hidden;
  }

        `;
        document.body.appendChild(uploadStyles);
    }

    // Create the overlay for the popup
    const overlay = document.createElement("div");
    overlay.className = "video-upload-popup-overlay";

    overlay.id = "reel-upload-container";

    // Set the inner content of the overlay
    overlay.innerHTML = `
<div class="video-upload-popup" aria-labelledby="videoUploadPopupLabel">
  <button class="close-button" aria-label="Close Popup">&times;</button>
  <h3 id="videoUploadPopupLabel">Share Your Reel</h3>
  
  <!-- Upload Area -->
  <div class="upload-area" id="uploadArea">
    
    <label for="reelVideoTitle" aria-label="Video Title">
      Title <small class="text-muted">(Maximum 100 characters)</small>
    </label>
    <input type="text" id="reelVideoTitle" class="reel-video-title form-control" placeholder="Enter a title for your reel..." maxlength="100" aria-describedby="reelTitleHelp">
    <small id="reelTitleHelp" class="form-text text-muted">Give your reel an engaging title that reflects its content.</small>

    <label for="reelVideoInput" aria-label="Upload Video">
      Video Upload
    </label>
    <input type="file" id="reelVideoInput" class="reel-video-input" accept="video/*" hidden aria-describedby="videoUploadHelp">
    <div class="reel-video-area" aria-labelledby="selectVideoLabel">
      <button id="selectVideoLabel" class="select-video-btn btn btn-secondary" aria-label="Select Video Button">Select Video</button>
      <video id="reelVideoPreview" class="reel-video-preview" controls hidden aria-label="Video Preview"></video>
    </div>
    <small id="videoUploadHelp" class="form-text text-muted">Upload your video file here.</small>

    <label for="reelVideoDescription" aria-label="Video Description">
      Description <small class="text-muted">(Use # for tags)</small>
    </label>
    <textarea id="reelVideoDescription" class="reel-video-content form-control" placeholder="Write a description..." aria-describedby="reelDescriptionHelp"></textarea>
    <small id="reelDescriptionHelp" class="form-text text-muted">Provide a brief description. Add tags using # (e.g., #Marketing).</small>

    <button class="reel-video-btn btn btn-primary" aria-label="Post Video">Post Video</button>
  </div>
</div>


      <!-- More Options Area -->
      <div id="reels-more-options-area" class="hidden" hidden>


              <div class="reel-groups">
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" id="uploadProgressBar">0%</div>
        </div>
        </div>


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
        <label><input type="checkbox" id="giftsBool" aria-label="Enable Gifts" /> Enable Gifts <small class="text-muted">(Allow viewers to send gifts)</small></label>
        <label><input type="checkbox" id="viewsBool" checked aria-label="Show Views" /> Show Views <small class="text-muted">(Display the number of views)</small></label>
        <label><input type="checkbox" id="likesBool" checked aria-label="Show Likes" /> Show Likes <small class="text-muted">(Display the number of likes)</small></label>
        <label><input type="checkbox" id="lovesBool" checked aria-label="Show Loves" /> Show Loves <small class="text-muted">(Display the number of loves)</small></label>
    </div>

      <button type="button" id="saveReelChangesBtn">Save Changes</button>
      <div id="reelID" hidden></div>

      </div>
    </div>
  `;

 /*    
 
 // Styling for the hidden class
    const style = document.createElement('style');
    style.innerHTML = `
      .hidden {
        display: none;
      }
          `;  
      */

    


// Append to body
document.body.appendChild(overlay);



document.querySelector(".select-video-btn").addEventListener("click", function() {
document.querySelector(".reel-video-input").click();
});



    // Close button functionality
    overlay.querySelector(".close-button").addEventListener("click", () => overlay.remove());






    async function checkMembershipAndBalance(checkType, checkedBool, isChecking) {
 
      // Assume userData contains membership type and balance information
      const userData = await getUserData(); // Assume this function retrieves user data from your database
     
      const membershipType = userData.membershipType; // 'basic', 'premium', etc.
      const userBalance = userData.balance; // User's balance to check against
     
      // Set the prices for boosted and sponsored posts
      const boostedPostCost = 10; // Example cost for a boosted post
      const sponsoredPostCost = 20; // Example cost for a sponsored post
     
      // Check if the user has sufficient balance and membership for boosted and sponsored posts
      let message = '';
     
      if(checkedBool){
          if (checkType == "BoostedPost" && (membershipType == 'free' ||  userBalance < boostedPostCost)) {
          message += 'You do not have sufficient membership or balance for a boosted post.\n';
      }
     
      if (checkType == "SponsoredPost" && (membershipType == 'free' || membershipType == 'basic' &&  userBalance < sponsoredPostCost)) {
          message += 'You do not have sufficient membership or balance for a sponsored post.\n';
      }
      if (checkType == "RelatedProducts" && membershipType == 'free' || membershipType == 'basic') {
          message += 'You do not have sufficient membership to add Related Products.\n';
      }
     
      if (checkType == "EndingCard" && membershipType == 'free') {
          message += 'You do not have sufficient membership to add Ending Card.\n';
      }
     
      if(isChecking && message){
     
         return false; // Stop further actions (e.g., form submission) if not eligible
     
      }else{
      // Show a message or prevent submission if any post is not possible
      if (message) {
          alert(message);
          return false; // Stop further actions (e.g., form submission) if not eligible
      }
     
     
      }
     
     
     }
     
     
      // Allow further actions if the user is eligible
      return true;
     }

    // Save changes button
    document.getElementById('saveReelChangesBtn').onclick = async () => {
     
  
  
      const updatedStatus = document.getElementById('status').value;
      const updatedReelResume = document.getElementById('reelResume').value;
      const updatedThumbnailURL = document.getElementById('thumbnailURL').value;
       reelID = document.getElementById('reelID').innerText;

  
  
  const updatedRelatedURL = document.getElementById('relatedURL').value;
  const updatedLocation = document.getElementById('location').value;
  
  // Set booleans based on whether values exist
  const updatedRelatedURLBool = updatedRelatedURL ? true : false;
  const updatedLocationBool = updatedLocation ? true : false;
  
  
  
   
  
      const updatedNotificationsBool = document.getElementById('notificationsBool').checked;
  
      const updatedCommentsBool = document.getElementById('commentsBool').checked;
      const updatedGiftsBool = document.getElementById('giftsBool').checked;
      const updatedViewsBool = document.getElementById('viewsBool').checked;
      const updatedLikesBool = document.getElementById('likesBool').checked;
      const updatedLovesBool = document.getElementById('lovesBool').checked;
      const updatedIsPublic = document.getElementById('isPublic').checked;
  
  
  
  
  
     // Get the checked status of the post types
     const updatedIsBoostedPost = document.getElementById('isBoostedPost').checked;
  
     const isEligible_updatedIsBoostedPost = await checkMembershipAndBalance("BoostedPost", updatedIsBoostedPost );
      if (isEligible_updatedIsBoostedPost) {
          // Proceed with the form submission or other logic
          console.log('User is eligible for the selected posts');
      }else{
          updatedIsBoostedPost = false;
          return;
      }
  
      const updatedIsSponsoredPost = document.getElementById('isSponsoredPost').checked;
  
      const isEligible_updatedIsSponsoredPost = await checkMembershipAndBalance("SponsoredPost", updatedIsSponsoredPost);
      if (isEligible_updatedIsSponsoredPost) {
          // Proceed with the form submission or other logic
          console.log('User is eligible for the selected posts');
      }else{
          updatedIsSponsoredPost = false;
          return;
      }
      
  
  
      let updatedRelatedProductsBool = false;
  
  
  const isEligible_RelatedProductsBool = await checkMembershipAndBalance("RelatedProducts", updatedRelatedProductsBool, true);
  if (isEligible_RelatedProductsBool) {
      // Proceed with the form submission or other logic
      console.log('User is eligible for the selected posts');
  
       updatedRelatedProductsBool = relatedProductsArray.length > 0 ? true : false;
  
  if(updatedRelatedProductsBool){
    //  relatedProductsArray.push({ name: '', cost: '', link: '' });
  
  }
  
  }else{
      updatedRelatedProductsBool = false;
      return;
  }
  
  
  
  let updatedEndingCardBool = false;
  
  let updatedEndingCard = document.getElementById('endingCard').value;
  
  const isEligible_updatedEndingCardBool = await checkMembershipAndBalance("EndingCard", updatedEndingCardBool, true);
  if (isEligible_updatedEndingCardBool) {
      // Proceed with the form submission or other logic
      console.log('User is eligible for the selected posts');
       updatedEndingCardBool = updatedEndingCard ? true : false;
  
       if(updatedEndingCardBool){
           updatedEndingCard = document.getElementById('endingCard').value;
  
  }
  }else{
      updatedEndingCardBool = false;
      return;
  }
  
  
  
  
  
      try {

        const reelRef = doc(db, "VideoResumes", reelID);

                  await updateDoc(reelRef, {

              status: updatedStatus,
              location: updatedLocation,
              thumbnailURL: updatedThumbnailURL,
              reelResume: updatedReelResume,
              endingCard: updatedEndingCard,
              relatedURLBool: updatedRelatedURLBool,
              relatedProductsBool: updatedRelatedProductsBool,
              endingCardBool: updatedEndingCardBool,
  
              relatedURL: updatedRelatedURL,
              relatedReels: relatedReelsArray,
              reelCategories: updatedReelCategories,
              relatedProducts: relatedProductsArray,
              notifcationsBool: updatedNotificationsBool,
              commentsBool: updatedCommentsBool,
              locationBool: updatedLocationBool,
              giftsBool: updatedGiftsBool,
              viewsBool: updatedViewsBool,
              likesBool: updatedLikesBool,
              lovesBool: updatedLovesBool,
              isPublic: updatedIsPublic,
              isBoostedPost: updatedIsBoostedPost,
              isSponsoredPost: updatedIsSponsoredPost,
              timestamp: serverTimestamp() // Update timestamp
          });
          showToast('Reel updated successfully.');

          const uploadContainer = document.getElementById("reel-upload-container");
          if (uploadContainer) {
             uploadContainer.remove();  // Remove the upload container
          }
          
              } catch (error) {
                  console.error('Error updating reel:', error);
                  showToast('Failed to update the reel. Please try again.');
              }
          };
  
    
  
  
  
const thumbnailUpload = document.getElementById('thumbnailUpload');
const thumbnailPreview = document.getElementById('thumbnailPreview');
const thumbnailURLInput = document.getElementById('thumbnailURL');
const thumbnailPreviewContainer = document.getElementById('thumbnailPreviewContainer');

// Trigger file input when clicking the preview image
thumbnailPreviewContainer.addEventListener('click', () => {
    thumbnailUpload.click();
});

// Handle file selection and upload
thumbnailUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file && reelID) {
        const reader = new FileReader();
        reader.onload = function (e) {
            thumbnailPreview.src = e.target.result; // Set preview image source
        };
        reader.readAsDataURL(file); // Read file as data URL

        try {
            const fileName = `users/${userID}/reels/${reelID}/thumbnail/${Date.now()}_${file.name}`; // Unique file name for storage
            const storageRef = ref(storage, fileName);
            await uploadBytes(storageRef, file); // Upload file to Firebase
            const downloadURL = await getDownloadURL(storageRef); // Get the download URL
            
            thumbnailURLInput.value = downloadURL; // Store the URL in the hidden input
            alert('Thumbnail uploaded successfully.');
        } catch (error) {
            console.error('Error uploading thumbnail:', error);
            alert('Failed to upload thumbnail. Please try again.');
        }
    }
});


const userDataSaved = getUserData() || {};

let reelData = userDataSaved.videoResumeData;


// Populate related reels and related products arrays
relatedReelsArray = reelData.relatedReels || [];
relatedProductsArray = reelData.relatedProducts || [];

// Update related products and related reels displays if necessary
updateRelatedProductsDisplay(reelData, relatedProductsArray);
updateRelatedReelsDisplay(reelData, relatedReelsArray);


  
  
  
  
  
  
  
}


let relatedReelsArray = [];
let relatedProductsArray = [];

let reelID = '';


function updateRelatedProductsDisplay(reelData, relatedProductsArray) {
    const addProductButton = document.getElementById('addProductButton');
    const productListContainer = document.getElementById('productListContainer');

    // Function to render the product list in DOM
    const renderProductList = () => {
        productListContainer.innerHTML = '';  // Clear the list before re-rendering
        relatedProductsArray.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-entry');
            productDiv.id = `product-${index}`;
            productDiv.innerHTML = `
                <div>
                    <label for="productName-${index}">Product Name:</label>
                    <input type="text" id="productName-${index}" placeholder="Product Name" value="${product.name}" required>
                </div>
                <div>
                    <label for="productCost-${index}">Cost:</label>
                    <input type="text" id="productCost-${index}" placeholder="Product Cost" value="${product.cost}" required>
                </div>
                <div>
                    <label for="productLink-${index}">Link:</label>
                    <input type="url" id="productLink-${index}" placeholder="Product URL" value="${product.link}" required>
                </div>
                <div>
                    <label for="productImage-${index}">Image URL:</label>
                    <input type="url" id="productImage-${index}" placeholder="Product Image URL" value="${product.image || ''}" required>
                    <div id="imagePreview-${index}" class="image-preview">
                        ${product.image ? `<img src="${product.image}" alt="Product Image" style="max-width: 100px;">` : ''}
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-product-btn" data-index="${index}">Remove</button>
            `;

            // Append the new product div to the container
            productListContainer.appendChild(productDiv);

            // Add event listener for the remove button
            const removeButton = productDiv.querySelector('.remove-product-btn');
            removeButton.addEventListener('click', (e) => {
                e.preventDefault();
                relatedProductsArray.splice(index, 1);  // Remove the product from the array
                renderProductList();  // Re-render the list
            });

            // Add event listeners to inputs to update array and DOM when values change
            const nameInput = productDiv.querySelector(`#productName-${index}`);
            const costInput = productDiv.querySelector(`#productCost-${index}`);
            const linkInput = productDiv.querySelector(`#productLink-${index}`);
            const imageInput = productDiv.querySelector(`#productImage-${index}`);
            const imagePreview = productDiv.querySelector(`#imagePreview-${index}`);

            nameInput.addEventListener('input', () => {
                relatedProductsArray[index].name = nameInput.value;
            });
            costInput.addEventListener('input', () => {
                relatedProductsArray[index].cost = costInput.value;
            });
            linkInput.addEventListener('input', () => {
                relatedProductsArray[index].link = linkInput.value;
            });
            imageInput.addEventListener('input', () => {
                relatedProductsArray[index].image = imageInput.value;
                if (imageInput.value) {
                    imagePreview.innerHTML = `<img src="${imageInput.value}" alt="Product Image" style="max-width: 100px;">`;
                } else {
                    imagePreview.innerHTML = '';
                }
            });
        });
    };

    // Render the initial list
    renderProductList();

    // Add event listener to the "Add Product" button
    addProductButton.addEventListener('click', () => {
        if (relatedProductsArray.length >= 4) {
            alert('You can only add up to 4 products.');
            return;
        }

        // Add a new product object to the array
        relatedProductsArray.push({ name: '', cost: '', link: '', image: '' });

        // Re-render the product list with the updated array
        renderProductList();
    });
}

function updateRelatedReelsDisplay(reelData, relatedReelsArray) {
    const relatedReelsList = document.getElementById('relatedReelsList');

 


    // Clear the list before rendering
    relatedReelsList.innerHTML = '';

    // Check if reelData and relatedReels are valid arrays
    if (!reelData.relatedReels || !Array.isArray(reelData.relatedReels) || reelData.relatedReels.length === 0) {
        relatedReelsList.innerHTML = '<li>No related Reels found.</li>';
    } else {
        reelData.relatedReels.forEach(videoData => {
            const card = document.createElement('div');
            card.id = `video-${videoData.reelID}`;
            card.classList.add("profileVideoCard");
            card.innerHTML = `
                <div class="vidioCard_thumbnail">
                    <video 
                      src="${videoData.videoResumeURL}" 
                      class="card-img-top video-player" 
                      controls
                      id="video-${videoData.reelID}">
                    </video>
                    <button class="btn btn-primary btn-block add-remove-btn" id="add-video-btn-${videoData.reelID}">
                        Add Related Video
                    </button>
                    <button class="btn btn-danger btn-block remove-video-btn" id="remove-video-btn-${videoData.reelID}">
                        Remove Related Video
                    </button>
                </div>
            `;

            relatedReelsList.appendChild(card);

            // Add button functionality to toggle related video
            const addButton = document.getElementById(`add-video-btn-${videoData.reelID}`);
            const removeButton = document.getElementById(`remove-video-btn-${videoData.reelID}`);

            addButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                const reelID = videoData.reelID;

                const index = relatedReelsArray.findIndex(reel => reel.reelID === reelID);
                if (index !== -1) {
                    relatedReelsArray.splice(index, 1); // Remove if already added
                    addButton.innerHTML = "Add Related Video";
                } else {
                    relatedReelsArray.push({
                        reelID: videoData.reelID,
                        reelTitle: videoData.videoResumeTitle,
                        videoUrl: videoData.videoResumeURL,
                        reelURL: videoData.reelURL,
                        reelTags: videoData.tags,
                        reelcreatedDate: new Date(videoData.createdAt)
                    });
                    addButton.innerHTML = "Remove Related Video";
                }
            });

            // Remove button functionality to delete from the DOM and array
            removeButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                const reelID = videoData.reelID;

                const index = relatedReelsArray.findIndex(reel => reel.reelID === reelID);
                if (index !== -1) {
                    relatedReelsArray.splice(index, 1); // Remove from array
                }
                relatedReelsList.removeChild(card); // Remove from DOM
            });
        });
    }
}
// Function to disable/enable buttons and input based on comma count
function checkCommaCount(e) {
  //  e.preventDefault(); // Prevent form submission

  const input = document.getElementById('input_tagsContainerSET-reelCategories');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const commaCount = (input.value.match(/,/g) || []).length;

  if (commaCount >= 2) {
    // Disable buttons and prevent more characters in input
    categoryButtons.forEach(button => button.disabled = true);
    input.disabled = true;
  } else {
    // Enable buttons and allow input if commas are less than 2
    categoryButtons.forEach(button => button.disabled = false);
    input.disabled = false;
  }
}

// Event listener for category button clicks
document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent form submission

    const category = this.getAttribute('data-category');
    const input = document.getElementById('input_tagsContainerSET-reelCategories');
    
    // Add the category to the input field (with a comma)
    input.value += (input.value ? ', ' : '') + category;

    // Trigger the "keyup" event (simulate enter)
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      keyCode: 13
    });
    event.preventDefault(); // Prevent form submission

    input.dispatchEvent(event);
    event.preventDefault(); // Prevent form submission

    // After adding the category, check for the comma count
    checkCommaCount();
  });
});





function handleUserAuthentication() {
  const user = auth.currentUser;

  if (user) {
    createVideoUploadPopup();
    initializeVideoUploadHandlers();
  } else {
    openPopupLogin();
  }

  console.log("22222222222222222222222222.");

}

document.addEventListener('DOMContentLoaded', () => {

// Create a button with event listener
document.getElementById("showUploadPopup").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission

  
  handleUserAuthentication();
  console.log("1111111111111111111111d.");

});

});



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