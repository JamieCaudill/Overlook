// FILTER ROOMS FUNCTIONS //

const filterRoomsByType = () => {

}

const filterRoomsByDate = (date, roomsData, bookingsData) => {
  const filteredBookings = bookingsData.filter(booking => booking.date !== date);
  const filteredRooms = roomsData.reduce((acc, room) => {
    filteredBookings.forEach(booking => {
      if (booking.roomNumber === room.number) {
        acc.push({bookingDetails: booking, roomDetails: room})
      }
    })
    return acc;
  }, [])
  const sortedRooms = filteredRooms.sort((a, b) => {
    return a.roomDetails.number - b.roomDetails.number
  });
  return sortedRooms;
}

// Prevent duplicates
// I want to add dates available and dates unavailable arrays to roomDetails object

export { filterRoomsByDate, filterRoomsByType }