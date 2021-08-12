let dataBase
let justdata

let likedList =[]

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
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addCard(this)">Add to Cart</button>
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
    const card = inf.parentElement.parentElement.parentElement
    card.classList.add('pickedB')

    let liked = dataBase.filter(data => data.title == card.querySelector('p').innerText )
    liked = liked[0]
    likedList.push(liked)
    loadLiked(likedList)    
}

// Hide book
function hideCard (inf){
    const card = inf.parentElement.parentElement.parentElement.parentElement.parentElement
    card.remove()
}

// LIKED LIST
// loading liked list
const likedBooks = document.getElementById('likedBooks')

function loadLiked(data){

    let rowLiked = document.getElementById('likedBooks')
    rowLiked.innerHTML =`
    <div class="col-12 text-center">
      <h2 h2>Your cart list</h2>
      <a href="#" class="btn btn-danger my-2" onclick="clearList()">Clear cart</a>
    </div>`
    data.forEach(book => {
      rowLiked.innerHTML += `
        <div class="col-md-4 my-2">
        <div class="card mb-4 shadow-sm h-100">
        <img src="${book.img}" alt="" style="height: 10rem;  object-fit: cover;">
          <div class="card-body">
            <p class="card-text">${book.title}</p>
            <div
              class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="deleteCart(this)">Delete</button>
              </div>
              <small class="text-muted">asin: ${book.asin}</small>
            </div>
          </div>
        </div>
      </div>
    `
    });
}

// showList Button
function showList(){ 
  likedBooks.classList.toggle('d-none')
}

// delete from cart

function deleteCart(inf){
  const card = inf.parentElement.parentElement.parentElement.parentElement.parentElement
  card.remove()

  let liked = likedList.filter(data => data.title == card.querySelector('p').innerText )
  liked = liked[0]

  console.log(liked)
  likedList.shift(liked)
}


function clearList(){
  likedList=[]
  showList()
  let clearDoc = document.getElementById('likedBooks')
  clearDoc.innerHTML = ''
  let uncheckStyle = document.querySelectorAll('.card-body')
  uncheckStyle.forEach(card =>  card.classList.remove('pickedB')
  )
}
