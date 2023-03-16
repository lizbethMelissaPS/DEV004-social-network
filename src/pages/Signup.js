// import { getDatabase, set, ref } from 'firebase/database';
import { onNavigate } from '../main';
import { userCredentials, loginGoogle, loginFacebook } from '../firebase/auth';
import { showMessage } from '../components/showMessage.js';

export const signUp = () => {
  /* UN CONTENEDOR Q CONTENGA A LOS BOTONES */
  const div = document.createElement('div');
  const title = document.createElement('h2');
  /* crear botones createElement */
  // const button = document.createElement("button");
  const buttonBack = document.createElement('button');
  // const inputEmail = document.createElement("input");
  // const inputPass = document.createElement("input");
  const section = document.createElement('div');
  section.innerHTML = `
    <div class="wrapper">
      <div class="img-container">
        <img src="./images/Sonder-icon.png" alt="">
      </div>
      <h1>Sign Up</h1>
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
        <button id="fb-login" type="button" class="facebook">Continue with Facebook</button>
        <button id="googleLogin" type="button" class="google">Continue with Google</button>
        <p class="sign-up">
          Already have an account yet? <a href="/login">Log in</a>
        </p> 
    </div>
    `;
  /* FIREBASE FORM */
  const signupForm = section.querySelector('#signup-form');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = signupForm['singup-name'].value;
    const lastname = signupForm['singup-lastname'].value;
    const email = signupForm['singup-email'].value;
    const password = signupForm['singup-password'].value;
    // eslint-disable-next-line no-console
    console.log(username, lastname, email, password);
    try {
      /* set(ref(database, `users/${userCredentials.user.uid}`), {
        name: username,
        lastname,
        email,
      }); */
      userCredentials(email, password);
      onNavigate('/profile');
      showMessage(`Welcome ${userCredentials.user.email}`, 'success');
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

  /* Google log-in */
  const googleBtn = section.querySelector('#googleLogin');
  googleBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      await loginGoogle();
      onNavigate('/profile');
      console.log(loginGoogle);
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

  /* Facebook log-in */
  const facebookbtn = section.querySelector('#fb-login');
  facebookbtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      await loginFacebook();
      onNavigate('/profile');
      showMessage(`Welcome ${loginFacebook.user.displayName}`, 'success');
    } catch (error) {
      if (error.code) {
        showMessage(error.message, 'error');
      }
    }
  });
  // button.textContent = "crear cuenta";
  buttonBack.textContent = 'Regresa';
  // title.textContent = "Registro de nueva cuenta";

  /* evento a boton */
  // button.addEventListener("click", () => {
  //   onNavigate("/");
  // });
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  /* INSERTA append */
  div.append(title, buttonBack, section);

  return div;
};
// inputEmail, inputPass, button,
