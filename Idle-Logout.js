export var inactivityTime = function () { 
    var time; window.onload = resetTimer; 
    document.onmousemove = resetTimer; 
    document.onkeydown = resetTimer; 
    function logout() { alert("You are now logged out.").href = 'logout.html' } 
    function resetTimer() { clearTimeout(time); time = setTimeout(logout, 420000) }
};