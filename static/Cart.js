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
        }
    } catch (err) {
        // The response wasn't a JSON object
        // Do your text handling here
    }
}

const promocodes = ["YOUSS1", "YASS02", "MIRAPS", "MISTO2", "HAZ123", "ALIHIJ"]

var quantity = getQuantity()
var item_price = getPrice()
var original_item_price = [22, 14, 9, 38, 6, 14];

var p = [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3"), 
                document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")]

var tp = [document.getElementById("tp1"), document.getElementById("tp2"), document.getElementById("tp3"), 
            document.getElementById("tp4"), document.getElementById("tp5"), document.getElementById("tp6")]

var total = document.getElementById("tot");
var subtotal = document.getElementById("subtot");

var ck = document.getElementById("checkout")
ck.addEventListener("click", clearAll)

function clearAll(){
  clearPrice();
  clearQuantity();
}

var item1 = document.getElementById("item1cart");
var item2 = document.getElementById("item2cart");
var item3 = document.getElementById("item3cart");
var item4 = document.getElementById("item4cart");
var item5 = document.getElementById("item5cart");
var item6 = document.getElementById("item6cart");

document.getElementById("remove1").addEventListener("click", rem1);
document.getElementById("remove2").addEventListener("click", rem2);
document.getElementById("remove3").addEventListener("click", rem3);
document.getElementById("remove4").addEventListener("click", rem4);
document.getElementById("remove5").addEventListener("click", rem5);
document.getElementById("remove6").addEventListener("click", rem6);
function rem1(){quantity[0]=0; fillCart();}
function rem2(){quantity[1]=0; fillCart();}
function rem3(){quantity[2]=0; fillCart();}
function rem4(){quantity[3]=0; fillCart();}
function rem5(){quantity[4]=0; fillCart();}
function rem6(){quantity[5]=0; fillCart();}

document.getElementById("minus1").addEventListener("click", m1);
document.getElementById("minus2").addEventListener("click", m2);
document.getElementById("minus3").addEventListener("click", m3);
document.getElementById("minus4").addEventListener("click", m4);
document.getElementById("minus5").addEventListener("click", m5);
document.getElementById("minus6").addEventListener("click", m6);
function m1(){quantity[0]--; fill1();}
function m2(){quantity[1]--; fill2();}
function m3(){quantity[2]--; fill3();}
function m4(){quantity[3]--; fill4();}
function m5(){quantity[4]--; fill5();}
function m6(){quantity[5]--; fill6();}

document.getElementById("plus1").addEventListener("click", p1);
document.getElementById("plus2").addEventListener("click", p2);
document.getElementById("plus3").addEventListener("click", p3);
document.getElementById("plus4").addEventListener("click", p4);
document.getElementById("plus5").addEventListener("click", p5);
document.getElementById("plus6").addEventListener("click", p6);
function p1(){quantity[0]++; fill1();}
function p2(){quantity[1]++; fill2();}
function p3(){quantity[2]++; fill3();}
function p4(){quantity[3]++; fill4();}
function p5(){quantity[4]++; fill5();}
function p6(){quantity[5]++; fill6();}

function fillPrices(){
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

function fill1(){
  document.getElementById("q1").innerHTML = quantity[0];
  if (quantity[0] != 0) item1.style.display = "tr"
  else item1.style.display = "none"
  fillPrices();
}
function fill2(){
  document.getElementById("q2").innerHTML = quantity[1];
  if (quantity[1] != 0) item2.style.display = "tr"
  else item2.style.display = "none"
  fillPrices();
}
function fill3(){
  document.getElementById("q3").innerHTML = quantity[2];
  if (quantity[2] != 0) item3.style.display = "tr"
  else item3.style.display = "none"
  fillPrices();
}
function fill4(){
  document.getElementById("q4").innerHTML = quantity[3];
  if (quantity[3] != 0) item4.style.display = "tr"
  else item4.style.display = "none"
  fillPrices();
}
function fill5(){
  document.getElementById("q5").innerHTML = quantity[4];
  if (quantity[4] != 0) item5.style.display = "tr"
  else item5.style.display = "none"
  fillPrices();
}
function fill6(){
  document.getElementById("q6").innerHTML = quantity[5];
  if (quantity[5] != 0) item6.style.display = "tr"
  else item6.style.display = "none"
  fillPrices();
}

function fillCart(){
  fill1();  fill2();
  fill3();  fill4();
  fill5();  fill6();
}

fillCart();

function save(){
  savePrice(item_price);
  saveQuantity(quantity);
}

var continueShopping = document.getElementById("cont")
continueShopping.addEventListener("click", save)

var promobutton = document.getElementById("promobutton")
promobutton.addEventListener("click", applyCoupon)

function applyDiscount(){
  for (let j = 0; j<item_price.length; j++) {
      item_price[j] = 0.9*item_price[j]
  }
  savePrice(item_price);
  fillCart();
}

function applyCoupon(){
  var promocode = document.getElementById("name-5861")
  if(item_price[0] != original_item_price[0]){
    promocode.value = "Already Used Promocode!";
    return;
  }
  for (let i = 0; i < promocodes.length; i++) {
    if(promocodes[i] == promocode.value) {
      applyDiscount(); promocode.value = "You get a Discount!"; return;
    }
  }
  promocode.value = "Invalid Promocode!";
}