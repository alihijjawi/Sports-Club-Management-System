//Cart
var price1 = document.getElementById("p1");
var price2 = document.getElementById("p2");
var price3 = document.getElementById("p3");
var price4 = document.getElementById("p4");
var price5 = document.getElementById("p5");
var price6 = document.getElementById("p6");

var tprice1 = document.getElementById("tp1");
var tprice2 = document.getElementById("tp2");
var tprice3 = document.getElementById("tp3");
var tprice4 = document.getElementById("tp4");
var tprice5 = document.getElementById("tp5");
var tprice6 = document.getElementById("tp6");

var item1 = document.getElementById("item1cart");
var item2 = document.getElementById("item2cart");
var item3 = document.getElementById("item3cart");
var item4 = document.getElementById("item4cart");
var item5 = document.getElementById("item5cart");
var item6 = document.getElementById("item6cart");

var total = document.getElementById("tot");
var subtotal = document.getElementById("subtot");

const promocodes = ["YOUSS1", "YASS02", "MIRAPS", "MISTO2", "HAZ123", "ALIHIJ"]
var p = [price1, price2, price3, price4, price5, price6]
var tp = [tprice1, tprice2, tprice3, tprice4, tprice5, tprice6]
var q = [0,0,3,0,4,0]
var item_price = [22, 14, 9, 38, 6, 14]

/*
if(sessionStorage!=null){
  q = sessionStorage.getItem("q").split(',');
  item_price = sessionStorage.getItem("item_price").split(',');
}
*/

function fillCart(){
  document.getElementById("q1").value = q[0];
  document.getElementById("q2").value = q[1];
  document.getElementById("q3").value = q[2];
  document.getElementById("q4").value = q[3];
  document.getElementById("q5").value = q[4];
  document.getElementById("q6").value = q[5]; 

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
    tp[i].innerHTML = "$" + String(item_price[i]*q[i])
  }

  var t = 0
  for (let i = 0; i<tp.length; i++) {
    t += item_price[i]*q[i]
  }

  subtotal.innerHTML = "$" + String(t)
  total.innerHTML = "$" + String(t)
}

fillCart();

 function updateCart(){

  q[0] = document.getElementById("q1").value;
  q[1] = document.getElementById("q2").value;
  q[2] = document.getElementById("q3").value;
  q[3] = document.getElementById("q4").value;
  q[4] = document.getElementById("q5").value;
  q[5] = document.getElementById("q6").value;

  fillCart();
}

  function applyCoupon(){
    promocode = document.getElementsById("name-5861").value
    for (let i = 0; i < promocodes.length; i++) {
      if(promocodes[i] == promocode) {
        for (let j = 0; j<item_price.length; j++) {
          item_price[j] = 0.9*item_price[j]
        }
      }
    }
    fillCart();
  }
