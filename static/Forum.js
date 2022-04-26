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

var postdiv = document.getElementById("addpost")
var commentdiv = []
var i = 0
while(document.getElementById("addcomment"+i.toString)){
    commentdiv.push(document.getElementById("addcomment"+i.toString))
    commentdiv[i].style.display="none"
    i+=1
}
postdiv.style.display="none"

var sc = []
i = 0
while(document.getElementById("showcomment"+i.toString)){
    sc.push(document.getElementById("showcomment"+i.toString))
    sc[i].addEventListener("click", showComment)
    i+=1
}

function showComment(){
    if(userLabel.innerHTML != "") commentdiv.style.display="block";
    else{
        alert("You cannot add comments to the forum if you are not logged in to your account.\nPlease login or register if you do not have an account.");
        location.href = "login";
    }
}

var sp = document.getElementById("showpost")
sp.addEventListener("click", showPost)
function showPost(){
    if(userLabel.innerHTML != "") postdiv.style.display="block";
    else{
        alert("You cannot add posts to the forum if you are not logged in to your account.\nPlease login or register if you do not have an account.");
        location.href = "login";
    }
}

var ac = []
i = 0
while(document.getElementById("commentbutton"+i.toString)){
    ac.push(document.getElementById("commentbutton"+i.toString))
    ac[i].addEventListener("click", addComment)
    i+=1
}

function addComment(){
    var buttons = document.getElementsByTagName("a")
    var buttonsCount = buttons.length
    var id = ""
    for(let i=0; i<buttonsCount; i++)
        buttons[i].onclick = function(e){ id = this.id; }

    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            return;
        }
    }
    const data = {
        "title": document.getElementById("name-6797").value,
        "content": document.getElementById("message-6797").value,
        "parent":parseInt(id[13])
    };
    commentdiv.style.display="none"
    myFetch(`${SERVER_URL}/discussion`, data); 
}

var ap = document.getElementById("postbutton")
ap.addEventListener("click", addPost)
function addPost(){
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            return;
        }
    }
    const data = {
        "title": document.getElementById("name-6797").value,
        "content": document.getElementById("message-6797").value,
        "parent":0
    };
    postdiv.style.display="none"
    myFetch(`${SERVER_URL}/discussion`, data); 
}

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
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
        location.replace(text);
    }
}
