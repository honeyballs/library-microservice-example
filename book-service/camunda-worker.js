/*
    This client polls regularly from Camunda to check for tasks.
    If it finds a task it will run a function defined by us.
*/

// Import the camunda client and our fake DB
const { Client, Variables } = require('camunda-external-task-client-js');
const db = require('./fake-db');

// Base configuration of the client
const config = {
    baseUrl: "http://camunda:8080/engine-rest", 
    asyncResponseTimeout: 10000
};

const client = new Client(config);

/*
    Using the subscribe function we specify topics  (channels) for the client to listen to.
    Additionally we define a function that will be executed if something is received on the channel.
    This function receives an Object containing data of the process (task) and an object containing functions to 
    interact with the process.
    Compare this to the req and res parameters of express.
    Here the async/await syntax is used instead of promises for better readability.
    https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/async_function
*/

client.subscribe('change-available-false', async function ({task, taskService}) {
    
    const lendId = task.variables.get('lendId');
    const bookIds = JSON.parse(task.variables.get('books'));
    
    // If something would fail here we would return false
    let success = true;
    bookIds.forEach(obj => {
        let book = db.setAvailable(obj.id);
        if (book.available) {
            success = false;
        }
    });

    // Add/set new process variables
    const processVariables = new Variables();
    processVariables.set("availableSet", success);    

    console.log(`Books of Lend with id ${lendId} were made no longer available: ${success}.`);

    // Tell camunda that the task is completed and pass the new process variables along.
    await taskService.complete(task, processVariables);
});

client.subscribe('rollback-available-false', async function ({task, taskService}) {
    
    const id = task.variables.get('lendId');

    bookIds.forEach(id => {
        db.setAvailable(id);
    });
    
    console.log(`Books of Lend with id ${id} where made available again.`);

    await taskService.complete(task);
});

// Export the client to let the server create an instance.
module.exports = {
    client
}