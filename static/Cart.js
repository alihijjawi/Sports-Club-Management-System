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

const promocodes = ["YOUSS1", "YASS02", "MIRAPS", "MISTO2", "HAZ123", "ALIHIJ"]
var quantity = getQuantity()
var item_price = getPrice()

var promobutton = document.getElementById("promobutton")
promobutton.addEventListener("click", applyCoupon())

//var checkout = document.getElementById("checkout")
//checkout.addEventListener("click", )

var p = [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3"), 
                document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")]

var tp = [document.getElementById("tp1"), document.getElementById("tp2"), document.getElementById("tp3"), 
            document.getElementById("tp4"), document.getElementById("tp5"), document.getElementById("tp6")]

var item1 = document.getElementById("item1cart");
var item2 = document.getElementById("item2cart");
var item3 = document.getElementById("item3cart");
var item4 = document.getElementById("item4cart");
var item5 = document.getElementById("item5cart");
var item6 = document.getElementById("item6cart");

var total = document.getElementById("tot");
var subtotal = document.getElementById("subtot");

function updateCart(){
  quantity[0] = document.getElementById("q1").value;
  quantity[1] = document.getElementById("q2").value;
  quantity[2] = document.getElementById("q3").value;
  quantity[3] = document.getElementById("q4").value;
  quantity[4] = document.getElementById("q5").value;
  quantity[5] = document.getElementById("q6").value;

  saveQuantity(quantity);

  fillCart();
}

function applyDiscount(){
  for (let j = 0; j<item_price.length; j++) {
      item_price[j] = 0.9*item_price[j]
  }
}

function applyCoupon(){
  var promocode = document.getElementsById("name-5861").value
  for (let i = 0; i < promocodes.length; i++) {
    if(promocodes[i] == promocode) {
      applyDiscount(); break;
    }
  }
  updateCart();
}

function fillCart(){

  document.getElementById("q1").value = quantity[0];
  document.getElementById("q2").value = quantity[1];
  document.getElementById("q3").value = quantity[2];
  document.getElementById("q4").value = quantity[3];
  document.getElementById("q5").value = quantity[4];
  document.getElementById("q6").value = quantity[5]; 

  if(q[0] != 0) item1.style.display = "tr"
  else item1.style.display = "none"
  if(q[1] != 0) item2.style.display = "tr"
  else item2.style.display = "none"
  if(q[2] != 0) item3.style.display = "tr"
  else item3.style.display = "none"
  if(q[3] != 0) item4.style.display = "tr"
  else item4.style.display = "none"
  if(q[4] != 0) item5.style.display = "tr"
  else item5.style.display = "none"
  if(q[5] != 0) item6.style.display = "tr"
  else item6.style.display = "none"

  for (let i = 0; i < promocodes.length; i++) {
    p[i].innerHTML = "$" + String(item_price[i])
  }

  for (let i = 0; i < promocodes.length; i++) {
    tp[i].innerHTML = "$" + String(item_price[i]*quantity[i])
  }

  var t = 0
  for (let i = 0; i<tp.length; i++) {
    t += item_price[i]*quantity[i]
  }

  subtotal.innerHTML = "$" + String(t)
  total.innerHTML = "$" + String(t)
}

fillCart();