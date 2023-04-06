import { logOut } from '../firebase/auth.js';
import { onNavigate } from '../router.js';

const lougOutBtn = () => {
  const btn = document.createElement('button');
  btn.className = 'icono-nav';
  btn.id = 'loginout';
  btn.addEventListener('click', async () => {
    await logOut();
    onNavigate('/login');
  });
  btn.innerHTML = '<img src="./images/log-out.png" alt="" class="icon-post">';
  return btn;
};

export const nav = () => {
//   const html = '';
  const article = document.createElement('article');
  article.className = 'nav';
  const section = document.createElement('section');
  section.className = 'nav-container';
  section.innerHTML = ` 
    <a class="icono-nav" href="/profile">
        <img src="./images/profile.png" alt="" class="icon-post">
    </a>
    <a class="icono-nav" href="/home">
        <img src="./images/home.png" alt="" class="icon-post">
    </a>
            <figure class="icono-nav">
                <img src="./images/settings.png" alt="" class="icon-post">
            </figure>`;
  section.appendChild(lougOutBtn());
  return section;
};

//   const section = `
//     <article class="nav">
//         <section class="nav-container">

//             <button class="icono-nav" id="logingout" onclick='logOutFun()'>
//                 <img src="./images/log-out.png" alt="" class="icon-post">
//             </button>
//         </section>
//     </article>
//       `;

/* const logout = section.querySelector('#logingout');
  console.log(logout);
  logout.addEventListener('click', async () => {
    await logOut();
  }); */
//   html += section;
//   return html;
