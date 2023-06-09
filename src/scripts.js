// SCRIPTS //

// IMPORTS //

import './css/index.css';
import './images/turing-logo.png';
import { userLogin, checkPassword } from './functions/login';
import findBookings from './functions/find-bookings';


// QUERY SELECTORS //

const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const loginBtn = document.querySelector('.login__submit');
const loginForm = document.querySelector('.login__form');
const loginPage = document.querySelector('.login');
const mainPage = document.querySelector('.main');
const mainBookings = document.querySelector('.main__bookings');
const headerUsername = document.querySelector('.header__username')

// DATA MODEL //

let customersData = [];
let roomsData = [];
let bookingsData = [];
let userBookings = [];
let currentCustomer = {};

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
  getLogin(customersData)
  populateBookings(userBookings);
})

// DOM UPDATES //

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
  userBookings = findBookings(loginResult, roomsData, bookingsData);
  console.log(userBookings)
  currentCustomer = loginResult;
  console.log(currentCustomer)
  headerUsername.innerText = currentCustomer.name;
  hide([loginPage]);
  show([mainPage]);
  return loginResult;
}

// MODIFIERS //

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

const populateBookings = (bookings) => {
  bookings.forEach(booking => {
    mainBookings.innerHTML += 
      `<div class="booking">
        <div class="booking__header">
          <span class="booking__room__type">${booking.roomDetails.roomType}</span>
        </div>
        <div class="booking__footer">
          <span class="booking__date">${booking.bookingDetails.date}</span>
        </div>
      </div>`
  });
};