const db = require('./fake-db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Book Service is up and running.');
});

app.post('/add', (req, res) => {
    res.json(db.addBook(req.body));
});

app.post('/update', (req, res) => {
    res.json(db.updateBook(req.body));
});

app.post('/delete', (req, res) => {
    res.json(db.removeBook(req.body.id));
});

app.post('/getAll', (req, res) => {
    res.json(db.getAllBooks());
});

app.post('/getId', (req, res) => {
    res.json(db.getBookById(req.body.id));
})

app.post('/setAvailable', (req, res) => {
    res.json(db.setAvailable(req.body.id));
})

app.listen(PORT, () => console.log(`Book Service listening on ${PORT}`));