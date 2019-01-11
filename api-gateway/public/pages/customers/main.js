var customers = [];

fetch(`http://${window.location.host}/customer/getAll`, {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({})
})
.then(res => res.json())
.then(json => {
    console.log(json)
    customers = json;
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
})
.catch(err => console.log(err));