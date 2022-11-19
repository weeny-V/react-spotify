// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXBnHbQKKSJFhJKfnB_7owPsDowFWVJHs",
    authDomain: "react-spotify-50ca1.firebaseapp.com",
    projectId: "react-spotify-50ca1",
    storageBucket: "react-spotify-50ca1.appspot.com",
    messagingSenderId: "244625407016",
    appId: "1:244625407016:web:742ecb81abf1e85c63891d",
    measurementId: "G-8Y4HP7W88X",
    databaseURL: 'https://react-spotify-50ca1-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
