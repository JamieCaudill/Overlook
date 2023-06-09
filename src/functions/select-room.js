// SELECT ROOM FUNCTION //

import findAvailability from "./find-availability";

const selectRoom = (roomNumberInput, roomsData, bookingsData) => {
  const booked = findAvailability(roomNumberInput, bookingsData);
  const roomInfo = roomsData.reduce((acc, room) => {
    if (room.number === roomNumberInput) {
      acc.bookedDates = booked;
      acc.roomDetails = room
    }
    return acc;
  }, {})
  return roomInfo;
}


export default selectRoom;