let dataBase

window.onload = ()=>{


    download(dataBase)
}

// Fetching
function download(){
    fetch("https://striveschool-api.herokuapp.com/books")
    .then( response => response.json())
    .then(data => dataBase = data)
    .catch(err => alert(err))
}



// loading content
function loadBooks(data){
    let row = document.getElementById('content')
    row.innerHTML =``
    data.forEach(book => {
        row.innerHTML += `
        <div class="col-md-4 my-2">
        <div class="card mb-4 shadow-sm h-100">
        <img src="${book.img}" alt="" style="height: 10rem;  object-fit: cover;">
          <div class="card-body">
            <p class="card-text">${book.title}</p>
            <div
              class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addCard(this)">Add to Card</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="hideCard(this)">Skip</button>
              </div>
              <small class="text-muted">asin: ${book.asin}</small>
            </div>
          </div>
        </div>
      </div>
    `
    });
}

// load Button
function loadButn(){
  loadBooks(dataBase)
}

// search 
let justdata

function searchIt(info){
  info=info.toLowerCase()

  if (info.length > 0){
    justdata = dataBase.filter(data => data.title.toLowerCase().includes(info.toLowerCase))
    console.log(justdata)
    loadBooks(justdata)
  }
}
// add Book
function addCard(inf){
    const card = inf.parentElement.parentElement.parentElement.parentElement
    card.style.backgroundColor = 'rgb(187, 201, 212)'

}

// Hide book
function hideCard (inf){
    const card = inf.parentElement.parentElement.parentElement.parentElement.parentElement
    card.remove()
    }
