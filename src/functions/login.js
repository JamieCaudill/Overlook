// LOGIN FUNCTIONS //

const userLogin = (username, customersData) => {
  const customerNumber = username.split('customer')[1];
  if (!customerNumber) {
    return '';
  }
  return customersData.find(customer => customer.id === parseInt(customerNumber));
};

const checkPassword = (password) => {
  if (password === 'overlook2021') {
    return true;
  } 
  return false;
};

export { userLogin, checkPassword };