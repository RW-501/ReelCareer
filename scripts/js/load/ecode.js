
// Function to encode user data
const encodeUserData = (userData, secretKey = '') => {
    try {
   //   console.log("secretKey: ", secretKey);
  
      // Serialize user data to a JSON string
      const jsonString = JSON.stringify(userData);
      if (!jsonString) {
        console.error("Error: User data is empty or invalid");
        return null;
      }
    //  console.log("userData User Data: ", userData);
     // console.log("jsonString Data: ", jsonString);
  
      // Base64 encode the JSON string
      let base64String = btoa(jsonString);
     // console.log("base64String Data: ", base64String);
  
      // Optionally append a secret key for obfuscation
      if (secretKey) {
        base64String = btoa(base64String + secretKey);
      }
  
     // console.log("Encoded Data: ", base64String);
      return base64String;
    } catch (error) {
      console.error("Error encoding user data:", error);
      return null;
    }
  };
  
  window.encodeUserData = encodeUserData;
  
  // Function to decode user data
  const decodeUserData = (encodedData, secretKey = '') => {
    try {
     // console.log("Encoded Data: ", encodedData);
  
      // Optionally remove the secret key if it's been appended
      let base64String = encodedData;
      if (secretKey) {
        base64String = base64String.replace(secretKey, ''); // Remove the secret key if appended
      }
  
      // Decode from Base64
      let jsonString = atob(base64String);
   //   console.log("Decoded Base64 String: ", jsonString);
  
      // Check if the decoded string is valid JSON
      try {
        const userData = JSON.parse(jsonString);
      //  console.log("Decoded User Data: ", userData);
        return userData;
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
       // console.log("Decoded Base64 String is not valid JSON:", jsonString);
        return null;
      }
  
    } catch (error) {
      console.error("Error decoding user data:", error);
      return null;
    }
  };
  
  
  window.decodeUserData = decodeUserData;
  
  
  
  
  
  
  
  
  // Add padding to Base64 string if necessary
  const addBase64Padding = (base64String) => {
    return base64String.length % 4 === 0 ? base64String : base64String + '='.repeat(4 - (base64String.length % 4));
  };
  
  const LOCAL_STORAGE_KEY = 'userData';
  
  function setUserData(userData) {
  
  
        // Retrieve the current object from localStorage
        let currentData = getUserData() || {};
    
        // Merge the updates into the current data
        const updatedData = { ...currentData, ...userData };
        
   
        console.log("updatedData Data:", updatedData);
  
  
    // Encode user data
    let encodedData = encodeUserData(updatedData, "WeThaBest");
    encodedData = addBase64Padding(encodedData);
  
    //console.log("Encoded Data:", encodedData);
  
    // Store in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, encodedData);
      
    return encodedData;
  }
  
  window.setUserData = setUserData;
  
  function getUserData() {
    try {
      const encodedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!encodedData) {
        //console.error("No data found in localStorage");
        return null;
      }
  
      // Remove the secret key if it's appended (you need to know how the secret key was appended)
      const secretKey = "WeThaBest"; // Your secret key used during encoding
      const decodedString = atob(encodedData); // Decode base64 first
  
      // Remove the secret key part (if it was added during encoding)
      const base64WithoutSecretKey = decodedString.replace(secretKey, "");
     // console.log("Decoded Base64 String without Secret Key:", base64WithoutSecretKey);
  
      // Now decode the base64 string without the secret key
      const jsonString = atob(base64WithoutSecretKey);
  
      // Parse the JSON string
      const userData = JSON.parse(jsonString);
     // console.log("Decoded User Data:", userData);
      return userData;
    } catch (error) {
      console.error("Error decoding user data:", error);
      return null;
    }
  }
  
  window.getUserData = getUserData;
  
  
  
  
  
  // Function to update a specific value in localStorage
  function updateLocalStorage(key, updates) {
    // Retrieve the current object from localStorage
    let currentData = JSON.parse(localStorage.getItem(key)) || {};
    
    // Merge the updates into the current data
    const updatedData = { ...currentData, ...updates };
    
    // Save the updated object back to localStorage
    localStorage.setItem(key, JSON.stringify(updatedData));
  }
  
  window.updateLocalStorage = updateLocalStorage;
  
  
  
  
  
  
  let userDataSaved = await getUserData() || {};
  
  // To verify
  //console.log("userDataSaved   ", userDataSaved);
  