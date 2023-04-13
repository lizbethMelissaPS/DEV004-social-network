/* eslint-disable max-len */
import {
  getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { app } from './config';

export const db = getFirestore(app);

// guardar dato
export const saveTask = (name, photo, img, description, location, date, like, likeUserId) => {
  addDoc(collection(db, 'post'), {
    name, photo, img, description, location, date, like, likeUserId,
  });
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
