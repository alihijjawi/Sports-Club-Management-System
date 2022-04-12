var SERVER_URL = "http://127.0.0.1:5000";

var submitButton = document.getElementById("submit_button");
submitButton.addEventListener("click", submit);


function submit() {
    let company_name = document.getElementById("company_name")
    let point_of_contact = document.getElementById("point_of_contact")
    let billing_address = document.getElementById("billing_address")
    let phone_number = document.getElementById("phone_number")
    let email = document.getElementById("email")
    let website = document.getElementById("website")

    const data = {
        "company_name": company_name.value,
        "point_of_contact": point_of_contact.value,
        "billing_address": billing_address.value,
        "phone_number": phone_number.value,
        "email": email.value,
        "website": website.value
    };
    fetch(`${SERVER_URL}/submit`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}