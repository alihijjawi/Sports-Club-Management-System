var SERVER_URL = "http://127.0.0.1:5000";
var addButton = document.getElementById("match-button");
var deleteButton = document.getElementById("delete-button");
var updateButton = document.getElementById("update-button");
addButton.addEventListener("click", addMatch);
updateButton.addEventListener("click", updateMatch);
deleteButton.addEventListener("click", deleteMatch);

function addMatch() {
    fetch(`${SERVER_URL}/postmatches`, {
        method: 'GET',
        mode: 'cors'
    })
}

function deleteMatch() {
    fetch(`${SERVER_URL}/deletematch`, {
        method: 'GET',
        mode: 'cors'  
    })
}

function updateMatch() {
    fetch(`${SERVER_URL}/updatematch`, {
        method: 'GET',
        mode: 'cors'  
    })
}