# Microservice Example - Library



## Introduction

This is a small example for a Microservice architecture. It consists of three services (book service, customer service, lend service) and an API gateway implemented as Node servers using Express.

The API Gateway also serves as the host for a minimalistic web frontend.

All services handle their use cases independently and don't know about the existence of other services.

The master branch of this repository contains only the services and frontend while the `camunda` branch adds an additional orchestration layer implemented by the camunda process engine.

Implemented use cases:

* Create a customer
* Create a book
* Borrow a book
* Return a book

Additional implementation in the `camunda` branch:

* Set book availability to false when borrowed



## Run the example with Docker

Install Docker from the [download page](https://hub.docker.com/search/?type=edition&offering=community) if you haven't already.

Clone the branch you are interested in.

Open up a terminal at the project root and run:

```bash
> docker-compose up
```

The images will be built/downloaded and the Docker containers will start.

Once everything is up and running visit `localhost:3003` to use the example.

### Shut down

Press `Ctrl + c` in the terminal window running the application. 

Run the following command to destroy and remove the Docker containers:

```bash
> docker-compose down
```

### Making changes

After you made changes to the code you have to rebuild the Docker images before starting the containers. Do this by running the following in the root of the application:

```bash
> docker-compose build
> docker-compose up
```

or

```bash
> docker-compose up --force-recreate
```



## Run the example without Docker

### Base example

Make sure you have [Node](https://nodejs.org/en/) installed.

Open a terminal Window at each service directory (e.g. book-service) and run:

```bash
> npm install
> npm start
```

This will install all dependencies and start the services.

**Important:** The URLs in this example are URLs which allow Docker to find the services. You will have to change all URLs to `localhost` in the api-gateway `index.js` and the `main.js` files of the frontend pages.

### Camunda example

To run Camunda you need a Java Runtime Environment version 1.7 or higher.

Download [Camunda](https://camunda.com/download/) and the [Camunda Modeler](https://camunda.com/download/modeler/). 

Follow the instructions on the Camunda page to start the Camunda server. Run the Camunda Modeler and open the availability.bpmn. Click on the upload/deploy button on the top bar and deploy the Model with the name "BookAvailability".

Afterwards you can follow the steps from the Base example. Remember to change all URLs. You also have to change the URLs in the `camunda-worker.js` files to `localhost`.

### Shut down

Press `Strg + c` in all terminal windows.