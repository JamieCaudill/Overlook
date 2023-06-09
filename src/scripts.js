// SCRIPTS //

// IMPORTS //

import './css/index.css';
import './images/turing-logo.png';
import { getLogin } from './dom-updates';

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
                customersData.push(data.customers)
              } else if (response.url.includes('/rooms')) {
                roomsData.push(data.rooms)
              } else if (response.url.includes('/bookings')) {
                bookingsData.push(data.bookings)
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




