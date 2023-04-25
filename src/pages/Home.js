import {
  collection, query, onSnapshot, orderBy,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth.js';
import {
  deleteTask, db, addLike, unLike, incrementLike, decrement,
} from '../firebase/firestore.js';
import { onNavigate } from '../router.js';
import { setupPosts } from '../components/postCard.js';
import { nav } from '../components/nav.js';

export const home = () => {
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

  function Eliminar(postsContainer) {
    const btnDelete = postsContainer.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });
  }

  function like(postsContainer, querySnapshot, user) {
    const likes = postsContainer.querySelectorAll('.icon-like');
    likes.forEach((liked) => {
      const uId = user.uid;
      const post = querySnapshot.find((doc) => doc.id === liked.dataset.id);
      const likedByUser = post.likeUserId.includes(uId);
      if (likedByUser) {
        liked.src = './images/liked.svg';
      }
      liked.addEventListener('click', ({ target: { dataset } }) => {
        const idPost = dataset.id;
        if (likedByUser) {
          liked.src = './images/like-icon.svg';
          decrement(idPost);
          unLike(idPost, uId);
        } else {
          liked.src = './images/liked.svg';
          incrementLike(idPost);
          addLike(idPost, uId);
        }
      });
    });
  }

  onAuthStateChanged(auth, async (user) => {
    console.log('USeR : ', user);
    if (user) {
      const queryPost = query(collection(db, 'post'), orderBy('date', 'asc')); //   traeme todos los datos que tienes hasta el momento
      onSnapshot(queryPost, (querySnapshot) => {
        // MOSTRAR
        const htmlPosts = setupPosts(querySnapshot, user);
        const postsContainer = section.querySelector('.posts');
        postsContainer.innerHTML = htmlPosts;
        // ELIMINAR
        Eliminar(postsContainer);
        // LIKES
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        like(postsContainer, posts, user);
        // NAVEGADOR
        const navSelector = section.querySelector('#nav');
        navSelector.appendChild(nav());
      });
    } else {
      console.log('USUER : ', user);
    }
  });

  const createPost = section.querySelector('#createPost');
  createPost.addEventListener('click', async () => {
    onNavigate('/createpost');
  });

  div.append(section);

  return div;
};
