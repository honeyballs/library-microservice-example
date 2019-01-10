const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3003;
const fetchData = {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api Gateway is up and running.');
});

/* Customer API */

app.post('/customer/add', (req, res) => {
    fetch('http://customer-service:3000/add', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/update', (req, res) => {
    fetch('http://customer-service:3000/update', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/delete', (req, res) => {
    fetch('http://customer-service:3000/delete', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/getAll', (req, res) => {
    fetch('http://customer-service:3000/getAll', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/customer/getId', (req, res) => {
    fetch('http://customer-service:3000/getId', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

/* Book API */

app.post('/book/add', (req, res) => {
    fetch('http://book-service:3001/add', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/update', (req, res) => {
    fetch('http://book-service:3001/update', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/delete', (req, res) => {
    fetch('http://book-service:3001/delete', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/getAll', (req, res) => {
    fetch('http://book-service:3001/getAll', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/getId', (req, res) => {
    fetch('http://book-service:3001/getId', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/setAvailable', (req, res) => {
    fetch('http://book-service:3001/setAvailable', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

/* Lend API */

app.post('/lend/add', (req, res) => {
    fetch('http://lend-service:3002/add', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/update', (req, res) => {
    fetch('http://lend-service:3002/update', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/delete', (req, res) => {
    fetch('http://lend-service:3002/delete', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/return', (req, res) => {
    fetch('http://lend-service:3002/return', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.post('/lend/getAll', (req, res) => {
    fetch('http://lend-service:3002/getAll', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/lend/getId', (req, res) => {
    fetch('http://lend-service:3002/getId', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.post('/lend/getByBook', (req, res) => {
    fetch('http://lend-service:3002/getByBook', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.post('/lend/getByCustomer', (req, res) => {
    fetch('http://lend-service:3002/getByCustomer', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
})

app.listen(PORT, () => console.log(`Api Gateway listening on ${PORT}`));