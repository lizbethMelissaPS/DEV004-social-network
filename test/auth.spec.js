/**
 * @jest-environment jsdom
 */

// importamos la funcion que vamos a testear
import { signUp } from '../src/pages/Signup.js';

jest.mock('../src/router.js');

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof signUp).toBe('function');
  });
});
