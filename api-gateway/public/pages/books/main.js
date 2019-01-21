var books = [];

function renderTable() {
    var tbody = document.getElementById("table-body");
    books.forEach(book => {
        var row = document.createElement("tr");
        var tdTitle = document.createElement("td");
        tdTitle.appendChild(document.createTextNode(book.title));
        var tdAuthor = document.createElement("td")
        tdAuthor.appendChild(document.createTextNode(book.author));
        var tdPublisher = document.createElement("td")
        tdPublisher.appendChild(document.createTextNode(book.publisher));
        var tdYear = document.createElement("td")
        tdYear.appendChild(document.createTextNode(book.year));
        var tdISBN = document.createElement("td")
        tdISBN.appendChild(document.createTextNode(book.isbn));
        var tdGenre = document.createElement("td")
        tdGenre.appendChild(document.createTextNode(book.genre));
        var tdCondition = document.createElement("td")
        tdCondition.appendChild(document.createTextNode(book.condition));
        var tdAvailable = document.createElement("td")
        tdAvailable.appendChild(document.createTextNode(book.available ? 'Yes' : 'No'));
        row.append(tdTitle, tdAuthor, tdPublisher, tdYear, tdISBN, tdGenre, tdCondition, tdAvailable);
        tbody.appendChild(row);
    });
}

function loadBooks() {
    fetch(`http://${window.location.host}/book/getAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(json => {
            books = json;
            renderTable();
        })
        .catch(err => console.log(err));
}

function addBook(bookObj) {
    fetch(`http://${window.location.host}/book/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookObj)
        })
        .then(res => res.json())
        .then(book => {
            var tbody = document.getElementById("table-body");
            var row = document.createElement("tr");
            var tdTitle = document.createElement("td");
            tdTitle.appendChild(document.createTextNode(book.title));
            var tdAuthor = document.createElement("td")
            tdAuthor.appendChild(document.createTextNode(book.author));
            var tdPublisher = document.createElement("td")
            tdPublisher.appendChild(document.createTextNode(book.publisher));
            var tdYear = document.createElement("td")
            tdYear.appendChild(document.createTextNode(book.year));
            var tdISBN = document.createElement("td")
            tdISBN.appendChild(document.createTextNode(book.isbn));
            var tdGenre = document.createElement("td")
            tdGenre.appendChild(document.createTextNode(book.genre));
            var tdCondition = document.createElement("td")
            tdCondition.appendChild(document.createTextNode(book.condition));
            var tdAvailable = document.createElement("td")
            tdAvailable.appendChild(document.createTextNode(book.available ? 'Yes' : 'No'));
            row.append(tdTitle, tdAuthor, tdPublisher, tdYear, tdISBN, tdGenre, tdCondition, tdAvailable);
            tbody.appendChild(row);
        })
        .catch(err => console.log(err));
}

loadBooks();

document.getElementById("create-form").addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    var bookObj = {}
    for (var [key, value] of formData.entries()) {
        if (key === 'available') {
            bookObj[key] = value ? true : false
        } else {
            bookObj[key] = value;
        }
    }
    // The available key will not exist if the checkbox isn't checked
    if (!bookObj.hasOwnProperty('available')) {
        bookObj['available'] = false;
    }
    
    addBook(bookObj);
});