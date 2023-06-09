// LOGIN FUNCTIONS //

const userLogin = (username, customersData) => {
  const customerNumber = username.split('customer')[1];
  if (!customerNumber) {
    return '';
  }
  return customersData.find(customer => customer.id === parseInt(customerNumber));
};

export { userLogin }