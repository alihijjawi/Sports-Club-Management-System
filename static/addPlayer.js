var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", addPlayer);
resetButton.addEventListener("click", resetInput);

var numbers = document.getElementsByName("num");
for (var i=0; i<numbers.length; i++) {
    numbers[i].addEventListener("change", validateInput);
}

function validateInput(event) {
    if (event.target.value < parseInt(event.target.min)) {
        event.target.value = parseInt(event.target.min);
        return;
    }
    if (event.target.value > parseInt(event.target.max)) {
        event.target.value = parseInt(event.target.max);
        return;
    }
    return;
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

function addPlayer() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let player_name = document.getElementById("player_name")
    let height = document.getElementById("height")
    let age = document.getElementById("age")
    let attack = document.getElementById("attack")
    let defense = document.getElementById("defense")
    let team_name = document.getElementById("team_name")

    const data = {
        "name": player_name.value,
        "height": height.value,
        "age": age.value,
        "attack": attack.value,
        "defense": defense.value,
        "team_name": team_name.value
    };
    myFetch(`${SERVER_URL}/postplayer`, data);
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
