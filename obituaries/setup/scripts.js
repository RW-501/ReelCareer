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





renderShareArea(pageURL, pageName);







// Get references to the form and the entries div
const form = document.getElementById("guestbookForm");
const entriesDiv = document.getElementById("guestbookEntries");

// Add submit event listener to the form
form.addEventListener("submit", async (e) => {
e.preventDefault();

// Get form inputs
const name = document.getElementById("guestName").value.trim();
const message = document.getElementById("guestMessage").value.trim();

if (name && message) {
// Add the new guestbook entry to the Firestore collection
await db.collection(`A_Obituaries/${pageID}/Guestbook`).add({
    name,
    message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Optional timestamp
});
loadEntries(); // Reload the entries after submission
}
});

// Function to load guestbook entries
async function loadEntries() {
const querySnapshot = await db.collection(`A_Obituaries/${pageID}/Guestbook`).get();
entriesDiv.innerHTML = ""; // Clear the existing entries

// Loop through all entries and display them
querySnapshot.forEach((doc) => {
const entry = doc.data();
entriesDiv.innerHTML += `<div class="entry"><strong>${entry.name}</strong>: ${entry.message}</div>`;
});
}

// Load the guestbook entries when the page loads
loadEntries();
