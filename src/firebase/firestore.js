/* eslint-disable max-len */
import {
  getFirestore, setDoc, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { app } from './config';

export const db = getFirestore(app);

// guardar dato
export const saveTask = (img, description, location, date) => {
  addDoc(collection(db, 'post'), {
    img, description, location, date,
  });
};

// guardar usuario
export const saveUserData = (name, photo) => {
  setDoc(collection(db, 'userInfo'), { name, photo });
};

// listar datos
export const traerData = () => getDocs(collection(db, 'post'));
// cuando los datos cambien tiempo real

export const onGetTasks = (callback) => onSnapshot(collection(db, 'post'), callback);

/// eliminar
export const deleteTask = (id) => deleteDoc(doc(db, 'post', id));

// editar
export const getTask = (id) => getDoc(doc(db, 'post', id));

// actualizar
export const updateTask = (id, newFile) => updateDoc(doc(db, 'post', id), newFile);
