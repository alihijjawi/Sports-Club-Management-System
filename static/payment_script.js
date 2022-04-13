var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("save-button");
//var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", add);
//resetButton.addEventListener("click", resetInput);

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

function ValidateName(input){
    if (!input.checkValidity()){
        alert("Please enter a valid Full Name!");
        console.log("Here 1")
        return false;
    }
    console.log("Here 2")
    return true;
}

function ValidateEmail(input){
    if (!input.checkValidity()){
        alert("Please enter a valid Email!");
        return false;
    }
    return true;
}



function ValidateZip(input){
    if (!input.checkValidity()){
        alert("Please enter a valid Zip Code!");
        return false;
    }
    return true;
}

function ValidateCardNum(input){
    if (!input.checkValidity()){
        alert("Please enter a valid Credit Card Number!")
        return false;

    }
    return true;
}

function ValidateMonth(input){
    const listmonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (!listmonths.includes(input.value)){
        alert("Please enter a valid Month!")
        return false;
    }
    return true;
}

function ValidateYear(input){
    year = parseInt(input.value, 10);
    if (year >= 2022 && year <= 2030){
        return true;
    }
    alert("Please enter a valid year")
    return false;
}

function ValidateCVV(input){
    if (!input.checkValidity()){
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
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
    
    
    const data = {
        "full_name": full_name.value,
        "email": email.value,
        "address": address.value,
        "city": city.value,
        "state":state.value,
        "zip_code": zip_code.value,
        "credit_card_name":card_name.value,
        "credit_card_number": card_num.value,
        "exp_year": exp_year.value,
        "exp_month": exp_month.value,
        "cvv" : cvv.value 
    };
    fetch(`${SERVER_URL}/save`, {
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
        console.log("success");

}


