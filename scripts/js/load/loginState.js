

// Function to update or create user information in Firestore
const saveUserLoginState = async (user) => {
    try {
      //console.log(" User info: ", user);
      handleAuthStateChanged(user);
   
  let jobArray = [], tagArray = [];
  
  const userDataSaved =  getUserData() || [];
  const userIP = sessionStorage.getItem('userIP') || "";
  
      let userTagInterest = JSON.parse(localStorage.getItem('userTagInterest')) || [];
  
      let userJobInterest = JSON.parse(localStorage.getItem('userJobInterest')) || [];
      //console.log(" User userIP: ", userIP);
  
      
      const profilePic = document.getElementById('nav-bar-profilePic').src;
  
   
  
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
  
      let userData = {
        email: user.email || "Unknown",
        lastLogin: serverTimestamp(),
        ipAddress: userIP || "",
        userID: user.uid || "",
        displayName: userDataSaved.displayName || user.displayName,
        verified: user.emailVerified || false,
        phoneNumber: user.phoneNumber || '',
        profilePicture: user.photoURL || profilePic,
        membershipType: userDataSaved.membershipType || "free",
        membershipExpiry: userDataSaved.membershipExpiry || new Date(new Date().setDate(new Date().getDate() + 30)), // 30-day deadline
  
    
  
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
  
  
      showToast("Login state saved successfully!", "success");
  
    window.location.href = "/u/"; // Redirect to profile
  
      
    } catch (error) {
      console.error("Error saving user login state:", error);
    }
  
  
  
  };
  
  window.saveUserLoginState = saveUserLoginState;
  
  