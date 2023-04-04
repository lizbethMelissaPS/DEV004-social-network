const user = {
  userCredential: {
    uid: 'kj2h3kjrhn2k3jh423',
    email: 'carlos@carlos.com',
  },
};
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({ user }));
export const getAuth = () => user;
export const initializeApp = () => Promise.resolve({});
