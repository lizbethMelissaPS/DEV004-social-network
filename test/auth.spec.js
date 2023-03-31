/**
 * @jest-environment jsdom
 */

// importamos la funcion que vamos a testear
import { signUp } from '../src/pages/Signup.js';
import { Login } from '../src/pages/Login.js';

jest.mock('../src/router.js');

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof signUp).toBe('function');
  });
});

describe('Login', () => {
  it('deberia mostrar el formulario de login correctamente', () => {
    const root = document.createElement('div');
    root.id = 'root';

    root.append(Login());

    const loginForm = root.querySelector('#login-form');
    const email = root.querySelector('#login-email');
    const password = root.querySelector('#login-password');
    const submit = root.querySelector('#log');

    expect(loginForm).not.toBe(null);
    expect(email).not.toBe(null);
    expect(password).not.toBe(null);
    expect(submit).not.toBe(null);

    document.body.append(root);
  });
});
