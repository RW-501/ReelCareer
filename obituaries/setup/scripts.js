  // Import Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
  import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";


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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Assuming pageID is set somewhere on the page (like an element with ID "pageID")
const pageID = document.getElementById('pageID').innerText;

incrementViews(pageID);


  // Function to increment views
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