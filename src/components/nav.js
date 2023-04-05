import { logOut } from '../firebase/auth.js';

export const nav = () => {
  let html = '';
  const section = `
    <article class="nav">
        <section class="nav-container">
            <picture class="logo-container">
                <img src="./images/Sonder-icon.png" alt="Sonder icon">
            </picture>
            <a class="icono-nav" href="/profile">
                <img src="./images/profile.png" alt="" class="icon-post">
            </a>
            <a class="icono-nav" href="/home">
                <img src="./images/home.png" alt="" class="icon-post">
            </a>
            <figure class="icono-nav">
                <img src="./images/settings.png" alt="" class="icon-post">
            </figure>
            <a class="icono-nav" href="/login" id="logingout">
                <img src="./images/log-out.png" alt="" class="icon-post">
            </a>
        </section>
    </article>
      `;

  const logout = section.querySelector('#logingout');
  console.log(logout);
  logout.addEventListener('click', async () => {
    await logOut();
  });
  html += section;
  return html;
};
