// import { signOut } from 'firebase/auth';
import { onNavigate } from '../router.js';
// import { auth } from '../firebase/config.js';

export const profile = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const title = document.createElement('h2');
  /* crear botones createElement */
  const buttonBack = document.createElement('button');
  const section = document.createElement('div');
  section.innerHTML = `
        <div class="wrapper">
          <div class="img-container">
            <img src="./images/Sonder-icon.png" alt="">
          </div>
          <h1>Profile</h1>
          <button id='logout' class="facebook">Log Out</button>
           
       </div>
      `;
  /* FIREBASE */
  const logout = section.querySelector('#logout');

  logout.addEventListener('click', async () => {
    await logout();
    console.log('user signout');
    onNavigate('/login');
  });

  /* AGREGAR TEXTO A LOS BOTONES textContent */

  buttonBack.textContent = 'Regresa';
  title.textContent = 'profile';

  /* evento a boton */
  buttonBack.addEventListener('click', () => {
    onNavigate('/login');
  });

  /* INSERTA append */
  div.append(title, buttonBack, section);

  return div;
};
