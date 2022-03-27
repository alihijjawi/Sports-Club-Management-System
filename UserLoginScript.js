var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("login-button");
var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", authenticate);
resetButton.addEventListener("click", resetInput);
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

function authenticate() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let userName = document.getElementById("user_name")
    let password = document.getElementById("pwd")
    const data = {
        "user_name": userName.value,
        "password": password.value
    };
    fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => handleResponse(data))
        .catch((error) => {
            console.error('Error:', error);
        });

}


