// import { signOut } from 'firebase/auth';  permite cerrar sesion que habiamos iniciado
import { getDocs, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logOut } from '../firebase/auth.js';
import { db, deleteTask } from '../firebase/firestore.js';
import { onNavigate } from '../router.js';
import { setupPosts } from '../components/postCard.js';
import { nav } from '../components/nav.js';
// import { auth, db } from '../firebase/config.js';

export const home = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const section = document.createElement('div');
  section.innerHTML = `
  <header class='header-home'>
    <nav id="nav"> Icono </nav>
    <input type="search" class="search" placeholder="search">
          <button id='createPost' class="create-home">
            <img src="./images/create.png" class="create-home">
          </button>  
                
          
  </header>
  <button id='logout' class="facebook">Log Out</button>
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
      const navSelector = section.querySelector('#nav');
      const htmlNav = `${nav()}`;
      navSelector.innerHTML = htmlNav;
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
    await logOut();
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
