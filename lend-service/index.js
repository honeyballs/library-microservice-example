const db = require('./fake-db');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3002;

//require the client to create it
const client = require('./camunda-worker').client;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Lend Service is up and running.');
});

app.post('/add', (req, res) => {
    let newLend = db.addLend(req.body);
    res.json(newLend);
    // Create process variables
    let idArray = newLend.books.map(book => ({
        id: book.id
    }));
    console.log(idArray);
    let variables = {
        variables: {
            lendId: {
                value: newLend.id
            },
            state: {
                value: newLend.state
            },
            books: {
                value: JSON.stringify(idArray)
            }
        }
    }
    fetch('http://camunda:8080/engine-rest/process-definition/key/BookAvailability/start', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(variables)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
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