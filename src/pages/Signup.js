import { onNavigate } from '../router.js';
import { addUser, loginGoogle, loginFacebook } from '../firebase/auth.js';
import { showMessage } from '../components/showMessage.js';
import sonderIcon from '../images/Sonder-icon.png';
import facebook from '../images/facebook.png';
import google from '../images/google.png';

export const signUp = () => {
  const main = document.createElement('main');
  const section = document.createElement('article');
  section.innerHTML = `
    <article class="wrapper">
      <picture class="img-container">
        <img src=${sonderIcon} alt="">
      </picture>
      <h1 class="h1-form">Sign Up</h1>
      <p class="text-sign">Find and share inspiration all around the world!</p>
      <form id="signup-form" >
        <input id="singup-name" type="text" class="" placeholder="Name">
        <input id="singup-lastname" type="text" class="" placeholder="Last Name">
        <input id="singup-email" type="email" class="" placeholder="Email">
        <input id="singup-password" type="password" class="" placeholder="Password">
        <input type="password" class="" placeholder="Confirm Password">
      <button type="submit" class="submit">Sign Up</button>
      </form>  
      <p class="or">or</p>
        <button id="fb-login" type="button" class="submit facebook">
        <img src=${facebook} alt="facebook icon">Continue with Facebook</button>
        <button id="googleLogin" type="button" class="submit google">
        <img src=${google} alt="google icon">Continue with Google</button>
        <p class="p-log">
          Already have an account yet? <a class="link" href="/login">Log in</a>
        </p> 
    </article>
    `;

  const signupForm = section.querySelector('#signup-form');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = signupForm['singup-name'].value;
    const email = signupForm['singup-email'].value;
    const password = signupForm['singup-password'].value;

    localStorage.setItem('username', username);

    try {
      addUser(email, password);
      onNavigate('/home');
      showMessage(`Welcome ${addUser.user.email}`, 'success');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email already in use', 'error'); // despues de la coma viene el tipo (estilo que le cambia el color al msg)
      } else if (error.code === 'auth/invalid-email') {
        showMessage('Invalid email', 'error');
      } else if (error.code === 'auth/weak-password') {
        showMessage('Weak password', 'error');
      } else if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });

  const googleBtn = section.querySelector('#googleLogin');
  googleBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      onNavigate('/home');
      showMessage(`Welcome ${loginGoogle.user.displayName}`, 'success');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email already in use', 'error'); // despues de la coma viene el tipo (estilo que le cambia el color al msg)
      } else if (error.code === 'auth/invalid-email') {
        showMessage('Invalid email', 'error');
      } else if (error.code === 'auth/weak-password') {
        showMessage('Weak password', 'error');
      } else if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });

  const facebookbtn = section.querySelector('#fb-login');
  facebookbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await loginFacebook();
      onNavigate('/home');
      showMessage(`Welcome ${loginFacebook.user.displayName}`, 'success');
    } catch (error) {
      if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });

  main.append(section);

  return main;
};
