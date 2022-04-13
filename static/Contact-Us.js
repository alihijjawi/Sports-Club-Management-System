var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", subMessage);
var userLabel = document.getElementById("label");
var userDisplay = userLabel.style.display;
var message = document.getElementById("message");
var full_name = document.getElementById("name");
var email = document.getElementById("email");
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
            userLabel.innerHTML = "Signed in as " + data1["user_name"];
            full_name.value = data1["first_name"] + " " + data1["last_name"];
            email.value = data1["email"];
        }
        else
        {
            userLabel.style.display="none";
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
function handleResponse(data) {
    alert(data["message"]);
    return;
}
function subMessage() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            alert("Some details are missing! Please fill in all the fields.");
            return;
        }
    }
    if (message.value == "")
    {
        alert("Some details are missing! Please fill in all the fields.");
        return;
    }
    const data = {
        "name" : full_name.value,
        "email" : email.value,
        "message" : message.value
    };
    fetch(`${SERVER_URL}/contact`, {
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