const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/lilro/Desktop/ReelCareer/ReelCareerWebsite/config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function createCollections() {
  // Create Users Collection
  await db.collection("Users").doc("userId").set({
    name: "John Doe",
    email: "john.doe@example.com",
    passwordHash: "hashedpassword",
    active: true,
    googleId: "googleId123",
    appleId: "appleId123",
    profile: {
      bio: "User Bio",
      portfolioLink: "http://portfolio.link",
    },
    notifications: [],
    createdAt: new Date(),
  });

  // Create Jobs Collection
  await db.collection("Jobs").doc("jobId").set({
    title: "Software Engineer",
    company: "Tech Company",
    location: "Remote",
    description: "Job Description",
    tags: ["remote", "full-time"],
    active: true,
    createdAt: new Date(),
  });

  // Create Applications Collection
  await db.collection("Applications").doc("applicationId").set({
    userId: "userId",
    jobId: "jobId",
    status: "applied",
    customQuestions: [],
    portfolioLinks: [],
    createdAt: new Date(),
  });

  // Create Video Resumes Collection
  await db.collection("VideoResumes").doc("videoResumeId").set({
    userId: "userId",
    videoResumeURL: [],
    createdAt: new Date(),
  });

  // Create Notifications Collection
  await db.collection("Notifications").doc("notificationId").set({
    userId: "userId",
    message: "New job available!",
    read: false,
    createdAt: new Date(),
  });

  // Create User Activity Tracking Collection
  await db.collection("UserActivity").doc("activityId").set({
    userId: "userId",
    activityType: "job_view",
    jobId: "jobId",
    timestamp: new Date(),
  });

  console.log("Collections and documents created successfully.");
}

// Call the function to create collections
createCollections().catch(console.error);
