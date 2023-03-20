import { onNavigate } from '../main';
/* Para que este disponoble en otro lado export */
export const Welcome = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES+, crear elementos createElement */
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.src = '../images/sonder.png';
  img.classList.add('welcome');
  /* evento a boton */
  img.addEventListener('click', () => {
    onNavigate('/login');
  });

  /* INSERTA append */
  div.append(img);

  return div;
};
