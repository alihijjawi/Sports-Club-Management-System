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
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

var postdiv = document.getElementById("addpost")
var commentdiv = document.getElementById("addcomment")
postdiv.style.display="none"
commentdiv.style.display="none"

var sc = document.getElementById("showcomment")
sc.addEventListener("click", showComment)
function showComment(){
    commentdiv.style.display="block"
}

var sp = document.getElementById("showpost")
sp.addEventListener("click", showPost)
function showPost(){
    postdiv.style.display="block"
}

var ac = document.getElementById("commentbutton")
ac.addEventListener("click", addComment)
function addComment(){
    commentdiv.style.display="none"
}

var ac = document.getElementById("postbutton")
ac.addEventListener("click", addPost)
function addPost(){
    postdiv.style.display="none"
}