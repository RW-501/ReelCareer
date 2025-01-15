
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
    videoCard
  ) {
    video.addEventListener("ended", () => {
      // Bring elements back when video stops
      controlsTop.classList.remove("slide-up");
      controlsBottom.classList.remove("slide-down");
      controlsPlay.classList.remove("fade-out");
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
  
  function addToShortlist(docId, currentUid) {
    const userID = auth.currentUser.uid;
  
    // Example: Add the video to the user's shortlist (if they are logged in)
    if (userID) {
      const shortlistRef = collection(db, "Users", userID, "Shortlists");
      addDoc(shortlistRef, {
        userID: currentUid,
        videoID: docId,
        timestamp: new Date()
      })
        .then(() => {
          showToast("Video added to your shortlist.");
        })
        .catch((error) => {
          console.error("Error adding to shortlist: ", error);
          showToast("Error adding video to shortlist.");
        });
    } else {
      showToast("Please log in to add to shortlist.");
    }
  }
  window.addToShortlist = addToShortlist;
  
  // Function to increment view count
  async function incrementViewCount(docId) {
    const videoRef = doc(db, "VideoResumes", docId);
    const viewsCollection = collection(db, `VideoResumes/${docId}/views`);
    
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
        views: increment(1) // Firestore increment
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
    const userID = auth.currentUser.uid; // Logged-in user ID
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
        share: increment(1) // Firestore increment
      });
  
      // Update UI instantly
     
    } catch (error) {
      console.error("Error updating like count: ", error);
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
  async function handleShare(docId, shareButton, videoID, videoResumeCaptions, profilePicture) {
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      const file = new File([blob], 'profile-picture.png', { type: blob.type });
      
      navigator.share({
        title: "Check out this Reel on ReelCareer!",
        text: videoResumeCaptions,
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
  
  async function submitReport() {
    const selectedReasons = [];
    document
      .querySelectorAll('#reportJobForm input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        selectedReasons.push(checkbox.value);
      });
  
    const userDataSaved = getUserData() || [];
    const message = document.getElementById("reportMessage").value;
    const statusMessage = document.getElementById("reportStatusMessage");
    const closeButton = document.getElementById("closeReportModalButton");
  
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
      videoId: document.getElementById("currentVideoId").innerText,
      jobTitle: document.title,
      reasons: selectedReasons,
      message: message,
      URL: window.location.href,
      submittedAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
      submittedBy: "user",
      submittedByUserID: userID,
      submittedByUserName: userDataSaved.displayName || "User",
      type: "User Report",
      pageTitle: document.title,
      status: "submitted"
    };
  
    // Create content for the follow-up message
    const reasonsContent =
      selectedReasons.length > 0 ? `Reasons: ${selectedReasons.join(", ")}` : "";
    const followUpMessageContent = `
            Thank you for reporting this issue. Our support team will follow up shortly. 
    
            ${reasonsContent}
    
            From ReelCareer
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
      conversationID: `conversation_${jobID}_${userID}`,
      content: followUpMessageContent.trim(),
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
    } catch (error) {
      console.error("Error submitting report or follow-up message:", error);
  
      statusMessage.innerHTML =
        "There was an error submitting your report. Please try again later.";
      statusMessage.className = "text-danger";
    } finally {
    }
  }
  window.submitReport = submitReport;
  
  function openReportModal(videoId) {
    document.getElementById("currentVideoId").innerText = videoId;
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
  
  async function handleConnect(docId, connectButton, viewProfilePicture, viewUserID, viewDisplayName) {
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
  
    const senderID = auth.currentUser.uid;
  
    console.log("recipientName: ", recipientName);
    console.log("reelUserID: ", reelUserID);
  
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
        const style = document.createElement("style");
        style.id = "videoUploadStyles";
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }

    // Create the overlay for the popup
    const overlay = document.createElement("div");
    overlay.className = "video-upload-popup-overlay";

    overlay.id = "reel-upload-container";

    // Set the inner content of the overlay
overlay.innerHTML = `
<div class="video-upload-popup">
  <button class="close-button">&times;</button>
  <h3>Share Your Reel</h3>
  <div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" id="uploadProgressBar">0%</div>
  </div>
  <input type="text" class="reel-video-title form-control" placeholder="Enter an title for your reel..." maxlength="100">
  <input type="file" class="reel-video-input" accept="video/*" hidden>
  <div class="reel-video-area">
    <button class="select-video-btn btn btn-secondary">Select Video</button>
    <video class="reel-video-preview" controls hidden></video>
  </div>
  <textarea class="reel-video-content form-control" placeholder="Write a description..."></textarea>
  <button class="reel-video-btn btn btn-primary">Post Video</button>
</div>
`;


// Append to body
document.body.appendChild(overlay);

    // Close button functionality
    overlay.querySelector(".close-button").addEventListener("click", () => overlay.remove());
}

// Create a button with event listener
document.getElementById("showUploadPopup").addEventListener("click", () => {
    createVideoUploadPopup();

    initializeVideoUploadHandlers();
});



    export { 
        createVideoUploadPopup,
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
        submitReport,
        openReportModal,
        closeReportModal,
        handleConnect,
        updateButtonState,
        sendMessage,
        setRecipientName,
        toggleSendButton 
        
      };