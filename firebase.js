// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbrkRYKQbJQpHglY_aXFmpui0Ltn6oFmU",
  authDomain: "pizza-ordering-rn.firebaseapp.com",
  projectId: "pizza-ordering-rn",
  storageBucket: "pizza-ordering-rn.appspot.com",
  messagingSenderId: "939814523232",
  appId: "1:939814523232:web:fe31cbb6ea070d715d4e05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
