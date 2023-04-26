import { onNavigate } from '../router';

export const Welcome = () => {
  const main = document.createElement('main');
  const img = document.createElement('img');
  img.src = '../images/sonder.png';
  img.classList.add('welcome');
  img.addEventListener('click', () => {
    onNavigate('/login');
  });

  main.append(img);

  return main;
};
