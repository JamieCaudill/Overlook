// FILTER ROOMS FUNCTIONS //

const filterRoomsByType = () => {

}

const filterRoomsByDate = (date, roomsData, bookingsData) => {
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