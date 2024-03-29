/* eslint-disable max-len */
// SCRIPTS //

// IMPORTS //

import './css/index.css';
import { userLogin, checkPassword } from './functions/login';
import findBookings from './functions/find-bookings';
import { filterRoomsByDate, filterRoomsByType, getRoomsDetails } from './functions/filter-rooms';
import findTotalCost from './functions/find-total-cost';

// QUERY SELECTORS //

const loginForm = document.querySelector('.login__form');
const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const loginPage = document.querySelector('.login');
const mainPage = document.querySelector('.main');
const headerUsername = document.querySelector('.header__username');
const mainFormContainer = document.querySelector('.main__form__container');
const searchResults = document.querySelector('.bookings__results');
const dateInput = document.querySelector('.main__date');
const typeInput = document.querySelector('.main__room__type');
const pastBookings = document.querySelector('.bookings__past');
const futureBookings = document.querySelector('.bookings__future');
const bookingCostSection = document.querySelector('.bookings__cost');
const bookingsSubheader = document.querySelector('.bookings__subheader')
const totalCostSection = document.querySelector('.bookings__total__cost');
const totalCostText = document.querySelector('.total__cost');

// BUTTONS //

const loginBtn = document.querySelector('.login__submit');
const btnHistory = document.querySelector('.bookings__past__btn');
const btnUpcoming = document.querySelector('.bookings__future__btn');
const btnSearchSubmit = document.querySelector('.main__submit');
const btnTotalCost = document.querySelector('.bookings__cost__btn');

// FETCHED DATA //

let customersData = [];
let roomsData = [];
let bookingsData = [];

// GLOBAL VARIABLES //

let userBookings = [];
let bookingsHistory = [];
let bookingsUpcoming = [];
let currentCustomer;
let currentRoom = {};
let currentDateValue = '';
let availableRooms = [];

// API CALLS //

const fetchCustomers = fetch('https://overlook-api.onrender.com/api/v1/customers');
const fetchRooms = fetch('https://overlook-api.onrender.com/api/v1/rooms');
const fetchBookings = fetch('https://overlook-api.onrender.com/api/v1/bookings');
const fetchAllData = () => {
  loading(customersData);
  Promise.all([fetchCustomers, fetchRooms, fetchBookings])
    .then(responses => {
      responses.forEach(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              if (response.url.includes('/customers')) {
                customersData = data.customers;
                loginBtn.innerText = 'Login';
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
};

// EVENT LISTENERS //

window.addEventListener('load', () => {
  fetchAllData();
  loading(customersData);
});

loginBtn.addEventListener('click', (event) => {
  checkLogin(event, customersData);
  console.log(customersData)
});

btnHistory.addEventListener('click', () => {
  showHistory();
});

btnUpcoming.addEventListener('click', () => {
  showUpcoming();
});

pastBookings.addEventListener('click', (event) => {
  showBookingDetails(event, bookingsHistory, pastBookings);
});

futureBookings.addEventListener('click', (event) => {
  showBookingDetails(event, bookingsUpcoming, futureBookings);
});

btnSearchSubmit.addEventListener('click', (event) => {
  searchRooms(event);
});

searchResults.addEventListener('click', (event) => {
  showRoomDetails(event, availableRooms);
});

searchResults.addEventListener('click', (event) => {
  bookRoom(event, searchResults);
});

btnTotalCost.addEventListener('click', () => {
  showTotalCost(userBookings, bookingCostSection);
});

// MODIFIERS //

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

// DOM UPDATES //

const loading = (customersData) => {
  if (!customersData.length) {
    loginBtn.innerText = 'Loading...';
  }
};

const checkLogin = (event, data) => {
  event.preventDefault();
  if (checkPassword(loginPassword.value)) {
    currentCustomer = userLogin(loginUsername.value, data);
  } else {
    loginForm.reset();
    alert('Incorrect password');
    return;
  }
  if (!currentCustomer) {
    loginForm.reset();
    alert('Username not recognized') 
    return;
  }
  userBookings = findBookings(currentCustomer, roomsData, bookingsData);
  getLoggedIn(userBookings, currentCustomer);
};

const getLoggedIn = (bookings) => {
  hide([loginPage]);
  show([mainPage, headerUsername]);
  sortByToday(bookings)
  sortByDate(bookings);
  headerUsername.innerText = currentCustomer.name;
};

const populateBookings = (bookings, section) => {
  section.innerHTML = '';
  bookings.forEach(booking => {
    section.innerHTML += 
      `<div class="booking">
        <p>Room Number: ${booking.roomDetails.number}</p>
        <p>Room Type: ${booking.roomDetails.roomType}</p>
        <p>Date: ${booking.bookingDetails.date}</p>
        <button id=${booking.bookingDetails.id}>View Details</button>
      </div>`;
  });
};

const populateBooking = (booking, section) => {
  section.innerHTML = '';
  section.innerHTML = 
    `<div class="current__booking" id=${booking.bookingDetails.id}>
      <p>Date of Stay: ${booking.bookingDetails.date}</p>
      <p>Room Number: ${booking.bookingDetails.roomNumber}</p>
      <p>Room Type: ${booking.roomDetails.roomType}</p>
      <p>Bidet: ${booking.roomDetails.bidet}</p>
      <p>Bed Size: ${booking.roomDetails.bedSize}</p>
      <p>Number of Beds: ${booking.roomDetails.numBeds}</p>
      <p>Cost Per Night: ${booking.roomDetails.costPerNight}</p>
    </div>`;
};

const populateRooms = (rooms, section) => {
  section.innerHTML = '';
  rooms.forEach(room => {
    section.innerHTML += 
      `<div class="booking">
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Cost Per Night: ${room.costPerNight}</p>
        <button  id=${room.number}>view details</booking>
      </div>`
  });
};

const populateRoom = (room, section) => {
  if (room) {
    section.innerHTML = '';
    section.innerHTML = 
    `<div class="current__booking">
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Cost Per Night: ${room.costPerNight}</p>
      <button class="book__room" id=${room.number}>Book Room</button>
    </div>`
  }
};

const sortByDate = (bookings) => {
  return bookings.sort((a, b) => new Date(a.bookingDetails.date) - new Date(b.bookingDetails.date));
};

const sortByToday = (bookings) => {
  bookingsHistory = [];
  bookingsUpcoming = [];
  const currentDate = new Date();
  bookings.forEach(booking => {
    const bookingDate = new Date(booking.bookingDetails.date);
    if (bookingDate < currentDate) {
      if (!bookingsHistory.includes(booking)) {
        bookingsHistory.push(booking);
      }
    } else {
      if (!bookingsUpcoming.includes(booking)) {
        bookingsUpcoming.push(booking);
      }
    }
  });
}

const showBookingDetails = (event, bookings, section) => {
  bookingsSubheader.innerText = 'Booking Details';
  const target = event.target.id;
  const targetedRoom = bookings.find(booking => booking.bookingDetails.id === target);
  if (targetedRoom) {
    currentRoom = targetedRoom;
    populateBooking(currentRoom, section);
  }
};

const showRoomDetails = (event, rooms) => {
  bookingsSubheader.innerText = 'Room Details';
  const target = parseInt(event.target.id);
  const targetedRoom = rooms.find(room => room.number === target);
  if (targetedRoom) {
    currentRoom = targetedRoom;
    populateRoom(currentRoom, searchResults);
  }
};

const showHistory = () => {
  mainFormContainer.style.height = '10em';
  bookingsSubheader.innerText = 'Past Stays';
  show([pastBookings]);
  hide([futureBookings, searchResults, totalCostSection]);
  sortByDate(bookingsHistory);
  populateBookings(bookingsHistory, pastBookings);
};

const showUpcoming = () => {
  mainFormContainer.style.height = '10em';
  bookingsSubheader.innerText = 'Upcoming Stays';
  show([futureBookings]);
  hide([pastBookings, searchResults, totalCostSection]);
  sortByToday(userBookings);
  populateBookings(bookingsUpcoming, futureBookings);
};

const showTotalCost = (bookings, section) => {
  mainFormContainer.style.height = '10em';
  show([totalCostSection]);
  hide([pastBookings, futureBookings, searchResults])
  const totalCost = findTotalCost(bookings).toFixed(2);
  bookingsSubheader.innerText = '';
  totalCostText.innerText = `Total Spent: $${totalCost}`;
  bookings.forEach(booking => {
    section.innerHTML += 
    `<div class="booking__cost">
      <p>Date: ${booking.bookingDetails.date}</p>
      <p>Cost: ${booking.roomDetails.costPerNight}</p>
    </div>`
  })
};

const searchRooms = (event) => {
  event.preventDefault();
  if (!dateInput.value) {
    alert('Please select a date');
    return;
  }
  if (new Date(dateInput.value) < new Date()) {
    alert('Please select a future date');
    return;
  }
  mainFormContainer.style.height = '10em';
  bookingsSubheader.innerText = 'Available Rooms';
  hide([pastBookings, futureBookings, totalCostSection]);
  show([searchResults]);
  const filteredByDate = searchByDate(dateInput, bookingsData);
  availableRooms = getRoomsDetails(filteredByDate, roomsData);
  if (typeInput.value) {
    const filteredByType = searchByType(typeInput, availableRooms);
    availableRooms = getRoomsDetails(filteredByType, roomsData);
  }
  if (!availableRooms.length) {
    searchResults.innerHTML = 
      `<div class="booking">
        <p>We are terribly sorry. There are no specified rooms available on ${dateInput.value}.</p>
      </div>`  
  } else {
    populateRooms(availableRooms, searchResults);
  }
};

const searchByDate = (date, bookingsData) => {
  currentDateValue = formatDate(date);
  return filterRoomsByDate(currentDateValue, bookingsData);
};

const formatDate = (date) => {
  const dateSplit = date.value.split('-');
  return `${dateSplit[0]}/${dateSplit[1]}/${dateSplit[2]}`;
};

const searchByType = (input, data) => {
  const typeFilter = input.value;
  const filteredRooms = filterRoomsByType(typeFilter, data);
  return filteredRooms;
};

const getBookedRoom = (currentCustomer, currentDate, currentRoom) => {
  const bookedRoom = {
    "userID": currentCustomer.id,
    "date": currentDate,
    "roomNumber": currentRoom.number
  };
  return bookedRoom;
};
  
const postBookedRoom = (data) => {  
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        alert(`${response.status} server request failed, please try again later`)
        console.error('Request failed with status:', response.status)
      }
    })
    .then(json => {
      console.log(json)
      fetch('http://localhost:3001/api/v1/bookings')
        .then(response => response.json())
        .then(data => {
          bookingsData = data.bookings;
          userBookings = findBookings(currentCustomer, roomsData, bookingsData);
          sortByToday(userBookings)
          sortByDate(userBookings);         
        })
    })
    .catch(err => console.log(err));
};

const bookRoom = (event, section) => {
  if (event.target.classList.contains('book__room')) {
    const roomToBook = getBookedRoom(currentCustomer, currentDateValue, currentRoom);
    postBookedRoom(roomToBook);
    section.innerHTML = 
      `<div class="booking">
        <p>Get stoked for your trip! Room #${currentRoom.number} booked by ${currentCustomer.name} for ${currentDateValue}</p>
      </div>`    
  }
};


