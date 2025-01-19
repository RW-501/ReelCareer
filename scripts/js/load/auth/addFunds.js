

import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics, 
  googleProvider,onSnapshot ,  batch,
  facebookProvider,writeBatch ,
  getUserId // Export the function
  } from 'https://reelcareer.co/scripts/js/load/module.js';
  
  




// Create and insert the popup HTML structure
const fundsPopupOverlay = document.createElement('div');
fundsPopupOverlay.id = 'fundsPopup';
fundsPopupOverlay.style.display = 'none'; // Initially hidden
fundsPopupOverlay.innerHTML = `
  <div class="funds-popup">
    <div class="popup-header">
      <h2>Add Funds</h2>
      <button class="close-button" onclick="closeFundsPopup()">X</button>
    </div>
    <div id="funds-amount-area">
      <label for="fundAmount">Enter Amount to Add:</label>
      <input type="text" id="fundAmount" placeholder="$0.00">
      <button onclick="proceedToPayment()">Next</button>
    </div>
    <div id="payment-confirm-area" style="display: none;">
      <p id="fundPaymentInfo"></p>
      <div id="funds-paypal-button-container"></div>
      <button onclick="backToFundsAmount()">Back</button>
    </div>
  </div>
`;

document.body.appendChild(fundsPopupOverlay); // Append to the body

// Apply styles dynamically
const style = document.createElement('style');
style.innerHTML = `
  #fundsPopup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .funds-popup {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-button {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
  }
`;
document.head.appendChild(style); // Append styles to the head

// JavaScript functions
function openFundsPopup() {
  document.getElementById('fundsPopup').style.display = 'flex';
}

function closeFundsPopup() {
  document.getElementById('fundsPopup').style.display = 'none';
}

function proceedToPayment() {
  const fundAmountInput = document.getElementById('fundAmount').value.trim();
  let amountToAdd = parseFloat(fundAmountInput.replace(/[^\d.-]/g, ''));
  
  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    showToast('Please enter a valid amount.');
    return;
  }
  
  if (amountToAdd < 5) {
    showToast('The minimum deposit is $5.');
    return;
  }
  
  const serviceFee = 0.10 * amountToAdd;
  const netAmount = amountToAdd - serviceFee;

  document.getElementById('fundPaymentInfo').innerHTML = `
    You are adding $${amountToAdd.toFixed(2)}. 
    A service fee of $${serviceFee.toFixed(2)} will be deducted. 
    <p>Your net balance increase will be $${netAmount.toFixed(2)}.</p>
  `;
  
  document.getElementById('funds-amount-area').style.display = 'none';
  document.getElementById('payment-confirm-area').style.display = 'block';

  // Initialize PayPal Button
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amountToAdd.toFixed(2),
          }
        }]
      });
    },
    onApprove: async function(data, actions) {
      const details = await actions.order.capture();
      await addFundsToAccount(auth.currentUser.uid, amountToAdd);
      closeFundsPopup();
    },
    onError: function(err) {
      console.error('PayPal error:', err);
      showToast('There was an error with your payment. Please try again.');
    }
  }).render('#funds-paypal-button-container');
}

function backToFundsAmount() {
  document.getElementById('payment-confirm-area').style.display = 'none';
  document.getElementById('funds-amount-area').style.display = 'block';
}


window.openFundsPopup = openFundsPopup;