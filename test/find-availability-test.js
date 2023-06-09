import { expect } from 'chai';
import findAvailability from '../src/functions/find-availability';
import { sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('findAvailability', () => {
  it('should take in a room number and return an array of booked dates', () => {
    const roomNumber = 20;
    const bookedDates = findAvailability(roomNumber, sampleBookings);
    expect(bookedDates).to.deep.equal([ '2022/01/31', '2023/11/27' ]);
  });

  it('should work with multiple room numbers', () => {
    const roomNumber = 5
    const bookedDates = findAvailability(roomNumber, sampleBookings);
    expect(bookedDates).to.deep.equal([ '2022/02/06', '2022/01/17' ]);
  });

  it('should return an empty array if the room has no bookings', () => {
    const roomNumber = 1;
    const bookedDates = findAvailability(roomNumber, sampleBookings);
    expect(bookedDates).to.deep.equal([]);
  });
});