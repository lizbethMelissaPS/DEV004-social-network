// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import {
  getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';

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
export const db = getFirestore(app);

// guardar dato
export const saveTask = (title, description) => {
  console.log('aqui');
  addDoc(collection(db, 'tasks'), { title, description });
};

// listar datos
export const getTasks = () => getDocs(collection(db, 'tasks'));

// cuando los datos cambien tiempo real

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

/// eliminar
export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

// editar
export const getTask = (id) => getDoc(doc(db, 'tasks', id));

// actualizar
export const updateTask = (id, newFile) => updateDoc(doc(db, 'tasks', id), newFile);
