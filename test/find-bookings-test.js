// FIND BOOKINGS TEST //

import { expect } from 'chai';
import findBookings from '../src/functions/find-bookings';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('findBookings', () => {
  it('should take in a specific user, rooms data, and bookings data and return an object', () => {
    const customer = sampleCustomers[0];
    const booking =
        {
          bookingDetails: {
            "id": "5fwrgu4i7k55hl6t8",
            "userID": 1,
            "date": "2022/02/05",
            "roomNumber": 12
          },
          roomDetails: {
            "number": 12,
            "roomType": "single room",
            "bidet": false,
            "bedSize": "twin",
            "numBeds": 2,
            "costPerNight": 172.09
          }
        }
    const foundBookings = findBookings(customer, sampleRooms, sampleBookings)
    expect(foundBookings.length).to.equal(1);
    expect(foundBookings[0]).to.deep.equal(booking);
  });
  
  it('should work with multiple bookings', () => {
    const customer = sampleCustomers[2];
    const foundBookings = findBookings(customer, sampleRooms, sampleBookings);
    expect(foundBookings.length).to.equal(2);
  });

  it('should return an empty array if no bookings are found', () => {
    const customer = sampleCustomers[3];
    const foundBookings = findBookings(customer, sampleRooms, sampleBookings);
    expect(foundBookings).to.deep.equal([]);
  })
});

