

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (fedclonesite)
const firebaseConfig = {
  apiKey: "AIzaSyBdn9Bn-wOvVyRuK3yVoEJ2EgyGFOE64bo",
  authDomain: "fedclonesite.firebaseapp.com",
  projectId: "fedclonesite",
  storageBucket: "fedclonesite.firebasestorage.app",
  messagingSenderId: "972980433920",
  appId: "1:972980433920:web:6029b3f55c6f7a7fb1d4e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (for SSR environments like Next.js)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };