// Import the Fake DB functions and the express Framework
const db = require('./fake-db');
const express = require('express');
// Create the Server Instance
const app = express();
const PORT = process.env.PORT || 3000;

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

// Tell express to listen to communication on the specified port after the configuration is done.
app.listen(PORT, () => console.log(`Customer Service listening on ${PORT}`));