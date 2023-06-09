// SELECT ROOM TEST //

import { expect } from 'chai';
import selectRoom from '../src/functions/select-room';
import { sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('selectRoom', () => {
  it('should take in a room number and return an object', () => {
    const room = 20;
    const roomInfo = selectRoom(room, sampleRooms, sampleBookings);
    expect(roomInfo.bookedDates).to.deep.equal([ '2022/01/31', '2023/11/27' ]);
    expect(roomInfo.roomDetails.roomType).to.equal('residential suite');
  });

  it('should work with multiple rooms', () => {
    const room = 5;
    const roomInfo = selectRoom(room, sampleRooms, sampleBookings);
    expect(roomInfo.bookedDates).to.deep.equal([ '2022/02/06', '2022/01/17' ]);
    expect(roomInfo.roomDetails.roomType).to.equal('single room');
  });

  it('should return an empty object if the room number is wrong', () => {
    const room = 80;
    const roomInfo = selectRoom(room, sampleRooms, sampleBookings);
    expect(roomInfo).to.deep.equal({});
  });
});