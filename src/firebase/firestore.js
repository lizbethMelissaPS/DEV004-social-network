import {
  getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { app } from './config';

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

// obtener posts del doc
// export const post = doc.data;
