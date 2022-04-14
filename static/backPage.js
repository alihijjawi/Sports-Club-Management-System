var SERVER_URL = "http://127.0.0.1:5000";
var backButton = document.getElementById("back-button");
backButton.addEventListener("click", back);

function back() {
    history.back()
}
