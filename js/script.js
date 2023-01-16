const books = [];
const booksContainer = document.querySelector('.books-container');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

/* local storage */

const save = () => {
  const savedBook = {};

  savedBook.title = newTitle.value;
  savedBook.author = newAuthor.value;

  books.push(savedBook);
  localStorage.setItem('books', JSON.stringify(books));
};

const retrieve = () => {
  const retrievedBooks = JSON.parse(localStorage.getItem('books'));

  retrievedBooks.forEach((book) => {
    books.push(book);
  });
};

const createBookList = () => {
  books.forEach((book) => {
    const li = document.createElement('li');
    li.className = 'book-item';
    li.innerHTML = `
      <p class="new-title">${book.title}</p>
      <p class="new-author">${book.author}</p>
      <button class="remove-btn" type="button">Remove</button>
      <hr>
    `;
    booksContainer.appendChild(li);
  });
}

window.addEventListener('load', () => {
  retrieve();
  createBookList();

  const removeArr = document.querySelectorAll('.remove-btn');
  removeArr.forEach((remove, index) => {
    remove.addEventListener('click', () => {
      books.splice(index, 1);
      booksContainer.innerHTML = '';

      createBookList();
    });
  });
});

const add = function () {
  const newBook = Object.create(Book);
  newBook.title = newTitle.value;
  newBook.author = newAuthor.value;

  save();
  booksContainer.innerHTML = '';
  createBookList();
};

const addBook = document.querySelector('.add-btn');
addBook.addEventListener('click', add);
