import { subirArchivo } from '../firebase/storage.js';
import { saveTask } from '../firebase/firestore.js';
import { currentUser } from '../firebase/auth.js';

export const createPost = () => {
  const div = document.createElement('div');
  const section = document.createElement('div');
  section.innerHTML = `
    <nav>
      <div class="nave">
            <div class="img-container">
              <img src="./images/Sonder-icon.png" alt="">
            </div>
      </div>
    </nav>
    <h1>Create a post</h1>
    
        <article id="create-box" class="create-box">
          <form id="create-form">
            <section id="file-box" class="file-box">
              <input type="file" id="post-img" class="post-img" hidden>
              <img src="./images/photo-icon.png" alt="photo icon" class="photo-icon">
            </section>
            
            <section class="gallery"></section>
            
            <p class="p-create" >Add a description</p>
            <label for="description"></label>
            
            <input id="post-description" type="text" autocomplete="off" placeholder="What do you see in this picture?" maxlength="16">

            <p class="p-create">Location</p>
            <label for="location"></label>
            <input id="post-location" type="text" autocomplete="off" placeholder="Where are you right now?">

            <button id="btn-task-save" class="check">
            <img src="./images/check.png" alt="button check" class="check">
            </button>
        
    </form>
    </article>
    <div id="task-container"></div>
      `;

  /* para que se seleccione todo input en el container
  const checkBox = section.querySelector('#btn-task-save');
  const check = section.querySelector('.check');
  checkBox.addEventListener('click', () => {
    check.click();
    // onNavigate('/home');
  }); */

  const fileBox = section.querySelector('.file-box');
  const fileInput = section.querySelector('#post-img');
  fileBox.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (evento) => {
    evento.preventDefault();
    const archivo = evento.target.files[0];
    console.log(archivo);
    subirArchivo(archivo);
  });

  const createForm = section.querySelector('#create-form');

  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = currentUser();
    const dt = new Date().toLocaleDateString();
    console.log('FECHA: ', dt);
    const postLocation = createForm['post-location'];
    const postDescription = createForm['post-description'];
    saveTask(user.displayName, user.photoURL, localStorage.getItem('url'), postDescription.value, postLocation.value, dt);
    createForm.reset();
  });

  div.append(section);

  return div;
};
