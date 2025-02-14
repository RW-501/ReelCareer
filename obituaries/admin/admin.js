
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

// Listen for authentication state changes to get the user ID

// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Set a timeout of 1 second before handling authentication state change
  setTimeout(() => {
    // Handle user authentication state change
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // The user is signed in
        const userID = user.uid;  // Use the user's unique ID
        console.log('User ID:', userID);
      } else {
        console.log('No user is signed in.');
      }
    });
  }, 1000);  // 1-second delay
});


// obituaries.js
async function fetchObituaries() {
    try {
      const snapshot = await getDocs(collection(db, "A_Obituaries"));  // Fetch all documents from the A_Obituaries collection
      const obituaryList = document.getElementById("obituary-list");   // Target the obituary list table or container
      console.log("fetchObituaries", snapshot.docs);  // Log the snapshot for debugging
      
      snapshot.forEach(doc => {
        const data = doc.data();  // Get document data
        const row = document.createElement("tr");  // Create a table row element
        
              console.log("data",data);

        row.innerHTML = `
          <td>${data.name}</td>
          <td>${data.category}</td>
          <td>${data.location}</td>
          <td>${data.views}</td>
          <td><a href="${data.url}" target="_blank">View</a></td>
        `;
        
        obituaryList.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching obituaries: ", error);
    }
  }
  
  window.fetchObituaries = fetchObituaries;


  // analytics.js
async function fetchAnalytics() {
    try {
      const snapshot = await getDocs(collection(db, "A_Ob_Analytics"));
      const analyticsList = document.getElementById("analytics-list");
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const row = document.createElement("tr");
        
        row.innerHTML = `
          <td>${data.pageTitle}</td>
          <td>${data.totalPageViews}</td>
          <td>${data.lastPageViewed.toDate().toLocaleString()}</td>
          <td>${data.lastReferral}</td>
        `;
        
        analyticsList.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching analytics: ", error);
    }
  }
  

  window.fetchAnalytics = fetchAnalytics;


  // transactions.js
async function fetchTransactions() {
    try {
      const snapshot = await getDocs(collection(db, "A_Obituaries"));
      const transactionList = document.getElementById("transaction-list");
  
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.paymentDetails && data.paymentDetails.captures) {
          data.paymentDetails.captures.forEach(payment => {
            const row = document.createElement("tr");
  
            row.innerHTML = `
              <td>${data.id}</td>
              <td>${payment.amount.value} ${payment.amount.currency_code}</td>
              <td>${data.paymentDetails.payer.name.given_name} ${data.paymentDetails.payer.name.surname}</td>
              <td>${payment.status}</td>
              <td><a href="${data.paymentDetails.links[0].href}" target="_blank">View</a></td>
            `;
  
            transactionList.appendChild(row);
          });
        }
      });
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  }
  
  window.fetchTransactions = fetchTransactions;
  

  export {
    fetchTransactions, fetchAnalytics, fetchObituaries
    
    
    // Export the function
  };