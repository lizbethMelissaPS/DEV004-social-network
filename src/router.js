import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { signUp } from './pages/Signup';
import { home } from './pages/Home';
import { profile } from './pages/Profile';
import { createPost } from './pages/CreatePost.js';

// componentes
const root = document.getElementById('root');
/* variable que acceda al nodo que se creo en index el root */

/* aqui van todas las rutas y lo que debe de renderizar */
const routes = {
  '/': Welcome,
  '/login': Login,
  '/signup': signUp,
  '/home': home,
  '/profile': profile,
  '/createpost': createPost,
};

/* recibe la ruta, utiliza windon.history, setea el pushState(requiere un estado,ruta,dominio) */
/* pathname ruta */
export const onNavigate = (pathname) => {
  /* se utilisa el objeto  */
  window.history.pushState(
    {} /* estado */,
    pathname /* titulo */,
    window.location.origin + pathname, /* dominio */
  );
  root.removeChild(root.firstChild); /* borra lo que hay */
  /* appendChild por que solo es una ruta */
  root.appendChild(routes[pathname]()); /* linea que inserta lo nuevo */
};

const component = routes[window.location.pathname]; /* routes[DOMINIO DE FIRE] */
/* para ir atras en el navegador */
window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};

root.append(component());
