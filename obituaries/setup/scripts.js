  // Import Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import {  getFirestore, collection, doc, setDoc, updateDoc, getDoc, increment, arrayUnion, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
  import { 
    getAuth, signInAnonymously, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

  

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
const db = getFirestore(app);
const auth = getAuth(app);

let userID = '';

// Listen for authentication state changes to get the user ID

// Handle user authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // The user is signed in
     userID = user.uid;  // Use the user's unique ID
    console.log('User ID:', userID);

  }
});



// Assuming pageID is set somewhere on the page (like an element with ID "pageID")
const pageID = document.getElementById('pageID').innerText;






renderShareArea(pageURL, pageName);









// Reference the Firestore database
const form = document.getElementById("guestbookForm");
const entriesDiv = document.getElementById("guestbookEntries");

// Utility function to sanitize user inputs
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Add submit event listener to the form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get and sanitize form inputs
  const name = sanitizeInput(document.getElementById("guestName").value.trim());
  const message = sanitizeInput(document.getElementById("guestMessage").value.trim());

  if (name && message) {
    try {
      // Add the new guestbook entry to the Firestore collection
      const guestbookRef = collection(db, `A_Obituaries/${pageID}/Guestbook`);
      await addDoc(guestbookRef, {
        name,
        message,
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

// Initial load of guestbook entries
loadEntries();



// Function to add 1 to the flower count, animate, and update in Firestore
async function incrementFlowerCount() {
    const flowerCountElement = document.getElementById("flowerCount");
    let currentCount = parseInt(flowerCountElement.textContent, 10); // Get current count and convert to number
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
  
    // Update flower count in Firestore
    try {
      const docRef = doc(db, "A_Obituaries", pageID); // Replace `pageID` with the actual page ID variable
      await updateDoc(docRef, {
        flowerCount: currentCount // Update the flowerCount field in Firestore
      });
      console.log("Flower count updated successfully!");
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
      const docRef = doc(db, "A_Obituaries", pageID);
      await updateDoc(docRef, {
        views: increment(1)
      });
      console.log("View count updated successfully!");
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }
  
  // Increment views when the page loads
  incrementViews(pageID); // Replace `pageID` with the actual page ID variable

  




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
  
  // Add an event listener to the "Send Gift" button
  const sendGiftButton = document.getElementById("send-gift");
  sendGiftButton.addEventListener("click", showComingSoonPopup);
  


  