import { getApp, getApps, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDyR-pUvhKqOMmpRKsn2ZcZ7hdS9TPuifI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eventdevx-ranjeet.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eventdevx-ranjeet",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eventdevx-ranjeet.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "430629491092",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:430629491092:web:095e205c8dc713e8463f81",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HFW7T65RWH",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

export const firebasePersistenceReady = setPersistence(
  firebaseAuth,
  browserLocalPersistence
).catch((error) => {
  console.error("EventDevX Firebase persistence setup failed:", error);
});

export default firebaseApp;
