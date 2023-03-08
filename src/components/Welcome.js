import { onNavigate } from '../main';
/* Para que este disponoble en otro lado export */
export const Welcome = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.src = '../images/sonder.png';

  /* crear botones createElement */
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  /* AGREGAR TEXTO A LOS BOTONES textContent */
  buttonLogin.textContent = 'Inicia Sesion';
  buttonRegister.textContent = 'Registrate';
  // title.textContent = 'somos lo mejor WELCOME';

  /* evento a boton */
  img.addEventListener('click', () => {
    onNavigate('/login');
  });
  buttonRegister.addEventListener('click', () => {
    onNavigate('/signup');
  });

  /* INSERTA append */
  div.append(img, buttonLogin, buttonRegister);

  return div;
};
