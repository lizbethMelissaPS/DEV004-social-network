import { nav } from '../components/nav.js';

export const profile = () => {
  const main = document.createElement('main');
  const section = document.createElement('article');
  section.innerHTML = `
        <div class="wrapper">
          <div id="nav" class="img-container">
            <img src="./images/Sonder-icon.png" alt="">
          </div>
          <div id="message">
            <h2>404</h2>
            <h1>Page under construction</h1>
            <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
            <br>
            <h3>Why am I seeing this?</h3>
            <p>This page is under construction. Check back soon!.</p>
          </div>
       </div>
      `;

  const logoCreate = section.querySelector('#nav');
  logoCreate.append(nav());
  logoCreate.addEventListener('click', () => {
    document.querySelector('.nav-container').classList.toggle('show');
  });

  main.append(section);

  return main;
};
