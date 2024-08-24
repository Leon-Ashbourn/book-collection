const inputSubmit = document.querySelector('#submit-input');
const closeBtn = document.querySelector('#close-popup');
let trackIndex = -1;
const libraryBooks = [];

function Book(author='-', title='-', pages='0', bookStatus='hold') {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.bookStatus = bookStatus;
}

Book.prototype.index = 0;

const html = document.querySelector('html');
inputSubmit.addEventListener('click', (event)=>{
    event.preventDefault();

    const inputValues = document.querySelectorAll('form>div>input');
    const status = document.querySelector(".status>div> input[type='radio']:checked");

    let author = inputValues[0].value;
    let title = inputValues[1].value;
    let pages = inputValues[2].value;
    let bookStatus = "-";
    if(!(status === null)){
      bookStatus = status.value;
    }

    const newBook = new Book(author, title, pages, bookStatus);

    addBooksToLibrary(newBook);

    const eraser= function(){
      for(let value of inputValues){
        value.value = '';
      }
      inputValues[3].value = 'Confirm';
      if(!(status === null)){
        status.checked = false;
      }
    }

    // formReset();

    eraser();
    displayBooks();
    buttonColor();
    hideElements();
})

// function formReset(){
//   const resetBtn = document.createElement('input');
//   resetBtn.type = 'reset';
//   resetBtn.style = 'display: none';
//   inputSubmit.parentNode.insertBefore(resetBtn, inputSubmit);
//   const resetEvent = new MouseEvent('click', {
//     view: windows,
//     bubbles: true,
//     cancelable: true,
//   })
// }

function hideElements(){
  const userContainer = document.querySelector('.user-input-container');
  const formContainer = document.querySelector('.user-input');
  userContainer.style.display ='none';
  formContainer.style.display = 'none';
}

closeBtn.addEventListener('click',(e)=>{
    hideElements();
    buttonColor();
});



const addBooksToLibrary = function(newBook) {
  trackIndex++;
  libraryBooks[trackIndex] = newBook;  
}

const bookShelf = document.querySelector('.book-shelf');

function displayBooks(){
  bookShelf.textContent = '';
  for( const property in libraryBooks){
    const child = document.createElement('div');
    
    for(const [key,value] of Object.entries(libraryBooks[property])){
      const subChild = document.createElement('p');
      subChild.textContent = `${key}: ${value}`
      child.appendChild(subChild);
    }
    const selfButton = document.createElement('button');
    selfButton.setAttribute('data',`${property}`);
    const readButton = document.createElement('button');
    readButton.setAttribute('data',`${property}`);

    selfButton.textContent = "Delete";
    readButton.textContent = "Mark status";

    child.appendChild(readButton);
    child.appendChild(selfButton);
    bookShelf.appendChild(child);
  }
}

const addBookBtn = document.querySelector('.button> button');

const buttonColor = function(){
  const color = addBookBtn.id;
  if(color === 'new-book-black'){
    addBookBtn.id = "new-book-white"
  }else {
    addBookBtn.id = "new-book-black";
  }
}

addBookBtn.addEventListener('click', ()=>{
  buttonColor();
  const userContainer = document.querySelector('.user-input-container');
  const formContainer = document.querySelector('.user-input');
  userContainer.style.display ='block';
  formContainer.style.display = 'block';
})

const deleteBook = document.querySelector('.book-shelf');

deleteBook.addEventListener('click', (event)=>{
  const eventVal = event.target.getAttribute('data');
  if(isNaN(Number(eventVal)) || eventVal === null){
    return;
  }else{
    updateArray(Number(eventVal), event.target);
  }
})


function updateArray(index, eventTarget){
  if(eventTarget.textContent === 'Mark status'){
    toggleReadStatus(index);
  }else{
    libraryBooks.splice(index,1);
    displayBooks();
  }
}

function toggleReadStatus(index){
  libraryBooks[index].bookStatus === 'Completed' ? libraryBooks[index].bookStatus = 'Hold' : 
                  libraryBooks[index].bookStatus = 'Completed';

  displayBooks();

}