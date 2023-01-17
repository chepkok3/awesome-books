/* eslint-disable max-classes-per-file */
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

  // retrieve from local storage
  retrieve = () => {
    const retrievedBooks = JSON.parse(localStorage.getItem('books'));
    retrievedBooks.forEach((book) => {
      this.books.push(book);
    });
  };

  createBookList() {
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.className = 'book-item';
      li.innerHTML = `
      <div class="author-title">
        <q class="new-title">${book.title}</q>
        <span>by</span>
        <p class="new-author">${book.author}</p>
      </div>
        <button class="remove-btn" id="${index}" type="button">Remove</button>
      `;
      booksContainer.appendChild(li);
    });
  }

  initInput = () => {
    newTitle.value = '';
    newAuthor.value = '';
  };

  add() {
    const newBook = new Book(newTitle.value, newAuthor.value);
    this.books.push(newBook);

    localStorage.setItem('books', JSON.stringify(this.books));

    booksContainer.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.className = 'book-item';
      li.innerHTML = ` 
      <div class="author-title">
        <q class="new-title">${book.title}</q>
        <span>by</span>
        <p class="new-author">${book.author}</p>
      </div>
        <button class="remove-btn" id="${index}" type="button">Remove</button>
      `;
      booksContainer.appendChild(li);
    });
    this.initInput();
  }

  remove(target) {
    if (target.className === 'remove-btn') {
      this.books.splice(target.id, 1);
      target.parentElement.remove();
      localStorage.setItem('books', JSON.stringify(this.books));
      this.initInput();
    }
  }
}

const bookList = new Books();

const addBook = document.querySelector('.add-btn');
addBook.addEventListener('click', (e) => {
  if (newTitle.value === '' || newAuthor.value === '') {
    e.preventDefault();
  } else {
    bookList.add();
  }
});

window.addEventListener('load', () => {
  bookList.retrieve();
  bookList.createBookList();
});

booksContainer.addEventListener('click', (e) => {
  bookList.remove(e.target);
});
