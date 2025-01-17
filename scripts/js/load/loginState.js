
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

   
   // Fetch the video resume data from Firestore
       const querySnapshot = await getDocs(reelsQuery);
       querySnapshot.forEach((doc) => {
         // Assuming the document contains the necessary fields: reelID, videoResumeURL, tags
         const data = doc.data();
         videoResumeData.push({
           reelID: data.reelID,
           videoResumeURL: data.videoResumeURL,
           tags: data.tags || [],  // Default to empty array if no tags
           createdAt: data.createdAt.toDate(), // Assuming createdAt is a timestamp
           status: data.status || 'posted', // Default to 'posted' if no status
           reelURL: `https://reelcareer.co/reels/?r=${data.reelID}` // Construct reel URL
         });
       });



      let userData = {
        email: user.email || "Unknown",
        lastLogin: new Date(),
        ipAddress: userIP || "",
        userID: user.uid || "",
        displayName: userDataSaved.displayName || user.displayName,
        verified: user.emailVerified || false,
        phoneNumber: user.phoneNumber || '',
        profilePicture: user.photoURL || profilePic,
        membershipType: userDataSaved.membershipType || "free",
        membershipExpiry: userDataSaved.membershipExpiry || new Date(new Date().setDate(new Date().getDate() + 30)), // 30-day deadline
        joinedDate: userDataSaved.joinedDate || joinedDate || new Date(), // Save joined date if not set
        loginProvider,  // Add login provider to user data
        videoResumeData: videoResumeData,
        contactsCount: connectionCount || 0,
        videoResumeCount: videoResumeData.length || 0,
  
        tags: tagArray || "",
        jobInterest: jobArray  || "",
        publicProfile: userDataSaved.publicProfile || true,
        resumeCount: userDataSaved.resumes?.length || 0, // Optional chaining prevents errors if `resumes` is undefined
        savedForLater: userDataSaved.savedJobs?.length || 0,
        userAppsCount: userDataSaved.userApps?.length || 0,
        jobPostsCount: userDataSaved.jobPosts?.length || 0,
        tagsCount: tagArray.length || 0,
        jobInterestCount: jobArray.length || 0,
  
      };
  
      //console.log(" User userData: ", userData);
  
   
  
      const userDocRef = doc(db, "Users", user.uid);
      await setDoc(userDocRef, userData, { merge: true });
  
  
  
  
   userData = setUserData(userData);
  // console.log("userData   ",userData);
  
   localStorage.setItem('userData', userData);
  
   
  //let newUserData = getUserData();
  
  //console.log("newUserData   ",newUserData);
  
      localStorage.setItem('userJobInterest', JSON.stringify(userJobInterest));
      localStorage.setItem('userTagInterest', JSON.stringify(userTagInterest));
  
  
      localStorage.setItem("userLoggedIn", "true");
  
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


    } catch (error) {
      console.error("Error saving user login state:", error);
    }
  
  
  
  };
  
  window.saveUserLoginState = saveUserLoginState;
  
  