import { expect } from 'chai';
import { sampleCustomers, sampleRooms, sampleBookings } from '../../sample-data/sample-data'

describe('findBookings', () => {
  it('should take in a specific user and return rooms booked', () => {
    const customer = sampleCustomers[0];
    const booking =
      {
        bookingDetails: {"id": "5fwrgu4i7k55hl6t8",
          "userID": 1,
          "date": "2022/02/05",
          "roomNumber": 12
        },
        roomDetails: {
          "number": 12,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 172.09
        }
      }
    const foundBookings = findBookings(customer, sampleRooms, sampleBookings)
    expect(foundBookings.length).to.equal(1)
    expect(foundBookings[0]).to.equal(booking)
  })
})

