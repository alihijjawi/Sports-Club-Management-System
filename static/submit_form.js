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
              return true;
          }
          else
          {
              logoutButton.style.display = "none";
              loginButton.style.display = loginDisplay;
              userLabel.innerHTML = "";
              userLabel.style.display = "none";
              return false;
          }
      } catch (err) {
          // The response wasn't a JSON object
          // Do your text handling here
      }
  }
  

var submitButton = document.getElementById("submit_button");
submitButton.addEventListener("click", submit);

function ValidateInput(input, name){
    if(!input.checkValidity()){
        alert("Please enter a valid " + name + "!");
        console.log("Invalid " + name + ".");
        return false;
    }
    return true;
}

function submit() {
    let company_name = document.getElementById("company_name");
    let point_of_contact = document.getElementById("point_of_contact");
    let billing_address = document.getElementById("billing_address");
    let phone_number = document.getElementById("phone_number");
    let email = document.getElementById("email");
    let website = document.getElementById("website");

    if (!ValidateInput(company_name, "company name")) return;
    if (!ValidateInput(point_of_contact, "point of contact")) return;
    if (!ValidateInput(billing_address, "billing address")) return;
    if (!ValidateInput(phone_number, "phone number")) return;
    if (!ValidateInput(email, "email")) return;
    if (!ValidateInput(website, "website")) return;

    const data = {
        "company_name": company_name.value,
        "point_of_contact": point_of_contact.value,
        "billing_address": billing_address.value,
        "phone_number": phone_number.value,
        "email": email.value,
        "website": website.value
    };
    fetch(`${SERVER_URL}/sponsorship`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}