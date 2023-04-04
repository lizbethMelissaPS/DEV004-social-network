/**
 * @jest-environment jsdom
 */

// importamos la funcion que vamos a testear
import { signUp } from '../src/pages/Signup.js';
import { Login } from '../src/pages/Login.js';
import { login } from '../src/firebase/auth.js';

jest.mock('../src/router.js');
jest.mock('../src/firebase/auth.js');

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

describe('Los test del Registro', () => {
  test('Existe el boton de crear cuenta', () => {
    const elemento = Login();
    const boton = elemento.querySelector('#log');
    expect(boton).not.toBeNull();
  });

  test('Snapshot del REGISTRO', () => {
    expect(login()).toMatchSnapshot();
  });
});
