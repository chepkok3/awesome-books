/* eslint-disable max-classes-per-file */
const booksContainer = document.querySelector('.books-container');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');
const dateTime = document.querySelector('.current-day');

const listBooks = document.querySelector('.list-books');
const addNewBook = document.querySelector('.add-new-book');
const contactInfo = document.querySelector('.contact-info');

const listBookLinks = document.querySelectorAll('.list-book');
const newBookLink = document.querySelector('.new-book');
const contactLink = document.querySelector('.contact');
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
    if (retrievedBooks === null) {
      return;
    }
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
  addNewBook.classList.add('hidden');
  contactInfo.classList.add('hidden');
});

booksContainer.addEventListener('click', (e) => {
  bookList.remove(e.target);
});

const date = new Date();

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
][date.getMonth()];
const str = `${month
} ${
  date.getDate()
} ${
  date.getFullYear()
}, ${
  date.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })}`;
dateTime.textContent = str;

listBookLinks.forEach((listBookLink) => {
  listBookLink.addEventListener('click', () => {
    listBooks.classList.remove('hidden');
    addNewBook.classList.add('hidden');
    contactInfo.classList.add('hidden');
  });
});

newBookLink.addEventListener('click', () => {
  addNewBook.classList.remove('hidden');
  listBooks.classList.add('hidden');
  contactInfo.classList.add('hidden');
});

contactLink.addEventListener('click', () => {
  contactInfo.classList.remove('hidden');
  addNewBook.classList.add('hidden');
  listBooks.classList.add('hidden');
});
