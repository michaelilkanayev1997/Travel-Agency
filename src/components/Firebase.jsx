// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-UhzdSDnF5UPriiVuqUDWWbO_bAmPByE",
  authDomain: "travelgo-20e9e.firebaseapp.com",
  projectId: "travelgo-20e9e",
  storageBucket: "travelgo-20e9e.appspot.com",
  messagingSenderId: "22056990411",
  appId: "1:22056990411:web:278ed4baeea4176af5cd4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
