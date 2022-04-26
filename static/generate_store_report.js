var SERVER_URL = "http://127.0.0.1:5000";

var submitButton = document.getElementById("generate");
submitButton.addEventListener("click", submit);


function submit() {
    let start_date = document.getElementById("start_date")
    let end_date = document.getElementById("end_date")

    const data = {
        "start_date": start_date.value,
        "end_date": end_date.value
    };
    
    fetch(`${SERVER_URL}/store_report`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());

    var image = document.getElementById("report_image");
    image.src = "static/images/reports/store_report.png";
    image.style.height = '500px';
    image.style.width = '700px';
}