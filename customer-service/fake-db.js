/*
A collection of functions simulating a data storage.
*/

// Import a library to create ids.
let uuid = require('uuid/v1');
let customers = [];

// Create some mock data
customers.push({
    id: uuid(),
    firstname: "Max",
    lastname: "Mustermann",
    address: "Musterstr. 12",
    birthday: new Date(1990, 9, 15).getTime()
},
{
    id: uuid(),
    firstname: "Klaus",
    lastname: "Müller",
    address: "Hauptstr. 2",
    birthday: new Date(1965, 3, 21).getTime()
}
);

const addCustomer = (customer) => {
    const id = uuid();
    // The spread operator (...) is used to create a new object which contains all elements of the received lend object
    // and adds new keys or changes keys of the object.
    // Here the id is added to the book object before it is pushed into the array.
    let newCustomer = {...customer, id: id}
    customers.push(newCustomer);
    return newCustomer;
} 

const updateCustomer = (customer) => {
    // Finds the index where the condition function returns true
    const index = customers.findIndex(element => element.id === customer.id);
    customers[index] = customer;
    return customers[index];
}

const removeCustomer = id => {
    // Finds the first element for which the condition function returns true
    const customerToRemove = customers.find(customer => customer.id === id);
    // Creates a new array containing all elements for which the condition function returns true (removes the element)
    customers = customers.filter(customer => customer.id !== id);
    return customerToRemove;
}

const getAllCustomers = () => {
    return customers;
}

const getCustomerById = id => {
    return customers.find(customer => customer.id === id);
}

// If this file is imported an instance of this file is created 
// and the below specified functions are made available to the importing party.
module.exports = {
    addCustomer,
    updateCustomer,
    removeCustomer,
    getAllCustomers,
    getCustomerById
}