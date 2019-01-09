const db = require('./fake-db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Customer Service is up and running.')
})

app.post('/add', (req, res) => {
    const customer = req.body;
    // TODO: validation
    console.log(customer);
    res.json(db.addCustomer(customer));
})

app.listen(PORT, () => console.log(`Customer Service listening on ${PORT}`));