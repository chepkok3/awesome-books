const books = [];
const booksContainer = document.querySelector('.books-container');
const newTitle = document.getElementById('new-title');
const newAuthor = document.getElementById('new-author');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

/* local storage */
const savedBooks = [];

const save = () => {
  const savedBook = {};

  savedBook.title = newTitle.value;
  savedBook.author = newAuthor.value;

  savedBooks.push(savedBook);
  localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
};

const retrieve = () => {
  const retrievedBooks = JSON.parse(localStorage.getItem('savedBooks'));

  retrievedBooks.forEach((book) => {
    books.push(book);
  });
};

window.addEventListener('load', () => {
  retrieve();

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

  const removeArr = document.querySelectorAll('.remove-btn');
  removeArr.forEach((remove, index) => {
    remove.addEventListener('click', () => {
      books.splice(index, 1);
      booksContainer.innerHTML = '';
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
    });
  });
});

const add = function () {
  const newBook = Object.create(Book);
  newBook.title = newTitle.value;
  newBook.author = newAuthor.value;

  save();
  books.push(newBook);
  booksContainer.innerHTML = '';

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
};

const addBook = document.querySelector('.add-btn');
addBook.addEventListener('click', add);
