
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

// Handle user authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // The user is signed in
     userID = user.uid;  // Use the user's unique ID
    console.log('User ID:', userID);

  }
});


// obituaries.js
async function fetchObituaries() {
    try {
      const snapshot = await getDocs(collection(db, "A_Obituaries"));
      const obituaries = snapshot.docs();
      const obituaryList = document.getElementById("obituary-list");
      
      obituaries.forEach(doc => {
        const data = doc.data();
        const row = document.createElement("tr");
        
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