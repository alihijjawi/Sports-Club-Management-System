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
var addButton = document.getElementById("add-button");
var quantity = document.getElementById("quantity");
var price = document.getElementById("price");
var phone = document.getElementById("number");
addButton.addEventListener("click", addUser);
quantity.addEventListener('change',updatePrice);
price.innerHTML = quantity.value * 10 + "$";
getMatches(`${SERVER_URL}/returnMatches`);

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
            isLogged = true;
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
            if (curr["timing"] < new Date().toISOString().split('T')[0]){
                continue;
            }
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
            alert("Please enter your payment information to continue.");
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


function addUser() {
    console.log("OK");
    let inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (!input.checkValidity()) {
            alert(input.title);
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


