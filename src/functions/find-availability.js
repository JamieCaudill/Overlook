// FIND AVAILABILITY FUNCTION //

const findAvailability = (roomNumberInput, bookingsData) => {
  const filteredBookings = bookingsData
    .filter(booking => booking.roomNumber === roomNumberInput)
    .map(data => data.date)
    console.log(filteredBookings)
  return filteredBookings;
}
  
export default findAvailability;