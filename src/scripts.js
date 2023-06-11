// SCRIPTS //

// IMPORTS //

import './css/index.css';
import './images/turing-logo.png';
import { userLogin, checkPassword } from './functions/login';
import findBookings from './functions/find-bookings';
import { filterRoomsByDate, filterRoomsByType, getRoomsDetails } from './functions/filter-rooms';


// QUERY SELECTORS //

const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const loginBtn = document.querySelector('.login__submit');
const loginPage = document.querySelector('.login');
const mainPage = document.querySelector('.main');
const pastBookings = document.querySelector('.bookings__past');
const futureBookings = document.querySelector('.bookings__future')
const searchResults = document.querySelector('.bookings__results')
const headerUsername = document.querySelector('.header__username')
const searchForm = document.querySelector('.main__form')
const dateInput = document.querySelector('.main__date')
const typeInput = document.querySelector('.main__room__type')


// buttons //

const btnHistory = document.querySelector('.bookings__past__btn');
const btnUpcoming = document.querySelector('.bookings__future__btn');
const btnSearchSubmit = document.querySelector('.main__submit')


// DATA MODEL //

let customersData = [];
let roomsData = [];
let bookingsData = [];

let userBookings = [];
let bookingsHistory = [];
let bookingsUpcoming = [];
let currentCustomer = {};
let currentRoom = {};
let availableRooms = [];

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
  getLogin(event, customersData)
})

btnHistory.addEventListener('click', () => {
  showHistory();
})

btnUpcoming.addEventListener('click', () => {
  showUpcoming();
})

pastBookings.addEventListener('click', (event) => {
  showBookingDetails(event, bookingsHistory, pastBookings)
})

futureBookings.addEventListener('click', (event) => {
  showBookingDetails(event, bookingsUpcoming, futureBookings)
})

btnSearchSubmit.addEventListener('click', (event) => {
  searchRooms(event);
})

searchResults.addEventListener('click', (event) => {
  showRoomDetails(event, availableRooms)
})


// DOM UPDATES //

const getLogin = (event, data) => {
  event.preventDefault();
  let loginResult;
  const username = loginUsername.value;
  const password = loginPassword.value;
  
  // if (checkPassword(password)) {
  //   loginResult = userLogin(username, data);
  // } else {
  //   loginForm.reset();
  //   alert('Incorrect password');
  //   return;
  // }

  // if (!loginResult) {
  //   loginForm.reset();
  //   alert('Username not recognized') 
  //   return;
  // }
  
  // TEMPORARY //
  loginResult = userLogin('customer1', data)


  userBookings = findBookings(loginResult, roomsData, bookingsData);
  userBookings = sortByDate(userBookings);
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

const populateBookings = (bookings, section) => {
  section.innerHTML = '';
  bookings.forEach(booking => {
    section.innerHTML += 
      `<div class="booking" id=${booking.bookingDetails.id}>
        <div class="booking__footer" id=${booking.bookingDetails.id}>
          <span class="booking__room__type">${booking.roomDetails.roomType}</span>
          <span class="booking__date">${booking.bookingDetails.date}</span>
        </div>
      </div>`
  });
};

const populateBooking = (booking, section) => {
  section.innerHTML = '';
  section.innerHTML = 
    `<div class="current__booking" id=${booking.bookingDetails.id}>
      <p>Date: ${booking.bookingDetails.date}</p>
      <p>Room Number: ${booking.bookingDetails.roomNumber}</p>
      <p>Room Type: ${booking.roomDetails.roomType}</p>
      <p>Bidet: ${booking.roomDetails.bidet}</p>
      <p>Bed Size: ${booking.roomDetails.bedSize}</p>
      <p>Number of Beds: ${booking.roomDetails.numBeds}</p>
      <p>Cost Per Night: ${booking.roomDetails.costPerNight}</p>
    </div>`
};

const populateRooms = (rooms, section) => {
  section.innerHTML = '';
  rooms.forEach(room => {
    section.innerHTML += 
      `<div class="booking" id=${room.number}>
        <div class="booking__footer id=${room.number}>
          <span class="room__type">${room.roomType}</span>
          <span class="room__cost">${room.costPerNight}</span>
        </div>
      </div>`
  });
}

const populateRoom = (room, section) => {
  section.innerHTML = '';
  section.innerHTML = 
    `<div class="current__booking">
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Cost Per Night: ${room.costPerNight}</p>
    </div>`
};


// const getTodaysDate = () => {
//   const currentDate = new Date();
//   // eslint-disable-next-line max-len
//   const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDay()}`;
//   return formattedDate;
// };


const sortByDate = (bookings) => {
  return bookings.sort((a, b) => new Date(a.bookingDetails.date) - new Date(b.bookingDetails.date))
};

const sortByToday = (bookings) => {
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
  const target = event.target.id;
  const targetedRoom = bookings.find(booking => booking.bookingDetails.id === target)
  currentRoom = targetedRoom;
  populateBooking(currentRoom, section)
};

const showRoomDetails = (event, rooms) => {
  const target = parseInt(event.target.id);
  const targetedRoom = rooms.find(room => room.number === target)
  currentRoom = targetedRoom;
  populateRoom(currentRoom, searchResults)
};

const showHistory = () => {
  show([pastBookings]);
  hide([futureBookings, searchResults]);
  sortByToday(userBookings)
  sortByDate(bookingsHistory)
  populateBookings(bookingsHistory, pastBookings);
};

const showUpcoming = () => {
  show([futureBookings]);
  hide([pastBookings, searchResults]);
  sortByToday(userBookings)
  sortByDate(bookingsUpcoming)
  populateBookings(bookingsUpcoming, futureBookings);
};

const searchRooms = (event) => {
  event.preventDefault();
  hide([pastBookings, futureBookings])
  show([searchResults])
  const filteredByDate = searchByDate(dateInput, bookingsData);
  availableRooms = getRoomsDetails(filteredByDate, roomsData);
  if (typeInput.value) {
    const filteredByType = searchByType(typeInput, availableRooms)
    availableRooms = getRoomsDetails(filteredByType, roomsData)
  }
  populateRooms(availableRooms, searchResults)
};

const searchByDate = (input, bookingsData) => {
  const dateSplit = input.value.split('-');
  const formattedDate = `${dateSplit[0]}/${dateSplit[1]}/${dateSplit[2]}`;
  return filterRoomsByDate(formattedDate, bookingsData);
}

const searchByType = (input, data) => {
  const typeFilter = input.value;
  const filteredRooms = filterRoomsByType(typeFilter, data);
  return filteredRooms;
};
