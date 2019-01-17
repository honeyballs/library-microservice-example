const { Client, Variables } = require('camunda-external-task-client-js');
const db = require('./fake-db');

const config = {
    baseUrl: "http://camunda:8080/engine-rest", 
    asyncResponseTimeout: 10000
};

const client = new Client(config);

client.subscribe('set-lend', async function ({task, taskService}) {
    
    const id = task.variables.get('lendId');
    
    // If something would fail here we would set the state to cancelled
    let newLend = db.confirmLend(id);

    const processVariables = new Variables();
    processVariables.set("state", newLend.state);

    console.log(`Lend with id ${id} is now ${newLend.state}.`);

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

module.exports = {
    client
}