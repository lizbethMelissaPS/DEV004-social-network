import { onNavigate } from "../main";
/* Para que este disponoble en otro lado export */
export const Welcome = () => {
    /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
    const div = document.createElement('div');
    const title = document.createElement('h2');

    /* crear botones createElement*/
    const buttonLogin = document.createElement('button');
    const buttonRegister = document.createElement('button');
    

    /* AGREGAR TEXTO A LOS BOTONES textContent */
    buttonLogin.textContent = 'Inicia Sesion';
    buttonRegister.textContent = 'Registrate';
    title.textContent = 'somos lo mejor WELCOME';

    /* evento a boton */
    buttonLogin.addEventListener('click', () => {
        onNavigate('/login')
    })
    buttonRegister.addEventListener('click', () => {
        onNavigate('/register')
    })


    /* INSERTA append */
    div.append(title, buttonLogin, buttonRegister);

    return div
}