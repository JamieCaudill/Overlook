// LOGIN TEST //

import { expect } from 'chai';
import { userLogin, checkPassword } from '../src/functions/login';
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

  it('should return undefined if username format is incorrect', () => {
    const username = 'mrpicklescustomer44';
    const customer = userLogin(username, sampleCustomers);
    expect(customer).to.equal(undefined);
  });

  it('should return undefined if user cannot be found', () => {
    const username = 'customer80';
    const customer = userLogin(username, sampleCustomers);
    expect(customer).to.equal(undefined)
  });
});

describe('checkPassword', () => {
  it('should take in a password and return true if correct', () => {
    const password = 'overlook2021';
    const isPasswordGood = checkPassword(password);
    expect(isPasswordGood).to.equal(true);
  });

  it('should return false if password is incorrect', () => {
    const password = 'platypus99';
    const isPasswordGood = checkPassword(password);
    expect(isPasswordGood).to.equal(false);
  });
});