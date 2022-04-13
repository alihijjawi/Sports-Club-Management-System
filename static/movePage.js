var SERVER_URL = "http://127.0.0.1:5000";
var coachButton = document.getElementById("coach-button");
var playerButton = document.getElementById("player-button");
coachButton.addEventListener("click", addCoach);
playerButton.addEventListener("click", addPlayer);


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