var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", addUser);
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
function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) return true;
    return false;
}
function addUser() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let firstName = document.getElementById("fname");
    let lastName = document.getElementById("lname");
    let userName = document.getElementById("user_name")
    let dob = document.getElementById("dob");
    let email = document.getElementById("email")
    let password = document.getElementById("pwd")
    if (!ValidateEmail(email)) {
        errorMessage.innerHTML = "The email you entered is invalid!";
        return;
    }
    const data = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "user_name": userName.value,
        "email": email.value,
        "dob": dob.value,
        "password": password.value
    };
    fetch(`${SERVER_URL}/register`, {
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


