// FIND BOOKINGS FUNCTION //

const findBookings = (customer, roomsData, bookingsData) => {
  const bookingDetails = bookingsData.filter(booking => customer.id === booking.userID);
  const bookingInfo = roomsData.reduce((acc, room) => {
    bookingDetails.forEach(booking => {
      if (booking.roomNumber === room.number) {
        acc.push({bookingDetails: booking, roomDetails: room})
      }
    })
    return acc;
  }, [])
  console.log(bookingInfo)
  return bookingInfo;
}

export default findBookings;