  
  
          async function getUserIP() {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                return response.data.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
                return 'Unknown IP';
            }
        }

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getFirestore, collection, doc,query,orderBy  , setDoc, updateDoc, getDoc, increment, arrayUnion, addDoc, getDocs, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { 
    getAuth, signInAnonymously, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiwC3Dmd88-t3N9iRV5cZ3snVkEXinclg",
    authDomain: "reelcareer-cb4b0.firebaseapp.com",
    projectId: "reelcareer-cb4b0",
    storageBucket: "reelcareer-cb4b0.appspot.com",
    messagingSenderId: "365163764840",
    appId: "1:365163764840:web:21c44f8625c9b6831e6fdd",
    measurementId: "G-LBTK319K2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

  


let userID = '';

document.addEventListener('DOMContentLoaded', () => {

// Handle user authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // The user is signed in
     userID = user.uid;  // Use the user's unique ID
    console.log('onA User ID:', userID);

  }
});

 });

// Assuming pageID is set somewhere on the page (like an element with ID "pageID")
const pageID = document.getElementById('pageID').innerText;
const pageName = document.getElementById('pageName').innerText;



renderShareArea(pageName);
// Get the span element containing the name


/**
 * Extracts the first name from a span element and passes it to a callback function.
 * @param {string} selector - The CSS selector for the span element containing the name.
 * @param {function} callback - The function to call with the extracted first name.
 */
function getFirstName(callback) {
  // Get the span element containing the name
  const nameSpan = document.querySelector("#celebrating-header span[property='name']");

  if (nameSpan) {
      // Extract the first part of the name before any space
      const firstName = nameSpan.textContent.split(" ")[0];

      // Pass the extracted first name to the callback function
      callback(firstName);
  } else {
      console.error("Name span not found.");
  }
}

getFirstName(renderInteractionsArea);


let pageOwnerUserID = '';


const pageOwnerUser = document.getElementById("pageOwnerUserID"); // Assume input or hidden field for user ID

async function loadPageOwnerUserInfo(pageOwnerUser) {
  if (!pageOwnerUser) {
    console.error("Page owner user ID not provided.");
    return;
  }
 pageOwnerUserID = pageOwnerUser.innerText;

  try {
    const userRef = doc(db, "Users", pageOwnerUserID); // Reference to the user's document
    const userDoc = await getDoc(userRef);  // Fetch the user document
    
    if (userDoc.exists()) {
      const userData = userDoc.data();  // Retrieve user data
      const userInfoElement = document.getElementById("dynamic-userInfo");
      
      if (userInfoElement) {
        userInfoElement.innerHTML = `
          <div class="user-info">
            <div class="user-info-left">
              <img src="${userData.profilePicture || 'https://reelcareer.co/images/sq_logo_n_BG_sm.png'}"
                   alt="${userData.displayName || 'User'}" 
                   class="profile-img lazy-image">
            </div>
            <div class="user-info-right">
              <div class="user-details">
                <div class="name-badge">
                  <a href="https://reelcareer.co/u/?u=${userData.userID || '#'}" aria-label="View ${userData.displayName || 'User'}'s profile">
                    <h3 class="user-name">
                      ${userData.displayName || 'Anonymous'}
                    </h3>
                  </a>
                  <small class="badge ${userData.verified ? 'badge-verified' : ''}">
                    ${userData.verified ? '<i class="fa fa-check-circle"></i>' : ''}
                  </small>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        console.error("Dynamic user info container not found.");
      }
    } else {
      console.error("No user found with the provided ID.");
    }
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

// Load user info on page load
loadPageOwnerUserInfo(pageOwnerUser);


// Utility function to sanitize user inputs
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}






// Helper function to calculate time since post
function timeSincePost(timestamp) {
  const now = new Date();
  const postTime = timestamp.toDate(); // Assuming Firebase Timestamp object
  const seconds = Math.floor((now - postTime) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 365) return `${days} days ago`;
  return `${years} years ago`;
}
  // Function to load guestbook entries
// Function to load guestbook entries
async function loadEntries() {
  try {
    console.log('pageID:', pageID);

    const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
    
    // Order by timestamp (ascending or descending)
    const querySnapshot = await getDocs(query(guestbookRef, orderBy("timestamp", "desc"))); // 'desc' for most recent first, 'asc' for oldest first
    const entriesDiv = document.getElementById("guestbookEntries");

    const nameHeader = document.getElementById("name-header");
    //const guestMessage = document.getElementById("gift-guestMessage");

    // Extract the first part of the name before any space
    const firstName = nameHeader.textContent.split(" ")[0];

    // Replace [$Name$] with the first name in the placeholder text
    //guestMessage.placeholder = guestMessage.placeholder.replaceAll("[$Name$]", firstName);

    entriesDiv.innerHTML = ""; // Clear existing entries

    querySnapshot.forEach((doc) => {
      const entry = doc.data();
      const sanitizedMessage = sanitizeInput(entry.message);
      const sanitizedName = sanitizeInput(entry.name);
      const timestamp = entry.timestamp;
      const postID = doc.id;

      const timeAgo = timestamp ? timeSincePost(timestamp) : "Unknown time";

      if (entry.status == 'active') {
        // Enhanced entry display
        entriesDiv.innerHTML += `
          <div class="entry" style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 8px; background: #f9f9f9;">
            <div class="guestbook-content">
              <strong style="font-size: 1.1em; color: #333;">${sanitizedName}</strong>
              <span style="font-size: 0.9em; color: #777;">${timeAgo}</span>
            </div>
            <div class="guestbook-message">${sanitizedMessage}</div>
          </div>
          ${entry.giftType && entry.public == true ? `
            <div class='gifts'>
              <ul id="gifts-${postID}">
                <!-- Gifts for this post will be injected here -->
              </ul>
            </div>
          ` : ""}
        `;
        
        if (entry.giftType && entry.public == true) {
          loadGiftsForPost(entry, postID); 
        }
      }
    });

    getFirstName(renderGiftBoxArea);

    // Event Listener: Handle Anonymous Checkbox
    const giftAnonymousCheckbox = document.getElementById("gift-anonymousCheckbox");
    const giftGuestNameInput = document.getElementById("gift-guestName");

    giftAnonymousCheckbox.addEventListener("change", () => {
      giftGuestNameInput.value = giftAnonymousCheckbox.checked ? "Anonymous" : "";
    });

  } catch (error) {
    console.error("Error loading guestbook entries:", error);
  }
}

window.loadEntries = loadEntries;




// Function to load gifts for a guestbook post
async function loadGiftsForPost(giftData, postID) {

  
  const giftsList = document.getElementById(`gifts-${postID}`);
  // giftsList.innerHTML = "";  // Clear previous gifts

    const giftItem = document.createElement("div");
  
    // Create a div container for better structure
    const giftContainer = document.createElement("div");
    giftContainer.className = "gift-item";
  
    // Add image element
    const giftImage = document.createElement("img");
    giftImage.alt = giftData.giftType; // Set alt text for accessibility
  
    // Determine image source based on gift name
    switch (giftData.giftType.toLowerCase()) {
      case "small-candle":
        giftImage.src = "https://reelcareer.co/obituaries/images/gifts/CandleSmall.PNG";
        break;
      case "big-candle":
        giftImage.src = "https://reelcareer.co/obituaries/images/gifts/CandleBig.PNG";
        break;
      case "custom":
        giftImage.src = "https://reelcareer.co/obituaries/images/gifts/Charity.PNG"; // Example custom gift image
        break;
      default:
        giftImage.src = "https://reelcareer.co/obituaries/images/gifts/Charity.PNG"; // Default image if no match
    }
  
    // Add image and text to the container
    const giftText = document.createElement("span");
    giftText.textContent = `${giftData.name} - $${giftData.amount}`;
  
    giftContainer.appendChild(giftImage);
    giftContainer.appendChild(giftText);
  
    // Add the gift container to the list item
    giftItem.appendChild(giftContainer);
    giftsList.appendChild(giftItem);
 
  
}
window.loadGiftsForPost = loadGiftsForPost;


// Function to add 1 to the flower count, animate, and update in Firestore
// Function to wrap async calls with timeout
const withTimeout = (promise, timeout) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), timeout)
    ),
  ]);
};

async function incrementFlowerCount() {
  const flowerCountElement = document.getElementById("flowerCount");
  let currentCount = parseInt(flowerCountElement.textContent, 10); // Get current count and convert to number
  const pageID = document.getElementById('pageID').innerText;


  // Firestore references
  const userIP = await getUserIP(); // Fetch the user's IP

  try {
    const docRef = doc(db, "A_Obituaries", pageID); // Reference to the specific obituary document

    // Ensure the document exists before proceeding
    const docSnapshot = await withTimeout(getDoc(docRef), 5000); // Timeout after 5 seconds
    if (!docSnapshot.exists()) {
      console.error("Document does not exist. Cannot increment flower count.");
      return;
    }

    const ipCollectionRef = collection(docRef, "FlowerIPs"); // Reference to the "FlowerIPs" subcollection

    // Check if the IP is already recorded
    const ipDocRef = doc(ipCollectionRef, userIP); // Use IP address as the document ID
    const ipDocSnapshot = await withTimeout(getDoc(ipDocRef), 5000); // Timeout after 5 seconds

    if (ipDocSnapshot.exists()) {
      showToast("User has already added a flower.");
      return; // Exit if the IP has already added a flower
    }

    // Increment flower count
    currentCount += 1; // Increment count by 1
    flowerCountElement.textContent = currentCount; // Update the element with the new count

    // Add animation
    flowerCountElement.style.transition = "transform 0.3s ease-out, color 0.3s ease-out";
    flowerCountElement.style.transform = "scale(1.5)";
    flowerCountElement.style.color = "green";

    // Reset animation after a delay
    setTimeout(() => {
      flowerCountElement.style.transform = "scale(1)";
      flowerCountElement.style.color = "black";
    }, 300); // Match the duration of the animation

    // Update Firestore
    await withTimeout(updateDoc(docRef, {
      flowerCount: currentCount // Update the flowerCount field in Firestore
    }), 5000); // Timeout after 5 seconds

    // Record the IP in the subcollection
    await withTimeout(setDoc(ipDocRef, { timestamp: serverTimestamp() }), 5000); // Timeout after 5 seconds

    console.log("Flower count updated successfully and IP recorded!");
  } catch (error) {
    if (error.message === "Operation timed out") {
      console.error("The operation timed out. Please try again.");
    } else {
      console.error("Error updating flower count:", error);
    }
  }
}

window.incrementFlowerCount = incrementFlowerCount;

let viewStartTime;

// Function to start tracking the view time when the page loads
function startViewTimer() {
    viewStartTime = Date.now();
}

startViewTimer();




// Determine the source of the visit
const getViewSource = () => {
  const externalSource = document.referrer && !document.referrer.includes(window.location.origin)
    ? document.referrer
    : null;
  const internalSource = sessionStorage.getItem('lastInternalPage');
  return externalSource || internalSource || 'Direct Visit';
};

// userLocationService.js
const userLocationService = {
  async getUserIPAndLocation() {
    try {
      const response = await fetch('https://api.ipify.org?format=json'); // Example IP fetching API
      const { ip } = await response.json();
      const locationResponse = await fetch(`https://ipinfo.io/${ip}/json`);
      const locationData = await locationResponse.json();
      return { ipAddress: ip, locationData };
    } catch (error) {
      console.error('Error fetching user IP or location:', error);
      return {};
    }
  }
};


async function incrementViews() {
  try {
    const pageID = document.getElementById('pageID')?.innerText?.trim();
    if (!pageID) {
      console.error('Page ID is missing.');
      return;
    }

    const { ipAddress, locationData } = await userLocationService.getUserIPAndLocation();
    if (!ipAddress) {
      console.error('Failed to retrieve user IP.');
      return;
    }

    const pageRef = doc(db, "A_Obituaries", pageID);
    const ipCollectionRef = collection(pageRef, "PageViewIPs");

    // Fetch the page document
    const pageDocSnapshot = await withTimeout(getDoc(pageRef), 5000);
    if (!pageDocSnapshot.exists()) {
      console.error("The page document does not exist.");
      return;
    }

    const pageData = pageDocSnapshot.data();

    // Handle video display if `videoURL` exists
    const mediaSection = document.getElementById("media-section");
    const videoUrl = pageData?.videoURL;
    if (videoUrl && mediaSection) {
      displayVideoPreview(videoUrl, mediaSection);
      console.log('Video URL:', videoUrl);
    }

    // Update flower count display
    const flowerCountElement = document.getElementById("flowerCount");
    if (flowerCountElement) {
      flowerCountElement.innerText = pageData?.flowerCount || 0;
    }

    // Calculate view duration
    const viewStart = viewStartTime || Date.now();
    const durationOfView = Math.floor((Date.now() - viewStart) / 1000); // View duration in seconds

    // Prepare update data
    const source = getViewSource();
    const userAgent = navigator.userAgent;
    const updatePageData = { views: increment(1) };
    const updateUserData = {
      lastViewTime: serverTimestamp(),
      lastViewSource: source,
      lastViewDevice: userAgent,
      durationOfLastView: durationOfView,
      lastCity: locationData?.city || 'Unknown',
      lastState: locationData?.region || 'Unknown',
      lastCountry: locationData?.country || 'Unknown',
    };

    // Reference for user's IP document
    const ipDocRef = doc(ipCollectionRef, ipAddress);

    // Handle view count and user data
    const ipDocSnapshot = await withTimeout(getDoc(ipDocRef), 5000);
    if (ipDocSnapshot.exists()) {
      // Update existing user's view details
      await withTimeout(updateDoc(ipDocRef, updateUserData), 5000);
      console.log("Updated user details successfully.");
    } else {
      // Increment unique views for a new IP address
      updatePageData.uniqueViews = increment(1);

      // Update the page data
      await withTimeout(updateDoc(pageRef, updatePageData), 5000);

      // Add a new document for the user's IP
      await withTimeout(setDoc(ipDocRef, updateUserData), 5000);
      console.log("Added unique view and updated user details successfully.");
    }
  } catch (error) {
    console.error("Error in incrementViews:", error);
  }
}

window.incrementViews = incrementViews;


// Open the Gift Popup
function openGiftPopup() {
  const giftPopup = document.getElementById("giftPopupArea");
  if (giftPopup) {
    giftPopup.style.display = "block";
  }
}

// Close the Gift Popup
function closeGiftPopup() {
  const giftPopup = document.getElementById("giftPopupArea");
  if (giftPopup) {
    giftPopup.style.display = "none";
  }
}


window.openGiftPopup = openGiftPopup;
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

    const user = auth.currentUser;

    if(!user){
      openPopupLogin();
      return;
    }

    
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
// 
// 
async function handlePaymentSuccess(giftType, amountToPay, paymentDetails) {
  try {
    const giftsRefs = collection(db, `A_Obituaries/${pageID}/Gifts-Transactions`);
    const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
   // const transactionsRefs = collection(db, `A_Transactions`, `Gift_${pageID}`, `TransactionRecords`); // Corrected path
    const transactionsRefs = collection(db, `A_Transactions`); // Corrected path

    const anonymousCheckbox = document.getElementById("gift-anonymousCheckbox");
    const publicCheckbox = document.getElementById("gift-publicCheckbox");
    const nameInput = document.getElementById("gift-guestName");
    const messageInput = document.getElementById("gift-guestMessage");
    const pageOwnerUserID = document.getElementById("pageOwnerUserID");
    const name = sanitizeInput(anonymousCheckbox.checked ? "Anonymous" : nameInput.value.trim());
    const message = sanitizeInput(messageInput.value.trim());
    const publicBool = publicCheckbox.checked;
    const userIP = await getUserIP();

    if (!message) {
      showToast("Please enter a message before submitting.");
      return;
    }

    await addDoc(giftsRefs, {
      giftType,
      pageID,
      amount: amountToPay,
      paymentDetails,
      status: "completed",
      timestamp: serverTimestamp(),
    });

    await addDoc(guestbookRef, {
      name,
      giftType,
      pageID,
      amount: amountToPay,
      gift: `${giftType} gift of $${amountToPay} sent!`,
      message,
      public: publicBool,
      userIP,
      status: "active",
      timestamp: serverTimestamp(),
    });

    await addDoc(transactionsRefs, {
      giftType,
      pageID,
      url: `https://reelcareer.co/obituaries/celebrating/${pageName}`,
      pageName,
      paymentDetails,
      withdraw_amount: 0,
      note: `Credit to Account: Page: ${pageID}`,
      transactionType: `credit`,
      status: "active",
      pageOwnerUserID: pageOwnerUserID,
      userID: userID,
      userIP: userIP,
      amount: amountToPay,
      timestamp: serverTimestamp(),
    });

    loadEntries();
    showToast("Thank you for your contribution!");
  } catch (error) {
    console.error("Error processing payment:", error);
    showToast("There was an error processing your gift. Please try again.");
  }
}






  function displayVideoPreview(videoUrl, videoPreviewContainer) {

    // Check if the videoPreviewContainer is null
    if (!videoPreviewContainer) {
        console.error('Error: videoPreviewContainer is null or undefined.');
        return;
    }

    // Clear previous content in the container
    videoPreviewContainer.innerHTML = "";

    // Check if there is a videoUrl to display
    if (videoUrl) {
          // Firebase Video URL Check
    if (videoUrl.includes("firebasestorage.googleapis.com")) {
      // Assuming it's an MP4 video, you can adjust the logic if other formats are used
      videoPreviewContainer.innerHTML = `
          <video width="560" height="315" controls>
              <source src="${videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
          </video>`;

          return;
  }
        // YouTube Video Check
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
          const youtubeEmbed = videoUrl.includes("youtube.com") 
              ? videoUrl.replace("watch?v=", "embed/") 
              : videoUrl.replace("youtu.be/", "youtube.com/embed/");
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' width="560" height="315" src="${youtubeEmbed}" frameborder="0" allowfullscreen></iframe>`;
          return;
      }
      // Vimeo Video Check
      else if (videoUrl.includes("vimeo.com")) {
          const vimeoId = videoUrl.split("/").pop();
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' src="https://player.vimeo.com/video/${vimeoId}" width="560" height="315" frameborder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          return;
      }
      // MP4 Video Check (and other formats like .webm, .ogg)
      else if (videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
          videoPreviewContainer.innerHTML = `
              <video class='media-video' width="560" height="315" controls>
                  <source src="${videoUrl}" type="video/mp4">
                  Your browser does not support the video tag.
              </video>`;
          return;
      }
      // Dailymotion Video Check
      else if (videoUrl.includes("dailymotion.com")) {
          const dailymotionId = videoUrl.split("/").pop();
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' frameborder="0" width="560" height="315" src="https://www.dailymotion.com/embed/video/${dailymotionId}" 
                      allowfullscreen></iframe>`;
          return;
      }
      // Twitch Video Check
      else if (videoUrl.includes("twitch.tv")) {
          const twitchId = videoUrl.split("/").pop();
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' src="https://player.twitch.tv/?video=${twitchId}" height="315" width="560" frameborder="0" 
                      scrolling="no" allowfullscreen></iframe>`;
          return;
      }
      // Facebook Video Check
      else if (videoUrl.includes("facebook.com")) {
          const facebookId = videoUrl.split("/").pop();
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${facebookId}" 
                      width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
          return;
      }
      // Instagram Video Check
      else if (videoUrl.includes("instagram.com")) {
          const instagramId = videoUrl.split("/p/").pop().split("/")[0];
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' src="https://www.instagram.com/p/${instagramId}/embed" width="560" height="315" frameborder="0" 
                      scrolling="no" allowfullscreen></iframe>`;
          return;
      }
      // Twitter Video Check
      else if (videoUrl.includes("twitter.com")) {
          const twitterId = videoUrl.split("/status/").pop();
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' src="https://twitframe.com/show?url=${encodeURIComponent(twitterId)}" width="560" height="315" 
                      frameborder="0" allowfullscreen></iframe>`;
          return;
      }
      // TikTok Video Check
      else if (videoUrl.includes("tiktok.com")) {
          const tiktokId = videoUrl.split("/video/").pop();
          videoPreviewContainer.innerHTML = `
              <iframe class='media-video' src="https://www.tiktok.com/embed/${tiktokId}" width="560" height="315" frameborder="0" 
                      allowfullscreen></iframe>`;
          return;
      }
      // Unsupported platform message
      else {
          videoPreviewContainer.innerHTML = "<p>Unsupported video platform. Please enter a URL from a supported platform like YouTube, Vimeo, Dailymotion, Instagram, or MP4.</p>";
          return;
      }     
}

  }

  /* 
function showToast(message, type = "success") {
  // Create a toast container (div)
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add(type); // Add type for different styles (e.g., success, error)

  // Add message to the toast
  toast.innerHTML = `
    <span>${message}</span>
    <button class="close-toast">×</button>
  `;

  // Append the toast to the body
  document.body.appendChild(toast);

  // Get the close button and add event listener
  const closeButton = toast.querySelector(".close-toast");
  closeButton.addEventListener("click", () => {
    toast.remove();
  });

  // Apply the toast animation
  toast.style.animation = "fadeInOut 5s forwards";

  // Remove the toast after 5 seconds (or when clicked)
  setTimeout(() => {
    toast.remove();
  }, 5000); // Toast disappears after 5 seconds
}


window.showToast = showToast;


 */

loadEntries();











const submitbtn = document.getElementById("submit-btn");

// Handle form submission
submitbtn.addEventListener("click", async (e) => {
  console.log('Form submission triggered.');
  const anonymousCheckbox = document.getElementById("anonymousCheckbox");

  const nameInput = document.getElementById("guestName");
  const messageInput = document.getElementById("guestMessage");
  const name = sanitizeInput(anonymousCheckbox.checked ? "Anonymous" : nameInput.value.trim());
  const message = sanitizeInput(messageInput.value.trim());
  const userIP = await getUserIP(); // Fetch user IP address

  let valid = true;

  // Check if name and message are filled
  if (!name) {
    nameInput.style.borderColor = 'red'; // Highlight input with red border
    valid = false;
  } else {
    nameInput.style.borderColor = ''; // Reset border color
  }

  if (!message) {
    messageInput.style.borderColor = 'red'; // Highlight input with red border
    valid = false;
  } else {
    messageInput.style.borderColor = ''; // Reset border color
  }

  // If both fields are valid, proceed with submission
  if (valid) {
    try {
      const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
      await addDoc(guestbookRef, {
        name,
        message,
        userIP,
        status: "active",
        timestamp: serverTimestamp(),
      });
      nameInput.value = ''; // Clear form inputs
      messageInput.value = ''; // Clear form inputs
      anonymousCheckbox.checked = false; // Reset checkbox
      await loadEntries(); // Refresh guestbook entries
    } catch (error) {
      console.error("Error adding guestbook entry:", error);
    }
  } else {
    // Optionally, you can add a message to the user here
    showToast("Please fill in both the name and the message.");
  }
});



  // Add an event listener to the "Send Flowers" button
  const sendFlowersButton = document.getElementById("send-flowers");
  sendFlowersButton.addEventListener("click", incrementFlowerCount);
  
  // Add an event listener to the "Send Gift" button
  const sendGiftButton = document.getElementById("send-gift");
  sendGiftButton.addEventListener("click", openGiftPopup);
  

const anonymousCheckbox = document.getElementById("anonymousCheckbox");
const guestNameInput = document.getElementById("guestName");

// Add event listener for checkbox change
anonymousCheckbox.addEventListener("change", () => {
  if (anonymousCheckbox.checked) {
    guestNameInput.value = "Anonymous"; // Set the value to "Anonymous" when checked
  } else {
    guestNameInput.value = ""; // Clear the value when unchecked
  }
});




// Increment views when the page loads
incrementViews(); // Replace `pageID` with the actual page ID variable
  
setTimeout(() => {

// Event listener for the Report Obituary button
document.getElementById('report-obituary-btn').addEventListener('click', () => {
  const reasons = prompt("Please enter the reason for reporting this obituary:");
  if (reasons) {
      // Timeout of 1 second before reporting the obituary
          reportObituary(reasons);
  } else {
      showToast("Report canceled. No reason provided.", "info");
  }
});
}, 1000); // 1000 milliseconds = 1 second

// Function to handle reporting an obituary
async function reportObituary(reason) {
  try {

    let pageOwnerName = nameHeader.innerText;
    const pageURL = window.location.href;

 // Prepare the data to increment the report count
const reportObituary = {
  obituaryReportCount: increment(1),  // Increment the report count by 1
};

// Reference the specific obituary document
const obituaryRef = doc(db, `A_Obituaries`, pageID);  // Use `doc` instead of `collection`

// Update the report count in the database
await updateDoc(obituaryRef, reportObituary);

// Reference the specific obituary document
const usersRef = doc(db, `Users`, pageOwnerUserID);  // Use `doc` instead of `collection`

// Update the report count in the database
await updateDoc(usersRef, reportObituary);


// Report Data to Firebase
const reportData = {
  obituaryId: pageID,
  pageName: pageName,
  pageOwnerUserID: pageOwnerUserID,
  pageOwnerName: pageOwnerName,
  pageURL,
  reasons: selectedReasons,
  message: message,
  URL: window.location.href,
  submittedAt: new Date().toISOString(),
  timestamp: serverTimestamp(),
  submittedBy: "user",
  submittedByUserID:  auth.currentUser ? auth.currentUser.uid : 'anonymous',
  submittedByUserName: userDataSaved.displayName || "User",
  type: "User Obituary Report",
  pageTitle: document.title,
  status: "submitted"
};

// Create content for the follow-up message
const reasonsContent =
  selectedReasons.length > 0 ? `Reasons: ${selectedReasons.join(", ")}` : "";
  const followUpMessageContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>Hello <strong>${pageOwnerName}</strong>,</p>
      <p>Thank you for reporting an issue with <em>${reportData.pageName}</em>. Our support team will review the report soon.</p>
      <p><strong>Reported Reasons:</strong> ${reasons}</p>
      <p>We appreciate your effort in keeping ReelCareer safe.</p>
      <p>Best regards,<br><strong>The ReelCareer Team</strong></p>
    </div>
  `;

const reportedUserMessageContent = `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <p>Hello <strong>${userDataSaved.displayName}</strong>,</p>
  <p>Your obituary page titled <em>${reportData.pageName}</em> has been reported by another user. Please review it to ensure it complies with our terms.</p>
  <p><strong>Reported Reasons:</strong> ${reasons}</p>
  <p>Our support team will review the case and take necessary action if required.</p>
  <p>Best regards,<br><strong>The ReelCareer Team</strong></p>
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
  conversationID: `conversation_${pageID}_${userID}`,
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
  conversationID: `conversation_${pageID}_${videoCreaterID}`,
  content: reportedUserMessageContent.trim(),
  connectedBool: true,
  createdAt: new Date(),
  timestamp: serverTimestamp(),
  contentType: "notification",
  status: "unread",
  attachments: ""
};



      // Submit the report
      const reportRef = await addDoc(
        collection(db, "SupportTickets"),
        reportData
      );
      showToast(`Thank you for your report. We will review obituary ID: ${obituaryId}`, "success");
  

      // Send the Reported-User message
      await addDoc(collection(db, "Messages"), reportedUserMessage)

      // Send the follow-up message
      await addDoc(collection(db, "Messages"), followUpMessage);











      
  } catch (error) {
      console.error("Error reporting obituary:", error);
      showToast("Failed to report obituary. Please try again later.", "error");
  }
}


