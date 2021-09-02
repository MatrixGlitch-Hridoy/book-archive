const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const booksDiv = document.getElementById("books");
const searchCount = document.getElementById("search-count");
const spinner = document.getElementById("spinner");

searchBtn.addEventListener("click", () => {
  const search = searchInput.value;
  // Clear
  booksDiv.innerHTML = "";
  searchCount.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("text-danger");
  if (search === "") {
    div.innerHTML = `<h5 class="text-center">Search field can not be empty</h5>`;
    return searchCount.appendChild(div);
  }
  loadUser(search);
});

//load data from api
const loadUser = (search) => {
  const url = `https://openlibrary.org/search.json?q=${search}`;
  searchInput.value = "";
  spinner.classList.remove("d-none");
  fetch(url)
    .then((res) => res.json())
    .then((data) => showResult(data));
};

//Show Result
const showResult = (bookDetails) => {
  const div = document.createElement("div");
  div.classList.add("text-danger");
  if (bookDetails.docs.length === 0) {
    div.innerHTML = `<h1 class="text-center">No result found</h1>`;
  } else {
    div.innerHTML = `<p class="fw-bolder">Showing ${bookDetails.docs.length} out of ${bookDetails.numFound} results</p>`;
  }
  searchCount.appendChild(div);
  appendData(bookDetails);
  spinner.classList.add("d-none");
};

//Append Data into frontend
const appendData = (bookDetails) => {
  bookDetails.docs.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-75" alt="..." />
    <div class="card-body">
      <h6 class="card-title text-danger">Book Name: <span class="text-primary">${book.title}</span></h6>
      <h6 class="card-title text-danger">Author Name: <span class="text-primary">${book.author_name?.[0]}</span></h6>
      <h6 class="card-title text-danger">First Published: <span class="text-primary">${book.first_publish_year}</span></h6>
      <h6 class="card-title text-danger">Publisher: <span class="text-primary">${book.publisher?.[0]}</span></h6>
    </div>
  </div>
    `;
    booksDiv.appendChild(div);
  });
};
