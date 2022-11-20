import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyAXBnHbQKKSJFhJKfnB_7owPsDowFWVJHs',
    authDomain: 'react-spotify-50ca1.firebaseapp.com',
    projectId: 'react-spotify-50ca1',
    storageBucket: 'react-spotify-50ca1.appspot.com',
    messagingSenderId: '244625407016',
    appId: '1:244625407016:web:742ecb81abf1e85c63891d',
    measurementId: 'G-8Y4HP7W88X',
    databaseURL: 'https://react-spotify-50ca1-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
