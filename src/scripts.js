// SCRIPTS //

// IMPORTS //

import './css/index.css';
import './images/turing-logo.png';
import { userLogin, checkPassword } from './functions/login';


// QUERY SELECTORS //

const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const loginBtn = document.querySelector('.login__submit');
const loginForm = document.querySelector('.login__form')
const loginPage = document.querySelector('.login__container')
const mainPage = document.querySelector('.main')

// DATA MODEL //

let customersData = [];
let roomsData = [];
let bookingsData = [];

// API CALLS //

const fetchCustomers = fetch('http://localhost:3001/api/v1/customers');
const fetchRooms = fetch('http://localhost:3001/api/v1/rooms');
const fetchBookings = fetch('http://localhost:3001/api/v1/bookings');

window.addEventListener('load', () => {
  Promise.all([fetchCustomers, fetchRooms, fetchBookings])
    .then(responses => {
      responses.forEach(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              if (response.url.includes('/customers')) {
                customersData = data.customers;
              } else if (response.url.includes('/rooms')) {
                roomsData = data.rooms;
              } else if (response.url.includes('/bookings')) {
                bookingsData = data.bookings;
              }
            })
            .catch(error => {
              console.error('Error parsing response:', error);
            });
        } else {
          alert(`${response.status} server request failed, try again later`)
          console.error('Request failed with status:', response.status);
        }
      });
    });
});

// EVENT LISTENERS //

loginBtn.addEventListener('click', (event) => {
  event.preventDefault()
  getLogin(customersData);
})

// FUNCTIONS //

const getLogin = (data) => {
  let loginResult;
  const username = loginUsername.value;
  const password = loginPassword.value;
  
  if (checkPassword(password)) {
    loginResult = userLogin(username, data);
  } else {
    loginForm.reset();
    alert('Incorrect password');
    return;
  }

  if (!loginResult) {
    loginForm.reset();
    alert('Username not recognized') 
    return;
  }
  console.log(loginResult)
  hide([loginPage]);
  show([mainPage]);
  return loginResult;
}

// function for home page

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

