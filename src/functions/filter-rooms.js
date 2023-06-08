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
  return filteredRooms;
}

export { filterRoomsByDate, filterRoomsByType }