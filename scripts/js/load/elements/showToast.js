let toastNumber = 0;
let toastQueue = []; // Queue to manage toast sequence (array instead of set for order)
let activeToasts = new Set(); // Set to track active toasts

let createTosatBool = false;

function showToast(message, type = 'info', duration = 3500,
    link = null, confirm = false, linkTitle = 'Click Here', progress = null) {
  const toastId = `toast_${toastNumber}`;
  let toastKey = `${type}_${message}`; // Key to identify duplicate toasts

  // Check if the toast already exists in active toasts
  if (activeToasts.has(toastKey) || toastQueue.length > 0 || document.querySelector('.mainShowToast')) {
    console.log("Maximum capacity reached or duplicate toast detected. Not adding new content.");
    console.log("Current toastKey:", toastKey);

    // Add the toast to toastQueue (if not duplicate)
    if (!activeToasts.has(toastKey)) {
      toastQueue.push({ message, type, duration, link, confirm, linkTitle, progress });
    }
    createTosatBool = false;
  
  }else {
    createTosatBool = true;
  }

  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = "mainShowToast";
  toastNumber += 1;

  // Add the toast to active toasts set
  activeToasts.add(toastKey);

  // Accessibility (Screen Readers)
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('duration', duration);
  toast.setAttribute('type', type);
  toast.setAttribute('message', message);
  toast.setAttribute('link', link);
  toast.setAttribute('confirm', confirm);
  toast.setAttribute('linkTitle', linkTitle);
  toast.setAttribute('progress', progress);

  // Styling for the toast
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 18px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  toast.style.color = '#fff';
  toast.style.zIndex = '9999';
  toast.style.fontFamily = 'Arial, sans-serif';
  toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease, bottom 0.3s ease';

  // Fade-in effect
  toast.style.transform = 'translateY(20px)';
  toast.style.opacity = 1;

  const icon = type === 'error'  
  ? '<i class="fas fa-exclamation-circle" style="color: white; font-size: 28px;"></i>' 
  : type === 'success' 
    ? '<i class="fas fa-check-circle" style="color: white; font-size: 28px;"></i>' 
    : type === 'warning' 
      ? '<i class="fas fa-exclamation-triangle" style="color: white; font-size: 28px;"></i>' 
      : type === 'notification'
      ? '<i class="fas fa-bell" style="color: white; font-size: 28px;"></i>'
      : '<i class="fas fa-info-circle" style="color: white; font-size: 28px;"></i>';

switch (type) {
case 'success':
  toast.style.backgroundColor = '#4CAF50';
  break;
case 'error':
  toast.style.backgroundColor = '#F44336';
  break;
case 'info':
  toast.style.backgroundColor = '#2196F3';
  break;
case 'warning':
  toast.style.backgroundColor = '#FF9800';
  break;
case 'notification':
  toast.style.backgroundColor = '#FFEB3B'; // Yellow for notifications
  break;
default:
  toast.style.backgroundColor = '#2196F3'; // Default blue for info
  break;
}


  if (link) {
    message = `${message} <a href="${link}" target="_blank" style="color: #fff; text-decoration: underline;">${linkTitle}</a>`;
  }

  let progressBarHTML = '';
  if (progress !== null) {
    progressBarHTML = `
      <div style="width: 100%; background: rgba(255, 255, 255, 0.3); border-radius: 4px; margin-top: 8px;">
        <div id="toastProgressBar" style="height: 4px; width: 0%; background: white; border-radius: 4px;"></div>
      </div>
    `;
  }

  toast.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-icons" style="color: white; font-size: 28px;">${icon}</span>
        <span style="font-size: 16px; font-weight: 500;">${message}</span>
        ${progressBarHTML}
      </div>
      ${confirm ? 
        `<button onclick="dismissToast(this)" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">Confirm</button>` : 
        `<button onclick="dismissToast(this)" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">&times;</button>`
      }
    </div>
  `;

  if(createTosatBool){
    document.body.appendChild(toast);

 
  // Automatically fade-out and remove the toast if not a confirmation toast
  if (!confirm) {
    setTimeout(() => {
      toast.style.opacity = 0;
      toast.style.transform = 'translateY(20px)';
      toast.classList.add('fade-out');
      toast.style.bottom = '-50px';
    }, duration);

    setTimeout(() => {
      toast.remove();
      activeToasts.delete(toastKey); // Remove from activeToasts
      processNextToast(); // Process next toast in the queue
    }, duration + 300); // Allow time for fade-out animation
  }
}


}
window.showToast = showToast;

// Process the next toast in the queue
function processNextToast() {
  if (toastQueue.length > 0) {
    const nextToast = toastQueue.shift();
    showToast(nextToast.message, nextToast.type, nextToast.duration, nextToast.link, nextToast.confirm, nextToast.linkTitle, nextToast.progress);
  }
}


function dismissToast(button) {
  const toast = button.closest('.mainShowToast');
  if (toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
      activeToasts.delete(toast.id); // Make sure to remove from active toasts
      processNextToast(); // Process next toast in the queue
    }, 300);
  }
}
window.dismissToast = dismissToast;

  // Example usage: Replace alerts with showToast
  // showToast('This is a success message!', 'success');
  // showToast('This is an error message!', 'error');
  // showToast('This is an info message!', 'info');
  // showToast('This is a warning message!', 'warning');
  
  
  /**
   * Function to show a "Saved" message and fade the button out after a specified delay
   * @param {string} buttonId - The ID of the button element to update and hide
   * @param {string} message - The message to display on the button
   * @param {number} [delay=1000] - The delay (in milliseconds) before the fade effect starts (default is 1000ms)
   */
  function showMessageAndFadeBtn(buttonId, message, delay = 1000) {
    const btn = document.getElementById(buttonId);
  
    if (!btn) {
      console.error("Button with the specified ID not found.");
      return;
    }
  
    // Set the text of the button to the provided message
    btn.innerText = message;
  
    // Apply delay before starting the fade-out effect
    setTimeout(function() {
      btn.style.transition = "opacity 1s"; // Apply smooth fade transition
      btn.style.opacity = 0; // Fade the button out
  
      // After the fade-out, hide the button completely
      setTimeout(function() {
        btn.style.display = "none";
      }, 1000); // Wait for the fade-out effect to complete before hiding the button
    }, delay); // Delay before starting the fade effect
  }
  
  window.showMessageAndFadeBtn = showMessageAndFadeBtn;
  
  


  // General function to listen to Firestore events and show toast notifications
function listenForFirestoreEvents(collectionName, eventType) {
  const collectionRef = collection(db, collectionName); // Reference to the collection

  // Listener for collection changes
  onSnapshot(collectionRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' && eventType === 'new') {
        // New item added, trigger toast
        if (collectionName === 'Jobs') {
          showToast(`New job posted: ${change.doc.data().title}`);
        } else if (collectionName === 'Users') {
          showToast(`New member joined: ${change.doc.data().username}`);
        }
        // Add more collection-specific logic as needed

      } else if (change.type === 'modified' && eventType === 'update') {
        // Item updated, trigger toast
        if (collectionName === 'Jobs') {
          showToast(`Job updated: ${change.doc.data().title}`);
        } else if (collectionName === 'Users') {
          showToast(`Member updated: ${change.doc.data().username}`);
        }
        // Add more collection-specific logic as needed

      } else if (change.type === 'removed' && eventType === 'remove') {
        // Item removed, trigger toast
        if (collectionName === 'Jobs') {
          showToast(`Job removed: ${change.doc.data().title}`);
        } else if (collectionName === 'Users') {
          showToast(`Member removed: ${change.doc.data().username}`);
        }
        // Add more collection-specific logic as needed
      }
    });
  });
}
/*
// Example usage:
listenForFirestoreEvents('Jobs', 'new'); // For new job posts
listenForFirestoreEvents('Users', 'new'); // For new members
listenForFirestoreEvents('Jobs', 'update'); // For job updates
listenForFirestoreEvents('Users', 'update'); // For member updates
listenForFirestoreEvents('Jobs', 'remove'); // For job removals
*/
