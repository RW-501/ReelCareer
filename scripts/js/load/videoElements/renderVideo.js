

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
  

   // Handle videoData based on doc existence
   let videoData;

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
  
      // Check if the logged-in user is connected to the user who posted the video
      const isConnected = connectedUserIds.includes(createdByID);
  
      // Additional logic based on connection status (if necessary)
      if (isConnected) {
        console.log(`${displayName} is connected to the logged-in user.`);
      } else {
        console.log(`${displayName} is NOT connected to the logged-in user.`);
      }
  
      console.log("videoData.relatedReels:", videoData.relatedReels);

      console.log("videoData.endingCard:", videoData.endingCard);
      console.log("videoData.relatedProducts:", videoData.relatedProducts);

      // Build the video card dynamically with real data
      const videoCard = document.createElement("div");
      videoCard.className = "video-post";
      videoCard.dataset.docId = docId; // Add dataset attribute
      videoCard.dataset.videoId = docId; // Add dataset attribute
      videoCard.dataset.timestamp = videoData.timestamp;
      videoCard.dataset.reelCategories = videoData.reelCategories;
      videoCard.dataset.relatedProductsBool = videoData.relatedProductsBool;
      videoCard.dataset.tags = videoData.tags || ""; // For search functionality
      videoCard.dataset.displayName = videoData.displayName || "";
      videoCard.dataset.isConnected = videoData.isConnected || "";
      videoCard.dataset.position = videoData.position || "";
      videoCard.dataset.location = videoData.location || "";
      videoCard.dataset.verified = videoData.verified || "";
      videoCard.dataset.reelUserID = videoData.createdByID || "";
      videoCard.dataset.profilePicture = videoData.profilePicture || "";
      videoCard.dataset.duration = videoData.duration || 0;
      videoCard.dataset.likes = videoData.likes || 0;
      videoCard.dataset.loves = videoData.loves || 0;
      videoCard.dataset.reported = videoData.reported || 0;
      videoCard.dataset.views = videoData.views || "";
      videoCard.dataset.profileURL = videoData.profileURL || "";
      videoCard.dataset.videosrc = videoData.videoResumeURL || "";

      videoCard.dataset.videoResumeTitle = videoData.videoResumeTitle || "";
      videoCard.dataset.createdByID = videoData.createdByID || "";
      videoCard.dataset.displayName = videoData.displayName || "";

      generateVideoSchema(videoData, docId);
      
      let videoDuration = parseFloat(videoData.duration.toFixed(2));
      videoCard.innerHTML = `
   <div id="videoCard_${docId}" class="video-card">
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
  
          <p class="job-title">${videoData.position || ""}</p>
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
  
          <button class="gift-button" data-doc-id="${docId}" aria-label="Send Gift to User">
            <i class="fa fa-gift"></i> Send Gift
          </button>
  
        </div>
  
      </div>
    </div>
  
    <div class="video-container">
      <video id="video_${docId}" class="video-element" ${videoMuted} poster="${
        videoData.thumbnailURL || ""
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
          <button class="action-btn like-btn" data-doc-id="${docId}" aria-label="Like Video">
            <i class="fa fa-thumbs-up"></i> ${videoData.likes || 0}
          </button>
  
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
        likeButton.addEventListener("click", () => handleLike(docId, likeButton));
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
  
      //  fetchComments(docId);
    });
  }


  window.renderVideos = renderVideos;



  async function getConnectedUserIds(connectionType = "all") {
  
    try {
      const connectionsRef = collection(db, 'Connections');
      let q;
      const user = auth.currentUser;
  
      if (!user) {
        openPopupLogin();
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
      
        if ((isFromCurrentUser || isToCurrentUser) && data.status === "accepted") {
          const userData = {
            id: isFromCurrentUser ? data.to : data.from,  // Get the other user's ID
            name: isFromCurrentUser ? data.toName : data.fromName,  // Get the other user's name
            profileUrl: isFromCurrentUser ? data.toProfileURL : data.fromProfileURL,  // Get the other user's profile URL
            profilePicture: isFromCurrentUser ? data.toProfilePicture : data.fromProfilePicture,  // Get the other user's profile picture
            acceptDate: data.acceptDate,  // Additional info
            createdAt: data.createdAt,  // Connection creation date
            status: data.status,  // Connection status
            connectionGroup: isFromCurrentUser ? data.toGroup : data.fromGroup,  // Connection group
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





function populateSidePanelContacts(connectedUserData) {
  const sidePanelContacts = document.getElementById('side-panel-contacts');
  sidePanelContacts.innerHTML = ''; // Reset content

  // Inject CSS for contact styling
  const style = document.createElement('style');
  style.textContent = `
    .contact-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }

    .contact-profile-picture {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .contact-name {
      flex-grow: 1;
    }

    .view-profile-button, .view-videos-button {
      margin-left: 10px;
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border-radius: 5px;
      text-decoration: none;
    }

    .view-profile-button:hover, .view-videos-button:hover {
      background-color: #0056b3;
    }
  `;
  document.head.appendChild(style);

  // Iterate over connected user data
  connectedUserData.forEach(user => {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact-item';


    const viewProfileButton = document.createElement('a');

    const profileImg = document.createElement('img');
    profileImg.src = user.profilePicture;
    profileImg.alt = `${user.name}'s profile picture`;
    profileImg.className = 'contact-profile-picture';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = user.name;
    nameSpan.className = 'contact-name';

    viewProfileButton.href = user.profileUrl;
    viewProfileButton.target = '_blank';

    const viewVideosButton = document.createElement('button');
    viewVideosButton.textContent = 'View Videos';
    viewVideosButton.className = 'view-videos-button';
    viewVideosButton.onclick = () => {

      fetchVideoResumes(page = 1, tagFilter = "", '', '', true, user.id );

      console.log(`View videos for user: ${user.name} (ID: ${user.id})`);
    };

    viewProfileButton.appendChild(profileImg);
    viewProfileButton.appendChild(nameSpan);
    contactDiv.appendChild(viewProfileButton);
    contactDiv.appendChild(viewVideosButton);
    sidePanelContacts.appendChild(contactDiv);
  });
}


window.populateSidePanelContacts = populateSidePanelContacts;











async function loadTopCategoriesWithVideos() {
  const searchSuggestionsDiv = document.getElementById('search-suggestions');
  searchSuggestionsDiv.innerHTML = ''; // Clear any existing content
  console.log('loadTopCategoriesWithVideos  ??????????????????/');

  // Avoid repeated style injection
  if (!document.getElementById('video-preview-style')) {
    const style = document.createElement('style');
    style.id = 'video-preview-style';
    style.textContent = `
      .category-item {
        margin-bottom: 20px;
      }
        .category-item-h3 {
        font-size: 1.5rem;
        }
      .video-preview {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
      .video-thumbnail {
        width: 80px;
        height: 45px;
        margin-right: 10px;
      }
      .video-title {
        font-weight: bold;
        margin-right: 10px;
      }
      .watch-video-button {
        padding: 5px 10px;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        text-decoration: none;
      }
      .watch-video-button:hover {
        background-color: #0056b3;
      }
    `;
    document.head.appendChild(style);
  }

  const videoResumesRef = collection(db, 'VideoResumes');
  const querySnapshot = await getDocs(videoResumesRef);

  const categoryMap = new Map();
  const topVideos = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.isPublic && data.status === 'posted' && !data.isDeleted) {
      const rating = ((data.views * data.duration) / data.watchTime) * 0.7 + data.likes * 0.3;
      topVideos.push({ ...data, rating });
      if (data.reelCategories && data.reelCategories.length > 0) {
        data.reelCategories.forEach((category) => {
          if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
          }
          categoryMap.get(category).push({ ...data, rating });
        });
      }
    }
  });

  const sortedCategories = Array.from(categoryMap.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  const randomPhrases = [
    "Explore the creative world of {category}",
    "Top picks in {category}",
    "Watch the best {category} reels",
    "Trending now: {category} talent",
    "See standout work in {category}"
  ];

  const fragment = document.createDocumentFragment();

  sortedCategories.forEach(([category, videos]) => {
    const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)].replace('{category}', category);
    const topVideo = videos.sort((a, b) => b.rating - a.rating)[0];

    if (!topVideo) {
      console.warn('No top video found for category:', category);
      return;
    }

    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-item';

    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = randomPhrase;
    categoryTitle.className = 'category-item-h3';
    categoryDiv.appendChild(categoryTitle);

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-preview';

    const thumbnail = document.createElement('img');
    thumbnail.src = topVideo.thumbnailURL || 'https://reelcareer.co/images/sq_logo_n_BG_sm.png';
    thumbnail.alt = topVideo.videoResumeTitle || 'Video thumbnail';
    thumbnail.className = 'video-thumbnail';

    const videoTitle = document.createElement('span');
    videoTitle.textContent = topVideo.videoResumeTitle || 'ReelCareer Video';
    videoTitle.className = 'video-title';

    const videoLink = document.createElement('a');
    videoLink.href = topVideo.videoResumeURL;
    videoLink.textContent = 'Watch Video';
    videoLink.target = '_blank';
    videoLink.className = 'watch-video-button';
    videoLink.setAttribute('aria-label', `Watch this video ${topVideo.videoResumeTitle || 'ReelCareer Video'}`);

    videoContainer.appendChild(thumbnail);
    videoContainer.appendChild(videoTitle);
    videoContainer.appendChild(videoLink);
    categoryDiv.appendChild(videoContainer);

    fragment.appendChild(categoryDiv);
  });

  searchSuggestionsDiv.appendChild(fragment);

  if (sortedCategories.length === 0) {
    const topRatedVideos = topVideos.sort((a, b) => b.rating - a.rating).slice(0, 5);
    topRatedVideos.forEach((video) => {
      const tagPhrase = `Discover amazing content about: ${video.tags.join(', ')}`;
      const videoDiv = document.createElement('div');
      videoDiv.className = 'category-item';

      const videoTitle = document.createElement('h3');
      videoTitle.textContent = tagPhrase;
      videoDiv.appendChild(videoTitle);

      const videoContainer = document.createElement('div');
      videoContainer.className = 'video-preview';

      const thumbnail = document.createElement('img');
      thumbnail.src = video.thumbnailURL || 'https://reelcareer.co/images/sq_logo_n_BG_sm.png';
      thumbnail.alt = video.videoResumeTitle || 'Video thumbnail';
      thumbnail.className = 'video-thumbnail';

      const titleSpan = document.createElement('span');
      titleSpan.textContent = video.videoResumeTitle || 'ReelCareer Video';
      titleSpan.className = 'video-title';

      const link = document.createElement('a');
      link.href = video.videoResumeURL;
      link.textContent = 'Watch Video';
      link.target = '_blank';
      link.className = 'watch-video-button';
      link.setAttribute('aria-label', `Watch this video ${video.videoResumeTitle || 'Untitled Video'}`);

      videoContainer.appendChild(thumbnail);
      videoContainer.appendChild(titleSpan);
      videoContainer.appendChild(link);
      videoDiv.appendChild(videoContainer);

      fragment.appendChild(videoDiv);
    });

    searchSuggestionsDiv.appendChild(fragment);
  }
}

loadTopCategoriesWithVideos();
window.loadTopCategoriesWithVideos = loadTopCategoriesWithVideos;
