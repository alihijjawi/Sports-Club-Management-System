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

var addButton = document.getElementById("save-button");
//var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", add);
//resetButton.addEventListener("click", resetInput);
returnPayment();
let full_name = document.getElementById("fname")
let email = document.getElementById("email")
let address = document.getElementById("adr")
let city = document.getElementById("city")
let state = document.getElementById("state")
let zip_code = document.getElementById("zip")
let card_name = document.getElementById("cname")
let card_num = document.getElementById("ccnum")
let exp_month = document.getElementById("expmonth")
let exp_year = document.getElementById("expyear")
let cvv = document.getElementById("cvv")

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
        if (data1["found"]) {
            logoutButton.style.display = logoutDisplay;
            loginButton.style.display = "none";
            userLabel.innerHTML = "Signed in as " + data1["user_name"];
            userLabel.style.display = userDisplay;
        }
        else {
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
async function returnPayment() {
    const response = await fetch(`${SERVER_URL}/returnPaymentInfo`,{
        method: 'GET',
        mode: 'cors',
    });
    const text = await response.text();
    try {
        const data1 = JSON.parse(text); // Try to parse it as JSON
        // The response was a JSON object
        // Do your JSON handling here
        var found = data1["found"];
        if (found) {
            console.log(data1);
            full_name.value = data1["full_name"];
            email.value = data1["email"];
            address.value = data1["address"];
            city.value = data1["city"];
            state.value = data1["state"];
            zip_code.value = data1["zip_code"];
            card_name.value = data1["name_on_card"];
            card_num.value = data1["credit_card_number"];
            exp_month.value = data1["exp_month"];
            exp_year.value = data1["exp_year"];
            cvv.value = data1["cvv"];
        }
        

    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
async function saveInfo(url, data) {
    const response = await fetch(url, {
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
        location.href = "/";

    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}
function resetInput() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    return;
}
function handleResponse(data) {
    alert(data["message"]);
    return;
}

function ValidateName(input) {
    if (!input.checkValidity()) {
        alert("Please enter a valid Full Name!");
        console.log("Here 1")
        return false;
    }
    console.log("Here 2")
    return true;
}

function ValidateEmail(input) {
    if (!input.checkValidity()) {
        alert("Please enter a valid Email!");
        return false;
    }
    return true;
}



function ValidateZip(input) {
    if (!input.checkValidity()) {
        alert("Please enter a valid Zip Code!");
        return false;
    }
    return true;
}

function ValidateCardNum(input) {
    if (!input.checkValidity()) {
        alert("Please enter a valid Credit Card Number!")
        return false;

    }
    return true;
}

function ValidateMonth(input) {
    const listmonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (!listmonths.includes(input.value)) {
        alert("Please enter a valid Month!")
        return false;
    }
    return true;
}

function ValidateYear(input) {
    year = parseInt(input.value, 10);
    if (year >= 2022 && year <= 2030) {
        return true;
    }
    alert("Please enter a valid year")
    return false;
}

function ValidateCVV(input) {
    if (!input.checkValidity()) {
        alert("Please enter a valid CVV")
        return false;
    }

    return true;
}
function add() {
    const inputFields = document.querySelectorAll("input");
    if (!ValidateName(full_name)) return;
    if (!ValidateEmail(email)) return;
    if (!ValidateName(city)) return;
    if (!ValidateZip(zip_code)) return;
    if (!ValidateName(card_name)) return;
    if (!ValidateCardNum(card_num)) return;
    if (!ValidateMonth(exp_month)) return;
    if (!ValidateYear(exp_year)) return;
    if (!ValidateCVV(cvv)) return;
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            alert("Some details are missing! Please fill in all the fields.");
            return;
        }
    }


    const data = {
        "full_name": full_name.value,
        "email": email.value,
        "address": address.value,
        "city": city.value,
        "state": state.value,
        "zip_code": zip_code.value,
        "credit_card_name": card_name.value,
        "credit_card_number": card_num.value,
        "exp_year": exp_year.value,
        "exp_month": exp_month.value,
        "cvv": cvv.value
    };
    saveInfo(`${SERVER_URL}/save`, data);
}


