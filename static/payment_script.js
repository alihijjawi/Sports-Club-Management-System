var SERVER_URL = "http://127.0.0.1:5000";
var errorMessage = document.getElementById("error-message");
var addButton = document.getElementById("save-button");
//var resetButton = document.getElementById("reset-button");
addButton.addEventListener("click", add);
//resetButton.addEventListener("click", resetInput);
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

function add() {
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            errorMessage.innerHTML = "Some details are missing! Please fill in all the fields.";
            return;
        }
    }
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


