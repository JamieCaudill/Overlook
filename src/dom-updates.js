// IMPORTS

import { userLogin, checkPassword } from './functions/login';

// QUERY SELECTORS //
const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const loginBtn = ('.login__submit');

// FUNCTIONS //

const getLogin = (data) => {
  let loginResult;
  const username = loginUsername.value;
  const password = loginPassword.value;
  
  if (checkPassword(password)) {
    loginResult = userLogin(username, data);
  } else {
    alert('Incorrect password');
  }

  if (!loginResult) {
    alert('Username not recognized') 
  } 
  return loginResult;
}

// EXPORTS //

export {
  getLogin
}
