// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByoZ-8U5ETcxG-QTRxGs8IjDlnQ1x5pdw",
  authDomain: "ai-notion-clone-e5d03.firebaseapp.com",
  projectId: "ai-notion-clone-e5d03",
  storageBucket: "ai-notion-clone-e5d03.firebasestorage.app",
  messagingSenderId: "598681074619",
  appId: "1:598681074619:web:2282b58ee5ee403478a29e",
  measurementId: "G-WVWNJBQ8Q7",
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
