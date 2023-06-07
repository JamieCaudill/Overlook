// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image 
// (also need to link to it in the index.html)
import './images/turing-logo.png'

const fetchCustomers = fetch('http://localhost:3001/api/v1/customers');
const fetchRooms = fetch('http://localhost:3001/api/v1/rooms');
const fetchBookings = fetch('http://localhost:3001/api/v1/bookings');

let customersData = [];
let roomsData = [];
let bookingsData = [];

window.addEventListener('load', () => {
  Promise.all([fetchCustomers, fetchRooms, fetchBookings])
    .then(responses => {
      responses.forEach(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              if (response.url.includes('/customers')) {
                customersData.push(data.customers)
                console.log(customersData)
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



console.log('This is the JavaScript entry file - your code begins here.');
