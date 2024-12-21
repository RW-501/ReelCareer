

const userDataSaved = getUserData() || [];

// Initialize the toggle states based on local storage values or default
let isTextToVoiceOn = userDataSaved.textToVoice || false;
let isVoiceToTextOn = userDataSaved.voiceToText || false;

let recognition; // SpeechRecognition instance
const speechSynthesis = window.speechSynthesis;
let utterance;

// TEXT TO VOICE TOGGLE FUNCTION
function toggleTextToVoice() {
    const button = document.getElementById("textToVoiceBtn");

    if (!isTextToVoiceOn) {
        // Set the utterance and speak the text (this is an example)
        speechSynthesis.speak(utterance);

        button.innerHTML = '<i id="textVoiceIcon" class="fas fa-volume-mute"></i>';
        isTextToVoiceOn = true;
        button.style.color = "#003366"; // Dark Blue
        button.setAttribute("aria-pressed", "true");

        // Event: Update button after speaking ends
        utterance.onend = () => {
            isTextToVoiceOn = false;
            button.innerHTML = '<i id="textVoiceIcon" class="fas fa-volume-up"></i>';
            button.setAttribute("aria-pressed", "false");
            button.style.color = "#FFFFFF"; // White color
        };

   
    } else {
        // Stop speaking
        window.speechSynthesis.cancel();
        isTextToVoiceOn = false;
        button.innerHTML = '<i id="textVoiceIcon" class="fas fa-volume-up"></i>';
        button.setAttribute("aria-pressed", "false");
        button.style.color = "#FFFFFF"; // White color


    }

    const userData = {

      textToVoice: isTextToVoiceOn
    
    };
    const userDataEcode = setUserData(userData);

    localStorage.setItem('userData', userDataEcode);


}

// VOICE TO TEXT TOGGLE FUNCTION
function toggleVoiceToText() {
    const button = document.getElementById("voiceToTextBtn");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        showToast("Sorry, your browser does not support Speech Recognition.");
        return;
    }

    if (!isVoiceToTextOn) {
        // Start listening
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            document.getElementById("chat-input").innerText = transcript;
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.start();
        button.innerHTML = '<i id="voiceTextIcon" class="fas fa-microphone-slash"></i> ';
        isVoiceToTextOn = true;
        button.setAttribute("aria-pressed", "true");
        button.style.color = "#003366"; // Dark Blue

       

        console.log("Voice recognition started...");
    } else {
        // Stop listening
        if (recognition) {
            recognition.stop();
        }
        button.innerHTML = '<i id="voiceTextIcon" class="fas fa-microphone"></i> ';
        isVoiceToTextOn = false;
        button.setAttribute("aria-pressed", "false");
        button.style.color = "#FFFFFF"; // White color


        console.log("Voice recognition stopped.");
    }

    
    const userData = {

      voiceToText: isVoiceToTextOn
    
    };
    const userDataEcode = setUserData(userData);

    localStorage.setItem('userData', userDataEcode);
}

let allQuestions = [];

// Fetch the structured JSON from the /chat_bot.json file
// Fetch the structured JSON from the /chat_bot.json file




function loadChatbot() {
  // Create Chatbot Button
// Create the chatbot button
const chatButton = document.createElement("button");
chatButton.id = "chatbot-button";
chatButton.innerText = "Chat with us";

// Initial button styles
chatButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
        background: linear-gradient(45deg, #8fc0dc, #b2d1e3);
        font-family: sans-serif;
color: white;
    border: solid rgb(106 220 238 / 23%);
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease; /* Smooth transition for hover effects */
    z-index: 1000;
`;

// Add hover effects
chatButton.addEventListener("mouseover", () => {
  chatButton.style.backgroundColor = "#6e97db"; // Darker blue for hover
  chatButton.style.transform = "scale(1.05)"; // Slightly scale up
});

chatButton.addEventListener("mouseout", () => {
  chatButton.style.backgroundColor = "#84adea"; // Original color
  chatButton.style.transform = "scale(1)"; // Reset scale
});

// Add active effects (when button is clicked)
chatButton.addEventListener("mousedown", () => {
  chatButton.style.backgroundColor = "#5a82c2"; // Even darker blue for click
  chatButton.style.transform = "scale(0.95)"; // Slightly shrink button
});

chatButton.addEventListener("mouseup", () => {
  chatButton.style.backgroundColor = "#6e97db"; // Back to hover state
  chatButton.style.transform = "scale(1.05)";
});



  // Create Chatbot Panel
// Create the chat panel
const chatPanel = document.createElement("div");
chatPanel.id = "chatbot-panel";
chatPanel.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  display: none; /* Hidden initially */
  flex-direction: column;
  z-index: 9999;
  transition: all 0.3s ease; /* Smooth transition for resizing */
`;

// Function to resize panel based on screen width
function resizeChatPanel() {
  if (window.innerWidth <= 768) { // For mobile screens
    chatPanel.style.width = "90vw"; // 90% of viewport width
    chatPanel.style.height = "80vh"; // 80% of viewport height
    chatPanel.style.bottom = "10px"; // Adjust positioning
    chatPanel.style.right = "10px";
    chatPanel.style.borderRadius = "5px";
  } else { // For larger screens
    chatPanel.style.width = "350px";
    chatPanel.style.height = "400px";
    chatPanel.style.bottom = "20px";
    chatPanel.style.right = "20px";
    chatPanel.style.borderRadius = "8px";
    chatPanel.style.height = "80vh";
  }
}

// Function to replace main content with chatbot if the page is /bot

// Append the chat panel to the body
document.body.appendChild(chatPanel);

  chatPanel.innerHTML = `
 <div style="background-color: #84adea;color: white;padding: 10px;text-align: center;height: 3rem;display: flex;flex-direction: row;flex-wrap: wrap;align-content: flex-start;justify-content: space-between;align-items: center;">
<a href="https://reelcareer.co/bot" aria-label="ReelCareer Chatbot" style="color: white; text-decoration: none;">
  <strong>ReelCareer Chatbot</strong>
</a>

<div class="closeArea" style="
    margin-right: 1.5rem;
">

  <!-- Fullscreen Toggle Button -->
    <button id="toggleFullscreenBtn" 
            aria-label="Toggle Chatbot Fullscreen" 
            aria-pressed="false" 
            style="background-color: transparent; margin-bottom: .5rem; color: white; border: none; margin-right: .5rem; border-radius: 4px; cursor: pointer;">
        <i id="fullscreenIcon" class="fas fa-expand"></i>
    </button>
          <button id="close-chat" style=" font-family: sans-serif; background: none;border: none;color: #ffffff;cursor: pointer;font-size: x-large;padding: 0;margin: 0;">×</button>
      </div>
      </div>

      <div id="chatbot-messages" style="text-align: center;overflow-y: scroll;margin: auto;display: block;font-family: sans-serif;height: 80vh;"></div>
      <div style="padding: 10px; border-top: 1px solid #ddd;">
          <div id="chat-input" contenteditable="true" style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; min-height: 40px;"></div>
         
<div class="chatControls" style="display: flex; gap: 10px; margin-top: 10px;">
    <!-- Voice-to-Text Button -->
    <button id="voiceToTextBtn" 
            aria-label="Activate Voice-to-Text" 
            aria-pressed="false" 
            style="background-color: #84adea; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
        <i id="voiceTextIcon" class="fas fa-microphone"></i>
    </button>

    <!-- Text-to-Voice Button -->
    <button id="textToVoiceBtn" 
            aria-label="Activate Text-to-Voice" 
            aria-pressed="false" 
            style="background-color: #84adea; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
        <i id="textVoiceIcon" class="fas fa-volume-up"></i>
    </button>

    <!-- Send Button -->
    <button id="send-chat" 
            aria-label="Send Message" 
            style="margin-top: 0; width: 100%; background-color: #84adea; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer;">
        Send
    </button>
</div>

          </div>
  `;

  // Append to Body
  document.body.appendChild(chatButton);
  document.body.appendChild(chatPanel);

 // Function to toggle fullscreen state of the chatbot panel
function toggleChatbotFullscreen() {
  const chatbotPanel = document.getElementById('chatbot-panel');
  const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');
  
  // Check if the panel is already in fullscreen mode
  const isFullscreen = chatbotPanel.style.height === '100vh'; // Fullscreen height

  if (isFullscreen) {
    // If it's fullscreen, set it back to normal size
    chatbotPanel.style.position = "fixed"; // Reset position (e.g., relative or initial)
    chatbotPanel.style.top = 'initial';
    chatbotPanel.style.bottom = '20px';
    chatbotPanel.style.right = '20px';
    chatbotPanel.style.left = 'initial';
    chatbotPanel.style.height = '80vh'; // Reset to original height
    chatbotPanel.style.width = '350px'; // Reset to original width
    
    // Optionally, reset other properties like margin, padding, etc.
    // chatbotPanel.style.margin = "initial";
    // chatbotPanel.style.padding = "initial";

    toggleFullscreenBtn.setAttribute('aria-pressed', 'false'); // Update ARIA attribute
    document.getElementById('fullscreenIcon').classList.replace('fa-compress', 'fa-expand'); // Change icon back
  } else {
    // If it's not fullscreen, make it fullscreen
    chatbotPanel.style.position = "fixed"; // Position it absolutely
    chatbotPanel.style.top = 0;
    chatbotPanel.style.bottom = 0;
    chatbotPanel.style.right = 0;
    chatbotPanel.style.left = 0;
    chatbotPanel.style.height = '100vh'; // Fullscreen height
    chatbotPanel.style.width = '100vw'; // Fullscreen width
    chatbotPanel.style.zIndex = 9999;
    chatbotPanel.style.padding = '1rem 0'

    toggleFullscreenBtn.setAttribute('aria-pressed', 'true'); // Update ARIA attribute
    document.getElementById('fullscreenIcon').classList.replace('fa-expand', 'fa-compress'); // Change icon to indicate fullscreen mode
  }
}


// DOM Elements
//const chatPanel = document.getElementById("chatPanel");
const closeChatButton = document.getElementById("close-chat");
const sendChatButton = document.getElementById("send-chat");
const chatInput = document.getElementById("chat-input");
const textToVoiceButton = document.getElementById("textToVoiceBtn");
const voiceToTextButton = document.getElementById("voiceToTextBtn");
const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');


textToVoiceButton.addEventListener("click", toggleTextToVoice);
voiceToTextButton.addEventListener("click", toggleVoiceToText);

toggleFullscreenBtn.addEventListener("click", toggleChatbotFullscreen);
// Event Listeners
chatButton.addEventListener("click", () => {
  // Delay chat panel opening by 2 seconds
  setTimeout(() => {
      chatPanel.style.display = "flex";
      loadGeneralQuestions(); // Only load questions when the panel is open
      
loadBrainAndCallFunction();
  }, 500); // 2 seconds delay
});

closeChatButton.addEventListener("click", () => {
  // Delay chat panel closing by 2 seconds
  setTimeout(() => {
      chatPanel.style.display = "none";
  }, 500); // 2 seconds delay
});

sendChatButton.addEventListener("click", sendMessage);


// Chat input - 'Enter' or 'Return' key press simulation
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission or other default behavior
        sendChatButton.click();  // Simulate a click on the send button
    }
});

  function replaceMainContentWithBot() {
    const currentUrl = window.location.href;
    console.log("currentUrl   ",currentUrl);

    if (currentUrl === "https://reelcareer.co/bot/" || currentUrl === "https://reelcareer.co/bot") {
      const mainContent = document.getElementById("main-content");
      const closeChatBtn = document.getElementById("close-chat");

      if (mainContent) {
        
        closeChatBtn.style.display = "none";
        chatButton.style.display = "none";
        chatPanel.style.cssText = `
    width: 100%;
    min-height: 600px;
    background-color: white;
    font-family: sans-serif;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 5px;
    box-shadow: none;
    opacity: 1;
    transition: none;
    transform: none;
    height: 80vh;
    place-content: space-between;
    place-items: stretch;
    display: grid;
    bottom: 10px;
    right: 10px;
    margin: auto;
    max-height: 100%;
`

        // Replace main-content with chatbot
        mainContent.appendChild(chatPanel);

             loadGeneralQuestions(); // Only load questions when panel is open
          
        
      }
    }else{

  // Attach resize event listener
  window.addEventListener("resize", resizeChatPanel);
  resizeChatPanel(); // Call initially on load
    }
   
  }
  

  replaceMainContentWithBot(); // Replace content if on /bot page

}

async function fetchChatbotData() {
  try {
    const response = await fetch('https://reelcareer.co/bot/chat_bot.json');
    const data = await response.json();

    // Combine the general questions and predefined questions
     allQuestions = [
      ...data.generalQuestions.map(q => ({ ...q, onload: true })),  // Mark general questions for onload
      ...data.predefinedQuestions.map(q => ({ ...q, onload: false }))  // Mark predefined questions for later
    ];

   //console.log(allQuestions);  // Output the combined questions

    // Further processing can be done here...
    loadChatbot();
    
  } catch (error) {
    console.error('Error fetching chatbot data:', error);
  }
}


// Load only general questions when chatbot is opened
function loadGeneralQuestions() {
  const messageArea = document.getElementById("chatbot-messages");
  if (messageArea) {
    //console.log("Loading general questions...");
    messageArea.innerHTML = "<p><strong>Choose a topic to get started:</strong></p>";
    messageArea.style.cssText = " text-align: center;     overflow-y: scroll;  margin: auto; display: block; font-family: sans-serif;";



    // Filter and display only onload questions (general questions)
    allQuestions.filter(q => q.onload).forEach(q => {
        const button = document.createElement("button");
        button.innerText = q.question;
        button.style.cssText = "color: #30343f; margin: 5px;padding: 5px 10px;cursor: pointer;border: #dde3ed solid;border-radius: 25px;background-color: aliceblue;";
        button.addEventListener("click", () => handleUserInput(q.question));
        messageArea.appendChild(button);
    });
  } else {
    console.error("Chatbot message area not found.");
  }
}






// Handle user input
async function handleUserInput(userMessage) {
  const messageArea = document.getElementById("chatbot-messages");




  // Call sendMessage to get the answer and question id
  const result = await sendMessage(userMessage);

  if (result && result.answer) {
    // Wait for displayMessage to complete typing before proceeding
    await displayMessage("bot", result.answer);

    // If an ID is returned, display the helpful questionnaire
    if (result.id) {
      console.log("Question ID:", result.id);
      setTimeout(() => {
        addHelpfulButtons(result.id);
      }, 500); // 0.5 second delay
          }
  } else {
    await displayMessage(
      "bot",
      "Sorry, I couldn't find an answer for that. Please contact us via our [Contact Us](https://reelcareer.com/contact) page."
    );
 //   logUnansweredQuestion(userMessage);
  }
}





// Function to create and append "Was this helpful?" buttons
function addHelpfulButtons(questionId) {
  const messageArea = document.getElementById("chatbot-messages");

  // Container for the helpful area
  const helpfulContainer = document.createElement("div");
  helpfulContainer.style.cssText = `
    display: grid;
    align-items: stretch;
    gap: 10px;
    margin-top: 10px;
    padding: 5px 0px;
    font-family: Arial, sans-serif;
    align-content: stretch;
    justify-content: space-around;
    justify-items: stretch;
        margin-bottom: 2rem;
    padding-bottom: 2rem;  `;

  // Text
  const helpfulText = document.createElement("span");
  helpfulText.textContent = "Was this helpful?";
  helpfulText.style.cssText = `
    font-size: 1.5rem;
    color: #555;
  `;

  // Yes button
  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.style.cssText = `
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  `;
  yesButton.addEventListener("mouseenter", () => {
    yesButton.style.backgroundColor = "#218838";
  });
  yesButton.addEventListener("mouseleave", () => {
    yesButton.style.backgroundColor = "#28a745";
  });
  yesButton.addEventListener("click", async () => {
    await updateHelpfulCount(questionId, true);
    showToast("Thank you for your feedback!");
    helpfulContainer.style.display = "none";

  });

  // No button
  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.style.cssText = `
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  `;
  noButton.addEventListener("mouseenter", () => {
    noButton.style.backgroundColor = "#c82333";
  });
  noButton.addEventListener("mouseleave", () => {
    noButton.style.backgroundColor = "#dc3545";
  });
  noButton.addEventListener("click", async () => {
    await updateHelpfulCount(questionId, false);
    showToast("Thank you for your feedback!");
    helpfulContainer.style.display = "none";
  });

  // Append elements to the container
  helpfulContainer.appendChild(helpfulText);
  helpfulContainer.appendChild(yesButton);
  helpfulContainer.appendChild(noButton);

  // Append the helpful area to the message area
  messageArea.appendChild(helpfulContainer);
  messageArea.scrollTop = messageArea.scrollHeight;


}

async function updateHelpfulCount(questionId, isHelpful) {
  try {
    const chatbotDocRef = doc(db, "ChatbotInteractions", questionId);

    // Fetch the current document data
    const docSnapshot = await getDoc(chatbotDocRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // Update the helpful count and view count
      const updatedHelpfulCount = isHelpful ? data.helpful + 1 : data.helpful;
      const updatedViewCount = data.views + 1;  // Increment views count

      // Update the document with the new counts
      await updateDoc(chatbotDocRef, {
        helpfulCount: updatedHelpfulCount,
        views: updatedViewCount
      });


    } else {
      console.error("Document does not exist.");
    }
  } catch (error) {
    console.error("Error updating helpful or view count:", error);
  }
        // Determine the response message based on the feedback
        const responseMessage = isHelpful
        ? "Thank you for your feedback! We're glad we could help."
        : "Is there anything else we can assist you with?";

      // Display the appropriate response message
      displayMessage("bot", responseMessage);
}


// Function to simulate smooth scrolling
function smoothScrollToBottom() {
  const messageArea = document.getElementById("chatbot-messages");

  const start = messageArea.scrollTop;
  const end = messageArea.scrollHeight;
  const duration = 300; // Duration of the scroll animation in milliseconds
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    messageArea.scrollTop = start + (end - start) * easeInOutQuad(progress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Easing function for smooth animation
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Display messages in the chat panel
function displayMessage(sender, message) {
  return new Promise((resolve) => {
    const messageArea = document.getElementById("chatbot-messages");
    const messageDiv = document.createElement("div");
    messageDiv.style.margin = "8px 0";
    messageDiv.style.padding = "8px 12px";
    messageDiv.style.borderRadius = "10px";
    messageDiv.style.maxWidth = "80%";
    messageDiv.style.wordWrap = "break-word";
    messageDiv.style.textAlign ="left";

    // Style based on sender
    // Style based on sender
  messageDiv.style.cssText = sender === "bot"
  ? `    margin: 8px 0px;
    padding: 8px 12px;
    border-radius: 10px;
    max-width: 70%;
    overflow-wrap: anywhere;
    background-color: #e6f7ff;
    color: #333333;
    font-family: Arial, sans-serif;
    display: grid;
    word-wrap: break-word;
    justify-content: start;
    justify-items: start;
    text-align: left;`

  :   `  
    padding: 8px 12px;
    border-radius: 10px;
    max-width: 70%;
    overflow-wrap: anywhere;
    background-color: rgb(212, 237, 218);
    color: rgb(21, 87, 36);
    font-family: Arial, sans-serif;
    display: grid;
        word-wrap: break-word;
    place-content: stretch end;
    justify-items: stretch;
    text-align: left;
    width: 100%;
    margin: auto 0px auto auto;
    justify-content: start;
`;
let messageWithLinks = '';
    // Replace URLs with <a> tags if they exist in the message
    if(message){
     messageWithLinks = message.replace(
      /https?:\/\/[^\s]+/g,
      (url) => `<a href="${url}" target="_blank" style="color: #007bff; text-decoration: underline;">${url}</a>`
    );
  }

    const senderLabel = sender === "bot"
      ? '<strong style="color: #007bff;">Chatbot:</strong> '
      : '<strong style="color: #28a745;">You:</strong> ';

    // Typing effect for bot messages
    if (sender === "bot") {
      let index = 0;
      const typingSpeed = 70;

      utterance = new SpeechSynthesisUtterance(message);
      toggleTextToVoice();



      messageDiv.innerHTML = `${senderLabel}`; // Start empty with sender label
      const typingEffect = setInterval(() => {

        smoothScrollToBottom();

        if(messageWithLinks.length > 0){

        messageDiv.innerHTML = `${senderLabel}${messageWithLinks.substring(0, index + 1)}`;
         }else{
          return;
         }
        index++;

        if (index === messageWithLinks.length) {
          clearInterval(typingEffect);
          resolve(); // Resolve the promise when typing completes
        }
      }, typingSpeed);

      
    } else {
      setTimeout(() => {
        messageDiv.innerHTML = senderLabel + messageWithLinks;
      }, 500);

      resolve(); // Immediately resolve for user messages
    }


    setTimeout(() => {
      messageArea.appendChild(messageDiv);
    }, 300);
    smoothScrollToBottom();

  });
}
window.displayMessage = displayMessage;

// Log unanswered questions
async function logUnansweredQuestion(message) {
  const chatBotData = {
      activate: false,
      status: "review",
      id: '',
      question: message,
      answer: "",
      category: "General",
      tags: [],
      supportURL: "", 
      helpful: 0, 
      views: 0,      
      createdAt: new Date(),
      timestamp: serverTimestamp()
  };
  await addDoc(collection(db, "ChatbotInteractions"), chatBotData);
}













// Unified sanitization and validation function
function sanitizeAndValidateInput(input) {
  // Step 1: Remove any HTML tags
  const sanitized = input.replace(/<[^>]*>/g, "").trim();

  // Step 2: Allow common special characters while blocking dangerous patterns
  if (!isSafeInputChat(sanitized)) {
      return null; // Return null if unsafe content is found
  }

  return sanitized; // Return the clean input without forcing lowercase
}

// Updated safety check
window.isSafeInputChat = function (input) {
  // Allow safe special characters: $,.!@#()&%/* and numbers, letters, spaces
  // Block harmful patterns like scripts, SQL keywords, and backslashes
  const dangerousPatterns = /(script|SELECT|UPDATE|DELETE|INSERT|DROP|TABLE|ALTER|--|\\)/i;

  return !dangerousPatterns.test(input);
};


// Send message and match it to predefined questions
async function sendMessage(userMessage) {
  // 1. Fetch raw input if no argument is passed
  if (!userMessage || typeof userMessage !== "string") {
    userMessage = document.getElementById("chat-input").innerText;
    if (!userMessage || userMessage.trim() === "") {
      console.warn("Message is empty.");
      return; // Exit if the input is empty
    }
  }
   // 2. Sanitize and normalize the input
   const sanitizedMessage = sanitizeAndValidateInput(userMessage);
   if (!sanitizedMessage) {
     showToast("Invalid or unsafe input.");
     return; // Exit if the message fails sanitization or validation
   }
 

 // Trim and normalize the user message
const trimmedMessage = sanitizedMessage.trim().toLowerCase();

displayMessage("user", trimmedMessage) 
userMessage = '';
// Initialize score variables
let bestMatch = null;
let highestScore = 0;
//console.log("Initial Best Match:", bestMatch);
//console.log("Initial Highest Score:", highestScore);

// Define weights for tags and categories
const tagWeight = 2;
const categoryWeight = 1;
console.log("Tag Weight:", tagWeight, "Category Weight:", categoryWeight);

// Iterate over all questions to find the best match
allQuestions.forEach((questionObj, index) => {
    let score = 0;
  //  console.log(`Evaluating Question #${index + 1}:`, questionObj);

    // Score based on the number of matching tags
    questionObj.tags.forEach(tag => {
        if (trimmedMessage.includes(tag.toLowerCase())) {
            score += tagWeight; // Increase score by tagWeight
          //  console.log(`Matched tag: ${tag}. Current score: ${score}`);
        }
    });

    // Score based on matching question text
    if (trimmedMessage.includes(questionObj.question.toLowerCase())) {
        score += categoryWeight; // Increase score by categoryWeight
       // console.log(`Matched question: "${questionObj.question}". Current score: ${score}`);
    }

    // Score based on matching category
    if (trimmedMessage.includes(questionObj.category.toLowerCase())) {
        score += categoryWeight; // Increase score by categoryWeight
       // console.log(`Matched category: "${questionObj.category}". Current score: ${score}`);
    }
    // Update best match if the score is higher
    if (score > highestScore) {
        highestScore = score;
        bestMatch = questionObj;
        console.log(`New best match found:`, bestMatch);
    }
});

//console.log("Final Best Match:", bestMatch);
//console.log("Final Highest Score:", highestScore);

// Return answer and question id if a best match is found
if (bestMatch && highestScore > 0) {
   // console.log("Returning best match:", bestMatch.answer);
   // displayMessage("bot", bestMatch.answer);
    return {
        answer: bestMatch.answer,
        id: bestMatch.id  // Include the ID of the best match
    };
} else {
    // Log unanswered question and suggest contacting support
    if(trimmedMessage){
    let brainOutput = processMessage(trimmedMessage);
    displayMessage("bot", brainOutput);
    }
    if(!trimmedMessage){

     //  logUnansweredQuestion(trimmedMessage);
    console.log("No match found, suggesting contact with support.");
    return {
        answer: "Sorry, I couldn't find an answer to your question. Please contact support for assistance.",
        id: null  // If no match, return null for id
    };
  }
}

}



// Variable to hold the loaded script
let brainScriptLoaded = false;

// Function to dynamically load an external JavaScript file as a module
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'module'; // Set as ES Module
  script.onload = function() {
    brainScriptLoaded = true;  // Set flag when the script is loaded
    if (callback) callback();  // Call the callback after the script is loaded
  };
  script.onerror = function() {
    console.error('Error loading script: ' + src);
  };
  document.head.appendChild(script);  // Append the script tag to the head

  (function loadTensorFlowJS() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs";
    script.async = true;
    script.onload = () => console.log('TensorFlow.js loaded successfully.');
    script.onerror = () => console.error('Failed to load TensorFlow.js.');
    document.body.appendChild(script);
})();








}








// Function to load brain.js and execute functionality after it is loaded
function loadBrainAndCallFunction() {
  loadScript('https://reelcareer.co/bot/js/brain.js', function() {
    console.log('Brain module loaded successfully.');
  });
}


async function loadJsonData(url) {
  loadScript(url, function() {
    console.log('JSON loaded successfully.');
  });
  
}

//loadJsonData('https://reelcareer.co/scripts/json/main.js');



  setTimeout(() => {

    fetchChatbotData();
  
  
    
  }, 300); // 5000 milliseconds = 5 seconds
  