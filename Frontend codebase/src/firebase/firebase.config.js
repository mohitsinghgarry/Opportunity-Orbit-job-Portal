// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa3L9GMr_vDSfRiARGefLzMla9yZ0vN5k",
  authDomain: "opprotunity-orbit-job-portal.firebaseapp.com",
  projectId: "opprotunity-orbit-job-portal",
  storageBucket: "opprotunity-orbit-job-portal.firebasestorage.app",
  messagingSenderId: "143293253019",
  appId: "1:143293253019:web:9b011ea6565be54d788d3e",
  measurementId: "G-EL2SPK96HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;