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
function loadDeletes(){
    del = []
    var j = 1
    while(document.getElementById("del"+j.toString())){
        del.push(document.getElementById("del"+j.toString()))
        del[j-1].addEventListener("click", deletePost)
        j+=1
    }
}
loadDeletes();
console.log(del)

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

function deletePost(){
    var trgt = window.event.target.id
    console.log(trgt)
    var ind = 0
    while(/^[a-z]+$/.test(trgt[ind])){ind+=1;}
    trgt = trgt.substr(ind)
    var clicked_id = parseInt(trgt);
    console.log(clicked_id)
    myFetch(`${SERVER_URL}/deletereview`, {"id":clicked_id-1}, 'POST');
    myFetch(`${SERVER_URL}/about`, {}, 'GET'); 
}

var sr = document.getElementById("showreview")
sr.style.display="none"

var ar = document.getElementById("addreview")
var pr = document.getElementById("postreview")
ar.addEventListener("click", addReview)
pr.addEventListener("click", postReview)

function addReview(){
    if(userLabel.innerHTML != ""){
        if(ar.innerHTML=="Add Review"){
            sr.style.display="block";
            ar.innerHTML="Close";
        }
        else{
            sr.style.display="none";
            ar.innerHTML="Add Review";
        }
    } 
    else{
        alert("You cannot add posts to the forum if you are not logged in to your account.\nPlease login or register if you do not have an account.");
        location.href = "login";
    }
}

function postReview(){ 
    if (document.getElementById("name-6797").value == "" || document.getElementById("message-6797").value == ""){
        return;
    } 
    const data = {
        "title": document.getElementById("name-6797").value,
        "content": document.getElementById("message-6797").value
    };
    sr.style.display="none" 
    ar.innerHTML="Add Review";
    document.getElementById("name-6797").value = ""
    document.getElementById("message-6797").value = ""
    myFetch(`${SERVER_URL}/postreviews`, data, 'POST'); 
    myFetch(`${SERVER_URL}/about`, {}, 'GET'); 
    loadDeletes();
}

