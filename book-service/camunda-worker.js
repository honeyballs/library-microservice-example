const { Client, Variables } = require('camunda-external-task-client-js');
const db = require('./fake-db');

const config = {
    baseUrl: "http://camunda:8080/engine-rest", 
    asyncResponseTimeout: 10000
};

const client = new Client(config);

client.subscribe('change-available-false', async function ({task, taskService}) {
    
    const lendId = task.variables.get('lendId');
    const bookIds = JSON.parse(task.variables.get('books'));
    console.log(bookIds);
    
    // If something would fail here we would return false
    let success = true;
    bookIds.forEach(obj => {
        let book = db.setAvailable(obj.id);
        if (book.available) {
            success = false;
        }
    });

    const processVariables = new Variables();
    processVariables.set("availableSet", success);    

    console.log(`Books of Lend with id ${lendId} were made no longer available: ${success}.`);

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

module.exports = {
    client
}