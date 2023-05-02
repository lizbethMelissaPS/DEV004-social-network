import { logOut } from '../firebase/auth.js';
import { onNavigate } from '../router.js';
import logoutIcon from '../images/log-out.png';
import profileIcon from '../images/profile.png';
import homeIcon from '../images/home.png';
import settingsIcon from '../images/settings.png';

const lougOutBtn = () => {
  const btn = document.createElement('button');
  btn.className = 'icono-nav btn-nav';
  btn.id = 'loginout';
  btn.addEventListener('click', async () => {
    await logOut();
    onNavigate('/login');
  });
  btn.innerHTML = `<img src=${logoutIcon} alt="" class="icon-post">`;
  return btn;
};

export const nav = () => {
  const article = document.createElement('article');
  article.className = 'nav';
  const section = document.createElement('section');
  section.className = 'nav-container';
  section.innerHTML = ` 
    <a class="icono-nav" href="/profile">
        <img src=${profileIcon} alt="" class="icon-post">
    </a>
    <a class="icono-nav" href="/home">
        <img src=${homeIcon} alt="" class="icon-post">
    </a>
            <figure class="icono-nav">
                <img src=${settingsIcon} alt="" class="icon-post">
            </figure>`;
  section.appendChild(lougOutBtn());
  return section;
};
