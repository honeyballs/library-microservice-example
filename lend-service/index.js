const db = require('./fake-db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Lend Service is up and running.');
});

app.post('/add', (req, res) => {
    res.json(db.addLend(req.body));
});

app.post('/update', (req, res) => {
    res.json(db.updateLend(req.body));
});

app.post('/delete', (req, res) => {
    res.json(db.removeLend(req.body.id));
});

app.post('/return', (req, res) => {
    res.json(db.returnBook(req.body.lendId, req.body.bookId));
})

app.post('/getAll', (req, res) => {
    res.json(db.getAllLends());
});

app.post('/getId', (req, res) => {
    res.json(db.getLendById(req.body.id));
})

app.post('/getByBook', (req, res) => {
    res.json(db.getLendByBook(req.body.bookId));
})

app.post('/getByCustomer', (req, res) => {
    res.json(db.getLendByCustomer(req.body.customerId));
})

app.listen(PORT, () => console.log(`Lend Service listening on ${PORT}`));