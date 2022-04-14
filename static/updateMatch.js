var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var updateButton = document.getElementById("update-button");
var backButton = document.getElementById("back-button");
backButton.addEventListener("click", back);
updateButton.addEventListener("click", updateMatch);

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


function updateMatch() {
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

    myFetch(`${SERVER_URL}/updatematch`, data);
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

function back() {
    fetch(`${SERVER_URL}/getmatches`, {
        method: 'GET',
        mode: 'cors'
    })
}