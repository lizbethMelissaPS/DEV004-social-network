import {
  collection, query, onSnapshot, orderBy,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth.js';
import {
  deleteDocPost,
  db,
  addLike,
  unLike,
  incrementLike,
  decrementLike,
} from '../firebase/firestore.js';
import { onNavigate } from '../router.js';
import { setupPosts } from '../components/setupPost.js';
import { nav } from '../components/nav.js';
import sonderIcon from '../images/Sonder-icon.png';
import createIcon from '../images/create.png';
import likedIcon from '../images/liked.svg';
import likeIcon from '../images/like-icon.svg';

function deletePost(postsContainer) {
  const btnDelete = postsContainer.querySelectorAll('.btn-delete');
  btnDelete.forEach((btn) => {
    btn.addEventListener('click', ({ target: { dataset } }) => {
      deleteDocPost(dataset.id);
    });
  });
}

function like(postsContainer, posts, user) {
  const likes = postsContainer.querySelectorAll('.icon-like');
  likes.forEach((liked) => {
    const uId = user.uid;
    const post = posts.find((doc) => doc.id === liked.dataset.id);
    const likedByUser = post.likeUserId.includes(uId);
    if (likedByUser) {
      liked.src = `${likedIcon}`;
    }
    liked.addEventListener('click', ({ target: { dataset } }) => {
      const idPost = dataset.id;
      if (likedByUser) {
        liked.src = `${likeIcon}`;
        decrementLike(idPost);
        unLike(idPost, uId);
      } else {
        liked.src = `${likedIcon}`;
        incrementLike(idPost);
        addLike(idPost, uId);
      }
    });
  });
}

export const home = () => {
  const main = document.createElement('main');
  const section = document.createElement('article');
  section.innerHTML = `
  <header class='header-home'>
    <nav id="nav">  
      <picture id="logo-home" class="logo-container">
        <img src=${sonderIcon} alt="Sonder icon">
      </picture> 
    </nav>
    <input type="search" class="search" placeholder="search">
          <button id='createPost' class="create-home">
            <img src=${createIcon} class="create-home">
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

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const queryPost = query(collection(db, 'post'), orderBy('date', 'desc')); //   traeme todos los datos que tienes hasta el momento
      onSnapshot(queryPost, (querySnapshot) => {
        // MOSTRAR
        const htmlPosts = setupPosts(querySnapshot, user);
        const postsContainer = section.querySelector('.posts');
        postsContainer.innerHTML = htmlPosts;
        // ELIMINAR
        deletePost(postsContainer);
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
    }
  });

  const createPost = section.querySelector('#createPost');
  createPost.addEventListener('click', async () => {
    onNavigate('/createpost');
  });

  main.append(section);

  return main;
};
