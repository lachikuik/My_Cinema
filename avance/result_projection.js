let target = document.getElementById("result");
let submit = document.getElementById("submit");
let nbResults = 0;

submit.onclick = function(){

    let rDate = "";
    let rName = "";

    rName = document.getElementById("name").value;
    rDate = document.getElementById("projection").value;

    if ((document.getElementById("projection").value)!= ""){
        rDate = "projection=" + rDate;
    }
    if ((document.getElementById("name").value )!= ""){
        rName = "name=" +rName;
    }

    fetchData(`http://localhost/showTableProjection.php?${rName}&${rDate}`);
}

fetchData('http://localhost/showTableProjection.php');

function fetchData(url) {
    fetch(url)
    .then ((response) => response.json())
    .then (function(datas){ 
        nbResults = datas.title.length;
        initPaging(datas.title);
    });
}

const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const paginationLimit = 15;

let pageCount = 1;
let currentPage = 1;
let allDatas = [];

function renderTable(datas){
    let html=
    `<thead>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Room</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Seats</th>
            <th>Add</th>
        </tr>
    </thead>`
 
    datas.forEach(function(data) {
        html +=
            `<tr id="paginated-list">
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.duration}</td>
                <td>${data.room}</td>
                <td>${data.projection}</td>
                <td>${data.rating}</td>
                <td>${data.seats}</td>
                <td><button onclick="popUp(${data.id},'${data.title.replace(/["']/,"")}')">add projection</button></td>
            </tr>`
    });
    target.innerHTML = html;
}   

function disableButton(button) {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
}

function enableButton(button) {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
}

function handlePageButtonsStatus() {

    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }
    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
}

function handleActivePageNumber() {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex === currentPage) {
            button.classList.add("active");
        }
    });
}

function setCurrentPage(pageNum) {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;
    const datasToDisplay = allDatas.filter((item, index) => {
        return index >= prevRange && index < currRange;
    })

    renderTable(datasToDisplay);
}

function appendPageNumber(index) {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);
    pageNumber.onclick = function () {setCurrentPage(index)};
    paginationNumbers.appendChild(pageNumber);
}

function createPaginationNumbers(nbResults) {
    paginationNumbers.innerHTML = "";
    for (let i = 1; i <= nbResults; i++) {
        appendPageNumber(i);
    }
}


function initPaging(datas) {
    allDatas = datas;
    pageCount = Math.ceil(datas.length / paginationLimit);
    createPaginationNumbers(pageCount);
    setCurrentPage(1);
}


prevButton.onclick = () => {
    setCurrentPage(currentPage - 1);
}

nextButton.onclick = () => {
    setCurrentPage(currentPage + 1);
}

//début des test  add projection

let targetAdd = document.getElementById("movie-name");
let targetId = document.getElementById("movie-id");
let add = false;
let submitM = document.getElementById("submitM");
function popUp(id, idFilm){
    targetId.innerHTML = id;
    targetAdd.innerHTML = idFilm;
    add = true;
}

submitM.onclick = function () {
    if (add === true){
        fetch ("http://localhost/addProjection.php", {
            method: 'POST',
            body: JSON.stringify({
                id: parseInt(targetId.innerHTML),
                date: document.getElementById("addproj").value.replace('T', ' '),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(response){ 
            return response.json()})
        .then(function(data)
        {console.log(data)
        }).catch(error => console.error('Error:', error)); 
    };
}