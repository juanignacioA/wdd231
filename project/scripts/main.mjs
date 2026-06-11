// Responsive Menu
const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('.navigation');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        // Accesibilidad: cambia la X
        menuBtn.innerHTML = nav.classList.contains('open') ? '&times;' : '&#9776;';
    });
}

// Wayfinding (Active Link Highlight)
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.navigation a');

navLinks.forEach(link => {
    if (currentPath.includes(link.getAttribute('href'))) {
        link.classList.add('active');
    }
});

// Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Local Storage for Visits
const visitMessage = document.getElementById('visit-message');
if (visitMessage) {
    let numVisits = Number(window.localStorage.getItem("habits-visits-ls")) || 0;
    if (numVisits !== 0) {
        visitMessage.textContent = `Welcome back! You have visited ${numVisits} times. Keep building those habits!`;
    } else {
        visitMessage.textContent = `Welcome to Habit Flow! Let's start tracking today.`;
    }
    numVisits++;
    localStorage.setItem("habits-visits-ls", numVisits);
}