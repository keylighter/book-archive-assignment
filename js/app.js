
// getting the id from html 
const searchResult = document.getElementById('books-result');
const searchField = document.getElementById('search-field');
const errorMessage = document.getElementById('error-message');
const resultNumbers = document.getElementById('result-numbers');
const spinner = document.getElementById("spinner");

// searching books
const searchBook = () => {
    const searchText = searchField.value;
    // evacuation of values 
    searchField.value = '';
    searchResult.textContent = '';
    if (searchText === '') {
        errorMessage.innerText = 'Please give some book names.';
        resultNumbers.textContent = '';
        return;
    }


    // fetching data from search text 
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            spinner.classList.add("d-none");

            displaySearchResult(data)
        }


        );
}

// displaying search result 

const displaySearchResult = books => {

    // result numbers
    resultNumbers.innerHTML = `<h3 class="text-center">There are  ${books.numFound} books available for you. </h3>`;


    // error handling 
    if (books.numFound === 0) {
        errorMessage.innerText = 'No Result Found';
        resultNumbers.textContent = '';
    }
    else {
        errorMessage.innerText = '';
    }
    //looping the arrays of books data
    books.docs.forEach(book => {

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('col');

        bookDiv.innerHTML = `
        
        <div class=" card mx-3" style="width: 18rem;">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid "
            alt="...">
        <div class="card-body">
            <h5 class="card-title">Book Name: ${book.title} </h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Author Name: ${book.author_name}</li>
            <li class="list-group-item">Publish Date: ${book.first_publish_year} </li>
            <li class="list-group-item">Publisher: ${book.publisher.slice(0, 5)} </li>
        </ul>

    </div>
        `;
        // appending the bookDiv to the html tag
        searchResult.appendChild(bookDiv);

    })
}

//------------------ end of code------------------ //