  
  
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
    getFirestore, collection, doc, setDoc, updateDoc, getDoc, increment, arrayUnion, addDoc, getDocs, serverTimestamp 
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





// Utility function to sanitize user inputs
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}




// Add the checkbox to the form
// const formContainer = document.getElementById("form-container"); // Assume this is your form's container


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



    const entriesDiv = document.getElementById("guestbookEntries");


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
  async function loadEntries() {
    try {

      console.log('pageID:', pageID);

      const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
      const querySnapshot = await getDocs(guestbookRef); // Fetch all documents

      const nameHeader = document.getElementById("name-header");
      const guestMessage = document.getElementById("guestMessage");

      // Extract the first part of the name before any space
      const firstName = nameHeader.textContent.split(" ")[0];
      
      // Replace [$Name$] with the first name in the placeholder text
      guestMessage.placeholder = guestMessage.placeholder.replaceAll("[$Name$]", firstName);
      
      


//giftPopup.innerHTML = giftPopup.innerHTML.replaceAll("[$NameFull$]", fullName);


      entriesDiv.innerHTML = ""; // Clear existing entries

querySnapshot.forEach((doc) => {
  const entry = doc.data();
  const sanitizedMessage = sanitizeInput(entry.message);
  const sanitizedName = sanitizeInput(entry.name);
  const timestamp = entry.timestamp;
  const postID = doc.id;
  console.log('entry:', entry);

  const timeAgo = timestamp ? timeSincePost(timestamp) : "Unknown time";
  
  if(entry.status =='active'){

  // Enhanced entry display
  entriesDiv.innerHTML += `
    <div class="entry" style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 8px; background: #f9f9f9;">
      <div class="guestbook-content">
        <strong style="font-size: 1.1em; color: #333;">${sanitizedName}</strong>
        <span style="font-size: 0.9em; color: #777;">${timeAgo}</span>
      </div>
      <div class="guestbook-message">${sanitizedMessage}</div>
    </div>
                ${entry.giftType ? `
            <div class='gifts'>
                <ul id="gifts-${postID}">
                    <!-- Gifts for this post will be injected here -->
                </ul>
            </div>
            ` : ""}
    `;
    if(entry.giftType){
      loadGiftsForPost(postID); 

    }
  }

});
    // Extract the first part of the name before any space
const fullName = nameHeader.textContent.trim().split(' ')[0];  // Get first name

renderGiftBoxArea(fullName);



    } catch (error) {
      console.error("Error loading guestbook entries:", error);
    }
  }

window.loadEntries = loadEntries;




// Function to load gifts for a guestbook post
async function loadGiftsForPost(postID) {
  const giftsRefs = collection(db, `A_Obituaries/${pageID}/Gifts-Transactions`);

 // const giftsRef = collection(db, "Guestbook", postID, "Gifts");
  const giftsSnapshot = await getDocs(giftsRefs);
  const giftsList = document.getElementById(`gifts-${postID}`);
  giftsList.innerHTML = "";  // Clear previous gifts

  giftsSnapshot.forEach(doc => {
      const giftData = doc.data();
      const giftItem = document.createElement("li");
      giftItem.textContent = `${giftData.name} - $${giftData.amount}`;
      giftsList.appendChild(giftItem);
  });
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



async function incrementViews() {
  try {
    const pageID = document.getElementById('pageID').innerText.trim();
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

    const pageDocSnapshot = await withTimeout(getDoc(pageRef), 5000);
    if (!pageDocSnapshot.exists()) {
      console.error("PageViewIPs document does not exist.");
      return;
    }

    const pageData = pageDocSnapshot.data();
    const mediaSection = document.getElementById("media-section");
    const videoUrl = pageData.videoURL;
    if (videoUrl) {
      displayVideoPreview(videoUrl, mediaSection);
    }

    document.getElementById("flowerCount").innerText = pageData.flowerCount || 0;
    const viewStart = viewStartTime || Date.now();
    const durationOfView = Math.floor((Date.now() - viewStart) / 1000); // View duration in seconds
    const source = getViewSource();
    const userAgent = navigator.userAgent;

    const updatePageData = {
      views: increment(1),
    };


    const updateUserData = {
      lastViewTime: serverTimestamp(),
      lastViewSource: source,
      lastViewDevice: userAgent,
      durationOfLastView: durationOfView,
      lastCity: locationData?.city || 'Unknown',
      lastState: locationData?.region || 'Unknown',
      lastCountry: locationData?.country || 'Unknown'
    };
    


    const ipDocRef = doc(ipCollectionRef, ipAddress);  
    const ipDocSnapshot = await withTimeout(getDoc(ipDocRef), 5000);
    if (ipDocSnapshot.exists()) {
      await withTimeout(updateDoc(pageRef, updatePageData), 5000);
      console.log("Updated general view count and details successfully.");
    } else {
      updatePageData.uniqueViews = increment(1);
      await withTimeout(updateDoc(pageRef, updatePageData), 5000);
      await withTimeout(setDoc(ipDocRef, updateUserData), 5000);
      console.log("Updated unique view and general view counts successfully.");
    }
  } catch (error) {
    console.error("Error updating view counts:", error);
  }
}

window.incrementViews = incrementViews;


// Open the Gift Popup
function openGiftPopup() {
  const giftPopup = document.getElementById("giftPopup");
  if (giftPopup) {
    giftPopup.style.display = "block";
  }
}

// Close the Gift Popup
function closeGiftPopup() {
  const giftPopup = document.getElementById("giftPopup");
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

if (amountToPay < 5) {
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
      alert('There was an error with your payment. Please try again.');
    }
  }).render('#paypal-button-container'); // Render the PayPal button inside the container
}
window.selectGift = selectGift;

// Handle payment success (save to Firestore)
async function handlePaymentSuccess(giftType, amountToPay, paymentDetails) {
  const giftsRefs = collection(db, `A_Obituaries/${pageID}/Gifts-Transactions`);

  // Add the transaction data to Firestore
  await addDoc(giftsRefs, {
    giftType: giftType,
    amount: amountToPay,
    paymentDetails: paymentDetails,
    status: "completed", // Set as completed after payment
    timestamp: serverTimestamp(),
  });

  // Optionally post the gift to the guestbook
  const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
  await addDoc(guestbookRef, {
   // name: name || "",
    giftType: giftType,
    message: `${giftType} gift of $${amountToPay} sent!`,
    status: "active",
    timestamp: serverTimestamp(),
  });

  // Add the PayPal transaction to the transactions collection
  const transcationsRefs = collection(db, `A_Transactions`, `Gift_${pageID}`);
  await addDoc(transcationsRefs, {
    giftType: giftType,
    pageID,
    url: `https://reelcareer.co/obituaries/celebrating/${pageName}`,
    pageName: pageName,
    paymentDetails: paymentDetails,
    amount: amountToPay,
    timestamp: serverTimestamp(),
  });
  

  // Load entries again after posting
  loadEntries();
}


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



  // Add an event listener to the "Send Flowers" button
  const sendFlowersButton = document.getElementById("send-flowers");
  sendFlowersButton.addEventListener("click", incrementFlowerCount);
  
  // Add an event listener to the "Send Gift" button
  const sendGiftButton = document.getElementById("send-gift");
  sendGiftButton.addEventListener("click", openGiftPopup);
  


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
        // YouTube Video Check
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
            const youtubeEmbed = videoUrl.includes("youtube.com") 
                ? videoUrl.replace("watch?v=", "embed/") 
                : videoUrl.replace("youtu.be/", "youtube.com/embed/");
            videoPreviewContainer.innerHTML = `
                <iframe class='media-video' width="560" height="315" src="${youtubeEmbed}" frameborder="0" allowfullscreen></iframe>`;
        }
        // Vimeo Video Check
        else if (videoUrl.includes("vimeo.com")) {
            const vimeoId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' src="https://player.vimeo.com/video/${vimeoId}" width="560" height="315" frameborder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
        // MP4 Video Check (and other formats like .webm, .ogg)
        else if (videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
            videoPreviewContainer.innerHTML = `
                <video  class='media-video' width="560" height="315" controls>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
        }
        // Dailymotion Video Check
        else if (videoUrl.includes("dailymotion.com")) {
            const dailymotionId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' frameborder="0" width="560" height="315" src="https://www.dailymotion.com/embed/video/${dailymotionId}" 
                        allowfullscreen></iframe>`;
        }
        // Twitch Video Check
        else if (videoUrl.includes("twitch.tv")) {
            const twitchId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' src="https://player.twitch.tv/?video=${twitchId}" height="315" width="560" frameborder="0" 
                        scrolling="no" allowfullscreen></iframe>`;
        }
        // Facebook Video Check
        else if (videoUrl.includes("facebook.com")) {
            const facebookId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${facebookId}" 
                        width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
        }
        // Instagram Video Check
        else if (videoUrl.includes("instagram.com")) {
            const instagramId = videoUrl.split("/p/").pop().split("/")[0];
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' src="https://www.instagram.com/p/${instagramId}/embed" width="560" height="315" frameborder="0" 
                        scrolling="no" allowfullscreen></iframe>`;
        }
        // Twitter Video Check
        else if (videoUrl.includes("twitter.com")) {
            const twitterId = videoUrl.split("/status/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' src="https://twitframe.com/show?url=${encodeURIComponent(twitterId)}" width="560" height="315" 
                        frameborder="0" allowfullscreen></iframe>`;
        }
        // TikTok Video Check
        else if (videoUrl.includes("tiktok.com")) {
            const tiktokId = videoUrl.split("/video/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe  class='media-video' src="https://www.tiktok.com/embed/${tiktokId}" width="560" height="315" frameborder="0" 
                        allowfullscreen></iframe>`;
        }
        // Unsupported platform message
        else {
            videoPreviewContainer.innerHTML = "<p>Unsupported video platform. Please enter a URL from a supported platform like YouTube, Vimeo, Dailymotion, Instagram, or MP4.</p>";
        }

    } else {
        // Handle case when there is no videoUrl provided
        videoPreviewContainer.innerHTML = "<p>Please enter a video URL.</p>";
    }
}



  
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



loadEntries();

// Increment views when the page loads
incrementViews(); // Replace `pageID` with the actual page ID variable
  

