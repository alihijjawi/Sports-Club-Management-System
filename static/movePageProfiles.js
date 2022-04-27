var SERVER_URL = "http://127.0.0.1:5000";

var inactivityTime = function () { 
    var time; 
    window.onload = resetTimer; 
    document.onmousemove = resetTimer; 
    document.onkeydown = resetTimer; 
    function logout() { window.location.href = "idlelogout" } 
    function resetTimer() { clearTimeout(time); time = setTimeout(logout, 420000) }
  };
  
window.onload = function() { inactivityTime(); }

var loginButton = document.getElementById("login-button");
var logoutButton = document.getElementById("logout-button");
var loginDisplay = loginButton.style.display;
var logoutDisplay = logoutButton.style.display;
var userLabel = document.getElementById("label");
var userDisplay = userLabel.style.display;
var coachButton = document.getElementById("coach-button");
var playerButton = document.getElementById("player-button");
var deleteCoachButton = document.getElementById("delete-coach-button");
var deletePlayerButton = document.getElementById("delete-player-button");
var updatePlayerButton = document.getElementById("update-player-button");
var updateCoachButton = document.getElementById("update-coach-button");

checkLogin(`${SERVER_URL}/checkLogin`);
async function checkLogin(url) {
    const response = await fetch(url);
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        if (data1["found"])
        {
            logoutButton.style.display = logoutDisplay;
            loginButton.style.display = "none";
            userLabel.innerHTML = "Signed in as " + data1["user_name"];
            userLabel.style.display = userDisplay;
            if (data1["privilege"] == "0") {
                coachButton.disabled = true;
                playerButton.disabled = true;
                deleteCoachButton.disabled = true;
                deletePlayerButton.disabled = true;
                updatePlayerButton.disabled = true;
                updateCoachButton.disabled = true;
            }
        }
        else
        {
            logoutButton.style.display = "none";
            loginButton.style.display = loginDisplay;
            userLabel.innerHTML = "";
            userLabel.style.display = "none";
            coachButton.disabled = true;
                playerButton.disabled = true;
                deleteCoachButton.disabled = true;
                deletePlayerButton.disabled = true;
                updatePlayerButton.disabled = true;
                updateCoachButton.disabled = true;
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}


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