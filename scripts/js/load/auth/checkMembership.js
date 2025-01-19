
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
  
  

   // Define membership plans and their limits for each feature
   const membershipLimits = {
    free: {
      postVideos: Infinity,
      companyPages: 1,

      jobPosts: 1,
      sponsoredJobPostCredits: 0,

      obituaryPagesCost: 25,
      obituaryExtraSections: 0,

      digitalResumes: 1,
      savedJobs: 10,
      applicationsBoost: 1,
      profileBoost: 0,


      storeProductListings: 0,
      storeBoostedProducts: 0,
      
      serviceFees: 10,
      
      videoBoost: 0,
      sponsoredVideos: 0,
      videoDuration: 60,
      customEndCard: false,
      relatedProducts: true,

      storeAdvanceAnalytics: false,        
      videoAdvanceAnalytics: false,        
      jobPostAdvanceAnalytics: false,
      obituaryAdvanceAnalytics: false,
      applicationAdvanceAnalytics: false,

    },
    basic: {
      postVideos: Infinity,
      companyPages: 3,

      jobPosts: 5,
      sponsoredJobPostCredits: 1,

      obituaryPagesCost: 25,
      obituaryExtraSections: 3,

      digitalResumes: 3,
      savedJobs: 100,
      applicationsBoost: 3,
      profileBoost: 1,


      storeProductListings: 10,
      storeBoostedProducts: 3,
      
      serviceFees: 10,
      
      videoBoost: 3,
      sponsoredVideos: 0,
      videoDuration: 120, // 2min
      customEndCard: true,
      relatedProducts: true,

      storeAdvanceAnalytics: false,        
      videoAdvanceAnalytics: true,        
      jobPostAdvanceAnalytics: true,
      obituaryAdvanceAnalytics: true,
      applicationAdvanceAnalytics: true,

    },
    pro: {
      postVideos: Infinity,
      companyPages: 5,

      jobPosts: 20,
      sponsoredJobPostCredits: 3,

      obituaryPagesCost: 25,
      obituaryExtraSections: 6,

      digitalResumes: 5,
      savedJobs: Infinity,
      applicationsBoost: 10,
      profileBoost: 5,


      storeProductListings: Infinity,
      storeBoostedProducts: 10,
      
      serviceFees: 10, // 10%
      
      videoBoost: 10,
      sponsoredVideos: 2,
      videoDuration: 360,  // 6mins
      customEndCard: true,
      relatedProducts: true,

      storeAdvanceAnalytics: true,        
      videoAdvanceAnalytics: true,        
      jobPostAdvanceAnalytics: true,
      obituaryAdvanceAnalytics: true,
      applicationAdvanceAnalytics: true,

    },
    basicYearly: {
      postVideos: Infinity,
      companyPages: 3,

      jobPosts: 60,
      sponsoredJobPostCredits: 0,

      obituaryPagesCost: 25,
      obituaryExtraSections: Infinity,

      digitalResumes: 5,
      savedJobs: Infinity,
      applicationsBoost: 10,
      profileBoost: 30,


      storeProductListings: 100,
      storeBoostedProducts: 24,
      
      serviceFees: 10, // 10%
      
      videoBoost: 24,
      sponsoredVideos: 0,
      videoDuration: 120,  // 2mins
      customEndCard: true,
      relatedProducts: true,

      storeAdvanceAnalytics: true,        
      videoAdvanceAnalytics: true,        
      jobPostAdvanceAnalytics: true,
      obituaryAdvanceAnalytics: true,
      applicationAdvanceAnalytics: true,
    },
    proYearly: {
      postVideos: Infinity,
      companyPages: 5,

      jobPosts: 240,
      sponsoredJobPostCredits: 12,

      obituaryPagesCost: 25,
      obituaryExtraSections: Infinity,

      digitalResumes: 5,
      savedJobs: Infinity,
      applicationsBoost: 10,
      profileBoost: 30,


      storeProductListings: Infinity,
      storeBoostedProducts: 120,
      
      serviceFees: 8, // 8%
      
      videoBoost: 120,
      sponsoredVideos: 12,
      videoDuration: 360,  // 6mins
      customEndCard: true,
      relatedProducts: true,

      storeAdvanceAnalytics: true,        
      videoAdvanceAnalytics: true,        
      jobPostAdvanceAnalytics: true,
      obituaryAdvanceAnalytics: true,
      applicationAdvanceAnalytics: true,
    },
    lifetime: {
      postVideos: Infinity,
      companyPages: 5,

      jobPosts: Infinity,
      sponsoredJobPostCredits: 0,

      obituaryPagesCost: 25,
      obituaryExtraSections: Infinity,

      digitalResumes: 5,
      savedJobs: Infinity,
      applicationsBoost: 10,
      profileBoost: 10,


      storeProductListings: Infinity,
      storeBoostedProducts: 120,
      
      serviceFees: 10, // 10%
      
      videoBoost: 120,
      sponsoredVideos: 12,
      videoDuration: 360,  // 6mins
      customEndCard: true,
      relatedProducts: true,

      storeAdvanceAnalytics: true,        
      videoAdvanceAnalytics: true,        
      jobPostAdvanceAnalytics: true,
      obituaryAdvanceAnalytics: true,
      applicationAdvanceAnalytics: true,
    }
  };


  const featureCosts = {
    postVideos: 5, // Cost in credits per video post
    companyPages: 3, // Cost in credits per additional company page
    jobPosts: 1, // Cost per job post
    obituaryPagesCost: 25, // One-time cost for obituary pages
    obituaryExtraSections: 3, // Cost for additional sections in obituary
    digitalResumes: 2, // Cost per digital resume
    savedJobs: 1, // Cost per saved job slot
    applicationsBoost: 1, // Cost per application boost
    profileBoost: 1, // Cost per profile boost
    videoBoost: 2, // Cost per video boost
    sponsoredVideos: 3, // Cost per sponsored video post
    videoDuration: 10, // Additional cost per video minute
    customEndCard: 5, // Cost for custom end card
    relatedProducts: 1, // Cost for related products
    storeProductListings: 1, // Cost per store product listing
    storeBoostedProducts: 2, // Cost per boosted product
    storeAdvanceAnalytics: 3, // Cost for store analytics
    videoAdvanceAnalytics: 3, // Cost for video analytics
    jobPostAdvanceAnalytics: 3, // Cost for job post analytics
    obituaryAdvanceAnalytics: 3, // Cost for obituary analytics
    applicationAdvanceAnalytics: 3, // Cost for application analytics
  };
  

  const actionMap = {
    companyPages: ['companyPagesCount', 'companyPages'],
    obituaryExtraSections: ['obituaryExtraSectionsLimit', 'obituaryExtraSections'],
    digitalResumes: ['resumeCount', 'digitalResumes'],
    savedJobs: ['savedForLater', 'savedJobs'],
    storeProductListings: ['storeProductListingsCount', 'storeProductListings'],
    storeBoostedProducts: ['storeBoostedProductsCount', 'storeBoostedProducts'],
    sponsoredVideos: ['sponsoredVideoPostCredits', 'sponsoredVideos'],
    videoDuration: ['videoDurationLimit', 'videoDuration'],
    customEndCard: ['customEndCardBool', 'customEndCard'],
    relatedProductsBool: ['relatedProductsBool', 'relatedProductsBool'],
    storeAdvanceAnalytics: ['storeAdvanceAnalyticsBool', 'storeAdvanceAnalytics'],
    videoAdvanceAnalytics: ['videoAdvanceAnalyticsBool', 'videoAdvanceAnalytics'],
    jobPostAdvanceAnalytics: ['jobPostAdvanceAnalyticsBool', 'jobPostAdvanceAnalytics'],
    obituaryAdvanceAnalytics: ['obituaryAdvanceAnalyticsBool', 'obituaryAdvanceAnalytics'],
    applicationAdvanceAnalytics: ['applicationAdvanceAnalyticsBool', 'applicationAdvanceAnalytics'],
    postJob: ['jobPostCredits', 'jobPosts'],
    boostApplication: ['applicationsBoostCredits', 'applicationsBoost'],
    boostProfile: ['profileBoostCredits', 'profileBoost'],
    addObituary: ['obituaryPageCredits', 'obituaryPages'],
    videoBoost: ['videoBoostCredits', 'videoBoost'],
    sponsoredJobPost: ['sponsoredJobPostCredits', 'sponsoredJobPost']
};

  async function purchaseExtraCredits(userID, feature, amount) {
    const userRef = doc(db, "Users", userID);
    try {
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        console.error("User not found!");
        return;
      }
  
      const userDataSaved = userDoc.data();
      const currentCredits = userDataSaved[feature] || 0;
      
      // Check if user has enough credits for the purchase
      const creditCost = featureCosts[feature] * amount;
      if (userDataSaved.accountBalance < creditCost) {
        showToast("Insufficient balance for this purchase.");
        return;
      }
  
      // Deduct the credit cost from the user's balance
      const updatedCredits = currentCredits + amount;
      const updatedBalance = userDataSaved.accountBalance - creditCost;
  
      // Update the user's credits and balance in Firestore
      await updateDoc(userRef, { 
        [feature]: updatedCredits,
        accountBalance: updatedBalance
      });
  
      console.log(`Successfully purchased ${amount} extra ${feature} for ${creditCost} credits.`);
      showToast(`Successfully purchased ${amount} extra ${feature} for ${creditCost} credits.`);
  
    } catch (error) {
      console.error("Error purchasing extra credits: ", error);
      showToast("There was an error purchasing extra credits. Please try again later.");
    }
  }
  




// Function to check membership eligibility for various actions
function checkMembershipEligibility(action) {
    const userDataSaved = getUserData() || {};
    const membershipType = userDataSaved.membershipType || 'free';
    const userCredits = {
        ...{
            isAccountLocked: false,
            videoPostRestriction: false,
            basicTrialUseBool: false,
            proTrialUseBool: false,
            userID: 0,
            accountBalance: 0,
            companyPagesCount: 0,
            obituaryPageCredits: 0,
            obituaryExtraSectionsLimit: 0,
            jobPostCredits: 0,
            sponsoredJobPostCredits: 0,
            applicationsBoostCredits: 0,
            profileBoostCredits: 0,
            resumeCount: 0,
            savedForLater: 0,
            videoDurationLimit: 60,
            videoBoostCredits: 0,
            sponsoredVideoPostCredits: 0,
            storeProductListingsCount: 0,
            storeBoostedProductsCount: 0,
            customEndCardBool: false,
            relatedProductsBool: false,
            storeAdvanceAnalyticsBool: false,
            videoAdvanceAnalyticsBool: false,
            jobPostAdvanceAnalyticsBool: false,
            obituaryAdvanceAnalyticsBool: false,
            applicationAdvanceAnalyticsBool: false,
        },
        ...userDataSaved
    };

 
  
    if (userCredits.isAccountLocked) {
        showToast("Your account is restricted. Contact customer service for more info.");
        return false;
    }

    if (actionType.includes('video') && userCredits.videoPostRestriction) {
        showToast("Your account is restricted from using video services.");
        return false;
    }


    if (actionMap[action]) {
        const [creditField, feature] = actionMap[action];
        const creditCost = featureCosts[feature] || 0;
        const availableCredits = userCredits[creditField] || 0;
        
        if (availableCredits < creditCost) {
          showToast(`Insufficient credits for ${feature}.`);
          // Optionally, prompt to purchase extra credits
          const userResponse = window.confirm(`You do not have enough credits for ${feature}. Would you like to purchase more credits?`);
          if (userResponse) {
            const extraCredits = prompt("How many extra credits would you like to purchase?");
            if (extraCredits > 0) {
              purchaseExtraCredits(userDataSaved.userID, feature, parseInt(extraCredits));
            }
          }
          return false;
        }
      }
    
      return true;
    }

window.checkMembershipEligibility = checkMembershipEligibility;








/* 

// Function to handle making a video a sponsored video
function makeSponsoredVideo(videoId) {
    if (checkMembershipEligibility('sponsoredVideos')) {
        // Assume markVideoAsSponsored is a function that processes the sponsorship
        markVideoAsSponsored(videoId).then(response => {
            if (response.success) {
                showToast("Your video has been successfully marked as sponsored!");
            } else {
                showToast("There was an issue sponsoring the video. Please try again.");
            }
        }).catch(error => {
            console.error("Error sponsoring video:", error);
            showToast("An error occurred. Please try again.");
        });
    } else {
        // Feedback is already provided by checkMembershipEligibility
        console.log("User not eligible for sponsored video.");
    }
}

// Example usage when a user clicks a button
document.getElementById('sponsorVideoButton').addEventListener('click', function() {
    const videoId = '12345'; // Replace with the actual video ID
    makeSponsoredVideo(videoId);
});
 */




// Function to list user's benefits based on membership type
function listMemberTypeBenefits(membershipType) {
  
    

    // Define membership plans and their benefits
    const membershipBenefits = {
        free: [
            "Unlimited video posts",
            "1 company page",
            "1 job post",
            "10 saved jobs",
            "1 application boost",
            "No custom end card",
            "Basic analytics for free"
        ],
        basic: [
            "Unlimited video posts",
            "3 company pages",
            "5 job posts",
            "100 saved jobs",
            "3 application boosts",
            "1 profile boost",
            "Custom end card",
            "Advanced analytics for obituary, job post, and video"
        ],
        pro: [
            "Unlimited video posts",
            "5 company pages",
            "20 job posts",
            "Unlimited saved jobs",
            "10 application boosts",
            "5 profile boosts",
            "Advanced store analytics",
            "360 seconds video duration",
            "Sponsored video credits"
        ],
        basicYearly: [
            "Unlimited video posts",
            "3 company pages",
            "60 job posts",
            "Unlimited saved jobs",
            "10 application boosts",
            "30 profile boosts",
            "Obituary sections: unlimited",
            "2-minute video duration",
            "Custom end card",
            "Advanced analytics"
        ],
        proYearly: [
            "Unlimited video posts",
            "5 company pages",
            "240 job posts",
            "Unlimited saved jobs",
            "10 application boosts",
            "30 profile boosts",
            "Obituary sections: unlimited",
            "6-minute video duration",
            "Store boosted products: 120",
            "Service fee: 8%"
        ],
        lifetime: [
            "Unlimited video posts",
            "5 company pages",
            "Unlimited job posts",
            "Unlimited saved jobs",
            "10 application boosts",
            "10 profile boosts",
            "Unlimited obituary sections",
            "6-minute video duration",
            "Sponsored video credits"
        ]
    };

    const benefits = membershipBenefits[membershipType] || membershipBenefits['free'];
    
    console.log(`Benefits for ${membershipType} membership:`);
    benefits.forEach(benefit => {
        console.log(`- ${benefit}`);
    });

    return benefits;
}

// Example usage
//  listMemberTypeBenefits(membershipType);

window.listMemberTypeBenefits = listMemberTypeBenefits;



// Function to list out a user's benefits and usage
function listUserBenefits() {
    const userDataSaved = getUserData() || {};
    const membershipType = userDataSaved.membershipType || 'free';
    const userCredits = {
        ...{
            isAccountLocked: false,
            videoPostRestriction: false,
            basicTrialUseBool: false,
            proTrialUseBool: false,
            userID: 0,
            accountBalance: 0,
            companyPagesCount: 0,
            obituaryPageCredits: 0,
            obituaryExtraSectionsLimit: 0,
            jobPostCredits: 0,
            sponsoredJobPostCredits: 0,
            applicationsBoostCredits: 0,
            profileBoostCredits: 0,
            resumeCount: 0,
            savedForLater: 0,
            videoDurationLimit: 60,
            videoBoostCredits: 0,
            sponsoredVideoPostCredits: 0,
            storeProductListingsCount: 0,
            storeBoostedProductsCount: 0,
            customEndCardBool: false,
            relatedProductsBool: false,
            storeAdvanceAnalyticsBool: false,
            videoAdvanceAnalyticsBool: false,
            jobPostAdvanceAnalyticsBool: false,
            obituaryAdvanceAnalyticsBool: false,
            applicationAdvanceAnalyticsBool: false,
        },
        ...userDataSaved
    };

  
    if (userCredits.isAccountLocked) {
        showToast("Your account is restricted. Contact customer service for more info.");
        return;
    }

    const benefits = [
        { name: 'Company Pages', limit: membershipLimits[membershipType].companyPages, used: userCredits.companyPagesCount },
        { name: 'Obituary Pages', limit: membershipLimits[membershipType].obituaryPagesCost, used: userCredits.obituaryPageCredits },
        { name: 'Obituary Extra Sections', limit: membershipLimits[membershipType].obituaryExtraSections, used: userCredits.obituaryExtraSectionsLimit },
        { name: 'Digital Resumes', limit: membershipLimits[membershipType].digitalResumes, used: userCredits.resumeCount },
        { name: 'Saved Jobs', limit: membershipLimits[membershipType].savedJobs, used: userCredits.savedForLater },
        { name: 'Video Duration Limit', limit: membershipLimits[membershipType].videoDuration, used: userCredits.videoDurationLimit },
        { name: 'Applications Boost', limit: membershipLimits[membershipType].applicationsBoost, used: userCredits.applicationsBoostCredits },
        { name: 'Profile Boost', limit: membershipLimits[membershipType].profileBoost, used: userCredits.profileBoostCredits },
    ];

    let benefitsList = 'Your Membership Benefits:\n';

    benefits.forEach(benefit => {
        benefitsList += `${benefit.name}: ${benefit.used} / ${benefit.limit} used\n`;
    });

    showToast(benefitsList);

    return benefitsList;
}

// Call the function to list the user's benefits
window.listUserBenefits = listUserBenefits;


import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from './firebase-config';  // Ensure your db is initialized properly

async function updateUserBenefits(userID, membershipType) {
    const newBenefits = membershipLimits[membershipType] || membershipLimits.free; // Default to 'free' if invalid

    // Reference to the user document in Firestore
    const userRef = doc(db, "Users", userID);
    
    try {
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            console.error("User not found!");
            return;
        }

        const userDataSaved = userDoc.data() || {};

        let newStartDate;
        let newRenewalDate;
        let newExpiryDate;

        // Handle upgrades and downgrades
        if (membershipType !== userDataSaved.membershipType) {
            // Downgrade case: The new membership should start after the current plan ends
            newStartDate = userDataSaved.membershipExpiry; // Start after current expiry
            newRenewalDate = new Date(newStartDate); // Set renewal to after the expiry
            newRenewalDate.setDate(newStartDate.getDate() + 30); // 30-day deadline from expiry
            newExpiryDate = new Date(newRenewalDate); // Adjust this based on your rules
        } else {
            // If upgrading or no change, use current dates
            newStartDate = new Date();
            newRenewalDate = new Date(newStartDate.setDate(newStartDate.getDate() + 30)); // 30-day deadline
            newExpiryDate = new Date(newRenewalDate); // Adjust based on your rules
        }

        // Calculate accumulated credits for upgrades
        let newMembershipMonthCount = userDataSaved.membershipMonthCount || 0;
        if (membershipType !== userDataSaved.membershipType && membershipType !== 'free') {
            // If upgrading, accumulate new month count and other credits
            newMembershipMonthCount += 1; // Adding 1 month for the upgrade, adjust based on your rules
        }

        const updatedData = {
            membershipType: membershipType,
            membershipMonthCount: newMembershipMonthCount,
            membershipStartDate: newStartDate,
            membershipUpdateDate: new Date(),
            membershipRenewalDate: newRenewalDate,
            membershipExpiry: newExpiryDate,

            postVideos: newBenefits.postVideos,
            companyPages: newBenefits.companyPages,
            jobPosts: newBenefits.jobPosts,
            obituaryPagesCost: newBenefits.obituaryPagesCost,
            obituaryExtraSections: newBenefits.obituaryExtraSections,
            digitalResumes: newBenefits.digitalResumes,
            savedJobs: newBenefits.savedJobs,
            applicationsBoost: newBenefits.applicationsBoost,
            profileBoost: newBenefits.profileBoost,
            storeProductListings: newBenefits.storeProductListings,
            videoDuration: newBenefits.videoDuration,
            videoBoost: newBenefits.videoBoost,
            sponsoredVideos: newBenefits.sponsoredVideos
        };

        // Update the user data in Firestore
        await updateDoc(userRef, updatedData);
        console.log("User benefits updated successfully.");

        // Notify the user of the update
        if (membershipType !== userDataSaved.membershipType) {
            // Notify user that their new plan starts after the current plan ends
            showToast("Your new plan will start after your current plan ends.");
        } else {
            showToast("Your benefits have been updated based on your membership level.");
        }

    } catch (error) {
        console.error("Error updating user benefits: ", error);
        showToast("There was an error updating your benefits. Please try again later.");
    }
}

window.updateUserBenefits = updateUserBenefits;
// Usage example:
// Update user benefits when they upgrade or downgrade their membership
//updateUserBenefits(userID, 'pro'); // For example, upgrading or downgrading to 'pro' membership
