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
  
var del=[]
var i = 0
while(document.getElementById("del"+i.toString())){
    del.push(document.getElementById("del"+i.toString()))
    del[i].addEventListener("click", deletePost)
    i+=1;
}
function deletePost(){
    var buttons = document.getElementsByTagName("button")
    var buttonsCount = buttons.length
    var delid = 0
    for(let i=0; i<buttonsCount; i++)
        buttons[i].onclick = function(e){ delid = i; }

    myFetch(`${SERVER_URL}/deletereview`, {"id":delid}, 'POST')
}

async function myFetch(myRequest, data, type) {
    if(type=='POST'){
        await fetch(myRequest, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    else{
        await fetch(myRequest, {
            method: 'GET',
            mode: 'cors'
        }).then(
            response=>response.text()
        ).then(
            document.write(response)
        )
    }
}

var sr = document.getElementById("showreview")
sr.style.display="none"

var ar = document.getElementById("addreview")
var pr = document.getElementById("postreview")
ar.addEventListener("click", addReview)
pr.addEventListener("click", postReview)

function addReview(){
    if(userLabel.innerHTML != "") sr.style.display="block";
    else{
        alert("You cannot add posts to the forum if you are not logged in to your account.\nPlease login or register if you do not have an account.");
        location.href = "login";
    }
}

function postReview(){
    sr.style.display="none"  
    const inputFields = document.querySelectorAll("input");
    for (let i = 0; i < inputFields.length; i++) {
        let input = inputFields[i];
        if (input.value.length == 0) {
            return;
        }
    }
    const data = {
        "title": document.getElementById("name-6797").value,
        "content": document.getElementById("message-6797").value
    };
    myFetch(`${SERVER_URL}/postreviews`, data, 'POST'); 
    myFetch(`${SERVER_URL}/about`, {}, 'GET'); 
}

