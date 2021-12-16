const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const priority = document.getElementById('priority');
const category = document.getElementById('category');
const error = document.getElementById('error');
let myStorage__table = document.getElementById('myStorage__table');
let library = JSON.parse(window.localStorage.getItem('library'));

class Book {
    constructor(bookTilte, bookAuthor, bookPriority, bookCategory) {
        this.bookTilte = bookTilte;
        this.bookAuthor = bookAuthor;
        this.bookPriority = bookPriority;
        this.bookCategory = bookCategory;
    };
};

function init() {
    if (library == null) {
        library = Array();
        window.localStorage.setItem('library', JSON.stringify(library));
        showLibrary();
    }
    else {
        showLibrary();
    };

};

form.addEventListener('submit', (e) => {

    // validation
    let messages = [];

    if (title.value.length < 1 || title.value === null) {
        messages.push('Tytuł musi zawierać conajmniej 1 znak!')
    }
    else if (author.value.length < 2 || author.value === null) {
        messages.push('Autor musi zawierać conajmniej 2 znaki!')
    }
    else if (priority.value.length === 0) {
        messages.push('Wybierz priorytet przeczytania książki!')
    }

    else if (category.value.length === 0) {
        messages.push('Wybierz kategorię!')
    }

    // add new book
    else {
        let book = new Book(title.value, author.value, priority.value, category.value);
        let addBook = Object.values(book);
        library.push(book);
        window.localStorage.setItem('library', JSON.stringify(library)); 

        e.preventDefault();
        
        addBooks (addBook);
        
        form.reset();
    }
    
    // error messages
    if (messages.length > 0) {
        e.preventDefault();
        error.innerHTML = messages.join(' ');
    }
});

function addBooks (addBook) {
    let table = document.getElementById("myStorage__table");
    let row = table.insertRow(-1);
    for(i=0; i <= addBook.length -1; i++) {
        let cell1 = row.insertCell(-1);
        cell1.innerHTML = addBook[i];
    };
}

function showLibrary() {
    let libraryStorage = JSON.parse(window.localStorage.getItem('library'));
    for (i = 0; i <= libraryStorage.length - 1; i++) {
        let books = Object.values(libraryStorage[i]);
        let table = document.getElementById("myStorage__table");
        let row = table.insertRow(-1);
        for (j = 0; j < books.length; j++) {
            let cell1 = row.insertCell(-1);
            cell1.innerHTML = books[i, j];
        };
    };
};