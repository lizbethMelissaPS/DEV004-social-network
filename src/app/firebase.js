// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDgqC7nTcJgfUTNDgiwdFfOksjqylHd7Ns',
  authDomain: 'sonder-11eee.firebaseapp.com',
  projectId: 'sonder-11eee',
  storageBucket: 'sonder-11eee.appspot.com',
  messagingSenderId: '168562133515',
  appId: '1:168562133515:web:7ace1494350ec17777950e',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
