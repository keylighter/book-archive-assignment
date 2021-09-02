const searchResult = document.getElementById('books-result');
const searchField = document.getElementById('search-field');


// searching books
const searchBook = () => {
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=javascript`;

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.docs[0].author_name[0]))
}
searchBook();