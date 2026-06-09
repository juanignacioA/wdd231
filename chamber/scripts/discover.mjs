import { places } from "../data/places.mjs";

const messageContainer = document.querySelector("#visitor-message");
const gallery = document.querySelector("#gallery");

if (messageContainer) {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const msPerDay = 1000 * 60 * 60 * 24;

    if (!lastVisit) {
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diff = now - parseInt(lastVisit);
        const days = Math.floor(diff / msPerDay);

        if (days < 1) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            messageContainer.textContent = "You last visited 1 day ago.";
        } else {
            messageContainer.textContent = `You last visited ${days} days ago.`;
        }
    }
    localStorage.setItem("lastVisit", now);
}

if (gallery) {
    const fragment = document.createDocumentFragment();

    places.forEach(place => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn More</button>
        `;
        
        fragment.appendChild(card);
    });

    gallery.appendChild(fragment);
}