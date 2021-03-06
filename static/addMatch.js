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

var date = document.getElementById("timing"); //date var
var today = new Date().toISOString().split('T')[0];
var yearFromNow = new Date();
yearFromNow.setFullYear(yearFromNow.getFullYear()+1);
date.setAttribute('min', today);//code to restrict past date selections when reserving
date.setAttribute('max',yearFromNow.toISOString().split('T')[0]); //max date is a year from now
document.getElementById("timing").value = today;//code to let the date be today by default

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
        }
        else
        {
            logoutButton.style.display = "none";
            loginButton.style.display = loginDisplay;
            userLabel.innerHTML = "";
            userLabel.style.display = "none";
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", addMatch);
resetButton.addEventListener("click", resetInput);

function ValidateName(input){
    if (!input.checkValidity()){
        alert("Please enter a valid Input!");
        console.log("invalid")
        return false;
    }
    console.log("valid")
    return true;
}

function resetInput() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    errorMessage.innerHTML = "";
    return;
}
function handleResponse(data) {
    errorMessage.innerHTML = data["message"];
    return;
}

function addMatch() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let game_name = document.getElementById("game_name")
    let team1_name = document.getElementById("team1_name")
    let team2_name = document.getElementById("team2_name")
    let timing = document.getElementById("timing")

    if (!ValidateName(game_name)) return;
    if (!ValidateName(team1_name)) return;
    if (!ValidateName(team2_name)) return;
    if (!ValidateName(timing)) return;

    const data = {
        "name": game_name.value,
        "timing": timing.value,
        "team_1_id": team1_name.value,
        "team_2_id": team2_name.value
    };
    myFetch(`${SERVER_URL}/postmatches`, data);
}

async function myFetch(myRequest, data) {
    const response = await fetch(myRequest, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        errorMessage.innerHTML = data1["message"];
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
        location.replace(text);
    }
}
