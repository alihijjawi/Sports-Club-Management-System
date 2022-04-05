//Store
var item_price = [22, 14, 9, 38, 6, 14]
var q = [0, 0, 0, 0, 0, 0]

/*
function updateQandP() {
  sessionStorage.setItem("q", q);
  sessionStorage.setItem("item_price", item_price);
}

updateQandP();
*/

var price_display1 = document.getElementById("pd1")
var price_display2 = document.getElementById("pd2")
var price_display3 = document.getElementById("pd3")
var price_display4 = document.getElementById("pd4")
var price_display5 = document.getElementById("pd5")
var price_display6 = document.getElementById("pd6")

var price_display = [price_display1, price_display2, price_display3, price_display4, price_display5, price_display6]

function updateStore(){
  for (let i = 0; i<price_display.length; i++) {
    price_display[i].innerHTML = "$" + String(item_price[i])
  }
}

updateStore();

function addItem(item_number) {

  var n = parseInt(item_number.id)
  q[n] = q[n] + 1
  //updateQandP();

}

