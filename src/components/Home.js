import { signOut } from 'firebase/auth'; // permite cerrar sesion que habiamos iniciado
import { onNavigate } from '../main';
import { auth } from '../app/firebase.js';

export const home = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const title = document.createElement('h2');
  /* crear botones createElement */
  const buttonBack = document.createElement('button');
  const section = document.createElement('div');
  section.innerHTML = `
  <nav>
    <div class="nav">
          <div class="img-container">
            <img src="./images/Sonder-icon.png" alt="">
          </div>
          <input type="search" class="search" placeholder="search">
          <button id='logout' class="facebook">Log Out</button>
        </div>
  </nav>
    `;

  /* FIREBASE */
  const logout = section.querySelector('#logout');

  logout.addEventListener('click', async () => {
    await signOut(auth);
    console.log('user signout');
    onNavigate('/login');
  });

  /* AGREGAR TEXTO A LOS BOTONES textContent */

  buttonBack.textContent = 'Regresa';
  title.textContent = 'homepage';

  /* evento a boton */
  buttonBack.addEventListener('click', () => {
    onNavigate('/login');
  });

  /* INSERTA append */
  div.append(title, buttonBack, section);

  return div;
};
