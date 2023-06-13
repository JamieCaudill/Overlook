// FILTER ROOMS FUNCTIONS //

const filterRoomsByType = (roomFilter, roomsData) => {
  if (!roomFilter) {
    return [];
  }
  const filteredRooms = roomsData
    .filter(room => {
      return room.roomType === roomFilter
    })
    .map(data => data.number)
    .sort((a, b) => a - b)
  return [...new Set(filteredRooms)];
};

const filterRoomsByDate = (date, bookingsData) => {
  const roomNumbers = bookingsData.map(booking => booking.roomNumber)
  const sortedRoomNumbers = ([...new Set(roomNumbers)].sort((a, b) => a - b))
  if (!date) {
    return [];
  }
  const unavailableRooms = bookingsData
    .reduce((acc, booking) => {
      if  (booking.date === date) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);
  return sortedRoomNumbers.filter(number => !unavailableRooms.includes(number));
};

const getRoomsDetails = (roomNumbers, roomsData) => {
  return roomsData.reduce((acc, room) => {
    roomNumbers.forEach(roomNumber => {
      if (room.number === roomNumber) {
        acc.push(room);
      }
    }) 
    return acc;
  }, []);
};

export { filterRoomsByDate, filterRoomsByType, getRoomsDetails };