// import { signOut } from 'firebase/auth';  permite cerrar sesion que habiamos iniciado
import { getDocs, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth.js';
import { db, deleteTask } from '../firebase/firestore.js';
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

  /// MOSTRAR
  onAuthStateChanged(auth, async (user) => {
    console.log('USeR : ', user);
    if (user) {
      const querySnapshot = await getDocs(collection(db, 'post')); // traeme todos los datos que tienes hasta el momento
      const htmlPosts = setupPosts(querySnapshot.docs);
      const postsContainer = section.querySelector('.posts');
      postsContainer.innerHTML = htmlPosts;
    } else {
      console.log('USUER : ', user);
    }

    /// ELIMINAR
    const postsContainer = section.querySelector('.posts');
    console.log('postsContainer : ', postsContainer);
    const btnDelete = postsContainer.querySelectorAll('.btn-delete');
    console.log('btnDelete : ', btnDelete);
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        console.log('id: ', dataset.id);
        deleteTask(dataset.id);
      });
    });
  });
  ///

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
