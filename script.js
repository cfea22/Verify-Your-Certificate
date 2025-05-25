function verifyCertificate() {
    var certID = document.getElementById('certID').value;
    var resultMessage = document.getElementById('message');

    if (!certID) {
        resultMessage.innerHTML = 'Please enter a certificate number.';
        resultMessage.style.color = 'red';
        return;
    }

    var scriptUrl = 'https://script.google.com/macros/s/AKfycbzUwm1LJpE23wBhsx71_RV4rJX7n4zFsZcWm2Q2qO1jlw5oHTOUmmxNvgThf2FG4QtBSQ/exec'; // Replace with your deployed URL

    fetch(scriptUrl + '?id=' + certID)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultMessage.innerHTML = data.error;
                resultMessage.style.color = 'red';
            } else {
                resultMessage.innerHTML = `
                    ✅ Certificate Verified!<br>
                    <strong>Name:</strong> ${data["Name"]}<br>
                    <strong>Guardian's Name:</strong> ${data["Guardian's Name"]}<br>
                    <strong>Date of Birth:</strong> ${data["Date of Birth"]}<br>
                    <strong>Course Name:</strong> ${data["Course Name"]}<br>
                    <strong>Registration No.:</strong> ${data["Registration No."]}<br>
                    <strong>Grade:</strong> ${data["Grade"]}<br>
                    <strong>Course Code:</strong> ${data["Course Code"]}<br>
                    <strong>Course Duration:</strong> ${data["Course Duration"]}<br>
                    <strong>Issue Date:</strong> ${data["Issue Date"]}
                `;
                resultMessage.style.color = 'green';
            }
        })
        .catch(error => {
            resultMessage.innerHTML = 'An error occurred, please try again later.';
            resultMessage.style.color = 'red';
        });
}
