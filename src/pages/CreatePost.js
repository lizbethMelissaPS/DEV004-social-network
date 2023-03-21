import {
  saveTask, onGetTasks, deleteTask, getTask,
} from '../firebase/firestore';

export const createPost = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const section = document.createElement('div');
  section.innerHTML = `
    <nav>
      <div class="nav">
            <div class="img-container">
              <img src="./images/Sonder-icon.png" alt="">
            </div>
      </div>
    </nav>
    <h1>Create a post</h1>
    <form id="task-form">
        <article class="create-box">
            <section class="file-box">
                <input type="file" id="post-img" hidden accept=".png, .jpg, .jpeg">
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
        </article>
    </form>
    <div id="task-container"></div>
      `;

  /// /////////////////////////////
  /* para que se seleccione todo input en el container */
  const fileBox = section.querySelector('.file-box');
  const fileInput = section.querySelector('#post-img');
  fileBox.addEventListener('click', () => {
    fileInput.click();
  });
  /* GUARDAR POST */
  const taskForm = section.querySelector('#task-form');
  const taskContainer = section.querySelector('#task-container');
  // const editStatus = false;
  // const id = '';
  /// ////////////////////////////
  console.log('taskForm');

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const postImg = taskForm['post-img'];
    const postLocation = taskForm['post-location'];
    const postDescription = taskForm['post-description'];
    //
    console.log('GUARDAR', postImg.value, ' ', postLocation.value, ' ', postDescription.value);
    saveTask(postImg.value, postDescription.value, postLocation.value);
    taskForm.reset();
  });

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

  /* INSERTA append */
  div.append(section);

  return div;
};
