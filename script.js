function verifyCertificate() {
    var certID = document.getElementById('certID').value;
    var resultMessage = document.getElementById('message');

    if (!certID) {
        resultMessage.innerHTML = 'Please enter a certificate number.';
        resultMessage.style.color = 'red';
        return;
    }

    // Google Apps Script Web App URL (replace with your actual script URL)
    var scriptUrl = 'https://script.google.com/macros/s/AKfycbzEc5xAZb2ZqCIACp-ofDTXIqIXMH009BwFWIPBoYkUABPI6uxcH6T98YLympCtjH7ICg/exec';

    // Fetch data from Google Apps Script Web App
    fetch(scriptUrl + '?id=' + certID)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultMessage.innerHTML = data.error;
                resultMessage.style.color = 'red';
            } else {
                resultMessage.innerHTML = 'Certificate Verified!<br>Name: ' + data.name + '<br>Course: ' + data.courseName;
                resultMessage.style.color = 'green';
            }
        })
        .catch(error => {
            resultMessage.innerHTML = 'An error occurred, please try again later.';
            resultMessage.style.color = 'red';
        });
}
