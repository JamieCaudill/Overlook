// LOGIN FUNCTIONS //

const userLogin = (username, customersData) => {
  const splitUsername = username.split('customer');
  if (splitUsername.length > 2) {
    return;
  }
  const customerNumber = splitUsername[1];
  if (!customerNumber) {
    return;
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