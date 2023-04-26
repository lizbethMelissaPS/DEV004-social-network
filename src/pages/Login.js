import { loginGoogle, loginFacebook, login } from '../firebase/auth.js';
import { showMessage } from '../components/showMessage.js';
import { onNavigate } from '../router';
/* Para que este disponoble en otro lado export */

export async function loginWithValues(email, password) {
  try {
    await login(email, password);
    onNavigate('/home');
    showMessage(`Welcome ${login.user.email}`, 'success');
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage('Wrong password', 'error'); // despues de la coma viene el tipo (estilo que le cambia el color al msg)
    } else if (error.code === 'auth/user-not-found') {
      showMessage('User not found', 'error');
    } else if (error.code) {
      showMessage(error.message, 'error');
    }
  }
}

export const Login = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const main = document.createElement('main');
  const section = document.createElement('article');
  section.innerHTML = `
    <article class="wrapper">
      <picture class="img-container">
        <img src="./images/Sonder-icon.png" alt="">
      </picture>
      <h1 class="h1-form">Log In</h1>
      <p class="text" >Welcome back you've been missed!</p>
      
      <form id="login-form" class="login-form">
        <label for="email"></label>
        <input type="email" id="login-email" class="" placeholder="Email" required>
        <input type="password" id="login-password"  class="" placeholder="Password" required>
        <p class="recover"> <a href="" >Forgot password?</a></p> 
        <button type="submit" id="log" class="submit">Log in</button>
      </form> 
      <p class="or">or</p>
        <button id="fb-login" type="button" class="submit facebook">
          <img src="./images/facebook.png" alt="facebook icon"> Continue with Facebook
        </button>
        <button id="googleLogin" type="button" class="submit google">
          <img src="./images/google.png" alt="google icon">Continue with Google
        </button>
        <p class="p-log">
          Dont have an account yet? <a class="link" href="/signup">Sign Up</a>
        </p> 
   </article>
  `;

  /* FIREBASE FORM */
  const loginForm = section.querySelector('#login-form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    loginWithValues(email, password);
  });

  /* Google log-in */
  const googleBtn = section.querySelector('#googleLogin');
  googleBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      onNavigate('/home');
      showMessage(`Welcome ${loginGoogle.user.displayName}`, 'success');
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

  /* INSERTA append */
  main.append(section);

  return main;
};
