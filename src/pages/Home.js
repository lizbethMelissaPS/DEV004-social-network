import {
  getDocs, collection, query, onSnapshot,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, currentUser, logOut } from '../firebase/auth.js';
import { deleteTask, db, updateTask } from '../firebase/firestore.js';
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
      const queryPost = query(collection(db, 'post')); //   traeme todos los datos que tienes hasta el momento
      onSnapshot(queryPost, (querySnapshot) => {
        // MOSTRAR
        const htmlPosts = setupPosts(querySnapshot, user);
        const postsContainer = section.querySelector('.posts');
        postsContainer.innerHTML = htmlPosts;
        // ELIMINAR
        const btnDelete = postsContainer.querySelectorAll('.btn-delete');
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          if (post.uid === user.uid) {
            console.log('tu post');
            btnDelete.forEach((btn) => {
              btn.disable = false;
              btn.addEventListener('click', ({ target: { dataset } }) => {
                console.log('id: ', dataset.id);
                deleteTask(dataset.id);
                console.log('eliminado: ');
              });
            });
          } else {
            console.log('no tu post');
            btnDelete.disable = true;
          }
        });
        // NAVEGADOR
        const navSelector = section.querySelector('#nav');
        navSelector.appendChild(nav());
      });
    } else {
      console.log('USUER : ', user);
    }

    /// ELIMINAR
    // const postsContainer = section.querySelector(".posts");
    // const btnDelete = postsContainer.querySelector(".btn-delete");
    // const querySnapshot = await getDocs(collection(db, "post"));
    // const data = querySnapshot.docs;
    // data.forEach((element) => {
    //   const post = element.data();
    //   if (user.uid === post.uid) {
    //     console.log("tu post");
    //     btnDelete.disable = false;
    //     btnDelete.addEventListener("click", ({ target: { dataset } }) => {
    //       console.log("id: ", dataset.id);
    //       deleteTask(dataset.id);
    //       console.log("eliminado: ");
    //       // console.log(document.locaction.reload());
    //     });
    //   } else {
    //     console.log("no tu post");
    //     btnDelete.disable = true;
    //   }
    // });
    /* s
    if (user.uid === localStorage.getItem('postUserId')) {
      console.log('tu post');s
      btnDelete.disable = false;
      btnDelete.addEventListener('click', ({ target: { dataset } }) => {
        console.log('id: ', dataset.id);
        deleteTask(dataset.id);
      });
    } else {
      console.log('no tu post');
      btnDelete.disable = true;
    } */
    /* btnDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        console.log('id: ', dataset.id);
        deleteTask(dataset.id);
      });
    }); */

    /// like

    /* const likeIcon = postsContainer.querySelector('#like');
    likeIcon.addEventListener('click', () => {
      console.log('contando');
      likeIcon.classList.toggle('red');
      const querySnapshot = getDocs(collection(db, 'post'));
      let likeCounter = querySnapshot.docs.data().likes;
      if (likeIcon.classList.contains('red')) {
        console.log(likeCounter += 1);
        // addDocumentIdToUserCollection(userId, doc.id, 'myLikes');
      } else {
        console.log(likeCounter -= 1);
        // deleteDocumentIdFromUserCollection(userId, doc.id, 'myLikes');
      }
      // updateDocument('posts', doc.id, 'likes', likeCounter);
    }); */

    /**
    const postsContainerr = section.querySelector(".posts");
    const like = postsContainerr.querySelectorAll(".ico-like");
    const querySnapshot2 = await getDocs(collection(db, "post"));
    querySnapshot2.forEach((doc) => {
      const post = doc.data();
      like.forEach((element) => {
        let contador = 0;
        element.addEventListener("click", ({ target: { dataset } }) => {
          const idPost = dataset.id;
          const uidUser = user.uid;
          const idNoIgual = post.likeUserId !== uidUser;
          if (idNoIgual) {
            like.classList.toggle("red");
            console.log("no igual: ");
            // console.log((contador += 1));
            updateTask(idPost, { like: contador, likeUserId: uidUser });
          } else {
            console.log("igual");
            console.log((contador -= 1));
            updateTask(idPost, { like: contador });
          }
        });
      });
    });
*/
    ///
  });

  const createPost = section.querySelector('#createPost');
  createPost.addEventListener('click', async () => {
    onNavigate('/createpost');
  });

  /* INSERTA append */
  div.append(section);

  return div;
};
