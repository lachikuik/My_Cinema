let targetHistory = document.getElementById("resultHistory");
let nbResultHistory = 0;

const queryStringHistory = window.location.search;
const urlParamsHistory = new URLSearchParams(queryStringHistory);
const userIdHistory = urlParamsHistory.get('idUser');

fetchDataHistory(`http://localhost/showTableUserPageHistory.php?idUser=${userIdHistory}`);

function fetchDataHistory(url) {
    fetch(url)
    .then ((response) => response.json())
    .then (function(datas){
        nbResultsHistory = datas.title.length;
        initPaging(datas.title);
    });
}

function renderTableHistory(datas){
    let html=
    `<thead>
        <tr>
            <th>date</th>
            <th>movie</th>
            <th>room</th>
        </tr>
    </thead>`
    
    datas.forEach(function(data) {
        html +=
            `<tr id="paginated-list">
                <td>${data.date_begin}</td>
                <td>${data.title}</td>
                <td>${data.room}</td>   
            </tr>`
    });
    targetHistory.innerHTML = html;
}

//history

let History = document.getElementById("add_history");
let targetIdHistory = document.getElementById("movie_history");

function fetchdataSelect(url){
    fetch(url)
    .then ((response) => response.json())
    .then (function(datas){
        renderSelect(datas.title)
    });
}

function renderSelect(datas) {
    datas.forEach(function(data){
        targetIdHistory.innerHTML += `<option value="${data.id}">${data.projection}${data.title}</option>`;
    });
}

fetchdataSelect("http://localhost/showSelectHistory.php");

History.onclick = function () {
    if (add === true){
        fetch ("http://localhost/addHistory.php", {
            method: 'POST',
            body: JSON.stringify({
                idUser : parseInt(userId),
                idSession: parseInt(document.getElementById("movie_history").value),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(){ 
            fetchDataHistory(`http://localhost/showTableUserPageHistory.php?idUser=${userIdHistory}`);


        })
        .catch(error => console.error('Error:', error)); 
    };

}