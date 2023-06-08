import { expect } from 'chai';
import { sampleCustomers, sampleRooms, sampleBookings } from '../../sample-data/sample-data'

describe('findBookings', () => {
  it('should take in a specific user and return rooms booked', () => {
    const customer = sampleCustomers[0];
    expect(customer.name).to.equal("Leatha Ullrich")
  })
})
console.log(sampleCustomers)