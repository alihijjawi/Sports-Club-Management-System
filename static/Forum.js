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
postdiv.style.display="none"

var commentdiv = []
var displaycomments = []
var comments = []
var sc = []
var ac = []

function loadCommentButtons(){
    commentdiv = []
    var j = 1
    while(document.getElementById("addcomment"+j.toString())){
        commentdiv.push(document.getElementById("addcomment"+j.toString()))
        commentdiv[j-1].style.display="none"
        j+=1
    }
}

function loadShowComments(){
    sc = []
    var j = 1
    while(document.getElementById("showcomment"+j.toString())){
        sc.push(document.getElementById("showcomment"+j.toString()))
        sc[j-1].addEventListener("click", showComment)
        j+=1
    }
}

function loadAddComments(){
    ac = []
    var j = 1
    while(document.getElementById("commentbutton"+j.toString())){
        ac.push(document.getElementById("commentbutton"+j.toString()))
        ac[j-1].addEventListener("click", addComment)
        j+=1
    }
}

function loadDisplayComments(){
    displaycomments = []
    var j = 1
    while(document.getElementById("displaycomments"+j.toString())){
        displaycomments.push(document.getElementById("displaycomments"+j.toString()))
        displaycomments[j-1].addEventListener("click", whatDisplay);
        j+=1
    }
}

function loadComments(){
    comments = []
    var j = 1
    while(document.getElementById("displaycomm"+j.toString())){
        comments.push(document.getElementById("displaycomm"+j.toString()))
        comments[j-1].style.display="none";
        j+=1
    }
}

loadCommentButtons();
loadShowComments();
loadAddComments();
loadDisplayComments();
loadComments();

function showComment(){
    if(userLabel.innerHTML != "") {
        var trgt = window.event.target.id
        var ind = 0
        while(/^[a-z]+$/.test(trgt[ind])){ind+=1;}
        trgt = trgt.substr(ind)
        var clicked_id = parseInt(trgt);
        if(commentdiv[clicked_id-1].style.display=="block") commentdiv[clicked_id-1].style.display="none";
        else commentdiv[clicked_id-1].style.display="block";
    }
    else{
        alert("You cannot add comments to the forum if you are not logged in to your account.\nPlease login or register if you do not have an account.");
        location.href = "login";
    }
}

var sp = document.getElementById("showpost")
sp.addEventListener("click", showPost)
function showPost(){
    if(userLabel.innerHTML != "") {
        if(sp.innerHTML == "Write Something..."){
            postdiv.style.display="block";
            sp.innerHTML="Close";
        }
        else{
            postdiv.style.display="none";
            sp.innerHTML="Write Something...";
        }
    }
    else{
        alert("You cannot add posts to the forum if you are not logged in to your account.\nPlease login or register if you do not have an account.");
        location.href = "login";
    }
}

function whatDisplay(){
    var trgt = window.event.target.id
    var ind = 0
    while(/^[a-z]+$/.test(trgt[ind])){ind+=1;}
    trgt = trgt.substr(ind)
    var clicked_id = parseInt(trgt);
    if(comments[clicked_id-1].style.display=="block") comments[clicked_id-1].style.display="none";
    else comments[clicked_id-1].style.display="block";
}

function addComment(){
    var trgt = window.event.target.id
    var ind = 0
    while(/^[a-z]+$/.test(trgt[ind])){ind+=1;}
    trgt = trgt.substr(ind)
    var clicked_id = parseInt(trgt);
    if (document.getElementById("commentcontent"+trgt).value == ""){
        document.getElementById("error"+trgt).innerHTML = "Comment cannot be empty!"
        return;
    } 
    const data = {
        "title": "",
        "content": document.getElementById("commentcontent"+trgt).value,
        "parent": commentdiv.length - clicked_id + 1
    };
    commentdiv[clicked_id-1].style.display="none"
    myFetch(`${SERVER_URL}/discussion`, data, 'POST'); 
    document.getElementById("commentcontent"+trgt).value = ""
    document.getElementById("error"+trgt).innerHTML = ""
    loadCommentButtons();
    loadShowComments();
    loadAddComments();
    loadDisplayComments();
    loadAddComments();
}

var ap = document.getElementById("postbutton")
ap.addEventListener("click", addPost)
function addPost(){
    if (document.getElementById("name-6797").value == "" || document.getElementById("message-6797").value == ""){
        return;
    } 
    const data = {
        "title": document.getElementById("name-6797").value,
        "content": document.getElementById("message-6797").value,
        "parent":0
    };
    postdiv.style.display="none"
    sp.innerHTML="Write Something...";
    myFetch(`${SERVER_URL}/discussion`, data, 'POST'); 
    document.getElementById("name-6797").value = ""
    document.getElementById("message-6797").value = ""
    loadCommentButtons();
    loadShowComments();
    loadAddComments();
    loadDisplayComments();
    loadComments();
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