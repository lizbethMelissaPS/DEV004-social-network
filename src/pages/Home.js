// import { signOut } from 'firebase/auth';  permite cerrar sesion que habiamos iniciado
import { doc, getDocs, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { async } from 'regenerator-runtime';
import { auth } from '../firebase/auth.js';
import {
  db,
} from '../firebase/firestore.js';
import { onNavigate } from '../main.js';
import { setupPosts } from '../components/postCard.js';
// import { auth, db } from '../firebase/config.js';

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

  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     const querySnapshot = await getDocs(collection(db, 'posts')); // traeme todos los datos que tienes hasta el momento
  //     const htmlPosts = setupPosts(querySnapshot.docs);
  //     const postsContainer = section.querySelector('.posts');
  //     postsContainer.innerHTML = htmlPosts;
  //   } else {
  //     console.log(user);
  //   }
  // });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const querySnapshot = await getDocs(collection(db, 'posts')); // traeme todos los datos que tienes hasta el momento
      const htmlPosts = setupPosts(querySnapshot.docs);
      const postsContainer = section.querySelector('.posts');
      postsContainer.innerHTML = htmlPosts;
    } else {
      console.log(user);
    }
  });

  // const postsContainer = section.querySelector('.posts');
  // postsContainer.addEventListener('click', async (e) => {
  //   e.preventDefault();
  // });

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
