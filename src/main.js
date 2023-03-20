// Este es el punto de entrada de tu aplicacion

// import './app/firebase';
// import { getDocs, collection } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from './app/firebase.js';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { signUp } from './pages/Signup';
import { home } from './pages/Home';
import { profile } from './pages/Profile';
import { createPost } from './pages/CreatePost.js';
// import { setupPosts } from './app/posts.js';

// componentes
const root = document.getElementById('root');
/* variable que acceda al nodo que se creo en index el root */

/* aqui todas las rutas
ruta y lo que debe de renderizar */
const routes = {
  '/': Welcome,
  '/login': Login,
  '/signup': signUp,
  '/home': home,
  '/profile': profile,
  '/createpost': createPost,

};

/* recibe la ruta, utiliza windon.history setea el pushState(requiere un estado,ruta,dominio) */
/* pathname ruta */
export const onNavigate = (pathname) => {
  /* se utilisa el objeto  */
  window.history.pushState(
    {} /* estado */,
    pathname /* titulo */,
    window.location.origin + pathname, /* dominio */
  );
  root.removeChild(root.firstChild); /* borra lo que hay */
  /* appendChild por que solo es uno */
  root.appendChild(routes[pathname]()); /* linia q insert lo nuevo */
};

const component = routes[window.location.pathname]; /* routes[DOMINIO DE FIRE] */
/* atras por navegador */
window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};

root.appendChild(component());

/* Esta funcion devuelve los datos del usuario */
