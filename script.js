function verifyCertificate() {
    var certID = document.getElementById('certID').value;
    var resultContainer = document.getElementById('resultContainer');
    var resultMessage = document.getElementById('message');

    if (!certID) {
        resultMessage.innerHTML = 'Please enter a certificate number.';
        resultMessage.style.color = 'red';
        resultContainer.innerHTML = '';
        return;
    }

    var scriptUrl = 'https://script.google.com/macros/s/AKfycbzUwm1LJpE23wBhsx71_RV4rJX7n4zFsZcWm2Q2qO1jlw5oHTOUmmxNvgThf2FG4QtBSQ/exec';

    resultMessage.innerHTML = 'Verifying certificate...';
    resultMessage.style.color = 'blue';
    resultContainer.innerHTML = '';

    fetch(scriptUrl + '?id=' + certID)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultMessage.innerHTML = data.error;
                resultMessage.style.color = 'red';
                resultContainer.innerHTML = '';
            } else {
                resultMessage.innerHTML = '✅ Certificate Verified!';
                resultMessage.style.color = 'green';

                // Format Date of Birth to dd/mm/yyyy
                let dob = data["Date of Birth"];
                if (dob) {
                    // If it's a timestamp (e.g., from Google Sheets), convert to date
                    if (typeof dob === 'string' && dob.includes('/')) {
                        // Assume it's already in dd/mm/yyyy format
                        dob = dob;
                    } else if (typeof dob === 'string' && !isNaN(Date.parse(dob))) {
                        // Parse ISO date (e.g., "2000-01-15T00:00:00.000Z")
                        const dateObj = new Date(dob);
                        dob = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
                    } else if (typeof dob === 'number') {
                        // Handle Excel/Sheets date serial number (if applicable)
                        const dateObj = new Date((dob - 25569) * 86400 * 1000); // Convert Excel date to JS date
                        dob = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
                    }
                } else {
                    dob = 'N/A';
                }

                resultContainer.innerHTML = `
                    <div class="certificate-details">
                        <table class="certificate-table">
                            <tr>
                                <th colspan="2" class="certificate-header">Certificate Details</th>
                            </tr>
                            <tr>
                                <td class="field-name">Name:</td>
                                <td>${data["Name"] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Guardian's Name:</td>
                                <td>${data["Guardian's Name"] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Date of Birth:</td>
                                <td>${dob}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Course Name:</td>
                                <td>${data["Course Name"] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Registration No.:</td>
                                <td>${data["Registration No."] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Grade:</td>
                                <td>${data["Grade"] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Course Code:</td>
                                <td>${data["Course Code"] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Course Duration:</td>
                                <td>${data["Course Duration"] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="field-name">Issue Date:</td>
                                <td>${data["Issue Date"] || 'N/A'}</td>
                            </tr>
                        </table>
                    </div>
                `;
            }
        })
        .catch(error => {
            resultMessage.innerHTML = 'An error occurred, please try again later.';
            resultMessage.style.color = 'red';
            resultContainer.innerHTML = '';
            console.error('Error:', error);
        });
}
