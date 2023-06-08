// FIND TOTAL COST TEST //

import { expect } from 'chai';
import findTotalCost from "../src/functions/find-total-cost";
import findBookings from '../src/functions/find-bookings';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('findTotalCost', () => {
  let bookings;
  beforeEach(() => {
    bookings = findBookings(sampleCustomers[4], sampleRooms, sampleBookings)
  })

  it('should take in an array of bookings and return the total cost', () => {
    expect(findTotalCost(bookings)).to.equal(1029.51)
  })
})

