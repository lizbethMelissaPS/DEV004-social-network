// import { signOut } from 'firebase/auth';  permite cerrar sesion que habiamos iniciado
import { getDocs, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth.js';
import { db } from '../firebase/firestore.js';
import { onNavigate } from '../main.js';
import { setupPosts } from '../components/postCard.js';
// import { auth, db } from '../firebase/config.js';
import { onGetTasks, deleteTask, getTask } from '../firebase/firestore.js';

export const home = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const section = document.createElement('div');
  section.innerHTML = `
  <nav>
    <div class="nav">
          <div class="img-container">
            <img src="./images/Sonder-icon.png" alt="">
          </div>
          <input type="search" class="search" placeholder="search">
          <button id='logout' class="facebook">Log Out</button>
          <button id='createPost' class="google">+</button>
    </div>
    
  </nav>
  <aside class='aside'>
      <article class="posts"></article>
  </aside>
    `;


  /* FIREBASE */
  const logout = section.querySelector('#logout');
  logout.addEventListener('click', async () => {
    await logout();
    console.log('user signout');
    onNavigate('/login');
  });

  const createPost = section.querySelector('#createPost');
  createPost.addEventListener('click', async () => {
    onNavigate('/createpost');
  });

  /* INSERTA append */
  div.append(section);

  return div;
};

/*
import { async } from 'regenerator-runtime';
import { onNavigate } from '../main';
import {
  saveTask, onGetTasks, deleteTask, getTask, updateTask,
} from './firebase';

// Para que este disponoble en otro lado export
let section;
export const Welcome = () => {
  // UN CONTENEDOR Q CONTENGA A LOS BOTONES
  const div = document.createElement('div');
  section = document.createElement('div');
  section.innerHTML = `
  <form id="task-form">
  <label for="title"> Title:</label>
  <input type="text" placeholder="task Title" id="task-title">

  <label for="description"> Description: </label>
  <textarea type="task-description" rows="3" placeholder="task Description" id="task-description"></textarea>

  <button id="btn-task-save">Save</button>
</form>
<div id="task-container"></div>
      `;

  div.append(section);

  const taskForm = section.querySelector('#task-form');
  const taskContainer = section.querySelector('#task-container');
  let editStatus = false;
  let id = '';

  window.addEventListener('DOMContentLoaded', async () => {
    // const querySnapshot = await getTasks();
    onGetTasks((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        html += `
        <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button class='btn-delete' data-id="${doc.id}">Delete</button>
        <button class='btn-edit' data-id="${doc.id}">Edit</button>

        </div>
        `;
      });
      taskContainer.innerHTML = html;

      const btnDelete = taskContainer.querySelectorAll('.btn-delete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deleteTask(dataset.id);
        });
      });

      const btnEdit = taskContainer.querySelectorAll('.btn-edit');
      btnEdit.forEach((btn) => {
        btn.addEventListener('click', async ({ target: { dataset } }) => {
          const doc = await getTask(dataset.id);
          const task = doc.data();

          taskForm['task-title'].value = task.title;
          taskForm['task-description'].value = task.description;

          editStatus = true;
          id = doc.id;

          taskForm['btn-task-save'].innerText = 'Update';
        });
      });
    });
  });

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    //
    if (!editStatus) {
      saveTask(title.value, description.value);
    } else {
      updateTask(id, { title: title.value, description: description.value });
      editStatus = false;
    }
    taskForm.reset();
  });

  return div;
}; */
