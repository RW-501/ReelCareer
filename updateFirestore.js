const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// Middleware for parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to render HTML
app.set("view engine", "ejs");

// Serve the admin update form
app.get("/admin", (req, res) => {
  res.render("admin");
});

// Endpoint to update the job document
app.post("/updateJob", async (req, res) => {
  try {
    const { jobId, applicationRequired, applicationLink } = req.body;

    // Check if the job ID exists in the request
    if (!jobId) {
      return res.status(400).send("Job ID is required.");
    }

    // Update the job in the "Jobs Collection"
    const jobRef = db.collection("Jobs").doc(jobId);
    await jobRef.update({
      applicationRequired: applicationRequired === "true", // Convert string to boolean
      applicationLink: applicationLink || "", // Default to an empty string if no link is provided
    });

    res.send("Job updated successfully.");
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send("Error updating the job.");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
