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
  

var submitButton = document.getElementById("generate");
submitButton.addEventListener("click", submit);


function submit() {
    let start_date = document.getElementById("start_date")
    let end_date = document.getElementById("end_date")

    const data = {
        "start_date": start_date.value,
        "end_date": end_date.value
    };
    
    fetch(`${SERVER_URL}/user_report`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());

    var image = document.getElementById("report_image");
    image.src = "static/images/reports/user_report.png";
    image.style.height = '500px';
    image.style.width = '700px';
}