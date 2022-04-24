var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var updateButton = document.getElementById("update-button");
var resetButton = document.getElementById("reset-button");
updateButton.addEventListener("click", updateCoach);
resetButton.addEventListener("click", resetInput);

var numbers = document.getElementsByName("num");
for (var i=0; i<numbers.length; i++) {
    numbers[i].addEventListener("change", validateInput);
}

function validateInput(event) {
    if (event.target.value < parseInt(event.target.min)) {
        event.target.value = parseInt(event.target.min);
    }
    else if (event.target.value > parseInt(event.target.max)) {
        event.target.value = parseInt(event.target.max);
    }
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

function updateCoach() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let coach_name = document.getElementById("coach_name")
    let team_name = document.getElementById("team_name")
    let wins = document.getElementById("wins")
    let losses = document.getElementById("losses")

    const data = {
        "name": coach_name.value,
        "team_name": team_name.value,
        "wins": wins.value,
        "losses": losses.value
    };
    myFetch(`${SERVER_URL}/updatecoach`, data);
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