// Add this to the top of your app.js
const express = require('express');
 
const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/lilro/Desktop/ReelCareer/ReelCareerWebsite/config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

app.post('/addJob', async (req, res) => {
    try {
        const jobData = req.body; // Expect job data from client
        await admin.firestore().collection('Jobs').add(jobData);
        res.status(200).send('Job added successfully');
    } catch (error) {
        res.status(500).send('Error adding job: ' + error.message);
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});