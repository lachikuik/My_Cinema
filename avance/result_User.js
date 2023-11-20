let target = document.getElementById("result");
let submit = document.getElementById("submit");
let nbResults = 0;

submit.onclick = function(){

    let rFirstName = "";
    let rName = "";

    rName = document.getElementById("name").value;
    rFirstName = document.getElementById("firstname").value;

    if ((document.getElementById("firstname").value)!= ""){
        rFirstName = "firstname=" + rFirstName;
    }
    if ((document.getElementById("name").value )!= ""){
        rName = "name=" +rName;
    }

    fetchData(`http://localhost/showTableUser.php?${rName}&${rFirstName}`);
}

fetchData('http://localhost/showTableUser.php');

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
            <th>Name</th>
            <th>FirstName</th>
            <th>Email</th>
            <th>city</th> 
            <th>country</th>
            <th>abonnement</th>
            <th>page<th>
        </tr>
    </thead>`
 
    datas.forEach(function(data) {
        if ((data.subscription === null)){
            data.subscription = "Aucun"
        }
        html +=
            `<tr id="paginated-list">
                <td>${data.id}</td>
                <td>${data.lastname}</td>
                <td>${data.firstname}</td>
                <td>${data.email}</td>
                <td>${data.city}</td>
                <td>${data.country}</td>
                <td>${data.subscription}</td>
                <td><a href="my_cinema_user_page.html?idUser=${data.id}">détails</a></td>
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