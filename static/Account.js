var SERVER_URL = "http://127.0.0.1:5000";

var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    function logout() { window.location.href = "idlelogout" }
    function resetTimer() { clearTimeout(time); time = setTimeout(logout, 420000) }
};

window.onload = function () { inactivityTime(); }
var initialData;
var firstName = document.getElementById("fname");
var lastName = document.getElementById("lname");
var email = document.getElementById("email");
var userName = document.getElementById("username");
var password = document.getElementById("pwd");
var deleteButton = document.getElementById("delete-btn");
deleteButton.addEventListener('click', deleteFunct);
var submitButton = document.getElementById("submit-btn");
submitButton.addEventListener('click', submitChanges);
var changePasswordButton = document.getElementById("change-password");
changePasswordButton.addEventListener('click',changePass);
var btns = document.getElementsByName("edit");
const color = btns[0].style.backgroundColor; //color of original edit button
console.log(btns);
for (var i = 0; i < btns.length; i++) { //disable all input at initialization
    var currBtn = btns[i];
    var inputName = currBtn.id.split('-')[1];
    var input = document.getElementById(inputName);
    input.disabled = true;
    input.addEventListener('input', invalidInput);
}
var password = document.getElementById("new-password")
    , confirm_password = document.getElementById("confirm-password");

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}
changePasswordButton.disabled = true;
old_password = document.getElementById("old-password");
password.oninput = validatePassword;
confirm_password.oninput = validatePassword;
const passwordFields = ["old-password", "new-password", "confirm-password"];
for (var i = 0; i < passwordFields.length; i++) {
    var curr = document.getElementById(passwordFields[i]);
    curr.addEventListener('input', onChangePassword);
}
function onChangePassword() {
    for (var i = 0; i < passwordFields.length; i++) {
        var curr = document.getElementById(passwordFields[i]);
        if (!curr.reportValidity() || curr.value == "") {
            changePasswordButton.disabled = true;
            return;
        }
    }
    changePasswordButton.disabled = false;
}

function invalidInput(event) {
    var inputElem = event.target;
    var btnElem = document.getElementById("edit-" + inputElem.id);
    if (inputElem.reportValidity()) {
        btnElem.disabled = false;
    }
    else {
        btnElem.disabled = true;
    }
}
function enableSubmit() {
    const editBtns = document.getElementsByName("edit");
    for (var i = 0; i < editBtns.length; i++) {
        if (editBtns[i].innerHTML == "SAVE") {
            return;
        }
    }
    submitButton.disabled = false;
}
function changePass(){
    changePassword({"password":old_password.value, "new_password":password.value});
}
async function changePassword(data) {
    const response = await fetch(`${SERVER_URL}/changePassword`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const text = await response.text();
    const data1 = JSON.parse(text); // Try to parse it as JSON
    // The response was a JSON object
    // Do your JSON handling here
    alert(data1["message"]);
}
function changeButton(event) //change edit to save and vice versa on click
{
    var btn = event.target;
    var inputName = btn.id.split('-')[1];
    var input = document.getElementById(inputName);
    if (btn.innerHTML == "EDIT") {
        btn.innerHTML = "SAVE";
        input.disabled = false;
        submitButton.disabled = true;
    }
    else {
        btn.innerHTML = "EDIT";
        input.disabled = true;
        enableSubmit();
    }
}
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', changeButton);
}

checkLogin(`${SERVER_URL}/checkLogin`);
async function checkLogin(url) {
    const response = await fetch(url);
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        if (data1["found"]) {
            initialData = data1;
            isLogged = true;
            firstName.value = data1["first_name"];
            lastName.value = data1["last_name"];
            email.value = data1["email"];
            userName.value = data1["user_name"];
        }
        else {
            alert("Please login or register an account if you do not have one.");
            location.href = "login";
            isLogged = false;
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

function deleteFunct() {
    deleteUser();
    location.href = "/";
}

async function deleteUser() {
    const response = await fetch(`${SERVER_URL}/deleteUser`);
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        alert(data1["message"]);
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
async function updateUser(data) {
    const response = await fetch(`${SERVER_URL}/updateUser`, {
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
    }
}
async function checkUser(data) {
    var x = await checkUserName(data);
    return x;
}
async function checkUserEmail() {
    if (userName.value != initialData["user_name"]) {
        const userExists = await checkUserName({ "user_name": userName.value });
        if (userExists) {
            alert("This username is already associated with an account");
            return;
        }
    }
    if (email.value != initialData["email"]) {
        const emailExists = await checkEmail({ "email": email.value });
        if (emailExists) {
            alert("This email is already associated with an account");
            return;
        }
    }
    const newData = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "user_name": userName.value,
        "email": email.value
    };
    updateAccount(newData);
    alert("Changes to your account information have been saved.");

}
async function updateAccount(data) {
    const response = await fetch(`${SERVER_URL}/account`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
async function checkUserName(data) {
    const response = await fetch(`${SERVER_URL}/checkUserName`, {
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
        if (data1["found"]) {
            return true;
        }
        return false;
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
async function checkEmail(data) {
    const response = await fetch(`${SERVER_URL}/checkEmail`, {
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
        if (data1["found"]) {
            return true;
        }
        return false;
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
function change() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value == "") {
            alert("Fill in all details!");
            return;
        }
    }
    if (!firstName.checkValidity()) {
        alert("Enter a valid name without numbers or special characters.");
        return;
    }
    if (!lastName.checkValidity()) {
        alert("Enter a valid name without numbers or special characters.");
        return;
    }
    if (!userName.checkValidity()) {
        alert("Enter a valid username.");
        return;
    }
    if (!email.checkValidity()) {
        alert("Enter a valid email.");
        return;
    }
    const userData = {
        "user_name": userName.value,
        "email": email.value,
    };
    userDataFinal = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "user_name": userName.value,
        "email": email.value,
        "password": password.value
    };
    updateUser(userDataFinal);

}
function revert() {
    checkLogin(`${SERVER_URL}/checkLogin`);
}
function submitChanges() {
    console.log("CLICKED");
    const inputFields = ["fname", "lname", "email", "username"];
    for (let i = 0; i < inputFields.length; i++) {
        console.log("IN LOOP");
        var id = inputFields[i];
        var curr = document.getElementById(id);
        if (!curr.reportValidity()) return;
    }
    console.log("DONE LOOP");
    checkUserEmail();
}