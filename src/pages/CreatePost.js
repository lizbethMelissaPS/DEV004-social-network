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
                <input type="file" id="image-post" hidden accept=".png, .jpg, .jpeg">
                <img src="./images/photo-icon.png" alt="photo icon" class="photo-icon">
            </section>
            
            <section class="gallery"></section>
            
            <p class="p-create" >Add a description</p>
            <label for="description"></label>
            <input id="" type="text" autocomplete="off" placeholder="What do you see in this picture?" maxlength="16">
            <p class="p-create">Location</p>
            <label for="location"></label>
            <input id="" type="text" autocomplete="off" placeholder="Where are you right now?">

            <button id="" type="button" class="check">
            <img src="./images/check.png" alt="button check" class="check">
            </button>
        </article>
    </form>
    <div id="task-container"></div>
      `;
  const taskForm = section.querySelector('#task-form');
  const taskContainer = section.querySelector('#task-container');
  const editStatus = false;
  const id = '';



  
  /* para que se seleccione todo input en el container */
  const fileBox = section.querySelector('.file-box');
  const fileInput = section.querySelector('#image-post');
  fileBox.addEventListener('click', () => {
    fileInput.click();
  });

  /* INSERTA append */
  div.append(section);

  return div;
};
