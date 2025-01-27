

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


   // Handle videoData based on doc existence
   let videoData;
function renderVideos(docs, container, connectedUserIds, userId) {
  
    let videoMuted = "";
    const mutePreference = localStorage.getItem("videoMutePreference");
    // Set video mute state based on saved preference
    if (mutePreference === "true") {
      videoMuted = "mute";
    } else {
      videoMuted = "";
    }
    docs.forEach((doc) => {
      const docId = doc.id; // Firestore Document ID
      // Check if this video is already in the container
      if (container.querySelector(`[data-doc-id="${docId}"]`)) {
        console.log(`Video with docId ${docId} already rendered. Skipping.`);
        return; // Skip rendering this video
      }
  


   // Check if doc is a Firestore document snapshot
   if (typeof doc === 'object' && doc !== null && typeof doc.exists === 'function' && doc.exists()) {
     videoData = doc.data(); // Firestore document data
   } else {
     videoData = doc; // Assume JSON or plain object data
   }
     
      
  
      //    console.log("docId   ",docId);
      //  console.log("videoData   ",videoData);
  
      let reelUserID = videoData.userID || "Unknown User";
      // Retrieve relevant data for the video
      const createdByID = videoData.createdByID || "";
      const videoTitle = videoData.videoResumeTitle || "Untitled Video";
      const thumbnailURL = videoData.thumbnailURL || "";
      const profilePicture = videoData.profilePicture || "";
      const displayName = videoData.displayName || "Unknown";
      if (!createdByID) {
        return;
      }
      let isConnected;
/* 
      console.log("createdByID   ",createdByID);
      console.log("connectedUserIds   ",connectedUserIds);
 */
      if (connectedUserIds) {
      // Check if the logged-in user is connected to the user who posted the video
      isConnected = connectedUserIds.includes(createdByID);
      }

      // Additional logic based on connection status (if necessary)
      if (isConnected) {
        console.log(`${displayName} is connected to the logged-in user.`);
      } else {
        console.log(`${displayName} is NOT connected to the logged-in user.`);
      }
  /* 
      console.log("videoData.relatedReels:", videoData.relatedReels);

      console.log("videoData.endingCard:", videoData.endingCard);
      console.log("videoData.relatedProducts:", videoData.relatedProducts);
 */
      // Build the video card dynamically with real data
      const videoCard = document.createElement("div");
      videoCard.className = "video-post";
      videoCard.id = `video-${docId}`;
      videoCard.dataset.videoId = docId; // Add dataset attribute

      videoCard.dataset.docId = docId; // Add dataset attribute

      
      videoCard.dataset.thumbnailURL = videoData.thumbnailURL || "";
      videoCard.dataset.reelURL = videoData.reelURL || "";
      videoCard.dataset.videosrc = videoData.videoResumeURL || "";

      videoCard.dataset.searchableVideoResumeTitle = videoData.searchableVideoResumeTitle || "";
      videoCard.dataset.videoResumeTitle = videoData.videoResumeTitle || "";

      videoCard.dataset.reelCategories = videoData.reelCategories;
      videoCard.dataset.relatedProductsBool = videoData.relatedProductsBool;
      videoCard.dataset.isBoostedPost = videoData.isBoostedPost;
      videoCard.dataset.isSponsoredPost = videoData.isSponsoredPost;

      videoCard.dataset.relatedURLBool = videoData.relatedURLBool;
      videoCard.dataset.endingCardBool = videoData.endingCardBool;


      videoCard.dataset.tags = videoData.tags || ""; // For search functionality
      videoCard.dataset.displayName = videoData.displayName || "";
      videoCard.dataset.isConnected = videoData.isConnected || "";


      





      videoCard.dataset.rating = videoData.rating || 0;


      videoCard.dataset.repeatViews = videoData.repeatViews || 0;
      videoCard.dataset.views = videoData.views || 0;
      videoCard.dataset.uniqueViews = videoData.uniqueViews || 0;
      videoCard.dataset.watchTime = videoData.watchTime || 0;
      videoCard.dataset.engagegments = videoData.engagegments || 0;

      videoCard.dataset.duration = videoData.duration || 0;
      videoCard.dataset.likes = videoData.likes || 0;

      videoCard.dataset.timestamp = videoData.timestamp;
      videoCard.dataset.createdAt = videoData.createdAt;

      videoCard.dataset.reach = videoData.reach || 0;
      
      
      videoCard.dataset.location = videoData.location || "";
      videoCard.dataset.verified = videoData.verified || "";
      videoCard.dataset.reelUserID = videoData.createdByID || "";
      videoCard.dataset.profilePicture = videoData.profilePicture || "";

      videoCard.dataset.loves = videoData.loves || 0;
      videoCard.dataset.reported = videoData.reported || 0;
      videoCard.dataset.profileURL = videoData.profileURL || "";


      videoCard.dataset.createdByID = videoData.createdByID || "";
      videoCard.dataset.displayName = videoData.displayName || "";

      let boostedPost = videoData.isBoostedPost ? `boostedPost` : ``;
      let sponsoredPost = videoData.isSponsoredPost ? `sponsoredPost` : ``;



      generateVideoSchema(videoData, docId);
      
      let videoDuration = parseFloat(videoData.duration.toFixed(2));
      videoCard.innerHTML = `
   <div id="videoCard_${docId}" class="video-card ${sponsoredPost, boostedPost}">
    <div class="user-info">
      <div class="user-info-left">
        <img src="${
          videoData.profilePicture ||
          "https://reelcareer.co/images/sq_logo_n_BG_sm.png"
        }" alt="${videoData.displayName}" data-id="${
        videoData.createdByID
      }" data-src="${
        videoData.profilePicture ||
        "https://reelcareer.co/images/sq_logo_n_BG_sm.png"
      }" class="profile-img lazy-image">
  
      </div>
      <div class="user-info-right">
  
        <div class="user-details">
          <div class="name-badge">
            <a href="${videoData.profileURL}" aria-label="View ${
        videoData.displayName
      }'s profile">
              <h3 class="user-name">
                ${videoData.displayName || "Anonymous"}
              </h3>
            </a>
            <small class="badge ${videoData.verified ? "badge-verified" : ""}">
              ${videoData.verified ? '<i class="fa fa-check-circle"></i>' : ""}
            </small>
          </div>
  
          <p class="job-title">${videoData.rating || 0}</p>
        </div>
  
        <div class="interaction-buttons">
          ${
            isConnected
              ? `<button class="message-button" data-doc-id="${docId}" aria-label="Message User">
            <i class="fa fa-envelope"></i> Message
          </button>`
              : `<button class="connect-button" data-doc-id="${docId}" aria-label="Connect with User">
            <i class="fa fa-user-plus"></i> Connect
          </button>`
          }
  
          ${
            videoData.giftsBool
              ? ` <button class="gift-button" data-doc-id="${docId}" aria-label="Send Gift to User">
            <i class="fa fa-gift"></i> Send Gift
          </button>` : ``}
  
        </div>
  
      </div>
    </div>
  
    <div class="video-container">
      <video id="video_${docId}" class="video-element" ${videoMuted} poster="${
        '' || videoData.thumbnailURL || ""
      }">
        <source src="${videoData.videoResumeURL}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
  
      <!-- Custom Controls -->
      <div class="controls-top" data-doc-id="${docId}">
        <button class="mute-toggle" data-doc-id="${docId}" aria-label="Mute or Unmute">
          <i class="${videoMuted ? "fa fa-volume-mute" : "fa fa-volume-up"}"></i>
        </button>
  
        <button class="reportVideoBtn" data-doc-id="${docId}" aria-label="Report Video">
          <i class="fa fa-flag"></i>
        </button>
        <button class="fullscreen-toggle" aria-label="Enter Full Screen">
          <i class="fa fa-expand"></i>
        </button>
  
      </div>
  
      <div class="play-overlay controls-play" data-doc-id="${docId}">
        <i class="fa fa-play"></i>
      </div>
  
      <div class="controls-container controls-bottom" data-doc-id="${docId}">
        <div class="actions">
          ${
            videoData.likesBool
              ? ` <button class="action-btn like-btn" data-doc-id="${docId}" aria-label="Like Video">
            <i class="fa fa-thumbs-up"></i> ${videoData.likes || 0}
          </button>` : ``}
  
          <div class="realCareerVidLogo action-btn ">ReelCareer</div>
        </div>
      </div>
  
    </div>
  
    <div class="extra-container">
      <div class="video-Extra">${
        videoData.videoResumeTitle || "Resume Content Area Coming Soon"
      }</div>
  
    </div>
  
    <div class="caption-container">
      <p class="video-caption">${videoData.videoResumeCaptions || ""}</p>
    </div>
    <div class="tags-container">
    </div>
  
    <div class="video-details">
      <p class="views-count" aria-label="${videoData.views || 0} views">
        <i class="fa fa-play-circle"></i>
      <div id="video-count_${docId}">${videoData.views || 0}</div> views
      </p>
      <p class="video-duration" aria-label="Video duration ${
        videoDuration || "--:--"
      }">
        <i class="fa fa-clock"></i> ${videoDuration || "--:--"}
      </p>
      <button class="add-user-button" data-doc-id="${docId}" aria-label="Add to Shortlist">
        <i class="fa fa-plus"></i> Shortlist
      </button>
  
      <button class="share-btn" data-doc-id="${docId}" aria-label="Share Video">
        <i class="fa fa-share-alt"></i>
      </button>
      <button class="comments-btn" data-doc-id="${docId}" aria-label="Video Comments">
        <i class="fas fa-comment"></i>
      </button>
  
    </div>
  
    <!-- Comment Section -->
    <div id="comment-section-${docId}" class="comment-section hidden">
      <div class="comment-input-container">
        <input type="text" id="comment-input-${docId}" placeholder="Add a comment..." aria-label="Add a comment" />
        <button class="btn btn-primary add-comment-btn" onclick="addComment('${docId}')" aria-label="Post Comment">
          <i class="fa fa-paper-plane"></i>
        </button>
      </div>
      <div id="comments-container-${docId}" class="comments-container "></div>
    </div>
  
  </div>
  `;
  
      container.appendChild(videoCard);
  
      //console.log("Rendering video doc:", doc.data());
  
      // Add tags
      const tagsContainer = videoCard.querySelector(".tags-container");
      if (videoData.tags && Array.isArray(videoData.tags)) {
        videoData.tags.forEach((tag) => {
          const tagButton = document.createElement("button");
          tagButton.textContent = tag;
          tagButton.onclick = () => fetchVideoResumes(1, tag);
          tagsContainer.appendChild(tagButton);
        });
      }
  
      // Add event listeners for buttons
  
      const messageButton = videoCard.querySelector(".message-button");
      const connectButton = videoCard.querySelector(".connect-button");
      const addUserButton = videoCard.querySelector(".add-user-button");
      const likeButton = videoCard.querySelector(".like-btn");
      const reportVideoBtn = videoCard.querySelector(".reportVideoBtn");
      const giftButton = videoCard.querySelector(".gift-button");
  
      // Add event listeners only if the buttons exist
      if (giftButton) {
        giftButton.addEventListener("click", () =>
          handleSendGift(createdByID, displayName, videoTitle, docId, userId)
        );
      }
      console.log("giftButton: ", giftButton);

      if (reportVideoBtn) {
        reportVideoBtn.addEventListener("click", () => openReportModal(docId, videoData));
      }
  
      if (addUserButton) {
        addUserButton.addEventListener("click", () => addToShortlist(docId));
      }
  
      if (likeButton) {
        likeButton.addEventListener("click", () => handleLike(docId, likeButton, videoElement));
      }
  
      if (connectButton) {
        connectButton.addEventListener("click", () =>
          handleConnect(
            docId,
            connectButton,
            profilePicture,
            createdByID,
            displayName
          )
        );
      }
  
      if (messageButton) {
        messageButton.addEventListener("click", () =>
          sendMessage(
            docId,
            profilePicture,
            createdByID,
            displayName,
            connectButton
          )
        );
      }
  
      // After appending videoCard to container
      const shareButton = videoCard.querySelector(".share-btn");
      const addCommentButton = videoCard.querySelector(".add-comment-btn");
      const commentsBtn = videoCard.querySelector(".comments-btn");
  
      // Event Listeners
      addCommentButton.addEventListener("click", () => addComment(docId));
      commentsBtn.addEventListener("click", () =>
        handleComments(docId, commentsBtn)
      );
      shareButton.addEventListener("click", () =>
        handleShare(
          docId,
          shareButton,
          docId,
  
          videoData.videoResumeTitle,
          videoData.profilePicture
        )
      );
  
      // Increment view count when video is played
      const videoElement = videoCard.querySelector(".video-element");
      videoElement.addEventListener("play", () => incrementViewCount(docId, videoElement));
  
      const videos = videoCard.querySelectorAll(".video-element");
      //console.log("videos ",videos);
  
      const muteButton = videoCard.querySelector(".mute-toggle");
      const fullscreenButton = videoCard.querySelector(".fullscreen-toggle");
  
      const videoCardM_ID = document.getElementById(`videoCard_${docId}`);
  
      if (videoCardM_ID) {
        // Scope everything inside the specific card
        const controlsTop = videoCardM_ID.querySelector(".controls-top");
        const controlsPlay = videoCardM_ID.querySelector(".controls-play");
        const controlsBottom = videoCardM_ID.querySelector(".controls-bottom");
  
        const video = videoCardM_ID.querySelector("video"); // Fix: Scoped to the card itself
  
        const container = videoCardM_ID; // The card container itself
  
        // Inside the video card loop
        const playOverlay = videoCard.querySelector(".play-overlay");
  
        if (playOverlay) {
          // Attach the play event only to the play overlay
          playOverlay.addEventListener("click", () => {
            togglePlay(
              video,
              controlsTop,
              controlsPlay,
              controlsBottom,
              videoCardM_ID
            );
          });
        }
  
        // Mute/Unmute
        muteButton.addEventListener("click", () => toggleMute(video, muteButton));
  
        // Fullscreen Toggle
        fullscreenButton.addEventListener("click", () => toggleFullscreen(video));
  
        addVideoEndListener(
          video,
          controlsTop,
          controlsPlay,
          controlsBottom,
          videoCardM_ID,
          docId
        );
      }
  
    });
  }


  window.renderVideos = renderVideos;



  async function getConnectedUserIds(connectionType = "all") {
  
    try {
      const connectionsRef = collection(db, 'Connections');
      let q;
      const user = auth.currentUser;
  
      if (!user) {
        //openPopupLogin();
        return [];
      }
      let userId = auth.currentUser.uid; // Logged-in user ID
  
      // If a specific connection type is provided, filter by 'fromGroup' field
      if (connectionType !== "all") {
        q = query(
          connectionsRef,
          where('participants', 'array-contains', userId),
          where('status', '==', 'accepted'), // Filter by the connection type (group)
          where('fromGroup', '==', connectionType), // Filter by the connection type (group)
          where('toGroup', '==', connectionType) // Filter by the connection type (group)
        );
      } else {
        // Fetch all connections (no filter by 'fromGroup')
        q = query(connectionsRef, where('participants', 'array-contains', userId));
      }
  
      const querySnapshot = await getDocs(q);
      const connectedUserData = [];
  
      // Extract user IDs and other relevant data (name, profile URL, profile picture) from the 'participants' field
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const isFromCurrentUser = data.from === userId;
        const isToCurrentUser = data.to === userId;

        /* 
        console.log("isFromCurrentUser ",isFromCurrentUser);
        console.log("isToCurrentUser ",isToCurrentUser);
        console.log("data.from ",data.from);
        console.log("data.to ",data.to);
 */
        if ((isFromCurrentUser || isToCurrentUser) && data.status === "accepted") {
          const userData = {
            id: isToCurrentUser ? data.to : data.from,  // Get the other user's ID
            name: isToCurrentUser ? data.toName : data.fromName,  // Get the other user's name
            profileUrl: isToCurrentUser ? data.toProfileURL : data.fromProfileURL,  // Get the other user's profile URL
            profilePicture: isToCurrentUser ? data.toProfilePicture : data.fromProfilePicture,  // Get the other user's profile picture
            acceptDate: data.acceptDate,  // Additional info
            createdAt: data.createdAt,  // Connection creation date
            status: data.status,  // Connection status
            connectionGroup: isToCurrentUser ? data.toGroup : data.fromGroup,  // Connection group
          };
          connectedUserData.push(userData);
        }
      });
      
  
      return connectedUserData;
    } catch (error) {
      console.error('Error fetching connected users:', error);
      return [];
    }
  }
  
  
  window.getConnectedUserIds  = getConnectedUserIds;




  
   
function generateVideoSchema(videoData, docId) {
    // Convert Firebase Timestamp to JavaScript Date
    const uploadDate = videoData.createdAt 
        ? new Date(videoData.createdAt.seconds * 1000) // Convert seconds to milliseconds
        : new Date(); // Fallback to current date if createdAt is missing

    return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": videoData.name || "Video Resume",
        "description": videoData.videoResumeCaptions || "",
        "thumbnailUrl": videoData.thumbnailURL || "",
        "contentUrl": videoData.videoResumeURL,
        "uploadDate": uploadDate.toISOString(), // Call toISOString on a valid Date object
        "duration": videoData.duration || "",
        "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": { "@type": "http://schema.org/WatchAction" },
            "userInteractionCount": videoData.views || 0
        }
    };
}


window.generateVideoSchema = generateVideoSchema;








// Select the target element (e.g., the element displaying the views count)
const viewsElement = document.querySelector('.views-count');

// Create a MutationObserver to detect changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      // Trigger your effect here when the views count changes
      viewsElement.classList.add('viewsHighlight'); // Add an effect class
      setTimeout(() => viewsElement.classList.remove('viewsHighlight'), 1000); // Remove the effect after 1s
    }
  });
});

// Configuration object to specify what to observe
const config = { childList: true, subtree: false, attributes: true };

// Start observing the viewsElement
if (viewsElement) {
  observer.observe(viewsElement, config);
}




















