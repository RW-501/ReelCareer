



function showToast(message, type = 'info', duration = 3500, link = null, confirm = false) {
    const toast = document.createElement('div');
    
    // Accessibility (Screen Readers)
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
  
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
    toast.style.opacity = '0';
  
    // Add dynamic styling for toast types
    switch (type) {
      case 'success':
        toast.style.backgroundColor = '#4CAF50'; // Green for success
        break;
      case 'error':
        toast.style.backgroundColor = '#F44336'; // Red for error
        break;
      case 'info':
        toast.style.backgroundColor = '#2196F3'; // Blue for info
        break;
      case 'warning':
        toast.style.backgroundColor = '#FF9800'; // Orange for warning
        break;
      default:
        toast.style.backgroundColor = '#2196F3'; // Default to info
    }
  
    // Structure toast message and buttons
    toast.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-icons" style="color: white; font-size: 28px;">${type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info'}</span>
          <span style="color: white; font-size: 16px; font-weight: 500;">${message}</span>
        </div>
        ${confirm ? `
          <button onclick="dismissToast(this)" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">Confirm</button>
        ` : `
          <button onclick="dismissToast(this)" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">&times;</button>
        `}
      </div>
    `;
  
    // Format message with link if applicable
    const formattedMessage = message.replace(
      /@\[(.+?)\]/g,
      `<a href="${link}" target="_blank" style="color: #fff; text-decoration: underline;">$1</a>`
    );
    toast.innerHTML = formattedMessage;
  
    // Append the toast to the body
    document.body.appendChild(toast);
  
    // Fade-in effect
    setTimeout(() => {
      toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
      toast.style.bottom = '20px';
    }, 10);
  
    // Automatically fade-out and remove the toast if not a confirmation toast
    if (!confirm) {
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.classList.add('fade-out'); // Add fade-out effect
        toast.style.bottom = '-50px'; // Toast goes out of view
      }, duration); // Toast disappears after specified duration
  
      // Remove toast from DOM after animation
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, duration + 300); // Allow 0.3s for fade-out animation
    }
  }
  
  // Function to dismiss toast manually
  function dismissToast(button) {
    const toast = button.closest('.toast');
    if (toast) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => {
        toast.parentNode.removeChild(toast);
      }, 300);
    }
  }
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
