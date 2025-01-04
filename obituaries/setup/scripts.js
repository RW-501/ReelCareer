  
  
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
  


let userID = '';

document.addEventListener('DOMContentLoaded', () => {

// Handle user authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // The user is signed in
     userID = user.uid;  // Use the user's unique ID
    console.log('User ID:', userID);

  }
});

 });

// Assuming pageID is set somewhere on the page (like an element with ID "pageID")
const pageID = document.getElementById('pageID').innerText;
const pageName = document.getElementById('pageName').innerText;


console.log('pageID:', pageID);






renderShareArea(pageName);





// Utility function to sanitize user inputs
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}
document.addEventListener('DOMContentLoaded', () => {
  // Reference Firestore database and DOM elements
  const form = document.getElementById("guestbookForm");
  const entriesDiv = document.getElementById("guestbookEntries");
  const pageID = document.getElementById('pageID').innerText;
  const submitbtn = document.getElementById("submit-btn");

  // Event listener for the form submission
  submitbtn.addEventListener("click", async (e) => {

    console.log('submitbtn.addEventListener:');

    const name = sanitizeInput(document.getElementById("guestName").value.trim());
    const message = sanitizeInput(document.getElementById("guestMessage").value.trim());
    const userIP = await getUserIP(); // Fetch user IP address

    if (name && message) {
      try {
        const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
        await addDoc(guestbookRef, {
          name,
          message,
          userIP,
          timestamp: serverTimestamp(),
        });
        name = ''; // Clear the form inputs
        message = ''; // Clear the form inputs
        loadEntries(); // Refresh guestbook entries
      } catch (error) {
        console.error("Error adding guestbook entry:", error);
      }
    }
  });

  // Function to load guestbook entries
  async function loadEntries() {
    try {
      const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
      const querySnapshot = await getDocs(guestbookRef); // Fetch all documents

      entriesDiv.innerHTML = ""; // Clear existing entries
      querySnapshot.forEach((doc) => {
        const entry = doc.data();
        const sanitizedMessage = sanitizeInput(entry.message);
        const sanitizedName = sanitizeInput(entry.name);
        entriesDiv.innerHTML += `<div class="entry"><strong>${sanitizedName}</strong>: ${sanitizedMessage}</div>`;
      });
    } catch (error) {
      console.error("Error loading guestbook entries:", error);
    }
  }

  // Load entries initially on page load
  loadEntries();
});

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
  console.log('pageID:', pageID);
  console.log('currentCount:', currentCount);

  // Firestore references
  const docRef = doc(db, "A_Obituaries", pageID); // Reference to the specific obituary document

  try {
    const userIP = await getUserIP(); // Fetch the user's IP
    console.log('userIP:', userIP);

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
      console.log("User has already added a flower.");
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




async function incrementViews() {
  const pageID = document.getElementById('pageID').innerText;
  console.log('incrementViews:');
  const pageRef = doc(db, "A_Obituaries", pageID); // Document reference for the page
  console.log('pageID:', pageID);

  try {
    const userIP = await getUserIP(); // Fetch the user's IP
    console.log('userIP:', userIP);

    // Check if the page document exists
    const pageDocSnapshot = await withTimeout(getDoc(pageRef), 5000); // Timeout after 5 seconds
    if (!pageDocSnapshot.exists()) {
      console.error("Page document does not exist.");
      return; // Exit if the page document doesn't exist
    }

    // Correctly reference the subcollection
    const ipCollectionRef = collection(doc(db, "A_Obituaries", pageID), "PageViewIPs"); // Subcollection for tracking IPs
    const ipDocRef = doc(ipCollectionRef, userIP); // Use IP address as the document ID
    console.log('ipDocRef:', ipDocRef);

    // Check if the IP is already recorded
    const ipDocSnapshot = await withTimeout(getDoc(ipDocRef), 5000); // Timeout after 5 seconds
    console.log('ipDocSnapshot:', ipDocSnapshot);

    if (ipDocSnapshot.exists()) {
      // Increment only the general views count
      await withTimeout(updateDoc(pageRef, {
        views: increment(1) // Increment general view count
      }), 5000); // Timeout after 5 seconds
      console.log("General view count updated successfully!");
    } else {
      // Increment both views and uniqueViews counts
      await withTimeout(updateDoc(pageRef, {
        views: increment(1),
        uniqueViews: increment(1)
      }), 5000); // Timeout after 5 seconds

      // Record the IP in the subcollection
      await withTimeout(setDoc(ipDocRef, { timestamp: serverTimestamp() }), 5000); // Timeout after 5 seconds
      console.log("Unique view and general view counts updated successfully!");
    }
  } catch (error) {
    console.error("Error updating view counts:", error);
  }
}

window.incrementViews = incrementViews;




// Function to create and display the popup
function showComingSoonPopup() {

    console.log("showComingSoonPopup");
    // Create the popup container
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.borderRadius = "10px";
    popup.style.zIndex = "1000";
    popup.style.textAlign = "center";
  
    // Create the message
    const message = document.createElement("p");
    message.textContent = "Coming Soon!";
    message.style.marginBottom = "20px";
    message.style.fontSize = "16px";
    message.style.color = "#333";
  
    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.padding = "10px 20px";
    closeButton.style.border = "none";
    closeButton.style.backgroundColor = "#007BFF";
    closeButton.style.color = "#fff";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "14px";
  
    // Add click event to close button
    closeButton.addEventListener("click", () => {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
    });
  
    // Add elements to the popup
    popup.appendChild(message);
    popup.appendChild(closeButton);
  
    // Create an overlay to dim the background
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";
  
    // Add popup and overlay to the body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  }
  
  window.showComingSoonPopup = showComingSoonPopup;




    console.log("DOMContentLoaded sendFlowersButton:");


  // Add an event listener to the "Send Flowers" button
  const sendFlowersButton = document.getElementById("send-flowers");
  sendFlowersButton.addEventListener("click", incrementFlowerCount);
  
  // Add an event listener to the "Send Gift" button
  const sendGiftButton = document.getElementById("send-gift");
  sendGiftButton.addEventListener("click", showComingSoonPopup);
  


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
                <iframe width="560" height="315" src="${youtubeEmbed}" frameborder="0" allowfullscreen></iframe>`;
        }
        // Vimeo Video Check
        else if (videoUrl.includes("vimeo.com")) {
            const vimeoId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe src="https://player.vimeo.com/video/${vimeoId}" width="560" height="315" frameborder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
        // MP4 Video Check (and other formats like .webm, .ogg)
        else if (videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
            videoPreviewContainer.innerHTML = `
                <video width="560" height="315" controls>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
        }
        // Dailymotion Video Check
        else if (videoUrl.includes("dailymotion.com")) {
            const dailymotionId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe frameborder="0" width="560" height="315" src="https://www.dailymotion.com/embed/video/${dailymotionId}" 
                        allowfullscreen></iframe>`;
        }
        // Twitch Video Check
        else if (videoUrl.includes("twitch.tv")) {
            const twitchId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe src="https://player.twitch.tv/?video=${twitchId}" height="315" width="560" frameborder="0" 
                        scrolling="no" allowfullscreen></iframe>`;
        }
        // Facebook Video Check
        else if (videoUrl.includes("facebook.com")) {
            const facebookId = videoUrl.split("/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${facebookId}" 
                        width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
        }
        // Instagram Video Check
        else if (videoUrl.includes("instagram.com")) {
            const instagramId = videoUrl.split("/p/").pop().split("/")[0];
            videoPreviewContainer.innerHTML = `
                <iframe src="https://www.instagram.com/p/${instagramId}/embed" width="560" height="315" frameborder="0" 
                        scrolling="no" allowfullscreen></iframe>`;
        }
        // Twitter Video Check
        else if (videoUrl.includes("twitter.com")) {
            const twitterId = videoUrl.split("/status/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe src="https://twitframe.com/show?url=${encodeURIComponent(videoUrl)}" width="560" height="315" 
                        frameborder="0" allowfullscreen></iframe>`;
        }
        // TikTok Video Check
        else if (videoUrl.includes("tiktok.com")) {
            const tiktokId = videoUrl.split("/video/").pop();
            videoPreviewContainer.innerHTML = `
                <iframe src="https://www.tiktok.com/embed/${tiktokId}" width="560" height="315" frameborder="0" 
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



    const mediaSection = document.getElementById("media-section");
    const videoUrl = mediaSection.innerText;

    displayVideoPreview(videoUrl, mediaSection);








// Increment views when the page loads
incrementViews(); // Replace `pageID` with the actual page ID variable
  
  