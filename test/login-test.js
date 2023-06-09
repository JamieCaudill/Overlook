// LOGIN TEST //

import { expect } from 'chai';
import { userLogin } from '../src/functions/login';
import { sampleCustomers } from '../sample-data/sample-data';

describe('userLogin', () => {
  it('should take in a username and match it to a user', () => {
    const username = 'customer1';
    const customer = userLogin(username, sampleCustomers);
    expect(customer.name).to.equal("Leatha Ullrich");
  });
  
  it('should work with multiple usernames', () => {
    const username = 'customer4';
    const customer = userLogin(username, sampleCustomers);
    expect(customer.name).to.equal("Kennedi Emard");
  });

  it('should return an empty string if username format is incorrect', () => {
    const username = 'mrpickles44';
    const customer = userLogin(username, sampleCustomers);
    expect(customer).to.equal('');
  });

  it('should return undefined if user cannot be found', () => {
    const username = 'customer80';
    const customer = userLogin(username, sampleCustomers);
    expect(customer).to.equal(undefined)
  });
});