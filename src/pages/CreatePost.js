export const createPost = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const section = document.createElement('div');
  section.innerHTML = `
    <nav>
      <div class="nav">
            <div class="img-container">
              <img src="./images/Sonder-icon.png" alt="">
            </div>
      </div>
      <aside class='aside'>

      </aside>
    </nav>
      `;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const querySnapshot = await getDocs(collection(db, 'posts')); // traeme todos los datos que tienes hasta el momento
      const htmlPosts = setupPosts(querySnapshot.docs);
      const postsContainer = section.querySelector('.posts');
      postsContainer.innerHTML = htmlPosts;
    } else {
      console.log(user);
    }
  });

  /* FIREBASE */
  const logout = section.querySelector('#logout');
  logout.addEventListener('click', async () => {
    await logout();
    console.log('user signout');
    onNavigate('/login');
  });

  /* INSERTA append */
  div.append(section);

  return div;
};
