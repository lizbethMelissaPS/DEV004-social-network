import { onNavigate } from '../main';
/* Para que este disponoble en otro lado export */
export const Register = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const title = document.createElement('h2');
  /* crear botones createElement */
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');

  /* AGREGAR TEXTO A LOS BOTONES textContent */
  button.textContent = 'crear cuenta';
  buttonBack.textContent = 'Regresa';
  title.textContent = 'Registro de nueva cuenta';

  /* evento a boton */
  button.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  /* INSERTA append */
  div.append(title, inputEmail, inputPass, button, buttonBack);

  return div;
};
