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
var date = document.getElementById("dob");
var maxDate = new Date(); //Date 13 years ago
maxDate.setFullYear(maxDate.getFullYear()-13);
var minDate = new Date();//Date 99 years ago
minDate.setFullYear(minDate.getFullYear()-99);
date.setAttribute('min',minDate.toISOString().split('T')[0]);
date.setAttribute('max',maxDate.toISOString().split('T')[0]);

var loginButton = document.getElementById("login-button");
var logoutButton = document.getElementById("logout-button");
var loginDisplay = loginButton.style.display;
var logoutDisplay = logoutButton.style.display;
var userLabel = document.getElementById("label");
var userDisplay = userLabel.style.display;
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

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addUser);
function handleResponse(response) {
    text = response.text();
    try {
        const data = JSON.parse(text); // Try to parse the response as JSON
        // The response was a JSON object
        // Do your JSON handling here
        alert(data["message"]);
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
        alert(data1["message"]);
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
        location.href = "/";
        alert("Your account has been successfully created.\nWelcome to the official site of Panthers Sports Club!");
    }
}
function addUser() {
    let inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (!input.checkValidity()) return;
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


