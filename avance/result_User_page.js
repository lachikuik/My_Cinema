let target = document.getElementById("result");
let nbResults = 0;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('idUser');
let hasAbonnement;

fetchData(`http://localhost/showTableUserPage.php?idUser=${userId}`);

function fetchData(url) {
    fetch(url)
    .then ((response) => response.json())
    .then (function(datas){ 
        nbResults = datas.title.length;
        hasAbonnement = datas.title[0].subscription !== null;
        renderTable(datas.title);
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
            <th>update<th>
        </tr>
    </thead>`
 
    datas.forEach(function(data) {
        html +=
            `<tr>
                <td>${data.id}</td>
                <td>${data.lastname}</td>
                <td>${data.firstname}</td>
                <td>${data.email}</td>
                <td>${data.city}</td>
                <td>${data.country}</td>
                <td id="sub">${hasAbonnement ? data.subscription : "Aucun"}</td>
                <td><button onclick="popUp(${data.id},'${data.firstname}', '${data.lastname}')">modifier l'abonnement</button></td>
            </tr>`
    });
    target.innerHTML = html;
    initAbonnement();
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

    renderTableHistory(datasToDisplay);
    
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

//update

function initAbonnement() {
    if (hasAbonnement) {
        disableButton(CR);
        enableButton(U);
        enableButton(D);
    } else {
        disableButton(U);
        disableButton(D);
        enableButton(CR);
    }
}

let CR = document.getElementById("submitCR");
let U = document.getElementById("submitU");
let D = document.getElementById("submitD");
let targetFirst = document.getElementById("first");
let targetLast = document.getElementById("lastname");
let targetId = document.getElementById("user-id");
let add = false;


function popUp(id, first, lastname){
    targetId.innerHTML = id;
    targetFirst.innerHTML = first;
    targetLast.innerHTML = lastname;
    add = true;
}

submitCR.onclick = function () {
    if (add === true){
        fetch ("http://localhost/addsub.php", {
            method: 'POST',
            body: JSON.stringify({
                idUser: parseInt(targetId.innerHTML),
                idSubscription: parseInt(document.getElementById("abonnement").value),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(){ 
            fetchData(`http://localhost/showTableUserPage.php?idUser=${userId}`);

        })
        .catch(error => console.error('Error:', error)); 
    };

}

submitU.onclick = function () {
    if (add === true){
        fetch ("http://localhost/updateAbonnement.php", {
            method: 'POST',
            body: JSON.stringify({
                idUser: parseInt(targetId.innerHTML),
                idSubscription: parseInt(document.getElementById("abonnement").value),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(){ 
            fetchData(`http://localhost/showTableUserPage.php?idUser=${userId}`);
        })
        .catch(error => console.error('Error:', error));  
    };  
}

submitD.onclick = function () {
    if (add === true){
        fetch ("http://localhost/deleteAbonnement.php", {
            method: 'POST',
            body: JSON.stringify({
                idUser: parseInt(targetId.innerHTML),
                idSubscription: parseInt(document.getElementById("abonnement").value),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(){
            fetchData(`http://localhost/showTableUserPage.php?idUser=${userId}`);
        })
        .catch(error => console.error('Error:', error));  
    };
}

