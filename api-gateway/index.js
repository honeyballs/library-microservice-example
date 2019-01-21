// Import the express Framework and a library to send HTTP requests (fetch)
const express = require('express');
const fetch = require('node-fetch');
// Create the Server Instance
const app = express();
const PORT = process.env.PORT || 3003;
// This meta data is used for every request so we can define it once as a constant.
const fetchData = {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }
}
/*
Tell express to use its static and JSON middleware.
If the server recevies JSON in a request's body it will automatically convert the JSON to a JavaScript object.
Since the server also hosts the frontend of our application we have to allow .css and .js files to 
be accessed from the server from a static directory.
*/
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());

/*
 Configure the REST paths for the server.
 Express provides functions to add paths. app.get() will listen for GET requests, app.post() for POST requests.
 These functions require the url part to listen to and a callback function to execute when something arrives at this url.
 The callback function to execute receives the request (req) and a JavaScript Object containing multiple reply functions (res) from express.
 At the end of our callback we use the reply functions to fulfill a request.
*/

/* 
Provide the frontend.
If a request is made to the URL paths specified the server sends the corresponding HTML files.
*/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/customers', (req, res) => {
    res.sendFile(__dirname + '/public/pages/customers/customers.html')
})

app.get('/books', (req, res) => {
    res.sendFile(__dirname + '/public/pages/books/books.html')
});

app.get('/lends', (req, res) => {
    res.sendFile(__dirname + '/public/pages/lends/lends.html')
});

/*
POST paths for request sent from the frontend. 
The API gateway simply sends all POST requests it receives to the right microservice API using the fetch library.
fetch returns a promise. A promise is JavaScripts way to handle asynchronous operations.
It will resolve or reject and call the corresponding callback (then or catch).
Learn more:
https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
The fetched data is send as a response to fulfill the request.
*/

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

// Tell express to listen to communication on the specified port after the configuration is done.
app.listen(PORT, () => console.log(`Api Gateway listening on ${PORT}`));