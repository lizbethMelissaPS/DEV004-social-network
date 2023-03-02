// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';

myFunction(); */
import { Welcome } from "./components/Welcome"
import { Login } from "./components/Login";
import { Register } from "./components/Register";
/* variable que acceda al nodo que se creo en index el root */
const root = document.getElementById('root');

/*aqui todas las rutas 
ruta y lo que debe de renderizar */
const routes = {
    '/': Welcome,
    '/login': Login,
    '/register':Register,
}

/* recibe la ruta, utiliza windon.history setea el pushState(requiere un estado,ruta,dominio) */
/* pathname ruta */
export const onNavigate = (pathname) => {
    /* se utilisa el objeto  */
    window.history.pushState(
        {},/* estado */
        pathname,/* titulo */
        window.location.origin + pathname,/* dominio */
    );
    root.removeChild(root.firstChild);/* borra lo que hay */
    /* appendChild por que solo es uno */
    root.appendChild(routes[pathname]());/* linia q insert lo nuevo */
}

const component = routes[window.location.pathname];/* routes[DOMINIO DE FIRE] */
/* atras por navegador */
window.onpopstate = ()=>{
    root.removeChild(root.firstChild);
    root.append(component())
}

root.appendChild(component())