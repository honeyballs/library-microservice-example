let uuid = require('uuid/v1');
let books = [];

books.push({
    id: uuid(),
    isbn: "978-3-548-26308-3",
    title: "Es",
    author: "Stephen King",
    publisher: "Ullstein",
    year: 2005,
    genre: "Horror",
    condition: "New",
    available: true
},
{
    id: uuid(),
    isbn: "978-3-548-26308-3",
    title: "Schnelles Denken, langsames Denken",
    author: "Daniel Kahneman",
    publisher: "Penguin Verlag",
    year: 2016,
    genre: "Sachbuch",
    condition: "New",
    available: true
});

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

const setAvailable = (id) => {
    const index = books.findIndex(book => book.id === id);
    books[index] = {...books[index], available: !books[index].available};
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