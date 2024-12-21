let USERDATA = '';


function getUserDisplayName() {
  // Retrieve user data from local storage
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData) {
    // Parse the stored data
     USERDATA =  getUserData();

    // Return the displayName if it exists
    return USERDATA.displayName || "No name available"; // Fallback if displayName is not set
  } else {
    //console.log("No user data found in local storage");
    return "No user data available"; // Fallback if no user data exists
  }
}


// Example usage
const userDisplayName = getUserDisplayName();
console.log("Welcome: ", userDisplayName);
