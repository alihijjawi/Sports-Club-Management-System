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
var addButton = document.getElementById("event-button");
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
                addButton.disabled = true;
                deleteButton.disabled = true;
                updateButton.disabled = true;
            }
        }
        else
        {
            logoutButton.style.display = "none";
            loginButton.style.display = loginDisplay;
            userLabel.innerHTML = "";
            userLabel.style.display = "none";
            addButton.disabled = true;
            deleteButton.disabled = true;
            updateButton.disabled = true;
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}



addButton.addEventListener("click", addEvent);
updateButton.addEventListener("click", updateEvent);
deleteButton.addEventListener("click", deleteEvent);
console.log(data1["privilege"]);
if (data1["privilege"] == "0"){
    addButton.disabled = true;
}
function addEvent() {
    fetch(`${SERVER_URL}/postevents`, {
        method: 'GET',
        mode: 'cors'
    })
}

function deleteEvent() {
    fetch(`${SERVER_URL}/deleteevent`, {
        method: 'GET',
        mode: 'cors'  
    })
}

function updateEvent() {
    fetch(`${SERVER_URL}/updateevent`, {
        method: 'GET',
        mode: 'cors'  
    })
}