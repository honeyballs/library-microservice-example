const db = require('./fake-db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Customer Service is up and running.');
});

app.post('/add', (req, res) => {
    res.json(db.addCustomer(req.body));
});

app.post('/update', (req, res) => {
    res.json(db.updateCustomer(req.body));
});

app.post('/delete', (req, res) => {
    res.json(db.removeCustomer(req.body.id));
});

app.post('/getAll', (req, res) => {
    res.json(db.getAllCustomers());
});

app.post('/getId', (req, res) => {
    res.json(db.getCustomerById(req.body.id));
})

app.listen(PORT, () => console.log(`Customer Service listening on ${PORT}`));