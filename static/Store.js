//Store
//import inactivityTime from './../Idle-Logout'
//import * as OS from './Online-Store.js'

var SERVER_URL = "http://127.0.0.1:5000";

var inactivityTime = function () { 
  var time; 
  window.onload = resetTimer; 
  document.onmousemove = resetTimer; 
  document.onkeydown = resetTimer; 
  function logout() { window.location.href = '../logout.html' } 
  function resetTimer() { clearTimeout(time); time = setTimeout(logout, 420000) }
};

window.onload = function() { inactivityTime(); }

var item1 = document.getElementById("1");
var item2 = document.getElementById("2");
var item3 = document.getElementById("3");
var item4 = document.getElementById("4");
var item5 = document.getElementById("5");
var item6 = document.getElementById("6");

item1.addEventListener("click", addItem)
item2.addEventListener("click", addItem)
item3.addEventListener("click", addItem)
item4.addEventListener("click", addItem)
item5.addEventListener("click", addItem)
item6.addEventListener("click", addItem)

const promocodes = ["YOUSS1", "YASS02", "MIRAPS", "MISTO2", "HAZ123", "ALIHIJ"]
const fixed_item_price = [22, 14, 9, 38, 6, 14]
var q = [0, 0, 0, 0, 0, 0]
var item_price = [22, 14, 9, 38, 6, 14]

function applyDiscount(){
  for (let j = 0; j<item_price.length; j++) {
      item_price[j] = 0.9*item_price[j]
  }
}

var price_display = [document.getElementById("pd1"), document.getElementById("pd2"), document.getElementById("pd3"), 
        document.getElementById("pd4"), document.getElementById("pd5"), document.getElementById("pd6")]

function updateStore(){
  for (let i = 0; i<price_display.length; i++) {
    price_display[i].innerHTML = "$" + String(item_price[i])
  }
}

updateStore();

function addItem() {
  q[0] = q[0] + 1
}

console.log(q[0])
