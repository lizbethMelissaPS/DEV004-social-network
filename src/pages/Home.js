import { getDocs, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logOut } from '../firebase/auth.js';
import { deleteTask, db } from '../firebase/firestore.js';
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
    <nav id="nav">  
      <picture id="logo-home" class="logo-container">
        <img src="./images/Sonder-icon.png" alt="Sonder icon">
      </picture> 
    </nav>
    <input type="search" class="search" placeholder="search">
          <button id='createPost' class="create-home">
            <img src="./images/create.png" class="create-home">
          </button>  
                
          
  </header>
  <aside class='aside'>
      <article class="posts"></article>
    </aside>
    `;
  const logoHome = section.querySelector('#nav');
  logoHome.addEventListener('click', () => {
    document.querySelector('.nav-container').classList.toggle('show');
  });

  
  /// MOSTRAR
  onAuthStateChanged(auth, async (user) => {
    console.log('USeR : ', user);
    if (user) {
      const querySnapshot = await getDocs(collection(db, 'post'));//   traeme todos los datos que tienes hasta el momento
      const htmlPosts = setupPosts(querySnapshot.docs, user);
      const postsContainer = section.querySelector('.posts');
      postsContainer.innerHTML = htmlPosts;
      const navSelector = section.querySelector('#nav');
      navSelector.appendChild(nav());
    } else {
      console.log('USUER : ', user);
    }

    /// ELIMINAR
    const postsContainer = section.querySelector('.posts');
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

  /*
  const logout = section.querySelector('#logout');
  logout.addEventListener('click', async () => {
    await logOut();
    console.log('user signout');
    onNavigate('/login');
  }); */

  const createPost = section.querySelector('#createPost');
  createPost.addEventListener('click', async () => {
    onNavigate('/createpost');
  });

  /* INSERTA append */
  div.append(section);

  return div;
};
