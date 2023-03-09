import { signOut } from 'firebase/auth'; // permite cerrar sesion que habiamos iniciado
import { onNavigate } from '../main';
import { auth } from '../app/firebase.js';
import { posts } from '../app/posts.js';

export const home = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const section = document.createElement('div');
  const arreglo = [{texto: 'hola'}, {texto:'hi'}];
  section.innerHTML = `
  <nav>
    <div class="nav">
          <div class="img-container">
            <img src="./images/Sonder-icon.png" alt="">
          </div>
          <input type="search" class="search" placeholder="search">
          <button id='logout' class="facebook">Log Out</button>
    </div>
    <aside class='aside'>
      <ul class= "posts"> ${posts(arreglo)} </ul>
    </aside>
  </nav>
    `;

  /* FIREBASE */
  const logout = section.querySelector('#logout');
  logout.addEventListener('click', async () => {
    await signOut(auth);
    console.log('user signout');
    onNavigate('/login');
  });

  /* posts  */
  const postList = section.querySelector('.posts');
  console.log(postList);

  /* INSERTA append */
  div.append(section);

  return div;
};
// export function setupPosts(data) {
//   if (data.length) {
//     console.log(postList);
//   } else {
//     postList.innerHTML = '<p> Post vacio </p>';
//     console.log('no posts');
//   }
//   home();
// }
