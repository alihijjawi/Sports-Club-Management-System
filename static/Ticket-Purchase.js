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

var isLogged = false;
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("add-button");
var resetButton = document.getElementById("reset-button");
var quantity = document.getElementById("quantity");
var price = document.getElementById("price");
var phone = document.getElementById("number");
addButton.addEventListener("click", addUser);
quantity.addEventListener('change',updatePrice);
price.innerHTML = quantity.value * 10 + "$";
getMatches(`${SERVER_URL}/getMatches`);
var userLabel = document.getElementById("label");
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
            isLogged = true;
            console.log(isLogged);
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
async function getMatches(url) {
    const response = await fetch(url);
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        var select = document.getElementById("select");
        for (var i = 0; i < data1.length; i++) {
            var op = document.createElement("option");
            let curr = data1[i];
            op.text = curr["name"];
            op.value = curr["name"];
            select.appendChild(op);
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

async function checkPaymentMethod(url) {
    const response = await fetch(url);
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        if (data1["found"])
        {
            alert("Your ticket(s) have been purchased successfully! Check your SMS for your order number.")
        }
        else
        {
            alert("Please enter your payment information to continue.")
            location.href = "payment";
        }

    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

function updatePrice(){
    if (quantity.value < parseInt(quantity.min)) quantity.value = quantity.min;
    if (quantity.value > parseInt(quantity.max)) quantity.value = quantity.max;
    price.innerHTML = quantity.value * 10 + "$";
}
function resetInput() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    errorMessage.innerHTML = "";
    return;
}
function ValidatePhone(input){
    if (!input.checkValidity())
    {
        alert(input.title);
        return false;
    }
    return true;
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
    if (!ValidatePhone(phone)) return;
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            alert("Some details are missing! Please fill in all the fields.");
            return;
        }
    }
    if (!isLogged){
        alert("You cannot purchase tickets if you are not logged in.\nPlease login or register if you do not have an account.");
        location.href = "login";
        return;
    }
    checkPaymentMethod(`${SERVER_URL}/checkPayment`);
}


