
function disableButtons(buttonIds) {
    // Loop through the array of button IDs
    buttonIds.forEach(function(id) {
      // Get the button element by its ID
      var button = document.getElementById(id);
      
      // If the button exists, disable it
      if (button) {
        button.disabled = true;
      }
    });
  }
  
  // Example usage:
  var buttonsToDisable = ['bulkJobPosting', 'bulkJobPosting', 'bulkJobPosting'];
  disableButtons(buttonsToDisable);
  

  

// Functionality for bulk job posting
document.getElementById("bulkJobPosting").onclick = function() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = async function(e) { // Make onload asynchronous
            const csvData = e.target.result;
            const rows = csvData.split("\n").slice(1); // Skip header row
            
            // Prepare an array of promises for job postings
            const jobPromises = rows.map(async (row) => {
                const [title, description, requirements, salary, tags] = row.split(",");
                try {
                    // Use addDoc with collection
                    await addDoc(collection(db, "Jobs"), {
                        title,
                        description,
                        requirements,
                        salary,
                        tags: tags.split(","),
                        status: "active",
                        createdAt: new Date()
                    });
                } catch (error) {
                    throw new Error("Error adding job posting: " + error.message);
                }
            });
            
            try {
                await Promise.all(jobPromises);
                alert("Bulk job postings created successfully!");
            } catch (error) {
                alert(error.message); // Show specific error message if any
            }
        };
        
        reader.readAsText(file);
    };
    fileInput.click();
};
