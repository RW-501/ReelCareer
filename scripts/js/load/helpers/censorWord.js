





// Function to escape special characters for use in regular expressions 
function escapeRegExp(str) {
    return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
  }
  
  // Function to create precompiled regular expressions for vulgar words
  function compileVulgarWordRegex(vulgarWordsArray) {
    return vulgarWordsArray.map((word) => ({
      word,
      regex: new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi'),
    }));
  }
  
  // Function to censor vulgar words
  function censorWord(match) {
    return match.length > 2
      ? match[0] + '***' + match[match.length - 1] // First and last letter with ***
      : match[0] + '*'; // For short words
  }
  
  // Function to replace vulgar words and log contextual information
  function scanAndReplaceVulgarWords(vulgarWordsArray, logging = false) {
    const mainContainer = document.getElementById('main-content');
    if (!mainContainer) {
      // console.error("Main container not found.");
      return;
    }
  
    // Precompile vulgar word regex patterns
    const vulgarWordPatterns = compileVulgarWordRegex(vulgarWordsArray);
  
    // Array to hold the support ticket data
    const supportTickets = [];
  
    const treeWalker = document.createTreeWalker(mainContainer, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
  
    while ((currentNode = treeWalker.nextNode())) {
      let text = currentNode.nodeValue;
      let originalText = text;
      const detectedWords = [];
  
      vulgarWordPatterns.forEach(({ regex, word }) => {
        if (regex.test(text)) {
          detectedWords.push(word);
          text = text.replace(regex, censorWord);
        }
      });
  
      // If vulgar words were detected, collect additional information
      if (detectedWords.length > 0) {
        const parentJobCard = currentNode.parentElement.closest('.JOB_CARD');
        const jobCardId = parentJobCard ? parentJobCard.id.replace(/^job_card_/i, '') : null;
  
        const parentVideoCard = currentNode.parentElement.closest('.video-card');
        const videoCardId = parentVideoCard ? parentVideoCard.id.replace(/^videoCard_/i, '') : null;
  
        const isJobPage = window.location.href.includes('job-page'); // Modify based on the URL structure of job pages
  
        const jobTitleElement = parentJobCard.querySelector('.job-title-link');
  
  // Get the inner text of the job-title-link
  const jobTitle = jobTitleElement ? jobTitleElement.innerText : null;
        // Determine the type based on the parent element or page
        let ticketType = 'Unknown';  // Default to 'Unknown'
        if (parentJobCard) {
          ticketType = 'Job Card';
        } else if (parentVideoCard) {
          ticketType = 'Video Card';
        } else if (isJobPage) {
          ticketType = 'Job Page';
        }
  
        const ticket = {
          jobID: new URL(window.location.href).searchParams.get('id'),
          jobTitle: jobTitle,
          videoID: videoCardId,
          jobCardID: jobCardId,
          message: `Vulgar words detected: ${detectedWords.join(', ')}`,
          pageTitle: document.title,
          reasons: detectedWords,
          URL: window.location.href,
          submittedAt: new Date().toISOString(),
          timestamp: serverTimestamp(),
          submittedBy: 'System',
          type: ticketType,
          status: "submitted"
        };
  
        supportTickets.push(ticket);
        if (logging) {
          // console.log(`Vulgar words detected: ${detectedWords.join(', ')}`);
        }
      }
  
      // Only update the text node if changes were made
      if (text !== originalText) {
        currentNode.nodeValue = text;
        // if (logging) console.log(`Replaced in node: ${originalText} -> ${text}`);
      }
    }
  
    // Send support tickets after scanning and replacing
    if (supportTickets.length > 0) {
      sendToSupportTickets(supportTickets);
    }
  }
  
  
  
  
  async function sendToSupportTickets(tickets) {
    const supportTicketsRef = collection(db, 'SupportTickets');
    const batch = writeBatch(db);
  
    for (const ticket of tickets) {
      const { jobID, videoID } = ticket;
  
      // Create a query to check if a ticket already exists for the same jobID and videoID
      const existingTicketQuery = query(
        supportTicketsRef,
        where("jobID", "==", jobID),
        where("videoID", "==", videoID)
      );
  
      try {
        // Execute the query to check for existing tickets
        const querySnapshot = await getDocs(existingTicketQuery);
        if (querySnapshot.empty) {
          // No existing ticket found, create a new one
          const ticketRef = doc(supportTicketsRef);  // Create a reference for a new document
          batch.set(ticketRef, ticket);  // Add the 'set' operation to the batch
         // console.log(`New ticket created for jobID: ${jobID} and videoID: ${videoID}`);
        } else {
        //  console.log(`Duplicate ticket found for jobID: ${jobID} and videoID: ${videoID}. Ticket not submitted.`);
        }
      } catch (error) {
       // console.error("Error checking for existing ticket:", error);
      }
    }
  
    // Commit the batch to Firestore
    try {
      await batch.commit();
      console.log("Support tickets successfully submitted.");
    } catch (error) {
      console.error("Error submitting support tickets:", error);
    }
  }
  
  
  
  window.scanAndReplaceVulgarWords = scanAndReplaceVulgarWords;
  
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    // Example list of vulgar words
    const vulgarWords = [
      // Variations of "badword"
      "stupid", "shit", "ass", "fuck", "pussy", "dick", "azz", "fucked", "fucking", "bitch", "bitches", "bitching", "bitch*",
      
      // Variations of "curseword"
      "shited", "shits", "bstard", "biatch", "damned", "damnit", "damn it", "damn", "hell", 
       "fuc*king", "f*king", "f***ed", "s*ux", "sh1t", "j*erk", "a55", "b1tch", "f8ck", "f1ck", "h4te", "l0ser",
    
    
      // Variations of "dummy"
      "d*ummy", "du*mmy", "dum*my", "dumm*y", "du*mmy", "dum*m*y", "dumm*my",
    
      // More general words - add misspellings as needed
      "s*tupid", "sh*it", "a*ss", "f*uck", "fu*ck", "fuc*k", "b*itch", "bi*tch", "bit*ch", "bitch*",
      "f***", "fuc*king", "f*king", "f***ed", "s*ux", "sh1t", "j*erk", "a55", "b1tch", "f8ck", "f1ck", "h4te", "l0ser",
      
      // Numbers or special character combinations
      "f***", "b1tch", "sh1t", "d4mn", "h3ll", "f8ck", "c*rse", "i*d10t", "j*erk", "l0s3r", "m*therf*cker", "f*k",
      
      // Substitutions
      "f*uck", "fu*k", "f**k", "fuc*k", "fuc**k", "sh*it", "sh*t", "b**ch", "b*itch", "b*tch", "b1tch", "s3x", "j**k",
      
      // Additional patterns and mixed-up character replacements
      "f*u**k", "s*hit", "sh1t", "m*therf*cker", "sh*tshow", "sh*tstain", "l33t", "b**tch", "b!tch", "a*s*hole",
      
      // Keyboard substitutions
       "k!ll", "g0d", "tw*tch", "w*nky", "pr*ck", "pr1ck", "p*ss", "ass", "d*ck", "b**w", "c**t", "s*ck"
    ];
    
  // Run the scanner and replacer function after DOM is loaded
    setTimeout(() => {
      scanAndReplaceVulgarWords(vulgarWords);
    }, 2000); // Delay of 2 seconds (2000 milliseconds)
  
  
  });
  
  
  /*
  const detectedWords = scanForVulgarWords(vulgarWords);
  
  if (detectedWords.length > 0) {
    alert("Warning: Vulgar content detected in the page.");
  }
  
  */
  