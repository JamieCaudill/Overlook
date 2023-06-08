// FIND TOTAL COST FUNCTION //

const findTotalCost = (bookings) => {
  return bookings.reduce((acc, booking) => {
    return acc += booking.roomDetails.costPerNight;
  }, 0)
}

export default findTotalCost;