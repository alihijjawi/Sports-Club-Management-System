var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", subMessage);

function handleResponse(data) {
    errorMessage.innerHTML = data["message"];
    return;
}
function subMessage() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    const data = {
        "name" : name.value,
        "email" : email.value,
        "message" : message.value
    };
    fetch(`${SERVER_URL}/report`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => handleResponse(data));
}