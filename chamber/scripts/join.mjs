document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const benefitButtons = document.querySelectorAll('.benefit-btn');
    benefitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    if (window.location.pathname.includes('thankyou.html')) {
        const resultsContainer = document.getElementById('results');
        const params = new URLSearchParams(window.location.search);

        if (resultsContainer) {
            let htmlContent = "<h2>Submission Details:</h2>";
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

                const formattedKey = labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                htmlContent += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
            });

            

            resultsContainer.innerHTML = htmlContent;
        }
    }

    const closeButtons = document.querySelectorAll(".btn-close-modal");

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
});
});