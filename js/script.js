const books = [];
const booksContainer = document.querySelector('.books-container');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
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
  books.forEach((book, index) => {
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

const remove = function () {
  const removeArr = document.querySelectorAll('.remove-btn');
  removeArr.forEach((remove, index) => {
    remove.addEventListener('click', () => {
      books.splice(index, 1);
      booksContainer.innerHTML = '';
      createBookList();
    });
  });
} 

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

window.addEventListener('load', () => {
  retrieve();
  createBookList();
});

booksContainer.addEventListener('click', ((e) => {
  books.splice(e.target.id, 1);
  e.target.parentElement.remove();

  localStorage.setItem('books', JSON.stringify(books));
}));

