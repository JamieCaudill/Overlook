// FIND AVAILABILITY FUNCTION //

const findAvailability = (roomNumberInput, bookingsData) => {
  const filteredBookings = bookingsData
    .filter(booking => booking.roomNumber === roomNumberInput)
    .map(data => data.date);
  return filteredBookings;
};
  
export default findAvailability;