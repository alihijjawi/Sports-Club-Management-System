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

var firstName = document.getElementById("fname");
var lastName = document.getElementById("lname");
var email = document.getElementById("email");
var userName = document.getElementById("username");
var password = document.getElementById("pwd");
var deleteButton = document.getElementById("delete-btn");
deleteButton.addEventListener('click',deleteFunct);
var btns = document.getElementsByName("edit");
const color = btns[0].style.backgroundColor; //color of original edit button
console.log(btns);
for (var i=0;i<btns.length;i++){ //disable all input at initialization
    var currBtn = btns[i];
    var inputName = currBtn.id.split('-')[1];
    var input = document.getElementById(inputName);
    input.disabled = true;
    input.addEventListener('input',invalidInput);
}
function invalidInput(event){
    var inputElem = event.target;
    console.log(inputElem.id);
    var btnElem = document.getElementById("edit-"+inputElem.id);
    if (inputElem.reportValidity()){
        btnElem.disabled = false;
    }
    else{
        btnElem.disabled = true;
    }
}
function changeButton(event) //change edit to save and vice versa on click
{
    var btn = event.target;
    var inputName = btn.id.split('-')[1];
    var input = document.getElementById(inputName);
    if (btn.innerHTML == "EDIT") {
        btn.innerHTML = "SAVE";
        input.disabled=false;
    }
    else {
        btn.innerHTML = "EDIT";
        input.disabled=true;
    }
}
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click',changeButton);
}

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
            isLogged = true;
            firstName.value = data1["first_name"];
            lastName.value = data1["last_name"];
            email.value = data1["email"];
            userName.value = data1["user_name"];
            password.value = data1["password"];
        }
        else
        {
            alert("Please login or register an account if you do not have one.");
            location.href = "login";
            isLogged = false;
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

function deleteFunct(){
    deleteUser();
    location.href = "/";
}
async function logoutUser(){
    const response = await fetch(`${SERVER_URL}/deleteUser`);
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        alert(data1["message"]);
        location.href = "/";
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
async function deleteUser(){
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
        if (data1["found"]){
            alert("This username is already associated with an account");
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
        if (data1["found"]){
            alert("This email is already associated with an account");
            return false;
        }
        return true;
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
function change(){
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        if(inputFields[i].value ==""){
            alert("Fill in all details!");
            return;
        }
    }
    if (!firstName.checkValidity()){
        alert("Enter a valid name without numbers or special characters.");
        return;
    }
    if (!lastName.checkValidity()){
        alert("Enter a valid name without numbers or special characters.");
        return;
    }
    if (!userName.checkValidity()){
        alert("Enter a valid username.");
        return;
    }
    if (!email.checkValidity()){
        alert("Enter a valid email.");
        return;
    }
    const userData = {
        "user_name" : userName.value,
        "email": email.value,
    };
    userDataFinal ={
        "first_name" : firstName.value,
        "last_name" : lastName.value,
        "user_name" : userName.value,
        "email" : email.value,
        "password" : password.value
    };
    updateUser(userDataFinal);

}
function revert(){
    checkLogin(`${SERVER_URL}/checkLogin`);
}
