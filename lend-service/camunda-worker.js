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

client.subscribe('set-lend', async function ({task, taskService}) {
    
    const id = task.variables.get('lendId');
    
    // If something would fail here we would set the state to cancelled
    let newLend = db.confirmLend(id);

    // Add/set new process variables
    const processVariables = new Variables();
    processVariables.set("state", newLend.state);

    console.log(`Lend with id ${id} is now ${newLend.state}.`);

    // Tell camunda that the task is completed and pass the new process variables along.
    await taskService.complete(task, processVariables);
});

client.subscribe('rollback-lend-create', async function ({task, taskService}) {
    
    const id = task.variables.get('lendId');
    db.removeLend(id);

    const processVariables = new Variables();
    processVariables.set("state", "REMOVED");
    
    console.log(`Lend with id ${id} is now removed.`);

    await taskService.complete(task, processVariables);
});

// Export the client to let the server create an instance.
module.exports = {
    client
}