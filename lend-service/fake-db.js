let uuid = require('uuid/v1');
let lends = [];

const addLend = lend => {
    const id = uuid();
    let newlend = {...lend, id: id, customer: {...lend.customer, fees: 0}};
    lends.push(newlend);
    return newlend;
} 

const updateLend = lend => {
    const index = lends.findIndex(element => element.id === lend.id);
    lends[index] = lend;
    return lends[index];
}

const removeLend = id => {
    const lendToRemove = lends.find(lend => lend.id === id);
    lends = lends.filter(lend => lend.id !== id);
    return lendToRemove;
}

const returnBook = (lendId, bookId) => {
    let manipLend = lends.find(lend => lendId === lend.id);
    manipLend.books = manipLend.books.filter(book => {
        if (bookId === book.id) {
            // If the book was returned late we have to add to the late fees
            if (book.returndate < Date.now()) {
                manipLend.customer.fees += 2;
            }
            return false;
        }
        return true;
    })
    return manipLend;
}

const getAllLends = () => {
    return lends;
}

const getLendById = id => {
    return lends.find(lend => lend.id === id);
}

const getLendByBook = bookId => {
    return lends.find(lend => {
        const book = lend.books.find(book => bookId === book.id);
        if (book !== undefined) {
            return true;
        }
        return false;
    });
}

const getLendByCustomer = customerId => {
    return lends.find(lend => lend.customer.id === customerId);
}

module.exports = {
    addLend,
    updateLend,
    removeLend,
    returnBook,
    getAllLends,
    getLendById,
    getLendByBook,
    getLendByCustomer
}