// import { getDatabase, set, ref } from 'firebase/database';
import { onNavigate } from '../router.js';
import { addUser, loginGoogle, loginFacebook } from '../firebase/auth.js';
import { showMessage } from '../components/showMessage.js';

export const signUp = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const buttonBack = document.createElement('button');
  const section = document.createElement('div');
  section.innerHTML = `
    <article class="wrapper">
      <picture class="img-container">
        <img src="./images/Sonder-icon.png" alt="">
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
        <img src="./images/facebook.png" alt="facebook icon">Continue with Facebook</button>
        <button id="googleLogin" type="button" class="submit google">
        <img src="./images/google.png" alt="google icon">Continue with Google</button>
        <p class="p-log">
          Already have an account yet? <a class="link" href="/login">Log in</a>
        </p> 
    </article>
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
      /* set(ref(database, `users/${addUser.user.uid}`), {
        name: username,
        lastname,
        email,
      }); */
      addUser(email, password);
      onNavigate('/profile');
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

  /* Google log-in */
  const googleBtn = section.querySelector('#googleLogin');
  googleBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      // setDoc(ref(database, `users/${addUser.user.uid}`), {
      //   name: username,
      //   lastname,
      //   email,
      // });
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
