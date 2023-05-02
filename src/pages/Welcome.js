import { onNavigate } from '../router';
import sonder from '../images/sonder.png';

export const Welcome = () => {
  const main = document.createElement('main');
  const img = document.createElement('img');
  img.src = sonder;
  img.classList.add('welcome');
  img.addEventListener('click', () => {
    onNavigate('/login');
  });

  main.append(img);

  return main;
};
