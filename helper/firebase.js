// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQAdfy8CrIlFzAWlxlQ7TZgUlkJTba98M",
  authDomain: "wendy-backend.firebaseapp.com",
  projectId: "wendy-backend",
  storageBucket: "wendy-backend.appspot.com",
  messagingSenderId: "850738930411",
  appId: "1:850738930411:web:482f38578faea5bf6594ae",
  measurementId: "G-M8Q1829B3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
