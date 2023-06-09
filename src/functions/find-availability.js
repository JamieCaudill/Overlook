

const findAvailability = (date, roomsData, bookingsData) => {
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

export default findAvailability;