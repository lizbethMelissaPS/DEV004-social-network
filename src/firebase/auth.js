import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { app } from './config.js';

export const auth = getAuth(app);

export const userCredentials = (email, password) => createUserWithEmailAndPassword(
  auth,
  email,
  password,
);

export const newUser = (email, password) => signInWithEmailAndPassword(
  auth,
  email,
  password,
);

export const google = new GoogleAuthProvider();

export const facebook = new FacebookAuthProvider();

export const loginGoogle = () => signInWithPopup(auth, google);
export const loginFacebook = () => signInWithPopup(auth, facebook);
export const recoverPassword = (email) => sendPasswordResetEmail(email);
export const logOut = () => signOut(auth);
