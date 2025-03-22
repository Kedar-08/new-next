console.log("Firebase API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ✅ Prevent multiple Firebase instances
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Returns user object on success
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// ✅ Function to sign out
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Sign Out Error:", error);
  }
};

// ✅ Correctly export everything
export { auth, provider, signInWithGoogle, logout };
