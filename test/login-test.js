// LOGIN TEST //

import { expect } from 'chai';
import findTotalCost from "../src/functions/find-total-cost";
import findBookings from '../src/functions/find-bookings';
import { userLogin } from '../src/functions/login';
import { sampleCustomers, sampleRooms, sampleBookings } from '../sample-data/sample-data';

describe('userLogin', () => {
  it('should take in a username and match it to a user', () => {
    const username = customer01;
    const customer = userLogin(username, sampleCustomers)
    expect(customer.name).to.equal("Leatha Ullrich")
  }) 
})