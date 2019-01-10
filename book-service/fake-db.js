let uuid = require('uuid/v1');
let books = [];

const addBook = book => {
    const id = uuid();
    let newBook = { ...book,
        id: id
    }
    books.push(newBook);
    return newBook;
}

const updateBook = book => {
    const index = books.findIndex(element => element.id === book.id);
    books[index] = book;
    return books[index];
}

const removeBook = id => {
    const bookToRemove = books.find(book => book.id === id);
    books = books.filter(book => book.id !== id);
    return bookToRemove;
}

const getAllBooks = () => {
    return books;
}

const getBookById = id => {
    return books.find(book => book.id === id);
}

const setAvailable = (id, available) => {
    const index = books.findIndex(book => book.id === id);
    books[index] = {...books[index], available};
    return books[index];
}

module.exports = {
    addBook,
    updateBook,
    removeBook,
    getAllBooks,
    getBookById,
    setAvailable
}