





import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
where, getDocs, storage, getAuth, collection, auth, analytics,
googleProvider,onSnapshot , linkWithCredential, EmailAuthProvider ,
getUserId // Export the function
} from 'https://reelcareer.co/scripts/js/load/module.js';











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

#saveReelChangesBtn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: .5rem;
    font-size: 16px;
    background: linear-gradient(271deg, #89bddb, transparent);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
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
    scrollbar-width: none;
    }


#reel-upload-container .video-upload-popup::-webkit-scrollbar {
    display: none; /* Hide scrollbar for WebKit browsers */
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

    padding: .5rem;

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
    margin: auto;
  }


  .hidden {
  display: none;
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
    <div class="reel-video-area" aria-labelledby="mainSelectVideoBtn">
      <button id="mainSelectVideoBtn" class="select-video-btn btn btn-secondary" aria-label="Select Video Button">Select Video</button>
      <video id="reelVideoPreview" class="reel-video-preview" controls hidden aria-label="Video Preview"></video>
    </div>
    <small id="videoUploadHelp" class="form-text text-muted">Upload your video file here.</small>

    <label for="reelVideoDescription" aria-label="Video Description">
      Description <small class="text-muted">(Use # for tags)</small>
    </label>
    <textarea id="reelVideoDescription" class="reel-video-content form-control" placeholder="Write a description..." aria-describedby="reelDescriptionHelp"></textarea>
    <small id="reelDescriptionHelp" class="form-text text-muted">Provide a brief description. Add tags using # (e.g., #Marketing).</small>

    <button id="uploadVideosBtn" class="reel-video-btn btn btn-primary" aria-label="Post Video">Post Video</button>
        <div id="multipleUploadCount"></div>

    </div>


      <!-- More Options Area -->
      <div id="reels-more-options-area" class="hidden" >


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


          <!-- collection Input -->
          <div class="reel-groups">
            <label for="reel-video-collection">Related URL <small class="text-muted">(Link to related content)</small></label>
            <input type="text" class="reel-video-collection" name="collection" aria-label="Related URL" placeholder="Collection" />
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
            <input type="text" id="location" class="keywordInput location-input" name="location" aria-label="Location" placeholder="Location (e.g., State, City)" 
            oninput="autoSuggest(this.value,'locationSuggestions')" />
          </div>


          <!-- Thumbnail Upload Section -->
          <div class="reel-groups">
            <label for="thumbnailUpload">Thumbnail <small class="text-muted">(Upload or link a thumbnail image)</small></label>
            <div id="thumbnailPreviewContainer" style="cursor: pointer;" aria-label="Thumbnail Preview">
              <img id="thumbnailPreview" src="https://reelcareer.co/images/sq_logo_n_BG_sm.png" alt="Thumbnail Preview" style="width: 150px; height: 150px; border: 1px solid #ccc;" />
                    <div id="thumbnailPreviewPickerSection"> </div>

          
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





    // Close button functionality
    overlay.querySelector(".close-button").addEventListener("click", () => {
      overlay.style.display = "none";
    
    });






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
     









      const tagsInput_reelCategories = document.getElementById('input_tagsContainerSET-reelCategories').value.trim();
      const updatedReelCategories = tagsInput_reelCategories ? tagsInput_reelCategories.split(",").map(item => item.toLowerCase().trim()) : [];
      console.log("tagsInput_reelCategories  ",tagsInput_reelCategories);
  


      document.getElementById('tagsSET-reelCategories').value = reelData.reelCategories || "";

// Event listener for input changes to check comma count dynamically
document.getElementById('input_tagsContainerSET-reelCategories').addEventListener('input', function() {
  checkCommaCount();
});
document.getElementById('clearTagsButton_tagsContainerSET-reelCategories').addEventListener('click', function() {
    const tagsInputElement = document.getElementById('input_tagsContainerSET-reelCategories');
    tagsInputElement.value = ''; // For fallback compatibility if it's a regular input field
});





const thumbnailPreview = document.getElementById('thumbnailPreview'); // Assume an image element for showing preview



      const updatedStatus = document.getElementById('status').value;
      const updatedCollection =  document.querySelector(".reel-video-collection").value.trim() || `collection `;

      const updatedReelResume = document.getElementById('reelResume').value;
      const updatedThumbnailURL = thumbnailPreview.src;
     // Retrieve the reelID from localStorage
   let  reelID = localStorage.getItem('reelID');

  
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

              status: updatedStatus || "posted",
              location: updatedLocation,
              thumbnailURL: updatedThumbnailURL,
              reelResume: updatedReelResume,
              endingCard: updatedEndingCard,
              relatedURLBool: updatedRelatedURLBool,
              relatedProductsBool: updatedRelatedProductsBool,
              endingCardBool: updatedEndingCardBool,
              collection: updatedCollection || 'group_1',

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
          
          showToast("Your Resume Reel is live.", "success", 100000, `https://reelcareer.co/reels#${reelID}`, true, 'View Here');

          const multipleUploadCount = document.getElementById("multipleUploadCount");
          

          
          const uploadContainer = document.getElementById("reel-upload-container");
          if (uploadContainer) {
             uploadContainer.remove();  // Remove the upload container
          }
          // Remove the reelID from localStorage
localStorage.removeItem('reelID');

              } catch (error) {
                  console.error('Error updating reel:', error);
                  showToast('Failed to update the reel. Please try again.');
              }
          };
  
    
  
          
  setTimeout(() => {


      const generalTags_reelCategories = createTagInputSystem({
          tagsContainerId: "tagsContainerSET-reelCategories",
          badgeClass: "tag-primary" // Custom badge class for general tags
      });

      console.log("generalTags_reelCategories", generalTags_reelCategories);
  }, 1000); // 1-second delay

  
  
  
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
            const fileName = `users/${userID}/reels/${reelID}/thumbnail.png`; // Unique file name for storage
            const storageRef = ref(storage, fileName);
            await uploadBytes(storageRef, file); // Upload file to Firebase
            const downloadURL = await getDownloadURL(storageRef); // Get the download URL
            
            thumbnailURLInput.value = downloadURL; // Store the URL in the hidden input
            showToast('Thumbnail uploaded successfully.');
        } catch (error) {
            console.error('Error uploading thumbnail:', error);
            showToast('Failed to upload thumbnail. Please try again.');
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
  const input = document.getElementById('input_tagsContainerSET-reelCategories');
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Allow input modification for Backspace, Delete, and other keys
  const isSpecialKey = e.key === 'Backspace' || e.key === 'Delete';
  
  // Check comma count after the change
  const commaCount = (input.value.match(/,/g) || []).length;

  if (commaCount >= 2) {
    // Disable buttons and prevent further input if more than 2 commas are entered
    categoryButtons.forEach(button => button.disabled = true);
    input.disabled = true;
  } else {
    // Enable buttons and input if comma count is below 2
    categoryButtons.forEach(button => button.disabled = false);
    input.disabled = false;
  }

  // If a special key (Backspace or Delete) is pressed, allow the input to be updated
  if (isSpecialKey) {
    // Allow normal behavior for special keys without modifying comma count
    return;
  }

  // Prevent other keys from entering if comma count exceeds limit
  if (commaCount >= 2) {
    e.preventDefault();
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


}

document.addEventListener('DOMContentLoaded', () => {

// Create a button with event listener
document.getElementById("showUploadPopup").addEventListener("click", (e) => {
  handleUserAuthentication();
});


if(document.getElementById("showUploadPopupBtn")){
  document.getElementById("showUploadPopupBtn").addEventListener("click", (e) => {
    handleUserAuthentication();
  });

}


});




export { 
    createVideoUploadPopup,
    handleUserAuthentication,

    
  };