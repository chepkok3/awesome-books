const booksContainer = document.querySelector('.books-container');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Books {
  constructor() {
    this.books = [];
  }
  add() {
    const newBook = new Book(newTitle.value, newAuthor.value);

    save();
    booksContainer.innerHTML = '';
    createBookList();
    initInput();
  }
  save() {
    // const savedBook = {};

    // savedBook.title = newTitle.value;
    // savedBook.author = newAuthor.value;

    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  createBookList() {
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.className = 'book-item';
      li.innerHTML = `
        <p class="new-title">${book.title}</p>
        <p class="new-author">${book.author}</p>
        <button class="remove-btn" id="${index}" type="button">Remove</button>
        <hr>
      `;
      booksContainer.appendChild(li);
    });
  }
}

/* save to local storage */

// retrieve from local storage

const retrieve = () => {
  const retrievedBooks = JSON.parse(localStorage.getItem('books'));

  retrievedBooks.forEach((book) => {
    books.push(book);
  });
};

const initInput = () => {
  newTitle.value = '';
  newAuthor.value = '';
};

// create the book list

const addBook = document.querySelector('.add-btn');
addBook.addEventListener('click', (e) => {
  if (newTitle.value === '' || newAuthor.value === '') {
    e.preventDefault();
  } else {
    add();
  }
});

window.addEventListener('load', () => {
  retrieve();
  createBookList();
});

booksContainer.addEventListener('click', (e) => {
  books.splice(e.target.id, 1);
  e.target.parentElement.remove();

  localStorage.setItem('books', JSON.stringify(books));
  initInput();
});
