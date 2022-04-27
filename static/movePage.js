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
var addButton = document.getElementById("match-button");
var deleteButton = document.getElementById("delete-button");
var updateButton = document.getElementById("update-button");
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
            if (data1["privilege"] == "0"){
                addButton.style.visibility = "hidden";
            deleteButton.style.visibility = "hidden";
            updateButton.style.visibility = "hidden";
            }
        }
        else
        {
            logoutButton.style.display = "none";
            loginButton.style.display = loginDisplay;
            userLabel.innerHTML = "";
            userLabel.style.display = "none";
            addButton.style.visibility = "hidden";
            deleteButton.style.visibility = "hidden";
            updateButton.style.visibility = "hidden";
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}


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