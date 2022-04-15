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
function handleResponse(response) {
    text = response.text();
    try {
        const data = JSON.parse(text); // Try to parse the response as JSON
        // The response was a JSON object
        // Do your JSON handling here
        errorMessage.innerHTML = data["message"];
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
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
        location.href = text;
        alert("Your account has been successfully created! Please login using your new credentials.");
    }
}
function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) return true;
    return false;
}
function updatePage(content) {
    document.getElementById("FullPage").innerHTML = content.text();
}
function addUser() {
    let inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    let firstName = document.getElementById("fname");
    console.log(firstName);
    let lastName = document.getElementById("lname"); console.log(lastName);
    let userName = document.getElementById("user_name"); console.log(userName);
    let dob = document.getElementById("dob"); console.log(dob);
    let email = document.getElementById("email"); console.log(email);
    let password = document.getElementById("pwd"); console.log(password);
    const data = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "user_name": userName.value,
        "email": email.value,
        "dob": dob.value,
        "password": password.value
    };
    myFetch(`${SERVER_URL}/register`, data);

}


