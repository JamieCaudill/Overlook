// FILTER ROOMS TEST //

import { expect } from 'chai';
import findTotalCost from "../src/functions/find-total-cost";
import findBookings from '../src/functions/find-bookings';
import { filterRoomsByDate, filterRoomsByType } from '../src/functions/filter-rooms';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';

// filter rooms by date
  // takes a date, bookings, and rooms
  // date format "2022/01/24"
  // filter bookings.date
  // return all available rooms
  // include option to view unavailable rooms

describe('filterRoomsByDate', () => {
  it('should take in a date and return available rooms', () => {
    const date = "2022/01/24";
    const availableRooms = filterRoomsByDate(date, sampleRooms, sampleBookings);
    expect(availableRooms.length).to.equal(19);
  })
})
