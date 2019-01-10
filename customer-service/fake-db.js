let uuid = require('uuid/v1');
let customers = [];

const addCustomer = (customer) => {
    const id = uuid();
    let newCustomer = {...customer, id: id}
    customers.push(newCustomer);
    return newCustomer;
} 

const updateCustomer = (customer) => {
    const index = customers.findIndex(element => element.id === customer.id);
    customers[index] = customer;
    return customers[index];
}

const removeCustomer = id => {
    const customerToRemove = customers.find(customer => customer.id === id);
    customers = customers.filter(customer => customer.id !== id);
    return customerToRemove;
}

const getAllCustomers = () => {
    return customers;
}

const getCustomerById = id => {
    return customers.find(customer => customer.id === id);
}

module.exports = {
    addCustomer,
    updateCustomer,
    removeCustomer,
    getAllCustomers,
    getCustomerById
}