// Import the Fake DB functions and the express Framework
const db = require('./fake-db');
const express = require('express');
const fetch = require('node-fetch');
// Create the Server Instance
const app = express();
const PORT = process.env.PORT || 3002;

// Require the client to create an instance of it so it can start polling for tasks
const client = require('./camunda-worker').client;

// Tell express to use its JSON middleware.
// If the server recevies JSON in a request's body it will automatically convert the JSON to a JavaScript object.
app.use(express.json());

/*
 Configure the REST paths for the server.
 Express provides functions to add paths. app.get() will listen for GET requests, app.post() for POST requests.
 These functions require the url part to listen to and a callback function to execute when something arrives at this url.
 The callback function to execute receives the request (req) and a JavaScript Object containing multiple reply functions (res) from express.
 At the end of our callback we use the reply functions to fulfill a request.
*/

app.get('/', (req, res) => {
    res.send('Lend Service is up and running.');
});

app.post('/add', (req, res) => {
    // Create a new lend object in a pending state and fulfill the request
    let newLend = db.addLend(req.body);
    res.json(newLend);
    // Create process variables and start the process
    let idArray = newLend.books.map(book => ({
        id: book.id
    }));
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

// Tell express to listen to communication on the specified port after the configuration is done.
app.listen(PORT, () => console.log(`Lend Service listening on ${PORT}`));