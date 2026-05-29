document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica para el formulario en join.html
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Lógica para mostrar datos en thankyou.html
    if (window.location.pathname.includes('thankyou.html')) {
        const resultsContainer = document.getElementById('results');
        const params = new URLSearchParams(window.location.search);

        if (resultsContainer) {
            let htmlContent = "<h2>Submission Details:</h2>";
            
            // Recorremos los datos enviados por la URL
            params.forEach((value, key) => {
                const labels = {
                    "fname": "First Name",
                    "lname": "Last Name",
                    "orgTitle": "Organizational Title",
                    "email": "Email Address",
                    "phone": "Mobile Phone Number",
                    "orgName": "Business/Organization Name",
                    "membership": "Membership Level",
                    "description": "Description",
                    "timestamp": "Submission Date"
                };

                // Usamos la etiqueta del diccionario, o el nombre original si no está en la lista
                const formattedKey = labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                htmlContent += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
            });

            resultsContainer.innerHTML = htmlContent;
        }
    }
});