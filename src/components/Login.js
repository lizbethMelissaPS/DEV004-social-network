import { async } from '@firebase/util';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { getDatabase, update, ref } from 'firebase/database';
import { auth, database } from '../app/firebase.js';
import { showMessage } from '../app/showMessage.js';
import { onNavigate } from '../main';
/* Para que este disponoble en otro lado export */
export const Login = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const title = document.createElement('h2');
  /* crear botones createElement */
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const buttonProfile = document.createElement('button');
  const section = document.createElement('div');
  section.innerHTML = `
    <div class="wrapper">
      <div class="img-container">
        <img src="./images/Sonder-icon.png" alt="">
      </div>
      <h1>Log In</h1>
      <p class="text" >Welcome back you've been missed!</p>
      
      <form id="login-form" class="login-form">
        <label for="email"></label>
        <input type="email" id="login-email" class="" placeholder="Email" required>
        <input type="password" id="login-password"  class="" placeholder="Password" required>
        <p class="recover"> <a href="" >Forgot password?</a></p> 
        <button type="submit" id="log" class="submit">Log in</button>
      </form> 
      <p class="or">or</p>
        <button id="fb-login" type="button" class="facebook">Continue with Facebook</button>
        <button id="googleLogin" type="button" class="google">Continue with Google</button>
        <p class="sign-up">
          Dont have an account yet? <a href="/signup">Sign Up</a>
        </p> 
   </div>
  `;

  /* FIREBASE FORM */
  const loginForm = section.querySelector('#login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    // eslint-disable-next-line no-console
    console.log(email, password);

    try {
      // eslint-disable-next-line max-len
      const userCredentials = await signInWithEmailAndPassword(auth, email, password); // le paso los parametros que quiero auth
      const dt = new Date();
      update(ref(database, `users/${userCredentials.user.uid}`), {
        last_login: dt,
      });
      onNavigate('/home');

      showMessage(`Welcome ${userCredentials.user.email}`, 'success');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        showMessage('Wrong password', 'error'); // despues de la coma viene el tipo (estilo que le cambia el color al msg)
      } else if (error.code === 'auth/user-not-found') {
        showMessage('User not found', 'error');
      } else if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });

  /* Google log-in */
  const googleBtn = section.querySelector('#googleLogin');
  googleBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
      onNavigate('/profile');
      showMessage(`Welcome ${credentials.user.displayName}`, 'success');
    } catch (error) {
      if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });

  /* Facebook log-in */
  const facebookbtn = section.querySelector('#fb-login');
  facebookbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new FacebookAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
      onNavigate('/profile');
      showMessage(`Welcome ${credentials.user.displayName}`, 'success');
    } catch (error) {
      if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });

  /* AGREGAR TEXTO A LOS BOTONES textContent */
  button.textContent = 'Entrar';
  buttonBack.textContent = 'Regresa';
  buttonProfile.textContent = 'Profile';
  title.textContent = 'Inicia secion LOGIN';

  button.addEventListener('click', () => {
    onNavigate('/home');
  });
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonProfile.addEventListener('click', () => {
    onNavigate('/profile');
  });

  /* INSERTA append */
  div.append(title, buttonProfile, button, buttonBack, section);

  return div;
};
