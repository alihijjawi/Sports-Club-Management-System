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
        }
        else
        {
            logoutButton.style.display = "none";
            loginButton.style.display = loginDisplay;
            userLabel.innerHTML = "";
            userLabel.style.display = "none";
            alert("You cannot reserve courts if you are not logged in.\nPlease login or register if you do not have an account.");
            location.href = "login";
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

var date = document.getElementById("date"); //date var
var today = new Date().toISOString().split('T')[0];
var yearFromNow = new Date();
yearFromNow.setFullYear(yearFromNow.getFullYear()+1);
date.setAttribute('min', today);//code to restrict past date selections when reserving
date.setAttribute('max',yearFromNow.toISOString().split('T')[0]); //max date is a year from now
document.getElementById("date").value = today;//code to let the date be today by default
var btns = document.getElementsByName("select-btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", selectButton);
}
document.getElementById("reserve-btn").addEventListener("click", addReservation);
document.getElementById("select").addEventListener('change', loadTable);
document.getElementById("date").addEventListener('change', loadTable);
var select = document.getElementById("select") //select var
const color = btns[0].style.backgroundColor; //color of original select button
loadTable();

function selectButton(event) //change select to cancel and vice versa on click
{
    var btn = event.target;
    if (btn.innerHTML == "SELECT") {
        btn.style.backgroundColor = "red";
        btn.innerHTML = "CANCEL";
    }
    else {
        btn.style.backgroundColor = color;
        btn.innerHTML = "SELECT";
    }
}
function resetTable() {
    var btns = document.getElementsByName("select-btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.backgroundColor = color;
        btns[i].innerHTML = "SELECT";
        btns[i].disabled = false;
        document.getElementById(btns[i].id + "-name").innerHTML = "";
    }
}
function addReservation() {
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
            console.log(data1);
            for (var i = 0; i < data1.length; i++) {
                let curr = data1[i];
                let time = curr["time"];//name of select button corresponding to a time
                let name_id = time + "-name"; //name of td element in table under Reserved Name
                document.getElementById(name_id).innerHTML = curr["name"];
                document.getElementById(time).disabled = true;
                document.getElementById(time).style.backgroundColor = color;
                document.getElementById(time).innerHTML = "SELECT";
            }
        } catch (err) {
            // The response wasn't a JSON object
            // Do your text handling here
        }
    }
    const inputFields = document.querySelectorAll("input");
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var number = document.getElementById("number");
    for (var i=0;i<inputFields.length;i++){
        if (!inputFields[i].checkValidity()){
            return;
        }
    }
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var number = document.getElementById("number");
    var court = select.value;
    var date1 = date.value;
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].innerHTML == "CANCEL") // this means button has been selected
        {
            const data = {
                "name": name.value,
                "email": email.value,
                "number": number.value,
                "date": date1,
                "court": court,
                "time": btns[i].id
            };
            myFetch(`${SERVER_URL}/reserve`, data);
        }
    }
}

function loadTable() {
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
            for (var i = 0; i < data1.length; i++) {
                let curr = data1[i];
                let time = curr["time"];//name of select button corresponding to a time
                let name_id = time + "-name"; //name of td element in table under Reserved Name
                document.getElementById(name_id).innerHTML = curr["name"];
                document.getElementById(time).disabled = true;
            }
        } catch (err) {
            // The response wasn't a JSON object
            // Do your text handling here
        }
    }
    resetTable();
    const data = {
        "date": date.value,
        "court": select.value
    };
    myFetch(`${SERVER_URL}/updateReserve`, data)

}