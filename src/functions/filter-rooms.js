// FILTER ROOMS FUNCTIONS //

const filterRoomsByType = (roomFilter, roomsData) => {
  if (!roomFilter) {
    return [];
  }
  const filteredRooms = roomsData
    .filter(room => room.roomType === roomFilter)
    .map(data => data.number)
    .sort((a, b) => a - b)
  return [...new Set(filteredRooms)];
}

const filterRoomsByDate = (date, bookingsData) => {
  if (!date) {
    return [];
  }
  const filteredBookings = bookingsData
    .filter(booking => booking.date !== date)
    .map(room => room.roomNumber)
    .sort((a, b) => a - b)
  return [...new Set(filteredBookings)];
}

export { filterRoomsByDate, filterRoomsByType }