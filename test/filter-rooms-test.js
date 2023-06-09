// FILTER ROOMS TEST //

import { expect } from 'chai';
import { filterRoomsByDate, filterRoomsByType } from '../src/functions/filter-rooms';
import { sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('filterRoomsByDate', () => {
  it('should take in a date and return available rooms with no duplicates', () => {
    const date = "2022/01/24";
    const availableRooms = filterRoomsByDate(date, sampleRooms, sampleBookings);
    expect(availableRooms.length).to.equal(13);
  })

  it('should sort rooms by room number', () => {
    const date = "1969/08/22";
    const availableRooms = filterRoomsByDate(date, sampleRooms, sampleBookings);
    const lowestAvailableRoom = availableRooms[0]
    const highestAvailableRoom = availableRooms[availableRooms.length - 1]
    expect(lowestAvailableRoom).to.deep.equal(2);
    expect(highestAvailableRoom).to.equal(24);
  })

  it('should return an empty array if no date argument is passed', () => {
    const date = '';
    const availableRooms = filterRoomsByDate(date, sampleRooms, sampleBookings);
    expect(availableRooms).to.deep.equal([]);
  })
})
