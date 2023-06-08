// FILTER ROOMS TEST //

import { expect } from 'chai';
import findTotalCost from "../src/functions/find-total-cost";
import findBookings from '../src/functions/find-bookings';
import { filterRoomsByDate, filterRoomsByType } from '../src/functions/filter-rooms';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('filterRoomsByDate', () => {
  it('should take in a date and return available rooms', () => {
    const date = "2022/01/24";
    const availableRooms = filterRoomsByDate(date, sampleRooms, sampleBookings);
    expect(availableRooms.length).to.equal(19);
  })

  it('should sort rooms by room number', () => {
    const date = "1969/08/22";
    const availableRooms = filterRoomsByDate(date, sampleRooms, sampleBookings);
    const lowestAvailableRoom = availableRooms[0].roomDetails.number;
    const highestAvailableRoom = availableRooms[availableRooms.length - 1].roomDetails.number;
    expect(lowestAvailableRoom).to.deep.equal(2);
    expect(highestAvailableRoom).to.equal(20);
  })
})
