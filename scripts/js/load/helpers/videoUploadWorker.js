import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
where, getDocs, storage, getAuth, collection, auth, analytics,
googleProvider,onSnapshot ,
facebookProvider,
getUserId // Export the function
} from 'https://reelcareer.co/scripts/js/load/module.js';


onmessage = function(e) {
    const { userID, videoData } = e.data;
    const fileRef = storage.ref(`users/${userID}/reels/${videoData.name}`);
    const uploadTask = fileRef.put(videoData.file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            postMessage({ progress });
        },
        (error) => {
            postMessage({ error: error.message });
        },
        async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            postMessage({ completed: true, downloadURL });
        }
    );
};
