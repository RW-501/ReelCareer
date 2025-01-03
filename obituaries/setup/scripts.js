  
  
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


console.log('pageID:', pageID);











// Reference the Firestore database
const form = document.getElementById("guestbookForm");
const entriesDiv = document.getElementById("guestbookEntries");

// Utility function to sanitize user inputs
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}


  
  // Event listener for the form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Get and sanitize form inputs
    const name = sanitizeInput(document.getElementById("guestName").value.trim());
    const message = sanitizeInput(document.getElementById("guestMessage").value.trim());
    const userIP = await getUserIP(); // Fetch the user's IP
  
    if (name && message) {
      try {
        // Add the new guestbook entry to the Firestore collection
        const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
        await addDoc(guestbookRef, {
          name,
          message,
          userIP, // Include the user's IP
          timestamp: serverTimestamp(), // Optional timestamp
        });
        loadEntries(); // Reload the entries after submission
      } catch (error) {
        console.error("Error adding guestbook entry:", error);
      }
    }
  });
  
// Function to load guestbook entries
async function loadEntries() {
  try {
    const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
    const querySnapshot = await getDocs(guestbookRef);

    entriesDiv.innerHTML = ""; // Clear the existing entries

    // Loop through all entries and display them
    querySnapshot.forEach((doc) => {
      const entry = doc.data();
      const sanitizedMessage = sanitizeInput(entry.message); // Sanitize messages before displaying
      const sanitizedName = sanitizeInput(entry.name); // Sanitize names before displaying
      entriesDiv.innerHTML += `<div class="entry"><strong>${sanitizedName}</strong>: ${sanitizedMessage}</div>`;
    });
  } catch (error) {
    console.error("Error loading guestbook entries:", error);
  }
}
window.loadEntries = loadEntries;




// Function to add 1 to the flower count, animate, and update in Firestore
async function incrementFlowerCount() {
    const flowerCountElement = document.getElementById("flowerCount");
    let currentCount = parseInt(flowerCountElement.textContent, 10); // Get current count and convert to number
    const userIP = await getUserIP(); // Fetch the user's IP
  
    // Firestore references
    const docRef = doc(db, "A_Obituaries", pageID); // Replace `pageID` with the actual page ID variable
    const ipCollectionRef = collection(docRef, "FlowerIPs"); // Subcollection to track IPs
  
    try {
      // Check if the IP is already recorded
      const ipDocRef = doc(ipCollectionRef, userIP); // Use IP address as the document ID
      const ipDocSnapshot = await getDoc(ipDocRef);
  
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
      await updateDoc(docRef, {
        flowerCount: currentCount // Update the flowerCount field in Firestore
      });
  
      // Record the IP in the subcollection
      await setDoc(ipDocRef, { timestamp: serverTimestamp() });
  
      console.log("Flower count updated successfully and IP recorded!");
    } catch (error) {
      console.error("Error updating flower count:", error);
    }
  }
  
  // Add an event listener to the "Send Flowers" button
  const sendFlowersButton = document.getElementById("send-flowers");
  sendFlowersButton.addEventListener("click", incrementFlowerCount);
  
  // Function to increment views (for reference)
  async function incrementViews(pageID) {
    try {
      const userIP = await getUserIP(); // Fetch the user's IP
      const pageRef = doc(db, "A_Obituaries", pageID);
      const ipCollectionRef = collection(pageRef, "PageViewIPs"); // Subcollection for tracking IPs
      const ipDocRef = doc(ipCollectionRef, userIP); // Use IP address as the document ID
  
      // Check if the IP is already recorded
      const ipDocSnapshot = await getDoc(ipDocRef);
  
      if (ipDocSnapshot.exists()) {
        // Increment only the general views count
        await updateDoc(pageRef, {
          views: increment(1)
        });
        console.log("General view count updated successfully!");
      } else {
        // Increment both views and uniqueViews counts
        await updateDoc(pageRef, {
          views: increment(1),
          uniqueViews: increment(1)
        });
  
        // Record the IP in the subcollection
        await setDoc(ipDocRef, { timestamp: serverTimestamp() });
  
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

  // Add an event listener to the "Send Gift" button
  const sendGiftButton = document.getElementById("send-gift");
  sendGiftButton.addEventListener("click", showComingSoonPopup);
  


  document.addEventListener('DOMContentLoaded', () => {


    renderShareArea(pageURL, pageName);



// Initial load of guestbook entries
loadEntries();

// Increment views when the page loads
incrementViews(pageID); // Replace `pageID` with the actual page ID variable
  
  });