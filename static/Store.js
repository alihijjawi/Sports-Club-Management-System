import { getQuantity, saveQuantity, clearQuantity, getPrice, savePrice, clearPrice } from "./localStorage.js";

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
            alert("You cannot access the store if you are not logged in.\nPlease login or register if you do not have an account.");
            location.href = "login";
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

var quantity = getQuantity()
var item_price = getPrice()

var tI = document.getElementById("totalItems")
tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);

var item1 = document.getElementById("1");
var item2 = document.getElementById("2");
var item3 = document.getElementById("3");
var item4 = document.getElementById("4");
var item5 = document.getElementById("5");
var item6 = document.getElementById("6");

function addItem1() { quantity[0]+=1; tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);}
function addItem2() { quantity[1]+=1; tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);}
function addItem3() { quantity[2]+=1; tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);}
function addItem4() { quantity[3]+=1; tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);}
function addItem5() { quantity[4]+=1; tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);}
function addItem6() { quantity[5]+=1; tI.innerHTML=quantity.reduce((partialSum, a) => partialSum + a, 0);}

function save(){
  savePrice(item_price);
  saveQuantity(quantity);
}

item1.addEventListener("click", addItem1)
item2.addEventListener("click", addItem2)
item3.addEventListener("click", addItem3)
item4.addEventListener("click", addItem4)
item5.addEventListener("click", addItem5)
item6.addEventListener("click", addItem6)

var SC = document.getElementById("SCbutton")
SC.addEventListener("click", save)

var price_display = [document.getElementById("pd1"), document.getElementById("pd2"), document.getElementById("pd3"), 
        document.getElementById("pd4"), document.getElementById("pd5"), document.getElementById("pd6")]

function updateStore(){
  for (let i = 0; i<price_display.length; i++) {
    price_display[i].innerHTML = "$" + String(item_price[i])
  }
}

updateStore();

