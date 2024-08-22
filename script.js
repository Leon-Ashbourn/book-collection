const inputSubmit = document.querySelector('#submit-input');
const closeBtn = document.querySelector('#close-popup');

const libraryBooks = [];

function Book(author, title, pages, bookStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.bookStatus = bookStatus;
}


const html = document.querySelector('html');
inputSubmit.addEventListener('click', (event)=>{
    event.preventDefault();

    const inputValues = document.querySelectorAll('form>div>input');
    const status = document.querySelector(".status>input[type='radio']:checked")
    let author = inputValues[0].value;
    let title = inputValues[1].value;
    let pages = inputValues[2].value;
    let bookStatus = status.value;
    console.log(bookStatus);
    const newBook = new Book(author, title, pages, bookStatus);
    addBooksToLibrary(newBook);

})

closeBtn.addEventListener('click',(e)=>{
    console.log('here');
    const userContainer = document.querySelector('.user-input-container');
    const formContainer = document.querySelector('.user-input');
    userContainer.style.display ='none';
    formContainer.style.display = 'none';
});

let trackIndex = 0;

const addBooksToLibrary = function(newBook) {
  libraryBooks[trackIndex] = newBook;
  trackIndex++;
}