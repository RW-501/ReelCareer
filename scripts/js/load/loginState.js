
import {
  db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics,
  googleProvider,onSnapshot ,writeBatch ,batch,
  facebookProvider,
  getUserId
} from 'https://reelcareer.co/scripts/js/load/module.js';






// Function to update or create user information in Firestore
const saveUserLoginState = async (user, isNewUser = false, joinedDate = null) => {
    try {


      const popupLoginContainer = document.getElementById("popup-login-container");

      if (popupLoginContainer) {
          popupLoginContainer.remove();
      }
      


      //console.log(" User info: ", user);
  // Fetch user provider data
  const providerData = user.providerData.length > 0 ? user.providerData[0].providerId : 'unknown';

  // Optional: Map providerId to a more human-readable format
  const providerMap = {
    'password': 'Email/Password',
    'google.com': 'Google',
    'phone': 'Phone Number',
    'anonymous': 'Anonymous',
    // Add more as needed
  };

  const loginProvider = providerMap[providerData] || providerData;

const userID = user.uid;
   
  let jobArray = [], tagArray = [];
  
  const userDataSaved =  getUserData() || [];
  const userIP = sessionStorage.getItem('userIP') || "";
  
      let userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];
  
      let userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];
      //console.log(" User userIP: ", userIP);
      const locationData = JSON.parse(sessionStorage.getItem('userLocation'));

      const profilePicArea = document.getElementById('nav-bar-profilePic');
      let  profilePic = '';

      if(profilePicArea){
        profilePic = profilePicArea.src;
      }
       
  
   
  
      if(userTagInterest.length == 0){
        userTagInterest = [
     {
      tag: locationData.city,
      rank: 1
      }, {
        isLast: true,
        tag: locationData.state,
        rank: 1
        }, {
          isLast: true,
          tag: "job",
          rank: 1
          }, {
            isLast: true,
            tag: "jobs",
            rank: 1
            }
    ];
    }
  
    if(userJobInterest.length == 0){
      userJobInterest =  [  {
        isLast: true,
        job: locationData.city,
        rank: 1
        }, {
          isLast: true,
          job: locationData.state,
          rank: 1
          }, {
            isLast: true,
            job: "job",
            rank: 1
            }, {
              isLast: true,
              job: "jobs",
              rank: 1
              }
      ];
    }
     tagArray = userTagInterest.map(item => item.tag); // Extract only the tags
  
     jobArray = userJobInterest.map(item => item.job); // Extract only the tags
  
   // console.log(" User tagArray: ", tagArray);
   // console.log(" User jobArray: ", jobArray);
  
   // console.log(" userTagInterest: ", userTagInterest);
   // console.log(" userJobInterest: ", userJobInterest);
  


   const videoResumesRef = collection(db, "VideoResumes");

   // Query to fetch video resumes where createdByID matches userID
   const reelsQuery = query(videoResumesRef, where("createdByID", "==", userID));
   
   let videoResumeData = [];
 
   const connectionsRef = collection(db, 'Connections');
const q = query(connectionsRef, where('participants', 'array-contains', userID));

   const qConnectionSnapshot = await getDocs(q);
   const connectionCount = qConnectionSnapshot.size; // Number of matching documents

   const { email, uid, emailVerified, displayName, phoneNumber, photoURL } = user;

  
 
   
const querySnapshot = await getDocs(reelsQuery);
querySnapshot.forEach((doc) => {
    // Assuming the document contains the necessary fields: reelID, videoResumeURL, tags
    const data = doc.data();
    
    // Ensure videoResumeData is an array before pushing
    if (Array.isArray(videoResumeData)) {
        videoResumeData.push({
            reelID: data.reelID,
            videoResumeURL: data.videoResumeURL,
            videoResumeTitle: data.videoResumeTitle,
            reported: data.reported,
            isPinned: data.isPinned,
            isPublic: data.isPublic,
            isSponsoredPost: data.isSponsoredPost,
            views: data.views,
            watchTime: data.watchTime,
            tags: data.tags || [],  // Default to empty array if no tags
            gifts: data.gifts || [],  // Default to empty array if no gifts
            createdAt: data.createdAt.toDate(), // Assuming createdAt is a timestamp
            status: data.status || 'posted', // Default to 'posted' if no status
            reelURL: `https://reelcareer.co/reels/?r=${data.reelID}` // Construct reel URL
        });
    }
});

// Ensure videoResumeData is an array before proceeding
if (Array.isArray(videoResumeData)) {
    // Make a copy of videoResumeData
    const sortedAndLimitedData = [...videoResumeData]
        .filter(item => item.status === 'posted')  // Filter items with status 'posted'
        .sort((a, b) => b.createdAt - a.createdAt) // Sort in descending order by createdAt
        .slice(0, 10); // Limit to 10 items

    // You can now use sortedAndLimitedData for further processing
    console.log(sortedAndLimitedData);
} else {
    console.error('videoResumeData is not an array.');
}


let totalGiftAmountReceived = 0;

// Check if gifts is an array and has length
if (Array.isArray(videoResumeData.gifts)) {
    totalGiftAmountReceived = videoResumeData.gifts.length;
} else {
    // Handle the case where gifts is undefined or not an array
  //  console.warn('Gifts data is not available or not an array');
}











const DEFAULT_MEMBERSHIP_DURATION_DAYS = 30;
const MAX_SECURITY_FAIL_COUNT = 3;
const VILATON_INCUMENT_1 = 1;
const VILATON_INCUMENT_2 = 2;
const VILATON_INCUMENT_3 = 3;


       let userAccountStatusCount = 0;

       

let videoPostRestriction = false;
let videoPostStatus = "OK";
       if(videoResumeData.reported <= 3){
        userAccountStatusCount += VILATON_INCUMENT_1;
        videoPostStatus = "OK";
       }else if(videoResumeData.reported > 3 && videoResumeData.reported < 10){
        userAccountStatusCount += VILATON_INCUMENT_2;
        videoPostStatus = "Warning";
       }else 
       if(videoResumeData.reported > 10){
        userAccountStatusCount += VILATON_INCUMENT_3;
        videoPostStatus = "Restricted";
        videoPostRestriction = true;
       }


       const getUserAccountStatus = (userData, currentIP, loginProvider) => {
      
        if (userData.securityQuestionFailCount >= MAX_SECURITY_FAIL_COUNT) userAccountStatusCount += VILATON_INCUMENT_1;
        if (userData.userIP !== currentIP) userAccountStatusCount += VILATON_INCUMENT_1;
        if (userData.loginMethod !== loginProvider) userAccountStatusCount += VILATON_INCUMENT_1;
        if (userData.obituaryReportCount >= MAX_SECURITY_FAIL_COUNT) userAccountStatusCount += VILATON_INCUMENT_2;
        if (userData.reportedCount >= MAX_SECURITY_FAIL_COUNT) userAccountStatusCount += VILATON_INCUMENT_2;
        if (!userData.email && !userData.phoneNumber) count += VILATON_INCUMENT_3;
      
        if (userAccountStatusCount <= 2) return "OK";
        if (userAccountStatusCount <= 4) return "Warning";
        return "Restricted";
      };
      
let isAccountLocked = false;

      const userAccountStatus = getUserAccountStatus(userDataSaved, userIP, loginProvider);

       if(userAccountStatus == "Restricted"){
 
        let link = "https://reelcareer.co/support";
        isAccountLocked = true;

        showToast(" Your Account have been Restricted, Please Contact Support ASAP", 'warning', 0,
          link, true, 'Support');
        
       }

       let userData = {
        // Basic User Information
        email: email || "",                                      // User's email address
        lastLogin: new Date(),                                    // Last login timestamp
        ipAddress: userIP || "",                                  // User's IP address
        userID: uid || "",                                        // Unique user identifier
        verified: emailVerified || false,                          // Email verification status
        loginMethod: loginProvider,                               // Provider used for login (e.g., Google, Facebook)
        userAccountStatus: userAccountStatus || 'OK',              // Account status (active, suspended, etc.)
        isAccountLocked: isAccountLocked || false,                 // Lock status of the account
        userAccountStatusCount: userAccountStatusCount,            // Account status count (could be attempts, etc.)
        lastUpdateTime: userDataSaved.lastUpdateTime || new Date(), // Last update timestamp
    
        // Video Post Restrictions
        videoPostStatus: videoPostStatus,                          // Status of video post feature (active/inactive)
        videoPostRestriction: videoPostRestriction,                // Restriction status for video posting (true/false)
    
        // Security and Reporting
        reportedCount: userDataSaved.reportedCount || 0,          // Count of times the user has been reported
        securityQuestions: userDataSaved.securityQuestions || [],  // Security questions associated with the account
        securityQuestionFailCount: userDataSaved.securityQuestionFailCount || 0,  // Count of failed security question attempts
        securityQuestionResetTime: userDataSaved.securityQuestionResetTime || '',  // Time of the last reset of security questions
    
        // User's Personal Information
        displayName: userDataSaved.displayName || displayName,    // Display name for the user
        phoneNumber: userDataSaved.phoneNumber || phoneNumber || '', // User's phone number
        profilePicture: userDataSaved.profilePicture || photoURL || profilePic || '', // Profile picture URL
        joinedDate: userDataSaved.joinedDate || joinedDate || new Date(), // Date the user joined the platform
        passwordLastChangedDate: userDataSaved.passwordLastChangedDate || joinedDate || new Date(), // Date the password was last changed
    
        // Financial and Membership Information
        accountBalance: userDataSaved.accountBalance || 0,        // User's account balance
        accountBalanceUpdateDate: userDataSaved.accountBalanceUpdateDate || new Date(), // Date when account balance was last updated
        userRoles: userDataSaved.userRoles || ['jobSeeker'],      // Roles associated with the user (e.g., jobSeeker, recruiter)
        membershipType: userDataSaved.membershipType || "free",   // Type of membership (e.g., free, pro)
        membershipMonthCount: userDataSaved.membershipMonthCount || 0, // Number of months the user has been a member
        membershipStartDate: userDataSaved.membershipStartDate || joinedDate, // Start date of membership
        membershipUpdateDate: userDataSaved.membershipUpdateDate || joinedDate, // Last update date of membership
        membershipRenewalDate: userDataSaved.membershipRenewalDate || new Date(new Date().setDate(new Date().getDate() + DEFAULT_MEMBERSHIP_DURATION_DAYS)), // Renewal date for membership
        membershipExpiry: userDataSaved.membershipExpiry || new Date(new Date().setDate(new Date().getDate() + DEFAULT_MEMBERSHIP_DURATION_DAYS)), // Expiry date of membership
    
        // Boost Credits and Restrictions
        applicationsBoostCredits: userDataSaved.applicationsBoostCredits || 0,  // Boost credits for applications
        profileBoostCredits: userDataSaved.profileBoostCredits || 0,          // Boost credits for profile visibility
        jobPostCredits: userDataSaved.jobPostCredits || 0,                    // Credits for posting jobs
        sponsoredJobPostCredits: userDataSaved.sponsoredJobPostCredits || 0,  // Credits for sponsored job posts
        videoBoostCredits: userDataSaved.videoBoostCredits || 0,              // Boost credits for video posts
        sponsoredVideoPostCredits: userDataSaved.sponsoredVideoPostCredits || 0, // Sponsored video post credits
    
        // Trial Period Information
        basicTrialUseBool: userDataSaved.basicTrialUseBool || false,          // Whether basic trial has been used
        proTrialUseBool: userDataSaved.proTrialUseBool || false,              // Whether pro trial has been used
        basicTrialStartDate: userDataSaved.basicTrialStartDate || '',          // Start date for basic trial
        proTrialStartDate: userDataSaved.proTrialStartDate || '',             // Start date for pro trial
        basicTrialEndDate: userDataSaved.basicTrialEndDate || '',          // End date for basic trial
        proTrialEndDate: userDataSaved.proTrialEndDate || '',             // Emd date for pro trial
       
        // Obituary Features
        obituaryPageCredits: userDataSaved.obituaryPageCredits || 0,          // Credits for obituary pages
        obituaryExtraSectionsLimit: userDataSaved.obituaryExtraSectionsLimit || 0, // Limit for extra sections in obituary pages
    
        // Resume and Job Related Information
        resumeCount: userDataSaved.resumeCount || 0,                         // Number of resumes uploaded
        savedForLater: userDataSaved.savedForLater || 0,                      // Number of jobs saved for later
        videoDurationLimit: userDataSaved.videoDurationLimit || 0,            // Video duration limit for uploads
        customEndCardBool: userDataSaved.customEndCardBool || false,          // Whether custom end card is enabled for videos
        relatedProductsBool: userDataSaved.relatedProductsBool || false,      // Whether related products are enabled
        videoWatchHistory: userDataSaved.videoWatchHistory || [],            // History of videos watched used by the user
        videoWatchTime: userDataSaved.videoWatchTime || 0,            // Video duration limit for uploads
        videoWatchCount: userDataSaved.videoWatchCount || 0,            // Video videoWatchCount
        videoInterest: userDataSaved.videoInterest || [],            // History of videos watched used by the user

        // Analytics and Reporting Features
        storeAdvanceAnalyticsBool: userDataSaved.storeAdvanceAnalyticsBool || false,  // Advanced analytics for store
        videoAdvanceAnalyticsBool: userDataSaved.videoAdvanceAnalyticsBool || false,  // Advanced analytics for video posts
        jobPostAdvanceAnalyticsBool: userDataSaved.jobPostAdvanceAnalyticsBool || false, // Advanced analytics for job posts
        obituaryAdvanceAnalyticsBool: userDataSaved.obituaryAdvanceAnalyticsBool || false, // Advanced analytics for obituary pages
        applicationAdvanceAnalyticsBool: userDataSaved.applicationAdvanceAnalyticsBool || false, // Advanced analytics for applications
    
        // Boost History and Subscription Details
        boostUsageHistory: userDataSaved.boostUsageHistory || [],            // History of boosts used by the user
        subscriptionID: userDataSaved.subscriptionID || '',                  // Subscription ID for the user
        recruiterID: userDataSaved.recruiterID || '',                        // Recruiter ID (if applicable)
    
        // Obituary Report Count and Other User Stats
        obituaryReportCount: userDataSaved.obituaryReportCount || 0,         // Count of reports on obituary pages
        videoResumeData: videoResumeData,                                    // Data related to video resumes
        contactsCount: connectionCount || 0,                                 // Number of contacts the user has
        videoResumeCount: videoResumeData.length || 0,                        // Number of video resumes uploaded
        totalReelViews: userDataSaved.totalReelViews || 0,                   // Total views on the user's reels
        totalGiftAmountReceived: totalGiftAmountReceived || 0,               // Total amount of gifts received
    
        // User Preferences and Settings
        notificationPreferences: userDataSaved.notificationPreferences || [], // User's notification preferences
        autoLogoutTime: userDataSaved.autoLogoutTime || 100000,              // Auto logout time (in milliseconds)
    
        // Store Information
        storeProductListingsCount: userDataSaved.storeProductListingsCount || 0, // Number of store product listings
        storeBoostedProductsCount: userDataSaved.storeBoostedProductsCount || 0, // Number of boosted products in store
    
        // Tags and Job Interests
        tags: tagArray || "",                                              // Tags associated with the user
        jobInterest: jobArray || "",                                        // Job interests of the user
        publicProfile: userDataSaved.publicProfile || true,                 // Whether the profile is public
        resumeCount: userDataSaved.resumes?.length || 0,                    // Number of resumes uploaded
        savedForLater: userDataSaved.savedJobs?.length || 0,                // Number of jobs saved for later
        userAppsCount: userDataSaved.userApps?.length || 0,                 // Number of job applications made
        jobPostsCount: userDataSaved.jobPosts?.length || 0,                 // Number of job posts created
        tagsCount: tagArray.length || 0,                                    // Number of tags the user has
        jobInterestCount: jobArray.length || 0,                             // Number of job interests
    };
    
      //console.log(" User userData: ", userData);
  
   
      const updatedUserData = {
        ...userData,
        videoResumeData: sortedAndLimitedData
    };

    console.log("userData   ",userData);

  
  
   const userDocRef = doc(db, "Users", userDataSaved.userID);
   await setDoc(userDocRef, userData, {
     merge: true
   });
   const userDataEcode = setUserData(updatedUserData);
   localStorage.setItem('userData', userDataEcode);




  
      localStorage.setItem('userJobInterest', JSON.stringify(userJobInterest));
      localStorage.setItem('userTagInterest', JSON.stringify(userTagInterest));
  
      setTimeout(() => {

      localStorage.setItem("userLoggedIn", true);
     
     
      handleAuthStateChanged(user);
      showToast("Login state saved successfully!", "success");


      /**
 * Redirects the user based on the last visited page.
 * If the last page contains "obituaries," redirects to "/obituaries."
 * Otherwise, redirects to "/u/" (profile page).
 */
      const lastPage = document.referrer; // Get the URL of the last visited page
   
        if (lastPage && lastPage.includes("obituaries")) {
            // Redirect to the obituaries page
            window.location.href = "/obituaries";
        } else {
            // Redirect to the profile page
            window.location.href = "/u/";
        }
    }, 60000); // 60000ms = 1 minute
    

    } catch (error) {

      console.error("Failed to set user document:", error);

      try {
        // Attempt to retrieve the latest user data from the database
        const userDocRef = doc(db, "Users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        
        if (userSnapshot.exists()) {
            const freshUserData = userSnapshot.data();
            console.log("Fetched fresh user data from DB:", freshUserData);
            
            // Attempt to reset user data in local storage and update with fresh data
          
            localStorage.removeItem('userData');

           let  newUserData = setUserData(freshUserData);
            localStorage.setItem('userData', newUserData);
            console.log("Successfully recovered and updated user data.");
            localStorage.setItem("userLoggedIn", true);



        } else {
            console.error("User data not found in the database.");
            localStorage.setItem("userLoggedIn", false);

        }
    } catch (fetchError) {
        console.error("Failed to fetch or update user data from the database:", fetchError);
        localStorage.setItem("userLoggedIn", false);

    } finally {
        setTimeout(() => {
              location.reload();  // Refresh the page after 1 second
        }, 1000);
    }
   
    }
  
  
  
  };
  
  window.saveUserLoginState = saveUserLoginState;
  
  