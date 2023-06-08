// FIND TOTAL COST TEST //

import { expect } from 'chai';
import findTotalCost from "../src/functions/find-total-cost";
import findBookings from '../src/functions/find-bookings';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('findTotalCost', () => {
  it('should take in an array of bookings and return the total cost', () => {
    const bookings = findBookings(sampleCustomers[4], sampleRooms, sampleBookings);
    expect(findTotalCost(bookings)).to.equal(1029.51);
  });

  it('should return 0 if no bookings', () => {
    const bookings = findBookings(sampleCustomers[3], sampleRooms, sampleBookings);
    expect(findTotalCost(bookings)).to.equal(0);
  });
});

