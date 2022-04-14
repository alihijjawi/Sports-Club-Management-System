var SERVER_URL = "http://127.0.0.1:5000";
var coachButton = document.getElementById("coach-button");
var playerButton = document.getElementById("player-button");
var deleteCoachButton = document.getElementById("delete-coach-button");
var deletePlayerButton = document.getElementById("delete-player-button");
var updatePlayerButton = document.getElementById("update-player-button");
var updateCoachButton = document.getElementById("update-coach-button");
coachButton.addEventListener("click", addCoach);
playerButton.addEventListener("click", addPlayer);
deleteCoachButton.addEventListener("click", deleteCoach);
deletePlayerButton.addEventListener("click", deletePlayer);
updatePlayerButton.addEventListener("click", updatePlayer);
updateCoachButton.addEventListener("click", updateCoach);

function addCoach() {
    fetch(`${SERVER_URL}/postcoach`, {
        method: 'GET',
        mode: 'cors'
    })
}

function addPlayer() {
    fetch(`${SERVER_URL}/postplayer`, {
        method: 'GET',
        mode: 'cors'  
    })
}

function deleteCoach() {
    fetch(`${SERVER_URL}/deletecoach`, {
        method: 'GET',
        mode: 'cors'
    })
}

function deletePlayer() {
    fetch(`${SERVER_URL}/deleteplayer`, {
        method: 'GET',
        mode: 'cors'  
    })
}

function updateCoach() {
    fetch(`${SERVER_URL}/updatecoach`, {
        method: 'GET',
        mode: 'cors'
    })
}

function updatePlayer() {
    fetch(`${SERVER_URL}/updateplayer`, {
        method: 'GET',
        mode: 'cors'  
    })
}