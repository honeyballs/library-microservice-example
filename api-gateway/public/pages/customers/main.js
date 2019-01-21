var customers = [];

function renderTable() {
    var tbody = document.getElementById("table-body");
    customers.forEach(customer => {
        var row = document.createElement("tr");
        var tdFirstname = document.createElement("td");
        tdFirstname.appendChild(document.createTextNode(customer.firstname));
        var tdLastname = document.createElement("td")
        tdLastname.appendChild(document.createTextNode(customer.lastname));
        var tdBirthday = document.createElement("td")
        tdBirthday.appendChild(document.createTextNode(new Date(customer.birthday).toDateString()));
        var tdAddress = document.createElement("td")
        tdAddress.appendChild(document.createTextNode(customer.address));
        row.append(tdFirstname, tdLastname, tdBirthday, tdAddress);
        tbody.appendChild(row);
    });
}

function loadCustomers() {
    fetch(`http://${window.location.host}/customer/getAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(json => {
            customers = json;
            renderTable();
        })
        .catch(err => console.log(err));
}

function addCustomer(customerObj) {
    fetch(`http://${window.location.host}/customer/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(res => res.json())
        .then(customer => {
            var tbody = document.getElementById("table-body");
            var row = document.createElement("tr");
            var tdFirstname = document.createElement("td");
            tdFirstname.appendChild(document.createTextNode(customer.firstname));
            var tdLastname = document.createElement("td")
            tdLastname.appendChild(document.createTextNode(customer.lastname));
            var tdBirthday = document.createElement("td")
            tdBirthday.appendChild(document.createTextNode(new Date(customer.birthday).toDateString()));
            var tdAddress = document.createElement("td")
            tdAddress.appendChild(document.createTextNode(customer.address));
            row.append(tdFirstname, tdLastname, tdBirthday, tdAddress);
            tbody.appendChild(row);
        })
        .catch(err => console.log(err));
}

loadCustomers();

document.getElementById("create-form").addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    var customerObj = {}
    for (var [key, value] of formData.entries()) {
        if (key === 'birthday') {
            customerObj[key] = new Date(value).getTime();
        } else {
            customerObj[key] = value;
        }
    }

    addCustomer(customerObj);
});