export const nav = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const section = document.createElement('div');
  section.innerHTML = `
    <nav class="nav">
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
            <a class="icono-nav" href="/login" id="logOut">
                <img src="./images/log-out.png" alt="" class="icon-post">
            </a>
        </section>
    </nav>
      `;

  /* FIREBASE */
  const logout = section.querySelector('#logOut');
  logout.addEventListener('click', async () => {
    await logout();
  });

  /* INSERTA append */
  div.append(section);

  return div;
};
