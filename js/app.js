const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const booksDiv = document.getElementById('books');
const searchCount = document.getElementById('search-count');
const spinner = document.getElementById('spinner');

searchBtn.addEventListener('click',function(){
    const search = searchInput.value;
  // Clear
    booksDiv.innerHTML = '';
    searchCount.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('text-danger');
    if(search==='')
    {
      div.innerHTML=`
        <h5 class="text-center">Search field can not be empty</h5>
    `;
      return searchCount.appendChild(div);
    }
    
    const url = `https://openlibrary.org/search.json?q=${search}`;
    searchInput.value = "";
    spinner.classList.remove('d-none');
    fetch(url)
    .then(res=> res.json())
    .then(data => showData(data));
})

//Show Fetch Data
const showData = (bookDetails)=>{
    // console.log(bookDetails);
    const div = document.createElement('div');
    div.classList.add('text-danger');
    if(bookDetails.docs.length===0)
    {
      div.innerHTML=`<h1 class="text-center">No result found</h1>`;
    }
    else{
      div.innerHTML=`<p>Showing ${bookDetails.docs.length} out of ${bookDetails.numFound} results</p>`;
    }
    searchCount.appendChild(div);
    bookDetails.docs.forEach((book)=>{
        // console.log(book);
        // console.log(book.cover_i);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-50" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Book Title: ${book.title}</h5>
          <h5 class="card-title">Author Name: ${book.author_name}</h5>
          <h5 class="card-title">First Publish: ${book.first_publish_year}</h5>
          <h5 class="card-title">Publisher: ${book.publisher}</h5>
        </div>
      </div>
        `;
        booksDiv.appendChild(div);
    });
    spinner.classList.add('d-none');
}