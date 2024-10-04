const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/lilro/Desktop/ReelCareer/ReelCareerWebsite/config/serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getCollectionsAndDocuments() {
    const collections = await db.listCollections();
    
    for (const collection of collections) {
      console.log(`\nCollection: ${collection.id}`);
      
      const snapshot = await collection.get();
      snapshot.forEach(doc => {
        console.log(`\nDocument: ${doc.id}`);
        const data = doc.data();
        Object.keys(data).forEach(field => {
          console.log(`Field: ${field}, Value: ${JSON.stringify(data[field])}`);
        });
      });
    }
  }
  
  getCollectionsAndDocuments();