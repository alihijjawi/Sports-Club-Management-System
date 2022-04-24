import { getQuantity, saveQuantity, clearQuantity, getPrice, savePrice, clearPrice } from "./localStorage";

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
var item1 = document.getElementById("1");
var item2 = document.getElementById("2");
var item3 = document.getElementById("3");
var item4 = document.getElementById("4");
var item5 = document.getElementById("5");
var item6 = document.getElementById("6");

item1.addEventListener("click", addItem1)
item2.addEventListener("click", addItem2)
item3.addEventListener("click", addItem3)
item4.addEventListener("click", addItem4)
item5.addEventListener("click", addItem5)
item6.addEventListener("click", addItem6)

var quantity = [0, 0, 0, 0, 0, 0]
var item_price = [22, 14, 9, 38, 6, 14]

var price_display = [document.getElementById("pd1"), document.getElementById("pd2"), document.getElementById("pd3"), 
        document.getElementById("pd4"), document.getElementById("pd5"), document.getElementById("pd6")]

function updateStore(){
  for (let i = 0; i<price_display.length; i++) {
    price_display[i].innerHTML = "$" + String(item_price[i])
  }
}

updateStore();

function addItem1() { quantity[0]+=1; saveQuantity(quantity);}
function addItem2() { quantity[1]+=1; saveQuantity(quantity);}
function addItem3() { quantity[2]+=1; saveQuantity(quantity);}
function addItem4() { quantity[3]+=1; saveQuantity(quantity);}
function addItem5() { quantity[4]+=1; saveQuantity(quantity);}
function addItem6() { quantity[5]+=1; saveQuantity(quantity);}
